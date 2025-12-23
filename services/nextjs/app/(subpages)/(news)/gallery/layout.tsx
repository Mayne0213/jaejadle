import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '갤러리',
  description: '제자들교회의 다양한 활동과 행사 사진을 보실 수 있습니다. 교회 공동체의 아름다운 순간들을 함께 나눕니다.',
  openGraph: {
    title: '갤러리 | 제자들교회',
    description: '제자들교회 갤러리 - 교회 활동 및 행사 사진',
  },
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

