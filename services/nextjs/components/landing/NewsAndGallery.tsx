"use client";
import Image from "next/image";
import galleryImage1 from "@/public/home/newsAndGallery/image.webp";
import galleryImage2 from "@/public/home/newsAndGallery/image2.webp";
import galleryImage3 from "@/public/home/newsAndGallery/image3.webp";
import galleryImage4 from "@/public/home/newsAndGallery/image4.webp";

export default function NewsAndGallery() {

  const newsItems = [
    {
      day: "23",
      date: "2025.10",
      title: "달란트 잔치가 있어요",
      description: "교회 공지사항을 확인하실 수 있습니다..."
    },
    {
      day: "23",
      date: "2025.10",
      title: "달란트 잔치가 있어요",
      description: "교회 공지사항을 확인하실 수 있습니다..."
    },
    {
      day: "23",
      date: "2025.10",
      title: "달란트 잔치가 있어요",
      description: "교회 공지사항을 확인하실 수 있습니다..."
    },
    {
      day: "22",
      date: "2025.09",
      title: "제자들교회 공지사항게시판 샘플게시...",
      description: "교회 공지사항을 확인하실 수 있습니다..."
    },
    {
      day: "22",
      date: "2025.08",
      title: "새로운 소식이 있습니다.",
      description: "교회 행사와 안내사항을 공유합니다..."
    },
    {
      day: "17",
      date: "2025.07",
      title: "여름 수련회 안내",
      description: "청년부 여름 수련회에 많은 참여 부탁드립니다..."
    }
  ];

  

  const images = [
    { id: 1, category: "worship", title: "주일 예배", date: "2025.01.15", src: galleryImage1 },
    { id: 2, category: "event", title: "성탄절 행사", date: "2024.12.25", src: galleryImage2 },
    { id: 3, category: "mission", title: "해외 선교", date: "2024.11.10", src: galleryImage3 },
    { id: 4, category: "worship", title: "수요 예배", date: "2025.01.10", src: galleryImage4 }
  ];

  

  return (
    <section className="py-16 smalltablet:py-20 pc:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 smalltablet:px-6 pc:px-8">
        <div className="grid pc:grid-cols-2 gap-10 smalltablet:gap-12">
          {/* 왼쪽: 소식 */}
          <div>
            <div className="flex justify-between items-stretch pb-3 smalltablet:pb-4 mb-8 smalltablet:mb-10 border-b border-gray-200">
              <div>
                <h2 className="text-3xl smalltablet:text-4xl pc:text-5xl font-black text-gray-900 mb-1 smalltablet:mb-2 tracking-tight">News</h2>
                <p className="text-gray-600 text-sm smalltablet:text-base">소식</p>
              </div>
              <button
                aria-label="더보기"
                className="w-12 smalltablet:w-14 m-2 self-stretch rounded-xl bg-linear-to-br from-[#7ba5d6] to-[#6b95c6] hover:from-[#6b95c6] hover:to-[#5f89bc] text-white flex items-center justify-center transition-colors shadow-sm border border-[#6b95c6]"
              >
                <svg className="w-4 h-4 smalltablet:w-5 smalltablet:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <div className="space-y-3">
              {newsItems.slice(0, 6).map((item, index) => (
                <div
                  key={index}
                  className={`bg-white hover:bg-gray-50 p-4 smalltablet:p-5 rounded-xl transition-all duration-200 cursor-pointer border border-gray-200 group ${index >= 4 ? 'hidden smalltablet:block' : ''}`}
                >
                  <div className="flex items-start gap-3 smalltablet:gap-4">
                    {/* 날짜 박스 */}
                    <div className="shrink-0 bg-linear-to-br from-[#7ba5d6] to-[#6b95c6] text-white w-14 h-14 smalltablet:w-16 smalltablet:h-16 rounded-lg flex flex-col items-center justify-center">
                      <div className="text-xl smalltablet:text-2xl font-bold">{item.day}</div>
                      <div className="text-xs mt-0.5 smalltablet:mt-1">{item.date}</div>
                    </div>
                    
                    {/* 컨텐츠 */}
                    <div className="flex-1">
                      <h3 className="text-base smalltablet:text-lg font-bold text-gray-900 mb-1 smalltablet:mb-2 group-hover:text-[#6b95c6] transition-colors">
                        {item.title}
                      </h3>
                      {item.description && (
                        <p className="text-xs smalltablet:text-sm text-gray-600 leading-relaxed line-clamp-2">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 오른쪽: 갤러리 */}
          <div>
            <div className="flex justify-between items-stretch pb-3 smalltablet:pb-4 mb-8 smalltablet:mb-10 border-b border-gray-200">
              <div>
                <h2 className="text-3xl smalltablet:text-4xl pc:text-5xl font-black text-gray-900 mb-1 smalltablet:mb-2 tracking-tight">Photos</h2>
                <p className="text-gray-600 text-sm smalltablet:text-base">앨범</p>
              </div>
              <button
                aria-label="더보기"
                className="w-12 smalltablet:w-14 m-2 self-stretch rounded-xl bg-linear-to-br from-[#7ba5d6] to-[#6b95c6] hover:from-[#6b95c6] hover:to-[#5f89bc] text-white flex items-center justify-center transition-colors shadow-sm border border-[#6b95c6]"
              >
                <svg className="w-4 h-4 smalltablet:w-5 smalltablet:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            

            {/* 이미지 그리드 */}
            <div className="grid grid-cols-2 gap-3 smalltablet:mx-auto smalltablet:grid-cols-3 smalltablet:gap-4 pc:grid-cols-2">
              {images.map((image) => (
                <div
                  key={image.id}
                  className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer border border-gray-200"
                >
                  {/* 이미지 영역 */}
                  <div className="aspect-square bg-gray-100 relative overflow-hidden">
                    <Image
                      src={image.src}
                      alt={image.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 25vw"
                      placeholder="blur"
                    />
                  </div>

                  {/* 정보 오버레이 */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent transition-opacity flex items-end">
                    <div className="p-2.5 smalltablet:p-3 text-white w-full">
                      <h3 className="text-xs smalltablet:text-sm font-bold mb-0.5 smalltablet:mb-1">{image.title}</h3>
                      <p className="text-xs text-gray-200">{image.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

