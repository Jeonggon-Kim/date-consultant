import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title:
    "썸녀 꼬시는 법 - 좋아하는 여자 마음 사로잡는 완벽 가이드 | 연애 솔루션",
  description:
    "썸녀를 성공적으로 꼬시는 방법을 알려드립니다. 카톡 대화법, 데이트 전략, 고백 타이밍까지 썸 단계에서 연인 관계로 발전시키는 모든 방법. 연애 전문가의 실전 노하우 무료 공개.",
  keywords:
    "썸녀 꼬시는 법, 썸녀, 여자 꼬시는 법, 썸 단계, 카톡 대화법, 데이트 방법, 고백 타이밍, 연애 시작",
  openGraph: {
    title: "썸녀 꼬시는 법 - 좋아하는 여자 마음 사로잡는 완벽 가이드",
    description: "썸 단계에서 연인 관계로 발전시키는 실전 전략과 노하우",
    url: "https://date-consultant.vercel.app/썸녀꼬시는법",
    type: "website",
  },
};

export default function AttractWomanPage() {
  return (
    <div className="min-h-screen bg-gradient-premium">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-6">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gradient mb-6 leading-tight">
            썸녀 꼬시는 법
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">
            좋아하는 여자와 썸 단계인가요?
            <br />
            <span className="text-purple-600 font-semibold">
              연애 전문가의 실전 노하우
            </span>
            로 연인 관계로 발전시키세요
          </p>
          <Link
            href="/"
            className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-premium-lg hover:shadow-premium-xl transition-all duration-300 hover:scale-105"
          >
            지금 무료로 맞춤 전략 받기 →
          </Link>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="glass-effect rounded-3xl p-10 shadow-premium-lg mb-12">
          <h2 className="text-3xl font-bold text-gradient mb-6">
            썸녀를 꼬시려면 전략이 필요합니다
          </h2>
          <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
            <p>
              많은 남자들이 썸 단계에서 실수를 합니다. 너무 적극적이거나 반대로
              너무 소극적이거나, 여자의 관심을 끌지 못하거나 오히려 부담을 주는
              경우가 많습니다.
            </p>
            <p>
              <strong className="text-purple-600">연애 솔루션</strong>은 수많은
              연애 성공 사례를 분석한 전문가의 노하우를 바탕으로, 당신의 상황에
              딱 맞는 맞춤형 전략을 제시합니다. 카톡 대화법부터 데이트 전략,
              고백 타이밍까지 모든 것을 알려드립니다.
            </p>
          </div>
        </div>

        {/* Key Strategies */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="glass-effect rounded-2xl p-8 shadow-premium-md hover:shadow-premium-lg transition-all duration-300">
            <div className="text-5xl mb-4">💬</div>
            <h3 className="text-2xl font-bold text-purple-600 mb-3">
              카톡 대화법
            </h3>
            <p className="text-gray-600">
              여자의 관심을 끄는 메시지, 답장 타이밍, 대화를 이어가는 방법까지
              완벽 가이드
            </p>
          </div>

          <div className="glass-effect rounded-2xl p-8 shadow-premium-md hover:shadow-premium-lg transition-all duration-300">
            <div className="text-5xl mb-4">🎯</div>
            <h3 className="text-2xl font-bold text-purple-600 mb-3">
              밀당 전략
            </h3>
            <p className="text-gray-600">
              적절한 거리 유지하기, 여자가 먼저 연락하게 만드는 방법, 호감도
              높이는 밀당 기술
            </p>
          </div>

          <div className="glass-effect rounded-2xl p-8 shadow-premium-md hover:shadow-premium-lg transition-all duration-300">
            <div className="text-5xl mb-4">💕</div>
            <h3 className="text-2xl font-bold text-purple-600 mb-3">
              고백 타이밍
            </h3>
            <p className="text-gray-600">
              언제 고백해야 성공률이 높은지, 어떻게 고백해야 하는지 완벽 분석
            </p>
          </div>
        </div>

        {/* Step by Step Guide */}
        <div className="glass-effect rounded-3xl p-10 shadow-premium-lg mb-12">
          <h2 className="text-3xl font-bold text-gradient mb-8 text-center">
            썸녀 꼬시기 단계별 전략
          </h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                1
              </div>
              <div>
                <h3 className="text-xl font-bold text-purple-600 mb-2">
                  관심 끌기 & 친해지기
                </h3>
                <p className="text-gray-600 mb-2">
                  첫 만남에서 좋은 인상 주기, 자연스럽게 연락처 받기, 부담 없는
                  대화로 친밀감 쌓기
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                  <li>공통 관심사 찾아 대화하기</li>
                  <li>유머와 위트로 편안한 분위기 만들기</li>
                  <li>과도한 칭찬이나 호감 표현은 자제</li>
                </ul>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                2
              </div>
              <div>
                <h3 className="text-xl font-bold text-purple-600 mb-2">
                  호감도 높이기
                </h3>
                <p className="text-gray-600 mb-2">
                  정기적인 연락 유지하면서 특별한 존재로 각인시키기
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                  <li>상대방의 이야기에 진심으로 공감하기</li>
                  <li>작은 것도 기억하고 챙겨주기</li>
                  <li>가끔 연락 안 하는 날도 만들어 궁금증 유발</li>
                </ul>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                3
              </div>
              <div>
                <h3 className="text-xl font-bold text-purple-600 mb-2">
                  데이트 성공시키기
                </h3>
                <p className="text-gray-600 mb-2">
                  자연스럽게 만남 제안하고 즐거운 데이트 만들기
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                  <li>부담 없는 활동으로 첫 데이트 제안</li>
                  <li>데이트 중 적절한 스킨십으로 관계 진전</li>
                  <li>다음 만남 약속까지 자연스럽게 이어가기</li>
                </ul>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                4
              </div>
              <div>
                <h3 className="text-xl font-bold text-purple-600 mb-2">
                  고백 & 연인 되기
                </h3>
                <p className="text-gray-600 mb-2">
                  완벽한 타이밍에 진심을 전하고 관계를 공식화하기
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                  <li>상대방의 호감 신호 정확히 파악하기</li>
                  <li>분위기 좋은 상황에서 자연스럽게 고백</li>
                  <li>거절당해도 관계 유지할 수 있는 여지 남기기</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Common Mistakes */}
        <div className="glass-effect rounded-3xl p-10 shadow-premium-lg mb-12 bg-gradient-to-r from-red-50 to-orange-50">
          <h2 className="text-3xl font-bold text-red-600 mb-8 text-center">
            ⚠️ 썸녀를 꼬실 때 절대 하면 안 되는 실수들
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/80 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-red-500 mb-3">
                ❌ 과도한 집착
              </h3>
              <p className="text-gray-600">
                너무 자주 연락하거나, 답장을 강요하거나, 일거수일투족을
                궁금해하는 행동은 상대방에게 부담을 줍니다.
              </p>
            </div>
            <div className="bg-white/80 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-red-500 mb-3">
                ❌ 너무 빠른 고백
              </h3>
              <p className="text-gray-600">
                충분한 친밀감이 형성되기 전에 서둘러 고백하면 부담스러워
                거절당할 확률이 높습니다.
              </p>
            </div>
            <div className="bg-white/80 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-red-500 mb-3">
                ❌ 상대방 무시
              </h3>
              <p className="text-gray-600">
                밀당한다고 너무 안 읽거나 답장을 늦게 하면 관심 없다고 생각하고
                멀어질 수 있습니다.
              </p>
            </div>
            <div className="bg-white/80 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-red-500 mb-3">
                ❌ 과도한 자랑
              </h3>
              <p className="text-gray-600">
                자신을 너무 포장하거나 자랑만 늘어놓으면 허세로 보여 오히려
                역효과가 납니다.
              </p>
            </div>
          </div>
        </div>

        {/* Chat Tips */}
        <div className="glass-effect rounded-3xl p-10 shadow-premium-lg mb-12">
          <h2 className="text-3xl font-bold text-gradient mb-8 text-center">
            썸녀와 카톡할 때 꿀팁 💬
          </h2>
          <div className="space-y-4">
            <div className="border-l-4 border-purple-500 pl-6 py-3">
              <h3 className="font-bold text-lg text-purple-600 mb-2">
                첫 메시지는 가볍게
              </h3>
              <p className="text-gray-600">
                "오늘 뭐해?" 같은 뻔한 질문보다는 "아까 말했던 카페 진짜
                맛있더라! 추천 감사"처럼 구체적이고 긍정적인 내용으로
                시작하세요.
              </p>
            </div>
            <div className="border-l-4 border-purple-500 pl-6 py-3">
              <h3 className="font-bold text-lg text-purple-600 mb-2">
                질문으로 대화 이어가기
              </h3>
              <p className="text-gray-600">
                상대방이 관심 있어 하는 주제로 열린 질문을 던지면 자연스럽게
                대화가 이어집니다. 단, 심문하듯 질문만 계속하지는 마세요.
              </p>
            </div>
            <div className="border-l-4 border-purple-500 pl-6 py-3">
              <h3 className="font-bold text-lg text-purple-600 mb-2">
                적절한 이모티콘 사용
              </h3>
              <p className="text-gray-600">
                딱딱한 문자만 보내면 재미없어 보입니다. 적절한 이모티콘으로
                감정을 표현하세요. 하지만 너무 많이 쓰면 유치해 보일 수 있으니
                주의!
              </p>
            </div>
            <div className="border-l-4 border-purple-500 pl-6 py-3">
              <h3 className="font-bold text-lg text-purple-600 mb-2">
                답장 속도 조절하기
              </h3>
              <p className="text-gray-600">
                항상 1초 만에 답하면 할 일 없어 보이고, 너무 늦으면 관심 없어
                보입니다. 상대방의 답장 속도에 맞춰 자연스럽게 대응하세요.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="glass-effect rounded-3xl p-12 shadow-premium-lg text-center bg-gradient-to-r from-purple-50 to-pink-50">
          <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-4">
            당신만의 맞춤 전략이 필요하신가요?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            AI가 당신의 상황을 분석하고 실전에서 바로 쓸 수 있는 구체적인 조언을
            드립니다
          </p>
          <Link
            href="/"
            className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-12 py-5 rounded-2xl font-bold text-xl shadow-premium-lg hover:shadow-premium-xl transition-all duration-300 hover:scale-105"
          >
            지금 무료로 시작하기 💕
          </Link>
        </div>

        {/* SEO Content */}
        <div className="mt-16 space-y-8 text-gray-700">
          <div>
            <h2 className="text-2xl font-bold text-purple-600 mb-4">
              썸녀를 꼬시는 것, 왜 어려울까요?
            </h2>
            <p className="leading-relaxed">
              많은 남자들이 좋아하는 여자와 썸 단계에서 어려움을 겪습니다.
              어떻게 다가가야 할지, 얼마나 적극적으로 나서야 할지, 언제 고백해야
              할지 등 모든 것이 불확실하기 때문입니다. 잘못된 행동 하나가 관계를
              망칠 수도 있다는 부담감도 큽니다. 하지만 올바른 전략과 노하우를
              알고 있다면 훨씬 자신감 있게 접근할 수 있습니다.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-purple-600 mb-4">
              여자가 좋아하는 남자의 특징
            </h2>
            <ul className="space-y-3 list-disc list-inside">
              <li>
                <strong>자신감 있는 남자:</strong> 주눅들거나 비굴하지 않고
                당당한 태도를 보이는 남자
              </li>
              <li>
                <strong>배려심 있는 남자:</strong> 작은 것도 챙겨주고 상대방을
                존중하는 남자
              </li>
              <li>
                <strong>유머 감각 있는 남자:</strong> 함께 있으면 즐겁고 웃음이
                끊이지 않는 남자
              </li>
              <li>
                <strong>자기관리 하는 남자:</strong> 외모와 몸매, 패션 등
                자기관리에 신경 쓰는 남자
              </li>
              <li>
                <strong>경제력 있는 남자:</strong> 안정적인 미래를 함께할 수
                있는 남자
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-purple-600 mb-4">
              썸녀가 보내는 호감 신호
            </h2>
            <p className="leading-relaxed mb-4">
              여자가 당신에게 호감이 있는지 궁금하신가요? 이런 신호들을 보낸다면
              호감이 있다는 증거입니다:
            </p>
            <ul className="space-y-3 list-disc list-inside">
              <li>당신이 먼저 연락하지 않아도 자주 먼저 카톡을 보냅니다</li>
              <li>사소한 일상도 공유하고 질문이 많습니다</li>
              <li>만날 때 옷과 화장에 신경 쓴 모습이 보입니다</li>
              <li>당신의 이야기에 관심을 보이고 잘 기억합니다</li>
              <li>둘이서만 만나자는 제안을 받아들입니다</li>
              <li>스킨십에 거부감을 보이지 않습니다</li>
            </ul>
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
