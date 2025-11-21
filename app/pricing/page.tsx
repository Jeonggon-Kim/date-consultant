"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import AuthModal from "@/app/components/AuthModal";

export default function PricingPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };

    checkAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSubscribeClick = () => {
    if (!user) {
      // 비로그인 유저는 회원가입 모달 표시
      setShowAuthModal(true);
    } else {
      // 로그인 유저는 메인 페이지로 이동하여 구독 모달 표시
      router.push("/?subscribe=true");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-rose-500 to-pink-500 shadow-lg p-4">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <button
            onClick={() => router.push("/")}
            className="text-white hover:text-pink-100 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
          </button>
          <h1 className="text-2xl font-bold text-white">상품 안내</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">구독 서비스</h2>

          {/* 프리미엄 구독 */}
          <div className="border-2 border-rose-300 rounded-lg p-6 mb-6 bg-gradient-to-br from-rose-50 to-pink-50">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-rose-600 mb-2">
                  프리미엄 구독
                </h3>
                <p className="text-gray-600">무제한 AI 상담 서비스</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-rose-600">1,000원</p>
                <p className="text-sm text-gray-500">/ 월</p>
              </div>
            </div>

            <div className="border-t border-rose-200 pt-4">
              <h4 className="font-semibold text-gray-800 mb-3">포함 내용:</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-rose-500 mt-0.5 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-700">
                    무제한 AI 상담 (메시지 제한 없음)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-rose-500 mt-0.5 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-700">
                    전문 재회 상담사의 맞춤형 솔루션
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-rose-500 mt-0.5 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-700">채팅 이력 무제한 저장</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-rose-500 mt-0.5 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-700">24/7 언제든지 상담 가능</span>
                </li>
              </ul>
            </div>
          </div>

          {/* 무료 체험 */}
          <div className="border border-gray-300 rounded-lg p-6 bg-gray-50">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  무료 체험
                </h3>
                <p className="text-gray-600">서비스를 먼저 체험해보세요</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-gray-800">무료</p>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h4 className="font-semibold text-gray-800 mb-3">포함 내용:</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-700">
                    일일 10회 메시지 제한
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-700">
                    기본 AI 상담 서비스 이용
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* 결제 방법 안내 */}
          <div className="mt-8 p-6 bg-blue-50 rounded-lg">
            <h3 className="font-bold text-gray-800 mb-3">결제 방법</h3>
            <p className="text-gray-700 mb-2">
              메인 페이지에서 무료 체험 메시지 한도에 도달하면 구독 안내 팝업이
              표시됩니다.
            </p>
            <p className="text-gray-700">
              팝업에서 "구독하기" 버튼을 클릭하여 간편하게 결제하실 수 있습니다.
            </p>
          </div>

          {/* 구독하러 가기 버튼 */}
          <div className="mt-8 text-center">
            <button
              onClick={handleSubscribeClick}
              className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-8 py-4 rounded-lg font-bold text-lg hover:from-rose-600 hover:to-pink-600 transition-all shadow-lg"
            >
              {user ? "지금 구독하기" : "회원가입하고 구독하기"}
            </button>
            <p className="text-sm text-gray-500 mt-3">
              {user
                ? "클릭하면 결제 페이지로 이동합니다"
                : "회원가입 후 바로 구독하실 수 있습니다"}
            </p>
          </div>
        </div>
      </main>

      {/* Auth Modal - 회원가입 */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        signUpOnly={false}
        onSuccess={async () => {
          setShowAuthModal(false);
          // 회원가입 완료 후 메인 페이지로 이동하여 구독 모달 표시
          router.push("/?subscribe=true");
        }}
      />
    </div>
  );
}
