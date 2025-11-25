import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { RELATIONSHIP_COUNSELOR_PROMPT } from '@/prompts/relationship-counselor';
import { CHAT_LIMITS } from '@/config/limits';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { messages, chatId } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      );
    }

    const supabase = createRouteHandlerClient({ cookies });
    const { data: { session } } = await supabase.auth.getSession();
    const userId = session?.user?.id;

    // Service Role Client for secure operations
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    );

    // 1. Check Usage Limits (Server-side enforcement)
    if (userId) {
      // Check subscription status
      const { data: subscription } = await supabaseAdmin
        .from('subscriptions')
        .select('*')
        .eq('user_id', userId)
        .single();

      const isActive = subscription?.is_subscribed && 
                       new Date(subscription.subscription_end_date) > new Date();

      if (!isActive) {
        // Check daily usage
        const today = new Date().toISOString().slice(0, 10);
        const { data: usage } = await supabaseAdmin
          .from('usage_tracking')
          .select('*')
          .eq('user_id', userId)
          .eq('month', today)
          .single();

        const currentCount = usage?.message_count || 0;
        
        if (currentCount >= CHAT_LIMITS.FREE_USER_MESSAGE_LIMIT) {
           return NextResponse.json(
            { error: 'Daily limit exceeded' },
            { status: 403 }
          );
        }
      }
    } else {
       // Guest limit check (basic check, can be improved with IP or session)
       // For now, we rely on client-side but server should ideally verify too.
       // Since guests don't have IDs, this is harder to enforce strictly without IP tracking.
       const guestMessageLimit = CHAT_LIMITS.GUEST_MESSAGE_LIMIT * 2;
       if (messages.length >= guestMessageLimit) {
          return NextResponse.json(
            { error: 'Guest limit exceeded' },
            { status: 403 }
          );
       }
    }

    // 2. Save User Message (Server-side)
    if (userId && chatId) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.role === 'user') {
         await supabaseAdmin.from('messages').insert({
          chat_room_id: chatId,
          role: 'user',
          content: lastMessage.content,
        });
      }
    }

    // 3. Call OpenAI
    const messagesWithSystem = [
      { role: 'system', content: RELATIONSHIP_COUNSELOR_PROMPT },
      ...messages,
    ];

    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo', // Updated model name if needed, assuming gpt-4-turbo or similar
      messages: messagesWithSystem,
      temperature: 0.8,
      max_tokens: 1500,
    });

    const responseMessage = completion.choices[0].message;

    // 4. Save Assistant Message & Update Usage (Server-side)
    if (userId && chatId) {
       // Save assistant message
       await supabaseAdmin.from('messages').insert({
          chat_room_id: chatId,
          role: 'assistant',
          content: responseMessage.content,
        });

       // Update usage
       const today = new Date().toISOString().slice(0, 10);
       const { data: usage } = await supabaseAdmin
          .from('usage_tracking')
          .select('*')
          .eq('user_id', userId)
          .eq('month', today)
          .single();

       if (usage) {
         await supabaseAdmin
           .from('usage_tracking')
           .update({ 
             message_count: usage.message_count + 1,
             updated_at: new Date().toISOString()
           })
           .eq('id', usage.id);
       } else {
         await supabaseAdmin
           .from('usage_tracking')
           .insert({
             user_id: userId,
             month: today,
             message_count: 1
           });
       }
    }

    return NextResponse.json({
      message: responseMessage,
      usage: completion.usage,
    });

  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred' },
      { status: 500 }
    );
  }
}
