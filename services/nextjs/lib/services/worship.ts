import { apiGet, apiPost, apiDelete, apiPut } from "@/lib/api";
import { API_ENDPOINTS } from "@/const";

export interface WorshipVideo {
  id: number;
  category: string;
  videoUrl: string;
  order: number;
  createdAt: string;
  updatedAt: string;
  thumbnailUrl?: string;
  embedUrl?: string;
}

export interface WorshipVideoData {
  category: string;
  videoUrl: string;
  order: number;
}

export interface ReorderVideosData {
  videoId1: number;
  videoId2: number;
}

/**
 * 모든 예배 영상 가져오기
 */
export async function getAllWorshipVideos(): Promise<WorshipVideo[]> {
  return apiGet<WorshipVideo[]>(API_ENDPOINTS.WORSHIP.BASE);
}

/**
 * 특정 카테고리의 영상들 가져오기
 */
export async function getWorshipVideosByCategory(category: string): Promise<WorshipVideo[]> {
  return apiGet<WorshipVideo[]>(API_ENDPOINTS.WORSHIP.BY_CATEGORY(category));
}

/**
 * 영상 생성
 */
export async function createWorshipVideo(data: WorshipVideoData): Promise<WorshipVideo> {
  return apiPost<WorshipVideo>(API_ENDPOINTS.WORSHIP.BASE, data);
}

/**
 * 영상 삭제
 */
export async function deleteWorshipVideo(id: number): Promise<void> {
  return apiDelete<void>(API_ENDPOINTS.WORSHIP.BY_ID(id));
}

/**
 * 영상 순서 변경 (두 비디오의 순서를 교환)
 */
export async function swapWorshipVideos(videoId1: number, videoId2: number): Promise<WorshipVideo[]> {
  return apiPut<WorshipVideo[], ReorderVideosData>(
    API_ENDPOINTS.WORSHIP.REORDER,
    { videoId1, videoId2 }
  );
}

/**
 * 카테고리 내 다음 order 값 가져오기
 */
export async function getNextWorshipOrder(category: string): Promise<number> {
  return apiGet<number>(API_ENDPOINTS.WORSHIP.NEXT_ORDER(category));
}
