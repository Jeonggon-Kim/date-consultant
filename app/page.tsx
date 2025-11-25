"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import ChatMessage from "./components/ChatMessage";
import ChatInput from "./components/ChatInput";
import AuthModal from "./components/AuthModal";
import ChatHistorySidebar from "./components/ChatHistorySidebar";
import SubscriptionModal from "./components/SubscriptionModal";
import ReviewModal from "./components/ReviewModal";
import UserMenu from "./components/UserMenu";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import { CHAT_LIMITS } from "@/config/limits";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function Home() {
  const [user, setUser] = useState<User | null>(null);

  // ❗ 로딩은 더 이상 UI를 막지 않는다 (초기값 false)
  const [authLoading, setAuthLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalSignUpOnly, setAuthModalSignUpOnly] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshSidebar, setRefreshSidebar] = useState(0); // 사이드바 새로고침 트리거
  const [isSubscribed, setIsSubscribed] = useState(false); // 구독 여부
  const [monthlyUsage, setMonthlyUsage] = useState(0); // 이번 달(지금은 날짜) 사용량
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // 모바일 사이드바 상태
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 인증 상태 확인 + 기본 데이터 로딩
  useEffect(() => {
    const initAuth = async () => {
      try {
        console.log("[초기화] 인증 상태 확인 시작");

        // 필요하면 여기서 true로 잠깐 바꿔도 됨 (UI 안막음)
        setAuthLoading(true);
        setDataLoading(true);

        const { data, error } = await supabase.auth.getSession();

        if (error) {
          console.error("[초기화] 세션 조회 에러:", error);
        }

        const session = data?.session ?? null;
        console.log(
          "[초기화] 세션 조회 완료:",
          session?.user?.id ? "로그인됨" : "비로그인"
        );
        setUser(session?.user ?? null);

        if (session?.user) {
          console.log("[초기화] 구독 및 사용량 확인 시작");
          try {
            await checkSubscription(session.user.id);
          } catch (err) {
            console.error("[초기화] 구독 확인 실패했지만 계속 진행:", err);
          }
          try {
            await checkMonthlyUsage(session.user.id);
          } catch (err) {
            console.error("[초기화] 사용량 확인 실패했지만 계속 진행:", err);
          }
          console.log("[초기화] 구독 및 사용량 확인 완료");
        }
      } catch (error) {
        console.error("[초기화] 오류 발생:", error);
      } finally {
        console.log("[초기화] 로딩 플래그 false로 변경");
        setAuthLoading(false);
        setDataLoading(false);
      }
    };

    initAuth();

    // 🔥 auth 상태 변경 시에는 user 상태만 갱신하고,
    // 구독/사용량은 별도의 effect(user.id)에서 처리
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("[authStateChange] 이벤트:", _event, session?.user?.id);
      setUser(session?.user ?? null);

      if (!session?.user) {
        // 로그아웃 시 상태 초기화
        setIsSubscribed(false);
        setMonthlyUsage(0);
        setCurrentChatId(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // ✅ user.id가 바뀔 때마다(로그인/세션갱신 등) 구독/사용량 조회
  useEffect(() => {
    if (!user?.id) return;

    console.log("[user effect] 구독/사용량 로드:", user.id);

    (async () => {
      try {
        await checkSubscription(user.id);
      } catch (err) {
        console.error("[user effect] 구독 확인 실패:", err);
      }

      try {
        await checkMonthlyUsage(user.id);
      } catch (err) {
        console.error("[user effect] 사용량 확인 실패:", err);
      }
    })();
  }, [user?.id]);

  // 구독 상태 확인
  const checkSubscription = async (userId: string) => {
    console.log("[구독] 구독 정보 조회 시작:", userId);

    try {
      const { data, error } = await supabase
        .from("subscriptions")
        .select("*")
        .eq("user_id", userId)
        .single();

      console.log("[구독] 쿼리 완료");

      if (error) {
        // PGRST116 = row 없음 (Supabase에서 "Single row expected, none found")
        if ((error as any).code === "PGRST116") {
          console.log("[구독] 기존 구독 정보 없음 - 기본값(false) 적용");
          setIsSubscribed(false);
          return;
        }

        // 그 외 에러는 그냥 로그 찍고 기본값
        console.error("[구독] 조회 에러:", error);
        setIsSubscribed(false);
        return;
      }

      if (!data) {
        // data도 없고 error도 없는 경우 방어코드
        console.warn("[구독] 데이터/에러 둘 다 없음, 기본값 적용");
        setIsSubscribed(false);
        return;
      }

      const subscription = data as any;
      console.log("[구독] 구독 정보 있음:", subscription);

      if (subscription.subscription_end_date) {
        const endDate = new Date(subscription.subscription_end_date);
        const now = new Date();
        const active = subscription.is_subscribed && endDate > now;
        setIsSubscribed(active);
        console.log("[구독] 최종 구독 상태(만료일 포함):", active);
      } else {
        setIsSubscribed(subscription.is_subscribed);
        console.log("[구독] 최종 구독 상태:", subscription.is_subscribed);
      }

      console.log("[구독] 구독 확인 완료");
    } catch (e: any) {
      console.error("[구독] 구독 정보 로드 실패(try/catch):", e);
      setIsSubscribed(false);
    }
  };

  // 사용량 확인
  const checkMonthlyUsage = async (userId: string) => {
    const today = new Date().toISOString().slice(0, 10); // 'YYYY-MM-DD'
    console.log("[사용량] 사용량 조회 시작:", userId, today);

    try {
      const { data, error } = await supabase
        .from("usage_tracking")
        .select("*")
        .eq("user_id", userId)
        .eq("month", today)
        .single();

      console.log("[사용량] 쿼리 완료");

      if (error) {
        // row 없음 → 새 레코드 생성
        if ((error as any).code === "PGRST116") {
          console.log("[사용량] 기존 사용량 레코드 없음 - 0으로 처리");
          setMonthlyUsage(0);
          return;
        }

        console.error("[사용량] 조회 에러:", error);
        setMonthlyUsage(0);
        return;
      }

      if (!data) {
        console.warn("[사용량] 데이터/에러 둘 다 없음, 기본값 적용");
        setMonthlyUsage(0);
        return;
      }

      const usage = data as any;
      console.log("[사용량] 사용량 정보 있음:", usage.message_count);
      setMonthlyUsage(usage.message_count);
      console.log("[사용량] 사용량 확인 완료");
    } catch (e: any) {
      console.error("[사용량] 사용량 확인 실패(try/c치):", e);
      setMonthlyUsage(0);
    }
  };

  // 사용량 증가
  const incrementUsage = async (userId: string): Promise<number> => {
    try {
      const today = new Date().toISOString().slice(0, 10); // 'YYYY-MM-DD'

      const { data, error } = await supabase
        .from("usage_tracking")
        .select("*")
        .eq("user_id", userId)
        .eq("month", today)
        .single();

      if (error && (error as any).code !== "PGRST116") {
        console.error("[사용량] 증가 전 조회 에러:", error);
      }

      const usage = data as any;

      if (usage) {
        const newCount = usage.message_count + 1;
        await supabase
          .from("usage_tracking")
          .update({
            message_count: newCount,
            updated_at: new Date().toISOString(),
          })
          .eq("id", usage.id);
        setMonthlyUsage(newCount);
        return newCount;
      } else {
        await supabase.from("usage_tracking").insert({
          user_id: userId,
          month: today,
          message_count: 1,
        });
        setMonthlyUsage(1);
        return 1;
      }
    } catch (error) {
      console.error("사용량 증가 실패:", error);
      return monthlyUsage;
    }
  };

  // 오늘 리뷰 작성 여부 확인
  const checkTodayReview = async (userId: string): Promise<boolean> => {
    try {
      const today = new Date().toISOString().slice(0, 10); // 'YYYY-MM-DD'
      const { data, error } = await supabase
        .from("reviews")
        .select("id")
        .eq("user_id", userId)
        .gte("created_at", `${today}T00:00:00`)
        .lt("created_at", `${today}T23:59:59`)
        .limit(1);

      if (error) {
        console.error("[리뷰] 오늘 리뷰 확인 실패:", error);
        return false;
      }

      return data && data.length > 0;
    } catch (error) {
      console.error("[리뷰] 오늘 리뷰 확인 실패:", error);
      return false;
    }
  };

  const loadChatMessages = useCallback(async (chatId: string) => {
    try {
      const { data: messagesData, error } = await supabase
        .from("messages")
        .select("*")
        .eq("chat_room_id", chatId)
        .order("created_at", { ascending: true });

      if (error) {
        console.error("채팅 로드 실패:", error);
        return;
      }

      if (messagesData) {
        const loadedMessages: Message[] = messagesData.map((msg: any) => ({
          role: msg.role as "user" | "assistant",
          content: msg.content,
        }));
        setMessages(loadedMessages);

        setTimeout(() => {
          scrollToBottom();
        }, 100);
      }
    } catch (error) {
      console.error("채팅 로드 실패:", error);
    }
  }, []);

  // 채팅방 변경 시 메시지 로드는 handleChatSelect에서 처리
  // (새 채팅방 생성 시 메시지가 사라지는 버그 방지)

  const createNewChat = async (userId?: string) => {
    const targetUserId = userId || user?.id;
    if (!targetUserId) return null;

    try {
      const { data: chatRoom, error: chatRoomError } = await supabase
        .from("chat_rooms")
        .insert({
          user_id: targetUserId,
          title: "새로운 연애 상담",
        })
        .select()
        .single();

      if (chatRoomError) throw chatRoomError;

      return chatRoom.id as string;
    } catch (error) {
      console.error("채팅방 생성 실패:", error);
      return null;
    }
  };

  const saveMessage = async (
    chatId: string,
    role: "user" | "assistant",
    content: string
  ) => {
    try {
      await supabase.from("messages").insert({
        chat_room_id: chatId,
        role,
        content,
      });

      // 첫 사용자 메시지인 경우 채팅방 제목 업데이트
      if (role === "user") {
        const { data, error } = await supabase
          .from("messages")
          .select("id", { count: "exact" })
          .eq("chat_room_id", chatId)
          .eq("role", "user");

        if (error) {
          console.error("메시지 카운트 조회 실패:", error);
          return;
        }

        const messageCount = data as any[];

        if (messageCount && messageCount.length === 1) {
          const title =
            content.length > 30 ? content.substring(0, 30) + "..." : content;
          await supabase.from("chat_rooms").update({ title }).eq("id", chatId);
        }
      }
    } catch (error) {
      console.error("메시지 저장 실패:", error);
    }
  };

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    console.log("[메시지] 메시지 전송 시작");

    // 비로그인 유저의 메시지 제한 체크
    // messages.length에는 user + assistant 메시지가 모두 포함되므로 * 2
    const guestMessageLimit = CHAT_LIMITS.GUEST_MESSAGE_LIMIT * 2;
    if (!user && messages.length >= guestMessageLimit) {
      console.log("[메시지] 비로그인 사용자 제한 도달");
      alert("계속 상담하시려면 로그인해주세요.");
      setShowAuthModal(true);
      return;
    }

    // 로그인 + 비구독 유저의 사용량 체크
    if (
      user &&
      !isSubscribed &&
      monthlyUsage >= CHAT_LIMITS.FREE_USER_MESSAGE_LIMIT
    ) {
      console.log("[메시지] 무료 사용량 초과");
      setShowSubscriptionModal(true);
      return;
    }

    const userMessage: Message = { role: "user", content };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      console.log("[메시지] API 호출 시작");
      // 로그인한 사용자면 채팅방 생성 또는 기존 채팅방 사용
      let chatId = currentChatId;
      let isNewChat = false; // 새로 생성된 채팅방인지 추적
      
      if (user && !chatId) {
        console.log("[메시지] 새 채팅방 생성 시작");
        chatId = await createNewChat();
        if (chatId) {
          console.log("[메시지] 새 채팅방 생성됨:", chatId);
          isNewChat = true; // 새 채팅방 플래그 설정
          setCurrentChatId(chatId);
          setRefreshSidebar((prev) => prev + 1);
        } else {
          console.error("[메시지] 채팅방 생성 실패");
        }
      }



      console.log("[메시지] OpenAI API 호출 중...");
      
      // 3. API 호출 (메시지 전송 및 저장, 사용량 업데이트가 서버에서 처리됨)
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: newMessages,
          chatId: currentChatId, // chatId 전달
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "API 요청 실패");
      }

      const data = await response.json();
      const assistantMessage = data.message;

      // 4. 응답 메시지 UI 추가
      setMessages((prev) => [...prev, assistantMessage]);

      // 5. 사용량 UI 업데이트 (서버에서 이미 업데이트됨, 클라이언트 상태만 동기화)
      if (user) {
        // 간단히 1 증가시키거나, 정확성을 위해 다시 fetch 할 수 있음
        setMonthlyUsage((prev) => prev + 1);
        
        // 리뷰 모달 체크
        const currentCount = monthlyUsage + 1;
        if (currentCount === CHAT_LIMITS.REVIEW_TRIGGER_COUNT) {
          const hasReviewed = await checkTodayReview(user.id);
          if (!hasReviewed) {
            setShowReviewModal(true);
          }
        }
      }
      console.log("[메시지] 메시지 전송 완료");
    } catch (error: any) {
      console.error("[메시지] 오류 발생:", error);
      const errorMessage: Message = {
        role: "assistant",
        content: `오류가 발생했습니다: ${error.message}`,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      console.log("[메시지] 로딩 종료");
      setIsLoading(false);
    }
  };

  const handleNewChat = () => {
    setCurrentChatId(null);
    const welcomeMessage: Message = {
      role: "assistant",
      content:
        "안녕하세요! 연애 전문 상담사입니다. 💕\n\n연애 고민, 재회, 관계 회복 등 어떤 이야기든 편하게 나눠주세요. 함께 해결책을 찾아드릴게요!\n\n한 번에 사연을 너무 길게 보내면 더 좋은 상담이 어려워요. 저를 편안한 대화상대라 생각해주세요.\n먼저 나이, 성별, 상대방 나이 그리고 어떠한 고민(재회, 썸남, 썸녀, 짝사랑, 이별 슬픔, 등)인지 말씀해주세요!",
    };
    setMessages([welcomeMessage]);
  };

  const handleChatSelect = async (chatId: string) => {
    setCurrentChatId(chatId);
    // 채팅방 선택 시 해당 채팅방의 메시지 로드
    await loadChatMessages(chatId);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setCurrentChatId(null);
    setMessages([]);
  };

  // 첫 방문 시 환영 메시지 설정 (이제 성별/나이 안 물어봄)
  useEffect(() => {
    if (!authLoading && !dataLoading && messages.length === 0) {
      const welcomeMessage: Message = {
        role: "assistant",
        content:
          "안녕하세요! 연애 전문 상담사입니다. 💕\n\n연애 고민, 재회, 관계 회복 등 어떤 이야기든 편하게 나눠주세요. 함께 해결책을 찾아드릴게요!\n\n한 번에 사연을 너무 길게 보내면 더 좋은 상담이 어려워요. 저를 편안한 대화상대라 생각해주세요.\n먼저 나이, 성별, 상대방 나이 그리고 어떠한 고민(재회, 썸남, 썸녀, 짝사랑, 이별 슬픔, 등)인지 말씀해주세요!",
      };
      setMessages([welcomeMessage]);
    }
  }, [authLoading, dataLoading, messages.length]);

  // URL 파라미터로 subscribe=true가 있으면 구독 모달 열기
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    // 데이터 로딩이 완료되고, user가 있고, subscribe 파라미터가 있을 때만 모달 열기
    if (
      params.get("subscribe") === "true" &&
      user &&
      !authLoading &&
      !dataLoading
    ) {
      setShowSubscriptionModal(true);
      // URL에서 파라미터 제거
      window.history.replaceState({}, "", "/");
    }
  }, [user, authLoading, dataLoading]);

  // ❗ 이제는 authLoading/dataLoading이 UI를 막지 않음
  return (
    <div className="flex h-screen bg-gradient-premium relative overflow-hidden">
      {/* 배경 장식 요소 - 초반에만 나타났다 사라짐 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-0 -left-40 w-80 h-80 bg-purple-200/40 rounded-full mix-blend-normal filter blur-3xl opacity-0 animate-fadeIn"
          style={{
            animation:
              "fadeIn 2s ease-out forwards, fadeOut 2s ease-out 15s forwards",
          }}
        ></div>
        <div
          className="absolute top-0 -right-40 w-80 h-80 bg-pink-200/30 rounded-full mix-blend-normal filter blur-3xl opacity-0 delay-100"
          style={{
            animation:
              "fadeIn 2s ease-out 0.5s forwards, fadeOut 2s ease-out 17.5s forwards",
          }}
        ></div>
      </div>
      <style jsx>{`
        @keyframes fadeOut {
          from {
            opacity: 0.15;
          }
          to {
            opacity: 0;
          }
        }
      `}</style>
      {/* Sidebar - 로그인한 사용자만 표시 */}
      {user && (
        <>
          {/* 모바일 오버레이 배경 */}
          {isSidebarOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}

          {/* 사이드바 - 데스크톱에서는 항상 표시, 모바일에서는 조건부 표시 */}
          <div
            className={`
              fixed md:static inset-y-0 left-0 z-50
              transform transition-transform duration-300 ease-in-out
              ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
              md:translate-x-0
            `}
          >
            <ChatHistorySidebar
              userId={user.id}
              currentChatId={currentChatId}
              onChatSelect={(chatId) => {
                handleChatSelect(chatId);
                // 모바일에서 채팅 선택 시 사이드바 닫기
                setIsSidebarOpen(false);
              }}
              onNewChat={() => {
                handleNewChat();
                // 모바일에서 새 채팅 시작 시 사이드바 닫기
                setIsSidebarOpen(false);
              }}
              refreshTrigger={refreshSidebar}
            />
          </div>
        </>
      )}

      <div className="flex flex-col flex-1 relative z-10">
        {/* Header */}
        <header className="glass-effect border-b border-white/20 shadow-premium-lg p-3 md:p-5 flex justify-between items-center relative z-50">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 -z-10"></div>
          <div className="flex items-center gap-2 md:gap-4 relative z-10 flex-1 min-w-0">
            {/* 햄버거 메뉴 버튼 - 로그인한 사용자의 모바일에서만 표시 */}
            {user && (
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="md:hidden text-purple-600 hover:bg-purple-100 p-2 rounded-xl transition-all duration-300 hover:scale-105 shadow-premium-sm flex-shrink-0"
                aria-label="메뉴 열기"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            )}
            <div className="animate-fadeIn flex items-center gap-2 md:gap-3 min-w-0 flex-1">
              <div className="text-3xl md:text-5xl animate-pulse-soft flex-shrink-0">💕</div>
              <div className="min-w-0 flex-1">
                <h1 className="text-lg md:text-3xl font-extrabold text-gradient tracking-tight truncate">
                  연애 솔루션
                </h1>
                <p className="text-purple-600/80 text-xs md:text-sm mt-0.5 font-medium tracking-wide hidden sm:block">
                  짝사랑, 재회, 관계 회복, 이별 극복 등 연애 전문가가 만든 AI
                  기반 전문 상담 서비스
                </p>
              </div>
            </div>
          </div>
          {user ? (
            <UserMenu onLogout={handleLogout} />
          ) : (
            <div className="flex gap-2 md:gap-3 relative z-10 flex-shrink-0">
              <button
                onClick={() => {
                  setAuthModalSignUpOnly(false);
                  setShowAuthModal(true);
                }}
                className="glass-effect px-3 md:px-6 py-2 md:py-2.5 rounded-xl font-semibold text-purple-600 hover-lift shadow-premium-sm border border-purple-200/50 hover:border-purple-300/80 transition-all duration-300 text-sm md:text-base whitespace-nowrap"
              >
                로그인
              </button>
              <button
                onClick={() => {
                  setShowSubscriptionModal(true);
                }}
                className="bg-gradient-to-r from-purple-400 to-purple-500 text-white px-3 md:px-6 py-2 md:py-2.5 rounded-xl font-semibold hover:shadow-premium-lg shadow-premium-md transition-all duration-300 relative overflow-hidden group text-sm md:text-base whitespace-nowrap"
              >
                <span className="relative z-10">구독하기</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          )}
        </header>

        {/* Auth Modal - 로그인/회원가입 */}
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          signUpOnly={authModalSignUpOnly}
          onSuccess={async () => {
            // 로그인/회원가입 성공 후 현재 대화를 DB에 저장
            const {
              data: { session },
            } = await supabase.auth.getSession();
            if (session?.user) {
              setUser(session.user);

              // 비로그인 상태에서 쌓여 있던 메시지들을 새 채팅방으로 저장
              // ✅ 실제 사용자 메시지가 있을 때만 저장 (환영 메시지만 있는 경우 제외)
              const hasUserMessages = messages.some(msg => msg.role === 'user');
              if (hasUserMessages && !currentChatId) {
                const messagesToSave = [...messages]; // 현재 메시지 복사
                const newChatId = await createNewChat(session.user.id);
                if (newChatId) {
                  for (const msg of messagesToSave) {
                    await saveMessage(newChatId, msg.role, msg.content);
                  }
                  setCurrentChatId(newChatId);
                  setRefreshSidebar((prev) => prev + 1);
                }
              }

              // 구독/사용량 갱신 (user.id effect에서도 한 번 더 돌긴 하지만 상관 없음)
              await Promise.all([
                checkSubscription(session.user.id),
                checkMonthlyUsage(session.user.id),
              ]);
            }
          }}
        />

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-6 scroll-smooth relative">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center animate-fadeIn max-w-md">
                <div className="relative inline-block mb-6">
                  <div className="text-7xl animate-float">💕</div>
                  <div className="absolute inset-0 blur-2xl bg-pink-400/20 animate-pulse-soft"></div>
                </div>
                <h2 className="text-2xl font-bold text-gradient mb-3">
                  연애 상담을 시작해보세요
                </h2>
                <p className="text-gray-500 text-base leading-relaxed">
                  AI 전문 상담사가 여러분의 연애 고민을
                  <br />
                  함께 해결해드립니다
                </p>
                <div className="mt-8 flex items-center justify-center gap-2 text-sm text-gray-400">
                  <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></div>
                  <span>편안하게 대화를 시작해주세요</span>
                </div>
              </div>
            </div>
          ) : (
            <>
              {messages.map((message, index) => (
                <ChatMessage
                  key={index}
                  role={message.role}
                  content={message.content}
                />
              ))}
              {isLoading && (
                <div className="flex justify-start mb-6 animate-fadeIn">
                  <div className="glass-effect rounded-3xl px-8 py-4 shadow-premium-md border border-purple-200/30">
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full animate-bounce shadow-premium-sm"></div>
                        <div className="w-3 h-3 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full animate-bounce delay-100 shadow-premium-sm"></div>
                        <div className="w-3 h-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full animate-bounce delay-200 shadow-premium-sm"></div>
                      </div>
                      <span className="text-sm text-purple-600/70 font-medium">
                        AI가 답변 중...
                      </span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Input */}
        <ChatInput onSend={handleSendMessage} disabled={isLoading} />

        {/* Footer - 비로그인 유저용 */}
        {!user && (
          <div className="glass-effect border-t border-white/20 py-4 px-6 shadow-inner-soft relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-blue-500/5"></div>
            <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-xs text-gray-600 relative z-10">
              <span className="font-medium">
                솔(SOL) | 사업자: 337-03-03814 | 대표: 김정곤 | 전화:
                010-8348-0132
              </span>
              <div className="flex gap-4">
                <a
                  href="/pricing"
                  className="hover:text-purple-600 transition-all duration-200 font-medium hover:underline"
                >
                  상품안내
                </a>
                <a
                  href="/terms"
                  className="hover:text-purple-600 transition-all duration-200 font-medium hover:underline"
                >
                  이용약관
                </a>
                <a
                  href="/privacy"
                  className="hover:text-purple-600 transition-all duration-200 font-medium hover:underline"
                >
                  개인정보처리방침
                </a>
                <a
                  href="/refund"
                  className="hover:text-purple-600 transition-all duration-200 font-medium hover:underline"
                >
                  환불정책
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Subscription Modal */}
      <SubscriptionModal
        isOpen={showSubscriptionModal}
        onClose={() => setShowSubscriptionModal(false)}
        currentUsage={monthlyUsage}
        maxUsage={CHAT_LIMITS.FREE_USER_MESSAGE_LIMIT}
        userId={user?.id}
        onAuthRequired={() => {
          setShowSubscriptionModal(false);
          setAuthModalSignUpOnly(true);
          setShowAuthModal(true);
        }}
      />

      {/* Review Modal */}
      {user && (
        <ReviewModal
          isOpen={showReviewModal}
          onClose={() => setShowReviewModal(false)}
          userId={user.id}
        />
      )}
    </div>
  );
}
