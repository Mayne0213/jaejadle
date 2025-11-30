import React from 'react';
import Image from 'next/image';

export default function LeadersPage() {
  const leaders = [
    {
      name: '김경일',
      title: '담임목사',
      degree: 'M.Div.',
      year: '1995',
      interests: [
        '설교학',
        '목회신학',
        '청년사역'
      ],
      email: 'pastor@jaejadle.or.kr',
      image: '/subpages/leaders/1.webp',
    },
    {
      name: '김 택',
      title: '부목사',
      degree: 'M.Div.',
      year: '2015',
      interests: [
        '예배학',
        '찬양사역',
        '성경신학'
      ],
      email: 'taek@jaejadle.or.kr',
      image: '/subpages/leaders/2.webp',
    },
    {
      name: '유경민',
      title: '전도사',
      degree: 'M.Div. 재학',
      year: '2020',
      interests: [
        '청년사역',
        '성경연구',
        '선교학'
      ],
      email: 'kyoo@jaejadle.or.kr',
      image: '/subpages/leaders/3.webp',
    },
    {
      name: '황성진',
      title: '전도사',
      degree: 'M.Div.',
      year: '2018',
      interests: [
        '선교학',
        '목회상담',
        '제자훈련'
      ],
      email: 'sjhwang@jaejadle.or.kr',
      image: '/subpages/leaders/4.webp',
    },
    {
      name: '김경일',
      title: '담임목사',
      degree: 'M.Div.',
      year: '1995',
      interests: [
        '설교학',
        '목회신학',
        '청년사역'
      ],
      email: 'pastor@jaejadle.or.kr',
      image: '/subpages/leaders/5.webp',
    },
    {
      name: '김경일',
      title: '담임목사',
      degree: 'M.Div.',
      year: '1995',
      interests: [
        '설교학',
        '목회신학',
        '청년사역'
      ],
      email: 'pastor@jaejadle.or.kr',
      image: '/subpages/leaders/6.webp',
    },
    {
      name: '김경일',
      title: '담임목사',
      degree: 'M.Div.',
      year: '1995',
      interests: [
        '설교학',
        '목회신학',
        '청년사역'
      ],
      email: 'pastor@jaejadle.or.kr',
      image: '/subpages/leaders/7.webp',
    },
    {
      name: '김경일',
      title: '담임목사',
      degree: 'M.Div.',
      year: '1995',
      interests: [
        '설교학',
        '목회신학',
        '청년사역'
      ],
      email: 'pastor@jaejadle.or.kr',
      image: '/subpages/leaders/1.webp',
    },
    {
      name: '김경일',
      title: '담임목사',
      degree: 'M.Div.',
      year: '1995',
      interests: [
        '설교학',
        '목회신학',
        '청년사역'
      ],
      email: 'pastor@jaejadle.or.kr',
      image: '/subpages/leaders/2.webp',
    },
  ];

  return (
    <div className="py-16 px-4 w-full">
      <div className="max-w-7xl mx-auto">
        {/* 교역자 섹션 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {leaders.map((leader, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-8 border border-gray-200 aspect-square flex flex-col justify-between">
              {/* 프로필 이미지 */}
              <div className="flex justify-center mb-4 shrink-0">
                <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden shrink-0 relative">
                  <Image
                    src={leader.image}
                    alt={leader.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* 이름과 직책 */}
              <div className="text-center mb-4 pb-10 border-b border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900">
                  {leader.name}
                </h3>
              </div>

              {/* Research Interests */}
              <div className="pb-4">
                <h4 className="text-xs font-semibold text-gray-700 mb-2">관심 분야</h4>
                <p className="text-sm text-gray-600">
                  {leader.interests.join(', ')}
                </p>
              </div>

              {/* Email */}
              <div>
                <h4 className="text-xs font-semibold text-gray-700 mb-1">Email</h4>
                <p className="text-sm text-gray-600 break-all">
                  {leader.email}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
