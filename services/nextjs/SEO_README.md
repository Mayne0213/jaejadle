# SEO 최적화 가이드

이 프로젝트에 구현된 SEO 최적화 요소들에 대한 가이드입니다.

## 📋 구현된 SEO 요소

### 1. 메타데이터 설정

#### 기본 메타데이터 (`app/config/metadata.ts`)
- ✅ 페이지 제목 (동적 템플릿 포함)
- ✅ 메타 설명 (description)
- ✅ 키워드 (keywords)
- ✅ 저자 정보 (authors, creator, publisher)
- ✅ Open Graph 태그 (Facebook, KakaoTalk)
- ✅ Twitter Card 태그
- ✅ 검색 엔진 로봇 설정
- ✅ Canonical URL
- ✅ 아이콘 설정 (favicon, apple-touch-icon)

#### 페이지별 메타데이터
각 주요 페이지에 맞춤 메타데이터가 설정되어 있습니다:
- 담임목사 인사말
- 교회 비전
- 교역자 및 직분자
- 오시는 길
- 예배 영상
- 다음세대
- 제자화 시스템
- 선교
- 주보
- 갤러리

### 2. robots.txt (`app/robots.ts`)

검색 엔진 크롤러에게 어떤 페이지를 색인할지 알려줍니다.

```typescript
// 현재 설정:
- 모든 페이지 허용 (/)
- API, admin, _next, private 경로 차단
- sitemap 위치 명시
```

### 3. sitemap.xml (`app/sitemap.ts`)

사이트의 모든 페이지를 검색 엔진에 알려주는 사이트맵입니다.

**주요 페이지:**
- 홈페이지 (우선순위: 1.0)
- 예배 (우선순위: 0.9)
- 주보 (우선순위: 0.9)
- 교회 소개 페이지들 (우선순위: 0.7-0.8)

**동적 페이지 추가 방법:**
```typescript
// sitemap.ts에 다음과 같이 추가:
const announcements = await fetchAnnouncements()
const announcementPages = announcements.map((announcement) => ({
  url: `${baseUrl}/announcements/${announcement.id}`,
  lastModified: announcement.updatedAt,
  changeFrequency: 'weekly' as const,
  priority: 0.6,
}))
```

### 4. Web App Manifest (`app/manifest.ts`)

PWA(Progressive Web App) 설정으로 모바일 홈 화면에 앱처럼 추가할 수 있습니다.

```typescript
// 현재 설정:
- 앱 이름: 제자들교회
- 아이콘: icon_black.webp, icon_white.webp, logo.webp
- 테마 컬러: #000000
- 배경 컬러: #ffffff
```

### 5. Open Graph 이미지 (`app/opengraph-image.tsx`, `app/twitter-image.tsx`)

소셜 미디어에 링크 공유 시 표시되는 이미지를 동적으로 생성합니다.

- 크기: 1200x630px
- 자동 생성되는 그라데이션 배경
- 교회 이름과 설명 포함

**커스터마이징:**
`opengraph-image.tsx` 파일을 수정하여 디자인을 변경할 수 있습니다.

### 6. 구조화된 데이터 (JSON-LD) (`components/seo/JsonLd.tsx`)

검색 엔진이 페이지 내용을 더 잘 이해할 수 있도록 구조화된 데이터를 제공합니다.

#### 구현된 스키마:
1. **OrganizationJsonLd** - 교회 조직 정보
2. **WebSiteJsonLd** - 웹사이트 정보
3. **BreadcrumbJsonLd** - 빵가루 네비게이션
4. **ServiceEventJsonLd** - 예배 이벤트
5. **ArticleJsonLd** - 기사/블로그 포스트

#### 사용 방법:

**레이아웃에서 사용:**
```tsx
import { OrganizationJsonLd, WebSiteJsonLd } from '@/components/seo/JsonLd';

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <OrganizationJsonLd />
        <WebSiteJsonLd />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

**페이지에서 사용:**
```tsx
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';

export default function AboutPage() {
  return (
    <>
      <BreadcrumbJsonLd 
        items={[
          { name: '홈', url: 'https://jaejadle.com' },
          { name: '교회소개', url: 'https://jaejadle.com/about' },
        ]} 
      />
      {/* 페이지 콘텐츠 */}
    </>
  );
}
```

**예배 이벤트:**
```tsx
import { ServiceEventJsonLd } from '@/components/seo/JsonLd';

