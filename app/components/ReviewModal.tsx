'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
}

export default function ReviewModal({
  isOpen,
  onClose,
  userId,
}: ReviewModalProps) {
  const [review, setReview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!review.trim()) {
      alert('리뷰를 작성해주세요.');
      return;
    }

    if (review.length > 200) {
      alert('리뷰는 200자 이하로 작성해주세요.');
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from('reviews').insert({
        user_id: userId,
        content: review.trim(),
      });

      if (error) throw error;

      alert('소중한 리뷰 감사합니다! 💕');
      setReview('');
      onClose();
    } catch (error: any) {
      console.error('리뷰 저장 실패:', error);
      alert('리뷰 저장에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSkip = () => {
    setReview('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start md:items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl p-4 md:p-8 max-w-md w-full m-4 max-h-[95vh] overflow-y-auto">
        <div className="text-center mb-4">
          <h2 className="text-xl md:text-2xl font-bold text-purple-900 mb-2">
            💝 소중한 의견을 들려주세요
          </h2>
          <p className="text-sm md:text-base text-gray-600">
            더 나은 서비스를 위해 여러분의 목소리가 필요합니다
          </p>
        </div>

        <div className="bg-purple-50 rounded-lg p-4 mb-4">
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="개선점, 아쉬운 점, 좋았던 점 등 자유롭게 작성해주세요. (200자 이하)"
            maxLength={200}
            rows={6}
            className="w-full p-3 border border-purple-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
          />
          <div className="text-right text-xs text-gray-500 mt-1">
            {review.length} / 200자
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <p className="text-center text-blue-800 text-xs font-semibold mb-1">
            💝 후원 계좌
          </p>
          <p className="text-center text-blue-700 text-xs">
            우리은행 1002-138843279
          </p>
          <p className="text-center text-blue-600 text-xs font-medium mb-2">
            김정곤
          </p>
          <p className="text-center text-gray-600 text-xs leading-relaxed">
            정말 좋은 연애 도우미 플랫폼으로 나아가기 위해
            <br />
            여러분의 도움이 필요합니다 🙏
          </p>
        </div>

        <div className="space-y-2">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || !review.trim()}
            className={`w-full py-3 md:py-4 rounded-lg font-bold text-base md:text-lg transition-all shadow-lg ${
              isSubmitting || !review.trim()
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-xl'
            }`}
          >
            {isSubmitting ? '제출 중...' : '리뷰 제출하기'}
          </button>

          <button
            onClick={handleSkip}
            disabled={isSubmitting}
            className="w-full bg-gray-100 text-gray-700 py-2.5 md:py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all text-sm md:text-base disabled:opacity-50"
          >
            다음에 하기
          </button>
        </div>

        <p className="text-xs text-gray-500 text-center mt-3">
          소중한 의견은 서비스 개선에 큰 도움이 됩니다 ❤️
        </p>
      </div>
    </div>
  );
}
