"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import iconBlack from "@/public/icon_black.webp";
import iconWhite from "@/public/icon_white.webp";
import AuthButton from "@/components/widgets/AuthButton";
import { getNavbarTabs } from "@/lib/tabs";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // 로그인/회원가입 페이지인지 확인
  const isAuthPage = pathname === "/login" || pathname === "/signup";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 로그인/회원가입 페이지 또는 모바일 메뉴가 열렸을 때 항상 스크롤된 상태로 표시
  const shouldShowScrolled = isAuthPage || isScrolled || isMenuOpen;

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        shouldShowScrolled 
          ? "bg-white shadow-md" 
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-[1400px] mx-auto px-6">
        <div className="flex justify-between items-center h-[70px]">
          {/* 로고 */}
          <div className="shrink-0">
            <Link href="/" className="flex items-center gap-3 group">
              <Image
                src={shouldShowScrolled ? iconBlack : iconWhite}
                alt="제자들교회 로고"
                width={40}
                height={40}
                className="transition-opacity duration-300"
                placeholder="blur"
              />
              <div className={shouldShowScrolled ? "text-black" : "text-white"}>
                <div className="text-2xl font-bold tracking-wide">제자들교회</div>
                <div className="text-xs opacity-90">DISCIPLES CHURCH</div>
              </div>
            </Link>
          </div>

          {/* 데스크톱 네비게이션 */}
          <div className="hidden lg:flex items-center space-x-10">
            {getNavbarTabs().map((tab) => (
              <Link
                key={tab.href}
                href={tab.href}
                className={`${shouldShowScrolled ? "text-black/90 hover:text-black" : "text-white/90 hover:text-white"} font-medium transition-colors`}
              >
                {tab.label}
              </Link>
            ))}
            <AuthButton isScrolled={shouldShowScrolled} />
          </div>

          {/* 햄버거 메뉴 */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`${shouldShowScrolled ? "text-black" : "text-white"} p-2`}
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* 모바일 메뉴 */}
        {isMenuOpen && (
          <div className="lg:hidden pb-6 space-y-1">
            {getNavbarTabs().map((tab) => (
              <Link
                key={tab.href}
                href={tab.href}
                className={`block py-3 ${shouldShowScrolled ? "text-black/90 hover:text-black" : "text-white/90 hover:text-white"}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {tab.label}
              </Link>
            ))}
            <div className="mt-4 text-center">
              <AuthButton isScrolled={shouldShowScrolled} />
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

