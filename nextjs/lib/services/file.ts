import { apiPost } from "@/lib/api";
import { API_ENDPOINTS } from "@/const";

export interface UploadedFile {
  fileKey: string;
  originalName: string;
  fileType: string;
  fileSize: number;
}

/**
 * S3 업로드 URL 생성
 */
export async function getUploadUrl(
  fileName: string,
  fileType: string,
  folder?: string
): Promise<{ uploadUrl: string; fileKey: string }> {
  return apiPost<{ uploadUrl: string; fileKey: string }>(
    API_ENDPOINTS.FILE.UPLOAD_URL,
    {
      fileName,
      fileType,
      folder,
    }
  );
}

/**
 * S3에 파일 업로드
 */
export async function uploadToS3(uploadUrl: string, file: File): Promise<void> {
  const uploadResponse = await fetch(uploadUrl, {
    method: "PUT",
    body: file,
    headers: {
      "Content-Type": file.type,
      "Cache-Control": "no-cache",
    },
  });

  if (!uploadResponse.ok) {
    throw new Error(
      `S3 업로드에 실패했습니다. (${uploadResponse.status}: ${uploadResponse.statusText})`
    );
  }
}

/**
 * 파일 업로드 전체 프로세스
 */
export async function uploadFile(file: File, folder?: string): Promise<UploadedFile> {
  // 1. 업로드 URL 생성
  const { uploadUrl, fileKey } = await getUploadUrl(file.name, file.type, folder);

  // 2. S3에 업로드
  await uploadToS3(uploadUrl, file);

  // 3. 파일 정보 반환
  return {
    fileKey,
    originalName: file.name,
    fileType: file.type,
    fileSize: file.size,
  };
}

/**
 * S3에서 파일 다운로드 URL 생성
 */
export async function getDownloadUrl(
  fileKey: string,
  fileName?: string
): Promise<string> {
  const result = await apiPost<{ downloadUrl: string }>(
    API_ENDPOINTS.FILE.DOWNLOAD_URL,
    { fileKey, fileName }
  );
  return result.downloadUrl;
}

/**
 * 파일 다운로드
 */
export async function downloadFile(
  fileKey: string,
  fileName: string
): Promise<void> {
  const downloadUrl = await getDownloadUrl(fileKey, fileName);
  // ResponseContentDisposition이 설정되어 있으면 자동으로 다운로드됨
  window.open(downloadUrl, "_blank");
}

