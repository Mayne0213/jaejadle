import { apiPost, apiDelete, apiGet } from "@/lib/api";
import { API_ENDPOINTS } from "@/const";
import { uploadFile, getDownloadUrl } from "./file";
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
 * 갤러리 포스트 목록 조회 (pagination)
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
 * 갤러리 포스트 목록 조회 (thumbnailUrl 포함)
 */
export async function getGalleryPostsWithThumbnails(
  page = 1,
  limit = 12
): Promise<GalleryPostPaginatedResponse> {
  const result = await getGalleryPosts(page, limit);
  const postsWithThumbnails = await Promise.all(
    result.data.map(async (post) => ({
      ...post,
      thumbnailUrl: post.images[0]
        ? await getDownloadUrl(post.images[0].fileKey)
        : undefined,
    }))
  );
  return {
    data: postsWithThumbnails,
    pagination: result.pagination,
  };
}

/**
 * 갤러리 포스트 상세 조회
 */
export async function getGalleryPost(id: number): Promise<GalleryPost> {
  return apiGet<GalleryPost>(API_ENDPOINTS.GALLERY.BY_ID(id));
}

/**
 * 갤러리 포스트 상세 조회 (displayUrl 포함)
 */
export async function getGalleryPostWithUrls(id: number): Promise<GalleryPost> {
  const post = await getGalleryPost(id);
  const imagesWithUrls = await Promise.all(
    post.images.map(async (img) => ({
      ...img,
      displayUrl: await getDownloadUrl(img.fileKey),
    }))
  );
  return {
    ...post,
    images: imagesWithUrls,
  };
}

/**
 * 갤러리 포스트의 이미지와 텍스트 블록을 order 순서로 정렬하여 반환
 */
export function getSortedGalleryContent(post: GalleryPost): GalleryContentItem[] {
  const items: GalleryContentItem[] = [
    ...post.images.map((img) => ({ type: 'image' as const, data: img })),
    ...(post.textBlocks || []).map((text) => ({ type: 'text' as const, data: text })),
  ];
  
  return items.sort((a, b) => {
    const orderA = a.type === 'image' ? a.data.order : a.data.order;
    const orderB = b.type === 'image' ? b.data.order : b.data.order;
    return orderA - orderB;
  });
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
