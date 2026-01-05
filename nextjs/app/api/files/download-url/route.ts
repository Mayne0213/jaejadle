import { NextRequest, NextResponse } from 'next/server';
import { generateSignedUrl } from '@/lib/s3';

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

    const downloadUrl = await generateSignedUrl(fileKey, { fileName });

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

