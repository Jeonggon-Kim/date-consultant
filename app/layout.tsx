import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title:
    "연애 상담, 재회 상담 전문 - AI 연애 솔루션 | 썸남 썸녀 짝사랑 꼬시는 법",
  description:
    "연애 상담, 재회 상담, 썸녀 꼬시는 법, 짝사랑남 꼬시는 법 전문 AI 상담 서비스. 10년 경력 연애 전문가가 만든 AI가 24시간 실시간으로 연애 고민, 이별 극복, 관계 회복을 도와드립니다. 무료 상담 가능.",
  keywords:
    "연애 상담, 재회 상담, 썸녀 꼬시는 법, 짝사랑남 꼬시는 법, 연애 고민, 이별 극복, 관계 회복, 연애 컨설팅, AI 상담, 무료 연애 상담",
  authors: [{ name: "연애 솔루션" }],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://date-consultant.vercel.app",
    siteName: "연애 솔루션",
    title: "연애 상담, 재회 상담 전문 - AI 연애 솔루션",
    description:
      "연애 상담, 재회 상담, 썸녀 꼬시는 법, 짝사랑남 꼬시는 법 전문. 10년 경력 연애 전문가의 AI 상담 서비스",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "연애 솔루션 - 전문 연애 상담 서비스",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "연애 상담, 재회 상담 전문 - AI 연애 솔루션",
    description: "연애 상담, 재회 상담, 썸녀/짝사랑남 꼬시는 법 전문 AI 상담",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    other: {
      "naver-site-verification": "your-naver-verification-code",
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "연애 솔루션",
    description:
      "연애 상담, 재회 상담, 썸녀 꼬시는 법, 짝사랑남 꼬시는 법 전문 AI 상담 서비스",
    url: "https://date-consultant.vercel.app",
    logo: "https://date-consultant.vercel.app/logo.png",
    image: "https://date-consultant.vercel.app/og-image.png",
    telephone: "010-8348-0132",
    priceRange: "무료 - 유료",
    address: {
      "@type": "PostalAddress",
      addressCountry: "KR",
    },
    areaServed: {
      "@type": "Country",
      name: "대한민국",
    },
    serviceType: ["연애 상담", "재회 상담", "연애 코칭", "AI 상담"],
    availableLanguage: {
      "@type": "Language",
      name: "한국어",
    },
    openingHours: "24/7",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "500",
    },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      price: "0",
      priceCurrency: "KRW",
      description: "무료 체험 가능",
    },
  };

  return (
    <html lang="ko">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
