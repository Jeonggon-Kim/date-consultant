"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface ChatRoom {
  id: string;
  title: string;
  created_at: string;
}

interface ChatHistorySidebarProps {
  userId: string;
  currentChatId: string | null;
  onChatSelect: (chatId: string) => void;
  onNewChat: () => void;
  refreshTrigger?: number; // 채팅방 목록 새로고침 트리거
}

export default function ChatHistorySidebar({
  userId,
  currentChatId,
  onChatSelect,
  onNewChat,
  refreshTrigger,
}: ChatHistorySidebarProps) {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [loading, setLoading] = useState(true);
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);

  useEffect(() => {
    loadChatRooms();
  }, [userId, refreshTrigger]); // refreshTrigger가 변경될 때마다 목록 새로고침

  // 메뉴 외부 클릭 시 메뉴 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // 메뉴나 점 3개 버튼을 클릭한 경우는 무시
      if (target.closest(".menu-dropdown") || target.closest(".menu-toggle")) {
        return;
      }
      setMenuOpenId(null);
    };

    if (menuOpenId) {
      // 약간의 지연을 두고 이벤트 리스너 등록
      setTimeout(() => {
        document.addEventListener("click", handleClickOutside);
      }, 0);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [menuOpenId]);

  const loadChatRooms = async () => {
    if (!userId) {
      console.log("userId 없음, 로딩 종료");
      setLoading(false);
      return;
    }

    try {
      console.log("채팅방 목록 로드 중... userId:", userId);

      const { data, error } = await supabase
        .from("chat_rooms")
        .select("id, title, created_at")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("쿼리 에러:", error);
        throw error;
      }

      console.log("로드된 채팅방 개수:", data?.length);
      setChatRooms(data || []);
    } catch (error: any) {
      console.error("채팅방 목록 로드 실패:", error);
      // 에러가 발생해도 빈 배열로 설정
      setChatRooms([]);
    } finally {
      console.log("채팅방 로딩 상태 false로 변경");
      setLoading(false);
    }
  };

  const handleDeleteChat = async (chatId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // 채팅방 선택 이벤트 방지

    if (!confirm("정말 이 채팅방을 삭제하시겠습니까?")) {
      return;
    }

    try {
      console.log("삭제 시도 - chatId:", chatId, "userId:", userId);

      const { error } = await supabase
        .from("chat_rooms")
        .delete()
        .eq("id", chatId);

      if (error) {
        console.error("삭제 오류:", error);
        throw error;
      }

      console.log("삭제 성공");

      // 삭제된 채팅방이 현재 선택된 채팅방이면 새 채팅 시작
      if (currentChatId === chatId) {
        onNewChat();
      }

      // 목록 새로고침
      await loadChatRooms();
      setMenuOpenId(null);

      console.log("삭제 완료");
    } catch (error: any) {
      console.error("채팅방 삭제 실패:", error);
      alert(`채팅방 삭제에 실패했습니다: ${error.message}`);
    }
  };

  const toggleMenu = (chatId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // 채팅방 선택 이벤트 방지
    e.preventDefault(); // 기본 동작 방지
    setMenuOpenId(menuOpenId === chatId ? null : chatId);
  };

  return (
    <div className="w-64 bg-gradient-to-b from-rose-100 to-pink-100 h-screen flex flex-col border-r-2 border-rose-200">
      {/* 채팅방 리스트 영역 */}
      <div className="flex-1 overflow-y-auto p-4">
        <button
          onClick={onNewChat}
          className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white py-3 rounded-lg font-semibold hover:from-rose-600 hover:to-pink-600 mb-4 shadow-md transition-all"
        >
          + 새로운 상담
        </button>

        <div className="space-y-2">
          {loading ? (
            <div className="text-center text-gray-500 py-4">로딩 중...</div>
          ) : chatRooms.length === 0 ? (
            <div className="text-center text-gray-500 py-4 text-sm">
              아직 채팅 기록이 없습니다
            </div>
          ) : (
            chatRooms.map((room) => (
              <div key={room.id} className="relative">
                <button
                  onClick={() => onChatSelect(room.id)}
                  className={`w-full text-left p-3 rounded-lg transition-all ${
                    currentChatId === room.id
                      ? "bg-rose-500 text-white shadow-md"
                      : "bg-white text-gray-700 hover:bg-rose-50"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm truncate">
                        {room.title}
                      </div>
                      <div className="text-xs opacity-75 mt-1">
                        {new Date(room.created_at).toLocaleDateString("ko-KR")}
                      </div>
                    </div>
                    <button
                      onClick={(e) => toggleMenu(room.id, e)}
                      className={`menu-toggle ml-2 p-1 rounded hover:bg-opacity-20 hover:bg-gray-500 transition-colors ${
                        currentChatId === room.id
                          ? "text-white"
                          : "text-gray-500"
                      }`}
                    >
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <circle cx="8" cy="3" r="1.5" />
                        <circle cx="8" cy="8" r="1.5" />
                        <circle cx="8" cy="13" r="1.5" />
                      </svg>
                    </button>
                  </div>
                </button>

                {menuOpenId === room.id && (
                  <div
                    className="menu-dropdown absolute right-0 top-0 mt-1 z-10 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={(e) => handleDeleteChat(room.id, e)}
                      className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors whitespace-nowrap"
                    >
                      삭제
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Footer 영역 - 하단 고정 */}
      <div className="bg-rose-200 border-t border-rose-300 p-3">
        <div className="text-xs text-gray-700 space-y-1">
          <p className="font-semibold">솔(SOL)</p>
          <p>사업자: 337-03-03814</p>
          <p>대표: 김정곤</p>
          <p>
            고객센터:{" "}
            <a 
              href="https://open.kakao.com/o/sEgKYL3h" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 underline font-semibold"
            >
              카카오톡 상담
            </a>
          </p>
        </div>
        <div className="mt-2 pt-2 border-t border-rose-300 space-y-1">
          <a
            href="/pricing"
            className="block text-xs text-gray-600 hover:text-rose-600"
          >
            상품안내
          </a>
          <a
            href="/terms"
            className="block text-xs text-gray-600 hover:text-rose-600"
          >
            이용약관
          </a>
          <a
            href="/privacy"
            className="block text-xs text-gray-600 hover:text-rose-600"
          >
            개인정보처리방침
          </a>
          <a
            href="/refund"
            className="block text-xs text-gray-600 hover:text-rose-600"
          >
            환불정책
          </a>
        </div>
      </div>
    </div>
  );
}
