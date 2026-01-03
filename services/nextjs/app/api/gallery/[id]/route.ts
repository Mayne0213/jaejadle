import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { DeleteObjectCommand } from '@aws-sdk/client-s3';
import { s3Client, S3_CONFIG } from '@/const';
import { generateSignedUrl } from '@/lib/s3';

interface GalleryImage {
  id: number;
  fileKey: string;
  postId: number;
  order: number;
  aspectRatio: number | null;
  createdAt: Date;
  updatedAt: Date;
}

interface GalleryTextBlock {
  id: number;
  postId: number;
  content: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

type ContentItem =
  | { type: 'image'; data: GalleryImage & { displayUrl: string } }
  | { type: 'text'; data: GalleryTextBlock };

// GET: 갤러리 포스트 상세 조회
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const postId = parseInt(id, 10);

    if (isNaN(postId)) {
      return NextResponse.json(
        { success: false, message: '유효하지 않은 ID입니다.' },
        { status: 400 }
      );
    }

    const post = await prisma.galleryPost.findUnique({
      where: { id: postId },
      include: {
        images: {
          orderBy: { order: 'asc' },
        },
        textBlocks: {
          orderBy: { order: 'asc' },
        },
      },
    });

    if (!post) {
      return NextResponse.json(
        { success: false, message: '갤러리를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    // 이미지에 displayUrl 추가
    const imagesWithUrls = await Promise.all(
      post.images.map(async (img) => ({
        ...img,
        displayUrl: await generateSignedUrl(img.fileKey),
      }))
    );

    // 이미지와 텍스트 블록을 order 순서로 정렬하여 반환
    const sortedContent: ContentItem[] = [
      ...imagesWithUrls.map((img) => ({ type: 'image' as const, data: img })),
      ...(post.textBlocks || []).map((text) => ({ type: 'text' as const, data: text })),
    ].sort((a, b) => a.data.order - b.data.order);

    return NextResponse.json({
      success: true,
      data: {
        ...post,
        images: imagesWithUrls,
        sortedContent,
      },
    });
  } catch (err) {
    console.error('Get gallery post error:', err);
    const errorMessage = err instanceof Error ? err.message : '갤러리 조회에 실패했습니다.';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}

// DELETE: 갤러리 포스트 삭제
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const postId = parseInt(id, 10);

    if (isNaN(postId)) {
      return NextResponse.json(
        { success: false, message: '유효하지 않은 ID입니다.' },
        { status: 400 }
      );
    }

    // 1. 포스트와 이미지 정보 먼저 조회
    const post = await prisma.galleryPost.findUnique({
      where: { id: postId },
      include: { 
        images: true,
        textBlocks: true,
      },
    });

    if (!post) {
      return NextResponse.json(
        { success: false, message: '갤러리를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    // 2. S3에서 이미지 삭제
    await Promise.all(
      post.images.map((image: { fileKey: string }) =>
        s3Client.send(
          new DeleteObjectCommand({
            Bucket: S3_CONFIG.BUCKET_NAME,
            Key: image.fileKey,
          })
        )
      )
    );

    // 3. DB에서 포스트 삭제 (cascade로 이미지도 삭제됨)
    await prisma.galleryPost.delete({
      where: { id: postId },
    });

    return NextResponse.json({
      success: true,
      message: '갤러리가 삭제되었습니다.',
    });
  } catch (err) {
    console.error('Delete gallery post error:', err);
    const errorMessage = err instanceof Error ? err.message : '갤러리 삭제에 실패했습니다.';
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
}
