# 카카오 로그인 설정 가이드

## 1. 카카오 개발자 계정 설정

### 1.1 카카오 애플리케이션 생성
1. [카카오 개발자 콘솔](https://developers.kakao.com/)에 접속
2. 내 애플리케이션 → 애플리케이션 추가하기
3. 앱 이름, 사업자명 입력 후 저장

### 1.2 플랫폼 설정
1. 내 애플리케이션 → 앱 설정 → 플랫폼
2. Web 플랫폼 등록
   - 사이트 도메인: `http://localhost:3000` (개발)
   - 사이트 도메인: `https://your-domain.vercel.app` (프로덕션)

### 1.3 카카오 로그인 활성화
1. 제품 설정 → 카카오 로그인
2. 활성화 설정 → ON
3. Redirect URI 설정:
   ```
   http://localhost:3000/auth/callback
   https://your-domain.vercel.app/auth/callback
   ```

### 1.4 동의 항목 설정
1. 제품 설정 → 카카오 로그인 → 동의 항목
2. 필수 동의 항목:
   - 닉네임 (선택 동의)
   - 카카오계정(이메일) (필수 동의)
   - 프로필 사진 (선택 동의)

### 1.5 REST API 키 확인
1. 내 애플리케이션 → 앱 설정 → 앱 키
2. **REST API 키** 복사

---

## 2. Supabase 설정

### 2.1 Supabase 대시보드 접속
1. [Supabase Dashboard](https://app.supabase.com/)
2. 프로젝트 선택
3. Authentication → Providers

### 2.2 Kakao Provider 활성화
1. **Kakao** 찾기
2. **Enable** 토글 ON
3. 설정 입력:
   - **Client ID**: 카카오 REST API 키
   - **Client Secret**: (카카오는 필요 없음, 비워두기)
   - **Redirect URL**: 자동 생성된 URL 복사
     ```
     https://[YOUR-PROJECT-ID].supabase.co/auth/v1/callback
     ```

### 2.3 카카오에 Supabase Redirect URL 추가
1. 다시 카카오 개발자 콘솔로 이동
2. 제품 설정 → 카카오 로그인 → Redirect URI
3. Supabase에서 복사한 URL 추가:
   ```
   https://[YOUR-PROJECT-ID].supabase.co/auth/v1/callback
   ```

---

## 3. 코드 확인

### 3.1 AuthModal.tsx
카카오 로그인 버튼이 추가되었습니다:
```tsx
const handleKakaoLogin = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'kakao',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });
};
```

### 3.2 Callback 라우트
`app/auth/callback/route.ts`가 OAuth 콜백을 처리합니다.

---

## 4. 테스트

### 4.1 로컬 테스트
1. `npm run dev` 실행
2. 로그인 모달 열기
3. "카카오 로그인" 버튼 클릭
4. 카카오 로그인 페이지로 리다이렉트
5. 로그인 후 앱으로 돌아오기

### 4.2 프로덕션 배포
1. Vercel에 배포
2. 카카오 개발자 콘솔에서 프로덕션 도메인 추가
3. Redirect URI에 프로덕션 URL 추가

---

## 5. 문제 해결

### "Invalid redirect_uri" 에러
- 카카오 개발자 콘솔의 Redirect URI 설정 확인
- Supabase와 앱의 callback URL이 모두 등록되어 있는지 확인

### "Client not found" 에러
- Supabase의 Kakao Provider 설정 확인
- REST API 키가 올바른지 확인

### 로그인 후 리다이렉트 안 됨
- `app/auth/callback/route.ts` 파일 확인
- 브라우저 콘솔에서 에러 확인

---

## 6. 보안 고려사항

1. **REST API 키는 공개되어도 안전**합니다 (클라이언트 사이드에서 사용)
2. **Admin 키는 절대 노출 금지** (서버 사이드만)
3. Redirect URI는 정확히 일치해야 합니다
4. HTTPS 사용 권장 (프로덕션)

---

## 참고 자료
- [카카오 로그인 가이드](https://developers.kakao.com/docs/latest/ko/kakaologin/common)
- [Supabase OAuth 문서](https://supabase.com/docs/guides/auth/social-login/auth-kakao)
