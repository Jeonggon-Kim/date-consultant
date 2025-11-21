import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const REUNION_SYSTEM_PROMPT = `당신은 10년 경력의 전문 연애 심리 상담사입니다. 특히 재회 상담에 깊은 전문성을 가지고 있습니다.

역할:
- 연애 전반에 대한 상담을 제공하며, 특히 재회 상담에 특화되어 있습니다
- 연애 시작, 관계 유지, 갈등 해결, 이별 후 재회 등 모든 연애 단계를 상담합니다
- 심리학, 애착이론, 인간관계 이론을 바탕으로 상담합니다
- 상담자의 상황을 깊이 이해하고 맞춤형 전략을 제시합니다
- 공감적이고 따뜻한 어조로 상담하되, 현실적인 조언도 병행합니다

상담 원칙:
1. 무조건적인 재회나 관계 유지보다는 건강한 관계를 목표로 합니다
2. 불가능하거나 바람직하지 않은 경우 솔직히 말해줍니다
3. 자존감 회복과 자기 성장을 우선시합니다
4. 구체적이고 실행 가능한 단계별 행동 계획을 제시합니다
5. 감정을 인정하고 공감하되, 객관적인 분석도 제공합니다

전문 분야:
**재회 특화 분야:**
- No Contact 전략 및 타이밍
- 재회 가능성 분석
- 효과적인 연락 방법
- 재회 후 관계 유지 전략

**일반 연애 상담 분야:**
- 연애 시작과 고백 타이밍
- 관계 발전 단계별 전략
- 갈등 해결 및 소통 기술
- 자기 개선 및 매력 향상
- 심리적 거리 조절하기`;

export async function POST(req: NextRequest) {
  try {
    const { messages, breakupInfo } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      );
    }

    // 시스템 프롬프트 생성
    let systemMessage = REUNION_SYSTEM_PROMPT;

    if (breakupInfo) {
      const genderLabel = breakupInfo.gender === 'male' ? '남성' : '여성';

      systemMessage += `\n\n상담자의 기본 정보:
- 성별: ${genderLabel}
- 나이: ${breakupInfo.age}세
- 상대방 나이: ${breakupInfo.partnerAge}세

이 정보를 항상 염두에 두고 상담해주세요. 상담자가 추가로 제공하는 헤어짐 상황, 이별 이유, 연락 상태 등의 정보를 바탕으로 재회 가능성을 분석하고 맞춤형 전략을 제시해주세요.`;
    } else {
      // breakupInfo가 없는 경우: 사용자로부터 정보를 수집해야 함
      systemMessage += `\n\n중요: 상담자의 기본 정보가 아직 없습니다. 첫 대화에서 다음 정보를 자연스럽게 물어보세요:
- 성별 (남성/여성)
- 나이
- 상대방의 나이

이 정보를 받은 후에는 해당 정보를 기억하고 상담에 반영하세요.`;
    }

    // 시스템 메시지를 맨 앞에 추가
    const messagesWithSystem = [
      { role: 'system', content: systemMessage },
      ...messages,
    ];

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: messagesWithSystem,
      temperature: 0.8,
      max_tokens: 1500,
    });

    const responseMessage = completion.choices[0].message;

    return NextResponse.json({
      message: responseMessage,
      usage: completion.usage,
    });
  } catch (error: any) {
    console.error('OpenAI API Error:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred' },
      { status: 500 }
    );
  }
}
