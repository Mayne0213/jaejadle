import React from 'react';
import Image from 'next/image';
import missionMap from "@/public/subpages/mission/mission/missionMap.webp";
import missionMapKorea from "@/public/subpages/mission/mission/missionMapKorea.webp";

export default function MissionPage() {
  return (
    <div className="w-full bg-white">
      <div className="py-8 smalltablet:py-12 pc:py-16 px-4 smalltablet:px-6 pc:px-20">
        <div className="max-w-7xl mx-auto space-y-8 smalltablet:space-y-12">
          {/* 선교 지도 이미지 */}
          <div className='w-full h-full relative items-center justify-center flex'>
            <Image
              src={missionMap}
              alt='mission map'
              sizes='100vw'
              className='object-cover rounded-lg smalltablet:rounded-xl'
            />
          </div>

          {/* 선교 지도 이미지 */}
          <div className='w-full h-full relative items-center justify-center flex'>
            <Image
              src={missionMapKorea}
              alt='mission map'
              sizes='100vw'
              className='object-cover rounded-lg smalltablet:rounded-xl'
            />
          </div>
        </div>
      </div>
    </div>
  );
}
