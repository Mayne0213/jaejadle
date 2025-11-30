'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
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

export default function WorshipPage() {
  const [categories, setCategories] = useState<Category[]>([
    { id: 'sermon', title: '설교', videos: [] },
    { id: 'praise', title: '찬양', videos: [] }]);
  const [selectedVideo, setSelectedVideo] = useState<{ videoUrl: string; title: string }>({
    videoUrl: 'https://www.youtube.com/watch?v=A8xPDnTkNzI',
    title: '',
  });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [addingCategory, setAddingCategory] = useState<string>('');
  const [newVideoUrl, setNewVideoUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    // 사용자 인증 확인
    try {
      const userData = await getMe();
      setUser(userData);
    } catch {
      setUser(null);
    }

    // 영상 데이터 로드
    await loadVideos();
  };

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
          title: '설교',
          videos: dbVideos
            .filter(v => v.category === 'sermon')
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        },
        {
          id: 'praise',
          title: '찬양',
          videos: dbVideos
            .filter(v => v.category === 'praise')
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        },
      ];

      setCategories(newCategories);
      
      // 첫 번째 비디오가 있으면 선택
      const firstCategoryWithVideo = newCategories.find(cat => cat.videos.length > 0);
      if (firstCategoryWithVideo && firstCategoryWithVideo.videos[0]) {
        setSelectedVideo({
          videoUrl: firstCategoryWithVideo.videos[0].videoUrl,
          title: firstCategoryWithVideo.title,
        });
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
      <div className="py-4 md:py-8 px-3 md:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Main YouTube Player */}
        <div className="mb-6 md:mb-8">
          <div className="aspect-video w-full bg-black rounded-md md:rounded-lg overflow-hidden shadow-lg">
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
          <div key={category.id} className="mb-8 md:mb-12">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-4 md:mb-6 border-b-2 border-gray-200 pb-3">
              <h3 className="text-xl md:text-2xl font-bold text-gray-800">
                {category.title}
              </h3>
              {user && (
                <button
                  onClick={() => handleAddVideo(category.id)}
                  className="bg-green-600 hover:bg-green-700 text-white px-3 md:px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 text-sm md:text-base"
                >
                  <span>+</span>
                  <span>영상 추가</span>
                </button>
              )}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {category.videos.map((video) => (
                <div
                  key={video.id}
                  className="cursor-pointer group relative"
                >
                  <div
                    onClick={() => setSelectedVideo({ videoUrl: video.videoUrl, title: category.title })}
                    className="relative aspect-video bg-gray-500 rounded-md md:rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
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
                      <div className="absolute bottom-1.5 md:bottom-2 right-1.5 md:right-2 flex gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200">
                        <button
                          onClick={(e) => handleDelete(video, e)}
                          className="bg-red-600 hover:bg-red-700 text-white px-2 md:px-3 py-1 rounded-md text-xs md:text-sm font-medium shadow-lg transition-colors"
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
          <div className="bg-white rounded-lg p-6 md:p-8 max-w-md w-full shadow-2xl">
            <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-gray-800">새 영상 추가</h3>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                YouTube URL
              </label>
              <input
                type="text"
                value={newVideoUrl}
                onChange={(e) => setNewVideoUrl(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
                className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-sm md:text-base"
              />
              <p className="mt-2 text-xs text-gray-500">
                예시: https://www.youtube.com/watch?v=A8xPDnTkNzI
              </p>
            </div>
            <div className="flex flex-col-reverse sm:flex-row gap-2 sm:gap-3 sm:justify-end">
              <button
                onClick={() => {
                  setIsAddModalOpen(false);
                  setAddingCategory('');
                  setNewVideoUrl('');
                }}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium transition-colors text-sm md:text-base"
              >
                취소
              </button>
              <button
                onClick={handleSaveNewVideo}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors text-sm md:text-base"
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
