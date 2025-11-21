import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '💕 연애 솔루션',
  description: 'OpenAI API를 사용한 AI 연애 전문 상담 애플리케이션 (재회 특화)',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
