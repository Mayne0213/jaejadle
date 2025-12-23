import type { NextConfig } from "next";
import { config } from "dotenv";
import { resolve } from "path";

// Load .env file from the parent directory (jaejadle folder)
config({ path: resolve(__dirname, "../../.env") });

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    // unoptimized: true, // 런타임 최적화 비활성화 (이미 최적화된 이미지 사용)
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s3.minio0213.kro.kr",
      },
      {
        protocol: "https",
        hostname: "*.s3.*.amazonaws.com", // AWS S3 (모든 리전)
      },
      {
        protocol: "https",
        hostname: "s3.*.amazonaws.com", // AWS S3 path-style
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
    ],
  },
};

export default nextConfig;
