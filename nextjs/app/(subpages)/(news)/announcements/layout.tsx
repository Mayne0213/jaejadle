import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '주보',
  description: '제자들교회의 주보와 공지사항을 확인하실 수 있습니다. 교회의 소식과 일정을 안내해드립니다.',
  openGraph: {
    title: '주보 | 제자들교회',
    description: '제자들교회의 주보와 공지사항을 확인하실 수 있습니다.',
  },
};

export default function AnnouncementsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

