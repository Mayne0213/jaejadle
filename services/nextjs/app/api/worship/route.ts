import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET: 모든 예배 영상 또는 특정 카테고리 영상 가져오기
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');

    if (category) {
      const videos = await prisma.worshipVideo.findMany({
        where: { category },
        orderBy: { order: 'desc' },
      });
      return NextResponse.json({
        success: true,
        data: videos,
      });
    }

    const videos = await prisma.worshipVideo.findMany({
      orderBy: [
        { category: 'asc' },
        { order: 'desc' },
      ],
    });
    return NextResponse.json({
      success: true,
      data: videos,
    });
  } catch (error) {
    console.error("Error fetching worship videos:", error);
    const errorMessage = error instanceof Error ? error.message : "예배 영상 조회에 실패했습니다.";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}

// YouTube URL 유효성 검사 함수
function isValidYouTubeUrl(url: string): boolean {
  try {
    // 빈 문자열이나 whitespace만 있는 경우 거부
    if (!url || url.trim().length === 0) {
      return false;
    }

    const urlObj = new URL(url);
    const hostname = urlObj.hostname.toLowerCase();

    // pathname에서 첫 번째 경로 세그먼트 추출 (예: /watch, /embed, /live 등)
    const pathSegments = urlObj.pathname.split('/').filter(segment => segment);
    const firstSegment = pathSegments[0]?.toLowerCase();

    // YouTube 도메인과 지원하는 경로 형식 확인
    const isSupportedDomain = (
      hostname === 'www.youtube.com' ||
      hostname === 'youtube.com' ||
      hostname === 'm.youtube.com' ||
      hostname === 'youtu.be'
    );

    // 지원하는 경로 형식 확인 (/watch, /embed, /live 등)
    const isSupportedPath = (
      !firstSegment || // youtu.be/ID 형식
      firstSegment === 'watch' ||
      firstSegment === 'embed' ||
      firstSegment === 'live'
    );

    return isSupportedDomain && isSupportedPath;
  } catch {
    return false;
  }
}

// POST: 새 영상 추가
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { category, videoUrl } = body;

    if (!category || typeof category !== 'string') {
      return NextResponse.json(
        { success: false, message: "카테고리가 유효하지 않습니다." },
        { status: 400 }
      );
    }

    if (!videoUrl || typeof videoUrl !== 'string') {
      return NextResponse.json(
        { success: false, message: "영상 URL이 유효하지 않습니다." },
        { status: 400 }
      );
    }

    // YouTube URL 유효성 검사
    if (!isValidYouTubeUrl(videoUrl)) {
      return NextResponse.json(
        { success: false, message: "유효한 YouTube URL이 아닙니다." },
        { status: 400 }
      );
    }

    // 카테고리 내 기존 영상 확인 (order 내림차순)
    const existingVideos = await prisma.worshipVideo.findMany({
      where: { category },
      orderBy: { order: 'desc' },
    });

    // 기존 영상이 9개 이상이면 order가 가장 낮은(마지막) 영상 삭제
    if (existingVideos.length >= 9) {
      const videoToDelete = existingVideos[existingVideos.length - 1];
      await prisma.worshipVideo.delete({
        where: { id: videoToDelete.id },
      });
    }

    // 새 영상은 현재 최고 order + 1로 설정 (맨 앞에 추가)
    const maxOrder = existingVideos.length > 0 ? existingVideos[0].order : 0;
    const newOrder = maxOrder + 1;

    const newVideo = await prisma.worshipVideo.create({
      data: {
        category,
        videoUrl,
        order: newOrder,
      },
    });

    return NextResponse.json({
      success: true,
      data: newVideo,
    }, { status: 201 });
  } catch (error) {
    console.error("Error creating worship video:", error);
    const errorMessage = error instanceof Error ? error.message : "예배 영상 생성에 실패했습니다.";
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
}

// DELETE: 영상 삭제
export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (!id || isNaN(Number(id))) {
      return NextResponse.json(
        { success: false, message: "영상 ID가 유효하지 않습니다." },
        { status: 400 }
      );
    }

    await prisma.worshipVideo.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({
      success: true,
      message: "영상이 삭제되었습니다."
    });
  } catch (error) {
    console.error("Error deleting worship video:", error);
    const errorMessage = error instanceof Error ? error.message : "예배 영상 삭제에 실패했습니다.";
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
}
