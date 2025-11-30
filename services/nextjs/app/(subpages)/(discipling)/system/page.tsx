import React from 'react';

export default function DiscipleshipSystemPage() {
  const stages = [
    {
      id: 'new-family',
      title: '새가족반',
      subtitle: '환영',
      period: '5주 과정',
    },
    {
      id: 'basic',
      title: '기초양육반',
      subtitle: '기본',
      period: '12주 과정',
    },
    {
      id: 'disciple',
      title: '제자훈련반',
      subtitle: '성숙',
      period: '매월 둘째·넷째 금요일 24회 | 매월 첫째·셋째 토요일 24회',
    },
    {
      id: 'evangelism',
      title: '전도훈련반',
      subtitle: '훈련',
      period: '6주 과정',
    },
    {
      id: 'ministry',
      title: '사역훈련반',
      subtitle: '발견',
      period: '15주 과정',
    },
  ];

  return (
    <div className="min-h-screen bg-white w-full">
      <div className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* 헤더 */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">제자화 시스템</h1>
            <p className="text-sm text-gray-500">DISCIPLESHIP SYSTEM</p>
          </div>

          {/* 시스템 플로우 */}
          <div className="space-y-6">
            {stages.map((stage, index) => (
              <div key={stage.id}>
                {/* 단계 박스 */}
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="p-8 text-center">
                    <div className="flex items-center justify-center gap-3 mb-3">
                      <span className="bg-gray-100 text-gray-700 px-4 py-1 rounded-full text-sm font-semibold">
                        {index + 1}단계
                      </span>
                      <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                        {stage.title}
                      </h2>
                      <span className="text-gray-500">-</span>
                      <span className="text-xl text-gray-600">{stage.subtitle}</span>
                    </div>
                    <p className="text-sm md:text-base text-gray-600 mt-2">
                      {stage.period}
                    </p>
                  </div>
                </div>

                {/* 화살표 */}
                {index < stages.length - 1 && (
                  <div className="flex justify-center py-3">
                    <svg className="w-8 h-8 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
