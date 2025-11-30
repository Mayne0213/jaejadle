import React from 'react';

export default function MinistryPage() {
  return (
    <div className="min-h-screen bg-white w-full">
      <div className="py-12 px-4">
        <div className="max-w-5xl mx-auto">
          {/* 과정 소개 */}
          <div className="mb-16">
            <div className="bg-linear-to-r from-indigo-50 to-indigo-100 rounded-lg p-8 md:p-12 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">사역훈련반</h2>
              <p className="text-lg text-gray-700 leading-relaxed text-center mb-4">
                평신도 사역자로 헌신하고 섬기는 법을 배우는 과정입니다.
              </p>
              <p className="text-gray-700 leading-relaxed text-center">
                각자의 은사를 발견하고, 교회와 세상을 섬기는 사역자로 준비됩니다.
              </p>
            </div>
          </div>

          {/* 과정 정보 */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">과정 정보</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-md border-t-4 border-indigo-500">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">📅</div>
                  <h3 className="text-xl font-bold text-gray-800">기간</h3>
                </div>
                <p className="text-gray-600 text-center">20주 과정</p>
                <p className="text-gray-600 text-center text-sm mt-2">매주 금요일 오후 7시</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md border-t-4 border-indigo-500">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">📍</div>
                  <h3 className="text-xl font-bold text-gray-800">장소</h3>
                </div>
                <p className="text-gray-600 text-center">사역훈련실</p>
                <p className="text-gray-600 text-center text-sm mt-2">(본관 5층)</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md border-t-4 border-indigo-500">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">👥</div>
                  <h3 className="text-xl font-bold text-gray-800">대상</h3>
                </div>
                <p className="text-gray-600 text-center">제자훈련반 수료자</p>
                <p className="text-gray-600 text-center text-sm mt-2">사역 헌신자</p>
              </div>
            </div>
          </div>

          {/* 훈련 목표 */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">훈련 목표</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: '🎁', title: '은사 발견', description: '개인의 영적 은사를 발견하고 개발합니다' },
                { icon: '💪', title: '리더십 개발', description: '영적 리더십의 원리를 배웁니다' },
                { icon: '🤝', title: '팀 사역', description: '협력하여 사역하는 법을 익힙니다' },
                { icon: '⚡', title: '실전 사역', description: '실제 사역 현장에서 경험을 쌓습니다' },
              ].map((item, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow text-center">
                  <div className="text-4xl mb-3">{item.icon}</div>
                  <h3 className="font-bold text-indigo-700 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 사역 분야 */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">사역 분야</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  category: '예배 사역',
                  ministries: ['찬양 인도', '악기 연주', '성가대', '기술 봉사'],
                },
                {
                  category: '교육 사역',
                  ministries: ['주일학교 교사', '소그룹 리더', '새가족 양육', '제자훈련 리더'],
                },
                {
                  category: '선교 사역',
                  ministries: ['국내 선교', '해외 선교', '지역 복음화', '캠퍼스 선교'],
                },
                {
                  category: '섬김 사역',
                  ministries: ['구제 사역', '병원 심방', '노인 돌봄', '식당 봉사'],
                },
              ].map((field, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
                  <h3 className="text-xl font-bold text-indigo-700 mb-4">{field.category}</h3>
                  <ul className="space-y-2">
                    {field.ministries.map((ministry, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-gray-600">
                        <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                        <span>{ministry}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* 커리큘럼 */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">커리큘럼</h2>
            <div className="space-y-4">
              {[
                {
                  phase: '1부',
                  weeks: '1-5주',
                  title: '사역의 기초',
                  topics: ['사역자의 자세', '은사 발견 테스트', '소명과 헌신', '시간 관리'],
                },
                {
                  phase: '2부',
                  weeks: '6-10주',
                  title: '리더십 개발',
                  topics: ['성경적 리더십', '팀워크와 협력', '의사소통 기술', '갈등 해결'],
                },
                {
                  phase: '3부',
                  weeks: '11-15주',
                  title: '사역 실습',
                  topics: ['소그룹 인도', '성경 가르치기', '상담 기초', '사역 계획 수립'],
                },
                {
                  phase: '4부',
                  weeks: '16-20주',
                  title: '사역 배치',
                  topics: ['사역 현장 실습', '멘토링', '사역 평가', '지속 가능한 사역'],
                },
              ].map((section, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-lg border-l-4 border-indigo-500">
                  <div className="flex items-center gap-4 mb-3">
                    <span className="bg-indigo-500 text-white px-4 py-2 rounded-full font-bold">{section.phase}</span>
                    <span className="text-gray-600">({section.weeks})</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">{section.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {section.topics.map((topic, idx) => (
                      <span key={idx} className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 수료 후 과정 */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">수료 후 과정</h2>
            <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
              <div className="space-y-4">
                {[
                  { step: '1단계', title: '사역 배치', description: '개인의 은사와 적성에 맞는 사역에 배치됩니다' },
                  { step: '2단계', title: '멘토링', description: '경험 있는 사역자의 멘토링을 받습니다' },
                  { step: '3단계', title: '독립 사역', description: '독립적으로 사역을 감당합니다' },
                  { step: '4단계', title: '새 사역자 양성', description: '새로운 사역자를 양육하고 훈련합니다' },
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="shrink-0 w-16 h-16 bg-indigo-500 text-white rounded-full flex items-center justify-center font-bold">
                      {item.step}
                    </div>
                    <div className="flex-1 pt-2">
                      <h3 className="text-xl font-bold text-gray-800 mb-1">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 신청 안내 */}
          <div className="bg-indigo-50 rounded-lg p-8 border-l-4 border-indigo-500">
            <h3 className="text-2xl font-bold text-indigo-900 mb-4">신청 안내</h3>
            <p className="text-gray-700 mb-4">
              사역훈련반은 평신도 사역자로 헌신하고자 하는 분들을 위한 심화 과정입니다.
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-indigo-500 mt-1">•</span>
                <span>개강: 매년 3월, 9월</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-500 mt-1">•</span>
                <span>신청 자격: 제자훈련반 수료 + 담임목사 면담</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-500 mt-1">•</span>
                <span>교재비: 40,000원</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-500 mt-1">•</span>
                <span>수료 조건: 출석 90% 이상, 사역 실습 완료, 사역 계획서 제출</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-500 mt-1">•</span>
                <span>특전: 수료 후 교회 각 부서 사역자로 임명</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
