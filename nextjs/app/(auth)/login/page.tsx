import React from "react";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 relative">
      <div className="w-full max-w-md relative z-10">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl text-gray-900 mb-2 font-black tracking-tight">
            로그인
          </h1>
          <p className="text-gray-600 font-semibold">
            제자들교회에 오신 것을 환영합니다
          </p>
        </div>
        
        <LoginForm />
      </div>
    </div>
  );
}

