import { Metadata } from "next";

export const metadata: Metadata = {
  // metadataBase: 소셜 미디어 이미지 URL 해석을 위한 기본 URL
  metadataBase: new URL("https://www.disciples-church.com"),
  
  // 기본 메타데이터
  title: {
    default: "제자들교회 - 인천",
    template: "%s | 제자들교회"
  },
  applicationName: "제자들교회",
  description: "인천 제자들교회 - 성경적 제자도를 실천하는 교회입니다. 예배, 양육, 선교, 교제를 통해 그리스도의 제자로 성장하는 공동체입니다.",
  keywords: [
    "제자들교회",
    "인천교회",
    "인천 교회",
    "교회",
    "예배",
    "찬양",
    "설교",
    "기독교",
    "제자도",
    "제자훈련",
    "성경공부",
    "소그룹",
    "다음세대",
    "청년부",
    "주일예배",
    "수요예배",
    "선교",
    "봉사",
    "신앙",
    "믿음",
    "교제",
    "공동체"
  ],
  authors: [{ name: "제자들교회" }],
  creator: "제자들교회",
  publisher: "제자들교회",
  category: "religion",

  // Open Graph (Facebook, KakaoTalk 등)
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://www.disciples-church.com",
    siteName: "제자들교회",
    title: "제자들교회 - 인천",
    description: "인천 제자들교회 - 성경적 제자도를 실천하는 교회입니다. 예배, 양육, 선교, 교제를 통해 그리스도의 제자로 성장하는 공동체입니다.",
    images: [
      {
        url: "/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "제자들교회 - 인천",
        type: "image/jpeg",
      }
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "제자들교회 - 인천",
    description: "인천 제자들교회 - 성경적 제자도를 실천하는 교회",
    images: ["/twitter-image.jpg"],
    creator: "@jaejadle",
    site: "@jaejadle",
  },

  // 검색 엔진 최적화
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // robots: "noindex, follow",

  // 검증 (Google Search Console 등록 후 추가)
  verification: {
    google: "your-google-verification-code", // Google Search Console에서 발급받은 코드
    // naver: "your-naver-verification-code", // 네이버 서치어드바이저
    // other: "your-other-verification-code",
  },

  // 기타
  alternates: {
    canonical: "https://www.disciples-church.com",
    languages: {
      'ko-KR': 'https://www.disciples-church.com',
    },
  },

  // 아이콘 - Next.js App Router가 자동으로 icon.tsx와 apple-icon.tsx를 처리
  // favicon.ico는 app 폴더에 있으면 자동으로 사용됨

  // 앱 링크 (모바일 앱이 있는 경우)
  // appleWebApp: {
  //   capable: true,
  //   title: "제자들교회",
  //   statusBarStyle: "black-translucent",
  // },

  // 포맷 감지
  formatDetection: {
    telephone: true,
    date: true,
    address: true,
    email: true,
  },

  // 기타 메타 태그
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
  },
};
