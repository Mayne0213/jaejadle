'use client';

import React, { useState } from 'react';
import { MapPin } from 'lucide-react';
import { useKakaoLoader, Map, MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk';

// 제자들교회 좌표 (인천광역시 서구 고산후로 95번길 32)
const CHURCH_LOCATION = {
  lat: 37.592754772,
  lng: 126.695602263,
  name: '제자들교회',
};

export default function DirectionsPage() {
  const [isOpen, setIsOpen] = useState(true);
  const kakaoMapKey = process.env.NEXT_PUBLIC_KAKAO_MAP_KEY || '';
  
  const [loading, error] = useKakaoLoader({
    appkey: kakaoMapKey,
  });

  return (
    <div className="bg-white w-full">
      <div className="max-w-7xl mx-auto space-y-8 md:space-y-12 px-4 py-6 md:py-10">
        {/* 지도 영역 */}
        <div className="w-full h-64 md:h-96 lg:h-[480px] rounded-xl overflow-hidden shadow-lg">
          {loading ? (
            <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-xl">
              <p className="text-gray-500">지도를 불러오는 중...</p>
            </div>
          ) : error ? (
            <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-xl">
              <p className="text-red-500">지도를 불러오는 중 오류가 발생했습니다.</p>
            </div>
          ) : (
            <Map
              center={{ lat: CHURCH_LOCATION.lat, lng: CHURCH_LOCATION.lng }}
              style={{ width: '100%', height: '100%' }}
              level={2}
            >
              <MapMarker
                position={{ lat: CHURCH_LOCATION.lat, lng: CHURCH_LOCATION.lng }}
                clickable={true}
                onClick={() => setIsOpen(!isOpen)}
              />
              {isOpen && (
                <CustomOverlayMap
                  position={{ lat: CHURCH_LOCATION.lat, lng: CHURCH_LOCATION.lng }}
                  yAnchor={2.3}
                >
                  <div className="bg-white px-3 py-2 rounded-lg shadow-lg border border-gray-200">
                    <div className="text-sm font-bold text-gray-900">
                      {CHURCH_LOCATION.name}
                    </div>
                  </div>
                </CustomOverlayMap>
              )}
            </Map>
          )}
        </div>

          {/* 교회 정보 카드 */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 md:gap-0 pb-6 px-2 md:px-4 border-b border-gray-400">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">제자들교회 - 인천</h2>
              <div className="flex flex-col md:flex-row gap-3 md:gap-8 lg:gap-12">

                  <div className="flex items-center gap-2 md:gap-3 text-sm md:text-base lg:text-xl font-bold">
                    <span className="inline-flex items-center justify-center w-6 h-6 md:w-8 md:h-8 rounded-full bg-blue-50 text-blue-600">
                    <MapPin className="w-4 h-4" />
                    </span>
                    <span className="text-gray-800">주소 : 인천광역시 서구 고산후로 95번길 32 명진프라자 3층 본당 / 4층 교육관</span>
                  </div>
              </div>
            </div>

            {/* <div className="pb-8 space-y-8 md:space-y-10">
              <div className="flex flex-col gap-4 md:gap-6 md:flex-row md:items-center">
                <div className="flex flex-row md:flex-col justify-start md:justify-center items-center gap-3 md:w-32 lg:w-40 md:border-r md:border-gray-500 md:mr-4 pb-4 md:pb-0 border-b md:border-b-0 border-gray-300">
                  <Bus className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 text-gray-700" />
                  <p className="text-sm md:text-base font-semibold text-gray-700">버스 이용 시</p>
                </div>

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
                <div className="flex flex-row md:flex-col justify-start md:justify-center items-center gap-3 md:w-32 lg:w-40 md:border-r md:border-gray-500 md:mr-4 pb-4 md:pb-0 border-b md:border-b-0 border-gray-300">
                  <Train className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 text-gray-700" />
                  <p className="text-sm md:text-base font-semibold text-gray-700">지하철 이용 시</p>
                </div>

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

            </div> */}
        </div>
      </div>
  );
}
