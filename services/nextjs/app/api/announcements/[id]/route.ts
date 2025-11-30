import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { DeleteObjectCommand } from '@aws-sdk/client-s3';
import { s3Client, S3_CONFIG } from '@/const';

// GET: 특정 공지사항 조회
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam);

    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, message: '유효하지 않은 ID입니다.' },
        { status: 400 }
      );
    }

    const announcement = await prisma.announcement.update({
      where: { id },
      data: { viewCount: { increment: 1 } },
      include: {
        author: {
          select: {
            id: true,
            userId: true,
            userName: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      data: announcement,
    });
  } catch (err) {
    console.error('Get announcement error:', err);
    const errorMessage = err instanceof Error ? err.message : '공지사항 조회에 실패했습니다.';
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
}

// DELETE: 공지사항 삭제
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam);

    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, message: '유효하지 않은 ID입니다.' },
        { status: 400 }
      );
    }

    // 1. 공지사항 조회하여 content에서 S3 파일 키 추출
    const announcement = await prisma.announcement.findUnique({
      where: { id },
    });

    if (!announcement) {
      return NextResponse.json(
        { success: false, message: '공지사항을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    // 2. content에서 S3 URL 추출 및 파일 삭제
    const s3UrlPattern = new RegExp(
      `https://${S3_CONFIG.BUCKET_NAME}\\.s3\\.[^/]+\\.amazonaws\\.com/([^\\s]+)`,
      'g'
    );
    const matches = Array.from<RegExpMatchArray>(announcement.content.matchAll(s3UrlPattern));
    const fileKeys = matches.map((match) => decodeURIComponent(match[1]));

    if (fileKeys.length > 0) {
      await Promise.all(
        fileKeys.map((fileKey) =>
          s3Client.send(
            new DeleteObjectCommand({
              Bucket: S3_CONFIG.BUCKET_NAME,
              Key: fileKey,
            })
          )
        )
      );
    }

    // 3. DB에서 삭제
    await prisma.announcement.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: '삭제되었습니다.',
    });
  } catch (err) {
    console.error('Delete announcement error:', err);
    const errorMessage = err instanceof Error ? err.message : '삭제에 실패했습니다.';
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
}

