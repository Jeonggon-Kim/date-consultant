"use client";

import { useRouter } from "next/navigation";

export default function TermsPage() {
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
          <h1 className="text-2xl font-bold text-white">이용약관</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">서비스 이용약관</h2>

          <div className="space-y-6 text-gray-700">
            <section>
              <h3 className="text-lg font-bold text-gray-800 mb-3">제1조 (목적)</h3>
              <p>
                본 약관은 솔(SOL)(이하 "회사")이 제공하는 연애 솔루션 AI 상담
                서비스(이하 "서비스")의 이용과 관련하여 회사와 이용자 간의 권리,
                의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-bold text-gray-800 mb-3">
                제2조 (용어의 정의)
              </h3>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  "서비스"란 회사가 제공하는 AI 기반 연애 상담 서비스(재회 특화)를
                  의미합니다.
                </li>
                <li>
                  "이용자"란 본 약관에 따라 회사가 제공하는 서비스를 이용하는
                  자를 의미합니다.
                </li>
                <li>
                  "회원"이란 회사와 서비스 이용계약을 체결하고 회원 ID를 부여받은
                  자를 의미합니다.
                </li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-bold text-gray-800 mb-3">
                제3조 (약관의 효력 및 변경)
              </h3>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  본 약관은 서비스를 이용하고자 하는 모든 이용자에 대하여 그
                  효력을 발생합니다.
                </li>
                <li>
                  회사는 필요한 경우 관련 법령을 위배하지 않는 범위에서 본 약관을
                  변경할 수 있습니다.
                </li>
                <li>
                  약관이 변경되는 경우 회사는 변경사항을 서비스 내 공지사항을
                  통해 공지합니다.
                </li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-bold text-gray-800 mb-3">
                제4조 (서비스의 제공 및 변경)
              </h3>
              <ul className="list-disc list-inside space-y-2">
                <li>회사는 다음과 같은 서비스를 제공합니다:
                  <ul className="list-circle list-inside ml-6 mt-2">
                    <li>AI 기반 연애 상담 서비스 (재회 특화)</li>
                    <li>채팅 이력 저장 및 관리</li>
                    <li>구독 기반 프리미엄 서비스</li>
                  </ul>
                </li>
                <li>
                  회사는 상당한 이유가 있는 경우 운영상, 기술상의 필요에 따라
                  제공하는 서비스를 변경할 수 있습니다.
                </li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-bold text-gray-800 mb-3">
                제5조 (서비스의 중단)
              </h3>
              <p>
                회사는 다음 각 호의 경우 서비스 제공을 일시적으로 중단할 수
                있습니다:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>시스템 정기점검, 서버의 증설 및 교체</li>
                <li>천재지변, 국가비상사태 등 불가항력적 사유</li>
                <li>서비스 설비의 장애 또는 서비스 이용의 폭주</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-bold text-gray-800 mb-3">
                제6조 (이용자의 의무)
              </h3>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  이용자는 본 약관 및 관련 법령을 준수하여야 합니다.
                </li>
                <li>
                  이용자는 타인의 개인정보를 도용하거나 부정한 목적으로 서비스를
                  이용해서는 안 됩니다.
                </li>
                <li>
                  이용자는 서비스를 이용하여 얻은 정보를 회사의 사전 승낙 없이
                  복제, 송신, 출판, 배포, 방송 기타 방법에 의하여 영리 목적으로
                  이용하거나 제3자에게 이용하게 해서는 안 됩니다.
                </li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-bold text-gray-800 mb-3">
                제7조 (면책조항)
              </h3>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  회사는 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를
                  제공할 수 없는 경우 서비스 제공에 관한 책임이 면제됩니다.
                </li>
                <li>
                  회사는 이용자의 귀책사유로 인한 서비스 이용의 장애에 대하여
                  책임을 지지 않습니다.
                </li>
                <li>
                  서비스에서 제공하는 정보는 참고용이며, 회사는 이를 신뢰하여
                  취한 조치에 대해 책임을 지지 않습니다.
                </li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-bold text-gray-800 mb-3">
                제8조 (준거법 및 관할법원)
              </h3>
              <p>
                본 약관과 관련된 사항은 대한민국 법령에 따라 규정되고 해석됩니다.
                서비스 이용과 관련하여 회사와 이용자 간 발생한 분쟁에 대해서는
                서울중앙지방법원을 관할 법원으로 합니다.
              </p>
            </section>

            <div className="border-t border-gray-300 pt-6 mt-8">
              <p className="text-sm text-gray-600">
                본 약관은 2025년 11월 21일부터 시행됩니다.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
