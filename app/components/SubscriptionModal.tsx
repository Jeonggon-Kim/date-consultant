'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUsage: number;
  maxUsage: number;
  userId?: string;
}

declare global {
  interface Window {
    TossPayments: any;
  }
}

export default function SubscriptionModal({
  isOpen,
  onClose,
  currentUsage,
  maxUsage,
  userId,
}: SubscriptionModalProps) {
  const [loading, setLoading] = useState(false);
  const [tossPayments, setTossPayments] = useState<any>(null);

  useEffect(() => {
    // 토스페이먼츠 SDK 로드
    const script = document.createElement('script');
    script.src = 'https://js.tosspayments.com/v1/payment';
    script.async = true;
    script.onload = () => {
      const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY || 'test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq';
      setTossPayments(window.TossPayments(clientKey));
    };
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  if (!isOpen) return null;

  const handleSubscribe = async () => {
    if (!tossPayments || !userId) {
      alert('결제 준비 중입니다. 잠시 후 다시 시도해주세요.');
      return;
    }

    setLoading(true);

    try {
      // 주문 ID 생성
      const orderId = `sub_${userId}_${Date.now()}`;
      const orderName = '재회 솔루션 월간 구독';
      const amount = 1000; // 1,000원

      // 토스페이먼츠 결제창 호출
      await tossPayments.requestPayment('카드', {
        amount,
        orderId,
        orderName,
        customerName: '재회 솔루션 사용자',
        successUrl: `${window.location.origin}/payment/success`,
        failUrl: `${window.location.origin}/payment/fail`,
      });
    } catch (error: any) {
      console.error('결제 요청 실패:', error);
      alert('결제 요청에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-rose-900 mb-2">
            💝 오늘의 무료 사용량 소진
          </h2>
          <p className="text-gray-600">
            내일 다시 시도하거나 구독하세요
          </p>
        </div>

        <div className="bg-rose-50 rounded-lg p-6 mb-6">
          <div className="text-center mb-4">
            <p className="text-gray-600 text-sm mb-2">오늘 사용량</p>
            <p className="text-3xl font-bold text-rose-600">
              {currentUsage} / {maxUsage}
            </p>
            <p className="text-gray-500 text-sm mt-1">메시지</p>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <div
              className="bg-gradient-to-r from-rose-500 to-pink-500 h-3 rounded-full transition-all"
              style={{ width: `${Math.min((currentUsage / maxUsage) * 100, 100)}%` }}
            ></div>
          </div>

          <p className="text-center text-rose-600 font-semibold">
            오늘의 무료 사용량 {maxUsage}개를 모두 사용했습니다
          </p>
          <p className="text-center text-gray-500 text-sm mt-2">
            내일 자정이 되면 다시 무료로 사용하실 수 있습니다
          </p>
        </div>

        <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-lg p-6 mb-6 border-2 border-rose-200">
          <div className="text-center mb-4">
            <p className="text-4xl font-bold text-rose-600">월 1,000원</p>
            <p className="text-gray-600 text-sm mt-2">VAT 포함</p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center">
              <span className="text-rose-500 mr-2">✓</span>
              <span className="text-gray-700">무제한 AI 상담</span>
            </div>
            <div className="flex items-center">
              <span className="text-rose-500 mr-2">✓</span>
              <span className="text-gray-700">채팅 히스토리 영구 저장</span>
            </div>
            <div className="flex items-center">
              <span className="text-rose-500 mr-2">✓</span>
              <span className="text-gray-700">전문가 재회 전략 제공</span>
            </div>
            <div className="flex items-center">
              <span className="text-rose-500 mr-2">✓</span>
              <span className="text-gray-700">언제든 해지 가능</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleSubscribe}
            disabled={loading}
            className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white py-4 rounded-lg font-bold text-lg hover:from-rose-600 hover:to-pink-600 disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed transition-all shadow-lg"
          >
            {loading ? '처리 중...' : '구독하기'}
          </button>

          <button
            onClick={onClose}
            className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all"
          >
            나중에
          </button>
        </div>

        <p className="text-xs text-gray-500 text-center mt-4">
          구독하면 매일 무제한으로 이용 가능합니다
        </p>
      </div>
    </div>
  );
}
