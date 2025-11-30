import React from 'react';

export default function NewFamilyPage() {
  return (
    <div className="min-h-screen bg-white w-full">
      <div className="py-12 px-4">
        <div className="max-w-5xl mx-auto">
          {/* 과정 소개 */}
          <div className="mb-16">
            <div className="bg-linear-to-r from-green-50 to-green-100 rounded-lg p-8 md:p-12 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">새가족반</h2>
              <p className="text-lg text-gray-700 leading-relaxed text-center mb-4">
                처음 우리 교회를 방문하신 분들과 새롭게 등록하신 성도님들을 위한 과정입니다.
              </p>
              <p className="text-gray-700 leading-relaxed text-center">
                교회의 비전과 신앙의 기초를 배우며, 교회 공동체의 일원이 되는 과정입니다.
              </p>
            </div>
          </div>

          {/* 과정 정보 */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">과정 정보</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-md border-t-4 border-green-500">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">📅</div>
                  <h3 className="text-xl font-bold text-gray-800">기간</h3>
                </div>
                <p className="text-gray-600 text-center">4주 과정</p>
                <p className="text-gray-600 text-center text-sm mt-2">매주 주일 오후 1시</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md border-t-4 border-green-500">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">📍</div>
                  <h3 className="text-xl font-bold text-gray-800">장소</h3>
                </div>
                <p className="text-gray-600 text-center">새가족실</p>
                <p className="text-gray-600 text-center text-sm mt-2">(본관 2층)</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md border-t-4 border-green-500">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">👥</div>
                  <h3 className="text-xl font-bold text-gray-800">대상</h3>
                </div>
                <p className="text-gray-600 text-center">새가족</p>
                <p className="text-gray-600 text-center text-sm mt-2">교회 등록 3개월 이내</p>
              </div>
            </div>
          </div>

          {/* 커리큘럼 */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">커리큘럼</h2>
            <div className="space-y-4">
              {[
                { week: '1주', title: '환영합니다', content: '교회 소개 및 비전 나누기, 성도들과의 만남' },
                { week: '2주', title: '구원의 확신', content: '구원의 의미와 확신, 복음의 기본 진리' },
                { week: '3주', title: '교회생활', content: '예배, 기도, 헌금, 봉사 등 교회 생활 안내' },
                { week: '4주', title: '제자의 삶', content: '그리스도인의 정체성과 다음 단계 안내' },
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-4 p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="shrink-0 w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    {item.week}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 신청 안내 */}
          <div className="bg-green-50 rounded-lg p-8 border-l-4 border-green-500">
            <h3 className="text-2xl font-bold text-green-900 mb-4">신청 안내</h3>
            <p className="text-gray-700 mb-4">
              새가족반은 매달 첫째 주일에 시작됩니다. 언제든지 환영합니다!
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">•</span>
                <span>신청 방법: 주일 예배 후 안내 데스크에서 신청</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">•</span>
                <span>준비물: 성경, 필기도구</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">•</span>
                <span>문의: 교육부 (02-1234-5678)</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
