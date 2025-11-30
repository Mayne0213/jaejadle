import React from 'react';

export default function BasicPage() {
  return (
    <div className="min-h-screen bg-white w-full">
      <div className="py-12 px-4">
        <div className="max-w-5xl mx-auto">
          {/* 과정 소개 */}
          <div className="mb-16">
            <div className="bg-linear-to-r from-blue-50 to-blue-100 rounded-lg p-8 md:p-12 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">기초양육반</h2>
              <p className="text-lg text-gray-700 leading-relaxed text-center mb-4">
                신앙의 기초를 단단히 세우는 과정입니다.
              </p>
              <p className="text-gray-700 leading-relaxed text-center">
                성경의 핵심 진리를 배우고, 그리스도인의 기본 덕목을 익힙니다.
              </p>
            </div>
          </div>

          {/* 과정 정보 */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">과정 정보</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-md border-t-4 border-blue-500">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">📅</div>
                  <h3 className="text-xl font-bold text-gray-800">기간</h3>
                </div>
                <p className="text-gray-600 text-center">12주 과정</p>
                <p className="text-gray-600 text-center text-sm mt-2">매주 주일 오후 2시</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md border-t-4 border-blue-500">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">📍</div>
                  <h3 className="text-xl font-bold text-gray-800">장소</h3>
                </div>
                <p className="text-gray-600 text-center">교육관 201호</p>
                <p className="text-gray-600 text-center text-sm mt-2">(본관 2층)</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md border-t-4 border-blue-500">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">👥</div>
                  <h3 className="text-xl font-bold text-gray-800">대상</h3>
                </div>
                <p className="text-gray-600 text-center">새가족반 수료자</p>
                <p className="text-gray-600 text-center text-sm mt-2">또는 신앙 성장 희망자</p>
              </div>
            </div>
          </div>

          {/* 학습 목표 */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">학습 목표</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: '성경 이해', description: '성경의 구조와 핵심 메시지를 이해합니다' },
                { title: '기도 생활', description: '효과적인 기도 방법을 배우고 실천합니다' },
                { title: '예배의 의미', description: '참된 예배자로 성장합니다' },
                { title: '성령의 인도', description: '성령의 역사하심을 경험합니다' },
              ].map((item, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold text-blue-700 mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 커리큘럼 개요 */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">커리큘럼 개요</h2>
            <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
              <div className="space-y-6">
                {[
                  { section: '1-3주', title: '하나님을 아는 지식', topics: ['하나님의 속성', '삼위일체', '창조와 섭리'] },
                  { section: '4-6주', title: '구원의 확신', topics: ['죄와 심판', '예수 그리스도', '구원의 길'] },
                  { section: '7-9주', title: '성령과 교회', topics: ['성령의 역사', '교회의 본질', '성도의 교제'] },
                  { section: '10-12주', title: '제자의 삶', topics: ['말씀과 기도', '헌신과 봉사', '전도와 선교'] },
                ].map((item, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-6">
                    <div className="flex items-center gap-4 mb-2">
                      <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold">{item.section}</span>
                      <h3 className="text-xl font-bold text-gray-800">{item.title}</h3>
                    </div>
                    <ul className="space-y-1 text-gray-600">
                      {item.topics.map((topic, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="text-blue-400">•</span>
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 신청 안내 */}
          <div className="bg-blue-50 rounded-lg p-8 border-l-4 border-blue-500">
            <h3 className="text-2xl font-bold text-blue-900 mb-4">신청 안내</h3>
            <p className="text-gray-700 mb-4">
              기초양육반은 분기별로 개강합니다. (3월, 6월, 9월, 12월)
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>신청 방법: 교회 홈페이지 또는 교육부 문의</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>교재: 교회 자체 교재 제공 (무료)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>과제: 매주 성경 읽기 및 묵상 일지 작성</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
