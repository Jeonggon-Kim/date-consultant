export const CHAT_LIMITS = {
  /**
   * 비로그인 유저 메시지 제한
   * (사용자가 보낼 수 있는 메시지 횟수, AI 응답은 별도)
   */
  GUEST_MESSAGE_LIMIT: 5,

  /**
   * 로그인했지만 구독하지 않은 유저의 일일 메시지 제한
   */
  FREE_USER_MESSAGE_LIMIT: 20,

  /**
   * 리뷰 요청 트리거 횟수
   * (당일 이 횟수만큼 메시지를 사용하면 리뷰 모달 표시)
   */
  REVIEW_TRIGGER_COUNT: 10,
} as const;