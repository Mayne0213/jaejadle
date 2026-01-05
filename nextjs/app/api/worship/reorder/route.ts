import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// PUT: 영상 순서 변경 (두 비디오의 order만 교환)
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { videoId1, videoId2 } = body;

    // 입력 검증
    if (!videoId1 || !videoId2) {
      return NextResponse.json(
        { success: false, message: "두 개의 비디오 ID가 필요합니다." },
        { status: 400 }
      );
    }

    if (videoId1 === videoId2) {
      return NextResponse.json(
        { success: false, message: "동일한 비디오는 교환할 수 없습니다." },
        { status: 400 }
      );
    }

    // 두 비디오 조회
    const [video1, video2] = await Promise.all([
      prisma.worshipVideo.findUnique({ where: { id: Number(videoId1) } }),
      prisma.worshipVideo.findUnique({ where: { id: Number(videoId2) } }),
    ]);

    if (!video1 || !video2) {
      return NextResponse.json(
        { success: false, message: "비디오를 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    // 같은 카테고리인지 확인
    if (video1.category !== video2.category) {
      return NextResponse.json(
        { success: false, message: "같은 카테고리의 비디오만 교환할 수 있습니다." },
        { status: 400 }
      );
    }
    
    await prisma.$transaction([
      prisma.worshipVideo.update({
        where: { id: video1.id },
        data: { order: -1 }, // 임시 음수 값 (unique constraint 회피)
      }),
      prisma.worshipVideo.update({
        where: { id: video2.id },
        data: { order: video1.order },
      }),
      prisma.worshipVideo.update({
        where: { id: video1.id },
        data: { order: video2.order },
      }),
    ]);

    // 업데이트된 카테고리의 모든 비디오 반환
    const updatedVideos = await prisma.worshipVideo.findMany({
      where: { category: video1.category },
      orderBy: { order: 'desc' },
    });

    return NextResponse.json({
      success: true,
      data: updatedVideos,
    });
  } catch (error) {
    console.error("Error reordering worship videos:", error);
    const errorMessage = error instanceof Error ? error.message : "예배 영상 순서 변경에 실패했습니다.";
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
}