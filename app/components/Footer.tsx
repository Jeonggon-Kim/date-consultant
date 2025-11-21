"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* 사업자 정보 */}
        <div className="mb-6">
          <h3 className="font-bold text-gray-800 mb-3">사업자 정보</h3>
          <div className="text-sm text-gray-600 space-y-1">
            <p>상호명: 솔(SOL)</p>
            <p>사업자등록번호: 337-03-03814</p>
            <p>대표자명: 김정곤</p>
            <p>
              주소: 서울특별시 성북구 고려대로27길 67, 6층 606호(안암동가,
              은스나우)
            </p>
            <p>전화번호: 010-8348-0132</p>
          </div>
        </div>

        {/* 구분선 */}
        <div className="border-t border-gray-300 my-6"></div>

        {/* 링크 섹션 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Link
            href="/pricing"
            className="text-sm text-gray-700 hover:text-rose-500 transition-colors"
          >
            상품 안내
          </Link>
          <Link
            href="/terms"
            className="text-sm text-gray-700 hover:text-rose-500 transition-colors"
          >
            이용약관
          </Link>
          <Link
            href="/privacy"
            className="text-sm text-gray-700 hover:text-rose-500 transition-colors"
          >
            개인정보처리방침
          </Link>
          <Link
            href="/refund"
            className="text-sm text-gray-700 hover:text-rose-500 transition-colors"
          >
            환불정책
          </Link>
        </div>

        {/* 구분선 */}
        <div className="border-t border-gray-300 my-6"></div>

        {/* 저작권 */}
        <div className="text-center text-xs text-gray-500">
          <p>&copy; 2025 솔(SOL). All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
