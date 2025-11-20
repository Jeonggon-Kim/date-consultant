'use client';

import { useState, KeyboardEvent } from 'react';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled: boolean;
}

export default function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [input, setInput] = useState('');

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
    <div className="border-t-2 border-rose-300 p-4 bg-white shadow-lg">
      <div className="flex gap-2">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="궁금한 것을 질문해주세요... (예: 재회 가능성이 있을까요?)"
          disabled={disabled}
          className="flex-1 resize-none border-2 border-rose-200 rounded-lg px-4 py-2 focus:outline-none focus:border-rose-500 disabled:bg-gray-100"
          rows={1}
        />
        <button
          onClick={handleSend}
          disabled={disabled || !input.trim()}
          className="bg-gradient-to-r from-rose-400 to-pink-400 text-white px-6 py-2 rounded-lg hover:from-rose-500 hover:to-pink-500 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all shadow-md"
        >
          전송
        </button>
      </div>
    </div>
  );
}
