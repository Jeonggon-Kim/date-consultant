# 정기결제 구현 가이드

## 개요
포트원(PortOne) V2 API를 사용하여 자동 갱신 정기결제(구독) 시스템을 구현했습니다.

## 변경 사항

### 1. 데이터베이스 스키마
- `subscriptions` 테이블에 `billing_key` 컬럼 추가
- SQL 파일: `supabase/add_billing_key.sql`

```sql
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS billing_key TEXT;
```

### 2. 프론트엔드 변경
- **파일**: `app/components/SubscriptionModal.tsx`
- **변경 내용**: 
  - `requestPayment` → `requestIssueBillingKey`로 변경
  - 일회성 결제 대신 빌링키 발급 요청
  - API 엔드포인트: `/api/payment/verify` → `/api/payment/subscribe`

### 3. 백엔드 API 추가

#### a) `/api/payment/subscribe` (신규)
- 빌링키를 받아 DB에 저장
- 첫 결제 진행 (1,000원)
- 구독 정보 업데이트

#### b) `/api/payment/webhook` (신규)
- 포트원 웹훅 수신
- 결제 성공/실패 이벤트 처리
- 구독 기간 자동 연장

#### c) `/api/payment/recurring` (신규)
- 크론 작업용 엔드포인트
- 만료 예정 구독 자동 결제
- 매월 자동 실행

#### d) `/api/subscription/cancel` (수정)
- 구독 취소 시 빌링키 삭제
- 포트원에서 빌링키 제거

## 환경 변수 설정

`.env.local` 파일에 다음 변수를 추가하세요:

```env
# 기존 변수
NEXT_PUBLIC_PORTONE_STORE_ID=your_store_id
NEXT_PUBLIC_PORTONE_CHANNEL_KEY=your_channel_key
PORTONE_API_SECRET=your_api_secret

# 새로 추가할 변수
CRON_SECRET=your_random_secret_key_for_cron
```

## Supabase 설정

1. Supabase SQL Editor에서 다음 SQL 실행:
```sql
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS billing_key TEXT;
```

## 포트원 설정

### 1. 웹훅 URL 설정
포트원 관리자 페이지에서 웹훅 URL을 설정하세요:
```
https://your-domain.com/api/payment/webhook
```

### 2. 수신할 이벤트
- `Transaction.Paid` (결제 성공)
- `Transaction.Failed` (결제 실패)

## 크론 작업 설정 (Vercel Cron)

### 1. `vercel.json` 파일 생성
프로젝트 루트에 다음 파일을 생성하세요:

```json
{
  "crons": [
    {
      "path": "/api/payment/recurring",
      "schedule": "0 0 * * *"
    }
  ]
}
```

이 설정은 매일 자정(UTC)에 크론 작업을 실행합니다.

### 2. Vercel 환경 변수 설정
Vercel 대시보드에서 `CRON_SECRET` 환경 변수를 설정하세요.

### 3. 크론 작업 인증
크론 작업 실행 시 다음 헤더가 자동으로 포함됩니다:
```
Authorization: Bearer YOUR_CRON_SECRET
```

## 작동 방식

### 초기 구독
1. 사용자가 "구독하기" 버튼 클릭
2. 포트원 빌링키 발급 화면 표시
3. 결제 수단 등록 완료
4. 빌링키를 DB에 저장
5. 첫 결제(1,000원) 진행
6. 구독 활성화 (1개월)

### 자동 갱신
1. 크론 작업이 매일 실행
2. 만료 7일 이내 구독 조회
3. 저장된 빌링키로 자동 결제
4. 결제 성공 시 구독 기간 1개월 연장
5. 결제 실패 시 구독 비활성화

### 구독 취소
1. 사용자가 "구독 취소" 클릭
2. 포트원에서 빌링키 삭제
3. DB에서 빌링키 제거
4. `cancel_at_period_end` 플래그 설정
5. 현재 기간 종료 후 구독 만료

## 테스트 방법

### 1. 빌링키 발급 테스트
```bash
# 개발 서버 실행
npm run dev

# 브라우저에서 구독 모달 열기
# "구독하기" 버튼 클릭
# 테스트 카드 정보 입력
```

### 2. 크론 작업 테스트
```bash
# 로컬에서 크론 엔드포인트 호출
curl -X GET http://localhost:3000/api/payment/recurring \
  -H "Authorization: Bearer YOUR_CRON_SECRET"
```

### 3. 웹훅 테스트
포트원 관리자 페이지에서 웹훅 테스트 기능을 사용하세요.

## 주의사항

1. **보안**: 
   - `PORTONE_API_SECRET`은 절대 클라이언트에 노출하지 마세요
   - `CRON_SECRET`은 충분히 복잡한 값으로 설정하세요

2. **빌링키 관리**:
   - 빌링키는 민감한 정보이므로 안전하게 보관
   - 구독 취소 시 반드시 삭제

3. **에러 처리**:
   - 결제 실패 시 사용자에게 알림 발송 권장
   - 로그를 통해 결제 실패 원인 추적

4. **테스트**:
   - 프로덕션 배포 전 충분한 테스트 필요
   - 포트원 테스트 환경에서 먼저 검증

## 다음 단계

1. Supabase에서 SQL 실행 (`billing_key` 컬럼 추가)
2. 환경 변수 설정 (`.env.local` 및 Vercel)
3. 포트원 웹훅 URL 설정
4. `vercel.json` 파일 생성
5. 테스트 진행
6. 프로덕션 배포
