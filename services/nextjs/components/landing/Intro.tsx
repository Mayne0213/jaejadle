import Image from "next/image";
import Link from "next/link";
import introImage1 from "@/public/home/intro/church1.webp";
import introImage2 from "@/public/home/intro/church2.webp";
import introImage3 from "@/public/home/intro/pray.webp";

export default function Intro() {
  const items = [
    {
      image: introImage1,
      title: "주일 설교",
      subtitle: "Sunday Sermon",
      category: "sermon",
    },
    {
      image: introImage2,
      title: "주일 찬양",
      subtitle: "Sunday Worship",
      category: "praise",
    },
    {
      image: introImage3,
      title: "금요 성령집회",
      subtitle: "Friday Meeting",
      category: "friday",
    }
  ];

  return (
    <section id="intro" className="py-16 smalltablet:py-20 pc:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 smalltablet:px-6 pc:px-8">
        <div className="flex flex-col smalltablet:flex-row justify-between smalltablet:items-end gap-6 smalltablet:gap-4 mb-12 smalltablet:mb-16">
          <div>
            <h2 className="text-3xl smalltablet:text-4xl pc:text-5xl font-black text-gray-800 mb-2 tracking-tight">Worship services.</h2>
            <p className="text-gray-600 text-lg smalltablet:text-xl font-semibold">금주의 예배와 찬양</p>
          </div>
        </div>

        <div className="grid grid-cols-2 smalltablet:grid-cols-2 pc:grid-cols-3 gap-3 smalltablet:gap-4 pc:gap-8 smalltablet:max-w-2xl smalltablet:mx-auto pc:max-w-7xl">
          {/* 첫 번째 항목 (주일 설교) - 모바일/태블릿에서 전체 너비 */}
          <Link 
            href={`/worship?category=${items[0].category}`}
            className={`group hover:cursor-pointer rounded-2xl smalltablet:rounded-3xl p-8 smalltablet:p-10 relative overflow-hidden hover:shadow-xl transition-shadow col-span-2 row-span-2 aspect-2/1 pc:col-span-1 pc:row-span-1 pc:aspect-square block`}
          >
            {/* 배경 이미지 레이어 */}
            <Image
              src={items[0].image}
              alt={items[0].title}
              fill
              placeholder="blur"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {/* 검은색 오버레이 */}
            <div className="absolute inset-0 z-10 bg-black opacity-50 group-hover:opacity-20 transition-opacity"/>
            
            {/* 컨텐츠 */}
            <div className="absolute inset-0 z-20 flex flex-col justify-center items-center">
              {/* 텍스트 */}
              <div className="flex flex-col justify-center items-center w-full">
                <h3 className="text-2xl smalltablet:text-3xl pc:text-5xl font-extrabold text-white mb-0 smalltablet:mb-3 text-center smalltablet:text-left">
                  {items[0].title}
                </h3>
                <h4 className="smalltablet:block text-lg smalltablet:text-xl font-bold text-white mb-3 smalltablet:mb-3 pc:mb-6">
                  {items[0].subtitle}
                </h4>
              </div>
            </div>

            {/* 오른쪽 아래 화살표 */}
            <div className="hidden smalltablet:block absolute bottom-5 right-5 smalltablet:bottom-6 smalltablet:right-6 z-20">
              <svg className="w-6 h-6 smalltablet:w-8 smalltablet:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </Link>

          {/* 나머지 두 항목 - 모바일/태블릿에서 각각 한 줄씩 */}
          {items.slice(1).map((item, index) => (
            <Link 
              key={index + 1}
              href={`/worship?category=${item.category}`}
              className="group hover:cursor-pointer rounded-2xl smalltablet:rounded-3xl p-8 smalltablet:p-10 relative overflow-hidden hover:shadow-xl transition-shadow col-span-1 aspect-square pc:col-span-1 pc:aspect-square block"
            >
              {/* 배경 이미지 레이어 */}
              <Image
                src={item.image}
                alt={item.title}
                fill
                placeholder="blur"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* 검은색 오버레이 */}
              <div className="absolute inset-0 z-10 bg-black opacity-50 group-hover:opacity-20 transition-opacity"/>
              
              {/* 컨텐츠 */}
              <div className="absolute inset-0 z-20 flex flex-col justify-center items-center ">
                {/* 텍스트 */}
                <div className="flex flex-col justify-center items-center w-full">
                  <h3 className="text-2xl smalltablet:text-3xl pc:text-5xl font-extrabold text-white mb-0 smalltablet:mb-3 text-center smalltablet:text-left">
                    {item.title}
                  </h3>
                  <h4 className="smalltablet:block text-lg smalltablet:text-xl font-bold text-white mb-3 smalltablet:mb-3 pc:mb-6">
                    {item.subtitle}
                  </h4>
                </div>
              </div>

              {/* 오른쪽 아래 화살표 */}
              <div className="hidden smalltablet:block absolute bottom-5 right-5 smalltablet:bottom-6 smalltablet:right-6 z-20">
                <svg className="w-6 h-6 smalltablet:w-8 smalltablet:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

