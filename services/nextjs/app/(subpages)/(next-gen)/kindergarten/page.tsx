import React from 'react';

export default function KindergartenPage() {
  return (
    <div className="min-h-screen bg-white w-full">
      <div className="py-12 px-4">
        <div className="max-w-5xl mx-auto">
          {/* 부서 소개 */}
          <div className="mb-16">
            <div className="bg-gray-50 rounded-lg p-8 md:p-12 shadow-sm border border-gray-200">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">유치부</h2>
              <p className="text-lg text-gray-700 leading-relaxed text-center mb-4">
                5세~7세 어린이들이 하나님의 사랑을 경험하는 곳입니다.
              </p>
              <p className="text-gray-700 leading-relaxed text-center">
                놀이와 활동을 통해 신앙의 씨앗을 심는 귀한 시간을 가집니다.
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
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 text-center">
                <div className="text-4xl mb-4">📍</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">예배 장소</h3>
                <p className="text-gray-600">유치부실 (별관 1층)</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 text-center">
                <div className="text-4xl mb-4">👶</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">대상 연령</h3>
                <p className="text-gray-600">5세 ~ 7세</p>
              </div>
            </div>
          </div>

          {/* 교육 목표 */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">교육 목표</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  icon: '❤️',
                  title: '하나님의 사랑 경험',
                  description: '하나님이 나를 사랑하신다는 것을 알고 경험합니다.',
                },
                {
                  icon: '📖',
                  title: '성경 이야기 배움',
                  description: '재미있는 성경 이야기를 통해 진리를 배웁니다.',
                },
                {
                  icon: '🎵',
                  title: '찬양과 기도',
                  description: '하나님을 찬양하고 기도하는 습관을 형성합니다.',
                },
                {
                  icon: '🤝',
                  title: '친구와 함께',
                  description: '친구들과 함께 나누고 배려하는 법을 배웁니다.',
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

          {/* 프로그램 */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">주요 프로그램</h2>
            <div className="space-y-4">
              {[
                { time: '11:00-11:10', activity: '찬양 시간', description: '율동과 함께하는 즐거운 찬양' },
                { time: '11:10-11:30', activity: '성경 공부', description: '재미있는 성경 이야기와 활동' },
                { time: '11:30-11:40', activity: '암송 및 기도', description: '성경 구절 암송과 기도 시간' },
                { time: '11:40-12:00', activity: '만들기/게임', description: '창의 활동과 친교 시간' },
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-4 p-6 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0 bg-gray-700 text-white px-4 py-2 rounded-lg font-bold min-w-32 text-center">
                    {item.time}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">{item.activity}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 특별 활동 */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">특별 활동</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: '여름성경학교', period: '매년 7월' },
                { title: '가을소풍', period: '매년 10월' },
                { title: '크리스마스 발표회', period: '매년 12월' },
              ].map((event, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow text-center">
                  <div className="text-4xl mb-3">🎉</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{event.title}</h3>
                  <p className="text-gray-600">{event.period}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 교사진 및 안내 */}
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
                  <span>교사: 10명 (유아교육 전문)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-700 mt-1">•</span>
                  <span>보조교사: 5명</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-gray-700">
              <h3 className="text-xl font-bold text-gray-800 mb-4">부모님께</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-gray-700 mt-1">•</span>
                  <span>예배 10분 전 입실 부탁드립니다</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-700 mt-1">•</span>
                  <span>간식 및 활동 재료 제공</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-700 mt-1">•</span>
                  <span>문의: 유치부실 (내선 101)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
