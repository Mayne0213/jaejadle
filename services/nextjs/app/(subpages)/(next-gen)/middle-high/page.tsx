import React from 'react';

export default function MiddleHighPage() {
  return (
    <div className="min-h-screen bg-white w-full">
      <div className="py-12 px-4">
        <div className="max-w-5xl mx-auto">
          {/* 부서 소개 */}
          <div className="mb-16">
            <div className="bg-gray-50 rounded-lg p-8 md:p-12 shadow-sm border border-gray-200">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">중고등부</h2>
              <p className="text-lg text-gray-700 leading-relaxed text-center mb-4">
                중학생과 고등학생이 함께 예배하며 신앙의 정체성을 확립하는 곳입니다.
              </p>
              <p className="text-gray-700 leading-relaxed text-center">
                청소년기의 고민을 나누고, 말씀 안에서 하나님의 뜻을 발견합니다.
              </p>
            </div>
          </div>

          {/* 예배 시간 및 장소 */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">예배 안내</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200 text-center">
                <div className="text-4xl mb-4">⏰</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">예배 시간</h3>
                <p className="text-gray-600">주일 오후 2:00</p>
                <p className="text-gray-600 text-sm mt-2">금요 모임 오후 7:00</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200 text-center">
                <div className="text-4xl mb-4">📍</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">예배 장소</h3>
                <p className="text-gray-600">중고등부실 (별관 3층)</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200 text-center">
                <div className="text-4xl mb-4">🎓</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">대상</h3>
                <p className="text-gray-600">중1 ~ 고3</p>
              </div>
            </div>
          </div>

          {/* 부서 비전 */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">부서 비전</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  icon: '🎯',
                  title: '신앙의 정체성 확립',
                  description: '혼란한 세상 속에서 그리스도인으로서의 정체성을 확립합니다.',
                },
                {
                  icon: '💪',
                  title: '말씀 위에 굳게 서기',
                  description: '성경적 세계관을 가지고 세상을 바라보는 힘을 기릅니다.',
                },
                {
                  icon: '🤝',
                  title: '건강한 신앙 공동체',
                  description: '서로를 격려하고 함께 성장하는 공동체를 만듭니다.',
                },
                {
                  icon: '🌍',
                  title: '세상을 변화시키는 리더',
                  description: '학교와 사회에서 복음으로 영향력을 끼치는 리더로 자랍니다.',
                },
              ].map((item, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="text-4xl mb-3">{item.icon}</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 주간 프로그램 */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">주간 프로그램</h2>
            <div className="space-y-4">
              {[
                {
                  day: '주일',
                  time: '오후 2:00',
                  program: '주일 예배',
                  description: '찬양, 말씀, 기도로 하나님을 예배합니다',
                },
                {
                  day: '금요일',
                  time: '오후 7:00',
                  program: '금요 청소년 모임',
                  description: '찬양, 성경 공부, 간증 및 교제 시간',
                },
                {
                  day: '토요일',
                  time: '오전 7:00',
                  program: '새벽 기도회 (선택)',
                  description: '기도와 말씀으로 시작하는 하루',
                },
              ].map((item, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-lg border-l-4 border-gray-700">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="bg-gray-700 text-white px-4 py-2 rounded-lg font-bold min-w-20 text-center">
                        {item.day}
                      </div>
                      <div className="text-center text-gray-600 text-sm mt-1">{item.time}</div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{item.program}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 소그룹 활동 */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">소그룹 활동</h2>
            <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
              <p className="text-gray-700 mb-6 text-center">
                학년별, 주제별 소그룹으로 나뉘어 더 깊이 있는 교제와 성장을 경험합니다.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { group: '중등부', focus: '신앙의 기초', leader: '000 교사' },
                  { group: '고등부', focus: '신앙과 진로', leader: '000 교사' },
                  { group: '찬양팀', focus: '예배와 찬양', leader: '000 인도자' },
                ].map((item, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-6 text-center">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">{item.group}</h3>
                    <p className="text-gray-600 text-sm mb-1">중점: {item.focus}</p>
                    <p className="text-gray-600 text-sm">리더: {item.leader}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 특별 활동 */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">특별 활동</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  event: '겨울수련회',
                  period: '1월',
                  description: '집중적인 말씀 훈련과 영적 재충전의 시간',
                },
                {
                  event: '여름수련회',
                  period: '7~8월',
                  description: '말씀 캠프와 다양한 활동을 통한 신앙 성장',
                },
                {
                  event: '문화 탐방',
                  period: '분기별',
                  description: '문화와 신앙을 접목한 체험 활동',
                },
                {
                  event: '섬김의 날',
                  period: '월 1회',
                  description: '지역 사회를 섬기는 봉사 활동',
                },
                {
                  event: '성탄 페스티벌',
                  period: '12월',
                  description: '찬양과 연극으로 성탄의 기쁨을 나누는 축제',
                },
                {
                  event: '부활절 새벽예배',
                  period: '부활절',
                  description: '새벽을 깨우며 부활의 감격을 경험',
                },
              ].map((item, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
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

          {/* 교사진 및 안내 */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-gray-700">
              <h3 className="text-xl font-bold text-gray-800 mb-4">교역자 및 교사진</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-gray-700 mt-1">•</span>
                  <span>담당 전도사: 000 전도사</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-700 mt-1">•</span>
                  <span>중등부 교사: 6명</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-700 mt-1">•</span>
                  <span>고등부 교사: 6명</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-700 mt-1">•</span>
                  <span>찬양팀 인도자: 2명</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-gray-700">
              <h3 className="text-xl font-bold text-gray-800 mb-4">안내 사항</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-gray-700 mt-1">•</span>
                  <span>성경, 노트, 필기구 지참</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-700 mt-1">•</span>
                  <span>소그룹 참여 권장</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-700 mt-1">•</span>
                  <span>SNS: @jaejadle_youth</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-700 mt-1">•</span>
                  <span>문의: 중고등부실 (내선 103)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
