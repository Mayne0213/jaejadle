'use client';

import React, { useState, useEffect, useCallback, useRef, Suspense } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { getMe, swapWorshipVideos, type User } from '@/lib/services';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface VideoItem {
  id: number;
  videoUrl: string;
  category: string;
  order: number;
  createdAt: string;
}

interface Category {
  id: string;
  title: string;
  videos: VideoItem[];
}

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

function WorshipPageContent() {
  const searchParams = useSearchParams();
  const categoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const playerRef = useRef<HTMLDivElement | null>(null);
  
  const [categories, setCategories] = useState<Category[]>([
    { id: 'sermon', title: '주일 설교', videos: [] },
    { id: 'friday', title: '금요 성령집회', videos: [] },
  ]);
    
  const [selectedVideo, setSelectedVideo] = useState<{ videoUrl: string; title: string }>({
    videoUrl: 'https://www.youtube.com/watch?v=A8xPDnTkNzI',
    title: '',
  });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [addingCategory, setAddingCategory] = useState<string>('');
  const [newVideoUrl, setNewVideoUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const loadData = useCallback(async () => {
    // 사용자 인증 확인
    try {
      const userData = await getMe();
      setUser(userData);
    } catch {
      setUser(null);
    }

    // 영상 데이터 로드
    await loadVideos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const loadVideos = async () => {
    try {
      const response = await fetch('/api/worship');
      if (!response.ok) throw new Error('Failed to fetch videos');

      const result = await response.json();
      const dbVideos: VideoItem[] = result.data || [];

      // 카테고리별로 그룹화 (order 필드로 내림차순 정렬 - 높은 order가 앞으로)
      const newCategories: Category[] = [
        {
          id: 'sermon',
          title: '주일 설교',
          videos: dbVideos
            .filter(v => v.category === 'sermon')
            .sort((a, b) => b.order - a.order)
        },
        {
          id: 'friday',
          title: '금요 성령집회',
          videos: dbVideos
            .filter(v => v.category === 'friday')
            .sort((a, b) => b.order - a.order)
        },
      ];

      setCategories(newCategories);
      
      // URL 쿼리 파라미터에서 category 확인
      const categoryParam = searchParams?.get('category');
      
      // category 파라미터가 있으면 해당 카테고리의 첫 번째 비디오 선택
      if (categoryParam) {
        const targetCategory = newCategories.find(cat => cat.id === categoryParam);
        if (targetCategory && targetCategory.videos.length > 0) {
          setSelectedVideo({
            videoUrl: targetCategory.videos[0].videoUrl,
            title: targetCategory.title,
          });
          
          // 카테고리로 스크롤 (약간의 지연을 두어 DOM이 업데이트된 후 스크롤)
          setTimeout(() => {
            const targetElement = categoryRefs.current[categoryParam];
            if (targetElement) {
              targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          }, 100);
        } else {
          // 해당 카테고리에 비디오가 없으면 첫 번째 비디오 선택
          const firstCategoryWithVideo = newCategories.find(cat => cat.videos.length > 0);
          if (firstCategoryWithVideo && firstCategoryWithVideo.videos[0]) {
            setSelectedVideo({
              videoUrl: firstCategoryWithVideo.videos[0].videoUrl,
              title: firstCategoryWithVideo.title,
            });
          }
        }
      } else {
        // category 파라미터가 없으면 첫 번째 비디오 선택
        const firstCategoryWithVideo = newCategories.find(cat => cat.videos.length > 0);
        if (firstCategoryWithVideo && firstCategoryWithVideo.videos[0]) {
          setSelectedVideo({
            videoUrl: firstCategoryWithVideo.videos[0].videoUrl,
            title: firstCategoryWithVideo.title,
          });
        }
      }
      
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading videos:', error);
      setIsLoading(false);
    }
  };

  const handleDelete = async (video: VideoItem, e: React.MouseEvent) => {
    e.stopPropagation();

    if (!user) {
      alert('로그인이 필요합니다.');
      return;
    }

    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      const response = await fetch(`/api/worship?id=${video.id}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Failed to delete video');

      // 로컬 state 업데이트
      setCategories(prev => prev.map(category => {
        if (category.id === video.category) {
          return {
            ...category,
            videos: category.videos.filter(v => v.id !== video.id)
          };
        }
        return category;
      }));
    } catch (error) {
      console.error('Error deleting video:', error);
      alert('영상 삭제에 실패했습니다.');
    }
  };

  const handleAddVideo = (categoryId: string) => {
    if (!user) {
      alert('로그인이 필요합니다.');
      return;
    }

    setAddingCategory(categoryId);
    setNewVideoUrl('');
    setIsAddModalOpen(true);
  };

  const handleSaveNewVideo = async () => {
    if (!addingCategory || !newVideoUrl) {
      alert('YouTube URL을 입력해주세요.');
      return;
    }

    try {
      const response = await fetch('/api/worship', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          category: addingCategory,
          videoUrl: newVideoUrl
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || error.message || 'Failed to add video');
      }

      const result = await response.json();
      const newVideo = result.data;

      // 로컬 state 업데이트 - 새 영상이 가장 앞으로 가도록 전체 목록을 다시 정렬
      setCategories(prev => prev.map(category => {
        if (category.id === addingCategory) {
          const updatedVideos = [...category.videos, newVideo];
          // order 기준 내림차순 정렬 (높은 order가 앞으로)
          return {
            ...category,
            videos: updatedVideos.sort((a, b) => b.order - a.order)
          };
        }
        return category;
      }));

      setIsAddModalOpen(false);
      setAddingCategory('');
      setNewVideoUrl('');
    } catch (error) {
      console.error('Error adding video:', error);
      alert(error instanceof Error ? error.message : '영상 추가에 실패했습니다.');
    }
  };

  const moveVideo = async (categoryId: string, videoId: number, direction: 'up' | 'down') => {
    if (!user) {
      alert('로그인이 필요합니다.');
      return;
    }

    const category = categories.find(cat => cat.id === categoryId);
    if (!category) return;

    const videoIndex = category.videos.findIndex(v => v.id === videoId);
    if (videoIndex === -1) return;

    // 이동할 새 인덱스 계산
    const newIndex = direction === 'up' ? videoIndex - 1 : videoIndex + 1;

    // 범위 체크
    if (newIndex < 0 || newIndex >= category.videos.length) return;

    // 교환할 두 비디오의 ID
    const video1Id = category.videos[videoIndex].id;
    const video2Id = category.videos[newIndex].id;

    // 낙관적 업데이트 (UI 즉시 반영)
    const newVideos = [...category.videos];
    [newVideos[videoIndex], newVideos[newIndex]] = [newVideos[newIndex], newVideos[videoIndex]];

    setCategories(prev => prev.map(cat =>
      cat.id === categoryId ? { ...cat, videos: newVideos } : cat
    ));

    try {
      // 서버에 순서 변경 요청 (두 비디오만 교환)
      const updatedVideos = await swapWorshipVideos(video1Id, video2Id);
      
      // 서버 응답으로 상태 업데이트 (order 값이 정확히 반영됨)
      setCategories(prev => prev.map(cat =>
        cat.id === categoryId ? { ...cat, videos: updatedVideos } : cat
      ));
    } catch (error) {
      console.error('Error swapping videos:', error);
      // 실패 시 원래 상태로 롤백
      setCategories(prev => prev.map(cat =>
        cat.id === categoryId ? { ...cat, videos: category.videos } : cat
      ));
      alert('영상 순서 변경에 실패했습니다.');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white w-full flex items-center justify-center">
        <div className="text-xl text-gray-600">로딩 중...</div>
      </div>
    );
  }

  // selectedVideo의 videoUrl에서 embed용 ID 추출
  const embedVideoId = extractYouTubeId(selectedVideo.videoUrl);

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
              title={selectedVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>

        {/* Video Categories */}
        {categories.map((category) => (
          <div 
            key={category.id} 
            ref={(el) => { categoryRefs.current[category.id] = el; }}
            className="mb-8 smalltablet:mb-12"
          >
            <div className="flex flex-col smalltablet:flex-row smalltablet:items-center smalltablet:justify-between gap-3 smalltablet:gap-0 mb-4 smalltablet:mb-6 border-b-2 border-gray-200 pb-3">
              <h3 className="text-xl smalltablet:text-2xl font-bold text-gray-800">
                {category.title}
              </h3>
              {user && (
                <button
                  onClick={() => handleAddVideo(category.id)}
                  className="bg-[#6d96c5] hover:bg-[#88aad2] text-white px-3 smalltablet:px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 text-sm smalltablet:text-base"
                >
                  <span>+</span>
                  <span>영상 추가</span>
                </button>
              )}
            </div>
            <div className="grid grid-cols-2 smalltablet:grid-cols-2 pc:grid-cols-3 gap-4 smalltablet:gap-6">
              {category.videos.map((video, index) => (
                <div
                  key={video.id}
                  className="group relative rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300"
                >
                  <div
                    onClick={() => {
                      setSelectedVideo({ videoUrl: video.videoUrl, title: category.title });
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
                      src={getThumbnailUrl(video.videoUrl)}
                      alt={category.title}
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
 
                  {/* Action Buttons - 로그인한 사용자만 표시 */}
                  {user && (
                    <div className="flex flex-col p-4 smalltablet:flex-row smalltablet:items-center smalltablet:justify-between smalltablet:gap-2 smalltablet:p-3 bg-linear-to-br from-slate-50 via-white to-slate-50 border-t border-gray-100">
                      <div className="grid grid-cols-3 gap-1.5 w-full smalltablet:flex smalltablet:gap-2 smalltablet:w-auto">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            moveVideo(category.id, video.id, 'up');
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
                            moveVideo(category.id, video.id, 'down');
                          }}
                          disabled={index === category.videos.length - 1}
                          className={`flex items-center justify-center rounded-lg min-h-[32px] smalltablet:rounded-xl smalltablet:min-w-[40px] smalltablet:min-h-[40px] transition-all font-medium text-white shadow-md active:scale-95 ${
                            index === category.videos.length - 1
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
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 smalltablet:p-8 max-w-md w-full shadow-2xl">
            <h3 className="text-xl smalltablet:text-2xl font-bold mb-4 smalltablet:mb-6 text-gray-800">새 영상 추가</h3>
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
                  setAddingCategory('');
                  setNewVideoUrl('');
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

export default function WorshipPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white w-full flex items-center justify-center">
        <div className="text-xl text-gray-600">로딩 중...</div>
      </div>
    }>
      <WorshipPageContent />
    </Suspense>
  );
}
