import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET: 모든 유저 조회
export async function GET() {
  try {
    const users = await prisma.user.findMany({
      include: {
        announcements: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: users,
    });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : '유저 조회에 실패했습니다.';
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
}

// POST: 새로운 유저 생성
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, userPassword, userName, userPhone } = body;

    if (!userId || !userPassword || !userName || !userPhone) {
      return NextResponse.json(
        { success: false, message: '필수 필드가 누락되었습니다.' },
        { status: 400 }
      );
    }

    const user = await prisma.user.create({
      data: {
        userId,
        userPassword,
        userName,
        userPhone,
      },
    });

    return NextResponse.json({
      success: true,
      data: user,
    }, { status: 201 });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : '유저 생성에 실패했습니다.';
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
}

