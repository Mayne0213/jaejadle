"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import {
  getAnnouncementById,
  deleteAnnouncement,
  getDownloadUrl,
  type Announcement,
  type AnnouncementFile,
} from "@/lib/services";
import { useAuth, useImageModal } from "@/hooks";
import { Download } from "lucide-react";

const IMAGE_EXTENSIONS = ["jpg", "jpeg", "png", "webp"];

export default function AnnouncementDetailPage() {
  const [announcement, setAnnouncement] = useState<Announcement | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const { user } = useAuth();

  // 이미지 파일만 필터링 (API에서 signedUrl 포함)
  const imageFiles = useMemo(() => {
    if (!announcement?.files) return [];
    return announcement.files.filter((file) => {
      const ext = file.fileName.split(".").pop()?.toLowerCase();
      return IMAGE_EXTENSIONS.includes(ext || "") && file.signedUrl;
    }) as (AnnouncementFile & { signedUrl: string })[];
  }, [announcement?.files]);

  const { selectedIndex, isOpen, open, close, next, prev } = useImageModal(imageFiles.length);

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const loadData = async () => {
    try {
      // 공지사항 상세 불러오기 (signedUrl 포함)
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

  const handleDownloadAll = async () => {
    for (const img of imageFiles) {
      try {
        const downloadUrl = await getDownloadUrl(img.fileKey, img.fileName);
        window.open(downloadUrl, '_blank');
      } catch (error) {
        console.error("Download failed:", error);
      }
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
        <div className="max-w-7xl p-4 smalltablet:p-6 pc:p-8 rounded-xl bg-gray-100 mx-auto">
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

          {/* 이미지 갤러리 */}
          {imageFiles.length > 0 && (
            <div className="space-y-4 mb-6">
              {imageFiles.map((img, index) => (
                <div
                  key={img.id}
                  className="relative w-full bg-gray-200 rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => open(index)}
                >
                  <Image
                    src={img.signedUrl}
                    alt={`${announcement.title} - ${index + 1}`}
                    width={1200}
                    height={800}
                    className="w-full h-auto object-contain"
                  />
                </div>
              ))}

              {/* 전체 다운로드 버튼 */}
              <button
                onClick={handleDownloadAll}
                className="w-full px-4 py-3 bg-linear-to-br from-[#7ba5d6] to-[#6b95c6] hover:from-[#6b95c6] hover:to-[#5b85b6] text-white rounded-lg shadow-md hover:shadow-lg transition-all font-semibold flex items-center justify-center gap-2 text-sm"
              >
                <Download className="w-4 h-4" />
                <span>이미지 다운로드 ({imageFiles.length})</span>
              </button>
            </div>
          )}

          {/* 이미지가 없는 경우 */}
          {imageFiles.length === 0 && (
            <div className="text-center text-gray-500 py-8">
              첨부된 이미지가 없습니다.
            </div>
          )}
        </div>
      </div>

      {/* 이미지 모달 */}
      {isOpen && selectedIndex !== null && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
          onClick={close}
        >
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-4xl hover:text-gray-300 z-10"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
          >
            &lsaquo;
          </button>

          <div className="relative max-w-7xl max-h-[90vh] w-full h-full mx-16">
            {imageFiles[selectedIndex]?.signedUrl && (
              <Image
                src={imageFiles[selectedIndex].signedUrl}
                alt={`${announcement.title} - ${selectedIndex + 1}`}
                fill
                className="object-contain"
              />
            )}
          </div>

          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-4xl hover:text-gray-300 z-10"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
          >
            &rsaquo;
          </button>

          <button
            className="absolute top-4 right-4 text-white text-3xl hover:text-gray-300"
            onClick={close}
          >
            &times;
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-xs smalltablet:text-sm">
            {selectedIndex + 1} / {imageFiles.length}
          </div>
        </div>
      )}
    </div>
  );
}

