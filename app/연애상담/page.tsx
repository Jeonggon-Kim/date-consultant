import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "연애 상담 전문 AI - 24시간 무료 연애 고민 상담 | 연애 솔루션",
  description:
    "연애 상담 전문가가 만든 AI가 24시간 실시간 연애 고민 상담. 짝사랑, 관계 회복, 이별 극복, 데이트 방법까지 모든 연애 고민을 해결해드립니다. 지금 무료로 시작하세요.",
  keywords:
    "연애 상담, 연애 고민, 연애 컨설팅, 무료 연애 상담, AI 연애 상담, 실시간 연애 상담, 짝사랑 상담, 관계 회복",
  openGraph: {
    title: "연애 상담 전문 AI - 24시간 무료 연애 고민 상담",
    description:
      "10년 경력 연애 전문가의 노하우를 담은 AI가 24시간 연애 고민을 해결해드립니다",
    url: "https://date-consultant.vercel.app/연애상담",
    type: "website",
  },
};

export default function RelationshipCounselingPage() {
  return (
    <div className="min-h-screen bg-gradient-premium">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-6">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gradient mb-6 leading-tight">
            연애 상담 전문 AI
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">
            10년 경력 연애 전문가가 만든 AI가
            <br />
            <span className="text-purple-600 font-semibold">
              24시간 실시간으로
            </span>{" "}
            당신의 연애 고민을 해결합니다
          </p>
          <Link
            href="/"
            className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-premium-lg hover:shadow-premium-xl transition-all duration-300 hover:scale-105"
          >
            지금 무료로 상담 시작하기 →
          </Link>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="glass-effect rounded-3xl p-10 shadow-premium-lg mb-12">
          <h2 className="text-3xl font-bold text-gradient mb-6">
            연애 상담, 왜 필요한가요?
          </h2>
          <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
            <p>
              연애는 우리 인생에서 가장 중요한 관계 중 하나입니다. 하지만
              좋아하는 사람과의 관계에서 어려움을 겪을 때, 주변 사람들에게 쉽게
              털어놓기 어려운 것이 현실입니다.
            </p>
            <p>
              <strong className="text-purple-600">연애 솔루션의 AI 상담</strong>
              은 10년 이상의 연애 상담 경험을 가진 전문가의 노하우를 학습한 AI가
              당신의 고민을 들어드립니다. 24시간 언제든지, 누구에게도 말하기
              어려웠던 연애 고민을 편하게 나눌 수 있습니다.
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="glass-effect rounded-2xl p-8 shadow-premium-md hover:shadow-premium-lg transition-all duration-300">
            <div className="text-5xl mb-4">💬</div>
            <h3 className="text-2xl font-bold text-purple-600 mb-3">
              실시간 상담
            </h3>
            <p className="text-gray-600">
              24시간 언제든지 즉시 답변을 받을 수 있습니다. 새벽이든 주말이든
              당신의 고민에 귀 기울입니다.
            </p>
          </div>

          <div className="glass-effect rounded-2xl p-8 shadow-premium-md hover:shadow-premium-lg transition-all duration-300">
            <div className="text-5xl mb-4">🔒</div>
            <h3 className="text-2xl font-bold text-purple-600 mb-3">
              완벽한 비밀보장
            </h3>
            <p className="text-gray-600">
              누구에게도 말하기 어려운 고민도 안심하고 털어놓으세요. 모든 대화는
              철저히 보호됩니다.
            </p>
          </div>

          <div className="glass-effect rounded-2xl p-8 shadow-premium-md hover:shadow-premium-lg transition-all duration-300">
            <div className="text-5xl mb-4">🎯</div>
            <h3 className="text-2xl font-bold text-purple-600 mb-3">
              전문가 수준
            </h3>
            <p className="text-gray-600">
              10년 경력 연애 전문가의 상담 노하우를 학습한 AI가 구체적이고
              실질적인 조언을 제공합니다.
            </p>
          </div>
        </div>

        {/* Topics */}
        <div className="glass-effect rounded-3xl p-10 shadow-premium-lg mb-12">
          <h2 className="text-3xl font-bold text-gradient mb-8 text-center">
            이런 연애 고민, 모두 상담 가능합니다
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <span className="text-2xl">💕</span>
              <div>
                <h4 className="font-bold text-lg text-purple-600 mb-1">
                  짝사랑 고민
                </h4>
                <p className="text-gray-600">
                  좋아하는 사람에게 다가가는 방법, 고백 타이밍
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">💔</span>
              <div>
                <h4 className="font-bold text-lg text-purple-600 mb-1">
                  이별 극복
                </h4>
                <p className="text-gray-600">
                  헤어진 후 마음 정리, 새로운 시작 준비
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">🔄</span>
              <div>
                <h4 className="font-bold text-lg text-purple-600 mb-1">
                  재회 상담
                </h4>
                <p className="text-gray-600">
                  헤어진 연인과의 재회 가능성 분석 및 전략
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">💑</span>
              <div>
                <h4 className="font-bold text-lg text-purple-600 mb-1">
                  관계 회복
                </h4>
                <p className="text-gray-600">
                  연인과의 갈등 해결, 관계 개선 방법
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">🌟</span>
              <div>
                <h4 className="font-bold text-lg text-purple-600 mb-1">
                  썸 단계 진전
                </h4>
                <p className="text-gray-600">썸남/썸녀와 관계 발전시키는 법</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">📱</span>
              <div>
                <h4 className="font-bold text-lg text-purple-600 mb-1">
                  카톡 답장 고민
                </h4>
                <p className="text-gray-600">어떻게 답장해야 할지 모를 때</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="glass-effect rounded-3xl p-12 shadow-premium-lg text-center bg-gradient-to-r from-purple-50 to-pink-50">
          <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-4">
            지금 바로 무료로 시작하세요
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            첫 상담은 무료입니다. 로그인 없이도 바로 시작할 수 있어요!
          </p>
          <Link
            href="/"
            className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-12 py-5 rounded-2xl font-bold text-xl shadow-premium-lg hover:shadow-premium-xl transition-all duration-300 hover:scale-105"
          >
            연애 상담 시작하기 💕
          </Link>
        </div>

        {/* SEO Content */}
        <div className="mt-16 space-y-8 text-gray-700">
          <div>
            <h2 className="text-2xl font-bold text-purple-600 mb-4">
              연애 상담이란 무엇인가요?
            </h2>
            <p className="leading-relaxed">
              연애 상담은 연애 관계에서 겪는 다양한 어려움과 고민을 전문가와
              함께 나누고 해결책을 찾는 과정입니다. 짝사랑, 썸 단계에서의 고민,
              연인과의 갈등, 이별 후 재회 고민 등 연애의 모든 단계에서 발생하는
              문제들을 다룹니다.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-purple-600 mb-4">
              AI 연애 상담의 장점
            </h2>
            <ul className="space-y-3 list-disc list-inside">
              <li>
                <strong>24시간 즉시 상담:</strong> 언제든지 고민이 생겼을 때
                바로 상담받을 수 있습니다
              </li>
              <li>
                <strong>비용 부담 없음:</strong> 전문 상담사 대비 훨씬 저렴한
                비용으로 이용 가능합니다
              </li>
              <li>
                <strong>완벽한 익명성:</strong> 누구에게도 알려지지 않고 편하게
                고민을 털어놓을 수 있습니다
              </li>
              <li>
                <strong>축적된 전문 지식:</strong> 수많은 연애 상담 사례를
                학습한 AI의 체계적인 조언을 받을 수 있습니다
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-purple-600 mb-4">
              연애 고민, 혼자 끙끙 앓지 마세요
            </h2>
            <p className="leading-relaxed">
              많은 분들이 연애 문제로 고민하면서도 주변 사람들에게 쉽게 말하지
              못합니다. 친구나 가족에게 말하기 민망하거나, 객관적인 조언을 듣기
              어려운 경우가 많기 때문입니다. 연애 솔루션의 AI 상담은 이런 고민을
              해결하기 위해 탄생했습니다. 지금 바로 부담 없이 대화를
              시작해보세요.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="glass-effect border-t border-white/20 py-8 px-6 mt-20">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-sm text-gray-600">
            <span className="font-medium">
              솔(SOL) | 사업자: 337-03-03814 | 대표: 김정곤 | 전화:
              010-8348-0132
            </span>
            <div className="flex gap-4">
              <Link
                href="/pricing"
                className="hover:text-purple-600 transition-all"
              >
                상품안내
              </Link>
              <Link
                href="/terms"
                className="hover:text-purple-600 transition-all"
              >
                이용약관
              </Link>
              <Link
                href="/privacy"
                className="hover:text-purple-600 transition-all"
              >
                개인정보처리방침
              </Link>
              <Link
                href="/refund"
                className="hover:text-purple-600 transition-all"
              >
                환불정책
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
