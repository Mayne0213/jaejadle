import { NextRequest, NextResponse } from 'next/server';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { S3_CONFIG, s3Client } from '@/const';

// 파일 다운로드 URL 생성
const generateDownloadUrl = async (fileKey: string, fileName?: string): Promise<string> => {
  try {
    const command = new GetObjectCommand({
      Bucket: S3_CONFIG.BUCKET_NAME,
      Key: fileKey,
      ResponseContentDisposition: fileName 
        ? `attachment; filename="${encodeURIComponent(fileName)}"`
        : 'attachment',
    });

    const downloadUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });

    return downloadUrl;
  } catch {
    throw new Error('다운로드 URL 생성에 실패했습니다.');
  }
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fileKey, fileName } = body;

    if (!fileKey) {
      return NextResponse.json(
        { success: false, message: 'fileKey가 필요합니다.' },
        { status: 400 }
      );
    }

    const downloadUrl = await generateDownloadUrl(fileKey, fileName);

    return NextResponse.json({
      success: true,
      data: {
        downloadUrl,
      },
    });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : '다운로드 URL 생성에 실패했습니다.';
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
}

