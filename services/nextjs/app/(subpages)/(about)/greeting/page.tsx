import Image from 'next/image';
import person from '@/public/subpages/about/greetings/person.webp';

export default function GreetingPage() {
  return (
    <div className="w-full relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 pb-6 pt-10">

          {/* 인사말 섹션 */}
          <div className="grid pc:grid-cols-7 gap-8 items-start">
            {/* 왼쪽: 인사말 (5/7) */}
              <div className="space-y-6 text-gray-700 leading-relaxed pc:col-span-4 text-center pc:text-left">
                <p className="text-2xl pc:text-3xl font-bold mb-2 smalltablet:mb-4 pc:mb-8">
                  <span className="text-[#6d96c5] block smalltablet:text-4xl pc:text-5xl">Welcome Home!</span>
                </p>

                <p className="text-sm pc:text-base">
                  {`제자들교회를 찾아주셔서 감사드립니다.
                  이 땅의 유일한 구주되신 예수님은
                  상처와 교만, 실패와 낙망으로 얼룩진
                  저희들의 인생에 찾아오셔서
                  영생과 함께 참된 기쁨과 소망을 주셨습니다.`}
                </p>

                <p className="text-sm pc:text-base">
                  {`광야와 같은 세상 속에서
                  때로는 숨쉬기조차 어려운 하루하루지만,
                  이곳에서 함께 만날 예수님은
                  저희들의 닫힌 숨을 다시 열어주시는
                  위로자가 되어 주실 겁니다.`}
                </p>

                <p className="text-sm pc:text-base">
                  {`제자들교회는 세상이 줄 수 없는
                  그 놀라운 위로와 사랑을
                  온전히 누리며 전하는 공동체 입니다.
                  이 놀라운 믿음의 여정을 함께 걸어가기를 소망합니다.`}
                </p>

                {/* 담임목사 이름 */}
                <div className="mt-8 text-center pc:text-left">
                  <p className="text-xl pc:text-2xl font-semibold text-gray-800">담임목사 김경한</p>
                </div>
              </div>

            {/* 오른쪽: 이미지 (2/7) */}
            <div className="pc:col-span-3">
              <div className="relative h-[300px] pc:h-[400px] rounded-xl overflow-hidden">
                <Image
                  src={person}
                  alt="담임목사"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}
