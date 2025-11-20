'use client';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatMessage({ role, content }: ChatMessageProps) {
  const isUser = role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-[70%] rounded-lg px-4 py-3 shadow-md ${
          isUser
            ? 'bg-gradient-to-r from-rose-400 to-pink-400 text-white'
            : 'bg-white text-gray-800 border-2 border-rose-200'
        }`}
      >
        <div className="text-sm font-semibold mb-1">
          {isUser ? '💔 상담자' : '💕 재회 상담사'}
        </div>
        <div className="whitespace-pre-wrap leading-relaxed">{content}</div>
      </div>
    </div>
  );
}
