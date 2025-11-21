"use client";

import { useRouter } from "next/navigation";

export default function RefundPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-rose-500 to-pink-500 shadow-lg p-4">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <button
            onClick={() => router.push("/")}
            className="text-white hover:text-pink-100 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
          </button>
          <h1 className="text-2xl font-bold text-white">환불정책</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            환불 및 취소 정책
          </h2>

          <div className="space-y-6 text-gray-700">
            <section>
              <h3 className="text-lg font-bold text-gray-800 mb-3">
                1. 환불 가능 기간
              </h3>
              <div className="bg-blue-50 p-4 rounded-lg mb-4">
                <p className="font-semibold text-blue-900 mb-2">
                  결제 후 7일 이내
                </p>
                <p className="text-blue-800">
                  「전자상거래 등에서의 소비자보호에 관한 법률」에 따라
                  구매일로부터 7일 이내에 환불을 요청하실 수 있습니다.
                </p>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-bold text-gray-800 mb-3">
                2. 환불 가능 조건
              </h3>
              <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-4">
                  <p className="font-semibold text-gray-800 mb-2">
                    ✓ 전액 환불 가능한 경우
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>서비스를 전혀 이용하지 않은 경우</li>
                    <li>
                      기술적 문제로 서비스를 정상적으로 이용할 수 없는 경우
                    </li>
                    <li>회사의 귀책사유로 서비스 제공이 불가능한 경우</li>
                  </ul>
                </div>

                <div className="border-l-4 border-yellow-500 pl-4">
                  <p className="font-semibold text-gray-800 mb-2">
                    ⚠ 부분 환불 가능한 경우
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>
                      서비스를 일부 이용한 경우 (사용일수에 따라 일할 계산하여
                      환불)
                    </li>
                    <li>환불 공식: 결제금액 - (일일 이용료 × 사용일수)</li>
                  </ul>
                </div>

                <div className="border-l-4 border-red-500 pl-4">
                  <p className="font-semibold text-gray-800 mb-2">
                    ✗ 환불이 불가능한 경우
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>구매일로부터 7일이 경과한 경우</li>
                    <li>
                      이용자의 귀책사유로 서비스 이용이 제한된 경우 (약관 위반
                      등)
                    </li>
                    <li>무료 체험 서비스는 환불 대상이 아닙니다</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-bold text-gray-800 mb-3">
                3. 환불 신청 방법
              </h3>
              <div className="space-y-3">
                <div className="bg-gray-50 p-4 rounded">
                  <p className="font-semibold mb-2">Step 1: 환불 요청</p>
                  <p className="text-sm">
                    고객센터(010-8348-0132)로 전화 또는 이메일로 환불 요청
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded">
                  <p className="font-semibold mb-2">Step 2: 환불 심사</p>
                  <p className="text-sm">
                    환불 조건 확인 및 사용 내역 검토 (영업일 기준 1-2일 소요)
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded">
                  <p className="font-semibold mb-2">Step 3: 환불 처리</p>
                  <p className="text-sm">
                    승인 후 영업일 기준 3-5일 이내에 결제 수단으로 환불 처리
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-bold text-gray-800 mb-3">
                4. 환불 처리 기간
              </h3>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  신용카드: 승인 후 3-5영업일 이내 (카드사 사정에 따라 변동
                  가능)
                </li>
                <li>계좌이체: 승인 후 3-5영업일 이내 환불 계좌로 입금</li>
                <li>간편결제: 각 결제사 정책에 따라 3-7영업일 이내 처리</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-bold text-gray-800 mb-3">
                5. 환불 시 유의사항
              </h3>
              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded">
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>
                    부분 환불의 경우, 실제 서비스 이용일수를 기준으로
                    계산됩니다.
                  </li>
                  <li>
                    환불 처리 시 결제 수수료는 환불 금액에서 차감될 수 있습니다.
                  </li>
                  <li>환불이 완료된 후에는 즉시 서비스 이용이 중단됩니다.</li>
                  <li>
                    프로모션이나 할인을 적용받은 경우, 환불 금액은 실제 결제
                    금액을 기준으로 계산됩니다.
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-bold text-gray-800 mb-3">
                6. 자동 갱신 구독 취소
              </h3>
              <p className="mb-2">
                자동 갱신 구독을 취소하시려면 다음 구독 갱신일 최소 1일 전까지
                취소 요청을 하셔야 합니다:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  갱신일 1일 전까지 취소 시: 다음 결제가 발생하지 않으며, 현재
                  구독 기간 종료까지 서비스 이용 가능
                </li>
                <li>
                  갱신일 이후 취소 시: 이미 결제된 금액에 대해서는 환불 정책에
                  따라 처리
                </li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-bold text-gray-800 mb-3">
                7. 고객 문의
              </h3>
              <div className="bg-rose-50 p-4 rounded">
                <p className="mb-2">
                  환불 관련 문의사항이 있으시면 언제든지 연락주시기 바랍니다:
                </p>
                <ul className="space-y-1">
                  <li>전화: 010-8348-0132</li>
                  <li>운영 시간: 평일 09:00 - 18:00 (주말 및 공휴일 제외)</li>
                </ul>
              </div>
            </section>

            <div className="border-t border-gray-300 pt-6 mt-8">
              <p className="text-sm text-gray-600">
                본 환불정책은 2025년 11월 21일부터 시행됩니다.
              </p>
              <p className="text-sm text-gray-600 mt-2">
                ※ 본 정책은 「전자상거래 등에서의 소비자보호에 관한 법률」,
                「콘텐츠산업 진흥법」 등 관련 법령에 따라 작성되었습니다.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
