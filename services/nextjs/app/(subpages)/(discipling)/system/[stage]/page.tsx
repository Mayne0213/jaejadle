'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';

// Stage별 제목 매핑
const STAGE_TITLES: { [key: string]: string } = {
  'new-family': '새가족반',
  'basic': '기초양육반',
  'disciple': '제자훈련반',
  'evangelism': '전도훈련반',
  'ministry': '사역훈련반',
};

// Stage별 하드코딩된 YouTube URL (그룹별로 구성)
const STAGE_VIDEOS: { [key: string]: { [step: string]: string[] } } = {
  'new-family': {
    'Step1': [
      'https://www.youtube.com/watch?v=A8xPDnTkNzI',
      'https://www.youtube.com/watch?v=A8xPDnTkNzI',
      'https://www.youtube.com/watch?v=A8xPDnTkNzI',
      'https://www.youtube.com/watch?v=A8xPDnTkNzI',
      'https://www.youtube.com/watch?v=A8xPDnTkNzI',
      'https://www.youtube.com/watch?v=A8xPDnTkNzI',
    ],
  },
  'basic': {
    'Step1': [
      'https://www.youtube.com/watch?v=A8xPDnTkNzI',
      'https://www.youtube.com/watch?v=A8xPDnTkNzI',
      'https://www.youtube.com/watch?v=A8xPDnTkNzI',
    ],
    'Step2': [
      'https://www.youtube.com/watch?v=A8xPDnTkNzI',
      'https://www.youtube.com/watch?v=A8xPDnTkNzI',
      'https://www.youtube.com/watch?v=A8xPDnTkNzI',
    ],
  },
  'disciple': {
    '1단계 - 십자가': [
      'https://www.youtube.com/watch?v=A8xPDnTkNzI',
      'https://www.youtube.com/watch?v=A8xPDnTkNzI',
      'https://www.youtube.com/watch?v=A8xPDnTkNzI',
    ],
    '2단계 - 영적전투': [
      'https://www.youtube.com/watch?v=A8xPDnTkNzI',
      'https://www.youtube.com/watch?v=A8xPDnTkNzI',
      'https://www.youtube.com/watch?v=A8xPDnTkNzI',
    ],
    '3단계 - 하나님 나라': [
      'https://www.youtube.com/watch?v=A8xPDnTkNzI',
      'https://www.youtube.com/watch?v=A8xPDnTkNzI',
    ],
  },  
  'evangelism': {
    'Step1': [
      'https://www.youtube.com/watch?v=A8xPDnTkNzI',
      'https://www.youtube.com/watch?v=A8xPDnTkNzI',
      'https://www.youtube.com/watch?v=A8xPDnTkNzI',
    ],
    'Step2': [
      'https://www.youtube.com/watch?v=A8xPDnTkNzI',
      'https://www.youtube.com/watch?v=A8xPDnTkNzI',
      'https://www.youtube.com/watch?v=A8xPDnTkNzI',
    ],
  },
  'ministry': {
    'Step1': [
      'https://www.youtube.com/watch?v=A8xPDnTkNzI',
      'https://www.youtube.com/watch?v=A8xPDnTkNzI',
      'https://www.youtube.com/watch?v=A8xPDnTkNzI',
    ],
    'Step2': [
      'https://www.youtube.com/watch?v=A8xPDnTkNzI',
      'https://www.youtube.com/watch?v=A8xPDnTkNzI',
      'https://www.youtube.com/watch?v=A8xPDnTkNzI',
    ],
  },
};

// YouTube URL에서 ID 추출하는 유틸리티 함수
function extractYouTubeId(url: string): string | null {
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname.toLowerCase();

    // watch?v= 형식
    if (urlObj.searchParams.has('v')) {
      return urlObj.searchParams.get('v');
    }
    // youtu.be/ID 형식
    if (hostname === 'youtu.be') {
      return urlObj.pathname.slice(1).split('?')[0];
    }
    // embed/ID 형식
    if (urlObj.pathname.startsWith('/embed/')) {
      return urlObj.pathname.split('/embed/')[1]?.split('?')[0] || null;
    }
    // live/ID 형식
    if (urlObj.pathname.startsWith('/live/')) {
      const liveId = urlObj.pathname.split('/live/')[1]?.split('?')[0];
      return liveId || null;
    }
    return null;
  } catch {
    return null;
  }
}

