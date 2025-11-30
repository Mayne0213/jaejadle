"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import heroImage1 from "@/public/image.webp";
import heroImage2 from "@/public/image2.webp";
import heroImage3 from "@/public/home/pray.webp";

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "예수님의 사랑으로",
      subtitle: "하나되는 제자들교회",
      description: "제자들교회 홈페이지에 방문하신 여러분을 환영합니다",
      image: heroImage1
    },
    {
      title: "말씀과 기도로",
      subtitle: "성장하는 교회",
      description: "주님의 말씀을 배우고 실천하며 함께 성장하는 공동체입니다",
      image: heroImage2
    },
    {
      title: "이웃을 섬기는",
      subtitle: "사랑의 공동체",
      description: "예수님의 사랑을 실천하며 이웃과 세상을 섬기는 교회입니다",
      image: heroImage3
    }
  ];

  // 3초마다 자동으로 슬라이드 전환
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="relative h-screen overflow-hidden">
      {/* 배경 이미지 - 모든 슬라이드 이미지를 미리 렌더링 */}
      {slides.map((slide, index) => (
        <Image
          key={index}
          src={slide.image}
          alt={`Hero background ${index + 1}`}
          fill
          priority
          placeholder="blur"
          className={`object-cover transition-opacity duration-1000 ${
            currentSlide === index ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
      {/* 검은색 오버레이 */}
      <div className="absolute inset-0 bg-black opacity-50"></div>
      
      {/* 배경 장식 */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 right-10 w-48 h-48 smalltablet:top-20 smalltablet:right-20 smalltablet:w-64 smalltablet:h-64 pc:w-80 pc:h-80 rounded-full bg-white/20 blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-48 h-48 smalltablet:bottom-20 smalltablet:left-20 smalltablet:w-64 smalltablet:h-64 pc:w-80 pc:h-80 rounded-full bg-white/10 blur-3xl"></div>
      </div>
      
      {/* 메인 컨텐츠 */}
      <div className="relative h-full flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 smalltablet:px-6 pc:px-8 w-full">
          <div className="flex flex-col items-center justify-center text-center space-y-6 smalltablet:space-y-8 pc:space-y-10">
            {/* 텍스트 */}
            <div key={currentSlide} className="text-white space-y-6 smalltablet:space-y-8 pc:space-y-10 animate-fadeIn">
              <div className="space-y-3 smalltablet:space-y-4 pc:space-y-5">
                <h1 className="text-3xl smalltablet:text-4xl pc:text-5xl font-black leading-tight tracking-tight">
                  {slides[currentSlide].title}<br />
                  {slides[currentSlide].subtitle}
                </h1>
                <div className="w-16 smalltablet:w-20 pc:w-24 h-1 bg-white mx-auto"></div>
              </div>
              <p className="text-base smalltablet:text-lg pc:text-xl leading-relaxed opacity-90 px-4 smalltablet:px-0">
                {slides[currentSlide].description}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* 슬라이드 인디케이터 */}
      <div className="absolute bottom-8 smalltablet:bottom-12 pc:bottom-16 left-1/2 transform -translate-x-1/2 flex gap-2 smalltablet:gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2.5 h-2.5 smalltablet:w-3 smalltablet:h-3 rounded-full transition-all ${
              currentSlide === index ? 'bg-white w-7 smalltablet:w-8' : 'bg-white/50'
            }`}
          />
        ))}
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

