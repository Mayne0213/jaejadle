export default function FAQ() {
  const faqs = [
    {
      question: "처음 교회를 방문하려는데 어떻게 해야 하나요?",
      answer: "주일 오전 10시 30분 예배에 참석하시면 됩니다. 안내 데스크에서 새가족 등록을 도와드리며, 환영 선물도 준비되어 있습니다. 편안한 복장으로 오셔도 괜찮습니다."
    },
    {
      question: "주차 시설이 있나요?",
      answer: "네, 교회 지하에 주차장이 있습니다. 주일 예배 시간에는 주차 안내 봉사자가 도와드립니다. 만차인 경우 인근 공영주차장을 이용하실 수 있습니다."
    },
    {
      question: "어린이를 위한 프로그램이 있나요?",
      answer: "유아부(0-3세), 유치부(4-7세), 유년부(초등 1-3학년), 소년부(초등 4-6학년)로 나뉘어 연령별 맞춤 교육을 진행하고 있습니다. 전문 교사가 안전하게 돌봐드립니다."
    },
    {
      question: "새신자 교육은 어떻게 진행되나요?",
      answer: "매월 첫째 주 토요일 오후 2시에 새신자 교육이 진행됩니다. 총 4주 과정으로 기독교의 기본 교리와 우리 교회를 소개합니다. 수료 후 정식 등록 절차를 안내해 드립니다."
    },
    {
      question: "소그룹 모임에 참여하고 싶어요.",
      answer: "연령대별, 지역별로 다양한 소그룹이 운영되고 있습니다. 예배 후 안내 데스크나 담당 교역자에게 문의하시면 적합한 소그룹을 연결해 드립니다."
    },
    {
      question: "헌금은 어떻게 하나요?",
      answer: "현금, 계좌이체, 카드 결제 모두 가능합니다. 예배 시간에 헌금함에 넣으시거나, 교회 계좌로 이체하실 수 있습니다. 온라인 헌금 시스템도 운영 중입니다."
    },
  ];

  return (
    <section className="py-16 smalltablet:py-20 pc:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 smalltablet:px-6 pc:px-8">
        <div className="text-center mb-12 smalltablet:mb-16">
          <h2 className="text-3xl smalltablet:text-4xl pc:text-5xl font-black text-gray-900 mb-3 smalltablet:mb-4 tracking-tight">FAQ</h2>
          <p className="text-gray-600 text-sm smalltablet:text-base">자주 묻는 질문</p>
        </div>

        {/* FAQ 리스트 */}
        <div className="grid grid-cols-1 smalltablet:grid-cols-2 gap-4 smalltablet:gap-6">
          {faqs.map((faq, index) => (
            <div key={index} className="p-4 space-y-4 smalltablet:p-6 rounded-2xl border border-gray-200 bg-white">
              <div className="flex items-center gap-3 smalltablet:gap-4 mb-4">
                <div className="w-9 h-9 smalltablet:w-10 smalltablet:h-10 bg-gradient-to-br from-[#7ba5d6] to-[#6b95c6] rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-sm smalltablet:text-base">Q</div>
                <h3 className="flex-1 text-base smalltablet:text-lg pc:text-xl font-bold text-gray-900 leading-snug">{faq.question}</h3>
              </div>
              <div className="flex items-start gap-3 smalltablet:gap-4">
                <div className="w-9 h-9 smalltablet:w-10 smalltablet:h-10 bg-gradient-to-br from-[#b8d5f0] to-[#a8c5e0] rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-sm smalltablet:text-base">A</div>
                <p className="text-gray-700 text-sm smalltablet:text-base leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

