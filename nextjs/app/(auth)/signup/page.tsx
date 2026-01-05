import React from "react";
import SignUpForm from "@/components/auth/SignUpForm";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 relative">
      <div className="w-full max-w-md relative z-10 py-12">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl text-gray-900 mb-2 font-black tracking-tight">
            회원가입
          </h1>
          <p className="text-gray-600 font-semibold">
            제자들교회와 함께하세요
          </p>
        </div>

        <SignUpForm />

        {/* Bottom Text */}
        <div className="text-center mt-6">
          <p className="text-xs text-gray-500">
            회원가입을 진행하시면{" "}
            <button className="text-[#6b95c6] hover:underline font-medium">
              이용약관
            </button>
            과{" "}
            <button className="text-[#6b95c6] hover:underline font-medium">
              개인정보처리방침
            </button>
            에 동의하는 것으로 간주됩니다.
          </p>
        </div>
      </div>
    </div>
  );
}

