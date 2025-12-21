"use client";

import Link from "next/link";
import Image from "next/image";
import heroImage1 from "@/public/home/hero/image.webp";
import { Church, BookOpen, GraduationCap, Users, Globe, FileText } from "lucide-react";
import tabs from "@/const/tabs";

export default function Hero() {
  // const youtubeVideoId = "gPl8OeTpKnA";
  
  const slide = {
    image: heroImage1
  };

  // Header 메뉴 항목을 한글로 번역하고 아이콘 매핑
  const menuItems = [
    {
      title: "교회 소개",
      icon: Church,
      href: tabs[0].href
    },
    {
      title: "예배 안내",
      icon: BookOpen,
      href: tabs[1].href
    },
    {
      title: "제자화 시스템",
      icon: GraduationCap,
      href: tabs[2].href
    },
    {
      title: "다음 세대",
      icon: Users,
      href: tabs[3].href
    },
    {
      title: "선교",
      icon: Globe,
      href: tabs[4].href
    },
    {
      title: "주보",
      icon: FileText,
      href: tabs[5].href
    }
  ];

  return (
    <section className="relative h-screen overflow-hidden">
      {/* <div className="absolute inset-0">
        <iframe
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[177.78vh] h-[56.25vw] min-w-full min-h-full"
          src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&loop=1&mute=1&controls=0&playsinline=1&playlist=${youtubeVideoId}&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3`}
          allow="autoplay; encrypted-media"
          allowFullScreen
          style={{ pointerEvents: 'none' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/30 via-slate-800/50 to-slate-900/70" />
      </div> */}

      <div className="absolute inset-0">
        <Image
          src={slide.image}
          alt="Hero background"
          fill
          priority
          placeholder="blur"
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/30 via-slate-800/50 to-slate-900/70" />
      </div>

      {/* 메인 컨텐츠 */}
      <div className="relative h-full flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-4 smalltablet:px-6 pc:px-8 w-full">
            {/* Welcome Home 텍스트 */}
            <div className="flex items-center justify-center text-center">
              <h1 className="text-7xl smalltablet:text-7xl pc:text-9xl font-bold tracking-wider text-white">
                Welcome Home!
              </h1>
            </div>
          </div>
        </div>

        {/* 하단 메뉴 아이콘 그리드 */}
        <div className="pb-8 smalltablet:pb-12 pc:pb-16">
          <div className="max-w-7xl mx-auto px-4 smalltablet:px-6 pc:px-8 w-full">
            <div className="grid grid-cols-3 hidden smalltablet:grid pc:grid-cols-6 gap-4 smalltablet:gap-6 max-w-6xl mx-auto">
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
        </div>
      </div>

      {/* TOP 버튼 (우측 하단) */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed cursor-pointer bottom-6 right-6 smalltablet:bottom-8 smalltablet:right-8 bg-white/90 hover:bg-white text-[#6b95c6] px-4 py-2 smalltablet:px-6 smalltablet:py-3 rounded-md text-sm smalltablet:text-base font-bold shadow-lg transition-all z-50 border border-[#6b95c6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6b95c6] active:scale-[0.98]"
      >
        TOP
      </button>
    </section>
  );
}

