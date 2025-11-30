import { Metadata } from "next";

export const metadata: Metadata = {
  // metadataBase: 소셜 미디어 이미지 URL 해석을 위한 기본 URL
  metadataBase: new URL("https://jaejadle.com"),
  
  // 기본 메타데이터
  title: {
    default: "제자들교회 - 인천",
    template: "%s | 제자들교회"
  },
  description: "마음속 비를 막아주는 따뜻한 마음주치의, 마음우산. 나의 잠재력을 발휘하는 건강한 일상으로 여유와 품격을 더한 올바른 진료",
  keywords: [
    "제자들교회",
    "인천",
    "교회",
    "마음우산",
    "마음주치의",
    "상담",
    "치유",
    "회복"
  ],
  authors: [{ name: "제자들교회" }],
  creator: "제자들교회",

  // Open Graph (Facebook, KakaoTalk 등)
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://jaejadle.kro.kr",
    siteName: "제자들교회",
    title: "제자들교회 - 인천",
    description: "마음속 비를 막아주는 따뜻한 마음주치의, 마음우산. 나의 잠재력을 발휘하는 건강한 일상으로 여유와 품격을 더한 올바른 진료",
    images: [
      {
        url: "/og-image.jpg", // TODO: public/og-image.jpg (1200x630px) 준비 필요
        width: 1200,
        height: 630,
        alt: "제자들교회"
      }
    ]
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "제자들교회 - 인천",
    description: "마음속 비를 막아주는 따뜻한 마음주치의, 마음우산.",
    images: ["/og-image.jpg"],
  },

  // 검색 엔진 최적화
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

  // 검증 (Google Search Console 등록 후 추가)
  verification: {
    google: "your-google-verification-code", // Google Search Console에서 발급받은 코드
    // naver: "your-naver-verification-code", // 네이버 서치어드바이저
  },

  // 기타
  alternates: {
    canonical: "https://jaejadle.kro.kr",
  },

  // 아이콘
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
};
