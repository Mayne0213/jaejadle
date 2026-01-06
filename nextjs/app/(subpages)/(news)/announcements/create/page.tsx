"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { createAnnouncement, uploadFile } from "@/lib/services";
import { useAuth } from "@/hooks";
import ImageUpload, { PendingImage } from "@/components/ImageUpload";

interface AnnouncementFormData {
  title: string;
  isImportant: boolean;
}

export default function CreateAnnouncementPage() {
  const [pendingImages, setPendingImages] = useState<PendingImage[]>([]);
  const router = useRouter();

  const { user, isLoading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AnnouncementFormData>({
    defaultValues: {
      title: "",
      isImportant: false,
    },
  });

  // 로그인하지 않은 경우 리다이렉트
  useEffect(() => {
    if (!isLoading && !user) {
      alert("로그인이 필요합니다.");
      router.push("/login");
    }
  }, [isLoading, user, router]);

  const onSubmit = async (data: AnnouncementFormData) => {
    if (!user) return;

    try {
      // 이미지 업로드
      let uploadedFiles: {
        fileKey: string;
        fileName: string;
        fileSize: number;
        mimeType: string;
      }[] = [];

      if (pendingImages.length > 0) {
        const sortedImages = [...pendingImages].sort((a, b) => a.order - b.order);
        const uploadPromises = sortedImages.map(async (img) => {
          const result = await uploadFile(img.file, "/announcement");
          return {
            fileKey: result.fileKey,
            fileName: img.file.name,
            fileSize: img.file.size,
            mimeType: img.file.type,
          };
        });
        uploadedFiles = await Promise.all(uploadPromises);
      }

      await createAnnouncement({
        ...data,
        content: "", // 내용 필드는 빈 문자열로 전송
        authorId: user.id,
        files: uploadedFiles.length > 0 ? uploadedFiles : undefined,
      });

      // 미리보기 URL 정리
      pendingImages.forEach((img) => {
        if (img.preview) URL.revokeObjectURL(img.preview);
      });

      alert("주보가 등록되었습니다.");
      router.push("/announcements");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "주보 등록에 실패했습니다.";
      alert(errorMessage);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white w-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white w-full">
      <div className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full">
            {/* 제목 */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                제목 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register("title", {
                  required: "제목을 입력해주세요",
                  minLength: {
                    value: 2,
                    message: "제목은 2자 이상이어야 합니다",
                  },
                })}
                disabled={isSubmitting}
                placeholder="제목을 입력해주세요"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent disabled:opacity-50 transition-all ${
                  errors.title
                    ? "border-red-300 focus:ring-red-400"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* 중요 공지 체크박스 */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isImportant"
                {...register("isImportant")}
                disabled={isSubmitting}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
              />
              <label
                htmlFor="isImportant"
                className="ml-2 text-sm font-medium text-gray-700"
              >
                중요 공지로 표시
              </label>
            </div>

            {/* 이미지 업로드 */}
            <ImageUpload
              images={pendingImages}
              onImagesChange={setPendingImages}
              disabled={isSubmitting}
            />

            {/* 버튼 */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-6 py-3 bg-linear-to-br from-[#7ba5d6] to-[#6b95c6] hover:from-[#6b95c6] hover:to-[#5b85b6] text-white rounded-lg shadow-md hover:shadow-lg transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "등록 중..." : "등록하기"}
              </button>
              <button
                type="button"
                onClick={() => router.back()}
                disabled={isSubmitting}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-semibold disabled:opacity-50"
              >
                취소
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
