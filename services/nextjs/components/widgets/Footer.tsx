import Link from "next/link";
import { getNavbarTabs } from "@/lib/tabs";

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="max-w-[1400px] mx-auto px-6 py-12">
        {/* 네비게이션 링크 */}
        <div className="flex flex-wrap justify-center gap-8 mb-8">
          {getNavbarTabs().map((tab) => (
            <Link
              key={tab.href}
              href={tab.href}
              className="text-slate-300 hover:text-white transition-colors"
            >
              {tab.label}
            </Link>
          ))}
          <Link href="/login" className="text-slate-300 hover:text-white transition-colors">
            로그인
          </Link>
        </div>

        {/* 구분선 */}
        <div className="border-t border-slate-700 my-8"></div>

        {/* 하단 정보 */}
        <div className="space-y-4 text-sm text-slate-400">
          <p>
            제자들교회  |  담임목사 : 김성훈  |  대표전화 : 02-1234-5678  |  FAX : 02-1234-5679  |  E-MAIL : info@disciples.or.kr
          </p>
          <p>
            주소 : 서울특별시 강남구 테헤란로 123  |  고유번호 : 123-45-67890
          </p>
          <p className="text-slate-500">
            COPYRIGHT © 2025 제자들교회 DISCIPLES CHURCH. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

