"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  getMe,
  getAnnouncementById,
  deleteAnnouncement,
  getDownloadUrl,
  type User,
  type Announcement,
} from "@/lib/services";
import { Download, FileText, Image as ImageIcon, File as FileIcon } from "lucide-react";

export default function AnnouncementDetailPage() {
  const [announcement, setAnnouncement] = useState<Announcement | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const loadData = async () => {
    try {
      // 사용자 인증 확인
      try {
        const userData = await getMe();
        setUser(userData);
      } catch {
        setUser(null);
      }

      // 공지사항 상세 불러오기
      const announcementData = await getAnnouncementById(parseInt(id));
      setAnnouncement(announcementData);
    } catch {
      alert("공지사항을 불러올 수 없습니다.");
      router.push("/announcements");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!announcement || !user) return;
    if (announcement.authorId !== user.id) {
      alert("삭제 권한이 없습니다.");
      return;
    }

    if (!confirm("정말 삭제하시겠습니까?")) return;

    try {
      await deleteAnnouncement(announcement.id);
      alert("삭제되었습니다.");
      router.push("/announcements");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "삭제에 실패했습니다.";
      alert(errorMessage);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split(".").pop()?.toLowerCase();
    if (["jpg", "jpeg", "png", "gif", "webp"].includes(extension || "")) {
      return ImageIcon;
    } else if (extension === "pdf") {
      return FileText;
    } else {
      return FileIcon;
    }
  };

  const handleDownload = async (fileKey: string, fileName: string) => {
    try {
      // Pre-signed URL 받아오기 (파일명 포함)
      const downloadUrl = await getDownloadUrl(fileKey, fileName);

      // 다운로드 (ResponseContentDisposition이 설정되어 자동으로 다운로드됨)
      window.open(downloadUrl, '_blank');
    } catch (error) {
      console.error("Download failed:", error);
      alert("다운로드에 실패했습니다.");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white w-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!announcement) {
    return null;
  }

  const isAuthor = user && announcement.authorId === user.id;

  return (
    <div className="w-full">
      <div className="py-6 smalltablet:py-12 px-4">
        <div className="max-w-4xl p-4 smalltablet:p-6 pc:p-8 rounded-xl bg-gray-100 mx-auto">
          {/* 헤더 */}
          <div className="mb-6 smalltablet:mb-8">
            <div className="flex items-center gap-2 smalltablet:gap-3 mb-3 smalltablet:mb-4">
              {announcement.isImportant && (
                <span className="px-2 smalltablet:px-3 py-0.5 smalltablet:py-1 rounded-full text-xs smalltablet:text-sm font-semibold bg-red-100 text-red-700">
                  중요
                </span>
              )}
            </div>
            <h1 className="text-xl smalltablet:text-2xl pc:text-3xl font-bold text-gray-800 mb-3 smalltablet:mb-4 wrap-break-word">
              {announcement.title}
            </h1>
            <div className="flex flex-col smalltablet:flex-row smalltablet:items-center smalltablet:justify-between text-xs smalltablet:text-sm text-gray-600 pb-3 smalltablet:pb-4 border-b gap-3 smalltablet:gap-0">
              <div className="flex flex-wrap items-center gap-2 smalltablet:gap-4">
                <span>작성자: {announcement.author.userName}</span>
                <span className="hidden smalltablet:inline">•</span>
                <span className="hidden smalltablet:inline text-xs smalltablet:text-sm">{formatDate(announcement.createdAt)}</span>
                <span className="hidden smalltablet:inline">•</span>
                <span>조회수: {announcement.viewCount}</span>
              </div>
              {isAuthor && (
                <div className="flex gap-2">
                  <button
                    onClick={handleDelete}
                    className="px-3 smalltablet:px-4 py-1.5 smalltablet:py-2 text-xs smalltablet:text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    삭제
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* 내용 */}
          <div className="prose max-w-none mb-6 smalltablet:mb-8">
            <div className="text-sm smalltablet:text-base text-gray-800 leading-relaxed whitespace-pre-wrap wrap-break-word">
              {announcement.content}
            </div>
          </div>

          {/* 첨부 파일 */}
          {announcement.files && announcement.files.length > 0 && (
            <div className="mb-8 smalltablet:mb-12">
              <div className="border-t pt-4 smalltablet:pt-6">
                <h3 className="text-base smalltablet:text-lg font-semibold text-gray-800 mb-3 smalltablet:mb-4">
                  첨부 파일 ({announcement.files.length})
                </h3>
                <div className="space-y-2 smalltablet:space-y-3">
                  {announcement.files.map((file) => {
                    const FileIconComponent = getFileIcon(file.fileName);
                    const isImage = ["jpg", "jpeg", "png", "gif", "webp"].includes(
                      file.fileName.split(".").pop()?.toLowerCase() || ""
                    );

                    return (
                      <div
                        key={file.id}
                        className="border rounded-lg p-3 smalltablet:p-4 hover:shadow-md transition-shadow bg-gray-50"
                      >
                        <div className="flex items-center gap-3 smalltablet:gap-4">
                          <div className="shrink-0">
                            <div className="w-10 h-10 smalltablet:w-12 smalltablet:h-12 bg-white rounded flex items-center justify-center">
                              <FileIconComponent
                                className={`w-5 h-5 smalltablet:w-6 smalltablet:h-6 ${
                                  isImage ? "text-blue-500" : "text-gray-500"
                                }`}
                              />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs smalltablet:text-sm font-medium text-gray-800 truncate">
                              {file.fileName}
                            </p>
                            <p className="text-xs text-gray-500 hidden smalltablet:block">
                              클릭하여 다운로드
                            </p>
                          </div>
                          <button
                            onClick={() => handleDownload(file.fileKey, file.fileName)}
                            className="shrink-0 px-3 smalltablet:px-4 py-1.5 smalltablet:py-2 bg-linear-to-br from-[#7ba5d6] to-[#6b95c6] hover:from-[#6b95c6] hover:to-[#5b85b6] text-white rounded-lg shadow-md hover:shadow-lg transition-all font-semibold flex items-center gap-1 smalltablet:gap-2 text-xs smalltablet:text-sm"
                          >
                            <Download className="w-3 h-3 smalltablet:w-4 smalltablet:h-4" />
                            <span className="hidden smalltablet:inline">다운로드</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

