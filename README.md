# 💕 재회 솔루션

Next.js와 OpenAI API를 사용한 AI 재회 전문 상담 애플리케이션입니다.

## 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

`.env` 파일에 다음 환경 변수를 설정하세요:

```
# OpenAI API Key
OPENAI_API_KEY=sk-your-actual-api-key-here

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

- OpenAI API 키: [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
- Supabase 키: Supabase 프로젝트의 Settings > API에서 확인

### 3. Supabase 데이터베이스 설정

1. [Supabase](https://supabase.com)에서 새 프로젝트를 생성합니다
2. SQL Editor에서 `supabase-schema.sql` 파일의 내용을 실행합니다
3. 테이블과 RLS 정책이 자동으로 생성됩니다

### 4. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://date-consultant.vercel.app](http://date-consultant.vercel.app)을 열어 애플리케이션을 확인하세요.

## 기능

- 🔐 사용자 인증 (로그인/회원가입)
- 💔 간편한 기본 정보 입력 (성별, 나이)
- 💕 맞춤형 재회 전략 제시
- 🧠 심리학 기반 전문 상담
- 💬 실시간 AI 재회 상담
- 💾 채팅 기록 자동 저장 (로그인 시)
- 📂 채팅방 기록 사이드바 (ChatGPT 스타일)
- 🎨 감성적인 테마 디자인
- 📜 대화 히스토리 유지
- ⏳ 로딩 상태 표시
- 👤 비로그인 사용 가능

## 기술 스택

- **Next.js 14** - React 프레임워크 (App Router)
- **TypeScript** - 타입 안정성
- **Tailwind CSS** - 스타일링
- **OpenAI API** - AI 재회 상담 엔진 (GPT-3.5-turbo)
- **Supabase** - 인증 & PostgreSQL 데이터베이스
- **Supabase Auth Helpers** - Next.js 인증 통합

## 사용 방법

### 비회원 사용
1. 애플리케이션에 접속하면 기본 정보 입력 화면이 나타납니다
2. 성별, 나이, 상대방 나이를 입력하세요
3. "상담 시작하기" 버튼을 클릭합니다
4. AI 재회 전문 상담사와 대화를 시작하세요!

### 회원 사용 (채팅 기록 저장)
1. 초기 화면에서 오른쪽 상단의 "로그인" 버튼을 클릭
2. 이메일과 비밀번호로 로그인 (또는 회원가입)
3. 기본 정보를 입력하고 상담을 시작합니다
4. 로그인한 경우:
   - 모든 채팅이 자동으로 저장됩니다
   - 왼쪽 사이드바에서 이전 채팅 기록을 확인할 수 있습니다
   - "새로운 상담" 버튼으로 새 채팅방을 만들 수 있습니다
   - 저장된 채팅방을 클릭하여 이전 대화를 이어갈 수 있습니다

### 질문 예시

- "제 재회 가능성은 얼마나 되나요?"
- "지금 연락해도 될까요?"
- "No Contact 기간을 가져야 할까요?"
- "어떻게 다시 시작할 수 있을까요?"
- "제가 어떻게 변화해야 할까요?"
- "상대방이 저를 그리워하게 하려면?"
- "첫 연락은 어떻게 해야 하나요?"

## 프로젝트 구조

```
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts                   # 재회 상담 API (시스템 프롬프트 포함)
│   ├── auth/
│   │   └── callback/
│   │       └── route.ts                   # Supabase 인증 콜백
│   ├── components/
│   │   ├── BreakupSurveyForm.tsx         # 기본 정보 입력 폼 (성별, 나이)
│   │   ├── AuthModal.tsx                  # 로그인/회원가입 모달
│   │   ├── ChatHistorySidebar.tsx        # 채팅 기록 사이드바
│   │   ├── ChatMessage.tsx                # 메시지 컴포넌트
│   │   └── ChatInput.tsx                  # 채팅 입력 컴포넌트
│   ├── page.tsx                           # 메인 페이지 (상담 로직)
│   ├── layout.tsx                         # 레이아웃
│   └── globals.css                        # 글로벌 스타일
├── lib/
│   └── supabase.ts                        # Supabase 클라이언트
├── middleware.ts                          # Supabase 미들웨어
├── supabase-schema.sql                    # 데이터베이스 스키마
├── .env                                   # 환경 변수
└── package.json
```

## 빌드

프로덕션 빌드:

```bash
npm run build
npm start
```

## 주의사항

- `.env` 파일은 절대 Git에 커밋하지 마세요
- OpenAI API 사용량에 따라 비용이 발생할 수 있습니다
- API 키는 안전하게 보관하세요
- **비회원 사용**: 헤어짐 정보는 서버에 저장되지 않으며, 세션에만 임시 보관됩니다
- **회원 사용**: 로그인 후 모든 채팅과 기본 정보가 Supabase 데이터베이스에 저장됩니다
- 본 애플리케이션은 참고용이며, 중요한 결정은 신중하게 하시기 바랍니다
- 무리한 재회 시도보다는 자기 성장을 우선시하는 것을 권장합니다

## 작동 원리

### 기본 동작
1. **기본 정보 입력**: 성별, 나이, 상대방 나이를 간단히 입력
2. **시스템 프롬프트**: AI를 "10년 경력의 재회 전문 상담사"로 설정
3. **맞춤형 분석**: 기본 정보를 시스템 메시지에 포함하여 상황 파악
4. **대화 히스토리**: 모든 대화 내역을 API에 전송하여 문맥 유지
5. **전략 제시**: GPT-4.1-2025-04-14 가 심리학 기반 재회 전략 제공
   - No Contact 전략
   - 자기 개선 방향
   - 효과적인 연락 방법
   - 재회 가능성 분석

### 인증 & 저장 (로그인 시)
1. **Supabase Auth**: 이메일/비밀번호 기반 인증
2. **자동 저장**:
   - 첫 메시지 전송 시 채팅방 자동 생성
   - 모든 메시지 실시간 저장
   - 첫 사용자 메시지로 채팅방 제목 자동 생성
3. **RLS 보안**: Row Level Security로 사용자별 데이터 격리
4. **채팅 기록**:
   - 사이드바에서 과거 채팅 목록 확인
   - 클릭하여 이전 대화 이어가기
   - 새 채팅방 생성 버튼
