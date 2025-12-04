// S3/MinIO 설정
export const S3_CONFIG = {
  BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME || 'jaejadle-bucket',
  REGION: process.env.AWS_REGION || 'us-east-1',
  ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID || '',
  SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY || '',
  ENDPOINT: process.env.AWS_S3_ENDPOINT || undefined, // MinIO endpoint
} as const;

// S3 URL 생성 헬퍼
export const getS3Url = (fileKey: string): string => {
  // MinIO 사용시 커스텀 엔드포인트 URL 생성
  if (S3_CONFIG.ENDPOINT) {
    return `${S3_CONFIG.ENDPOINT}/${S3_CONFIG.BUCKET_NAME}/${fileKey}`;
  }
  // AWS S3 기본 URL
  return `https://${S3_CONFIG.BUCKET_NAME}.s3.${S3_CONFIG.REGION}.amazonaws.com/${fileKey}`;
};

// S3 클라이언트 인스턴스 (서버 사이드에서만 사용)
import { S3Client } from '@aws-sdk/client-s3';

export const s3Client = new S3Client({
  region: S3_CONFIG.REGION,
  credentials: {
    accessKeyId: S3_CONFIG.ACCESS_KEY_ID,
    secretAccessKey: S3_CONFIG.SECRET_ACCESS_KEY,
  },
  endpoint: S3_CONFIG.ENDPOINT,
  forcePathStyle: S3_CONFIG.ENDPOINT ? true : false, // MinIO는 path-style 사용
});

