import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// 포트원 웹훅 처리
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    console.log('[웹훅] 수신:', body);

    // 웹훅 검증 (포트원에서 제공하는 서명 검증 로직 추가 권장)
    
    const { type, data } = body;

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

    // 결제 성공 웹훅
    if (type === 'Transaction.Paid') {
      const { paymentId, customerId } = data;
      
      console.log('[웹훅] 결제 성공:', { paymentId, customerId });

      // 구독 갱신 (다음 달로 연장)
      const newEndDate = new Date();
      newEndDate.setMonth(newEndDate.getMonth() + 1);

      await supabaseAdmin
        .from('subscriptions')
        .update({
          subscription_end_date: newEndDate.toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', customerId);

      console.log('[웹훅] 구독 갱신 완료');
    }

    // 결제 실패 웹훅
    if (type === 'Transaction.Failed') {
      const { customerId } = data;
      
      console.log('[웹훅] 결제 실패:', { customerId });

      // 구독 상태 업데이트 (실패 처리)
      await supabaseAdmin
        .from('subscriptions')
        .update({
          is_subscribed: false,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', customerId);

      console.log('[웹훅] 구독 비활성화 완료');
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('[웹훅] 처리 오류:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
