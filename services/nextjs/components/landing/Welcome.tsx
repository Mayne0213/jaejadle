import Image from "next/image";
import circlesImage from "@/public/circles.png";

export default function Welcome() {
  const features = [
    {
      title: "청주에덴교회에 처음오셨나요?",
      description: "청주에덴교회 새가족환영전(6주)를 소개합니다.\n이 과정을통하여 새가족은 예수 그리스도와 우리 교회에 대해 바뀌고 성장 수 있습니다.",
      color:"#a9c6e1"
    },
    {
      title: "다음세대가 함께하는 교회",
      description: "청주에덴교회의 다음세대 교회학교는 예수님의 작은 제자들이 훌륭한\n그리스도의 자녀로 성장하기 위한 훈련과정을 담고 있습니다.",
      color:"#94b7d6"
    },
    {
      title: "지역과 열방을 섬교하는 교회",
      description: "청주에덴교회는 선교에 동참하는 꿈동체로 복음의 필요와\n국내,외 지구촌 곳곳에 하나님의 복음을 전하는데 그 가치를 두고있습니다.",
      color:"#88aad2"
    },
    {
      title: "예수 제자를 양육하는 교회",
      description: "청주에덴교회는 성도들이 예수님의 사랑을 경험하는 것을 가치있게 여기는 교회로\n모든 성도들의 신앙성숙을 도와 성경공부를 통해 제자를 양육하고 있습니다.",
      color:"#6d96c5"
    }
  ];

  return (
    <section className="py-16 smalltablet:py-20 pc:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 smalltablet:px-6 pc:px-8">
        {/* 제목 */}
        <div className="flex flex-col items-end justify-end mb-12 smalltablet:mb-16">
        <h2 className="text-3xl smalltablet:text-4xl pc:text-5xl font-black text-end text-gray-900 mb-3 smalltablet:mb-4">
          Welcome!
        </h2>
        <p className="text-sm smalltablet:text-base pc:text-lg text-gray-700 leading-relaxed whitespace-pre-line text-end">
          청주교회에 오신 것을 환영합니다!
        </p>
        </div>

        {/* 메인 컨텐츠 */}
        <div className="flex flex-row items-center justify-center gap-4 smalltablet:gap-6 pc:gap-0">
          {/* 왼쪽: 교회 아이콘 */}
          <div className="w-1/3 smalltablet:w-2/5 pc:w-1/2 flex justify-center flex-shrink-0">
            <div className="relative w-24 h-24 smalltablet:w-48 smalltablet:h-48 pc:w-[450px] pc:h-[450px]">
              {/* 원형 이미지 */}
              <Image
                src={circlesImage}
                alt="청주에덴교회"
                fill
                className="object-contain drop-shadow-2xl"
              />
            </div>
          </div>

          {/* 오른쪽: 특징 리스트 */}
          <div className="pc:w-1/2 space-y-4 smalltablet:space-y-6 pc:space-y-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="border-l-4 pl-4 smalltablet:pl-6 pc:pl-6"
                style={{ borderColor: feature.color }}
              >
                <h3 
                  className="text-sm smalltablet:text-xl pc:text-2xl font-bold mb-1 smalltablet:mb-2 pc:mb-2 leading-tight"
                  style={{ color: feature.color }}
                >
                  {feature.title}
                </h3>
                <p className="text-xs hidden smalltablet:block smalltablet:text-sm pc:text-base text-gray-700 leading-relaxed whitespace-pre-line">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

