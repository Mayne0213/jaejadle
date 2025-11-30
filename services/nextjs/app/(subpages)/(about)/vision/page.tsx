import React from 'react';
import Image from 'next/image';
import { Target, BookOpen, HandHeart, Sprout } from 'lucide-react';

const SAHUN_DATA = [
  {
    number: 1,
    title: '말씀안에',
    englishTitle: 'In the Word',
    description: '하나님의 말씀을 삶의 중심에 두고\n성경적 가치관으로 살아가는\n믿음의 공동체',
    Icon: BookOpen,
  },
  {
    number: 2,
    title: '서로사랑',
    englishTitle: 'Love One Another',
    description: '그리스도의 사랑으로 서로를 섬기고\n하나됨을 이루어가는\n사랑의 공동체',
    Icon: HandHeart,
  },
  {
    number: 3,
    title: '많은열배',
    englishTitle: 'Abundant Fruit',
    description: '복음의 능력으로 영혼을 구원하고\n생명의 열매를 풍성히 맺는\n선교의 공동체',
    Icon: Sprout,
  },
];

const CHURCH_SINJO_LEFT = [
  {
    number: '01',
    title: '말씀으로 살아가는 제자들교회',
    englishTitle: 'Living by the Word',
    subtitle: '하나님의 말씀으로',
    Icon: BookOpen,
    color: '#a9c6e1',
  },
  {
    number: '03',
    title: '복음전도와 선교를 위해 존재하는 제자들교회',
    englishTitle: 'For Evangelism and Mission',
    subtitle: '복음의 능력으로',
    Icon: Target,
    color: '#6d96c5',
  },
];

const CHURCH_SINJO_RIGHT = [
  {
    number: '02',
    title: '서로사랑하는 제자들교회',
    englishTitle: 'Loving One Another',
    subtitle: '그리스도의 사랑으로',
    Icon: HandHeart,
    color: '#94b7d6',
  },
  {
    number: '04',
    title: '복음으로 변화되는 제자들교회',
    englishTitle: 'Transformed by Gospel',
    subtitle: '생명의 능력으로',
    Icon: Sprout,
    color: '#88aad2',
  },
];

