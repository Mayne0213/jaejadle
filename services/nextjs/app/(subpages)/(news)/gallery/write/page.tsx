"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { uploadGalleryFiles, createGalleryPost, calculateImageAspectRatio } from "@/lib/services";
import FileUpload, { PendingFile } from "@/components/FileUpload";
import { X, ArrowUp, ArrowDown, Plus } from "lucide-react";

type ContentItem =
  | { type: "image"; id: string; file: File; preview: string; order: number }
  | { type: "text"; id: string; content: string; order: number };

export default function GalleryWritePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [items, setItems] = useState<ContentItem[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const addImages = (files: File[]) => {
    const newItems: ContentItem[] = files.map((file) => ({
      type: "image",
      id: `img-${Date.now()}-${Math.random()}`,
      file,
      preview: URL.createObjectURL(file),
      order: items.length,
    }));
    setItems([...items, ...newItems]);
  };

  const addTextBlock = () => {
    const newItem: ContentItem = {
      type: "text",
      id: `text-${Date.now()}-${Math.random()}`,
      content: "",
      order: items.length,
    };
    setItems([...items, newItem]);
  };

  const removeItem = (id: string) => {
    const newItems = items.filter((item) => item.id !== id);
    // order 재정렬
    const reorderedItems = newItems.map((item, index) => ({
      ...item,
      order: index,
    }));
    setItems(reorderedItems);
  };

  const moveItem = (id: string, direction: "up" | "down") => {
    const index = items.findIndex((item) => item.id === id);
    if (index === -1) return;

    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= items.length) return;

    const newItems = [...items];
    [newItems[index], newItems[newIndex]] = [newItems[newIndex], newItems[index]];
    
    // order 재정렬
    const reorderedItems = newItems.map((item, idx) => ({
      ...item,
      order: idx,
    }));
    setItems(reorderedItems);
  };

  const updateTextContent = (id: string, content: string) => {
    setItems(
      items.map((item) =>
        item.id === id && item.type === "text" ? { ...item, content } : item
      )
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("제목을 입력해주세요.");
      return;
    }

    const imageItems = items.filter((item) => item.type === "image");
    if (imageItems.length === 0) {
      alert("최소 1개 이상의 이미지를 업로드해주세요.");
      return;
    }

    setSubmitting(true);
    try {
      // 이미지 파일 업로드
      const imageFiles = imageItems.map((item) =>
        item.type === "image" ? item.file : null
      ).filter((f): f is File => f !== null);
      
      const fileKeys = await uploadGalleryFiles(imageFiles);

      // 이미지 비율 계산
      const imageAspectRatios = await Promise.all(
        imageFiles.map((file) => calculateImageAspectRatio(file))
      );

      // fileKeys와 비율을 이미지 아이템에 매핑
      let fileKeyIndex = 0;
      const itemsWithFileKeys = items.map((item) => {
        if (item.type === "image") {
          return {
            type: "image" as const,
            fileKey: fileKeys[fileKeyIndex],
            order: item.order,
            aspectRatio: imageAspectRatios[fileKeyIndex++],
          };
        } else {
          return {
            type: "text" as const,
            content: item.content,
            order: item.order,
          };
        }
      });

      // 갤러리 포스트 생성
      await createGalleryPost({
        title: title.trim(),
        content: content.trim(),
        items: itemsWithFileKeys,
      });

      // 미리보기 URL 정리
      items.forEach((item) => {
        if (item.type === "image" && item.preview) {
          URL.revokeObjectURL(item.preview);
        }
      });

      router.push("/gallery");
    } catch (error) {
      console.error("Submit failed:", error);
      alert("등록에 실패했습니다.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <div className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 제목 */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                제목 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={submitting}
                placeholder="제목을 입력해주세요"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 transition-all"
              />
            </div>

            {/* 콘텐츠 목록 */}
            <div className="space-y-4">
              {items.length === 0 ? (
                <div className="text-center py-12 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
                  이미지나 텍스트를 추가해주세요
                </div>
              ) : (
                items
                  .sort((a, b) => a.order - b.order)
                  .map((item, index) => (
                    <div
                      key={item.id}
                      className="border border-gray-300 rounded-lg p-4 bg-white"
                    >
                      <div className="flex items-start gap-4">
                        <span className="text-sm text-gray-500 font-medium pt-2 min-w-[24px]">
                          {index + 1}
                        </span>
                        <div className="flex-1">
                          {item.type === "image" ? (
                            <div className="relative w-full bg-gray-100 rounded-lg overflow-hidden">
                              <Image
                                src={item.preview}
                                alt="미리보기"
                                width={1200}
                                height={800}
                                className="w-full h-auto object-contain"
                              />
                            </div>
                          ) : (
                            <textarea
                              value={item.content}
                              onChange={(e) =>
                                updateTextContent(item.id, e.target.value)
                              }
                              disabled={submitting}
                              placeholder="텍스트를 입력하세요"
                              rows={4}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 transition-all resize-none"
                            />
                          )}
                        </div>
                        <div className="flex flex-col gap-1 pt-2">
                          <button
                            type="button"
                            onClick={() => moveItem(item.id, "up")}
                            disabled={index === 0 || submitting}
                            className="p-1 text-gray-600 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed"
                            title="위로 이동"
                          >
                            <ArrowUp className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => moveItem(item.id, "down")}
                            disabled={index === items.length - 1 || submitting}
                            className="p-1 text-gray-600 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed"
                            title="아래로 이동"
                          >
                            <ArrowDown className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            disabled={submitting}
                            className="p-1 text-red-600 hover:text-red-800 disabled:opacity-50"
                            title="삭제"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
              )}
            </div>

            {/* 콘텐츠 추가 버튼 */}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  const input = document.createElement("input");
                  input.type = "file";
                  input.accept = "image/*";
                  input.multiple = true;
                  input.onchange = (e) => {
                    const files = Array.from(
                      (e.target as HTMLInputElement).files || []
                    );
                    if (files.length > 0) {
                      addImages(files);
                    }
                    // 같은 파일을 다시 선택해도 이벤트가 발생하도록 value 초기화
                    input.value = '';
                  };
                  input.click();
                }}
                disabled={submitting}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                이미지 추가
              </button>

              <button
                type="button"
                onClick={addTextBlock}
                disabled={submitting}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                텍스트 추가
              </button>

            </div>
            {/* 버튼 */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 px-6 py-3 bg-linear-to-br from-[#7ba5d6] to-[#6b95c6] hover:from-[#6b95c6] hover:to-[#5b85b6] text-white rounded-lg shadow-md hover:shadow-lg transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? "등록 중..." : "등록하기"}
              </button>
              <button
                type="button"
                onClick={() => router.back()}
                disabled={submitting}
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
