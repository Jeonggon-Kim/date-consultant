import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title:
    "짝사랑남 꼬시는 법 - 좋아하는 남자 마음 얻는 완벽 가이드 | 연애 솔루션",
  description:
    "짝사랑하는 남자를 내 남자친구로 만드는 방법. 어필하는 법, 카톡 대화법, 관심 끄는 법부터 고백받는 전략까지. 연애 전문가의 여자들을 위한 실전 연애 노하우 무료 공개.",
  keywords:
    "짝사랑남 꼬시는 법, 남자 꼬시는 법, 짝사랑, 남자 마음 얻기, 여자 연애 전략, 남자 관심 끄는 법, 고백받는 법",
  openGraph: {
    title: "짝사랑남 꼬시는 법 - 좋아하는 남자 마음 얻는 완벽 가이드",
    description: "짝사랑하는 남자를 내 남자친구로 만드는 실전 전략과 노하우",
    url: "https://date-consultant.vercel.app/짝사랑남꼬시는법",
    type: "website",
  },
};

export default function AttractManPage() {
  return (
    <div className="min-h-screen bg-gradient-premium">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-6">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gradient mb-6 leading-tight">
            짝사랑남 꼬시는 법
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">
            좋아하는 남자가 있나요?
            <br />
            <span className="text-purple-600 font-semibold">
              연애 전문가의 검증된 전략
            </span>
            으로 그를 내 남자친구로 만드세요
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
            남자를 꼬시려면 여자의 전략이 필요합니다
          </h2>
          <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
            <p>
              많은 여자들이 좋아하는 남자 앞에서 소극적이 되거나, 반대로 너무
              적극적으로 나서다가 실패하는 경우가 많습니다. 남자의 심리를 제대로
              이해하지 못하면 오히려 역효과가 날 수 있습니다.
            </p>
            <p>
              <strong className="text-purple-600">연애 솔루션</strong>은 남자
              심리를 정확히 분석한 전문가의 노하우를 바탕으로, 당신이 원하는
              남자의 마음을 사로잡는 방법을 알려드립니다. 자연스럽게 그가
              당신에게 먼저 다가오게 만드는 전략부터, 고백을 받아내는 방법까지
              모두 공개합니다.
            </p>
          </div>
        </div>

        {/* Key Strategies */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="glass-effect rounded-2xl p-8 shadow-premium-md hover:shadow-premium-lg transition-all duration-300">
            <div className="text-5xl mb-4">✨</div>
            <h3 className="text-2xl font-bold text-purple-600 mb-3">
              매력 어필
            </h3>
            <p className="text-gray-600">
              남자가 본능적으로 끌리는 여자의 매력 포인트와 자연스러운 어필 방법
            </p>
          </div>

          <div className="glass-effect rounded-2xl p-8 shadow-premium-md hover:shadow-premium-lg transition-all duration-300">
            <div className="text-5xl mb-4">🎭</div>
            <h3 className="text-2xl font-bold text-purple-600 mb-3">
              밀당 기술
            </h3>
            <p className="text-gray-600">
              남자가 궁금해하고 집착하게 만드는 여자만의 고급 밀당 테크닉
            </p>
          </div>

          <div className="glass-effect rounded-2xl p-8 shadow-premium-md hover:shadow-premium-lg transition-all duration-300">
            <div className="text-5xl mb-4">💝</div>
            <h3 className="text-2xl font-bold text-purple-600 mb-3">
              고백 유도
            </h3>
            <p className="text-gray-600">
              직접 고백하지 않고도 남자가 먼저 고백하게 만드는 심리 전략
            </p>
          </div>
        </div>

        {/* Step by Step Guide */}
        <div className="glass-effect rounded-3xl p-10 shadow-premium-lg mb-12">
          <h2 className="text-3xl font-bold text-gradient mb-8 text-center">
            짝사랑남 꼬시기 단계별 전략
          </h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                1
              </div>
              <div>
                <h3 className="text-xl font-bold text-purple-600 mb-2">
                  시선 끌고 인식시키기
                </h3>
                <p className="text-gray-600 mb-2">
                  그가 당신의 존재를 인식하고 관심을 갖게 만들기
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                  <li>자연스럽게 눈이 자주 마주치게 하기</li>
                  <li>그가 좋아하는 스타일로 외모 가꾸기</li>
                  <li>공통 관심사나 친구를 통해 자연스럽게 접근</li>
                </ul>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                2
              </div>
              <div>
                <h3 className="text-xl font-bold text-purple-600 mb-2">
                  친해지면서 호감 쌓기
                </h3>
                <p className="text-gray-600 mb-2">
                  자연스럽게 대화하고 특별한 존재로 각인되기
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                  <li>그의 이야기에 진심 어린 관심 보이기</li>
                  <li>다른 여자들과 다른 특별함 어필하기</li>
                  <li>가끔 연락 끊어서 궁금증 유발하기</li>
                </ul>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                3
              </div>
              <div>
                <h3 className="text-xl font-bold text-purple-600 mb-2">
                  썸 단계로 진입하기
                </h3>
                <p className="text-gray-600 mb-2">
                  친구 이상의 관계로 발전시키기
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                  <li>둘만의 만남 자연스럽게 만들기</li>
                  <li>적절한 스킨십으로 설렘 주기</li>
                  <li>다른 남자 이야기로 은근히 질투심 유발</li>
                </ul>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                4
              </div>
              <div>
                <h3 className="text-xl font-bold text-purple-600 mb-2">
                  고백 유도하고 연인 되기
                </h3>
                <p className="text-gray-600 mb-2">
                  남자가 먼저 고백하게 만들거나 자연스럽게 관계 진전
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                  <li>호감 신호를 명확하게 보내기</li>
                  <li>둘만의 특별한 추억 만들기</li>
                  <li>완벽한 타이밍과 분위기에서 고백 유도</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Male Psychology */}
        <div className="glass-effect rounded-3xl p-10 shadow-premium-lg mb-12 bg-gradient-to-r from-purple-50 to-pink-50">
          <h2 className="text-3xl font-bold text-gradient mb-8 text-center">
            남자의 심리를 이해하면 연애는 쉬워집니다
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/80 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-purple-600 mb-3">
                🎯 남자는 추격하고 싶어 합니다
              </h3>
              <p className="text-gray-600">
                너무 쉽게 얻을 수 있는 여자보다는 약간의 도전 의식을 느끼는
                여자에게 더 끌립니다. 적절한 밀당이 필요한 이유입니다.
              </p>
            </div>
            <div className="bg-white/80 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-purple-600 mb-3">
                👀 시각적 자극에 민감합니다
              </h3>
              <p className="text-gray-600">
                남자는 시각적인 동물입니다. 외모 관리와 스타일링이 첫인상에서
                매우 중요한 역할을 합니다.
              </p>
            </div>
            <div className="bg-white/80 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-purple-600 mb-3">
                💪 인정받고 싶어 합니다
              </h3>
              <p className="text-gray-600">
                자신의 능력이나 매력을 인정받고 싶어 하는 욕구가 강합니다.
                적절한 칭찬과 인정이 효과적입니다.
              </p>
            </div>
            <div className="bg-white/80 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-purple-600 mb-3">
                🎮 정복욕이 있습니다
              </h3>
              <p className="text-gray-600">
                여자가 먼저 적극적으로 나서면 흥미를 잃기 쉽습니다. 남자가
                노력해서 얻었다는 느낌을 주는 것이 중요합니다.
              </p>
            </div>
          </div>
        </div>

        {/* Common Mistakes */}
        <div className="glass-effect rounded-3xl p-10 shadow-premium-lg mb-12 bg-gradient-to-r from-red-50 to-orange-50">
          <h2 className="text-3xl font-bold text-red-600 mb-8 text-center">
            ⚠️ 짝사랑남을 꼬실 때 절대 하면 안 되는 실수들
          </h2>
          <div className="space-y-4">
            <div className="bg-white/80 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-red-500 mb-3">
                ❌ 너무 쉽게 허락하기
              </h3>
              <p className="text-gray-600">
                남자가 원하는 모든 것을 다 들어주고, 언제든 만나주고,
                무조건적으로 따라주면 당신의 가치가 떨어져 보입니다. 적당한
                거절과 밀당이 필요합니다.
              </p>
            </div>
            <div className="bg-white/80 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-red-500 mb-3">
                ❌ 먼저 고백하기
              </h3>
              <p className="text-gray-600">
                확실한 호감 신호가 없는 상태에서 여자가 먼저 고백하면 거절당할
                확률이 높고, 설령 사귀게 되더라도 주도권을 빼앗길 수 있습니다.
              </p>
            </div>
            <div className="bg-white/80 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-red-500 mb-3">
                ❌ 과도한 집착과 감시
              </h3>
              <p className="text-gray-600">
                연락을 너무 자주 하거나, 그의 일거수일투족을 확인하려 하거나,
                질투를 심하게 표현하면 부담스럽고 답답한 여자로 보입니다.
              </p>
            </div>
            <div className="bg-white/80 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-red-500 mb-3">
                ❌ 외모 관리 소홀
              </h3>
              <p className="text-gray-600">
                아무리 내면이 중요하다고 해도, 첫인상은 외모에서 시작됩니다.
                기본적인 외모 관리와 스타일링을 소홀히 하면 관심조차 받기
                어렵습니다.
              </p>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="glass-effect rounded-3xl p-10 shadow-premium-lg mb-12">
          <h2 className="text-3xl font-bold text-gradient mb-8 text-center">
            남자를 사로잡는 여자의 매력 포인트 💕
          </h2>
          <div className="space-y-4">
            <div className="border-l-4 border-purple-500 pl-6 py-3">
              <h3 className="font-bold text-lg text-purple-600 mb-2">
                긍정적이고 밝은 에너지
              </h3>
              <p className="text-gray-600">
                항상 웃는 얼굴로 긍정적인 에너지를 뿜어내는 여자에게 남자는
                자연스럽게 끌립니다. 함께 있으면 기분이 좋아지는 사람이 되세요.
              </p>
            </div>
            <div className="border-l-4 border-purple-500 pl-6 py-3">
              <h3 className="font-bold text-lg text-purple-600 mb-2">
                적절한 애교와 여성스러움
              </h3>
              <p className="text-gray-600">
                과하지 않은 선에서 애교를 부리고 여성스러운 모습을 보이면 남자의
                보호 본능을 자극합니다. 하지만 너무 과하면 부담스러우니
                자연스럽게!
              </p>
            </div>
            <div className="border-l-4 border-purple-500 pl-6 py-3">
              <h3 className="font-bold text-lg text-purple-600 mb-2">
                자기만의 주관과 매력
              </h3>
              <p className="text-gray-600">
                남자에게 무조건 맞춰주기보다는 자신만의 생각과 취향이 있는
                여자가 더 매력적입니다. 독립적이면서도 배려심 있는 모습의
                밸런스가 중요합니다.
              </p>
            </div>
            <div className="border-l-4 border-purple-500 pl-6 py-3">
              <h3 className="font-bold text-lg text-purple-600 mb-2">
                센스 있는 칭찬과 인정
              </h3>
              <p className="text-gray-600">
                남자의 장점이나 능력을 진심으로 인정하고 칭찬해주면 당신에 대한
                호감도가 급상승합니다. 특히 다른 사람들이 알아채지 못한 부분을
                칭찬하면 효과적입니다.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="glass-effect rounded-3xl p-12 shadow-premium-lg text-center bg-gradient-to-r from-purple-50 to-pink-50">
          <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-4">
            당신만의 맞춤 연애 전략이 필요하신가요?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            AI가 당신의 상황을 분석하고 그 남자를 100% 내 남자로 만드는 구체적인
            방법을 알려드립니다
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
              여자가 먼저 적극적으로 나서도 될까요?
            </h2>
            <p className="leading-relaxed">
              많은 여자들이 고민하는 부분입니다. 결론부터 말하면, 적극적으로
              나서되 "직접적"이어서는 안 됩니다. 남자는 자신이 노력해서 여자를
              얻었다는 느낌을 좋아합니다. 따라서 여자는 남자가 다가올 수 있는
              명확한 신호를 보내되, 실제로 고백하거나 관계를 진전시키는 것은
              남자가 하도록 유도하는 것이 좋습니다. 이것이 바로 고급 밀당
              기술입니다.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-purple-600 mb-4">
              남자가 좋아하는 여자의 특징
            </h2>
            <ul className="space-y-3 list-disc list-inside">
              <li>
                <strong>외모를 가꾸는 여자:</strong> 화장과 패션에 신경 쓰며
                자기관리를 하는 여자
              </li>
              <li>
                <strong>밝고 긍정적인 여자:</strong> 함께 있으면 기분이 좋아지는
                에너지를 가진 여자
              </li>
              <li>
                <strong>적당히 밀고 당기는 여자:</strong> 쉽게 허락하지 않지만
                관심은 보이는 여자
              </li>
              <li>
                <strong>자기 삶이 있는 여자:</strong> 남자에게만 매달리지 않고
                자신의 삶을 즐기는 여자
              </li>
              <li>
                <strong>센스 있고 배려심 있는 여자:</strong> 눈치도 빠르고
                상대방을 배려할 줄 아는 여자
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-purple-600 mb-4">
              짝사랑에서 양다리로 발전시키는 시그널
            </h2>
            <p className="leading-relaxed mb-4">
              그가 당신에게 관심이 생겼는지 궁금하신가요? 이런 신호들을 보낸다면
              긍정적인 신호입니다:
            </p>
            <ul className="space-y-3 list-disc list-inside">
              <li>
                당신이 있는 곳에 자주 나타나거나 우연을 가장한 만남이 잦아집니다
              </li>
              <li>카톡 답장이 빨라지고 대화가 자연스럽게 이어집니다</li>
              <li>당신의 일상이나 취미에 관심을 보이고 질문을 많이 합니다</li>
              <li>당신 앞에서 멋있는 모습을 보이려고 노력합니다</li>
              <li>둘이서만 만나자는 제안을 합니다</li>
              <li>
                다른 남자 이야기가 나오면 미묘하게 기분이 안 좋아 보입니다
              </li>
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
