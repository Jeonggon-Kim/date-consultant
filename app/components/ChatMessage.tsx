'use client';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatMessage({ role, content }: ChatMessageProps) {
  const isUser = role === 'user';

  return (
    <div
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-6 ${
        isUser ? 'animate-slideInRight' : 'animate-slideInLeft'
      }`}
    >
      <div
        className={`max-w-[75%] rounded-3xl px-6 py-4 transition-all duration-300 relative group ${
          isUser
            ? 'bg-gradient-to-br from-purple-400/90 to-purple-500/90 text-white shadow-premium-md hover:shadow-premium-lg'
            : 'glass-effect text-gray-800 border border-purple-200/40 shadow-premium-md hover-lift'
        }`}
      >
        {/* 메시지 헤더 */}
        <div className={`text-sm font-bold mb-3 flex items-center gap-2 ${
          isUser ? 'text-white/90' : 'text-gradient'
        }`}>
          <span className="text-xl">{isUser ? '💭' : '💕'}</span>
          <span className="tracking-wide">{isUser ? '나' : 'AI 상담사'}</span>
        </div>

        {/* 메시지 내용 */}
        <div className={`whitespace-pre-wrap leading-relaxed tracking-wide ${
          isUser ? 'text-white font-medium' : 'text-gray-700'
        }`}>
          {content}
        </div>

        {/* 장식 효과 - 사용자 메시지용 */}
        {isUser && (
          <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-purple-400 rounded-full opacity-10 blur-xl group-hover:opacity-20 transition-opacity"></div>
        )}
      </div>
    </div>
  );
}
