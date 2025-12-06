import React from 'react';
import Image from 'next/image';
import missionMap from "@/public/subpages/mission/mission/missionMap.webp";
import missionMapKorea from "@/public/subpages/mission/mission/missionMapKorea.webp";

export default function MissionPage() {
  return (
    <div className="w-full bg-white">
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

          {/* 선교 지도 이미지 */}
          <div className='w-full h-full relative items-center justify-center flex'>
            <Image
              src={missionMapKorea}
              alt='mission map'
              sizes='100vw'
              className='object-cover rounded-lg sm:rounded-xl'
            />
          </div>
        </div>
      </div>
    </div>
  );
}
