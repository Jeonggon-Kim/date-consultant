"use client";

import { useRouter } from "next/navigation";

export default function PaymentFailPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
        <div className="text-6xl mb-4">😢</div>
        <h2 className="text-2xl font-bold text-red-600 mb-2">
          결제가 취소되었습니다
        </h2>
        <p className="text-gray-600 mb-6">결제가 취소되었습니다</p>
        <button
          onClick={() => router.push("/")}
          className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-rose-600 hover:to-pink-600 transition-all"
        >
          메인으로 돌아가기
        </button>
      </div>
    </div>
  );
}
