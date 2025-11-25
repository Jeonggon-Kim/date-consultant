import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Service Role Key를 사용하여 RLS 우회 (보안 강화)
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

    // 구독 정보 조회
    const { data: subscription, error: fetchError } = await supabaseAdmin
      .from('subscriptions')
      .select('billing_key')
      .eq('user_id', session.user.id)
      .single();

    if (fetchError) {
      console.error('Error fetching subscription:', fetchError);
      return NextResponse.json({ error: 'Failed to fetch subscription' }, { status: 500 });
    }

    // 빌링키가 있으면 포트원에서 삭제
    if (subscription?.billing_key) {
      try {
        const deleteResponse = await fetch(
          `https://api.portone.io/billing-keys/${subscription.billing_key}`,
          {
            method: 'DELETE',
            headers: {
              'Authorization': `PortOne ${process.env.PORTONE_API_SECRET}`,
            },
          }
        );

        if (!deleteResponse.ok) {
          console.error('Failed to delete billing key from PortOne');
        } else {
          console.log('Billing key deleted from PortOne');
        }
      } catch (error) {
        console.error('Error deleting billing key:', error);
      }
    }

    // 구독 정보 업데이트
    const { error } = await supabaseAdmin
      .from('subscriptions')
      .update({ 
        cancel_at_period_end: true,
        billing_key: null, // 빌링키 제거
      })
      .eq('user_id', session.user.id);

    if (error) {
      console.error('Error cancelling subscription:', error);
      return NextResponse.json({ error: 'Failed to cancel subscription' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Internal Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
