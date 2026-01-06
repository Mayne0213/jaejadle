import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isValidYouTubeUrl, getYouTubeThumbnailUrl, getYouTubeEmbedUrl } from "@/lib/utils/youtube";

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
      // 썸네일 및 embed URL 추가
      const videosWithUrls = videos.map(video => ({
        ...video,
        thumbnailUrl: getYouTubeThumbnailUrl(video.videoUrl),
        embedUrl: getYouTubeEmbedUrl(video.videoUrl),
      }));
      return NextResponse.json({
        success: true,
        data: videosWithUrls,
      });
    }

    const videos = await prisma.worshipVideo.findMany({
      orderBy: [
        { category: 'asc' },
        { order: 'desc' },
      ],
    });
    // 썸네일 및 embed URL 추가
    const videosWithUrls = videos.map(video => ({
      ...video,
      thumbnailUrl: getYouTubeThumbnailUrl(video.videoUrl),
      embedUrl: getYouTubeEmbedUrl(video.videoUrl),
    }));
    return NextResponse.json({
      success: true,
      data: videosWithUrls,
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
