import { apiPost, apiDelete, apiGet } from "@/lib/api";
import { API_ENDPOINTS } from "@/const";
import { uploadFile } from "./file";
import { PaginatedResponse } from "@/lib/utils";

export interface GalleryImage {
  id: number;
  fileKey: string;
  postId: number;
  order: number;
  aspectRatio?: number | null;
  createdAt: string;
  updatedAt: string;
  displayUrl?: string;
}

export interface GalleryTextBlock {
  id: number;
  postId: number;
  content: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export type GalleryContentItem =
  | { type: 'image'; data: GalleryImage }
  | { type: 'text'; data: GalleryTextBlock };

export interface GalleryPost {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  images: GalleryImage[];
  textBlocks?: GalleryTextBlock[];
  thumbnailUrl?: string;
  sortedContent?: GalleryContentItem[];
}

export interface CreateGalleryPostData {
  title: string;
  content?: string;
  items: Array<
    | { type: 'image'; fileKey: string; order: number; aspectRatio?: number }
    | { type: 'text'; content: string; order: number }
  >;
}

/**
 * 이미지 파일의 비율을 계산하는 함수
 */
export function calculateImageAspectRatio(file: File): Promise<number> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    
    img.onload = () => {
      URL.revokeObjectURL(url);
      const aspectRatio = img.naturalWidth / img.naturalHeight;
      resolve(aspectRatio);
    };
    
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('이미지 로드에 실패했습니다.'));
    };
    
    img.src = url;
  });
}

export type GalleryPostPaginatedResponse = PaginatedResponse<GalleryPost>;

/**
 * 갤러리 포스트 목록 조회 (pagination, thumbnailUrl 포함)
 */
export async function getGalleryPosts(
  page = 1,
  limit = 12
): Promise<GalleryPostPaginatedResponse> {
  const url = `${API_ENDPOINTS.GALLERY.BASE}?page=${page}&limit=${limit}`;
  const response = await fetch(url);
  const result = await response.json();
  return {
    data: result.data,
    pagination: result.pagination,
  };
}

/**
 * 갤러리 포스트 상세 조회 (displayUrl, sortedContent 포함)
 */
export async function getGalleryPost(id: number): Promise<GalleryPost> {
  return apiGet<GalleryPost>(API_ENDPOINTS.GALLERY.BY_ID(id));
}

/**
 * 갤러리 포스트의 정렬된 콘텐츠 반환 (백엔드에서 이미 정렬됨)
 */
export function getSortedGalleryContent(post: GalleryPost): GalleryContentItem[] {
  // 백엔드에서 sortedContent가 제공되면 그대로 사용
  if (post.sortedContent) {
    return post.sortedContent;
  }

  // fallback: 클라이언트에서 정렬
  const items: GalleryContentItem[] = [
    ...post.images.map((img) => ({ type: 'image' as const, data: img })),
    ...(post.textBlocks || []).map((text) => ({ type: 'text' as const, data: text })),
  ];

  return items.sort((a, b) => a.data.order - b.data.order);
}

/**
 * 갤러리 포스트 생성
 */
export async function createGalleryPost(
  data: CreateGalleryPostData
): Promise<GalleryPost> {
  return apiPost<GalleryPost>(API_ENDPOINTS.GALLERY.BASE, data);
}

/**
 * 갤러리 포스트 삭제
 */
export async function deleteGalleryPost(id: number): Promise<void> {
  return apiDelete<void>(API_ENDPOINTS.GALLERY.BY_ID(id));
}

/**
 * 여러 파일 업로드 후 fileKeys 반환
 */
export async function uploadGalleryFiles(files: File[]): Promise<string[]> {
  const fileKeys: string[] = [];
  for (const file of files) {
    const { fileKey } = await uploadFile(file, 'gallery');
    fileKeys.push(fileKey);
  }
  return fileKeys;
}
