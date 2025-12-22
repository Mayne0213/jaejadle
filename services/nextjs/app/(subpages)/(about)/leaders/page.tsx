import Image from 'next/image';
import leader1 from '@/public/subpages/about/leaders/1.webp';
import leader2 from '@/public/subpages/about/leaders/2.webp';
import leader3 from '@/public/subpages/about/leaders/3.webp';
import leader4 from '@/public/subpages/about/leaders/4.webp';
import leader5 from '@/public/subpages/about/leaders/5.webp';
import leader6 from '@/public/subpages/about/leaders/6.webp';
import leader7 from '@/public/subpages/about/leaders/7.webp';
import leader8 from '@/public/subpages/about/leaders/8.webp';
import leader9 from '@/public/subpages/about/leaders/9.webp';

const LEADER_CATEGORIES = [
  {
    title: '교역자',
    color: '#6d96c5',
    members: [
      { name: '김경한', title: '담임목사', image: leader1 },
      { name: '김종범', title: '부목사', image: leader2 },
      { name: '최하영', title: '부목사', image: leader3 },
      { name: '김윤영', title: '전도사', image: leader4 },
      { name: '설희보', title: '전도사', image: leader5 },
      { name: '서영리', title: '협력전도사', image: leader6 },
    ],
  },
  {
    title: '장로',
    color: '#94b7d6',
    members: [
      { name: '김정태', title: '명예 장로', image: leader7 },
      { name: '안중옹', title: '장로', image: leader8 },
      { name: '김현종', title: '장로', image: leader9 },
    ],
  },
];

export default function LeadersPage() {
  return (
    <div className="bg-white w-full">
      <div className="py-8 smalltablet:py-12 pc:py-16 px-4 smalltablet:px-6 pc:px-8">
        <div className="max-w-5xl mx-auto">
          {LEADER_CATEGORIES.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-12 smalltablet:mb-16 pc:mb-20">
              {/* 섹션 헤더 */}
              <div className="text-center mb-8 smalltablet:mb-10 pc:mb-12">
                <div 
                  className={`w-12 smalltablet:w-14 pc:w-16 h-1 mx-auto mb-3 smalltablet:mb-4 bg-[${category.color}]`}
                />
                <h2 className="text-2xl smalltablet:text-3xl pc:text-4xl font-bold text-gray-900">
                  {category.title}
                </h2>
              </div>

              {/* 멤버 그리드 */}
              <div className="grid grid-cols-2 smalltablet:grid-cols-3 gap-4 smalltablet:gap-6 pc:gap-8">
                {category.members.map((member, memberIndex) => (
                  <div 
                    key={memberIndex} 
                    className="group bg-white rounded-xl smalltablet:rounded-2xl overflow-hidden border border-gray-300 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    {/* 프로필 이미지 */}
                    <div className="relative aspect-3/4 bg-gray-100 overflow-hidden">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* 그라데이션 오버레이 */}
                      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* 정보 */}
                    <div className="p-3 smalltablet:p-4 pc:p-5 text-center">
                      <h3 className="text-lg smalltablet:text-xl pc:text-2xl font-bold text-gray-900 mb-1">
                        {member.name}
                      </h3>
                      <p 
                        className="text-sm smalltablet:text-base pc:text-lg font-medium"
                        style={{ color: category.color }}
                      >
                        {member.title}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
