'use client';

import { useState, KeyboardEvent } from 'react';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled: boolean;
}

export default function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [input, setInput] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSend = () => {
    if (input.trim() && !disabled) {
      onSend(input);
      setInput('');
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="glass-effect border-t border-white/20 p-6 shadow-premium-xl relative">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-blue-500/5"></div>

      <div className="flex gap-4 max-w-5xl mx-auto relative z-10">
        <div className="flex-1 relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="궁금한 것을 편하게 질문해주세요..."
            disabled={disabled}
            className={`w-full resize-none rounded-3xl px-6 py-4 focus:outline-none disabled:bg-gray-50/50 disabled:text-gray-400 transition-all duration-300 font-medium ${
              isFocused
                ? 'glass-effect border-2 border-purple-400/60 shadow-premium-lg'
                : 'bg-white/90 border-2 border-purple-200/30 shadow-premium-sm'
            }`}
            rows={1}
          />
          {/* 포커스 시 그라데이션 효과 */}
          {isFocused && (
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-purple-500/10 pointer-events-none animate-fadeIn"></div>
          )}
        </div>

        <button
          onClick={handleSend}
          disabled={disabled || !input.trim()}
          className="bg-gradient-to-br from-purple-400 to-purple-500 text-white px-10 py-4 rounded-3xl disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed disabled:shadow-none transition-all duration-300 shadow-premium-md hover:shadow-premium-lg font-semibold text-base relative overflow-hidden group"
        >
          <span className="relative z-10 flex items-center gap-2">
            전송
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </span>
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>
      </div>

      <div className="text-center mt-3 text-xs text-gray-500 relative z-10 flex items-center justify-center gap-4">
        <div className="flex items-center gap-1.5">
          <kbd className="px-2.5 py-1 glass-effect rounded-lg text-purple-600 font-semibold shadow-premium-xs border border-purple-200/30">Enter</kbd>
          <span>전송</span>
        </div>
        <span className="text-gray-300">·</span>
        <div className="flex items-center gap-1.5">
          <kbd className="px-2.5 py-1 glass-effect rounded-lg text-purple-600 font-semibold shadow-premium-xs border border-purple-200/30">Shift + Enter</kbd>
          <span>줄바꿈</span>
        </div>
      </div>
    </div>
  );
}
