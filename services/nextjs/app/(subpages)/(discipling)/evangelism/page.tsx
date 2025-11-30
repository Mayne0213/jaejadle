import React from 'react';

export default function EvangelismPage() {
  return (
    <div className="min-h-screen bg-white w-full">
      <div className="py-12 px-4">
        <div className="max-w-5xl mx-auto">
          {/* 과정 소개 */}
          <div className="mb-16">
            <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg p-8 md:p-12 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">전도훈련반</h2>
              <p className="text-lg text-gray-700 leading-relaxed text-center mb-4">
                복음을 효과적으로 전하는 방법을 배우고 실천하는 과정입니다.
              </p>
              <p className="text-gray-700 leading-relaxed text-center">
                모든 그리스도인의 사명인 전도를 자신있게 실천할 수 있도록 훈련합니다.
              </p>
            </div>
          </div>

          {/* 과정 정보 */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">과정 정보</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-md border-t-4 border-orange-500">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">📅</div>
                  <h3 className="text-xl font-bold text-gray-800">기간</h3>
                </div>
                <p className="text-gray-600 text-center">16주 과정</p>
                <p className="text-gray-600 text-center text-sm mt-2">매주 토요일 오전 10시</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md border-t-4 border-orange-500">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">📍</div>
                  <h3 className="text-xl font-bold text-gray-800">장소</h3>
                </div>
                <p className="text-gray-600 text-center">전도훈련실</p>
                <p className="text-gray-600 text-center text-sm mt-2">(본관 4층)</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md border-t-4 border-orange-500">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">👥</div>
                  <h3 className="text-xl font-bold text-gray-800">대상</h3>
                </div>
                <p className="text-gray-600 text-center">모든 성도</p>
                <p className="text-gray-600 text-center text-sm mt-2">전도에 관심 있는 분</p>
              </div>
            </div>
          </div>

          {/* 훈련 내용 */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">훈련 내용</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: '복음의 핵심',
                  items: ['복음의 본질 이해', '구원의 확신', '복음 제시 방법'],
                },
                {
                  title: '전도 방법론',
                  items: ['관계 전도', '대화식 전도', '초청 전도'],
                },
                {
                  title: '실전 훈련',
                  items: ['전도 시연', '거리 전도 실습', '개인 전도 실습'],
                },
                {
                  title: '사후 관리',
                  items: ['새신자 양육', '후속 조치', '교회 정착 돕기'],
                },
              ].map((section, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold text-orange-700 mb-4">{section.title}</h3>
                  <ul className="space-y-2">
                    {section.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-600">
                        <span className="text-orange-500 mt-1">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* 주차별 커리큘럼 */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">주차별 커리큘럼</h2>
            <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
              <div className="space-y-6">
                {[
                  { weeks: '1-4주', title: '이론 교육', content: '전도의 성경적 기초, 복음의 핵심 메시지, 다양한 전도 방법론' },
                  { weeks: '5-8주', title: '실습 준비', content: '전도 시연, 역할극, 상황별 대처 방법 연습' },
                  { weeks: '9-12주', title: '현장 실습', content: '거리 전도, 병원 전도, 복지 시설 전도 실습' },
                  { weeks: '13-16주', title: '심화 및 정리', content: '개인별 전도 계획 수립, 지속 가능한 전도 생활 확립' },
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex-shrink-0 bg-orange-500 text-white px-4 py-2 rounded-lg font-bold min-w-24 text-center">
                      {item.weeks}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                      <p className="text-gray-600">{item.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 실습 프로그램 */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">실습 프로그램</h2>
            <div className="space-y-4">
              {[
                { title: '토요 거리 전도', time: '매주 토요일 오후 2시', location: '역 앞 광장' },
                { title: '1:1 전도 실습', time: '개별 일정 조율', location: '개인 관계망' },
                { title: '초청 전도 예배', time: '매월 셋째 주일', location: '본당' },
              ].map((program, index) => (
                <div key={index} className="flex items-center gap-4 p-6 bg-orange-50 rounded-lg">
                  <div className="flex-shrink-0 w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-xl">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800 text-lg">{program.title}</h3>
                    <p className="text-gray-600 text-sm">{program.time} | {program.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 신청 안내 */}
          <div className="bg-orange-50 rounded-lg p-8 border-l-4 border-orange-500">
            <h3 className="text-2xl font-bold text-orange-900 mb-4">신청 안내</h3>
            <p className="text-gray-700 mb-4">
              전도는 모든 그리스도인의 사명입니다. 두려움을 이기고 담대히 복음을 전하는 삶을 시작하세요!
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-orange-500 mt-1">•</span>
                <span>개강: 매년 4월, 10월</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-500 mt-1">•</span>
                <span>신청: 교육부 또는 홈페이지 신청</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-500 mt-1">•</span>
                <span>교재: 전도 매뉴얼 및 복음 책자 제공</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-500 mt-1">•</span>
                <span>수료 조건: 출석 80% 이상, 실습 3회 이상 참여</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
