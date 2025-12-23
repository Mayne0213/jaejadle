/**
 * SEO 유틸리티 함수들
 */

/**
 * 페이지 제목 생성
 * @param title - 페이지 제목
 * @param siteName - 사이트 이름 (기본값: 제자들교회)
 * @returns 완성된 페이지 제목
 */
export function generatePageTitle(title: string, siteName = '제자들교회'): string {
  return `${title} | ${siteName}`;
}

/**
 * 메타 설명 생성
 * @param description - 설명
 * @param maxLength - 최대 길이 (기본값: 160자)
 * @returns 잘린 설명
 */
export function truncateDescription(description: string, maxLength = 160): string {
  if (description.length <= maxLength) return description;
  return description.substring(0, maxLength - 3) + '...';
}

/**
 * Open Graph 이미지 URL 생성
 * @param path - 이미지 경로
 * @param baseUrl - 기본 URL (기본값: https://disciples-jaejadle.com)
 * @returns 완전한 이미지 URL
 */
export function generateOgImageUrl(path: string, baseUrl = 'https://disciples-church.com'): string {
  if (path.startsWith('http')) return path;
  return `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`;
}

/**
 * Canonical URL 생성
 * @param pathname - 경로
 * @param baseUrl - 기본 URL (기본값: https://disciples-jaejadle.com)
 * @returns Canonical URL
 */
export function generateCanonicalUrl(pathname: string, baseUrl = 'https://disciples-church.com'): string {
  const cleanPath = pathname.replace(/\/$/, ''); // 끝의 슬래시 제거
  return `${baseUrl}${cleanPath}`;
}

/**
 * 키워드 배열 생성
 * @param keywords - 키워드 문자열 또는 배열
 * @returns 키워드 배열
 */
export function normalizeKeywords(keywords: string | string[]): string[] {
  if (Array.isArray(keywords)) return keywords;
  return keywords.split(',').map(k => k.trim()).filter(Boolean);
}

/**
 * 구조화된 데이터 JSON-LD 생성
 * @param type - 스키마 타입
 * @param data - 데이터 객체
 * @returns JSON-LD 문자열
 */
export function generateJsonLd(type: string, data: Record<string, any>): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': type,
    ...data,
  });
}

/**
 * 빵가루 네비게이션 데이터 생성
 * @param items - 빵가루 아이템 배열
 * @returns 구조화된 빵가루 데이터
 */
export function generateBreadcrumbData(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * 날짜를 ISO 8601 형식으로 변환
 * @param date - Date 객체 또는 날짜 문자열
 * @returns ISO 8601 형식 문자열
 */
export function toISODate(date: Date | string): string {
  if (typeof date === 'string') {
    date = new Date(date);
  }
  return date.toISOString();
}

/**
 * 한국 시간대로 ISO 8601 형식 생성
 * @param date - Date 객체
 * @returns ISO 8601 형식 문자열 (한국 시간대)
 */
export function toKoreanISODate(date: Date): string {
  const offset = 9 * 60; // 한국은 UTC+9
  const koreanDate = new Date(date.getTime() + offset * 60 * 1000);
  return koreanDate.toISOString().replace('Z', '+09:00');
}

/**
 * 소셜 미디어 공유 URL 생성
 */
export const socialShare = {
  facebook: (url: string) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  twitter: (url: string, text?: string) => {
    const params = new URLSearchParams({ url });
    if (text) params.append('text', text);
    return `https://twitter.com/intent/tweet?${params.toString()}`;
  },
  kakao: (url: string) => `https://story.kakao.com/share?url=${encodeURIComponent(url)}`,
  line: (url: string) => `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}`,
};

/**
 * 페이지 메타데이터 생성 헬퍼
 */
export function generatePageMetadata({
  title,
  description,
  keywords = [],
  image,
  url,
  type = 'website',
  noIndex = false,
}: {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url: string;
  type?: 'website' | 'article';
  noIndex?: boolean;
}) {
  const baseUrl = 'https://disciples-church.com';
  const fullUrl = generateCanonicalUrl(url, baseUrl);
  const ogImage = image ? generateOgImageUrl(image, baseUrl) : `${baseUrl}/opengraph-image`;

  return {
    title,
    description: truncateDescription(description),
    keywords: [...keywords, '제자들교회', '인천', '교회'],
    openGraph: {
      title,
      description,
      url: fullUrl,
      type,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image' as const,
      title,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical: fullUrl,
    },
    robots: noIndex ? {
      index: false,
      follow: true,
    } : undefined,
  };
}

