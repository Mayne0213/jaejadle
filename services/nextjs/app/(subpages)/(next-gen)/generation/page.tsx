import Image from 'next/image';
import { Clock, MapPin } from 'lucide-react';
import youth from '@/public/subpages/generation/youth.webp';
import elementary from '@/public/subpages/generation/elementary.webp';
import highschool from '@/public/subpages/generation/highschool.webp';
import adult from '@/public/subpages/generation/adult.webp';

const DEPARTMENTS = [
  {
    title: '유치부',
    color: '#6d96c5',
    image: youth,
    worshipTime: '11:00-12:00(주일)',
    worshipPlace: '4층 해피키즈',
  },
  {
    title: '유초등부',
    color: '#88aad2',
    image: elementary,
    worshipTime: '11:00-12:00(주일)',
    worshipPlace: '4층 해피키즈',
    ageRange: '6세 ~ 12세',
  },
  {
    title: '중고등부',
    color: '#94b7d6',
    image: highschool,
    worshipTime: '11:00-12:00(주일)',
    worshipPlace: '4층 교육관',
    ageRange: '13세 ~ 18세',
  },
  {
    title: '청년부',
    color: '#88aad2',
    image: adult,
    worshipTime: '16:00-17:00(토요일)',
    worshipPlace: '4층 교육관',
  },
];

export default function GenerationPage() {
  return (
    <div className="bg-white w-full">
      <div className="pt-8 smalltablet:pt-12 pc:pt-16 px-4 smalltablet:px-6 pc:px-8">
        <div className="max-w-5xl mx-auto">
          {DEPARTMENTS.map((department, index) => (
            <div key={index} className="mb-8 smalltablet:mb-16 pc:mb-20 p-8 rounded-2xl bg-gray-100 border border-gray-300">
              {/* 섹션 헤더 */}
              <div className="text-center mb-8 smalltablet:mb-10 pc:mb-12">
                <div 
                  className="w-12 smalltablet:w-14 pc:w-16 h-1 mx-auto mb-3 smalltablet:mb-4"
                  style={{ backgroundColor: department.color }}
                />
                <h2 className="text-2xl smalltablet:text-3xl pc:text-4xl font-bold text-gray-900">
                  {department.title}
                </h2>
              </div>

              {/* 부서 소개 섹션 - 왼쪽 이미지, 오른쪽 설명 */}
              <div className="flex flex-col smalltablet:flex-row items-center justify-center gap-6 smalltablet:gap-8 pc:gap-12">
                {/* 왼쪽: 이미지 (3/7) */}
                <div className="w-full smalltablet:w-[42.857%] smalltablet:flex-[3]">
                  <div className="group relative aspect-video rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
                    <Image
                      src={department.image}
                      alt={department.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    {/* 이미지 오버레이 */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent" />
                  </div>
                </div>

                {/* 오른쪽: 설명 (4/7) */}
                <div className="w-full smalltablet:w-[57.143%] smalltablet:flex-[4]">
                  <div className="space-y-6 smalltablet:space-y-8 pc:space-y-10">
                    {/* 예배 정보 */}
                    {/* 모바일: 한 줄에 배치 */}
                    <div className="flex items-center gap-3 smalltablet:hidden justify-center">
                      {/* 예배 시간 */}
                      <div className="flex items-center gap-2">
                        <div 
                          className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: `${department.color}20` }}
                        >
                          <Clock 
                            className="w-3 h-3" 
                            style={{ color: department.color }}
                          />
                        </div>
                        <p className="text-base text-gray-700 font-medium items-center">
                          {department.worshipTime}
                        </p>
                      </div>

                      {/* 구분선 */}
                      <div className="w-px h-4 bg-gray-300" />

                      {/* 예배 장소 */}
                      <div className="flex items-center gap-2">
                        <div 
                          className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: `${department.color}20` }}
                        >
                          <MapPin 
                            className="w-3 h-3" 
                            style={{ color: department.color }}
                          />
                        </div>
                        <p className="text-base text-gray-700 font-medium">
                          {department.worshipPlace}
                        </p>
                      </div>
                    </div>

                    {/* 태블릿 이상: 세로로 배치 */}
                    <div className="hidden smalltablet:block space-y-5 pc:space-y-6">
                      {/* 예배 시간 */}
                      <div className="flex items-start gap-4 pc:gap-5 group/item">
                        {/* 시계 아이콘 */}
                        <div 
                          className="shrink-0 w-7 h-7 pc:w-9 pc:h-9 rounded-full flex items-center justify-center mt-0.5 pc:mt-1 transition-transform group-hover/item:scale-110"
                          style={{ backgroundColor: `${department.color}20` }}
                        >
                          <Clock 
                            className="w-4 h-4 pc:w-5 pc:h-5" 
                            style={{ color: department.color }}
                          />
                        </div>
                        
                        {/* 예배 시간 텍스트 */}
                        <div className="flex-1 items-center">
                          <p className="text-base pc:text-lg text-gray-500 mb-1 pc:mb-1.5">예배 시간</p>
                          <p className="text-lg pc:text-2xl text-gray-700 leading-relaxed font-medium">
                            {department.worshipTime}
                          </p>
                        </div>
                      </div>

                      {/* 예배 장소 */}
                      <div className="flex items-start gap-4 pc:gap-5 group/item">
                        {/* 위치 아이콘 */}
                        <div 
                          className="shrink-0 w-7 h-7 pc:w-9 pc:h-9 rounded-full flex items-center justify-center mt-0.5 pc:mt-1 transition-transform group-hover/item:scale-110"
                          style={{ backgroundColor: `${department.color}20` }}
                        >
                          <MapPin 
                            className="w-4 h-4 pc:w-5 pc:h-5" 
                            style={{ color: department.color }}
                          />
                        </div>
                        
                        {/* 예배 장소 텍스트 */}
                        <div className="flex-1">
                          <p className="text-base pc:text-lg text-gray-500 mb-1 pc:mb-1.5">예배 장소</p>
                          <p className="text-lg pc:text-2xl text-gray-700 leading-relaxed font-medium">
                            {department.worshipPlace}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
