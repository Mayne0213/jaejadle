import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: "로그인 필요", user: null },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        id: parseInt(session.user.id),
        userId: session.user.userId,
        userName: session.user.name,
      },
    });
  } catch (error) {
    console.error("Get user error:", error);
    return NextResponse.json(
      { success: false, message: "서버 오류가 발생했습니다.", user: null },
      { status: 500 }
    );
  }
}

