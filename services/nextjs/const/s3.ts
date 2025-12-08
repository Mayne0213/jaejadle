// S3 설정 (AWS S3 또는 MinIO)
export const S3_CONFIG = {
  BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME || 'jaejadle-bucket',
  REGION: process.env.AWS_REGION || 'ap-northeast-2',
  ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID || '',
  SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY || '',
  ENDPOINT: process.env.AWS_S3_ENDPOINT, // AWS S3는 undefined, MinIO는 엔드포인트 URL
  IS_MINIO: !!process.env.AWS_S3_ENDPOINT, // 엔드포인트가 있으면 MinIO로 간주
} as const;

// S3 클라이언트 인스턴스 (서버 사이드에서만 사용)
import { S3Client } from '@aws-sdk/client-s3';

export const s3Client = new S3Client({
  region: S3_CONFIG.REGION,
  credentials: {
    accessKeyId: S3_CONFIG.ACCESS_KEY_ID,
    secretAccessKey: S3_CONFIG.SECRET_ACCESS_KEY,
  },
  // AWS S3를 사용할 때는 endpoint를 설정하지 않음 (SDK가 자동으로 처리)
  // MinIO를 사용할 때만 endpoint 설정
  ...(S3_CONFIG.ENDPOINT && { endpoint: S3_CONFIG.ENDPOINT }),
  // AWS S3는 virtual-hosted style (기본값), MinIO는 path-style 사용
  forcePathStyle: S3_CONFIG.IS_MINIO,
});

