import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getPaginationParams, createPaginatedResponse } from '@/lib/utils';

// GET: 갤러리 포스트 목록 조회 (pagination 지원)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const { page, limit, skip } = getPaginationParams(searchParams, 12);

    const [posts, total] = await Promise.all([
      prisma.galleryPost.findMany({
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        include: {
          images: {
            take: 1,
            orderBy: { order: 'asc' },
          },
        },
      }),
      prisma.galleryPost.count(),
    ]);

    return NextResponse.json({
      success: true,
      ...createPaginatedResponse(posts, total, page, limit),
    });
  } catch (err) {
    console.error('Get gallery posts error:', err);
    const errorMessage = err instanceof Error ? err.message : '갤러리 조회에 실패했습니다.';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}

// POST: 새로운 갤러리 포스트 생성
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, content, items } = body;

    if (!title) {
      return NextResponse.json(
        { success: false, message: '제목이 필요합니다.' },
        { status: 400 }
      );
    }

    if (!items || items.length === 0) {
      return NextResponse.json(
        { success: false, message: '최소 1개 이상의 콘텐츠가 필요합니다.' },
        { status: 400 }
      );
    }

    // 이미지가 최소 1개는 있어야 함
    const hasImage = items.some((item: any) => item.type === 'image');
    if (!hasImage) {
      return NextResponse.json(
        { success: false, message: '최소 1개 이상의 이미지가 필요합니다.' },
        { status: 400 }
      );
    }

    // items를 order 순서대로 정렬
    const sortedItems = [...items].sort((a, b) => a.order - b.order);

    const post = await prisma.galleryPost.create({
      data: {
        title,
        content: content || '',
        images: {
          create: sortedItems
            .filter((item: any) => item.type === 'image')
            .map((item: any) => ({
              fileKey: item.fileKey,
              order: item.order,
              aspectRatio: item.aspectRatio || null,
            })),
        },
        textBlocks: {
          create: sortedItems
            .filter((item: any) => item.type === 'text')
            .map((item: any) => ({
              content: item.content,
              order: item.order,
            })),
        },
      },
      include: {
        images: {
          orderBy: { order: 'asc' },
        },
        textBlocks: {
          orderBy: { order: 'asc' },
        },
      },
    });

    return NextResponse.json({
      success: true,
      data: post,
    }, { status: 201 });
  } catch (err) {
    console.error('Create gallery post error:', err);
    const errorMessage = err instanceof Error ? err.message : '갤러리 생성에 실패했습니다.';
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
}
