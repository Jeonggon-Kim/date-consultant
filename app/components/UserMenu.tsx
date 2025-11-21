"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

interface UserMenuProps {
  onLogout: () => void;
}

export default function UserMenu({ onLogout }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // 외부 클릭 감지하여 메뉴 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleMyInfoClick = () => {
    setIsOpen(false);
    router.push("/profile");
  };

  const handleLogoutClick = () => {
    setIsOpen(false);
    onLogout();
  };

  return (
    <div className="relative z-[9999]" ref={menuRef} style={{pointerEvents: 'auto'}}>
      {/* 회원 아이콘 버튼 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="glass-effect border border-purple-200/50 text-purple-600 p-2.5 rounded-xl hover:border-purple-300/80 hover-lift shadow-premium-sm transition-all duration-300 relative z-[9999]"
        aria-label="사용자 메뉴"
        style={{pointerEvents: 'auto'}}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
          />
        </svg>
      </button>

      {/* 드롭다운 메뉴 */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-56 glass-effect rounded-2xl shadow-premium-xl border border-purple-200/40 py-2 z-[9999] animate-fadeIn" style={{pointerEvents: 'auto'}}>
          <button
            onClick={handleMyInfoClick}
            className="w-full text-left px-5 py-3 text-gray-700 hover:bg-purple-50/80 transition-all duration-200 flex items-center gap-3 font-medium group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="white"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <span className="text-purple-700">내 정보</span>
          </button>
          <div className="border-t border-purple-200/30 my-2 mx-3"></div>
          <button
            onClick={handleLogoutClick}
            className="w-full text-left px-5 py-3 text-gray-700 hover:bg-purple-50/80 transition-all duration-200 flex items-center gap-3 font-medium group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-gray-400 to-gray-500 flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="white"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                />
              </svg>
            </div>
            <span className="text-gray-600">로그아웃</span>
          </button>
        </div>
      )}
    </div>
  );
}
