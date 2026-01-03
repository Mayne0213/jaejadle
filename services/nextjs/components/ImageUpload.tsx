"use client";

import React, { useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { X, Upload, ArrowUp, ArrowDown } from "lucide-react";

export interface PendingImage {
  id: string;
  file: File;
  preview: string;
  order: number;
}

interface ImageUploadProps {
  images: PendingImage[];
  onImagesChange: (images: PendingImage[]) => void;
  disabled?: boolean;
  maxSizeMB?: number;
  accept?: string;
  showOrder?: boolean;
}

const DEFAULT_ACCEPTED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const DEFAULT_ACCEPTED_EXTENSIONS = ".jpg,.jpeg,.png,.webp";

export default function ImageUpload({
  images,
  onImagesChange,
  disabled = false,
  maxSizeMB = 10,
  accept = DEFAULT_ACCEPTED_EXTENSIONS,
  showOrder = true,
}: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateAndAddFiles = useCallback(
    (files: File[]) => {
      const maxSize = maxSizeMB * 1024 * 1024;

      // 이미지 파일만 필터링
      const validFiles = files.filter((file) => {
        if (!DEFAULT_ACCEPTED_TYPES.includes(file.type)) {
          return false;
        }
        if (file.size > maxSize) {
          alert(`파일 크기는 ${maxSizeMB}MB를 초과할 수 없습니다: ${file.name}`);
          return false;
        }
        return true;
      });

      if (validFiles.length === 0) return;

      const newImages: PendingImage[] = validFiles.map((file, index) => ({
        id: `img-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        file,
        preview: URL.createObjectURL(file),
        order: images.length + index,
      }));

      onImagesChange([...images, ...newImages]);
    },
    [images, onImagesChange, maxSizeMB]
  );

  // 클립보드 붙여넣기 핸들러
  useEffect(() => {
    const handlePaste = async (e: ClipboardEvent) => {
      if (disabled) return;

      const clipboardItems = e.clipboardData?.items;
      if (!clipboardItems) return;

      const imageFiles: File[] = [];

      for (const item of Array.from(clipboardItems)) {
        // 직접 이미지 파일인 경우
        if (item.type.startsWith("image/")) {
          const file = item.getAsFile();
          if (file) {
            imageFiles.push(file);
          }
        }
      }

      if (imageFiles.length > 0) {
        e.preventDefault();
        validateAndAddFiles(imageFiles);
      }
    };

    document.addEventListener("paste", handlePaste);
    return () => document.removeEventListener("paste", handlePaste);
  }, [disabled, validateAndAddFiles]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles || selectedFiles.length === 0) return;

    validateAndAddFiles(Array.from(selectedFiles));
    e.target.value = "";
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (disabled) return;

    const droppedFiles = Array.from(e.dataTransfer.files);
    validateAndAddFiles(droppedFiles);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const removeImage = (id: string) => {
    const image = images.find((img) => img.id === id);
    if (image?.preview) {
      URL.revokeObjectURL(image.preview);
    }
    const newImages = images
      .filter((img) => img.id !== id)
      .map((img, index) => ({ ...img, order: index }));
    onImagesChange(newImages);
  };

  const moveImage = (id: string, direction: "up" | "down") => {
    const index = images.findIndex((img) => img.id === id);
    if (index === -1) return;

    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= images.length) return;

    const newImages = [...images];
    [newImages[index], newImages[newIndex]] = [newImages[newIndex], newImages[index]];

    // order 재정렬
    const reorderedImages = newImages.map((img, idx) => ({
      ...img,
      order: idx,
    }));
    onImagesChange(reorderedImages);
  };

  const sortedImages = [...images].sort((a, b) => a.order - b.order);

  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        이미지 첨부
      </label>

      {/* 업로드 영역 */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          disabled
            ? "border-gray-200 bg-gray-50 cursor-not-allowed"
            : "border-gray-300 hover:border-blue-400 cursor-pointer"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple
          onChange={handleFileChange}
          disabled={disabled}
          className="hidden"
          id="image-upload"
        />
        <label
          htmlFor="image-upload"
          className={`flex flex-col items-center ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}
        >
          <Upload className="w-12 h-12 text-gray-400 mb-3" />
          <p className="text-gray-600 mb-1">
            클릭하여 이미지를 선택하거나 드래그하세요
          </p>
          <p className="text-sm text-blue-600 font-medium mb-1">
            Ctrl+V로 이미지 붙여넣기 가능
          </p>
          <p className="text-xs text-gray-500">
            JPG, PNG, WebP 형식 지원 (최대 {maxSizeMB}MB)
          </p>
        </label>
      </div>

      {/* 이미지 목록 */}
      {sortedImages.length > 0 && (
        <div className="mt-4 space-y-3">
          <p className="text-sm font-medium text-gray-700">
            선택된 이미지 ({sortedImages.length})
          </p>
          <div className="space-y-3">
            {sortedImages.map((img, index) => (
              <div
                key={img.id}
                className="border border-gray-300 rounded-lg p-3 bg-white"
              >
                <div className="flex items-start gap-3">
                  {showOrder && (
                    <span className="text-sm text-gray-500 font-medium pt-2 min-w-[24px]">
                      {index + 1}
                    </span>
                  )}
                  <div className="flex-1">
                    <div className="relative w-full bg-gray-100 rounded-lg overflow-hidden">
                      <Image
                        src={img.preview}
                        alt={`미리보기 ${index + 1}`}
                        width={1200}
                        height={800}
                        className="w-full h-auto object-contain max-h-[300px]"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1 truncate">
                      {img.file.name} ({(img.file.size / 1024).toFixed(1)} KB)
                    </p>
                  </div>
                  <div className="flex flex-col gap-1 pt-2">
                    <button
                      type="button"
                      onClick={() => moveImage(img.id, "up")}
                      disabled={index === 0 || disabled}
                      className="p-1 text-gray-600 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed"
                      title="위로 이동"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveImage(img.id, "down")}
                      disabled={index === sortedImages.length - 1 || disabled}
                      className="p-1 text-gray-600 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed"
                      title="아래로 이동"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeImage(img.id)}
                      disabled={disabled}
                      className="p-1 text-red-600 hover:text-red-800 disabled:opacity-50"
                      title="삭제"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// 이미지 추가 함수 (외부에서 사용 가능) - Gallery에서 붙여넣기 연동용
export function createPendingImage(file: File, currentLength: number): PendingImage {
  return {
    id: `img-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    file,
    preview: URL.createObjectURL(file),
    order: currentLength,
  };
}

// 붙여넣기 이벤트에서 이미지 파일 추출
export function extractImagesFromClipboard(e: ClipboardEvent): File[] {
  const clipboardItems = e.clipboardData?.items;
  if (!clipboardItems) return [];

  const imageFiles: File[] = [];
  for (const item of Array.from(clipboardItems)) {
    if (item.type.startsWith("image/")) {
      const file = item.getAsFile();
      if (file) {
        imageFiles.push(file);
      }
    }
  }
  return imageFiles;
}
