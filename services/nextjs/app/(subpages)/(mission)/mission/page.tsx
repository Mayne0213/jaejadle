import React from 'react';
import Image from 'next/image';
import missionMap from "@/public/subpages/mission/mission/missionMap.webp";
import missionChart from '@/public/subpages/mission/mission/missionChart.webp';

export default function MissionPage() {
  return (
    <div className="w-full  bg-white">
      <div className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-20">
        <div className="max-w-7xl mx-auto space-y-8 md:space-y-12">
          {/* 선교 지도 이미지 */}
          <div className='w-full h-full relative items-center justify-center flex'>
            <Image
              src={missionMap}
              alt='mission map'
              sizes='100vw'
              className='object-cover rounded-lg sm:rounded-xl'
            />
          </div>

          {/* 선교 설명 */}
          <div className='w-full text-center whitespace-pre-line text-sm sm:text-base md:text-lg lg:text-xl px-2 sm:px-4'>
            <span className="font-bold">선교</span>{`란 하나님의 궁극적인 목적을 성취하는
            "땅의 모든 끝이 여호와를 기억하고 돌아오며 열방의 모든 족속이 주의 앞에 경배"(시22:27)
            하도록 온 천하에 다니며 복음을 전파(마16:16)하는 직.간접적인 모든 사역입니다.

            예수님의 전도 명령과 사랑의 명령에 순종함으로써 민족을 치유하고 세상을 변화시키는
            은평교회의 비전을 토대로 교회의 모든 성도들이 선교사적인 삶을 살아가는 평신도 선교사로
            사명을 감당할 수 있도록 하며, 열방을 가슴에 품는 선교, 그리스도께서 이 땅의 모든 교회들에게 하신
            말씀(행1:8)을 기억하며 실천합니다.`}
          </div>

          {/* 선교 지원 제목 */}
          <div className="text-center">
            <h2 className='font-bold text-2xl sm:text-3xl md:text-4xl'>
              2021년 해외ㆍ국내 선교 지원
            </h2>
          </div>

          {/* 선교 차트 */}
          <div className='w-full relative'>
            <Image
              src={missionChart}
              alt='mission chart'
              className='w-full'
            />
          </div>
        </div>
      </div>
    </div>
  );
}
