export default function Ministries() {
  
  const sections = [
    { 
      title: "담임목사님을 소개합니다", 
      description: "이용희 담임목사님의 인사말과 \n 4가지의 핵심 가치를 소개합니다",
      buttonText: "PASTOR"
    },
    { 
      title: "시설 안내", 
      description: "본관과 교육관의 시설 현황을 \n 안내합니다.",
      buttonText: "FACILITY"
    },
    { 
      title: "조직 구성 안내", 
      description: "대전제일교회의 부서와 조직을 \n 안내합니다.",
      buttonText: "ORGANIZATION"
    },
    { 
      title: "찾아오시는길 안내", 
      description: "교회 주변의 약도와 \n 대중교통 노선을 안내 합니다.",
      buttonText: "CONTACT US"
    }
  ];

  return (
    <section
      className="py-12 smalltablet:py-16 pc:py-20 bg-gray-50"
    >
      <div className="max-w-7xl mx-auto px-4 smalltablet:px-6 pc:px-8">
        <h2 className="text-3xl smalltablet:text-4xl pc:text-5xl font-black text-gray-900 mb-8 smalltablet:mb-10 pc:mb-12 text-end">More.</h2>
        <div className="grid grid-cols-1 smalltablet:grid-cols-2 gap-4 smalltablet:gap-6 pc:gap-8">
          {sections.map((section, index) => (
            <div
              key={index}
              className="flex flex-row smalltablet:flex-col pc:flex-row items-center smalltablet:items-start pc:items-center justify-between smalltablet:justify-start pc:justify-between gap-4 smalltablet:gap-4 pc:gap-8 bg-[#e8f2fa] rounded-xl smalltablet:rounded-2xl p-4 smalltablet:p-6 pc:p-8"
            >
              {/* 왼쪽/위: 텍스트 콘텐츠 */}
              <div className="flex-1 smalltablet:w-full pc:flex-1">
                <h3 className="text-lg smalltablet:text-xl pc:text-2xl font-bold text-gray-900 mb-2 smalltablet:mb-2.5 pc:mb-3">
                  {section.title}
                </h3>
                <p className="text-sm smalltablet:text-base pc:text-lg text-gray-600 leading-relaxed whitespace-pre-line">
                  {section.description}
                </p>
              </div>
              
              {/* 오른쪽/아래: 버튼 */}
              <button className="shrink-0 smalltablet:w-full smalltablet:mt-2 pc:w-auto pc:mt-0 bg-[#7ba5d6] hover:bg-[#6b95c6] text-white font-semibold uppercase px-4 smalltablet:px-8 pc:px-10 py-2.5 smalltablet:py-3.5 pc:py-4 rounded-xl smalltablet:rounded-2xl text-xs smalltablet:text-base pc:text-lg transition-colors duration-200 shadow-sm hover:shadow-md whitespace-nowrap">
                {section.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

