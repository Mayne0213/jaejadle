// S3 설정 (MinIO 사용)
export const S3_CONFIG = {
  BUCKET_NAME: process.env.MINIO_BUCKET_NAME || 'jaejadle-bucket',
  REGION: process.env.MINIO_REGION || 'ap-northeast-2',
  ACCESS_KEY_ID: process.env.MINIO_ACCESS_KEY_ID || '',
  SECRET_ACCESS_KEY: process.env.MINIO_SECRET_ACCESS_KEY || '',
} as const;

// S3 클라이언트 인스턴스 (서버 사이드에서만 사용)
import { S3Client } from '@aws-sdk/client-s3';

export const s3Client = new S3Client({
  region: S3_CONFIG.REGION,
  credentials: {
    accessKeyId: S3_CONFIG.ACCESS_KEY_ID,
    secretAccessKey: S3_CONFIG.SECRET_ACCESS_KEY,
  },
  // MinIO를 사용하는 경우 endpoint와 path-style 설정 필요
  ...(process.env.MINIO_ENDPOINT && {
    endpoint: process.env.MINIO_ENDPOINT,
    forcePathStyle: true, // MinIO는 path-style URL 사용 (https://endpoint/bucket/path)
  }),
});