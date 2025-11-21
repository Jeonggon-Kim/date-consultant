"use client";

import { useState, useRef, useEffect } from "react";
import ChatMessage from "./components/ChatMessage";
import ChatInput from "./components/ChatInput";
import AuthModal from "./components/AuthModal";
import ChatHistorySidebar from "./components/ChatHistorySidebar";
import SubscriptionModal from "./components/SubscriptionModal";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const FREE_MESSAGE_LIMIT = 10; // 무료 사용자 메시지 제한 (현재는 날짜 기준)

export default function Home() {
  const [user, setUser] = useState<User | null>(null);

  // ❗ 로딩은 더 이상 UI를 막지 않는다 (초기값 false)
  const [authLoading, setAuthLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshSidebar, setRefreshSidebar] = useState(0); // 사이드바 새로고침 트리거
  const [isSubscribed, setIsSubscribed] = useState(false); // 구독 여부
  const [monthlyUsage, setMonthlyUsage] = useState(0); // 이번 달(지금은 날짜) 사용량
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

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      console.log("[authStateChange] 이벤트:", _event, session?.user?.id);
      setUser(session?.user ?? null);

      if (session?.user) {
        await Promise.all([
          checkSubscription(session.user.id),
          checkMonthlyUsage(session.user.id),
        ]);
      } else {
        // 로그아웃 시 상태 초기화
        setIsSubscribed(false);
        setMonthlyUsage(0);
        setCurrentChatId(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

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
          console.log("[구독] 기존 구독 정보 없음 - 새 레코드 생성");

          const { error: insertError } = await supabase
            .from("subscriptions")
            .insert({
              user_id: userId,
              is_subscribed: false,
            });

          if (insertError) {
            console.error("[구독] 새 레코드 생성 실패:", insertError);
          }

          setIsSubscribed(false);
          console.log("[구독] 기본값(is_subscribed = false) 적용");
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
          console.log("[사용량] 기존 사용량 레코드 없음 - 새로 생성");

          const { error: insertError } = await supabase
            .from("usage_tracking")
            .insert({
              user_id: userId,
              month: today,
              message_count: 0,
            });

          if (insertError) {
            console.error("[사용량] 새 레코드 생성 실패:", insertError);
          }

          setMonthlyUsage(0);
          console.log("[사용량] 기본값(0) 적용");
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
      console.error("[사용량] 사용량 확인 실패(try/catch):", e);
      setMonthlyUsage(0);
    }
  };

  // 사용량 증가
  const incrementUsage = async (userId: string) => {
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
      } else {
        await supabase.from("usage_tracking").insert({
          user_id: userId,
          month: today,
          message_count: 1,
        });
        setMonthlyUsage(1);
      }
    } catch (error) {
      console.error("사용량 증가 실패:", error);
    }
  };

  // 채팅방 변경 시 해당 채팅방 메시지 로드
  useEffect(() => {
    if (currentChatId && user) {
      loadChatMessages(currentChatId);
    }
  }, [currentChatId, user]);

  const loadChatMessages = async (chatId: string) => {
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
  };

  const createNewChat = async (userId?: string) => {
    const targetUserId = userId || user?.id;
    if (!targetUserId) return null;

    try {
      const { data: chatRoom, error: chatRoomError } = await supabase
        .from("chat_rooms")
        .insert({
          user_id: targetUserId,
          title: "새로운 재회 상담",
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

    // 비로그인 유저의 메시지 제한 체크 (user+assistant 포함 10개)
    if (!user && messages.length >= 10) {
      console.log("[메시지] 비로그인 사용자 제한 도달");
      alert("계속 상담하시려면 로그인해주세요.");
      setShowAuthModal(true);
      return;
    }

    // 로그인 + 비구독 유저의 사용량 체크
    if (user && !isSubscribed && monthlyUsage >= FREE_MESSAGE_LIMIT) {
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
      if (user && !chatId) {
        console.log("[메시지] 새 채팅방 생성 시작");
        chatId = await createNewChat();
        if (chatId) {
          console.log("[메시지] 새 채팅방 생성됨:", chatId);
          setCurrentChatId(chatId);
          setRefreshSidebar((prev) => prev + 1);
        } else {
          console.error("[메시지] 채팅방 생성 실패");
        }
      }

      // 사용자 메시지 저장
      if (user && chatId) {
        console.log("[메시지] 사용자 메시지 저장 중...");
        await saveMessage(chatId, "user", content);
        console.log("[메시지] 사용자 메시지 저장 완료");
      }

      console.log("[메시지] OpenAI API 호출 중...");
      // 30초 타임아웃 설정
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('API 요청 시간 초과 (30초)')), 30000)
      );

      const fetchPromise = fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: newMessages,
        }),
      });

      const response = await Promise.race([fetchPromise, timeoutPromise]) as Response;

      console.log("[메시지] API 응답 수신:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("[메시지] API 오류 응답:", errorText);
        throw new Error(`API 요청 실패: ${response.status}`);
      }

      const data = await response.json();
      console.log("[메시지] 응답 데이터 파싱 완료");

      if (data.error) {
        throw new Error(data.error);
      }

      const assistantMessage: Message = {
        role: "assistant",
        content: data.message.content,
      };

      const updatedMessages = [...newMessages, assistantMessage];
      setMessages(updatedMessages);

      // AI 응답 저장
      if (user && chatId) {
        console.log("[메시지] AI 응답 저장 중...");
        await saveMessage(chatId, "assistant", data.message.content);
        console.log("[메시지] AI 응답 저장 완료");
      }

      // 로그인한 유저의 사용량 증가
      if (user) {
        console.log("[메시지] 사용량 증가 시작");
        await incrementUsage(user.id);
        console.log("[메시지] 사용량 증가 완료");
      }
      console.log("[메시지] 메시지 전송 완료");
    } catch (error: any) {
      console.error("[메시지] 오류 발생:", error);
      const errorMessage: Message = {
        role: "assistant",
        content: `오류가 발생했습니다: ${error.message}`,
      };
      setMessages([...newMessages, errorMessage]);
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
        "새로운 상담을 시작해볼게요. 🙂\n\n지금 어떤 상황인지 편하게 말씀해 주세요.",
    };
    setMessages([welcomeMessage]);
  };

  const handleChatSelect = (chatId: string) => {
    setCurrentChatId(chatId);
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
          "안녕하세요! 재회 전문 상담사입니다. 💕\n\n지금 어떤 상황인지 편하게 써주시면, 차분하게 같이 정리해 드릴게요.",
      };
      setMessages([welcomeMessage]);
    }
  }, [authLoading, dataLoading, messages.length]);

  // ❗ 이제는 authLoading/dataLoading이 UI를 막지 않음
  return (
    <div className="flex h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50">
      {/* Sidebar - 로그인한 사용자만 표시 */}
      {user && (
        <ChatHistorySidebar
          userId={user.id}
          currentChatId={currentChatId}
          onChatSelect={handleChatSelect}
          onNewChat={handleNewChat}
          refreshTrigger={refreshSidebar}
        />
      )}

      <div className="flex flex-col flex-1">
        {/* Header */}
        <header className="bg-gradient-to-r from-rose-500 to-pink-500 shadow-lg p-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">💕 재회 솔루션</h1>
            <p className="text-pink-100 text-sm mt-1">
              전문 상담사가 함께합니다
            </p>
          </div>
          {user ? (
            <button
              onClick={handleLogout}
              className="bg-white text-rose-500 px-4 py-2 rounded-lg font-semibold hover:bg-rose-50 transition-all text-sm"
            >
              로그아웃
            </button>
          ) : (
            <button
              onClick={() => setShowAuthModal(true)}
              className="bg-white text-rose-500 px-4 py-2 rounded-lg font-semibold hover:bg-rose-50 transition-all text-sm border-2 border-white"
            >
              로그인
            </button>
          )}
        </header>

        {/* Auth Modal - 로그인/회원가입 */}
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          signUpOnly={false}
          onSuccess={async () => {
            // 로그인/회원가입 성공 후 현재 대화를 DB에 저장
            const {
              data: { session },
            } = await supabase.auth.getSession();
            if (session?.user) {
              setUser(session.user);

              // 비로그인 상태에서 쌓여 있던 메시지들을 새 채팅방으로 저장
              if (messages.length > 0 && !currentChatId) {
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

              // 구독/사용량 갱신
              await Promise.all([
                checkSubscription(session.user.id),
                checkMonthlyUsage(session.user.id),
              ]);
            }
          }}
        />

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-4">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500 text-lg">재회 상담을 시작해보세요!</p>
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
                <div className="flex justify-start mb-4">
                  <div className="bg-pink-100 rounded-lg px-4 py-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-rose-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-rose-500 rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-rose-500 rounded-full animate-bounce delay-200"></div>
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
      </div>

      {/* Subscription Modal */}
      <SubscriptionModal
        isOpen={showSubscriptionModal}
        onClose={() => setShowSubscriptionModal(false)}
        currentUsage={monthlyUsage}
        maxUsage={FREE_MESSAGE_LIMIT}
        userId={user?.id}
      />
    </div>
  );
}
