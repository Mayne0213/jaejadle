// API 엔드포인트 설정
export const API_ENDPOINTS = {
  // 인증 관련 엔드포인트
  AUTH: {
    SIGN_IN: "/api/auth/signin",
    SIGN_UP: "/api/auth/signup",
    SIGN_OUT: "/api/auth/signout",
    ME: "/api/auth/me",
  },

  // 파일 관련 엔드포인트
  FILE: {
    BASE: "/api/files",
    BY_ID: (id: number) => `/api/files/${id}`,
    DOWNLOAD_URL: "/api/files/download-url",
    UPLOAD_URL: "/api/files/upload-url",
  },

  // 유저 관련 엔드포인트
  USER: {
    BASE: "/api/users",
    BY_ID: (id: number) => `/api/users/${id}`,
  },

  // 공지사항 관련 엔드포인트
  ANNOUNCEMENT: {
    BASE: "/api/announcements",
    BY_ID: (id: number) => `/api/announcements/${id}`,
  },

  // 갤러리 관련 엔드포인트
  GALLERY: {
    BASE: "/api/gallery",
    BY_ID: (id: number) => `/api/gallery/${id}`,
  },

  // 예배 관련 엔드포인트
  WORSHIP: {
    BASE: "/api/worship",
    BY_ID: (id: number) => `/api/worship/${id}`,
    BY_CATEGORY: (category: string) => `/api/worship?category=${category}`,
    REORDER: "/api/worship/reorder",
    NEXT_ORDER: (category: string) => `/api/worship/next-order?category=${category}`,
  },
} as const;

