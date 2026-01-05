"use client";

import { useState, useCallback } from "react";

interface UsePaginationReturn {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  setTotalPages: (total: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  goToPage: (page: number) => void;
  isFirstPage: boolean;
  isLastPage: boolean;
  reset: () => void;
}

interface UsePaginationOptions {
  initialPage?: number;
  initialTotalPages?: number;
}

/**
 * 페이지네이션 상태를 관리하는 훅
 *
 * @example
 * const {
 *   currentPage,
 *   totalPages,
 *   setCurrentPage,
 *   setTotalPages,
 *   nextPage,
 *   prevPage
 * } = usePagination();
 *
 * // 데이터 로드 시
 * const result = await fetchData(currentPage);
 * setTotalPages(result.pagination.totalPages);
 *
 * // Pagination 컴포넌트와 함께
 * <Pagination
 *   currentPage={currentPage}
 *   totalPages={totalPages}
 *   onPageChange={setCurrentPage}
 * />
 */
export function usePagination(
  options: UsePaginationOptions = {}
): UsePaginationReturn {
  const { initialPage = 1, initialTotalPages = 1 } = options;

  const [currentPage, setCurrentPageState] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(initialTotalPages);

  const setCurrentPage = useCallback((page: number) => {
    if (page >= 1) {
      setCurrentPageState(page);
    }
  }, []);

  const nextPage = useCallback(() => {
    setCurrentPageState((prev) => (prev < totalPages ? prev + 1 : prev));
  }, [totalPages]);

  const prevPage = useCallback(() => {
    setCurrentPageState((prev) => (prev > 1 ? prev - 1 : prev));
  }, []);

  const goToPage = useCallback(
    (page: number) => {
      if (page >= 1 && page <= totalPages) {
        setCurrentPageState(page);
      }
    },
    [totalPages]
  );

  const reset = useCallback(() => {
    setCurrentPageState(initialPage);
    setTotalPages(initialTotalPages);
  }, [initialPage, initialTotalPages]);

  return {
    currentPage,
    totalPages,
    setCurrentPage,
    setTotalPages,
    nextPage,
    prevPage,
    goToPage,
    isFirstPage: currentPage === 1,
    isLastPage: currentPage === totalPages,
    reset,
  };
}

export default usePagination;
