"use client";

import { useState, useEffect, useCallback } from "react";
import { getMe, type User } from "@/lib/services";

interface UseAuthOptions {
  /** 인증 실패 시 리다이렉트할 경로 */
  redirectTo?: string;
  /** 인증 필수 여부 (false면 인증 실패해도 에러 안 던짐) */
  required?: boolean;
}

interface UseAuthReturn {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  checkAuth: () => Promise<void>;
}

/**
 * 인증 상태를 관리하는 훅
 *
 * @example
 * // 기본 사용 (인증 선택적)
 * const { user, isLoading, isAuthenticated } = useAuth();
 *
 * @example
 * // 인증 필수 페이지
 * const { user, isLoading } = useAuth({
 *   required: true,
 *   redirectTo: '/login'
 * });
 */
export function useAuth(options: UseAuthOptions = {}): UseAuthReturn {
  const { redirectTo, required = false } = options;
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    try {
      const userData = await getMe();
      setUser(userData);
    } catch {
      setUser(null);
      if (required && redirectTo && typeof window !== "undefined") {
        window.location.href = redirectTo;
      }
    } finally {
      setIsLoading(false);
    }
  }, [required, redirectTo]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    checkAuth,
  };
}

export default useAuth;
