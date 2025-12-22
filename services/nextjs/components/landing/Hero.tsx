"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import heroImage1 from "@/public/home/hero/image.webp";
import { ArrowUp } from "lucide-react";

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0); // 비디오로 시작
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const slide = {
    image: heroImage1
  };

  return (
    <section className="relative h-screen overflow-hidden">
      {/* 배경 슬라이드 */}
      <div className="absolute inset-0">
        {/* 비디오 배경 */}
        <div 
          className={`absolute inset-0 transition-opacity duration-1000 ${
            currentSlide === 0 ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <video
            ref={videoRef}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster="/home/hero/image2.webp"
            style={{ pointerEvents: 'none' }}
          >
            <source src="/home/hero/video1.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-linear-to-b from-slate-900/40 via-slate-900/60 to-slate-900/80" />
        </div>

        {/* 이미지 배경 */}
        <div 
          className={`absolute inset-0 transition-opacity duration-1000 ${
            currentSlide === 1 ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={slide.image}
            alt="Hero background"
            fill
            priority
            placeholder="blur"
            className="object-cover scale-105"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-linear-to-b from-slate-900/40 via-slate-900/60 to-slate-900/80" />
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="relative h-full flex flex-col">
        <div className="flex-1 flex items-center justify-center relative">
          <div className="max-w-7xl mx-auto px-4 smalltablet:px-6 pc:px-8 w-full">
            {/* Welcome Home 텍스트 */}
            <div className="flex flex-col items-center justify-center text-center space-y-4">
              <h1 
                className="text-6xl smalltablet:text-7xl pc:text-9xl font-bold tracking-wide text-white
                           animate-[fade-in-up_1s_ease-out,float_3s_ease-in-out_infinite_1s]"
                style={{
                  textShadow: '0 4px 20px rgba(0, 0, 0, 0.5), 0 0 40px rgba(255, 255, 255, 0.1)'
                }}
              >
                Welcome Home!
              </h1>
              <p 
                className="hidden smalltablet:block text-base smalltablet:text-lg pc:text-xl text-white/90 font-light tracking-wider
                           animate-[fade-in-up_1s_ease-out_0.3s_both,float_3s_ease-in-out_infinite_1.3s]"
              >
                제자들교회에 오신 것을 환영합니다.
              </p>
            </div>
          </div>
        </div>

        {/* 슬라이드 인디케이터 */}
        <div className="absolute bottom-20 smalltablet:bottom-24 left-1/2 -translate-x-1/2 flex gap-3 z-10">
          {[0, 1].map((index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                currentSlide === index
                  ? 'w-10 h-3 bg-white'
                  : 'w-3 h-3 bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`슬라이드 ${index + 1}로 이동`}
            />
          ))}
        </div>

        {/* 하단 메뉴 아이콘 그리드 */}
        {/* <div className="hidden smalltablet:block pb-8 smalltablet:pb-12 pc:pb-16">
          <div className="max-w-7xl mx-auto px-4 smalltablet:px-6 pc:px-8 w-full">
            <div className="grid grid-cols-3 smalltablet:grid pc:grid-cols-6 gap-4 smalltablet:gap-6 max-w-6xl mx-auto">
              {menuItems.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={index}
                    href={item.href}
                    className="group flex flex-col items-center justify-center p-6 smalltablet:p-8 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:border-white/40"
                  >
                    <div className="text-white mb-3 smalltablet:mb-4 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-12 h-12 smalltablet:w-14 smalltablet:h-14" strokeWidth={1.5} />
                    </div>
                    <span className="text-white text-sm smalltablet:text-base font-medium text-center">
                      {item.title}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div> */}
      </div>

      {/* TOP 버튼 - 현대적인 디자인 */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed cursor-pointer bottom-6 right-6 smalltablet:bottom-8 smalltablet:right-8 
                   bg-linear-to-br from-[#6b95c6] to-[#5a7fb0] hover:from-[#7aa5d6] hover:to-[#6b95c6]
                   text-white 
                   p-3 smalltablet:p-4 rounded-full
                   shadow-lg hover:shadow-2xl 
                   transition-all duration-300 
                   z-50 
                   border-2 border-white/20
                   hover:scale-110 hover:-translate-y-1
                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#6b95c6]
                   active:scale-95
                   group"
        aria-label="맨 위로 이동"
      >
        <ArrowUp className="w-5 h-5 smalltablet:w-6 smalltablet:h-6 group-hover:translate-y-[-2px] transition-transform" strokeWidth={2.5} />
      </button>
    </section>
  );
}
