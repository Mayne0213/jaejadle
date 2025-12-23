import React from 'react'

interface JsonLdProps {
  data: Record<string, any>
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

// 교회 조직 구조화 데이터
export function OrganizationJsonLd() {
  const organizationData = {
    '@context': 'https://schema.org',
    '@type': 'Church',
    name: '제자들교회',
    alternateName: '인천 제자들교회',
    url: 'https://disciples-jaejadle.com',
    logo: 'https://disciples-jaejadle.com/logo.webp',
    description: '인천 제자들교회 - 성경적 제자도를 실천하는 교회',
    address: {
      '@type': 'PostalAddress',
      addressLocality: '인천광역시',
      addressCountry: 'KR',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: 'Korean',
    },
    sameAs: [
      // 소셜 미디어 링크가 있다면 여기에 추가
      // 'https://www.facebook.com/jaejadle',
      // 'https://www.instagram.com/jaejadle',
      // 'https://www.youtube.com/@jaejadle',
    ],
  }

  return <JsonLd data={organizationData} />
}

// 웹사이트 구조화 데이터
export function WebSiteJsonLd() {
  const websiteData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: '제자들교회',
    url: 'https://disciples-jaejadle.com',
    description: '인천 제자들교회 - 성경적 제자도를 실천하는 교회',
    inLanguage: 'ko-KR',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://disciples-jaejadle.com/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  }

  return <JsonLd data={websiteData} />
}

// 빵가루 네비게이션 구조화 데이터
interface BreadcrumbItem {
  name: string
  url: string
}

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const breadcrumbData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return <JsonLd data={breadcrumbData} />
}

// 예배 이벤트 구조화 데이터
interface ServiceEvent {
  name: string
  startDate: string
  endDate: string
  description?: string
  location?: string
}

export function ServiceEventJsonLd({ event }: { event: ServiceEvent }) {
  const eventData = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.name,
    startDate: event.startDate,
    endDate: event.endDate,
    description: event.description,
    location: {
      '@type': 'Place',
      name: event.location || '제자들교회',
      address: {
        '@type': 'PostalAddress',
        addressLocality: '인천광역시',
        addressCountry: 'KR',
      },
    },
    organizer: {
      '@type': 'Church',
      name: '제자들교회',
      url: 'https://disciples-jaejadle.com',
    },
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
  }

  return <JsonLd data={eventData} />
}

// 기사/블로그 포스트 구조화 데이터
interface ArticleData {
  headline: string
  description: string
  datePublished: string
  dateModified?: string
  author?: string
  image?: string
  url: string
}

export function ArticleJsonLd({ article }: { article: ArticleData }) {
  const articleData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.headline,
    description: article.description,
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    author: {
      '@type': 'Organization',
      name: article.author || '제자들교회',
    },
    publisher: {
      '@type': 'Organization',
      name: '제자들교회',
      logo: {
        '@type': 'ImageObject',
        url: 'https://disciples-jaejadle.com/logo.webp',
      },
    },
    image: article.image,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': article.url,
    },
  }

  return <JsonLd data={articleData} />
}

