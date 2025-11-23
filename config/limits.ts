/**
 * 채팅 제한 횟수 설정
 *
 * 이 파일을 수정하면 자동으로 배포에 반영됩니다.
 */

export const CHAT_LIMITS = {
  /**
   * 비로그인 유저 메시지 제한
   * (사용자가 보낼 수 있는 메시지 횟수, AI 응답은 별도)
   */
  GUEST_MESSAGE_LIMIT: 10,

  /**
   * 로그인했지만 구독하지 않은 유저의 일일 메시지 제한
   */
  FREE_USER_MESSAGE_LIMIT: 30,
} as const;
