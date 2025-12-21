"use client";

import Image from "next/image";
import heroImage1 from "@/public/home/hero/image.webp";

export default function Hero() {
  const slide = {
    title: "WELCOME!",
    subtitle: "하나되는 제자들교회",
    description: "제자들교회 홈페이지에 방문하신 여러분을 환영합니다",
    image: heroImage1
  };

  return (
    <section className="relative h-screen overflow-hidden">
      {/* 배경 이미지 */}
      <Image
        src={slide.image}
        alt="Hero background"
        fill
        priority
        placeholder="blur"
        className="object-cover"
      />

      {/* 검은색 오버레이 */}
      <div className="absolute inset-0 bg-black opacity-30" />

      {/* 메인 컨텐츠 */}
      <div className="relative h-full flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 smalltablet:px-6 pc:px-8 w-full">
          <div className="flex flex-col items-center justify-center text-center space-y-6 smalltablet:space-y-8 pc:space-y-10">
            <div className="text-white space-y-6 smalltablet:space-y-8 pc:space-y-10 animate-fade-in">
              <div className="space-y-3 smalltablet:space-y-4 pc:space-y-5">
                <h1 className="text-3xl smalltablet:text-4xl pc:text-5xl font-black leading-tight tracking-tight">
                  {slide.title}<br />
                  {slide.subtitle}
                </h1>
                <div className="w-16 smalltablet:w-20 pc:w-24 h-1 bg-white mx-auto"></div>
              </div>
              <p className="text-base smalltablet:text-lg pc:text-xl leading-relaxed opacity-90 px-4 smalltablet:px-0">
                {slide.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* TOP 버튼 (우측 하단) */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 smalltablet:bottom-8 smalltablet:right-8 bg-white/90 hover:bg-white text-[#6b95c6] px-4 py-2 smalltablet:px-6 smalltablet:py-3 rounded-md text-sm smalltablet:text-base font-bold shadow-lg transition-all z-50 border border-[#6b95c6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6b95c6] active:scale-[0.98]"
      >
        TOP
      </button>
    </section>
  );
}

