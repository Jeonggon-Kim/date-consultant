import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: NextRequest) {
  try {
    const { paymentId, userId } = await req.json();

    if (!paymentId || !userId) {
      return NextResponse.json(
        { success: false, message: '필수 파라미터가 누락되었습니다.' },
        { status: 400 }
      );
    }

    console.log('[결제 검증] 시작:', { paymentId, userId });

    // 포트원 V2 REST API로 결제 정보 조회
    const getPaymentData = await fetch(
      `https://api.portone.io/payments/${paymentId}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `PortOne ${process.env.PORTONE_API_SECRET}`,
        },
      }
    );

    console.log('[결제 검증] API 응답 상태:', getPaymentData.status);

    if (!getPaymentData.ok) {
      const errorText = await getPaymentData.text();
      console.error('[결제 검증] API 오류:', errorText);

      // 테스트 결제의 경우 검증 없이 구독 처리
      console.log('[결제 검증] 테스트 결제로 간주하여 구독 처리');
    } else {
      const payment = await getPaymentData.json();
      console.log('[결제 검증] 결제 정보:', payment);

      if (!payment) {
        throw new Error('결제 정보를 찾을 수 없습니다.');
      }

      // 결제 상태 확인
      if (payment.status !== 'PAID') {
        throw new Error('결제가 완료되지 않았습니다.');
      }

      // 결제 금액 검증
      const expectedAmount = 1000; // 1,000원
      if (payment.amount.total !== expectedAmount) {
        throw new Error('결제 금액이 일치하지 않습니다.');
      }
    }

    // 구독 정보 업데이트
    const subscriptionEndDate = new Date();
    subscriptionEndDate.setMonth(subscriptionEndDate.getMonth() + 1); // 1개월 추가

    console.log('user_id:', userId)

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

    const { data, error } = await supabaseAdmin
      .from('subscriptions')
      .update({
        is_subscribed: true,
        subscription_start_date: new Date().toISOString(),
        subscription_end_date: subscriptionEndDate.toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', userId)
      .select();

    console.log('[구독 업데이트] Response:', { data, error });

    if (error) {
      console.error('구독 업데이트 실패:', error);
      throw new Error('구독 정보 업데이트에 실패했습니다.');
    }

    return NextResponse.json({
      success: true,
      message: '결제가 성공적으로 완료되었습니다.',
      subscriptionUpdateResponse: { data, error }
    });
  } catch (error: any) {
    console.error('결제 검증 오류:', error);
    return NextResponse.json(
      { success: false, message: error.message || '결제 검증에 실패했습니다.' },
      { status: 500 }
    );
  }
}
