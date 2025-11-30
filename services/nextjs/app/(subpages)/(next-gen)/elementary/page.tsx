import React from 'react';

export default function ElementaryPage() {
  return (
    <div className="min-h-screen bg-white w-full">
      <div className="py-12 px-4">
        <div className="max-w-5xl mx-auto">
          {/* 부서 소개 */}
          <div className="mb-16">
            <div className="bg-gray-50 rounded-lg p-8 md:p-12 shadow-sm border border-gray-200">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">유초등부</h2>
              <p className="text-lg text-gray-700 leading-relaxed text-center mb-4">
                초등학교 1학년부터 6학년까지의 어린이들이 함께 예배하는 곳입니다.
              </p>
              <p className="text-gray-700 leading-relaxed text-center">
                말씀 안에서 바르게 성장하며 하나님의 자녀로 훈련받습니다.
              </p>
            </div>
          </div>

          {/* 예배 시간 및 장소 */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">예배 안내</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 text-center">
                <div className="text-4xl mb-4">⏰</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">예배 시간</h3>
                <p className="text-gray-600">주일 오전 11:00</p>
                <p className="text-gray-600 text-sm mt-2">주일학교 오후 1:00</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 text-center">
                <div className="text-4xl mb-4">📍</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">예배 장소</h3>
                <p className="text-gray-600">유초등부실 (별관 2층)</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 text-center">
                <div className="text-4xl mb-4">🎒</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">대상 연령</h3>
                <p className="text-gray-600">초등 1~6학년</p>
              </div>
            </div>
          </div>

          {/* 교육 비전 */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">교육 비전</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: '📖',
                  title: '말씀으로 세워지는 아이',
                  description: '성경을 통해 하나님을 알아가는 아이',
                },
                {
                  icon: '🙏',
                  title: '기도하는 아이',
                  description: '기도의 능력을 경험하는 아이',
                },
                {
                  icon: '🌟',
                  title: '빛이 되는 아이',
                  description: '학교와 가정에서 빛이 되는 아이',
                },
              ].map((item, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="text-4xl mb-4 text-center">{item.icon}</div>
                  <h3 className="text-lg font-bold text-gray-800 mb-3 text-center">{item.title}</h3>
                  <p className="text-gray-600 text-center">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 학년별 반 편성 */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">학년별 반 편성</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { class: '저학년반', grade: '1~3학년', teacher: '000 교사', focus: '신앙의 기초 다지기' },
                { class: '고학년반', grade: '4~6학년', teacher: '000 교사', focus: '제자도 훈련' },
              ].map((item, index) => (
                <div key={index} className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">{item.class}</h3>
                  <div className="space-y-2 text-gray-700">
                    <p className="flex items-center gap-2">
                      <span className="font-semibold">학년:</span> {item.grade}
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="font-semibold">담당:</span> {item.teacher}
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="font-semibold">중점:</span> {item.focus}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 주요 프로그램 */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">주요 프로그램</h2>
            <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
              <div className="space-y-6">
                {[
                  {
                    program: '주일 예배',
                    time: '주일 오전 11:00',
                    content: '찬양, 말씀, 기도, 암송',
                  },
                  {
                    program: '주일학교',
                    time: '주일 오후 1:00',
                    content: '공과 공부, 성경 퀴즈, 팀 활동',
                  },
                  {
                    program: '금요 어린이 기도회',
                    time: '금요일 오후 5:00',
                    content: '찬양과 기도, 간증 나누기',
                  },
                  {
                    program: '성경암송대회',
                    time: '분기별 1회',
                    content: '성경 말씀 암송 경연',
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex-shrink-0 w-10 h-10 bg-gray-700 text-white rounded-full flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-lg font-bold text-gray-800">{item.program}</h3>
                        <span className="text-sm text-gray-700 font-semibold">{item.time}</span>
                      </div>
                      <p className="text-gray-600">{item.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 연간 행사 */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">연간 특별 행사</h2>
            <div className="grid md:grid-cols-4 gap-4">
              {[
                { month: '2월', event: '신학기 입학식' },
                { month: '5월', event: '어린이날 행사' },
                { month: '7월', event: '여름성경학교' },
                { month: '8월', event: '여름수련회' },
                { month: '10월', event: '추계 체육대회' },
                { month: '11월', event: '학예 발표회' },
                { month: '12월', event: '성탄절 찬양제' },
                { month: '1월', event: '겨울성경학교' },
              ].map((item, index) => (
                <div key={index} className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 text-center hover:shadow-md transition-shadow">
                  <div className="bg-gray-700 text-white px-3 py-1 rounded-full inline-block mb-2 font-bold">
                    {item.month}
                  </div>
                  <p className="text-gray-700 font-semibold">{item.event}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 교사진 및 문의 */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-gray-700">
              <h3 className="text-xl font-bold text-gray-800 mb-4">교사진</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-gray-700 mt-1">•</span>
                  <span>부장: 000 전도사</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-700 mt-1">•</span>
                  <span>저학년 교사: 5명</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-700 mt-1">•</span>
                  <span>고학년 교사: 5명</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-700 mt-1">•</span>
                  <span>보조교사: 8명</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-gray-700">
              <h3 className="text-xl font-bold text-gray-800 mb-4">안내 사항</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-gray-700 mt-1">•</span>
                  <span>성경과 필기도구를 지참해 주세요</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-700 mt-1">•</span>
                  <span>매주 암송 구절이 있습니다</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-700 mt-1">•</span>
                  <span>출석 스티커 제도 운영</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-700 mt-1">•</span>
                  <span>문의: 유초등부실 (내선 102)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
