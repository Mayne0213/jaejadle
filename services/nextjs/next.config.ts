import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    unoptimized: true, // 런타임 최적화 비활성화 (이미 최적화된 이미지 사용)
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s3.minio0213.kro.kr",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
    ],
  },
};

export default nextConfig;
