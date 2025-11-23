import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { RELATIONSHIP_COUNSELOR_PROMPT } from '@/prompts/relationship-counselor';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      );
    }

    // 시스템 메시지를 맨 앞에 추가
    const messagesWithSystem = [
      { role: 'system', content: RELATIONSHIP_COUNSELOR_PROMPT },
      ...messages,
    ];

    const completion = await openai.chat.completions.create({
      model: 'gpt-4.1-2025-04-14',
      messages: messagesWithSystem,
      temperature: 0.8,
      max_tokens: 1500,
    });

    const responseMessage = completion.choices[0].message;

    return NextResponse.json({
      message: responseMessage,
      usage: completion.usage,
    });
  } catch (error: any) {
    console.error('OpenAI API Error:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred' },
      { status: 500 }
    );
  }
}
