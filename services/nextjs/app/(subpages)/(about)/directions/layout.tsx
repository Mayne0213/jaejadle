import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '오시는 길',
  description: '제자들교회 오시는 길 안내입니다. 주소: 인천광역시 서구 고산후로 95번길 32 명진프라자 3층 본당 / 4층 교육관',
  openGraph: {
    title: '오시는 길 | 제자들교회',
    description: '제자들교회 오시는 길 - 인천광역시 서구 고산후로 95번길 32',
  },
};

export default function DirectionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

