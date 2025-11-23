'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUsage: number;
  maxUsage: number;
  userId?: string;
  onAuthRequired?: () => void;
}

declare global {
  interface Window {
    PortOne: any;
  }
}

export default function SubscriptionModal({
  isOpen,
  onClose,
  currentUsage,
  maxUsage,
  userId,
  onAuthRequired,
}: SubscriptionModalProps) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // 포트원 V2 SDK 로드
    const script = document.createElement('script');
    script.src = 'https://cdn.portone.io/v2/browser-sdk.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  console.log('[SubscriptionModal] maxUsage:', maxUsage, 'currentUsage:', currentUsage);

  if (!isOpen) return null;

  const handleSubscribe = async () => {
    if (!userId) {
      if (onAuthRequired) {
        onAuthRequired();
      } else {
        alert('로그인이 필요합니다.');
      }
      return;
    }

    const PortOne = window.PortOne;
    if (!PortOne) {
      alert('결제 모듈 로딩 중입니다. 잠시 후 다시 시도해주세요.');
      return;
    }

    setLoading(true);

    try {
      // 주문 ID 생성
      const paymentId = `payment-${Date.now()}`;

      // 포트원 V2 결제 요청
      const response = await PortOne.requestPayment({
        storeId: process.env.NEXT_PUBLIC_PORTONE_STORE_ID || '',
        paymentId: paymentId,
        orderName: '재회 솔루션 월간 구독',
        totalAmount: 1000,
        currency: 'CURRENCY_KRW',
        channelKey: process.env.NEXT_PUBLIC_PORTONE_CHANNEL_KEY || '',
        payMethod: 'EASY_PAY',
      });

      if (response.code != null) {
        // 결제 실패
        alert(`결제에 실패했습니다: ${response.message}`);
        setLoading(false);
        return;
      }

      // 결제 성공 - 백엔드에서 검증
      try {
        const verifyResponse = await fetch('/api/payment/verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            paymentId: response.paymentId,
            userId,
          }),
        });

        const data = await verifyResponse.json();

        if (data.success) {
          alert('결제가 완료되었습니다!');
          window.location.reload();
        } else {
          throw new Error(data.message || '결제 검증 실패');
        }
      } catch (error: any) {
        console.error('결제 검증 실패:', error);
        alert('결제 검증에 실패했습니다.');
      }
      setLoading(false);
    } catch (error: any) {
      console.error('결제 요청 실패:', error);
      alert('결제 요청에 실패했습니다. 다시 시도해주세요.');
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start md:items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl p-4 md:p-8 max-w-md w-full m-4 max-h-[95vh] overflow-y-auto">
        <div className="text-center mb-4">
          <h2 className="text-xl md:text-2xl font-bold text-rose-900 mb-2">
            💝 오늘의 무료 사용량 소진
          </h2>
          <p className="text-sm md:text-base text-gray-600">
            내일 다시 시도하거나 구독하세요
          </p>
        </div>

        {userId && (
          <div className="bg-rose-50 rounded-lg p-4 mb-4">
            <div className="text-center mb-3">
              <p className="text-gray-600 text-xs mb-1">오늘 사용량</p>
              <p className="text-2xl md:text-3xl font-bold text-rose-600">
                {currentUsage} / {maxUsage}
              </p>
              <p className="text-gray-500 text-xs mt-1">메시지</p>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
              <div
                className="bg-gradient-to-r from-rose-500 to-pink-500 h-2 rounded-full transition-all"
                style={{ width: `${Math.min((currentUsage / maxUsage) * 100, 100)}%` }}
              ></div>
            </div>

            <p className="text-center text-rose-600 font-semibold text-sm">
              오늘의 무료 사용량 {maxUsage}개를 모두 사용했습니다
            </p>
            <p className="text-center text-gray-500 text-xs mt-1">
              내일 자정이 되면 다시 무료로 사용하실 수 있습니다
            </p>
            <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-center text-blue-800 text-xs font-semibold mb-1">
                💝 후원 계좌
              </p>
              <p className="text-center text-blue-700 text-xs">
                우리은행 1002-138843279
              </p>
              <p className="text-center text-blue-600 text-xs font-medium">
                김정곤
              </p>
            </div>
          </div>
        )}

        <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-lg p-4 mb-4 border-2 border-rose-200">
          <div className="text-center mb-3">
            <div className="inline-block bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded-full mb-1 animate-pulse">
              🚀 런칭 기념 특가 (선착순 100명)
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="text-gray-400 line-through text-lg">4,900원</span>
              <p className="text-3xl md:text-4xl font-bold text-rose-600">월 1,000원</p>
            </div>
            <p className="text-gray-600 text-xs md:text-sm mt-1">VAT 포함</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center">
              <span className="text-rose-500 mr-2 text-sm">✓</span>
              <span className="text-gray-700 text-sm">무제한 AI 상담</span>
            </div>
            <div className="flex items-center">
              <span className="text-rose-500 mr-2 text-sm">✓</span>
              <span className="text-gray-700 text-sm">채팅 히스토리 영구 저장</span>
            </div>
            <div className="flex items-center">
              <span className="text-rose-500 mr-2 text-sm">✓</span>
              <span className="text-gray-700 text-sm">연애·재회 전략 제공</span>
            </div>
            <div className="flex items-center">
              <span className="text-rose-500 mr-2 text-sm">✓</span>
              <span className="text-gray-700 text-sm">언제든 해지 가능</span>
            </div>
          </div>

          <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-center text-yellow-800 text-xs md:text-sm font-semibold">
              ⚠️ 현재 구독 서비스는 준비 중입니다
            </p>
            <p className="text-center text-yellow-700 text-xs mt-1">
              PG사 승인 대기 중이며, 곧 이용 가능합니다
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <button
            onClick={handleSubscribe}
            className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white py-3 md:py-4 rounded-lg font-bold text-base md:text-lg hover:from-rose-600 hover:to-pink-600 transition-all shadow-lg"
          >
            지금 구독하기
          </button>

          <button
            onClick={onClose}
            className="w-full bg-gray-100 text-gray-700 py-2.5 md:py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all text-sm md:text-base"
          >
            나중에
          </button>
        </div>

        <p className="text-xs text-gray-500 text-center mt-3">
          구독하면 매일 무제한으로 이용 가능합니다
        </p>
      </div>
    </div>
  );
}
