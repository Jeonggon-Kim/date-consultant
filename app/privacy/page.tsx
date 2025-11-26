"use client";

import { useRouter } from "next/navigation";

export default function PrivacyPage() {
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
          <h1 className="text-2xl font-bold text-white">개인정보처리방침</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            개인정보처리방침
          </h2>

          <div className="space-y-6 text-gray-700">
            <section>
              <p className="mb-4">
                솔(SOL)(이하 "회사")은 이용자의 개인정보를 중요시하며,
                「개인정보 보호법」, 「정보통신망 이용촉진 및 정보보호 등에 관한
                법률」 등 관련 법령을 준수하고 있습니다.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-bold text-gray-800 mb-3">
                1. 수집하는 개인정보 항목
              </h3>
              <p className="mb-2">회사는 다음의 개인정보를 수집합니다:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>필수항목: 이메일 주소, 비밀번호</li>
                <li>
                  자동 수집 항목: 서비스 이용 기록, 접속 로그, 쿠키, 접속 IP
                  정보
                </li>
                <li>
                  결제 정보: 결제 시 포트원을 통해 처리되며, 회사는 결제 정보를
                  직접 저장하지 않습니다
                </li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-bold text-gray-800 mb-3">
                2. 개인정보의 수집 및 이용 목적
              </h3>
              <ul className="list-disc list-inside space-y-2">
                <li>회원 가입 및 관리</li>
                <li>서비스 제공 및 맞춤형 서비스 제공</li>
                <li>이용자 식별 및 본인 확인</li>
                <li>구매 및 결제, 환불 등 거래 서비스 제공</li>
                <li>서비스 이용 통계 분석 및 서비스 개선</li>
                <li>고객 문의 및 불만 처리</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-bold text-gray-800 mb-3">
                3. 개인정보의 보유 및 이용 기간
              </h3>
              <ul className="list-disc list-inside space-y-2">
                <li>회원 탈퇴 시까지: 회원 가입 정보</li>
                <li>
                  관련 법령에 따른 보관:
                  <ul className="list-circle list-inside ml-6 mt-2">
                    <li>계약 또는 청약철회 등에 관한 기록: 5년</li>
                    <li>대금결제 및 재화 등의 공급에 관한 기록: 5년</li>
                    <li>소비자 불만 또는 분쟁처리에 관한 기록: 3년</li>
                    <li>웹사이트 방문기록: 3개월</li>
                  </ul>
                </li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-bold text-gray-800 mb-3">
                4. 개인정보의 제3자 제공
              </h3>
              <p className="mb-2">
                회사는 원칙적으로 이용자의 개인정보를 외부에 제공하지 않습니다.
                다만, 다음의 경우에는 예외로 합니다:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>이용자가 사전에 동의한 경우</li>
                <li>
                  법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와
                  방법에 따라 수사기관의 요구가 있는 경우
                </li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-bold text-gray-800 mb-3">
                5. 개인정보 처리의 위탁
              </h3>
              <p className="mb-2">
                회사는 서비스 향상을 위해 아래와 같이 개인정보 처리 업무를
                위탁하고 있습니다:
              </p>
              <div className="bg-gray-50 p-4 rounded">
                <p className="font-semibold">결제 처리</p>
                <ul className="list-disc list-inside mt-2">
                  <li>수탁업체: 포트원(PortOne)</li>
                  <li>위탁 업무 내용: 결제 대행 및 결제 정보 처리</li>
                </ul>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-bold text-gray-800 mb-3">
                6. 이용자의 권리와 의무
              </h3>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  이용자는 언제든지 등록되어 있는 자신의 개인정보를 조회하거나
                  수정할 수 있습니다.
                </li>
                <li>
                  이용자는 언제든지 회원 탈퇴를 통해 개인정보의 수집 및 이용
                  동의를 철회할 수 있습니다.
                </li>
                <li>
                  이용자는 개인정보를 최신의 상태로 정확하게 입력하여 불의의
                  사고를 예방해 주시기 바랍니다.
                </li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-bold text-gray-800 mb-3">
                7. 개인정보의 파기 절차 및 방법
              </h3>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  파기 절차: 이용자가 회원가입 등을 위해 입력한 정보는 목적이
                  달성된 후 별도의 DB로 옮겨져 내부 방침 및 기타 관련 법령에
                  의한 정보보호 사유에 따라 일정 기간 저장된 후 파기됩니다.
                </li>
                <li>
                  파기 방법: 전자적 파일 형태로 저장된 개인정보는 기록을 재생할
                  수 없는 기술적 방법을 사용하여 삭제합니다.
                </li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-bold text-gray-800 mb-3">
                8. 개인정보 보호책임자
              </h3>
              <div className="bg-gray-50 p-4 rounded">
                <ul className="space-y-1">
                  <li>성명: 김정곤</li>
                  <li>직책: 대표</li>
                  <li>
                    고객센터:{" "}
                    <a 
                      href="https://open.kakao.com/o/sEgKYL3h" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 underline font-semibold"
                    >
                      카카오톡 상담
                    </a>
                  </li>
                  <li>
                    이용자는 회사의 서비스를 이용하며 발생하는 모든 개인정보보호
                    관련 민원을 개인정보 보호책임자에게 신고할 수 있습니다.
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-bold text-gray-800 mb-3">
                9. 개인정보 처리방침의 변경
              </h3>
              <p>
                본 개인정보 처리방침은 법령, 정책 또는 보안기술의 변경에 따라
                내용의 추가, 삭제 및 수정이 있을 시에는 변경사항 시행 7일 전부터
                서비스 내 공지사항을 통해 고지할 것입니다.
              </p>
            </section>

            <div className="border-t border-gray-300 pt-6 mt-8">
              <p className="text-sm text-gray-600">
                본 개인정보처리방침은 2025년 11월 21일부터 시행됩니다.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
