import { apiGet, apiPost, apiDelete, apiPut } from "@/lib/api";
import { API_ENDPOINTS } from "@/const";

export interface DiscipleVideo {
  id: number;
  stage: string;
  step: string | null;
  videoUrl: string;
  order: number;
  createdAt: string;
  updatedAt: string;
  thumbnailUrl?: string;
  embedUrl?: string;
}

export interface DiscipleVideoData {
  stage: string;
  step?: string | null;
  videoUrl: string;
}

interface DiscipleReorderData {
  videoId1: number;
  videoId2: number;
}

/**
 * 모든 제자훈련 영상 가져오기
 */
export async function getAllDiscipleVideos(): Promise<DiscipleVideo[]> {
  return apiGet<DiscipleVideo[]>(API_ENDPOINTS.DISCIPLE.BASE);
}

/**
 * 특정 stage의 영상들 가져오기
 */
export async function getDiscipleVideosByStage(stage: string): Promise<DiscipleVideo[]> {
  return apiGet<DiscipleVideo[]>(API_ENDPOINTS.DISCIPLE.BY_STAGE(stage));
}

/**
 * 영상 생성
 */
export async function createDiscipleVideo(data: DiscipleVideoData): Promise<DiscipleVideo> {
  return apiPost<DiscipleVideo>(API_ENDPOINTS.DISCIPLE.BASE, data);
}

/**
 * 영상 삭제
 */
export async function deleteDiscipleVideo(id: number): Promise<void> {
  return apiDelete<void>(API_ENDPOINTS.DISCIPLE.BY_ID(id));
}

/**
 * 영상 순서 변경 (두 비디오의 순서를 교환)
 */
export async function swapDiscipleVideos(videoId1: number, videoId2: number): Promise<DiscipleVideo[]> {
  return apiPut<DiscipleVideo[], DiscipleReorderData>(
    API_ENDPOINTS.DISCIPLE.REORDER,
    { videoId1, videoId2 }
  );
}
