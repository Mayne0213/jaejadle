"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import iconBlack from "@/public/icon_black.webp";
import iconWhite from "@/public/icon_white.webp";
import AuthButton from "@/components/widgets/AuthButton";
import tabs from "@/const/tabs";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredTab, setHoveredTab] = useState<number | null>(null);
  const [expandedTabs, setExpandedTabs] = useState<Set<number>>(new Set());
  const pathname = usePathname();
  const router = useRouter();

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
  // hover는 CSS로만 처리 (데스크톱에서만 작동)
  const shouldShowScrolled = isAuthPage || isScrolled || isMenuOpen || hoveredTab !== null;

  // 모바일 메뉴에서 탭 확장/축소 토글
  const toggleTab = (index: number) => {
    setExpandedTabs((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  return (
    <header
      className={`group fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        shouldShowScrolled || isMenuOpen
          ? "bg-white shadow-md"
          : "bg-transparent pc:hover:bg-white pc:hover:shadow-md"
      }`}
    >
      <nav className="max-w-[1400px] mx-auto">
        <div className="flex justify-between items-center h-[56px] pc:h-[70px] relative z-10 px-6">
          {/* 로고 */}
          <div className="shrink-0">
            <Link href="/" className="flex items-center gap-3 group">
              {/* 아이콘 - 모바일은 작게, 데스크톱은 크게 */}
              <div className="relative w-8 h-8 pc:w-10 pc:h-10">
                {/* 흰색 아이콘 */}
                <Image
                  src={iconWhite}
                  alt="제자들교회 로고"
                  width={40}
                  height={40}
                  className={`absolute inset-0 w-full h-full transition-opacity duration-300 ${
                    shouldShowScrolled ? "opacity-0" : "opacity-100 pc:group-hover:opacity-0"
                  }`}
                  placeholder="blur"
                  priority
                />
                {/* 검은색 아이콘 */}
                <Image
                  src={iconBlack}
                  alt="제자들교회 로고"
                  width={40}
                  height={40}
                  className={`absolute inset-0 w-full h-full transition-opacity duration-300 ${
                    shouldShowScrolled ? "opacity-100" : "opacity-0 pc:group-hover:opacity-100"
                  }`}
                  placeholder="blur"
                  priority
                />
              </div>
              <div className={shouldShowScrolled || isMenuOpen ? "text-black pc:hover:text-black" : "text-white pc:group-hover:text-black"}>
                <div className="text-xl pc:text-2xl font-bold tracking-wide">제자들교회</div>
                {/* 데스크톱: 영어 이름 표시 */}
                <div className="hidden pc:block text-xs opacity-90">DISCIPLES CHURCH</div>
              </div>
            </Link>
          </div>

          {/* 데스크톱 네비게이션 */}
          <div className="hidden pc:flex items-center space-x-10">
            {tabs.map((tab, index) => (
              <div
                key={tab.label}
                className="relative"
                onMouseEnter={() => setHoveredTab(index)}
                onMouseLeave={() => setHoveredTab(null)}
              >
                <Link
                  href={tab.submenu[0]?.href || "#"}
                  className={`${shouldShowScrolled ? "text-black/90 hover:text-black" : "text-white/90 pc:group-hover:text-black/90"} font-medium transition-colors`}
                >
                  {tab.label}
                </Link>

                {/* 말풍선 스타일 드롭다운 */}
                {tab.submenu.length > 1 && (
                  <div
                    className={`absolute top-full left-1/2 -translate-x-1/2 pt-7 z-50 transition-all duration-300 ease-in-out ${
                      hoveredTab === index
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 -translate-y-2 pointer-events-none"
                    }`}
                  >
                    {/* 말풍선 꼬리 (위쪽 삼각형) */}
                    <div className="absolute top-7 left-1/2 -translate-x-1/2 w-0 h-0 border-l-14 border-l-transparent border-r-14 border-r-transparent border-b-14 border-b-gray-500"/>

                    {/* 말풍선 본체 */}
                    <div className="bg-gray-500 text-white rounded-3xl shadow-xl overflow-hidden min-w-[180px] mt-3.5">
                      {tab.submenu.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block px-6 py-3 hover:bg-white/10 transition-colors text-center border-b border-gray-600"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            <AuthButton isScrolled={shouldShowScrolled} />
          </div>

          {/* 햄버거 메뉴 */}
          <div className="pc:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`${shouldShowScrolled || isMenuOpen ? "text-black" : "text-white pc:group-hover:text-black"} p-2 transition-colors duration-300`}
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                  className="transition-all duration-300"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* 모바일 메뉴 */}
        {isMenuOpen && (
          <div className="pc:hidden fixed inset-0 z-30">
            {/* 배경 오버레이 */}
            <div
              className="absolute inset-0 transition-opacity duration-300"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* 모달 메뉴 */}
            <div className="absolute top-[56px] left-0 right-0 bg-white max-h-[calc(100vh-56px)] overflow-y-auto pt-4 px-6 pb-6 transition-all  z-30 animate-fade-in-fast">
              <div className="space-y-1">
                {tabs.map((tab, index) => {
                  const isExpanded = expandedTabs.has(index);
                  const firstSubmenuHref = tab.submenu[0]?.href || "#";

                  const handleMainTabClick = () => {
                    if (tab.submenu.length > 1) {
                      // 서브메뉴가 있는 경우 토글
                      toggleTab(index);
                    } else {
                      // 서브메뉴가 없는 경우 바로 이동
                      if (firstSubmenuHref !== "#") {
                        router.push(firstSubmenuHref);
                        setIsMenuOpen(false);
                      }
                    }
                  };

                  return (
                    <div key={tab.label} className="border-b border-gray-100 last:border-b-0">
                      {/* 메인 탭 */}
                      <div
                        className="w-full flex justify-between items-center font-semibold py-3 text-lg cursor-pointer"
                        onClick={handleMainTabClick}
                      >
                        <span className="flex-1 text-left py-2">
                          {tab.label}
                        </span>
                        {tab.submenu.length > 1 && (
                          <span className="ml-2 p-2">
                            <ChevronDown
                              className={`w-5 h-5 transition-transform duration-200 ${
                                isExpanded ? "rotate-180" : ""
                              }`}
                            />
                          </span>
                        )}
                      </div>
                      {/* 서브 탭들 */}
                      {isExpanded && (
                        <div className="ml-4 space-y-1 pb-2 animate-fade-in-fast">
                          {tab.submenu.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              className="block py-3 text-base text-gray-700 hover:bg-gray-50 rounded-lg px-3"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 text-center pb-6">
                <AuthButton isScrolled={true} />
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

