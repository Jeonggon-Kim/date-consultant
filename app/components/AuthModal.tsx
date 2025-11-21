'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  signUpOnly?: boolean; // 회원가입 전용 모드
}

export default function AuthModal({ isOpen, onClose, onSuccess, signUpOnly = false }: AuthModalProps) {
  const [isSignUp, setIsSignUp] = useState(signUpOnly);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // signUpOnly prop이 변경되면 isSignUp state도 업데이트
  useEffect(() => {
    setIsSignUp(signUpOnly);
  }, [signUpOnly]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isSignUp) {
        // 비밀번호 확인 검증
        if (password !== passwordConfirm) {
          setError('비밀번호가 일치하지 않습니다.');
          setLoading(false);
          return;
        }
        // 이메일 확인 없이 즉시 가입 및 로그인
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
            data: {
              email_confirm: true, // 자동 확인
            },
          },
        });
        if (error) throw error;

        // 회원가입 후 즉시 로그인 시도
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) {
          // 이메일 확인이 필요한 경우
          setError('회원가입이 완료되었습니다. 이메일을 확인해주세요.');
        } else {
          // 즉시 로그인 성공
          onSuccess();
          onClose();
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        onSuccess();
        onClose();
      }
    } catch (error: any) {
      setError(error.message || '오류가 발생했습니다');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-rose-900">
            {isSignUp ? '회원가입' : '로그인'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              이메일
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-rose-500"
              placeholder="example@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              비밀번호
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-rose-500"
              placeholder="6자 이상"
              required
              minLength={6}
            />
          </div>

          {isSignUp && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                비밀번호 확인
              </label>
              <input
                type="password"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-rose-500"
                placeholder="비밀번호를 다시 입력하세요"
                required
                minLength={6}
              />
            </div>
          )}

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white py-3 rounded-lg font-semibold hover:from-rose-600 hover:to-pink-600 disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed transition-all"
          >
            {loading ? '처리 중...' : isSignUp ? '가입하기' : '로그인'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError(null);
              setPasswordConfirm('');
            }}
            className="text-rose-500 hover:text-rose-600 text-sm"
          >
            {isSignUp ? '이미 계정이 있으신가요? 로그인' : '계정이 없으신가요? 회원가입'}
          </button>
        </div>
      </div>
    </div>
  );
}
