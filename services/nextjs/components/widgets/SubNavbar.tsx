"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { getTabInfo } from "@/lib/tabs";

const SubNavbar: React.FC = () => {
  const pathname = usePathname();

  // 한 번만 조회하고 메모이제이션
  const tabInfo = useMemo(() => getTabInfo(pathname), [pathname]);

  if (!tabInfo) return null;

  return (
    <div>
      {/* 이미지 안 (Navbar 제외) */}
      <div className="relative  w-full h-[200px] md:h-[300px] lg:h-[500px]">
        {/* 백그라운드 이미지 */}
        {tabInfo.image && (
          <Image
            src={tabInfo.image}
            alt="Banner Image"
            fill
            style={{ objectFit: "cover" }}
            // placeholder="blur"
          />
        )}

        {/* 검은색 오버레이 */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        {/* 이미지 한가운데 제목 */}
        <div className="font-bold flex items-center justify-center absolute inset-0 text-white text-4xl md:text-6xl lg:text-7xl">
          {tabInfo.title}
        </div>

        {/* 이미지 안쪽 중 가장 아래에 있는 탭 바 */}
        <div className="backdrop-blur-sm absolute bottom-0 left-0 right-0 items-center justify-center hidden md:flex">
          {tabInfo.tab.submenu.map((item, subIndex) => (
            <Link key={subIndex} href={item.href}>
              <div
                className={`px-10 lg:px-20 py-4 text-base lg:text-xl font-semibold transition-all duration-300
                  ${item.href === pathname ? "text-gray-700 bg-white" : "text-white hover:bg-gray-50 hover:bg-opacity-10 hover:text-gray-700"}`}
              >
                {item.label}
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* 이미지 밖 */}
      <div className="font-bold text-center px-4 md:px-8 lg:px-12 mt-6 md:mt-10 lg:mt-12">
        {/* 영어 제목 */}
        <div className="text-blue-500 text-sm md:text-base lg:text-lg">
          {tabInfo.subtitleEnglish}
        </div>
        {/* 한글 제목 */}
        <div className="text-4xl md:text-4xl lg:text-6xl">
          {tabInfo.subtitle}
        </div>
        {/* 설명 */}
        {tabInfo.description && (
          <div className="text-gray-600 text-base md:text-lg lg:text-xl font-normal mt-4 md:mt-6">
            {tabInfo.description}
          </div>
        )}
      </div>
    </div>
  );
};

export default SubNavbar;

