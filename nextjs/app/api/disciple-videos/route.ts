import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isValidYouTubeUrl, getYouTubeThumbnailUrl, getYouTubeEmbedUrl } from "@/lib/utils/youtube";

// GET: 모든 제자훈련 영상 또는 특정 stage 영상 가져오기
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const stage = searchParams.get('stage');

    if (stage) {
      const videos = await prisma.discipleVideo.findMany({
        where: { stage },
        orderBy: [
          { step: 'asc' },
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
    }

    const videos = await prisma.discipleVideo.findMany({
      orderBy: [
        { stage: 'asc' },
        { step: 'asc' },
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
    console.error("Error fetching disciple videos:", error);
    const errorMessage = error instanceof Error ? error.message : "제자훈련 영상 조회에 실패했습니다.";
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
    const { stage, step, videoUrl } = body;

    if (!stage || typeof stage !== 'string') {
      return NextResponse.json(
        { success: false, message: "stage가 유효하지 않습니다." },
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

    // stage/step 내 기존 영상 확인하여 최고 order 값 가져오기
    const existingVideo = await prisma.discipleVideo.findFirst({
      where: { stage, step: step || null },
      orderBy: { order: 'desc' },
    });

    // 새 영상은 현재 최고 order + 1로 설정 (맨 앞에 추가)
    const maxOrder = existingVideo?.order ?? 0;
    const newOrder = maxOrder + 1;

    const newVideo = await prisma.discipleVideo.create({
      data: {
        stage,
        step: step || null,
        videoUrl,
        order: newOrder,
      },
    });

    return NextResponse.json({
      success: true,
      data: newVideo,
    }, { status: 201 });
  } catch (error) {
    console.error("Error creating disciple video:", error);
    const errorMessage = error instanceof Error ? error.message : "제자훈련 영상 생성에 실패했습니다.";
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

    await prisma.discipleVideo.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({
      success: true,
      message: "영상이 삭제되었습니다."
    });
  } catch (error) {
    console.error("Error deleting disciple video:", error);
    const errorMessage = error instanceof Error ? error.message : "제자훈련 영상 삭제에 실패했습니다.";
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
}
