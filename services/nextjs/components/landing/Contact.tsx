import { MapPin, Youtube } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-16 smalltablet:py-20 pc:py-24 bg-white">
      <div className="relative max-w-7xl mx-auto px-4 smalltablet:px-6 pc:px-8">
        {/* vertical dividers (pc+) */}
        <div className="hidden pc:block">
          <div
            className="absolute top-0 bottom-0 bg-gray-200"
            style={{ left: "33.3333%", width: 1 }}
          />
          <div
            className="absolute top-0 bottom-0 bg-gray-200"
            style={{ left: "66.6666%", width: 1 }}
          />
          {/* red accent bars near top */}
          <div
            className="absolute top-6 bg-[#6b95c6]"
            style={{ left: "33.3333%", width: 3, height: 70, transform: "translateX(-1px)" }}
          />
          <div
            className="absolute top-6 bg-[#6b95c6]"
            style={{ left: "66.6666%", width: 3, height: 70, transform: "translateX(-1px)" }}
          />
        </div>

        <div className="grid pc:grid-cols-3 gap-10 smalltablet:gap-12 pc:gap-0 items-start">
          {/* Left: Title & description */}
          <div className="pr-0 pc:pr-12">
            <h2 className="text-3xl smalltablet:text-4xl pc:text-5xl font-black tracking-tight text-gray-900 mb-6 smalltablet:mb-8">
              Contact Us
            </h2>
            <p className="text-base smalltablet:text-lg pc:text-xl leading-7 smalltablet:leading-8 text-gray-500 max-w-[680px]">
              제자들교회는 언제나 여러분을 환영합니다.
              <br className="hidden smalltablet:block" />
              궁금하신 사항이나 기도제목이 있으시면 언제든 문의하세요.
            </p>
          </div>

          {/* Middle: 오시는 길 */}
          <div className="text-center">
            <button className="w-full rounded-xl p-6 smalltablet:p-8 pc:p-10 flex flex-col items-center transition-all duration-300 hover:-translate-y-1 cursor-pointer">
              <div className="w-24 h-24 smalltablet:w-28 smalltablet:h-28 rounded-full bg-gray-100 flex items-center justify-center mb-6 smalltablet:mb-8 transition-colors duration-300 hover:bg-[#6b95c6] group">
                <MapPin className="w-9 h-9 smalltablet:w-10 smalltablet:h-10 text-gray-700 group-hover:text-white transition-colors duration-300" strokeWidth={2} />
              </div>
              <h3 className="text-2xl smalltablet:text-3xl font-extrabold text-gray-900 mb-3 smalltablet:mb-4">오시는 길</h3>
              <p className="text-gray-500 text-base smalltablet:text-lg leading-7 smalltablet:leading-8">
                서울특별시 강남구 테헤란로 1234
              </p>
            </button>
          </div>

          {/* Right: 유튜브 소개 */}
          <div className="text-center">
            <button className="w-full rounded-xl p-6 smalltablet:p-8 pc:p-10 flex flex-col items-center transition-all duration-300 hover:-translate-y-1 cursor-pointer">
              <div className="w-24 h-24 smalltablet:w-28 smalltablet:h-28 rounded-full bg-gray-100 flex items-center justify-center mb-6 smalltablet:mb-8 transition-colors duration-300 hover:bg-[#6b95c6] group">
                <Youtube className="w-9 h-9 smalltablet:w-10 smalltablet:h-10 text-gray-700 group-hover:text-white transition-colors duration-300" strokeWidth={2} />
              </div>
              <h3 className="text-2xl smalltablet:text-3xl font-extrabold text-gray-900 mb-3 smalltablet:mb-4">유튜브 소개</h3>
              <p className="text-gray-500 text-base smalltablet:text-lg leading-7 smalltablet:leading-8">
                제자들교회의 유튜브 채널에서
                <br />설교와 다양한 영상을 만나보세요
              </p>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
