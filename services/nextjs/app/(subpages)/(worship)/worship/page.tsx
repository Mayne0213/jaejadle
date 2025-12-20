'use client';

import React, { useState, useEffect, useCallback, useRef, Suspense } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { getMe, type User } from '@/lib/services';

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

      // 카테고리별로 그룹화 (최신순 정렬)
      const newCategories: Category[] = [
        {
          id: 'sermon',
          title: '주일 설교',
          videos: dbVideos
            .filter(v => v.category === 'sermon')
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        },
        {
          id: 'friday',
          title: '금요 성령집회',
          videos: dbVideos
            .filter(v => v.category === 'friday')
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
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

      // 로컬 state 업데이트
      setCategories(prev => prev.map(category => {
        if (category.id === addingCategory) {
          return {
            ...category,
            videos: [...category.videos, newVideo]
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
                  className="bg-green-600 hover:bg-green-700 text-white px-3 smalltablet:px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 text-sm smalltablet:text-base"
                >
                  <span>+</span>
                  <span>영상 추가</span>
                </button>
              )}
            </div>
            <div className="grid grid-cols-2 smalltablet:grid-cols-2 pc:grid-cols-3 gap-4 smalltablet:gap-6">
              {category.videos.map((video) => (
                <div
                  key={video.id}
                  className="cursor-pointer group relative"
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
                    className="relative aspect-video bg-gray-500 rounded-md smalltablet:rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                  >
                    <Image
                      src={getThumbnailUrl(video.videoUrl)}
                      alt={category.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      unoptimized
                    />

                    {/* Delete Button - 로그인한 사용자만 표시 */}
                    {user && (
                      <div className="absolute bottom-1.5 smalltablet:bottom-2 right-1.5 smalltablet:right-2 flex gap-2 opacity-100 smalltablet:opacity-0 smalltablet:group-hover:opacity-100 transition-opacity duration-200">
                        <button
                          onClick={(e) => handleDelete(video, e)}
                          className="bg-red-600 hover:bg-red-700 text-white px-2 smalltablet:px-3 py-1 rounded-md text-xs smalltablet:text-sm font-medium shadow-lg transition-colors"
                        >
                          삭제
                        </button>
                      </div>
                    )}
                  </div>
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
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors text-sm smalltablet:text-base"
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
