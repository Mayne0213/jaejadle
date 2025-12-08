// S3 설정
export const S3_CONFIG = {
  BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME || 'jaejadle-bucket',
  REGION: process.env.AWS_REGION || 'ap-northeast-2',
  ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID || '',
  SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY || '',
} as const;

// S3 클라이언트 인스턴스 (서버 사이드에서만 사용)
import { S3Client } from '@aws-sdk/client-s3';

export const s3Client = new S3Client({
  region: S3_CONFIG.REGION,
  credentials: {
    accessKeyId: S3_CONFIG.ACCESS_KEY_ID,
    secretAccessKey: S3_CONFIG.SECRET_ACCESS_KEY,
  },
  // MinIO를 사용하는 경우 환경 변수 AWS_S3_ENDPOINT를 설정하면 SDK가 자동으로 처리
  // ...(process.env.AWS_S3_ENDPOINT && { endpoint: process.env.AWS_S3_ENDPOINT }),
});