'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';

function SuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [processing, setProcessing] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const confirmPayment = async () => {
      const paymentKey = searchParams.get('paymentKey');
      const orderId = searchParams.get('orderId');
      const amount = searchParams.get('amount');

      if (!paymentKey || !orderId || !amount) {
        setError('결제 정보가 올바르지 않습니다.');
        setProcessing(false);
        return;
      }

      try {
        // 서버에 결제 승인 요청
        const response = await fetch('/api/payment/confirm', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ paymentKey, orderId, amount }),
        });

        if (!response.ok) {
          throw new Error('결제 승인 실패');
        }

        const data = await response.json();

        // 구독 정보 업데이트
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const now = new Date();
          const endDate = new Date(now.setMonth(now.getMonth() + 1)); // 1개월 후

          await supabase
            .from('subscriptions')
            .upsert({
              user_id: user.id,
              is_subscribed: true,
              subscription_start_date: new Date().toISOString(),
              subscription_end_date: endDate.toISOString(),
              updated_at: new Date().toISOString(),
            });
        }

        setProcessing(false);

        // 3초 후 메인 페이지로 이동
        setTimeout(() => {
          router.push('/');
        }, 3000);
      } catch (error: any) {
        console.error('결제 승인 오류:', error);
        setError('결제 승인 중 오류가 발생했습니다.');
        setProcessing(false);
      }
    };

    confirmPayment();
  }, [searchParams, router]);

  if (processing) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-rose-500 mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-rose-900 mb-2">결제 처리 중...</h2>
          <p className="text-gray-600">잠시만 기다려주세요</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-red-600 mb-2">결제 실패</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => router.push('/')}
            className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-rose-600 hover:to-pink-600 transition-all"
          >
            메인으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold text-rose-900 mb-2">결제 완료!</h2>
        <p className="text-gray-600 mb-2">프리미엄 구독이 시작되었습니다</p>
        <p className="text-sm text-gray-500 mb-6">이제 무제한으로 상담을 이용하실 수 있습니다</p>
        <p className="text-sm text-gray-400">잠시 후 자동으로 메인 페이지로 이동합니다...</p>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-rose-500"></div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
