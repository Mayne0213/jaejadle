"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getGalleryPostsWithThumbnails, GalleryPost } from "@/lib/services/gallery";
import { getAnnouncements, Announcement } from "@/lib/services/announcement";

export default function NewsAndGallery() {
  const [newsItems, setNewsItems] = useState<Announcement[]>([]);
  const [galleryPosts, setGalleryPosts] = useState<GalleryPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [announcementsResponse, galleryResponse] = await Promise.all([
          getAnnouncements(1, 6),
          getGalleryPostsWithThumbnails(1, 4),
        ]);

        setNewsItems(announcementsResponse.data);
        setGalleryPosts(galleryResponse.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // 날짜 포맷 함수
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return {
      day,
      date: `${year}.${month}`
    };
  };



  return (
    <section className="py-16 smalltablet:py-20 pc:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 smalltablet:px-6 pc:px-8">
        <div className="grid pc:grid-cols-2 gap-10 smalltablet:gap-12">
          {/* 왼쪽: 소식 */}
          <div>
            <div className="flex justify-between items-stretch pb-3 smalltablet:pb-4 mb-8 smalltablet:mb-10 border-b border-gray-200">
              <div>
                <h2 className="text-3xl smalltablet:text-4xl pc:text-5xl font-black text-gray-900 mb-1 smalltablet:mb-2 tracking-tight">News</h2>
                <p className="text-gray-600 text-sm smalltablet:text-base">소식</p>
              </div>
              <Link
                href="/announcements"
                aria-label="더보기"
                className="w-12 smalltablet:w-14 m-2 self-stretch rounded-xl bg-linear-to-br from-[#7ba5d6] to-[#6b95c6] hover:from-[#6b95c6] hover:to-[#5f89bc] text-white flex items-center justify-center transition-colors shadow-sm border border-[#6b95c6]"
              >
                <svg className="w-4 h-4 smalltablet:w-5 smalltablet:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="space-y-3">
              {loading ? (
                // 로딩 스켈레톤
                Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={index}
                    className={`bg-white p-4 smalltablet:p-5 rounded-xl border border-gray-200 animate-pulse ${index >= 4 ? 'hidden smalltablet:block' : ''}`}
                  >
                    <div className="flex items-start gap-3 smalltablet:gap-4">
                      <div className="shrink-0 bg-gray-200 w-14 h-14 smalltablet:w-16 smalltablet:h-16 rounded-lg" />
                      <div className="flex-1 space-y-2">
                        <div className="h-5 bg-gray-200 rounded w-3/4" />
                        <div className="h-4 bg-gray-200 rounded w-full" />
                      </div>
                    </div>
                  </div>
                ))
              ) : newsItems.length > 0 ? (
                newsItems.slice(0, 6).map((item, index) => {
                  const { day, date } = formatDate(item.createdAt);
                  return (
                    <Link
                      key={item.id}
                      href={`/announcements/${item.id}`}
                      className={`bg-white hover:bg-gray-50 p-4 smalltablet:p-5 rounded-xl transition-all duration-200 cursor-pointer border border-gray-200 group block ${index >= 4 ? 'hidden smalltablet:block' : ''}`}
                    >
                      <div className="flex items-start gap-3 smalltablet:gap-4">
                        {/* 날짜 박스 */}
                        <div className="shrink-0 bg-linear-to-br from-[#7ba5d6] to-[#6b95c6] text-white w-14 h-14 smalltablet:w-16 smalltablet:h-16 rounded-lg flex flex-col items-center justify-center">
                          <div className="text-xl smalltablet:text-2xl font-bold">{day}</div>
                          <div className="text-xs mt-0.5 smalltablet:mt-1">{date}</div>
                        </div>

                        {/* 컨텐츠 */}
                        <div className="flex-1">
                          <h3 className="text-base smalltablet:text-lg font-bold text-gray-900 mb-1 smalltablet:mb-2 group-hover:text-[#6b95c6] transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-xs smalltablet:text-sm text-gray-600 leading-relaxed line-clamp-2">
                            {item.content}
                          </p>
                        </div>
                      </div>
                    </Link>
                  );
                })
              ) : (
                <div className="text-center py-8 text-gray-500">
                  아직 공지사항이 없습니다.
                </div>
              )}
            </div>
          </div>

          {/* 오른쪽: 갤러리 */}
          <div>
            <div className="flex justify-between items-stretch pb-3 smalltablet:pb-4 mb-8 smalltablet:mb-10 border-b border-gray-200">
              <div>
                <h2 className="text-3xl smalltablet:text-4xl pc:text-5xl font-black text-gray-900 mb-1 smalltablet:mb-2 tracking-tight">Photos</h2>
                <p className="text-gray-600 text-sm smalltablet:text-base">앨범</p>
              </div>
              <Link
                href="/gallery"
                aria-label="더보기"
                className="w-12 smalltablet:w-14 m-2 self-stretch rounded-xl bg-linear-to-br from-[#7ba5d6] to-[#6b95c6] hover:from-[#6b95c6] hover:to-[#5f89bc] text-white flex items-center justify-center transition-colors shadow-sm border border-[#6b95c6]"
              >
                <svg className="w-4 h-4 smalltablet:w-5 smalltablet:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>



            {/* 이미지 그리드 */}
            <div className="grid grid-cols-2 gap-3 smalltablet:mx-auto smalltablet:grid-cols-3 smalltablet:gap-4 pc:grid-cols-2">
              {loading ? (
                // 로딩 스켈레톤
                Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="group relative bg-white rounded-xl overflow-hidden shadow-md border border-gray-200 animate-pulse"
                  >
                    <div className="aspect-square bg-gray-200 relative overflow-hidden" />
                  </div>
                ))
              ) : galleryPosts.length > 0 ? (
                galleryPosts.map((post) => {
                  const { date } = formatDate(post.createdAt);
                  return (
                    <Link
                      key={post.id}
                      href={`/gallery/${post.id}`}
                      className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer border border-gray-200 block"
                    >
                      {/* 이미지 영역 */}
                      <div className="aspect-square bg-gray-100 relative overflow-hidden">
                        {post.thumbnailUrl ? (
                          <Image
                            src={post.thumbnailUrl}
                            alt={post.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 50vw, 25vw"
                            unoptimized
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
                            No Image
                          </div>
                        )}
                      </div>

                      {/* 정보 오버레이 */}
                      <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent transition-opacity flex items-end">
                        <div className="p-2.5 smalltablet:p-3 text-white w-full">
                          <h3 className="text-xs smalltablet:text-sm font-bold mb-0.5 smalltablet:mb-1">
                            {post.title}
                          </h3>
                          <p className="text-xs text-gray-200">{date}</p>
                        </div>
                      </div>
                    </Link>
                  );
                })
              ) : (
                <div className="col-span-2 text-center py-8 text-gray-500">
                  아직 갤러리가 없습니다.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

