'use client';

import React, { useState, useEffect, useCallback, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ClipLoader } from 'react-spinners';
import { GalleryPost, getGalleryPostWithUrls, deleteGalleryPost, getMe, getSortedGalleryContent, type User, type GalleryContentItem } from '@/lib/services';

export default function GalleryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [post, setPost] = useState<GalleryPost | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);

  const loadData = useCallback(async () => {
    // 사용자 인증 확인
    try {
      const userData = await getMe();
      setUser(userData);
    } catch {
      setUser(null);
    }
    // 갤러리 포스트 불러오기
    setLoading(true);
    try {
      const data = await getGalleryPostWithUrls(parseInt(id, 10));
      setPost(data);
    } catch (error) {
      console.error('Failed to fetch post:', error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleDelete = async () => {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    setDeleting(true);
    try {
      await deleteGalleryPost(parseInt(id, 10));
      router.push('/gallery');
    } catch (error) {
      console.error('Failed to delete post:', error);
      alert('삭제에 실패했습니다.');
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white w-full flex items-center justify-center">
        <ClipLoader color="#7ba5d6" size={50} />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-white w-full">
        <div className="py-12 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-gray-500">갤러리를 찾을 수 없습니다.</p>
            <Link href="/gallery" className="text-blue-500 mt-4 inline-block">
              목록으로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="py-12 px-4">
        <div className="max-w-7xl bg-gray-100 rounded-xl p-8 mx-auto">
          {/* 헤더 */}
          <div className="mb-8 pb-6 border-b border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-xl smalltablet:text-2xl pc:text-3xl font-bold text-gray-800">{post.title}</h1>
                <p className="text-xs smalltablet:text-sm text-gray-500 mt-1">
                  {new Date(post.createdAt).toLocaleDateString('ko-KR')}
                </p>
              </div>
              {user && (
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50"
                >
                  {deleting ? '삭제 중...' : '삭제'}
                </button>
              )}
            </div>
          </div>

          {/* 콘텐츠 (이미지 + 텍스트 블록) */}
          <div className="space-y-4">
            {(() => {
              const sortedContent = getSortedGalleryContent(post);
              
              return sortedContent.map((item: GalleryContentItem, idx: number) => {
                if (item.type === 'image') {
                  const imageId = item.data.id;
                  const aspectRatio = item.data.aspectRatio;
                  
                  return (
                    <div
                      key={`image-${imageId}`}
                      className="relative w-full bg-gray-200 rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                      style={{
                        aspectRatio: aspectRatio ? `${aspectRatio}` : 'auto',
                        minHeight: aspectRatio ? 'auto' : '200px',
                      }}
                      onClick={() => {
                        // 전체 이미지 배열에서의 인덱스 찾기
                        const allImages = post.images.sort((a, b) => a.order - b.order);
                        const actualIndex = allImages.findIndex(img => img.id === item.data.id);
                        setSelectedIndex(actualIndex);
                      }}
                    >
                      {item.data.displayUrl && (
                        <Image
                          src={item.data.displayUrl}
                          alt={`${post.title} - ${idx + 1}`}
                          fill
                          className="object-contain"
                        />
                      )}
                    </div>
                  );
                } else {
                  return (
                    <div
                      key={`text-${item.data.id}`}
                      className="p-4 rounded-lg text-sm smalltablet:text-base pc:text-xl text-gray-700 whitespace-pre-wrap"
                    >
                      {item.data.content}
                    </div>
                  );
                }
              });
            })()}
          </div>

          {/* 이미지 모달 */}
          {selectedIndex !== null && (
            <div
              className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
              onClick={() => setSelectedIndex(null)}
            >
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-4xl hover:text-gray-300 z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  const sortedImages = post.images.sort((a, b) => a.order - b.order);
                  setSelectedIndex(prev => prev !== null && prev > 0 ? prev - 1 : sortedImages.length - 1);
                }}
              >
                &lsaquo;
              </button>

              <div className="relative max-w-4xl max-h-[90vh] w-full h-full mx-16">
                {(() => {
                  const sortedImages = post.images.sort((a, b) => a.order - b.order);
                  const currentImage = sortedImages[selectedIndex];
                  return currentImage?.displayUrl ? (
                    <Image
                      src={currentImage.displayUrl}
                      alt={`${post.title} - ${selectedIndex + 1}`}
                      fill
                      className="object-contain"
                    />
                  ) : null;
                })()}
              </div>

              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-4xl hover:text-gray-300 z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  const sortedImages = post.images.sort((a, b) => a.order - b.order);
                  setSelectedIndex(prev => prev !== null && prev < sortedImages.length - 1 ? prev + 1 : 0);
                }}
              >
                &rsaquo;
              </button>

              <button
                className="absolute top-4 right-4 text-white text-3xl hover:text-gray-300"
                onClick={() => setSelectedIndex(null)}
              >
                &times;
              </button>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-xs smalltablet:text-sm">
                {(() => {
                  const sortedImages = post.images.sort((a, b) => a.order - b.order);
                  return `${selectedIndex + 1} / ${sortedImages.length}`;
                })()}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
