import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { DeleteObjectCommand } from '@aws-sdk/client-s3';
import { s3Client, S3_CONFIG } from '@/const';
import { generateSignedUrl } from '@/lib/s3';

const IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp'];

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
        files: true,
      },
    });

    // 이미지 파일에 signedUrl 추가
    const filesWithUrls = await Promise.all(
      (announcement.files || []).map(async (file) => {
        const ext = file.fileName.split('.').pop()?.toLowerCase();
        const isImage = IMAGE_EXTENSIONS.includes(ext || '');
        return {
          ...file,
          signedUrl: isImage ? await generateSignedUrl(file.fileKey) : undefined,
        };
      })
    );

    return NextResponse.json({
      success: true,
      data: {
        ...announcement,
        files: filesWithUrls,
      },
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

    // 1. 공지사항 및 첨부파일 조회
    const announcement = await prisma.announcement.findUnique({
      where: { id },
      include: {
        files: true,
      },
    });

    if (!announcement) {
      return NextResponse.json(
        { success: false, message: '공지사항을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    // 2. S3에서 첨부파일 삭제
    if (announcement.files && announcement.files.length > 0) {
      await Promise.all(
        announcement.files.map((file) =>
          s3Client.send(
            new DeleteObjectCommand({
              Bucket: S3_CONFIG.BUCKET_NAME,
              Key: file.fileKey,
            })
          )
        )
      );
    }

    // 3. DB에서 삭제 (files는 onDelete: Cascade로 자동 삭제됨)
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

