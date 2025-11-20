'use client';

import { useState } from 'react';

interface BirthInfo {
  year: string;
  month: string;
  day: string;
  hour: string;
  minute: string;
  gender: 'male' | 'female';
  calendar: 'solar' | 'lunar';
}

interface BirthInfoFormProps {
  onSubmit: (info: BirthInfo) => void;
}

export default function BirthInfoForm({ onSubmit }: BirthInfoFormProps) {
  const [birthInfo, setBirthInfo] = useState<BirthInfo>({
    year: '',
    month: '',
    day: '',
    hour: '',
    minute: '',
    gender: 'male',
    calendar: 'solar',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (birthInfo.year && birthInfo.month && birthInfo.day) {
      onSubmit(birthInfo);
    }
  };

  const handleChange = (field: keyof BirthInfo, value: string) => {
    setBirthInfo({ ...birthInfo, [field]: value });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full border-4 border-amber-600">
        <h2 className="text-3xl font-bold text-center mb-2 text-amber-900">
          AI 사주 상담
        </h2>
        <p className="text-center text-gray-600 mb-6">
          생년월일 정보를 입력해주세요
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 양력/음력 선택 */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              달력 선택
            </label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="calendar"
                  value="solar"
                  checked={birthInfo.calendar === 'solar'}
                  onChange={(e) => handleChange('calendar', e.target.value)}
                  className="mr-2"
                />
                양력
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="calendar"
                  value="lunar"
                  checked={birthInfo.calendar === 'lunar'}
                  onChange={(e) => handleChange('calendar', e.target.value)}
                  className="mr-2"
                />
                음력
              </label>
            </div>
          </div>

          {/* 생년월일 */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              생년월일
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="년 (예: 1990)"
                value={birthInfo.year}
                onChange={(e) => handleChange('year', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
                min="1900"
                max="2100"
                required
              />
              <input
                type="number"
                placeholder="월"
                value={birthInfo.month}
                onChange={(e) => handleChange('month', e.target.value)}
                className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
                min="1"
                max="12"
                required
              />
              <input
                type="number"
                placeholder="일"
                value={birthInfo.day}
                onChange={(e) => handleChange('day', e.target.value)}
                className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
                min="1"
                max="31"
                required
              />
            </div>
          </div>

          {/* 출생시간 */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              출생시간 (선택사항)
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="시 (0-23)"
                value={birthInfo.hour}
                onChange={(e) => handleChange('hour', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
                min="0"
                max="23"
              />
              <input
                type="number"
                placeholder="분 (0-59)"
                value={birthInfo.minute}
                onChange={(e) => handleChange('minute', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
                min="0"
                max="59"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              모르시면 비워두셔도 됩니다
            </p>
          </div>

          {/* 성별 */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              성별
            </label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={birthInfo.gender === 'male'}
                  onChange={(e) => handleChange('gender', e.target.value)}
                  className="mr-2"
                />
                남성
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={birthInfo.gender === 'female'}
                  onChange={(e) => handleChange('gender', e.target.value)}
                  className="mr-2"
                />
                여성
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-amber-600 text-white py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors mt-6"
          >
            사주 상담 시작하기
          </button>
        </form>

        <p className="text-xs text-gray-500 text-center mt-4">
          입력하신 정보는 사주 분석에만 사용되며 저장되지 않습니다
        </p>
      </div>
    </div>
  );
}
