import React from 'react';

export default function DisciplePage() {
  return (
    <div className="min-h-screen bg-white w-full">
      <div className="py-12 px-4">
        <div className="max-w-5xl mx-auto">
          {/* 과정 소개 */}
          <div className="mb-16">
            <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-8 md:p-12 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">제자훈련반</h2>
              <p className="text-lg text-gray-700 leading-relaxed text-center mb-4">
                그리스도의 참된 제자로 성장하는 심화 과정입니다.
              </p>
              <p className="text-gray-700 leading-relaxed text-center">
                말씀을 깊이 있게 연구하고, 삶으로 실천하는 훈련을 받습니다.
              </p>
            </div>
          </div>

          {/* 과정 정보 */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">과정 정보</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-md border-t-4 border-purple-500">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">📅</div>
                  <h3 className="text-xl font-bold text-gray-800">기간</h3>
                </div>
                <p className="text-gray-600 text-center">24주 과정</p>
                <p className="text-gray-600 text-center text-sm mt-2">매주 수요일 오후 7시</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md border-t-4 border-purple-500">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">📍</div>
                  <h3 className="text-xl font-bold text-gray-800">장소</h3>
                </div>
                <p className="text-gray-600 text-center">제자훈련실</p>
                <p className="text-gray-600 text-center text-sm mt-2">(본관 3층)</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md border-t-4 border-purple-500">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">👥</div>
                  <h3 className="text-xl font-bold text-gray-800">대상</h3>
                </div>
                <p className="text-gray-600 text-center">기초양육반 수료자</p>
                <p className="text-gray-600 text-center text-sm mt-2">담임목사 추천</p>
              </div>
            </div>
          </div>

          {/* 제자훈련의 특징 */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">제자훈련의 특징</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  icon: '📖',
                  title: '깊이 있는 말씀 연구',
                  description: '성경을 체계적으로 연구하며 해석학적 접근을 배웁니다.',
                },
                {
                  icon: '🙏',
                  title: '영적 훈련',
                  description: '기도, 금식, 묵상 등 영적 훈련을 실천합니다.',
                },
                {
                  icon: '👥',
                  title: '소그룹 나눔',
                  description: '소그룹으로 진행되어 깊이 있는 나눔과 책임이 있습니다.',
                },
                {
                  icon: '⚡',
                  title: '실천적 사역',
                  description: '배운 것을 즉시 실천하고 사역에 적용합니다.',
                },
              ].map((item, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold text-purple-700 mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 커리큘럼 */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">커리큘럼</h2>
            <div className="space-y-4">
              {[
                { phase: '1단계', weeks: '1-8주', title: '제자의 기초', content: '제자도의 의미, 예수님의 제자도, 영적 훈련의 기초' },
                { phase: '2단계', weeks: '9-16주', title: '제자의 성장', content: '말씀 연구 방법, 기도 생활의 심화, 성령 충만한 삶' },
                { phase: '3단계', weeks: '17-24주', title: '제자의 사역', content: '전도와 양육, 리더십 훈련, 평신도 사역자로 헌신' },
              ].map((item, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-lg border-l-4 border-purple-500">
                  <div className="flex items-center gap-4 mb-3">
                    <span className="bg-purple-500 text-white px-4 py-2 rounded-full font-bold">{item.phase}</span>
                    <span className="text-gray-600">({item.weeks})</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.content}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 준비 사항 및 신청 */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-purple-50 rounded-lg p-6 border-l-4 border-purple-500">
              <h3 className="text-xl font-bold text-purple-900 mb-4">준비 사항</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <span>6개월 이상의 헌신 각오</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <span>매주 과제 수행 (말씀 연구, 암송)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <span>출석률 80% 이상 유지</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <span>사역 실습 참여</span>
                </li>
              </ul>
            </div>

            <div className="bg-purple-50 rounded-lg p-6 border-l-4 border-purple-500">
              <h3 className="text-xl font-bold text-purple-900 mb-4">신청 안내</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <span>개강: 매년 3월, 9월</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <span>신청: 담임목사 면담 후 등록</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <span>교재비: 30,000원</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <span>수료증: 과정 이수 후 발급</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
