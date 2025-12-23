import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '예배 영상',
  description: '제자들교회의 주일 설교와 금요 성령집회 영상을 시청하실 수 있습니다. 말씀을 통한 은혜를 경험하세요.',
  openGraph: {
    title: '예배 영상 | 제자들교회',
    description: '제자들교회의 주일 설교와 금요 성령집회 영상을 시청하실 수 있습니다.',
  },
};

export default function WorshipLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

