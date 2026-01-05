import { Metadata } from 'next';
import React from 'react';
import Image from 'next/image';
import missionMap from "@/public/subpages/mission/mission/missionMap.webp";
import missionMapKorea from "@/public/subpages/mission/mission/missionMapKorea.webp";

export const metadata: Metadata = {
  title: '선교',
  description: '제자들교회의 국내외 선교 사역을 소개합니다. 복음의 능력으로 땅 끝까지 그리스도의 증인이 되어 갑니다.',
  openGraph: {
    title: '선교 | 제자들교회',
    description: '제자들교회 선교 사역 - 국내외 선교 현황',
  },
};

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