// YouTube URL에서 썸네일 URL 생성
function getThumbnailUrl(videoUrl: string): string {
  const videoId = extractYouTubeId(videoUrl);
  return videoId
    ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`
    : '/placeholder.jpg';
}

export default function SystemStagePage() {
  const params = useParams();
  const stage = params.stage as string;
  const playerRef = useRef<HTMLDivElement | null>(null);
  
  const stageTitle = STAGE_TITLES[stage] || '제자화 시스템';
  const videoGroups = STAGE_VIDEOS[stage] || {};
  
  // 모든 그룹의 첫 번째 비디오를 찾아서 기본값으로 설정
  const allVideos = Object.values(videoGroups).flat();
  const [selectedVideo, setSelectedVideo] = useState<string>(
    allVideos.length > 0 ? allVideos[0] : 'https://www.youtube.com/watch?v=A8xPDnTkNzI'
  );

  // selectedVideo의 videoUrl에서 embed용 ID 추출
  const embedVideoId = extractYouTubeId(selectedVideo);

  return (
    <div className="w-full">
      <div className="py-4 smalltablet:py-8 px-3 smalltablet:px-6 pc:px-8 max-w-7xl mx-auto">
        {/* Main YouTube Player */}
        <div ref={playerRef} className="mb-6 smalltablet:mb-8">
          <div className="aspect-video w-full bg-black rounded-md smalltablet:rounded-lg overflow-hidden shadow-lg">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${embedVideoId}`}
              title={stageTitle}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>

        {/* Video List */}
        <div className="space-y-8">
          {Object.entries(videoGroups).map(([stepName, videos]) => (
            <div key={stepName} className="w-full">
              {/* Step 제목 */}
              <div className="mb-6 smalltablet:mb-8">
                <h3 className="text-xl smalltablet:text-2xl pc:text-3xl font-bold text-gray-800 border-b border-gray-300 p-2">
                  {stepName}
                </h3>
              </div>
              
              {/* 비디오 그리드 */}
              <div className="grid grid-cols-2 smalltablet:grid-cols-2 pc:grid-cols-3 gap-4 smalltablet:gap-6 mb-[20px]">
                {videos.map((videoUrl, index) => (
                  <div
                    key={index}
                    className="group relative rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300"
                  >
                    <div
                      onClick={() => {
                        setSelectedVideo(videoUrl);
                        // 상단 재생 영역으로 스크롤 (약간의 여백 추가)
                        setTimeout(() => {
                          if (playerRef.current) {
                            const elementTop = playerRef.current.getBoundingClientRect().top + window.pageYOffset;
                            const offset = 80; // 상단에서 80px 위로
                            window.scrollTo({ top: elementTop - offset, behavior: 'smooth' });
                          }
                        }, 100);
                      }}
                      className="relative aspect-video bg-linear-to-br from-gray-800 to-gray-900 overflow-hidden cursor-pointer"
                    >
                      <Image
                        src={getThumbnailUrl(videoUrl)}
                        alt={stageTitle}
                        fill
                        className="object-cover pc:group-hover:scale-105 transition-transform duration-500"
                        unoptimized
                      />
                      
                      {/* 재생 오버레이 */}
                      <div className="absolute inset-0 bg-black/0 pc:group-hover:bg-black/10 transition-colors duration-300" />
                      
                      {/* 재생 아이콘 */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-12 h-12 smalltablet:w-14 smalltablet:h-14 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl pc:group-hover:scale-110 pc:group-hover:bg-white transition-all duration-300">
                          <div className="w-0 h-0 border-l-12 smalltablet:border-l-14 border-l-gray-800 border-t-7 smalltablet:border-t-8 border-t-transparent border-b-7 smalltablet:border-b-8 border-b-transparent ml-1" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
