"use client";

import { useState } from "react";

export default function ServiceTimes() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const programs = [
    {
      number: "01",
      fraction: "/ 06",
      title: "정신건강검진 프로그램",
      description: "편하게 방문하시면 전문의와 상담을 통해 필요한 검사 프로그램을 안내해드립니다.",
      icon: (
        <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      bgColor: "bg-gradient-to-br from-[#7ba5d6] to-[#6b95c6]"
    },
    {
      number: "02",
      fraction: "/ 06",
      title: "성인/청소년 종합심리검사",
      description: "현재 겪고 있는 다양한 심리적 어려움과 그 원인을 다각하고 전문적인 도구를 사용하여 파악하고 이를 객관할 수 있는 검사입니다.",
      icon: (
        <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      bgColor: "bg-gradient-to-br from-[#a8c5e0] to-[#98b5d0]"
    }
  ];

  return (
    <section id="exam" className="py-16 smalltablet:py-20 pc:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 smalltablet:px-6 pc:px-8">
        <div className="grid pc:grid-cols-2 gap-8 smalltablet:gap-12 pc:gap-16 items-center">
          {/* 왼쪽 텍스트 */}
          <div>
            <h2 className="text-3xl smalltablet:text-4xl pc:text-5xl font-black text-gray-800 mb-6 smalltablet:mb-8 tracking-tight">
              검사 프로그램.
            </h2>
            <p className="text-gray-600 text-base smalltablet:text-lg leading-relaxed mb-8 smalltablet:mb-12">
              마음우산에서는 체계화된 시스템으로 정서상태, 성격, 스트레스,<br className="hidden pc:block" />
              인지능력, 집중력, 뇌기능상태를 종합적으로 평가하여 제공하는<br className="hidden pc:block" />
              프로그램을 운영합니다.
            </p>
            <button className="bg-gradient-to-r from-[#7ba5d6] to-[#6b95c6] hover:from-[#6b95c6] hover:to-[#5b85b6] text-white px-6 py-2.5 smalltablet:px-8 smalltablet:py-3 text-sm smalltablet:text-base flex items-center gap-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6b95c6] active:scale-[0.98] rounded-lg">
              VIEW MORE
              <svg className="w-4 h-4 smalltablet:w-5 smalltablet:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>

          {/* 오른쪽 슬라이더 */}
          <div className="relative">
            <div className="flex gap-6 overflow-hidden">
              {programs.map((program, index) => (
                <div
                  key={index}
                  className={`flex-shrink-0 w-full ${program.bgColor} rounded-2xl smalltablet:rounded-3xl p-8 smalltablet:p-10 pc:p-12 relative transition-all ${
                    currentSlide === index ? 'opacity-100' : 'opacity-0 absolute inset-0'
                  }`}
                >
                  <div className="flex flex-col h-full">
                    <div className="text-white opacity-70 mb-4 smalltablet:mb-6">
                      <svg className="w-16 h-16 smalltablet:w-20 smalltablet:h-20 pc:w-24 pc:h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {program.icon.props.children}
                      </svg>
                    </div>
                    <h3 className="text-2xl smalltablet:text-3xl font-bold text-white mb-4 smalltablet:mb-6">
                      {program.title}
                    </h3>
                    <p className="text-white/90 text-sm smalltablet:text-base leading-relaxed mb-6 smalltablet:mb-8 flex-grow">
                      {program.description}
                    </p>
                    <div className="flex items-end justify-between">
                      <div className="text-white/40 text-6xl smalltablet:text-7xl pc:text-8xl font-bold">
                        {program.number}
                      </div>
                      <div className="text-white text-base smalltablet:text-lg">
                        {program.fraction}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* 슬라이더 컨트롤 */}
            <div className="flex gap-3 smalltablet:gap-4 mt-6 smalltablet:mt-8">
              <button 
                onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
                className="text-gray-400 hover:text-gray-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6b95c6] active:scale-[0.98] rounded"
              >
                <svg className="w-8 h-8 smalltablet:w-10 smalltablet:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button 
                onClick={() => setCurrentSlide(Math.min(programs.length - 1, currentSlide + 1))}
                className="text-gray-400 hover:text-gray-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6b95c6] active:scale-[0.98] rounded"
              >
                <svg className="w-8 h-8 smalltablet:w-10 smalltablet:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

