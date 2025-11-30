import { apiGet, apiPost, apiDelete } from "@/lib/api";
import { API_ENDPOINTS } from "@/const";
import { PaginatedResponse } from "@/lib/utils";

export interface AnnouncementAuthor {
  userId: string;
  userName: string;
}

export interface AnnouncementFile {
  id: number;
  fileKey: string;
  fileName: string;
  fileSize?: number | null;
  mimeType?: string | null;
  createdAt: string;
  updatedAt: string;
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
  files?: AnnouncementFile[];
}

export interface CreateAnnouncementData {
  title: string;
  content: string;
  isImportant: boolean;
  authorId: number;
  files?: {
    fileKey: string;
    fileName: string;
    fileSize?: number;
    mimeType?: string;
  }[];
}

export type AnnouncementPaginatedResponse = PaginatedResponse<Announcement>;

/**
 * 공지사항 목록 조회 (pagination)
 */
export async function getAnnouncements(
  page = 1,
  limit = 10
): Promise<AnnouncementPaginatedResponse> {
  const url = `${API_ENDPOINTS.ANNOUNCEMENT.BASE}?page=${page}&limit=${limit}`;
  const response = await fetch(url);
  const result = await response.json();
  return {
    data: result.data,
    pagination: result.pagination,
  };
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

