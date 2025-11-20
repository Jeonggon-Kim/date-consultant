import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { paymentKey, orderId, amount } = await req.json();

    if (!paymentKey || !orderId || !amount) {
      return NextResponse.json(
        { error: '필수 파라미터가 누락되었습니다' },
        { status: 400 }
      );
    }

    // 토스페이먼츠 비밀키 (환경변수에서 가져오거나 테스트 키 사용)
    const secretKey = process.env.TOSS_SECRET_KEY || 'test_sk_zXLkKEypNArWmo50nX3lmeaxYG5R';
    const encodedKey = Buffer.from(secretKey + ':').toString('base64');

    // 토스페이먼츠 결제 승인 API 호출
    const response = await fetch('https://api.tosspayments.com/v1/payments/confirm', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${encodedKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        paymentKey,
        orderId,
        amount: parseInt(amount),
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('토스페이먼츠 승인 실패:', data);
      return NextResponse.json(
        { error: data.message || '결제 승인에 실패했습니다' },
        { status: response.status }
      );
    }

    // 결제 승인 성공
    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error: any) {
    console.error('결제 승인 오류:', error);
    return NextResponse.json(
      { error: error.message || '서버 오류가 발생했습니다' },
      { status: 500 }
    );
  }
}
