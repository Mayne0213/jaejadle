import React from 'react';

export default function YoungAdultsPage() {
  return (
    <div className="min-h-screen bg-white w-full">
      <div className="py-12 px-4">
        <div className="max-w-5xl mx-auto">
          {/* 부서 소개 */}
          <div className="mb-16">
            <div className="bg-gray-50 rounded-lg p-8 smalltablet:p-12 shadow-sm border border-gray-200">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">청년부</h2>
              <p className="text-lg text-gray-700 leading-relaxed text-center mb-4">
                대학생과 직장인 청년들이 함께 예배하고 교제하는 공동체입니다.
              </p>
              <p className="text-gray-700 leading-relaxed text-center">
                신앙과 삶의 균형을 찾고, 다음 세대를 이끌어갈 리더로 성장합니다.
              </p>
            </div>
          </div>

          {/* 예배 시간 및 장소 */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">예배 안내</h2>
            <div className="grid smalltablet:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200 text-center">
                <div className="text-4xl mb-4">⏰</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">예배 시간</h3>
                <p className="text-gray-600">주일 오후 2:00</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200 text-center">
                <div className="text-4xl mb-4">📍</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">예배 장소</h3>
                <p className="text-gray-600">청년부실 (본관 4층)</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200 text-center">
                <div className="text-4xl mb-4">👥</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">대상</h3>
                <p className="text-gray-600">대학생 ~ 30대</p>
              </div>
            </div>
          </div>

          {/* 부서 비전 */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">청년부 비전</h2>
            <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
              <div className="text-center mb-8">
                <p className="text-2xl font-bold text-gray-800 mb-4">&quot;다음 세대를 세우는 청년 공동체&quot;</p>
                <p className="text-gray-600">
                  말씀과 기도로 무장하고, 세상 속에서 그리스도의 향기를 발하는 청년들
                </p>
              </div>
              <div className="grid smalltablet:grid-cols-2 gap-6">
                {[
                  {
                    icon: '📖',
                    title: '말씀 중심',
                    description: '성경적 가치관으로 삶의 방향을 설정합니다',
                  },
                  {
                    icon: '🙏',
                    title: '기도의 능력',
                    description: '기도로 하나님의 뜻을 구하고 능력을 경험합니다',
                  },
                  {
                    icon: '🤝',
                    title: '진정한 교제',
                    description: '서로의 삶을 나누고 격려하는 공동체를 만듭니다',
                  },
                  {
                    icon: '🌟',
                    title: '세상의 빛',
                    description: '각자의 삶의 현장에서 복음의 증인으로 살아갑니다',
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="text-3xl">{item.icon}</div>
                    <div>
                      <h3 className="font-bold text-gray-800 mb-1">{item.title}</h3>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 주간 프로그램 */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">주간 프로그램</h2>
            <div className="space-y-4">
              {[
                {
                  program: '주일 예배',
                  time: '주일 오후 2:00',
                  description: '청년들이 함께 드리는 예배. 찬양, 말씀, 기도, 교제',
                },
                {
                  program: '수요 성경공부',
                  time: '수요일 오후 7:30',
                  description: '성경을 깊이 있게 공부하고 삶에 적용하는 시간',
                },
                {
                  program: '금요 기도회',
                  time: '금요일 오후 8:00',
                  description: '중보기도와 영적 재충전의 시간',
                },
                {
                  program: '토요 새벽기도',
                  time: '토요일 오전 6:00',
                  description: '새벽을 깨우며 하나님을 만나는 시간 (선택)',
                },
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-4 p-6 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="shrink-0 w-12 h-12 bg-gray-700 text-white rounded-full flex items-center justify-center font-bold text-xl">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-gray-800">{item.program}</h3>
                      <span className="text-gray-700 font-semibold text-sm">{item.time}</span>
                    </div>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 소그룹 */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">소그룹 모임</h2>
            <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200 mb-6">
              <p className="text-gray-700 mb-6 text-center">
                청년부는 소그룹 중심으로 운영됩니다. 각 소그룹은 6~8명으로 구성되어<br />
                더 깊은 교제와 성경 공부, 기도로 함께 성장합니다.
              </p>
              <div className="grid smalltablet:grid-cols-3 gap-6">
                {[
                  { name: '대학생 그룹', focus: '캠퍼스 선교' },
                  { name: '직장인 그룹', focus: '직장 사역' },
                  { name: '청년 리더 그룹', focus: '리더십 개발' },
                ].map((group, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-6 text-center">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">{group.name}</h3>
                    <p className="text-gray-600 text-sm">중점: {group.focus}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <p className="text-gray-700">
                <span className="font-bold">소그룹 모임 시간:</span> 주중 각 그룹별 자율 조정
              </p>
            </div>
          </div>

          {/* 특별 활동 */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">특별 활동</h2>
            <div className="grid smalltablet:grid-cols-2 gap-6">
              {[
                {
                  event: '겨울 수련회',
                  period: '1~2월',
                  description: '말씀 훈련과 비전 세미나, 영적 재충전',
                },
                {
                  event: '부활절 새벽 연합예배',
                  period: '부활절',
                  description: '타 교회 청년들과 함께 드리는 연합 예배',
                },
                {
                  event: '청년 선교 여행',
                  period: '여름',
                  description: '국내외 단기 선교와 봉사 활동',
                },
                {
                  event: '가을 수련회',
                  period: '9~10월',
                  description: '말씀과 찬양, 힐링과 회복의 시간',
                },
                {
                  event: '청년 컨퍼런스',
                  period: '분기별',
                  description: '청년 사역자 초청 특별 집회',
                },
                {
                  event: '섬김의 주말',
                  period: '월 1회',
                  description: '지역 사회 봉사 및 전도 활동',
                },
              ].map((item, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-md border-l-4 border-gray-700 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="bg-gray-700 text-white px-3 py-1 rounded-full text-sm font-bold">
                      {item.period}
                    </span>
                    <h3 className="text-xl font-bold text-gray-800">{item.event}</h3>
                  </div>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 섬김의 기회 */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">섬김의 기회</h2>
            <div className="grid smalltablet:grid-cols-4 gap-4">
              {[
                { ministry: '찬양팀', icon: '🎵' },
                { ministry: '기술팀', icon: '🎥' },
                { ministry: '새가족팀', icon: '🤝' },
                { ministry: '기도팀', icon: '🙏' },
                { ministry: '소그룹 리더', icon: '👥' },
                { ministry: '예배팀', icon: '⛪' },
                { ministry: '홍보팀', icon: '📱' },
                { ministry: '봉사팀', icon: '💪' },
              ].map((item, index) => (
                <div key={index} className="bg-white rounded-lg p-4 shadow-md text-center hover:shadow-lg transition-shadow">
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <p className="font-semibold text-gray-800">{item.ministry}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 연락 및 SNS */}
          <div className="grid smalltablet:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-gray-700">
              <h3 className="text-xl font-bold text-gray-800 mb-4">청년부 리더십</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-gray-700 mt-1">•</span>
                  <span>담당 전도사: 000 전도사</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-700 mt-1">•</span>
                  <span>청년부 회장: 000</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-700 mt-1">•</span>
                  <span>찬양팀장: 000</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-700 mt-1">•</span>
                  <span>소그룹 리더: 10명</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-gray-700">
              <h3 className="text-xl font-bold text-gray-800 mb-4">연락처 및 SNS</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-gray-700 mt-1">•</span>
                  <span>청년부실: 내선 104</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-700 mt-1">•</span>
                  <span>카카오톡: 제자들 청년부</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-700 mt-1">•</span>
                  <span>Instagram: @jaejadle_young</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-700 mt-1">•</span>
                  <span>이메일: young@jaejadle.org</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
