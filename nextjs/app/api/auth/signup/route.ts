import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const {
      userId,
      userPassword,
      userCheckPassword,
      userName,
      userPhone,
      authCode,
    } = await req.json();

    // 유효성 검사
    if (!userId || !userPassword || !userCheckPassword || !userName || !userPhone || !authCode) {
      return NextResponse.json(
        { success: false, message: "필수 정보를 모두 입력해주세요." },
        { status: 400 }
      );
    }

    // 승인번호 검사
    if (authCode !== process.env.JAEJADLE_CODE) {
      return NextResponse.json(
        { success: false, message: "승인번호가 올바르지 않습니다." },
        { status: 400 }
      );
    }

    // 비밀번호 확인
    if (userPassword !== userCheckPassword) {
      return NextResponse.json(
        { success: false, message: "비밀번호가 일치하지 않습니다." },
        { status: 400 }
      );
    }

    // 중복 체크: 아이디
    const existingUser = await prisma.user.findUnique({
      where: { userId },
    });

    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "이미 사용 중인 아이디입니다." },
        { status: 409 }
      );
    }

    // 중복 체크: 전화번호
    const existingPhone = await prisma.user.findUnique({
      where: { userPhone },
    });

    if (existingPhone) {
      return NextResponse.json(
        { success: false, message: "이미 등록된 전화번호입니다." },
        { status: 409 }
      );
    }

    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(userPassword, 10);

    // 새로운 유저 생성
    const newUser = await prisma.user.create({
      data: {
        userId,
        userPassword: hashedPassword,
        userName,
        userPhone,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: {
          userId: newUser.userId,
          userName: newUser.userName,
        },
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("Signup error:", err);
    return NextResponse.json(
      { success: false, message: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