<ServiceEventJsonLd 
  event={{
    name: '주일 대예배',
    startDate: '2024-01-07T11:00:00+09:00',
    endDate: '2024-01-07T12:30:00+09:00',
    description: '제자들교회 주일 예배',
    location: '제자들교회',
  }} 
/>
```

**블로그 포스트:**
```tsx
import { ArticleJsonLd } from '@/components/seo/JsonLd';

<ArticleJsonLd 
  article={{
    headline: '제목',
    description: '설명',
    datePublished: '2024-01-01T00:00:00+09:00',
    dateModified: '2024-01-02T00:00:00+09:00',
    author: '작성자',
    image: 'https://jaejadle.com/image.jpg',
    url: 'https://jaejadle.com/article/1',
  }} 
/>
```

## 🔧 설정 가이드

### Google Search Console 설정

1. [Google Search Console](https://search.google.com/search-console)에 접속
2. 속성 추가 → URL 접두어 방식 선택
3. 도메인 입력: `https://disciples-jaejadle.com`
4. HTML 태그 방식 선택
5. `metadata.ts`에서 verification 코드 업데이트:

```typescript
verification: {
  google: "여기에-구글-인증-코드-입력",
}
```

### 네이버 서치어드바이저 설정

1. [네이버 서치어드바이저](https://searchadvisor.naver.com)에 접속
2. 사이트 등록
3. HTML 태그 방식 선택
4. `metadata.ts`에 추가:

```typescript
verification: {
  google: "구글-인증-코드",
  naver: "네이버-인증-코드", // 주석 해제 후 코드 입력
}
```

### Canonical URL 설정

기본 도메인이 변경되면 다음 파일들을 업데이트하세요:

1. `app/config/metadata.ts`
```typescript
metadataBase: new URL("https://disciples-jaejadle.com"),
alternates: {
  canonical: "https://disciples-jaejadle.com",
}
```

2. `app/robots.ts`
```typescript
sitemap: 'https://disciples-jaejadle.com/sitemap.xml',
```

3. `app/sitemap.ts`
```typescript
const baseUrl = 'https://disciples-jaejadle.com'
```

## 📊 SEO 성능 확인

### 1. Google PageSpeed Insights
- URL: https://pagespeed.web.dev/
- 사이트 속도와 SEO 점수 확인

### 2. Google Rich Results Test
- URL: https://search.google.com/test/rich-results
- 구조화된 데이터 확인

### 3. Meta Tags Checker
- URL: https://metatags.io/
- Open Graph 태그 미리보기

### 4. Twitter Card Validator
- URL: https://cards-dev.twitter.com/validator
- Twitter 카드 미리보기

## 🎯 체크리스트

SEO 최적화를 위한 체크리스트:

- [x] 페이지별 고유한 title 태그
- [x] 페이지별 고유한 description
- [x] Open Graph 태그 설정
- [x] Twitter Card 설정
- [x] robots.txt 설정
- [x] sitemap.xml 생성
- [x] 구조화된 데이터 (JSON-LD)
- [x] Canonical URL 설정
- [x] 모바일 최적화
- [x] PWA manifest
- [ ] Google Search Console 등록 (수동 필요)
- [ ] 네이버 서치어드바이저 등록 (수동 필요)
- [ ] Google Analytics 설정 (선택사항)

## 🚀 추가 최적화 권장사항

### 1. Google Analytics 4 추가

`app/layout.tsx`에 추가:
```tsx
import Script from 'next/script'

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  );
}
```

### 2. 이미지 최적화

- 모든 이미지에 적절한 `alt` 속성 추가
- Next.js Image 컴포넌트 사용
- WebP 포맷 사용 (현재 사용 중)

### 3. 페이지 로딩 속도

- 코드 스플리팅 활용
- 이미지 lazy loading (Next.js Image 기본 제공)
- 폰트 최적화 (현재 Google Fonts 사용 중)

### 4. 소셜 미디어 연동

`components/seo/JsonLd.tsx`의 OrganizationJsonLd에 소셜 미디어 링크 추가:
```typescript
sameAs: [
  'https://www.facebook.com/disciples-jaejadle',
  'https://www.instagram.com/disciples-jaejadle',
  'https://www.youtube.com/@disciples-jaejadle',
],
```

## 📝 업데이트 이력

- 2024-12-23: 초기 SEO 구현 완료
  - robots.txt, sitemap.xml
  - Open Graph 이미지
  - 구조화된 데이터
  - 페이지별 메타데이터
  - PWA manifest

## 📞 문의

SEO 관련 문의사항이 있으시면 개발팀에 연락주세요.