export default function VisionPage() {
  return (
    <div className="min-h-screen bg-white w-full">
      <div className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* 사훈 섹션 */}
          <div className="mb-12 sm:mb-16 md:mb-20">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4 md:gap-8">
              {SAHUN_DATA.map((item, index, array) => (
                <div key={index} className="relative">
                  <div className={`h-full flex flex-col items-center ${
                    index < array.length - 1 ? 'sm:border-r-2 border-gray-200' : ''
                  }`}>
                    <div className="relative w-32 h-32 sm:w-28 sm:h-28 md:w-40 md:h-40 mb-4 sm:mb-4 md:mb-6">
                      <div className="w-full h-full bg-gray-100 rounded-full flex items-center justify-center text-gray-700">
                        <item.Icon className="w-16 h-16 sm:w-14 sm:h-14 md:w-20 md:h-20" strokeWidth={1} />
                      </div>
                      <div className="absolute -top-2 -left-2 w-10 h-10 sm:w-9 sm:h-9 md:w-12 md:h-12 bg-[#94b7d6] rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-base md:text-xl shadow-lg">
                        {item.number}
                      </div>
                    </div>
                    <h3 className="text-xl sm:text-lg md:text-2xl font-bold text-gray-900 mb-1 text-center px-2">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-[10px] md:text-sm text-gray-400 mb-2 sm:mb-3 md:mb-4 text-center uppercase tracking-wide">
                      {item.englishTitle}
                    </p>
                    <p className="text-sm sm:text-xs md:text-base text-gray-600 text-center whitespace-pre-line leading-relaxed px-4 sm:px-2 md:px-4">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 교회 사명 섹션 */}
          <div className="mb-12 sm:mb-16 md:mb-20">
            <div className="text-center mb-8 sm:mb-10 md:mb-12">
              <div className="w-12 sm:w-14 md:w-16 h-1 bg-[#6d96c5] mx-auto mb-3 sm:mb-4"></div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">교회 사명</h2>
            </div>
            <div className="relative">
              {/* 중앙 다이아몬드 */}
              <div className="hidden lg:flex absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 xl:w-48 xl:h-48 bg-gradient-to-br from-[#6d96c5] to-[#94b7d6] rotate-45 items-center justify-center z-10 rounded-2xl xl:rounded-3xl shadow-2xl">
                <div className="-rotate-45 text-white text-center">
                  <div className="text-4xl xl:text-5xl font-black">FAITH</div>
                </div>
              </div>

              {/* 항목들 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {/* 왼쪽 항목들 */}
                <div className="space-y-4 sm:space-y-6">
                  {CHURCH_SINJO_LEFT.map((item, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:shadow-lg transition-all duration-300 flex items-center gap-3 sm:gap-4">
                      <div className="flex-shrink-0" style={{ color: item.color }}>
                        <item.Icon className="w-10 h-10 sm:w-12 sm:h-12" strokeWidth={1.5} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs sm:text-sm text-gray-400 font-semibold mb-1">{item.number}</div>
                        <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1 break-words">
                          {item.title}
                        </h3>
                        {item.subtitle && (
                          <p className="text-xs sm:text-sm text-gray-500">{item.subtitle}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* 오른쪽 항목들 */}
                <div className="space-y-4 sm:space-y-6">
                  {CHURCH_SINJO_RIGHT.map((item, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:shadow-lg transition-all duration-300 flex items-center gap-3 sm:gap-4 md:flex-row-reverse">
                      <div className="flex-shrink-0" style={{ color: item.color }}>
                        <item.Icon className="w-10 h-10 sm:w-12 sm:h-12" strokeWidth={1.5} />
                      </div>
                      <div className="flex-1 md:text-right min-w-0">
                        <div className="text-xs sm:text-sm text-gray-400 font-semibold mb-1">{item.number}</div>
                        <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1 break-words">
                          {item.title}
                        </h3>
                        {item.subtitle && (
                          <p className="text-xs sm:text-sm text-gray-500">{item.subtitle}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 교회 심볼 소개 섹션 */}
          <div>
            <div className="text-center mb-8 sm:mb-10 md:mb-12">
              <div className="w-12 sm:w-14 md:w-16 h-1 bg-[#6d96c5] mx-auto mb-3 sm:mb-4"/>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">교회 심볼</h2>
            </div>
            <div className="bg-[#a9c6e1] rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12">
              <div className="max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
                  {/* 로고 이미지 */}
                  <div className="flex-shrink-0 mx-auto lg:mx-0">
                    <div className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-white rounded-xl sm:rounded-2xl shadow-xl flex items-center justify-center p-8 sm:p-10 lg:p-12">
                      <Image
                        src="/icon_black.webp"
                        alt="제자들교회 심볼"
                        width={320}
                        height={320}
                        className="object-contain w-full h-full"
                      />
                    </div>
                  </div>

                  {/* 설명 */}
                  <div className="flex-1 flex flex-col gap-3 sm:gap-4">
                    <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-md flex-1 flex items-center gap-3 sm:gap-4">
                      <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
                        <span className="font-semibold text-[#6d96c5]">나무</span>는
                        생명의 근원이신 하나님을 상징하며, 교회가 하나님 안에서 든든히 뿌리내리고 있음을 나타냅니다.
                      </p>
                    </div>
                    <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-md flex-1 flex items-center gap-3 sm:gap-4">
                      <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
                        <span className="font-semibold text-[#88aad2]">하트 모양의 잎</span>은
                        하나님의 사랑과 성도 간의 사랑을 의미하며, 사랑으로 하나되는 공동체를 표현합니다.
                      </p>
                    </div>
                    <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-md flex-1 flex items-center gap-3 sm:gap-4">
                      <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
                        <span className="font-semibold text-[#94b7d6]">사람 모양</span>은
                        예수님을 따르는 제자들을 나타내며, 함께 성장하고 열매 맺는 교회를 상징합니다.
                      </p>
                    </div>
                    <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-md flex-1 flex items-center gap-3 sm:gap-4">
                      <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
                        <span className="font-semibold text-[#a9c6e1]">블루 컬러</span>는
                        하늘과 바다를 연상시키며, 넓고 깊은 하나님의 은혜와 평안을 의미합니다.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
