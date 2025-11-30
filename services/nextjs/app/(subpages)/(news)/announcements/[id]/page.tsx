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

  // 첨부 파일 파싱
  const parseAttachments = (content: string) => {
    const attachmentMatch = content.match(/\[첨부 파일\]([\s\S]*?)(?=\n\n|$)/);
    if (!attachmentMatch) return { mainContent: content, attachments: [] };

    const mainContent = content.replace(/\[첨부 파일\][\s\S]*$/, "").trim();
    const attachmentText = attachmentMatch[1].trim();
    
    const attachments = attachmentText.split("\n").map((line) => {
      const match = line.match(/^(.+?):\s*(https?:\/\/.+)$/);
      if (match) {
        return {
          name: match[1].trim(),
          url: match[2].trim(),
        };
      }
      return null;
    }).filter(Boolean) as { name: string; url: string }[];

    return { mainContent, attachments };
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

  const handleDownload = async (url: string, fileName: string) => {
    try {
      // S3 URL에서 fileKey 추출 (uploads/xxx 부분)
      const urlObj = new URL(url);
      const fileKey = decodeURIComponent(urlObj.pathname.substring(1)); // 맨 앞의 '/' 제거 및 URL 디코딩
      
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
  const { mainContent, attachments } = parseAttachments(announcement.content);

  return (
    <div className="w-full">
      <div className="py-12 px-4">
        <div className="max-w-4xl p-8 rounded-xl bg-gray-100 mx-auto">
          {/* 헤더 */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              {announcement.isImportant && (
                <span className="px-3 py-1 rounded-full text-sm font-semibold bg-red-100 text-red-700">
                  중요
                </span>
              )}
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {announcement.title}
            </h1>
            <div className="flex items-center justify-between text-sm text-gray-600 pb-4 border-b">
              <div className="flex items-center gap-4">
                <span>작성자: {announcement.author.userName}</span>
                <span>•</span>
                <span>{formatDate(announcement.createdAt)}</span>
                <span>•</span>
                <span>조회수: {announcement.viewCount}</span>
              </div>
              {isAuthor && (
                <div className="flex gap-2">
                  <button
                    onClick={handleDelete}
                    className="px-4 py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    삭제
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* 내용 */}
          <div className="prose max-w-none mb-8">
            <div className="text-gray-800 leading-relaxed whitespace-pre-wrap">
              {mainContent}
            </div>
          </div>

          {/* 첨부 파일 */}
          {attachments.length > 0 && (
            <div className="mb-12">
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  첨부 파일 ({attachments.length})
                </h3>
                <div className="space-y-3">
                  {attachments.map((file, index) => {
                    const FileIconComponent = getFileIcon(file.name);
                    const isImage = ["jpg", "jpeg", "png", "gif", "webp"].includes(
                      file.name.split(".").pop()?.toLowerCase() || ""
                    );

                    return (
                      <div
                        key={index}
                        className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-gray-50"
                      >
                        <div className="flex items-center gap-4">
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 bg-white rounded flex items-center justify-center">
                              <FileIconComponent
                                className={`w-6 h-6 ${
                                  isImage ? "text-blue-500" : "text-gray-500"
                                }`}
                              />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-800 truncate">
                              {file.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              클릭하여 다운로드
                            </p>
                          </div>
                          <button
                            onClick={() => handleDownload(file.url, file.name)}
                            className="flex-shrink-0 px-4 py-2 bg-gradient-to-br from-[#7ba5d6] to-[#6b95c6] hover:from-[#6b95c6] hover:to-[#5b85b6] text-white rounded-lg shadow-md hover:shadow-lg transition-all font-semibold flex items-center gap-2"
                          >
                            <Download className="w-4 h-4" />
                            다운로드
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

