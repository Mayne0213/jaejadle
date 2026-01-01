import Link from 'next/link';
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
              담임목사 : 김경한  |  주소 : 인천광역시 서구 고산후로 95번길 32 명진프라자 3층 / 4층
            </p>
            <Link href="/login" className="text-slate-500">
              <p>
                COPYRIGHT © 2026 제자들교회 DISCIPLES CHURCH. All rights reserved.
              </p>
            </Link>
          </div>

          {/* 아이콘들 */}
          <div className="flex items-center gap-4">
            <Link
              href="https://www.youtube.com/@Disciples2015"
              className="text-slate-100 hover:text-white transition-colors cursor-pointer flex flex-col items-center gap-1"
              aria-label="YouTube"
            >
              <Youtube className="w-6 h-6" />
              <span className='text-xs'>유튜브</span>
            </Link>
            <Link
              href="https://cafe.naver.com/discipling"
              className="text-slate-100 hover:text-white transition-colors cursor-pointer flex flex-col items-center gap-1"
              aria-label="Naver Cafe"
            >
              <Image
                src={cafeIcon}
                alt="Naver Cafe"
                width={24}
                height={24}
                placeholder="blur"
              />
              <span className='text-xs'>네이버 카페</span>
            </Link>
          </div>
          </div>
      </div>
    </footer>
  );
}