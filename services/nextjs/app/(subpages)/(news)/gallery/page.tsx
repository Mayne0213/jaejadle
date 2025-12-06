'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  GalleryPost,
  getGalleryPostsWithThumbnails,
  getMe,
  type User,
} from '@/lib/services';
import Pagination from '@/components/Pagination';
import { FileTextIcon } from 'lucide-react';

export default function GalleryPage() {
  const [posts, setPosts] = useState<GalleryPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    checkAuth();
    fetchPosts(currentPage);
  }, [currentPage]);

  const checkAuth = async () => {
    try {
      const userData = await getMe();
      setUser(userData);
    } catch {
      setUser(null);
    }
  };

  const fetchPosts = async (page: number) => {
    setLoading(true);
    try {
      const result = await getGalleryPostsWithThumbnails(page, 12);
      setPosts(result.data);
      setTotalPages(result.pagination.totalPages);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 w-full">
      <div className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* 글쓰기 버튼 */}
          {user && (
            <div className="flex justify-end mb-4">
              <Link
                href="/gallery/write"
                className="px-4 smalltablet:px-6 py-2 smalltablet:py-2.5 bg-linear-to-br from-[#7ba5d6] to-[#6b95c6] hover:from-[#6b95c6] hover:to-[#5b85b6] text-white rounded-lg shadow-md hover:shadow-lg transition-all font-medium text-xs smalltablet:text-sm"
              >
                갤러리 작성
              </Link>
            </div>
          )}

          {/* 갤러리 그리드 */}
          {loading ? (
            <div className="grid grid-cols-2 smalltablet:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, idx) => (
                <div key={idx} className="bg-gray-200 rounded-lg overflow-hidden animate-pulse">
                  <div className="aspect-4/3" />
                  <div className="p-4">
                    <div className="h-5 bg-gray-300 rounded w-3/4 mb-2" />
                    <div className="h-4 bg-gray-300 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : posts.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 text-center py-20 flex items-center justify-center flex-col">
              <FileTextIcon className="mx-auto h-12 w-12 smalltablet:h-16 smalltablet:w-16 text-gray-300 mb-4" />
              <p className="text-gray-500 text-base smalltablet:text-lg">
                등록된 갤러리가 없습니다.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 smalltablet:grid-cols-3 gap-4">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/gallery/${post.id}`}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="relative aspect-4/3 bg-gray-100">
                    {post.thumbnailUrl && (
                      <Image
                        src={post.thumbnailUrl}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    )}
                    {post.images.length > 1 && (
                      <div className="absolute top-2 right-2 bg-black bg-opacity-60 text-white text-[10px] smalltablet:text-xs px-2 py-1 rounded">
                        +{post.images.length - 1}
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm smalltablet:text-base font-semibold text-gray-800 truncate">{post.title}</h3>
                    <p className="text-xs smalltablet:text-sm text-gray-500 mt-1">
                      {new Date(post.createdAt).toLocaleDateString('ko-KR')}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}
