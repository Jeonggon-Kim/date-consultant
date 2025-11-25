import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// 매월 정기 결제 처리 (크론 작업으로 실행)
export async function GET(req: NextRequest) {
  try {
    // 크론 작업 인증 (보안을 위해 비밀 키 확인)
    const authHeader = req.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json(
        { success: false, message: '인증 실패' },
        { status: 401 }
      );
    }

    console.log('[크론] 정기 결제 시작');

    // Service Role Key를 사용하여 RLS 우회
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

    // 구독 중이고 빌링키가 있으며, 만료일이 7일 이내인 구독 조회
    const sevenDaysFromNow = new Date();
    sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);

    const { data: subscriptions, error } = await supabaseAdmin
      .from('subscriptions')
      .select('*')
      .eq('is_subscribed', true)
      .eq('cancel_at_period_end', false)
      .not('billing_key', 'is', null)
      .lte('subscription_end_date', sevenDaysFromNow.toISOString());

    if (error) {
      console.error('[크론] 구독 조회 실패:', error);
      throw error;
    }

    console.log(`[크론] 처리할 구독 수: ${subscriptions?.length || 0}`);

    const results = [];

    // 각 구독에 대해 결제 진행
    for (const subscription of subscriptions || []) {
      try {
        const paymentId = `subscription-${subscription.user_id}-${Date.now()}`;
        
        const paymentResponse = await fetch(
          'https://api.portone.io/payments/' + paymentId + '/billing-key',
          {
            method: 'POST',
            headers: {
              'Authorization': `PortOne ${process.env.PORTONE_API_SECRET}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              billingKey: subscription.billing_key,
              orderName: '재회 솔루션 월간 구독',
              amount: {
                total: 1000,
                currency: 'KRW',
              },
              customer: {
                id: subscription.user_id,
              },
            }),
          }
        );

        if (!paymentResponse.ok) {
          const errorText = await paymentResponse.text();
          console.error(`[크론] 결제 실패 (user: ${subscription.user_id}):`, errorText);
          
          // 결제 실패 시 구독 비활성화
          await supabaseAdmin
            .from('subscriptions')
            .update({
              is_subscribed: false,
              updated_at: new Date().toISOString(),
            })
            .eq('user_id', subscription.user_id);

          results.push({
            userId: subscription.user_id,
            success: false,
            error: errorText,
          });
          continue;
        }

        const payment = await paymentResponse.json();
        
        if (payment.status === 'PAID') {
          // 결제 성공 시 구독 기간 연장
          const newEndDate = new Date(subscription.subscription_end_date);
          newEndDate.setMonth(newEndDate.getMonth() + 1);

          await supabaseAdmin
            .from('subscriptions')
            .update({
              subscription_end_date: newEndDate.toISOString(),
              updated_at: new Date().toISOString(),
            })
            .eq('user_id', subscription.user_id);

          console.log(`[크론] 결제 성공 (user: ${subscription.user_id})`);
          
          results.push({
            userId: subscription.user_id,
            success: true,
            paymentId: payment.id,
          });
        } else {
          // 결제 실패
          await supabaseAdmin
            .from('subscriptions')
            .update({
              is_subscribed: false,
              updated_at: new Date().toISOString(),
            })
            .eq('user_id', subscription.user_id);

          results.push({
            userId: subscription.user_id,
            success: false,
            status: payment.status,
          });
        }
      } catch (error: any) {
        console.error(`[크론] 처리 오류 (user: ${subscription.user_id}):`, error);
        results.push({
          userId: subscription.user_id,
          success: false,
          error: error.message,
        });
      }
    }

    return NextResponse.json({
      success: true,
      processed: results.length,
      results,
    });
  } catch (error: any) {
    console.error('[크론] 오류:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
