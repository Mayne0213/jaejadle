'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { swapDiscipleVideos, type DiscipleVideo } from '@/lib/services';
import { useAuth } from '@/hooks';
import { extractYouTubeId, getYouTubeThumbnailUrl } from '@/lib/utils/youtube';
import { ArrowUp, ArrowDown } from 'lucide-react';

// Stage별 제목 매핑
const STAGE_TITLES: { [key: string]: string } = {
  'new-family': '새가족반',
  'basic': '기초양육반',
  'disciple': '제자훈련반',
  'evangelism': '전도훈련반',
  'ministry': '사역훈련반',
};

// 제자훈련반 Step 목록
const DISCIPLE_STEPS = [
  '1단계 - 십자가',
  '2단계 - 영적전투',
  '3단계 - 하나님 나라',
];

export default function SystemStagePage() {
  const params = useParams();
  const stage = params.stage as string;
  const playerRef = useRef<HTMLDivElement | null>(null);

  const stageTitle = STAGE_TITLES[stage] || '제자화 시스템';
  const isDisciple = stage === 'disciple';

  const [videos, setVideos] = useState<DiscipleVideo[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newVideoUrl, setNewVideoUrl] = useState('');
  const [addingStep, setAddingStep] = useState<string | null>(null);

  const { user } = useAuth();

  const loadVideos = useCallback(async () => {
    try {
      const response = await fetch(`/api/disciple-videos?stage=${stage}`);
      if (!response.ok) throw new Error('Failed to fetch videos');

      const result = await response.json();
      const dbVideos: DiscipleVideo[] = result.data || [];
      setVideos(dbVideos);

      // 첫 번째 비디오 선택
      if (dbVideos.length > 0) {
        setSelectedVideo(dbVideos[0].videoUrl);
      }

      setIsLoading(false);
    } catch (error) {
      console.error('Error loading videos:', error);
      setIsLoading(false);
    }
  }, [stage]);

  useEffect(() => {
    loadVideos();
  }, [loadVideos]);

  const handleDelete = async (video: DiscipleVideo, e: React.MouseEvent) => {
    e.stopPropagation();

    if (!user) {
      alert('로그인이 필요합니다.');
      return;
    }

    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      const response = await fetch(`/api/disciple-videos?id=${video.id}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Failed to delete video');

      // 로컬 state 업데이트
      setVideos(prev => prev.filter(v => v.id !== video.id));
    } catch (error) {
      console.error('Error deleting video:', error);
      alert('영상 삭제에 실패했습니다.');
    }
  };

  const handleAddVideo = (step: string | null = null) => {
    if (!user) {
      alert('로그인이 필요합니다.');
      return;
    }

    setNewVideoUrl('');
    setAddingStep(step);
    setIsAddModalOpen(true);
  };

  const handleSaveNewVideo = async () => {
    if (!newVideoUrl) {
      alert('YouTube URL을 입력해주세요.');
      return;
    }

    try {
      const response = await fetch('/api/disciple-videos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          stage,
          step: addingStep,
          videoUrl: newVideoUrl
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || error.message || 'Failed to add video');
      }

      const result = await response.json();
      const newVideo = result.data;

      // 로컬 state 업데이트
      setVideos(prev => [...prev, newVideo]);

      setIsAddModalOpen(false);
      setNewVideoUrl('');
      setAddingStep(null);
    } catch (error) {
      console.error('Error adding video:', error);
      alert(error instanceof Error ? error.message : '영상 추가에 실패했습니다.');
    }
  };

  const moveVideo = async (video: DiscipleVideo, direction: 'up' | 'down') => {
    if (!user) {
      alert('로그인이 필요합니다.');
      return;
    }

    // 같은 step의 비디오들만 필터링
    const stepVideos = videos.filter(v => v.step === video.step);
    const videoIndex = stepVideos.findIndex(v => v.id === video.id);
    if (videoIndex === -1) return;

    // 이동할 새 인덱스 계산
    const newIndex = direction === 'up' ? videoIndex - 1 : videoIndex + 1;

    // 범위 체크
    if (newIndex < 0 || newIndex >= stepVideos.length) return;

    // 교환할 두 비디오의 ID
    const video1Id = stepVideos[videoIndex].id;
    const video2Id = stepVideos[newIndex].id;

    try {
      // 서버에 순서 변경 요청
      const updatedStepVideos = await swapDiscipleVideos(video1Id, video2Id);

      // 전체 videos에서 해당 step의 비디오들만 교체
      setVideos(prev => {
        const otherVideos = prev.filter(v => v.step !== video.step);
        return [...otherVideos, ...updatedStepVideos];
      });
    } catch (error) {
      console.error('Error swapping videos:', error);
      alert('영상 순서 변경에 실패했습니다.');
    }
  };

  // step별로 비디오 그룹화
  const getVideosByStep = (step: string | null) => {
    return videos
      .filter(v => v.step === step)
      .sort((a, b) => b.order - a.order);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white w-full flex items-center justify-center">
        <div className="text-xl text-gray-600">로딩 중...</div>
      </div>
    );
  }

  // selectedVideo의 videoUrl에서 embed용 ID 추출
  const embedVideoId = extractYouTubeId(selectedVideo);

  const renderVideoGrid = (videoList: DiscipleVideo[], step: string | null) => (
    <div className="grid grid-cols-2 smalltablet:grid-cols-2 pc:grid-cols-3 gap-4 smalltablet:gap-6">
      {videoList.map((video) => {
        const stepVideos = videos.filter(v => v.step === step).sort((a, b) => b.order - a.order);
        const index = stepVideos.findIndex(v => v.id === video.id);

        return (
          <div
            key={video.id}
            className="group relative rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300"
          >
            <div
              onClick={() => {
                setSelectedVideo(video.videoUrl);
                setTimeout(() => {
                  if (playerRef.current) {
                    const elementTop = playerRef.current.getBoundingClientRect().top + window.pageYOffset;
                    const offset = 80;
                    window.scrollTo({ top: elementTop - offset, behavior: 'smooth' });
                  }
                }, 100);
              }}
              className="relative aspect-video bg-linear-to-br from-gray-800 to-gray-900 overflow-hidden cursor-pointer"
            >
              <Image
                src={getYouTubeThumbnailUrl(video.videoUrl)}
                alt={stageTitle}
                fill
                className="object-cover pc:group-hover:scale-105 transition-transform duration-500"
                unoptimized
              />
              <div className="absolute inset-0 bg-black/0 pc:group-hover:bg-black/10 transition-colors duration-300" />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-12 h-12 smalltablet:w-14 smalltablet:h-14 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl pc:group-hover:scale-110 pc:group-hover:bg-white transition-all duration-300">
                  <div className="w-0 h-0 border-l-12 smalltablet:border-l-14 border-l-gray-800 border-t-7 smalltablet:border-t-8 border-t-transparent border-b-7 smalltablet:border-b-8 border-b-transparent ml-1" />
                </div>
              </div>
            </div>

            {user && (
              <div className="flex flex-col p-4 smalltablet:flex-row smalltablet:items-center smalltablet:justify-between smalltablet:gap-2 smalltablet:p-3 bg-linear-to-br from-slate-50 via-white to-slate-50 border-t border-gray-100">
                <div className="grid grid-cols-3 gap-1.5 w-full smalltablet:flex smalltablet:gap-2 smalltablet:w-auto">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      moveVideo(video, 'up');
                    }}
                    disabled={index === 0}
                    className={`flex items-center justify-center rounded-lg min-h-[32px] smalltablet:rounded-xl smalltablet:min-w-[40px] smalltablet:min-h-[40px] transition-all font-medium text-white shadow-md active:scale-95 ${
                      index === 0
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-[#88aad2] hover:bg-[#94b7d6] pc:hover:shadow-lg'
                    }`}
                    aria-label="위로 이동"
                  >
                    <ArrowUp className="cursor-pointer w-4 h-4 smalltablet:w-5 smalltablet:h-5" strokeWidth={2.5} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      moveVideo(video, 'down');
                    }}
                    disabled={index === stepVideos.length - 1}
                    className={`flex items-center justify-center rounded-lg min-h-[32px] smalltablet:rounded-xl smalltablet:min-w-[40px] smalltablet:min-h-[40px] transition-all font-medium text-white shadow-md active:scale-95 ${
                      index === stepVideos.length - 1
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-[#94b7d6] hover:bg-[#a9c6e1] pc:hover:shadow-lg'
                    }`}
                    aria-label="아래로 이동"
                  >
                    <ArrowDown className="cursor-pointer w-4 h-4 smalltablet:w-5 smalltablet:h-5" strokeWidth={2.5} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(video, e);
                    }}
                    className="cursor-pointer flex flex-col items-center justify-center gap-0.5 bg-red-400 hover:bg-red-500 pc:hover:shadow-lg text-white rounded-lg font-semibold text-xs shadow-md active:scale-95 transition-all min-h-[32px] smalltablet:rounded-xl smalltablet:min-w-[40px] smalltablet:min-h-[40px]"
                    aria-label="영상 삭제"
                  >
                    <span className="hidden smalltablet:inline">삭제</span>
                    <span className="smalltablet:hidden">X</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="w-full">
      <div className="py-4 smalltablet:py-8 px-3 smalltablet:px-6 pc:px-8 max-w-7xl mx-auto">
        {/* Main YouTube Player */}
        <div ref={playerRef} className="mb-6 smalltablet:mb-8">
          <div className="aspect-video w-full bg-black rounded-md smalltablet:rounded-lg overflow-hidden shadow-lg">
            {embedVideoId ? (
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${embedVideoId}`}
                title={stageTitle}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white">
                영상을 선택해주세요
              </div>
            )}
          </div>
        </div>

        {/* Video List Section */}
        {isDisciple ? (
          // 제자훈련반: Step별로 그룹화
          <div className="space-y-8">
            {DISCIPLE_STEPS.map((step) => {
              const stepVideos = getVideosByStep(step);
              return (
                <div key={step} className="mb-8 smalltablet:mb-12">
                  <div className="flex flex-col smalltablet:flex-row smalltablet:items-center smalltablet:justify-between gap-3 smalltablet:gap-0 mb-4 smalltablet:mb-6 border-b-2 border-gray-200 pb-3">
                    <h3 className="text-xl smalltablet:text-2xl font-bold text-gray-800">
                      {step}
                    </h3>
                    {user && (
                      <button
                        onClick={() => handleAddVideo(step)}
                        className="bg-[#6d96c5] hover:bg-[#88aad2] text-white px-3 smalltablet:px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 text-sm smalltablet:text-base"
                      >
                        <span>+</span>
                        <span>영상 추가</span>
                      </button>
                    )}
                  </div>

                  {stepVideos.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      등록된 영상이 없습니다.
                    </div>
                  ) : (
                    renderVideoGrid(stepVideos, step)
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          // 다른 stage: 단순 목록
          <div className="mb-8 smalltablet:mb-12">
            <div className="flex flex-col smalltablet:flex-row smalltablet:items-center smalltablet:justify-between gap-3 smalltablet:gap-0 mb-4 smalltablet:mb-6 border-b-2 border-gray-200 pb-3">
              <h3 className="text-xl smalltablet:text-2xl font-bold text-gray-800">
                {stageTitle}
              </h3>
              {user && (
                <button
                  onClick={() => handleAddVideo(null)}
                  className="bg-[#6d96c5] hover:bg-[#88aad2] text-white px-3 smalltablet:px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 text-sm smalltablet:text-base"
                >
                  <span>+</span>
                  <span>영상 추가</span>
                </button>
              )}
            </div>

            {getVideosByStep(null).length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                등록된 영상이 없습니다.
              </div>
            ) : (
              renderVideoGrid(getVideosByStep(null), null)
            )}
          </div>
        )}
      </div>

      {/* Add Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 smalltablet:p-8 max-w-md w-full shadow-2xl">
            <h3 className="text-xl smalltablet:text-2xl font-bold mb-4 smalltablet:mb-6 text-gray-800">
              새 영상 추가 {addingStep && `(${addingStep})`}
            </h3>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                YouTube URL
              </label>
              <input
                type="text"
                value={newVideoUrl}
                onChange={(e) => setNewVideoUrl(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
                className="w-full px-3 smalltablet:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-sm smalltablet:text-base"
              />
              <p className="mt-2 text-xs text-gray-500">
                예시: https://www.youtube.com/watch?v=A8xPDnTkNzI
              </p>
            </div>
            <div className="flex flex-col-reverse smalltablet:flex-row gap-2 smalltablet:gap-3 smalltablet:justify-end">
              <button
                onClick={() => {
                  setIsAddModalOpen(false);
                  setNewVideoUrl('');
                  setAddingStep(null);
                }}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium transition-colors text-sm smalltablet:text-base"
              >
                취소
              </button>
              <button
                onClick={handleSaveNewVideo}
                className="px-4 py-2 bg-[#6d96c5] hover:bg-[#88aad2] text-white rounded-lg font-medium transition-colors text-sm smalltablet:text-base"
              >
                추가
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
