'use client';

import { useState } from 'react';
import AuthModal from './AuthModal';

interface BreakupInfo {
  gender: 'male' | 'female';
  age: string;
  partnerAge: string;
}

interface BreakupSurveyFormProps {
  onSubmit: (info: BreakupInfo) => void;
  onLoginClick: () => void;
}

export default function BreakupSurveyForm({ onSubmit, onLoginClick }: BreakupSurveyFormProps) {
  const [breakupInfo, setBreakupInfo] = useState<BreakupInfo>({
    gender: 'male',
    age: '',
    partnerAge: '',
  });

  const handleChange = (field: keyof BreakupInfo, value: string) => {
    setBreakupInfo({ ...breakupInfo, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (breakupInfo.age && breakupInfo.partnerAge) {
      onSubmit(breakupInfo);
    }
  };

  const isFormValid = () => {
    return breakupInfo.age !== '' && breakupInfo.partnerAge !== '';
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full border-4 border-rose-400 relative">
        {/* 로그인 버튼 - 카드 내부 오른쪽 상단 */}
        <button
          onClick={onLoginClick}
          className="absolute top-4 right-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white px-3 py-1.5 rounded-lg font-semibold hover:from-rose-600 hover:to-pink-600 transition-all shadow-md text-xs"
        >
          로그인
        </button>

        <h2 className="text-3xl font-bold text-center mb-2 text-rose-900">
          💕 재회 솔루션
        </h2>
        <p className="text-center text-gray-600 mb-6">
          기본 정보를 입력하고 상담을 시작하세요
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 성별 선택 */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              당신의 성별
            </label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={breakupInfo.gender === 'male'}
                  onChange={(e) => handleChange('gender', e.target.value as 'male' | 'female')}
                  className="mr-2 w-5 h-5 text-rose-500"
                />
                남성
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={breakupInfo.gender === 'female'}
                  onChange={(e) => handleChange('gender', e.target.value as 'male' | 'female')}
                  className="mr-2 w-5 h-5 text-rose-500"
                />
                여성
              </label>
            </div>
          </div>

          {/* 나이 입력 */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              당신의 나이
            </label>
            <input
              type="number"
              placeholder="예: 25"
              value={breakupInfo.age}
              onChange={(e) => handleChange('age', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-rose-500"
              min="18"
              max="100"
              required
            />
          </div>

          {/* 상대방 나이 입력 */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              상대방의 나이
            </label>
            <input
              type="number"
              placeholder="예: 27"
              value={breakupInfo.partnerAge}
              onChange={(e) => handleChange('partnerAge', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-rose-500"
              min="18"
              max="100"
              required
            />
          </div>

          <button
            type="submit"
            disabled={!isFormValid()}
            className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white py-3 rounded-lg font-semibold hover:from-rose-600 hover:to-pink-600 disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed transition-all shadow-md mt-6"
          >
            상담 시작하기
          </button>
        </form>

        <p className="text-xs text-gray-500 text-center mt-4">
          입력하신 정보는 재회 상담에만 사용되며 저장되지 않습니다
        </p>
      </div>
    </div>
  );
}
