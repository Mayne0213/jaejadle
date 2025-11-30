"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  getMe,
  getAnnouncements,
  type User,
  type Announcement,
} from "@/lib/services";
import { FileTextIcon } from "lucide-react";

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [user, setUser] = useState <User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // 사용자 인증 확인
      try {
        const userData = await getMe();
        setUser(userData);
      } catch {
        setUser(null);
      }

      // 공지사항 목록 불러오기
      const announcementsResponse = await getAnnouncements(1, 10);
      setAnnouncements(announcementsResponse.data);
    } catch (error) {
      console.error("Failed to load announcements:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-8 w-full flex flex-col items-center">
        <div className="max-w-7xl px-4 m-4 md:m-8 w-full">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {/* 테이블 헤더 스켈레톤 - 데스크톱 */}
            <div className="hidden md:grid md:grid-cols-12 bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-700">
              <div className="col-span-1 px-6 py-4 text-center">번호</div>
              <div className="col-span-6 px-6 py-4">제목</div>
              <div className="col-span-2 px-6 py-4 text-center">작성자</div>
              <div className="col-span-2 px-6 py-4 text-center">작성일</div>
              <div className="col-span-1 px-6 py-4 text-center">조회수</div>
            </div>

            {/* 테이블 바디 스켈레톤 */}
            <div className="divide-y divide-gray-200">
              {[...Array(5)].map((_, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-12 animate-pulse"
                >
                  {/* 모바일 뷰 스켈레톤 */}
                  <div className="md:hidden px-6 py-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="flex items-center justify-between">
                      <div className="h-3 bg-gray-200 rounded w-20"></div>
                      <div className="h-3 bg-gray-200 rounded w-24"></div>
                    </div>
                  </div>

                  {/* 데스크톱 뷰 스켈레톤 */}
                  <div className="hidden md:block md:col-span-1 px-6 py-4">
                    <div className="h-4 bg-gray-200 rounded w-8 mx-auto"></div>
                  </div>
                  <div className="hidden md:block md:col-span-6 px-6 py-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                  <div className="hidden md:block md:col-span-2 px-6 py-4">
                    <div className="h-4 bg-gray-200 rounded w-16 mx-auto"></div>
                  </div>
                  <div className="hidden md:block md:col-span-2 px-6 py-4">
                    <div className="h-4 bg-gray-200 rounded w-20 mx-auto"></div>
                  </div>
                  <div className="hidden md:block md:col-span-1 px-6 py-4">
                    <div className="h-4 bg-gray-200 rounded w-8 mx-auto"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
      <div className="space-y-8 w-full flex flex-col items-center">
        <div className="max-w-7xl px-4 m-4 md:m-8 w-full">
          {/* 공지 작성 버튼 */}
          {user && (
            <div className="flex justify-end mb-4">
              <Link
                href="/announcements/create"
                className="px-6 py-2.5 bg-linear-to-br from-[#7ba5d6] to-[#6b95c6] hover:from-[#6b95c6] hover:to-[#5b85b6] text-white rounded-lg shadow-md hover:shadow-lg transition-all font-medium text-sm"
              >
                공지 작성
              </Link>
            </div>
          )}

          {/* 테이블 */}
          {announcements.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 text-center py-20 flex items-center justify-center flex-col">
              <FileTextIcon className="mx-auto h-16 w-16 text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg">
                등록된 공지사항이 없습니다.
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {/* 테이블 헤더 - 데스크톱 */}
              <div className="hidden md:grid md:grid-cols-12 bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-700">
                <div className="col-span-1 px-6 py-4 text-center">번호</div>
                <div className="col-span-6 px-6 py-4">제목</div>
                <div className="col-span-2 px-6 py-4 text-center">작성자</div>
                <div className="col-span-2 px-6 py-4 text-center">작성일</div>
                <div className="col-span-1 px-6 py-4 text-center">조회수</div>
              </div>

              {/* 테이블 바디 */}
              <div className="divide-y divide-gray-200">
                {announcements.map((item, index) => (
                  <Link
                    key={item.id}
                    href={`/announcements/${item.id}`}
                    className="grid grid-cols-1 md:grid-cols-12 hover:bg-gray-50 transition-colors"
                  >
                    {/* 모바일 뷰 */}
                    <div className="md:hidden px-6 py-4">
                      <div className="flex items-center gap-2 mb-2">
                        {item.isImportant && (
                          <span className="px-2 py-0.5 bg-orange-100 text-orange-600 text-xs font-bold rounded">
                            필독
                          </span>
                        )}
                      </div>
                      <h3 className="font-medium text-gray-900 mb-2">{item.title}</h3>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{item.author.userName}</span>
                        <span>{formatDate(item.createdAt)}</span>
                      </div>
                    </div>

                    {/* 데스크톱 뷰 */}
                    <div className="hidden md:block md:col-span-1 px-6 py-4 text-center text-sm text-gray-600">
                      {announcements.length - index}
                    </div>
                    <div className="hidden md:block md:col-span-6 px-6 py-4">
                      <div className="flex items-center gap-2">
                        {item.isImportant && (
                          <span className="px-2 py-0.5 bg-orange-100 text-orange-600 text-xs font-bold rounded">
                            필독
                          </span>
                        )}
                        <span className="text-gray-900 font-medium hover:text-blue-600 transition-colors">
                          {item.title}
                        </span>
                      </div>
                    </div>
                    <div className="hidden md:block md:col-span-2 px-6 py-4 text-center text-sm text-gray-600">
                      {item.author.userName}
                    </div>
                    <div className="hidden md:flex md:col-span-2 px-6 py-4 justify-center text-center text-sm text-gray-600">
                      {formatDate(item.createdAt)}
                    </div>
                    <div className="hidden md:block md:col-span-1 px-6 py-4 text-center text-sm text-gray-600">
                      {item.viewCount}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
  );
}
