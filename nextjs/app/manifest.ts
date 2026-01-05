import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: '제자들교회',
    short_name: '제자들교회',
    description: '인천 제자들교회 - 성경적 제자도를 실천하는 교회',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    orientation: 'portrait',
    icons: [
      {
        src: '/icon_black.webp',
        sizes: 'any',
        type: 'image/webp',
      },
      {
        src: '/icon_black.webp',
        sizes: 'any',
        type: 'image/webp',
        purpose: 'maskable',
      },
      {
        src: '/icon_white.webp',
        sizes: 'any',
        type: 'image/webp',
      },
      {
        src: '/icon_white.webp',
        sizes: 'any',
        type: 'image/webp',
        purpose: 'maskable',
      },
      {
        src: '/logo.webp',
        sizes: 'any',
        type: 'image/webp',
      },
    ],
    categories: ['church', 'religion', 'community'],
    lang: 'ko-KR',
    dir: 'ltr',
  }
}

