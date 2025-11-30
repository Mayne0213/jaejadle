import React from 'react';
import { Sprout, Plus, TreePine, Globe, Users } from 'lucide-react';

export default function DiscipleshipSystemPage() {
  const stages = [
    {
      id: 'new-family',
      title: '새가족반 - 정착',
      subtitle: '5주 과정',
      bgColor: 'bg-[#4A9FD8]',
      textColor: 'text-white',
      icon: Sprout,
      arrowColor: '#4A9FD8',
    },
    {
      id: 'basic',
      title: '기초양육반 - 기본',
      subtitle: '12주 과정',
      bgColor: 'bg-white',
      textColor: 'text-[#4A9FD8]',
      icon: Plus,
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
      bgColor: 'bg-[#5FD4A0]',
      textColor: 'text-white',
      icon: TreePine,
      arrowColor: '#5FD4A0',
    },
    {
      id: 'evangelism',
      title: '전도훈련반 - 증인',
      subtitle: '6주 과정',
      bgColor: 'bg-white',
      textColor: 'text-[#F08B7C]',
      icon: Globe,
      arrowColor: '#FFFFFF',
    },
    {
      id: 'ministry',
      title: '사역훈련반 - 일꾼',
      subtitle: '12주 과정',
      bgColor: 'bg-[#E89A8C]',
      textColor: 'text-white',
      icon: Users,
      arrowColor: '#E89A8C',
    },
  ];

  return (
    <div className="bg-white w-full">
      <div className="pt-8">
          {/* 시스템 플로우 */}
          <div className="space-y-0">
            {stages.map((stage, index) => (
              <div key={stage.id} className={`relative`}>
                {/* 상단 화살표 (두 번째 섹션부터) */}
                {index > 0 && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center">
                    {/* 화살표 몸통 */}
                    <div className="w-8 h-2 sm:h-3 md:h-3" style={{ backgroundColor: stages[index - 1].arrowColor }}></div>

                    {/* 모바일 화살표 */}
                    <div
                      className="w-0 h-0 sm:hidden border-l-24 border-l-transparent border-r-24 border-r-transparent border-t-30"
                      style={{ borderTopColor: stages[index - 1].arrowColor }}
                    >
                    </div>
                    {/* 태블릿 화살표 */}
                    <div
                      className="w-0 h-0 hidden sm:block md:hidden border-l-24 border-l-transparent border-r-24 border-r-transparent border-t-30"
                      style={{ borderTopColor: stages[index - 1].arrowColor }}
                    >
                    </div>
                    {/* 중간 화면 화살표 */}
                    <div
                      className="w-0 h-0 hidden md:block lg:hidden border-l-32 border-l-transparent border-r-32 border-r-transparent border-t-40"
                      style={{ borderTopColor: stages[index - 1].arrowColor }}
                    >
                    </div>
                    {/* 데스크톱 화살표 */}
                    <div
                      className="w-0 h-0 hidden lg:block border-l-40 border-l-transparent border-r-40 border-r-transparent border-t-50"
                      style={{ borderTopColor: stages[index - 1].arrowColor }}
                    >
                    </div>
                  </div>
                )}

                {/* 단계 박스 */}
                <div className={`${stage.bgColor} ${stage.textColor} py-6 md:py-8 px-4 md:px-6 lg:px-8 text-center relative w-full`}>
                  <div className={`${index > 0 ? 'mt-[30px] lg:mt-[50px]' : ''} mb-3 md:mb-4`}>
                    <stage.icon className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 mx-auto" strokeWidth={1.5} />
                  </div>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3">
                    {stage.title}
                  </h2>

                  {stage.details ? (
                    <div className="flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-8 text-base md:text-lg lg:text-xl">
                      {stage.details.map((detail, idx) => (
                        <div key={idx} className="text-center">
                          <p>{detail.text}</p>
                          <p className="text-sm md:text-base opacity-90">{detail.period}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-base md:text-lg lg:text-xl opacity-90">
                      {stage.subtitle}
                    </p>
                  )}
                </div>

              </div>
            ))}
          </div>
      </div>
    </div>
  );
}

