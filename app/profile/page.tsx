"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import SubscriptionModal from "@/app/components/SubscriptionModal";
import { CHAT_LIMITS } from "@/config/limits";

interface SubscriptionInfo {
  is_subscribed: boolean;
  subscription_start_date: string | null;
  subscription_end_date: string | null;
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [subscriptionInfo, setSubscriptionInfo] = useState<SubscriptionInfo | null>(null);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [monthlyUsage, setMonthlyUsage] = useState(0);

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push("/");
        return;
      }

      setUser(session.user);
      await loadSubscriptionInfo(session.user.id);
      await loadMonthlyUsage(session.user.id);
      setLoading(false);
    };

    checkAuth();
  }, [router]);

  const loadSubscriptionInfo = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("subscriptions")
        .select("*")
        .eq("user_id", userId)
        .single();

      if (error) {
        console.error("구독 정보 조회 실패:", error);
        return;
      }

      setSubscriptionInfo(data as SubscriptionInfo);
    } catch (error) {
      console.error("구독 정보 로드 실패:", error);
    }
  };

  const loadMonthlyUsage = async (userId: string) => {
    try {
      const today = new Date().toISOString().slice(0, 10); // 'YYYY-MM-DD'
      const { data, error } = await supabase
        .from("usage_tracking")
        .select("*")
        .eq("user_id", userId)
        .eq("month", today)
        .single();

      if (error) {
        if ((error as any).code === "PGRST116") {
          // 오늘 사용량 레코드 없음
          setMonthlyUsage(0);
          return;
        }
        console.error("사용량 조회 실패:", error);
        return;
      }

      const usage = data as any;
      setMonthlyUsage(usage.message_count || 0);
    } catch (error) {
      console.error("사용량 로드 실패:", error);
      setMonthlyUsage(0);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "-";

    // UTC 시간을 한국 시간으로 변환하여 표시
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Seoul",
    }).format(date);
  };

  const getRemainingDays = (endDate: string | null) => {
    if (!endDate) return null;

    const now = new Date();
    const end = new Date(endDate);
    const diffTime = end.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays > 0 ? diffDays : 0;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 flex items-center justify-center">
        <div className="text-rose-500 text-lg">로딩 중...</div>
      </div>
    );
  }

  const isActive =
    subscriptionInfo?.is_subscribed &&
    subscriptionInfo?.subscription_end_date &&
    new Date(subscriptionInfo.subscription_end_date) > new Date();

  const remainingDays = getRemainingDays(subscriptionInfo?.subscription_end_date || null);

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
          <h1 className="text-2xl font-bold text-white">내 정보</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-rose-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            계정 정보
          </h2>
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-gray-700">
              <span className="font-semibold">이메일:</span>
              <span>{user?.email}</span>
            </div>
          </div>
        </div>

        {/* 구독 정보 */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-rose-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
              />
            </svg>
            구독 정보
          </h2>

          {subscriptionInfo ? (
            <div className="space-y-4">
              {/* 구독 상태 배지 */}
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-700">구독 상태:</span>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    isActive
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {isActive ? "구독 중" : "미구독"}
                </span>
              </div>

              {isActive && remainingDays !== null && (
                <div className="bg-rose-50 border border-rose-200 rounded-lg p-4">
                  <p className="text-rose-700 font-semibold">
                    남은 기간: {remainingDays}일
                  </p>
                </div>
              )}

              {/* 구독 시작일 */}
              {subscriptionInfo.subscription_start_date && (
                <div className="flex items-start gap-2">
                  <span className="font-semibold text-gray-700 min-w-[100px]">
                    구독 시작일:
                  </span>
                  <span className="text-gray-600">
                    {formatDate(subscriptionInfo.subscription_start_date)}
                  </span>
                </div>
              )}

              {/* 구독 종료일 */}
              {subscriptionInfo.subscription_end_date && (
                <div className="flex items-start gap-2">
                  <span className="font-semibold text-gray-700 min-w-[100px]">
                    구독 종료일:
                  </span>
                  <span className="text-gray-600">
                    {formatDate(subscriptionInfo.subscription_end_date)}
                  </span>
                </div>
              )}

              {/* 미구독 상태일 때 */}
              {!isActive && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-600 mb-3">
                    구독하시면 더 많은 상담을 받으실 수 있습니다.
                  </p>
                  <button
                    onClick={() => setShowSubscriptionModal(true)}
                    className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-6 py-2 rounded-lg font-semibold hover:from-rose-600 hover:to-pink-600 transition-all"
                  >
                    구독하러 가기
                  </button>
                </div>
              )}
            </div>
          ) : (
            <p className="text-gray-600">구독 정보를 불러오는 중...</p>
          )}
        </div>
      </main>

      {/* Subscription Modal */}
      <SubscriptionModal
        isOpen={showSubscriptionModal}
        onClose={() => setShowSubscriptionModal(false)}
        currentUsage={monthlyUsage}
        maxUsage={CHAT_LIMITS.FREE_USER_MESSAGE_LIMIT}
        userId={user?.id}
      />
    </div>
  );
}
