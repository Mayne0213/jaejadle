"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

const AuthButton = ({ 
  shouldShowScrolled = false,
  onLinkClick
}: { 
  shouldShowScrolled: boolean;
  onLinkClick?: () => void;
}) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut({ redirect: false });
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (status === "loading") {
    return (
      <div className="flex items-center">
        <div className="h-9 w-18 bg-gray-400 animate-pulse rounded-lg"/>
      </div>
    );
  }

  if (session?.user) {
    return (
      <div className="flex items-center gap-3">
        {/* 구분선 */}
        <div className={`h-6 w-px transition-colors ${
          shouldShowScrolled
            ? "bg-gray-300" 
            : "bg-white/30 pc:group-hover:bg-gray-300"
        }`} />
        
        <span className={`text-sm transition-colors ${
          shouldShowScrolled
            ? "text-gray-600" 
            : "text-white/90 pc:group-hover:text-gray-600"
        }`}>
          {session.user.name}님
        </span>
        
        <button
          onClick={handleLogout}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
            shouldShowScrolled
              ? "text-gray-700 hover:text-gray-900 bg-gray-200 hover:bg-gray-300"
              : "text-white hover:text-gray-200 bg-white/10 hover:bg-white/20 pc:group-hover:text-gray-700 pc:group-hover:bg-gray-200 pc:group-hover:hover:text-gray-900 pc:group-hover:hover:bg-gray-300"
          }`}
        >
          로그아웃
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center">
      <Link
        href="/login"
        onClick={onLinkClick}
        className="px-4 py-2 w-18 text-center text-sm font-medium text-white bg-linear-to-br from-[#7ba5d6] to-[#6b95c6] hover:from-[#6b95c6] hover:to-[#5b85b6] rounded-lg shadow-md hover:shadow-lg transition-all"
      >
        로그인
      </Link>
    </div>
  );
};

export default AuthButton;

