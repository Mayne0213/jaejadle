# SEO 빠른 참조 가이드

## 🎯 새 페이지 추가 시 체크리스트

### 1. 일반 페이지 (Server Component)

```tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '페이지 제목',
  description: '페이지 설명 (160자 이내 권장)',
  keywords: ['키워드1', '키워드2'],
  openGraph: {
    title: '페이지 제목 | 제자들교회',
    description: '페이지 설명',
  },
};

export default function MyPage() {
  return <div>내용</div>;
}
```

### 2. 클라이언트 컴포넌트 페이지

페이지 디렉토리에 `layout.tsx` 생성:

```tsx
// app/mypage/layout.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '페이지 제목',
  description: '페이지 설명',
};

export default function MyPageLayout({ children }) {
  return <>{children}</>;
}
```

### 3. 동적 페이지

```tsx
import { Metadata } from 'next';

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // 데이터 가져오기
  const post = await fetchPost(params.id);

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

export default function PostPage({ params }: Props) {
  return <div>내용</div>;
}
```

## 📄 sitemap.xml 업데이트

`app/sitemap.ts`에 새 페이지 추가:

```typescript
{
  url: `${baseUrl}/새페이지`,
  lastModified: new Date(),
  changeFrequency: 'weekly' as const,
  priority: 0.8,
}
```

## 🔍 구조화된 데이터 사용

### 빵가루 네비게이션

```tsx
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';

<BreadcrumbJsonLd 
  items={[
    { name: '홈', url: 'https://disciples-jaejadle.com' },
    { name: '카테고리', url: 'https://disciples-jaejadle.com/category' },
    { name: '현재 페이지', url: 'https://disciples-jaejadle.com/category/page' },
  ]} 
/>
```

### 기사/블로그

```tsx
import { ArticleJsonLd } from '@/components/seo/JsonLd';

<ArticleJsonLd 
  article={{
    headline: '기사 제목',
    description: '기사 설명',
    datePublished: '2024-01-01T00:00:00+09:00',
    dateModified: '2024-01-02T00:00:00+09:00',
    author: '작성자',
    image: 'https://disciples-jaejadle.com/image.jpg',
    url: 'https://disciples-jaejadle.com/article/1',
  }} 
/>
```

### 이벤트

```tsx
import { ServiceEventJsonLd } from '@/components/seo/JsonLd';

<ServiceEventJsonLd 
  event={{
    name: '주일 예배',
    startDate: '2024-01-07T11:00:00+09:00',
    endDate: '2024-01-07T12:30:00+09:00',
    description: '제자들교회 주일 예배',
    location: '제자들교회',
  }} 
/>
```

## 🛠️ SEO 유틸리티 함수

```tsx
import {
  generatePageTitle,
  truncateDescription,
  generateOgImageUrl,
  generateCanonicalUrl,
  toKoreanISODate,
  socialShare,
} from '@/lib/utils/seo';

// 페이지 제목
const title = generatePageTitle('내 페이지');
// => "내 페이지 | 제자들교회"

// 설명 자르기
const desc = truncateDescription('긴 설명...', 160);

// OG 이미지 URL
const ogImage = generateOgImageUrl('/images/my-image.jpg');
// => "https://disciples-jaejadle.com/images/my-image.jpg"

// Canonical URL
const canonical = generateCanonicalUrl('/about');
// => "https://disciples-jaejadle.com/about"

// 한국 시간
const date = toKoreanISODate(new Date());
// => "2024-01-01T12:00:00+09:00"

// 소셜 공유 URL
const fbUrl = socialShare.facebook('https://disciples-jaejadle.com/post/1');
const twUrl = socialShare.twitter('https://disciples-jaejadle.com/post/1', '공유 텍스트');
const kakaoUrl = socialShare.kakao('https://disciples-jaejadle.com/post/1');
```

## 📊 SEO 검증 도구

### 개발 중
```bash
# 빌드하여 메타데이터 확인
npm run build
npm run start
```

### 배포 후
1. **Google Search Console**: https://search.google.com/search-console
   - 사이트맵 제출: `https://disciples-jaejadle.com/sitemap.xml`
   - URL 검사

2. **Rich Results Test**: https://search.google.com/test/rich-results
   - 구조화된 데이터 검증

3. **Meta Tags Checker**: https://metatags.io/
   - OG 태그 미리보기

4. **PageSpeed Insights**: https://pagespeed.web.dev/
   - 성능 및 SEO 점수

## 🚨 주의사항

### ❌ 피해야 할 것

1. **중복 메타데이터**
   - 같은 페이지에 여러 title 태그
   - 여러 canonical URL

2. **빈 메타데이터**
   ```tsx
   // ❌ 나쁜 예
   title: '',
   description: '',
   ```

3. **너무 긴 설명**
   - Title: 60자 이하 권장
   - Description: 160자 이하 권장

4. **키워드 스팸**
   ```tsx
   // ❌ 나쁜 예
   keywords: ['교회', '교회', '교회', '교회', ...]
   ```

### ✅ 권장사항

1. **고유한 메타데이터**
   - 각 페이지마다 고유한 title과 description

2. **의미있는 설명**
   - 사용자가 클릭하고 싶게 만드는 설명
   - 핵심 키워드 포함

3. **이미지 최적화**
   - OG 이미지: 1200x630px
   - Alt 텍스트 항상 포함
   - WebP 포맷 사용

4. **정기적인 업데이트**
   - 콘텐츠 변경 시 lastModified 업데이트
   - sitemap 정기 확인

## 📱 모바일 최적화

현재 적용된 모바일 최적화:

```typescript
// manifest.ts에 PWA 설정
{
  display: 'standalone',
  theme_color: '#000000',
  background_color: '#ffffff',
}

// metadata.ts에 모바일 설정
{
  appleWebApp: {
    capable: true,
    title: "제자들교회",
    statusBarStyle: "black-translucent",
  },
  formatDetection: {
    telephone: true,
    date: true,
    address: true,
    email: true,
  },
}
```

## 🔗 추가 리소스

- [Next.js Metadata 문서](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
- [Schema.org](https://schema.org/)
- [Open Graph Protocol](https://ogp.me/)
- [Google Search Central](https://developers.google.com/search)

## 💡 팁

### 1. 개발 중 메타데이터 확인

브라우저 개발자 도구에서:
```
<head> 태그 내부 확인
- <title>
- <meta name="description">
- <meta property="og:*">
- <script type="application/ld+json">
```

### 2. 로컬에서 OG 이미지 확인

```bash
# 빌드 후
npm run build
npm run start

# 브라우저에서
http://localhost:3000/opengraph-image
```

### 3. sitemap.xml 확인

```bash
http://localhost:3000/sitemap.xml
```

### 4. robots.txt 확인

```bash
http://localhost:3000/robots.txt
```

## 🎓 SEO 체크리스트

매 페이지 추가/수정 시:

- [ ] 고유한 title 설정 (60자 이하)
- [ ] 설명적인 description (160자 이하)
- [ ] 관련 키워드 3-5개
- [ ] Open Graph 태그
- [ ] 이미지에 alt 속성
- [ ] sitemap.xml 업데이트
- [ ] 모바일 반응형 확인
- [ ] 로딩 속도 확인
- [ ] 구조화된 데이터 (필요시)
- [ ] 내부 링크 연결

---

더 자세한 내용은 `SEO_README.md`를 참고하세요.

