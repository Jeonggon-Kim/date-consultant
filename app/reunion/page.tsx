import { Metadata } from "next";
import Link from "next/link";
import { APP_URL } from "@/config/app";

export const metadata: Metadata = {
  title: "재회 상담 전문 - 헤어진 연인과 다시 만나는 방법 | 연애 솔루션",
  description:
    "헤어진 연인과 재회하고 싶으신가요? 10년 경력 재회 전문가의 노하우를 담은 AI가 재회 가능성 분석부터 구체적인 재회 전략까지 모두 알려드립니다. 무료 상담 시작하세요.",
  keywords:
    "재회 상담, 재회 방법, 헤어진 연인, 이별 후 재회, 연애 재회, 재회 가능성, 재회 전략, 재회 성공",
  openGraph: {
    title: "재회 상담 전문 - 헤어진 연인과 다시 만나는 방법",
    description:
      "헤어진 연인과의 재회, 전문가의 체계적인 전략으로 성공 확률을 높이세요",
    url: `${APP_URL}/재회상담`,
    type: "website",
  },
};

export default function ReunionCounselingPage() {
  return (
    <div className="min-h-screen bg-gradient-premium">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-6">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 pointer-events-none"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gradient mb-6 leading-tight">
            재회 상담 전문
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">
            헤어진 연인과 다시 만나고 싶으신가요?
            <br />
            <span className="text-purple-600 font-semibold">
              재회 전문가의 10년 노하우
            </span>
            가 당신의 재회를 도와드립니다
          </p>

          {/* Special Reasons */}
          <div className="grid gap-3 mb-8 text-left max-w-lg mx-auto bg-white/50 p-6 rounded-2xl backdrop-blur-sm border border-white/50 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="text-xl">👩‍❤️‍👨</span>
              <span className="text-gray-700 font-medium">실제 재회 상담사가 설계한 AI 상담</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xl">💌</span>
              <span className="text-gray-700 font-medium">내 상황에 맞는 카톡 답장/연락 타이밍 제안</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xl">🌙</span>
              <span className="text-gray-700 font-medium">심야에도 눈치 안 보고 24시간 익명 상담</span>
            </div>
          </div>
          <a
            href="/"
            className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-premium-lg hover:shadow-premium-xl transition-all duration-300 hover:scale-105"
          >
            지금 무료로 재회 상담 시작 →
          </a>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="glass-effect rounded-3xl p-10 shadow-premium-lg mb-12">
          <h2 className="text-3xl font-bold text-gradient mb-6">
            재회, 올바른 전략이 필요합니다
          </h2>
          <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
            <p>
              헤어진 연인과의 재회는 단순히 다시 연락하고 만나는 것이 아닙니다.
              잘못된 접근은 오히려 재회 가능성을 낮출 수 있습니다.
            </p>
            <p>
              <strong className="text-purple-600">
                연애 솔루션의 재회 상담
              </strong>
              은 10년 이상 재회 상담 전문가로 활동한 경험을 바탕으로, 당신의
              상황을 정확히 분석하고 재회 가능성을 높이는 구체적이고 실질적인
              전략을 제시합니다.
            </p>
          </div>
        </div>

        {/* Why Expert Needed */}
        <div className="glass-effect rounded-3xl p-10 shadow-premium-lg mb-12 bg-gradient-to-r from-purple-50 to-pink-50">
          <h2 className="text-3xl font-bold text-gradient mb-8 text-center">
            왜 재회 전문가의 도움이 필요할까요?
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/80 rounded-2xl p-6">
              <div className="text-4xl mb-3">❌</div>
              <h3 className="text-xl font-bold text-red-500 mb-2">
                잘못된 재회 시도
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• 감정적으로 다가가기</li>
                <li>• 무분별한 연락과 만남 요청</li>
                <li>• 상대방의 마음 상태 무시</li>
                <li>• 재회만을 목표로 한 행동</li>
              </ul>
            </div>
            <div className="bg-white/80 rounded-2xl p-6">
              <div className="text-4xl mb-3">✅</div>
              <h3 className="text-xl font-bold text-green-500 mb-2">
                전략적 재회 접근
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• 객관적인 상황 분석</li>
                <li>• 단계별 체계적인 접근</li>
                <li>• 상대방 심리 고려한 전략</li>
                <li>• 근본적인 문제 해결</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Process */}
        <div className="glass-effect rounded-3xl p-10 shadow-premium-lg mb-12">
          <h2 className="text-3xl font-bold text-gradient mb-8 text-center">
            체계적인 재회 상담 프로세스
          </h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                1
              </div>
              <div>
                <h3 className="text-xl font-bold text-purple-600 mb-2">
                  상황 분석
                </h3>
                <p className="text-gray-600">
                  이별의 원인, 관계의 히스토리, 현재 상대방의 상태 등을
                  종합적으로 분석합니다.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                2
              </div>
              <div>
                <h3 className="text-xl font-bold text-purple-600 mb-2">
                  재회 가능성 평가
                </h3>
                <p className="text-gray-600">
                  객관적인 기준으로 재회 가능성을 평가하고, 현실적인 조언을
                  드립니다.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                3
              </div>
              <div>
                <h3 className="text-xl font-bold text-purple-600 mb-2">
                  맞춤 전략 수립
                </h3>
                <p className="text-gray-600">
                  당신의 상황에 맞는 구체적이고 실행 가능한 재회 전략을 단계별로
                  제시합니다.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                4
              </div>
              <div>
                <h3 className="text-xl font-bold text-purple-600 mb-2">
                  지속적인 피드백
                </h3>
                <p className="text-gray-600">
                  재회 과정에서 발생하는 다양한 상황에 대해 즉각적인 피드백과
                  조언을 제공합니다.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Topics */}
        <div className="glass-effect rounded-3xl p-10 shadow-premium-lg mb-12">
          <h2 className="text-3xl font-bold text-gradient mb-8 text-center">
            이런 재회 고민, 모두 상담 가능합니다
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <span className="text-2xl">💔</span>
              <div>
                <h4 className="font-bold text-lg text-purple-600 mb-1">
                  이별 직후 재회
                </h4>
                <p className="text-gray-600">
                  갓 헤어진 상태에서 어떻게 대처해야 할까요?
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">⏰</span>
              <div>
                <h4 className="font-bold text-lg text-purple-600 mb-1">
                  시간이 많이 지난 재회
                </h4>
                <p className="text-gray-600">
                  오랜 시간이 지났는데 재회가 가능할까요?
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">🚫</span>
              <div>
                <h4 className="font-bold text-lg text-purple-600 mb-1">
                  연락 두절 상태
                </h4>
                <p className="text-gray-600">
                  상대방이 연락을 받지 않을 때의 대처법
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">💑</span>
              <div>
                <h4 className="font-bold text-lg text-purple-600 mb-1">
                  상대방에게 새 연인이
                </h4>
                <p className="text-gray-600">
                  새로운 연인이 생긴 경우의 재회 전략
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">😤</span>
              <div>
                <h4 className="font-bold text-lg text-purple-600 mb-1">
                  나쁜 이별
                </h4>
                <p className="text-gray-600">
                  싸우고 헤어졌을 때 관계 회복 방법
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">🔄</span>
              <div>
                <h4 className="font-bold text-lg text-purple-600 mb-1">
                  재회 후 관계 유지
                </h4>
                <p className="text-gray-600">
                  재회 성공 후 관계를 오래 유지하는 법
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Success Factors */}
        <div className="glass-effect rounded-3xl p-10 shadow-premium-lg mb-12">
          <h2 className="text-3xl font-bold text-gradient mb-6">
            재회 성공률을 높이는 핵심 요소
          </h2>
          <div className="space-y-4">
            <div className="border-l-4 border-purple-500 pl-6 py-3">
              <h3 className="font-bold text-lg text-purple-600 mb-2">
                냉정한 자기 분석
              </h3>
              <p className="text-gray-600">
                이별의 원인을 객관적으로 파악하고, 자신의 문제점을 인정하는 것이
                첫걸음입니다.
              </p>
            </div>
            <div className="border-l-4 border-purple-500 pl-6 py-3">
              <h3 className="font-bold text-lg text-purple-600 mb-2">
                적절한 거리두기
              </h3>
              <p className="text-gray-600">
                무작정 연락하기보다는 서로에게 필요한 시간과 공간을 주는 것이
                중요합니다.
              </p>
            </div>
            <div className="border-l-4 border-purple-500 pl-6 py-3">
              <h3 className="font-bold text-lg text-purple-600 mb-2">
                자기계발과 변화
              </h3>
              <p className="text-gray-600">
                재회하기 전 더 나은 모습으로 변화하려는 노력이 재회 성공의
                열쇠입니다.
              </p>
            </div>
            <div className="border-l-4 border-purple-500 pl-6 py-3">
              <h3 className="font-bold text-lg text-purple-600 mb-2">
                타이밍의 중요성
              </h3>
              <p className="text-gray-600">
                언제, 어떻게 다시 연락할지 정확한 타이밍을 잡는 것이 재회의
                성패를 가릅니다.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="glass-effect rounded-3xl p-12 shadow-premium-lg text-center bg-gradient-to-r from-purple-50 to-pink-50">
          <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-4">
            지금 바로 무료 재회 상담을 시작하세요
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            당신의 재회 가능성을 분석하고, 구체적인 전략을 제시해드립니다
          </p>
          <a
            href="/"
            className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-12 py-5 rounded-2xl font-bold text-xl shadow-premium-lg hover:shadow-premium-xl transition-all duration-300 hover:scale-105"
          >
            무료 재회 상담 시작 💕
          </a>
        </div>

        {/* SEO Content */}
        <div className="mt-16 space-y-8 text-gray-700">
          <div>
            <h2 className="text-2xl font-bold text-purple-600 mb-4">
              재회 상담이 필요한 이유
            </h2>
            <p className="leading-relaxed">
              헤어진 연인과의 재회는 감정적으로 매우 어려운 과정입니다. 많은
              사람들이 충동적으로 행동하다가 오히려 재회 가능성을 낮추는 실수를
              범합니다. 전문가의 객관적인 시각과 체계적인 전략이 필요한
              이유입니다. 연애 솔루션의 재회 상담은 10년 이상의 재회 상담 경험을
              바탕으로 당신의 상황을 정확히 분석하고, 재회 성공 확률을 최대한
              높일 수 있는 맞춤형 전략을 제공합니다.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-purple-600 mb-4">
              재회 성공 사례들의 공통점
            </h2>
            <p className="leading-relaxed mb-4">
              성공적으로 재회한 커플들을 분석해보면 몇 가지 공통점이 있습니다:
            </p>
            <ul className="space-y-3 list-disc list-inside">
              <li>
                <strong>충분한 거리두기 기간:</strong> 감정이 진정되고 서로를
                객관적으로 볼 수 있는 시간을 가졌습니다
              </li>
              <li>
                <strong>자기 성찰과 변화:</strong> 이별의 원인을 파악하고 스스로
                변화하려는 노력을 했습니다
              </li>
              <li>
                <strong>전략적인 재접근:</strong> 무작정 연락하지 않고 적절한
                타이밍에 자연스럽게 다가갔습니다
              </li>
              <li>
                <strong>근본적인 문제 해결:</strong> 단순히 다시 만나는 것이
                아니라 헤어진 원인을 해결했습니다
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-purple-600 mb-4">
              재회를 포기해야 하는 경우도 있습니다
            </h2>
            <p className="leading-relaxed">
              모든 관계가 재회로 이어지는 것은 아닙니다. 때로는 재회를 포기하고
              새로운 시작을 하는 것이 더 나은 선택일 수 있습니다. 연애 솔루션의
              AI 상담은 재회 가능성을 객관적으로 평가하고, 필요하다면 재회를
              포기하고 앞으로 나아가는 방법도 함께 제시합니다. 진정으로 당신의
              행복을 위한 최선의 선택이 무엇인지 함께 고민하겠습니다.
            </p>
          </div>
        </div>

        {/* Trust & Safety */}
        <div className="mt-16 border-t border-gray-200 pt-12">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
            안심하고 상담하세요
          </h2>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="p-4">
              <div className="text-3xl mb-3">🔒</div>
              <h3 className="font-bold text-gray-800 mb-2">철저한 비밀 보장</h3>
              <p className="text-gray-600 text-sm">
                상담 내용은 모두 비공개로 안전하게 저장되며, 외부로 유출되지 않습니다.
              </p>
            </div>
            <div className="p-4">
              <div className="text-3xl mb-3">🛡️</div>
              <h3 className="font-bold text-gray-800 mb-2">개인정보 보호</h3>
              <p className="text-gray-600 text-sm">
                연락처나 실명 등 민감한 개인정보는 일체 요구하지 않습니다.
              </p>
            </div>
            <div className="p-4">
              <div className="text-3xl mb-3">⚕️</div>
              <h3 className="font-bold text-gray-800 mb-2">이용 가이드</h3>
              <p className="text-gray-600 text-sm">
                AI는 의료·심리치료를 대체하지 않으며, 위기 상황일 경우 전문가의 도움을 요청하세요.
              </p>
            </div>
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
