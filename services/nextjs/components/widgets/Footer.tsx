import { Youtube } from 'lucide-react';
import Image from 'next/image';
import cafeIcon from '@/public/footer/cafe.webp';

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="mx-auto px-6 py-8">
        <div className="flex flex-col gap-4">
          {/* 하단 정보 */}
          <div className="space-y-2 text-sm text-slate-400">
            <p>
              담임목사 : 김경한  |  주소 : 인천광역시 서구 고산후로 95번길 32 명진프라자 3층
            </p>
            <p className="text-slate-500">
              COPYRIGHT © 2026 제자들교회 DISCIPLES CHURCH. All rights reserved.
            </p>
          </div>

          {/* 아이콘들 */}
          <div className="flex items-center gap-4">
            <a
              href="https://www.youtube.com/@Disciples2015"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-100 hover:text-white transition-colors cursor-pointer"
              aria-label="YouTube"
            >
              <Youtube className="w-6 h-6" />
            </a>
            <a
              href="https://cafe.naver.com/discipling"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-100 hover:text-white transition-colors cursor-pointer"
              aria-label="Naver Cafe"
            >
              <Image
                src={cafeIcon}
                alt="Naver Cafe"
                width={36}
                height={36}
                className="w-10 h-10"
              />
            </a>
          </div>
          </div>
      </div>
    </footer>
  );
}