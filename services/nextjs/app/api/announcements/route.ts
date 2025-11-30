import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getPaginationParams, createPaginatedResponse } from '@/lib/utils';

// GET: 공지사항 조회 (pagination 지원)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const { page, limit, skip } = getPaginationParams(searchParams, 10);

    const [announcements, total] = await Promise.all([
      prisma.announcement.findMany({
        include: {
          author: {
            select: {
              id: true,
              userId: true,
              userName: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.announcement.count(),
    ]);

    return NextResponse.json({
      success: true,
      ...createPaginatedResponse(announcements, total, page, limit),
    });
  } catch (err) {
    console.error('Get announcements error:', err);
    const errorMessage = err instanceof Error ? err.message : '공지사항 조회에 실패했습니다.';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}

// POST: 새로운 공지사항 생성
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, content, isImportant, authorId, files } = body;

    if (!title || !content || !authorId) {
      return NextResponse.json(
        { success: false, message: '필수 필드가 누락되었습니다.' },
        { status: 400 }
      );
    }

    const announcement = await prisma.announcement.create({
      data: {
        title,
        content,
        isImportant: isImportant || false,
        authorId,
        files: files && files.length > 0 ? {
          create: files.map((file: { fileKey: string; fileName: string; fileSize?: number; mimeType?: string }) => ({
            fileKey: file.fileKey,
            fileName: file.fileName,
            fileSize: file.fileSize,
            mimeType: file.mimeType,
          }))
        } : undefined,
      },
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

    return NextResponse.json({
      success: true,
      data: announcement,
    }, { status: 201 });
  } catch (err) {
    console.error('Create announcement error:', err);
    const errorMessage = err instanceof Error ? err.message : '공지사항 생성에 실패했습니다.';
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
}

