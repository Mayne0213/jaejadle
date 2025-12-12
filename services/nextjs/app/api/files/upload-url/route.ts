import { NextRequest, NextResponse } from 'next/server';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { S3_CONFIG, s3Client } from '@/const';
import mime from 'mime-types';

// 파일 업로드 URL 생성
const generateUploadUrl = async (
  fileName: string,
  fileType: string,
  folder?: string
): Promise<{ uploadUrl: string; fileKey: string }> => {
  try {
    const fileKey = folder ? `Jaejadle/${folder}/${Date.now()}-${fileName}` : `Jaejadle/${Date.now()}-${fileName}`;
    
    const command = new PutObjectCommand({
      Bucket: S3_CONFIG.BUCKET_NAME,
      Key: fileKey,
      ContentType: fileType,
    });

    const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });

    return {
      uploadUrl,
      fileKey,
    };
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : '알 수 없는 오류';
    throw new Error(`업로드 URL 생성에 실패했습니다: ${errorMessage}`);
  }
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    let { fileName, fileType, folder = 'uploads' } = body;

    // folder에서 시작/끝 슬래시 제거
    if (folder) {
      folder = folder.replace(/^\/+|\/+$/g, '');
    }

    if (!fileName) {
      return NextResponse.json(
        { success: false, message: 'fileName이 필요합니다.' },
        { status: 400 }
      );
    }

    // fileType이 없으면 파일 확장자로부터 MIME type 추론
    const contentType = fileType || mime.lookup(fileName) || 'application/octet-stream';

    const { uploadUrl, fileKey } = await generateUploadUrl(fileName, contentType, folder);

    return NextResponse.json({
      success: true,
      data: {
        uploadUrl,
        fileKey,
      },
    });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : '업로드 URL 생성에 실패했습니다.';
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
}

