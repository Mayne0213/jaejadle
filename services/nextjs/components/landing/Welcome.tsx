import Image from "next/image";
import circlesImage from "@/public/home/welcome/circles.webp";

export default function Welcome() {
  const features = [
    {
      title: "제자들 교회에 처음 오셨나요?",
      description: "“너희는 위로하라 내 백성을 위로하라”(사40:1) \n 제자들교회는 닫힌 숨이 열리는 진정한 위로의 공동체입니다.  ",
      color:"#a9c6e1"
    },
    {
      title: "말씀으로 살아가는 교회",
      description: "\“너희가 내 말에 거하면 참으로 내 제자가 되고”(요8:31) \n 제자들교회는 말씀을 묵상함으로 하나님의 창조적인 역사를 \n 경험해 가는 공동체입니다. ",
      color:"#94b7d6"
    },
    {
      title: "서로 사랑하는 교회",
      description: "“너희가 서로 사랑하면 이로써 모든 사람이 너희가 내 제자인 줄 알리라”(요13:35) \n 제자들교회는 서로의 외로움을 채우며 마음껏 섬겨가는 사랑의 공동체입니다.  ",
      color:"#88aad2"
    },
    {
      title: "복음 전도와 선교를 위해 존재하는 교회",
      description: "“너희가 열매를 많이 맺으면 내 아버지께서 영광을 받으실 것이요 \n 너희는 내 제자가 되리라”(요15:8) \n 제자들교회는 한 영혼을 살리는 복음전도와 선교에 \n 집중하는 교회입니다.  ",
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
          <div className="w-1/3 smalltablet:w-2/5 pc:w-1/2 flex justify-center shrink-0">
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

