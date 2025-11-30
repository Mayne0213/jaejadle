import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 로그인/회원가입 페이지는 세션 쿠키가 있으면 홈으로 리다이렉트
  if (pathname.startsWith("/login") || pathname.startsWith("/signup")) {
    const sessionToken = req.cookies.get("authjs.session-token") ||
                        req.cookies.get("__Secure-authjs.session-token");

    if (sessionToken) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
  }

  // 보호된 경로 설정 - 공지사항 작성, 갤러리 작성 페이지
  if (pathname.startsWith("/announcements/create") || pathname.startsWith("/gallery/write")) {
    const sessionToken = req.cookies.get("authjs.session-token") ||
                        req.cookies.get("__Secure-authjs.session-token");
    if (!sessionToken) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|icon.png).*)",
  ],
};

