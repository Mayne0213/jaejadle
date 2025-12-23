/**
 * 동적 메타 태그 컴포넌트
 * 
 * 사용 예시:
 * <MetaTags 
 *   title="페이지 제목"
 *   description="페이지 설명"
 *   keywords={['키워드1', '키워드2']}
 *   image="/images/og-image.jpg"
 *   url="/about"
 * />
 */

import { Metadata } from 'next';

interface MetaTagsProps {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url: string;
  type?: 'website' | 'article';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

export function generateMetadata({
  title,
  description,
  keywords = [],
  image,
  url,
  type = 'website',
  author,
  publishedTime,
  modifiedTime,
}: MetaTagsProps): Metadata {
  const baseUrl = 'https://disciples-jaejadle.com';
  const fullUrl = `${baseUrl}${url}`;
  const ogImage = image ? `${baseUrl}${image}` : `${baseUrl}/opengraph-image`;

  const metadata: Metadata = {
    title,
    description,
    keywords: [...keywords, '제자들교회', '인천', '교회'],
    authors: author ? [{ name: author }] : [{ name: '제자들교회' }],
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
      siteName: '제자들교회',
      locale: 'ko_KR',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical: fullUrl,
    },
  };

  return metadata;
}

export default generateMetadata;

