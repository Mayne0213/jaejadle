/**
 * YouTube URL 유틸리티 함수
 * worship 페이지와 disciple 페이지에서 공유하여 사용
 */

/**
 * YouTube URL에서 비디오 ID를 추출
 * 지원 형식: watch?v=, youtu.be/, embed/, live/
 */
export function extractYouTubeId(url: string): string | null {
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname.toLowerCase();

    // watch?v= 형식
    if (urlObj.searchParams.has('v')) {
      return urlObj.searchParams.get('v');
    }
    // youtu.be/ID 형식
    if (hostname === 'youtu.be') {
      return urlObj.pathname.slice(1).split('?')[0];
    }
    // embed/ID 형식
    if (urlObj.pathname.startsWith('/embed/')) {
      return urlObj.pathname.split('/embed/')[1]?.split('?')[0] || null;
    }
    // live/ID 형식
    if (urlObj.pathname.startsWith('/live/')) {
      const liveId = urlObj.pathname.split('/live/')[1]?.split('?')[0];
      return liveId || null;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * YouTube URL에서 썸네일 URL 생성
 */
export function getYouTubeThumbnailUrl(videoUrl: string): string {
  const videoId = extractYouTubeId(videoUrl);
  return videoId
    ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`
    : '/placeholder.jpg';
}

/**
 * YouTube URL 유효성 검사
 */
export function isValidYouTubeUrl(url: string): boolean {
  try {
    // 빈 문자열이나 whitespace만 있는 경우 거부
    if (!url || url.trim().length === 0) {
      return false;
    }

    const urlObj = new URL(url);
    const hostname = urlObj.hostname.toLowerCase();

    // pathname에서 첫 번째 경로 세그먼트 추출
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

/**
 * YouTube embed URL 생성
 */
export function getYouTubeEmbedUrl(videoUrl: string): string {
  const videoId = extractYouTubeId(videoUrl);
  return videoId ? `https://www.youtube.com/embed/${videoId}` : '';
}
