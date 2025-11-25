import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: NextRequest) {
  try {
    const { billingKey, userId } = await req.json();

    if (!billingKey || !userId) {
      return NextResponse.json(
        { success: false, message: '필수 파라미터가 누락되었습니다.' },
        { status: 400 }
      );
    }

    console.log('[구독 등록] 시작:', { billingKey, userId });

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

    // 빌링키를 DB에 저장
    const subscriptionEndDate = new Date();
    subscriptionEndDate.setMonth(subscriptionEndDate.getMonth() + 1); // 1개월 추가

    const { data: subscriptionData, error: subscriptionError } = await supabaseAdmin
      .from('subscriptions')
      .update({
        billing_key: billingKey,
        is_subscribed: true,
        subscription_start_date: new Date().toISOString(),
        subscription_end_date: subscriptionEndDate.toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', userId)
      .select();

    console.log('[구독 업데이트] Response:', { data: subscriptionData, error: subscriptionError });

    if (subscriptionError) {
      console.error('구독 업데이트 실패:', subscriptionError);
      throw new Error('구독 정보 업데이트에 실패했습니다.');
    }

    // 첫 결제 진행
    const paymentId = `subscription-${userId}-${Date.now()}`;
    
    const paymentResponse = await fetch(
      'https://api.portone.io/payments/' + paymentId + '/billing-key',
      {
        method: 'POST',
        headers: {
          'Authorization': `PortOne ${process.env.PORTONE_API_SECRET}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          billingKey: billingKey,
          orderName: '재회 솔루션 월간 구독',
          amount: {
            total: 1000,
            currency: 'KRW',
          },
          customer: {
            id: userId,
          },
        }),
      }
    );

    console.log('[첫 결제] API 응답 상태:', paymentResponse.status);

    if (!paymentResponse.ok) {
      const errorText = await paymentResponse.text();
      console.error('[첫 결제] API 오류:', errorText);
      throw new Error('첫 결제에 실패했습니다.');
    }

    const payment = await paymentResponse.json();
    console.log('[첫 결제] 결제 정보:', payment);

    // 결제 상태 확인
    if (payment.status !== 'PAID') {
      throw new Error('결제가 완료되지 않았습니다.');
    }

    return NextResponse.json({
      success: true,
      message: '구독이 성공적으로 완료되었습니다.',
      subscriptionData,
      payment,
    });
  } catch (error: any) {
    console.error('구독 등록 오류:', error);
    return NextResponse.json(
      { success: false, message: error.message || '구독 등록에 실패했습니다.' },
      { status: 500 }
    );
  }
}
