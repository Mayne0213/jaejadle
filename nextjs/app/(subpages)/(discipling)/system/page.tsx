import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import system1 from '@/public/subpages/system/icon1.webp';
import system2 from '@/public/subpages/system/icon2.webp';
import system3 from '@/public/subpages/system/icon3.webp';
import system4 from '@/public/subpages/system/icon4.webp';
import system5 from '@/public/subpages/system/icon5.webp';

export const metadata: Metadata = {
  title: '제자화 시스템',
  description: '제자들교회의 체계적인 제자훈련 시스템입니다. 새가족반부터 사역훈련반까지 단계별 양육 과정을 통해 성숙한 제자로 성장합니다.',
  openGraph: {
    title: '제자화 시스템 | 제자들교회',
    description: '제자들교회 제자훈련 시스템 - 정착부터 일꾼까지',
  },
};

function DiscipleshipSystemPageContent() {
  const stages = [
    {
      id: 'new-family',
      title: '새가족반 - 정착',
      subtitle: '5주 과정',
      bgColor: 'bg-[#016ba4]',
      textColor: 'text-white',
      icon: <Image src={system1} alt="system1" width={100} height={100} />,
      arrowColor: '#016ba4',
    },
    {
      id: 'basic',
      title: '기초양육반 - 기본',
      subtitle: '12주 과정',
      bgColor: 'bg-white',
      textColor: 'text-[#4A9FD8]',
      icon: <Image src={system2} alt="system2" width={100} height={100} />,
      arrowColor: '#FFFFFF',
    },
    {
      id: 'disciple',
      title: '제자훈련반 - 성숙',
      details: [
        { text: '복음키워드 1단계 - 십자가', period: '12주 과정' },
        { text: '복음키워드 2단계 - 영적전투', period: '12주 과정' },
        { text: '복음키워드 3단계 - 하나님 나라', period: '6주 과정' },
      ],
      bgColor: 'bg-[#41cc93]',
      textColor: 'text-white',
      icon: <Image src={system3} alt="system3" width={100} height={100} />,
      arrowColor: '#41cc93',
    },
    {
      id: 'evangelism',
      title: '전도훈련반 - 증인',
      subtitle: '6주 과정',
      bgColor: 'bg-white',
      textColor: 'text-[#F08B7C]',
      icon: <Image src={system4} alt="system4" width={100} height={100} />,
      arrowColor: '#FFFFFF',
    },
    {
      id: 'ministry',
      title: '사역훈련반 - 일꾼',
      subtitle: '12주 과정',
      bgColor: 'bg-[#ed8775]',
      textColor: 'text-white',
      icon: <Image src={system5} alt="system5" width={100} height={100} />,
      arrowColor: '#ed8775',
    },
  ];

  return (
    <div className="bg-white w-full">
      <div className="py-8">
          {/* 시스템 플로우 */}
          <div className="space-y-0 max-w-6xl mx-auto rounded-2xl overflow-hidden border border-gray-400 shadow-lg">
            {stages.map((stage, index) => (
              <Link
                key={stage.id}
                href={`/system/${stage.id}`}
                className="relative block cursor-pointer group transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:z-10"
              >
                {/* 상단 화살표 (두 번째 섹션부터) */}
                {index > 0 && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center">
                    {/* 화살표 몸통 */}
                    <div className="w-8 h-2 smalltablet:h-3" style={{ backgroundColor: stages[index - 1].arrowColor }} />

                    {/* 모바일 화살표 */}
                    <div
                      className="w-0 h-0 smalltablet:hidden border-l-24 border-l-transparent border-r-24 border-r-transparent border-t-30"
                      style={{ borderTopColor: stages[index - 1].arrowColor }}
                    >
                    </div>
                    {/* 중간 화면 화살표 */}
                    <div
                      className="w-0 h-0 hidden smalltablet:block pc:hidden border-l-32 border-l-transparent border-r-32 border-r-transparent border-t-40"
                      style={{ borderTopColor: stages[index - 1].arrowColor }}
                    >
                    </div>
                    {/* 데스크톱 화살표 */}
                    <div
                      className="w-0 h-0 hidden pc:block border-l-40 border-l-transparent border-r-40 border-r-transparent border-t-50"
                      style={{ borderTopColor: stages[index - 1].arrowColor }}
                    >
                    </div>
                  </div>
                )}

                {/* 단계 박스 */}
                <div className={`${stage.bgColor} ${stage.textColor} py-6 smalltablet:py-8 px-4 smalltablet:px-6 pc:px-8 text-center relative w-full transition-all duration-300 group-hover:brightness-105`}>
                  {/* 클릭 가능 표시 - 오른쪽 상단 화살표 */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className={`${stage.textColor === 'text-white' ? 'bg-white/20' : 'bg-gray-900/10'} rounded-full p-2 backdrop-blur-sm`}>
                      <ArrowRight className={`w-5 h-5 smalltablet:w-6 smalltablet:h-6 ${stage.textColor}`} strokeWidth={2.5} />
                    </div>
                  </div>

                  <div className={`${index > 0 ? 'mt-[30px] pc:mt-[50px]' : ''} mb-3 smalltablet:mb-4 flex justify-center items-center transition-transform duration-300 group-hover:scale-110`}>
                    {stage.icon}
                  </div>
                  <h2 className="text-2xl smalltablet:text-3xl pc:text-4xl font-bold mb-3 transition-transform duration-300 group-hover:scale-105">
                    {stage.title}
                  </h2>

                  {stage.details ? (
                    <div className="flex flex-wrap justify-center gap-4 smalltablet:gap-6 pc:gap-8 text-base smalltablet:text-lg pc:text-xl">
                      {stage.details.map((detail, idx) => (
                        <div key={idx} className="text-center">
                          <p>{detail.text}</p>
                          <p className="text-sm smalltablet:text-base opacity-90">{detail.period}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-base smalltablet:text-lg pc:text-xl opacity-90">
                      {stage.subtitle}
                    </p>
                  )}

                  {/* 클릭 안내 텍스트 */}
                  <div className="mt-4 smalltablet:mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-xs smalltablet:text-sm font-medium opacity-80 flex items-center justify-center gap-2">
                      <span>클릭하여 자세히 보기</span>
                      <ArrowRight className="w-4 h-4" />
                    </p>
                  </div>
                </div>

              </Link>
            ))}
          </div>
      </div>
    </div>
  );
}

export default function DiscipleshipSystemPage() {
  return <DiscipleshipSystemPageContent />;
}
