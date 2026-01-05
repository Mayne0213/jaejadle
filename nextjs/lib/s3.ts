import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { S3_CONFIG, s3Client } from '@/const';

/**
 * S3 파일의 signed URL 생성 (1시간 유효)
 */
export async function generateSignedUrl(
  fileKey: string,
  options?: {
    fileName?: string;
    expiresIn?: number;
  }
): Promise<string> {
  const command = new GetObjectCommand({
    Bucket: S3_CONFIG.BUCKET_NAME,
    Key: fileKey,
    ...(options?.fileName && {
      ResponseContentDisposition: `attachment; filename="${encodeURIComponent(options.fileName)}"`,
    }),
  });

  return getSignedUrl(s3Client, command, {
    expiresIn: options?.expiresIn || 3600
  });
}

/**
 * 여러 파일의 signed URL 일괄 생성
 */
export async function generateSignedUrls(
  fileKeys: string[]
): Promise<Map<string, string>> {
  const urlMap = new Map<string, string>();

  await Promise.all(
    fileKeys.map(async (fileKey) => {
      const url = await generateSignedUrl(fileKey);
      urlMap.set(fileKey, url);
    })
  );

  return urlMap;
}
