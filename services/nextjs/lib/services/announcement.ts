import { apiGet, apiPost, apiDelete } from "@/lib/api";
import { API_ENDPOINTS } from "@/const";

export interface AnnouncementAuthor {
  userId: string;
  userName: string;
}

export interface Announcement {
  id: number;
  title: string;
  content: string;
  isImportant: boolean;
  viewCount: number;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  author: AnnouncementAuthor;
}

export interface CreateAnnouncementData {
  title: string;
  content: string;
  isImportant: boolean;
  authorId: number;
}

/**
 * 공지사항 목록 조회
 */
export async function getAnnouncements(): Promise<Announcement[]> {
  return apiGet<Announcement[]>(API_ENDPOINTS.ANNOUNCEMENT.BASE);
}

/**
 * 공지사항 상세 조회
 */
export async function getAnnouncementById(id: number): Promise<Announcement> {
  return apiGet<Announcement>(API_ENDPOINTS.ANNOUNCEMENT.BY_ID(id));
}

/**
 * 공지사항 생성
 */
export async function createAnnouncement(
  data: CreateAnnouncementData
): Promise<Announcement> {
  return apiPost<Announcement>(API_ENDPOINTS.ANNOUNCEMENT.BASE, data);
}

/**
 * 공지사항 삭제
 */
export async function deleteAnnouncement(id: number): Promise<void> {
  return apiDelete<void>(API_ENDPOINTS.ANNOUNCEMENT.BY_ID(id));
}

