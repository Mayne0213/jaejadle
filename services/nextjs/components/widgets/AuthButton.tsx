"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { getMe, type User } from "@/lib/services";

interface AuthButtonProps {
  isScrolled?: boolean;
}

const AuthButton = ({ isScrolled = true }: AuthButtonProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const userData = await getMe();
      setUser(userData);
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut({ redirect: false });
      setUser(null);
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center space-x-4 justify-center pc:justify-start w-full pc:w-auto">
        <div className="h-9 w-20 bg-gray-200 animate-pulse rounded-lg"></div>
      </div>
    );
  }

  if (user) {
    return (
      <div className="flex items-center gap-3">
        {/* 구분선 */}
        <div className={`h-6 w-px ${
          isScrolled 
            ? "bg-gray-300" 
            : "bg-white/30"
        }`} />
        
        <span className={`text-sm transition-colors ${
          isScrolled 
            ? "text-gray-600" 
            : "text-white/90"
        }`}>
          {user.userName}님
        </span>
        
        <button
          onClick={handleLogout}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
            isScrolled
              ? "text-gray-700 hover:text-gray-900 bg-gray-200 hover:bg-gray-300"
              : "text-white hover:text-gray-200 bg-white/10 hover:bg-white/20"
          }`}
        >
          로그아웃
        </button>
      </div>
    );
  }

  return (
      <Link
        href="/login"
        className="px-4 py-2 text-sm font-medium text-white bg-linear-to-br from-[#7ba5d6] to-[#6b95c6] hover:from-[#6b95c6] hover:to-[#5b85b6] rounded-lg shadow-md hover:shadow-lg transition-all"
      >
        로그인
      </Link>
  );
};

export default AuthButton;

