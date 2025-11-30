'use client';

import React from 'react';
import { Bus, MapPin, Phone, Train } from 'lucide-react';

export default function DirectionsPage() {
  return (
    <div className="min-h-screen bg-white w-full">
      <div className="max-w-7xl mx-auto space-y-8 md:space-y-12 px-4 py-6 md:py-10">
          {/* 지도 영역 */}
            <div className="w-full h-64 md:h-96 lg:h-120 flex items-center justify-center text-sm md:text-base text-gray-500 bg-gray-200 rounded-xl">
              지도 넣으시겠다고 하시면 - 여기다 지도 API 넣을 것.
            </div>

          {/* 교회 정보 카드 */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 md:gap-0 pb-6 border-b border-gray-400 px-2 md:px-4">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">제자들교회 - 인천</h2>
              <div className="flex flex-col md:flex-row gap-3 md:gap-8 lg:gap-12">

                  <div className="flex items-center gap-2 md:gap-3 text-sm md:text-base lg:text-xl font-bold">
                    <span className="inline-flex items-center justify-center w-6 h-6 md:w-8 md:h-8 rounded-full bg-blue-50 text-blue-600">
                    <MapPin className="w-4 h-4" />
                    </span>
                    <span className="text-gray-800">주소 : 인천광역시 남동구 제자들로 123</span>
                  </div>

                  <div className="flex items-center gap-2 md:gap-3 text-sm md:text-base lg:text-xl font-bold">
                    <span className="flex items-center justify-center w-6 h-6 md:w-8 md:h-8 rounded-full bg-blue-50 text-blue-600">
                      <Phone className="w-4 h-4" />
                    </span>
                    <span className="text-gray-800">연락처 : 1800-3114 </span>
                  </div>

              </div>
            </div>

            <div className="pb-8 space-y-8 md:space-y-10">
              <div className="flex flex-col gap-4 md:gap-6 md:flex-row md:items-center">
                {/* 버스 아이콘 */}
                <div className="flex flex-row md:flex-col justify-start md:justify-center items-center gap-3 md:w-32 lg:w-40 md:border-r md:border-gray-500 md:mr-4 pb-4 md:pb-0 border-b md:border-b-0 border-gray-300">
                  <Bus className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 text-gray-700" />
                  <p className="text-sm md:text-base font-semibold text-gray-700">버스 이용 시</p>
                </div>

                {/* 내용 */}
                <div className="space-y-2 md:space-y-3 text-gray-700 flex-1">
                  <p className="text-sm md:text-base lg:text-lg">제자들교회 앞 정류장 : 102, 550, 720, 마을3</p>
                  <p className="text-sm md:text-base lg:text-lg">
                    제자들교회 사거리 정류장 : 급행11, 간선21, 환승5
                  </p>
                  <p className="text-sm md:text-base lg:text-lg mb-4 md:mb-8">
                    중앙시장 환승센터 하차 후 도보 5분 &mdash; 교회까지 직진 후 우회전
                  </p>
                  <p className="text-blue-600 font-bold text-sm md:text-base">광역버스 이용 시</p>
                  <p className="text-gray-700 text-sm md:text-base">
                    인천종합터미널에서 8800번 광역버스를 타고 제자들교회 앞 정류장에서 하차하세요. 하차 후 교회까지 도보 3분입니다.
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-200" />

              <div className="flex flex-col gap-4 md:gap-6 md:flex-row md:items-center">
                {/* 지하철 아이콘 */}
                <div className="flex flex-row md:flex-col justify-start md:justify-center items-center gap-3 md:w-32 lg:w-40 md:border-r md:border-gray-500 md:mr-4 pb-4 md:pb-0 border-b md:border-b-0 border-gray-300">
                  <Train className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 text-gray-700" />
                  <p className="text-sm md:text-base font-semibold text-gray-700">지하철 이용 시</p>
                </div>

                {/* 내용 */}
                <div className="space-y-2 md:space-y-3 text-gray-700 flex-1">
                  <p className="text-sm md:text-base lg:text-lg">인천 1호선 `제자들역` 3번 출구 도보 7분</p>
                  <p className="text-sm md:text-base lg:text-lg">
                    3번 출구로 나와 첫 번째 사거리에서 좌회전한 뒤 300m 직진하면 교회가 보입니다.
                  </p>
                  <p className="text-sm md:text-base lg:text-lg mb-4 md:mb-8">
                    공항철도 `신제자역` 하차 후 2번 출구 → 마을버스 3번 환승 → 제자들교회 앞 정류장 하차
                  </p>
                  <p className="text-blue-600 font-bold text-sm md:text-base">KTX 연계 이용 시</p>
                  <p className="text-gray-700 text-sm md:text-base">
                    광명역에서 공항철도 환승 후 `신제자역`까지 이동한 뒤, 2번 출구 마을버스 3번을 이용하면 약 40분 소요됩니다.
                  </p>
                </div>
              </div>

            </div>
        </div>
      </div>
  );
}
