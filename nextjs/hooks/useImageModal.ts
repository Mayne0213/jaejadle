"use client";

import { useState, useCallback, useEffect } from "react";

interface UseImageModalReturn {
  selectedIndex: number | null;
  isOpen: boolean;
  open: (index: number) => void;
  close: () => void;
  next: () => void;
  prev: () => void;
  goTo: (index: number) => void;
}

/**
 * 이미지 갤러리 모달을 관리하는 훅
 *
 * @param totalImages 전체 이미지 개수
 * @param options 추가 옵션
 *
 * @example
 * const { selectedIndex, isOpen, open, close, next, prev } = useImageModal(images.length);
 *
 * // 이미지 클릭 시
 * <div onClick={() => open(index)}>...</div>
 *
 * // 모달에서
 * {isOpen && (
 *   <Modal onClose={close}>
 *     <button onClick={prev}>이전</button>
 *     <img src={images[selectedIndex].url} />
 *     <button onClick={next}>다음</button>
 *   </Modal>
 * )}
 */
export function useImageModal(
  totalImages: number,
  options: {
    loop?: boolean;
    enableKeyboard?: boolean;
  } = {}
): UseImageModalReturn {
  const { loop = true, enableKeyboard = true } = options;
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const isOpen = selectedIndex !== null;

  const open = useCallback((index: number) => {
    setSelectedIndex(index);
  }, []);

  const close = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  const next = useCallback(() => {
    if (selectedIndex === null || totalImages === 0) return;

    if (loop) {
      setSelectedIndex((prev) =>
        prev !== null && prev < totalImages - 1 ? prev + 1 : 0
      );
    } else {
      setSelectedIndex((prev) =>
        prev !== null && prev < totalImages - 1 ? prev + 1 : prev
      );
    }
  }, [selectedIndex, totalImages, loop]);

  const prev = useCallback(() => {
    if (selectedIndex === null || totalImages === 0) return;

    if (loop) {
      setSelectedIndex((prev) =>
        prev !== null && prev > 0 ? prev - 1 : totalImages - 1
      );
    } else {
      setSelectedIndex((prev) =>
        prev !== null && prev > 0 ? prev - 1 : prev
      );
    }
  }, [selectedIndex, totalImages, loop]);

  const goTo = useCallback((index: number) => {
    if (index >= 0 && index < totalImages) {
      setSelectedIndex(index);
    }
  }, [totalImages]);

  // 키보드 네비게이션
  useEffect(() => {
    if (!enableKeyboard || !isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowLeft":
          prev();
          break;
        case "ArrowRight":
          next();
          break;
        case "Escape":
          close();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [enableKeyboard, isOpen, next, prev, close]);

  return {
    selectedIndex,
    isOpen,
    open,
    close,
    next,
    prev,
    goTo,
  };
}

export default useImageModal;
