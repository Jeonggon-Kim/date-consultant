import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '💕 재회 솔루션',
  description: 'OpenAI API를 사용한 AI 재회 전문 상담 애플리케이션',
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
