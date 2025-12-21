import { prisma } from '@/lib/prisma';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { S3_CONFIG, s3Client } from '@/const';
import { unstable_cache } from 'next/cache';

export interface GalleryImage {
  id: number;
  fileKey: string;
  postId: number;
  order: number;
  aspectRatio?: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface GalleryPost {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  images: GalleryImage[];
  thumbnailUrl?: string;
}

/**
 * S3 presigned URL 생성 (캐싱 적용)
 */
const getPresignedUrl = unstable_cache(
  async (fileKey: string) => {
    try {
      const command = new GetObjectCommand({
        Bucket: S3_CONFIG.BUCKET_NAME,
        Key: fileKey,
      });

      const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
      return url;
    } catch (error) {
      console.error('Presigned URL 생성 실패:', error);
      return '';
    }
  },
  ['s3-presigned-url'],
  {
    revalidate: 3000, // 50분마다 재검증 (presigned URL은 1시간 유효)
    tags: ['s3-urls'],
  }
);

/**
 * 서버 사이드에서 갤러리 포스트 목록 조회 (썸네일 URL 포함)
 */
export const getGalleryPostsServer = unstable_cache(
  async (limit: number = 3) => {
    console.time('📊 Gallery DB Query');
    const posts = await prisma.galleryPost.findMany({
      orderBy: { createdAt: 'desc' },
      take: limit,
      include: {
        images: {
          take: 1,
          orderBy: { order: 'asc' },
        },
      },
    });
    console.timeEnd('📊 Gallery DB Query');

    // 썸네일 URL 생성 (병렬 처리)
    console.time('🔐 S3 URL Generation');
    const postsWithThumbnails = await Promise.all(
      posts.map(async (post) => {
        const thumbnailUrl = post.images[0]
          ? await getPresignedUrl(post.images[0].fileKey)
          : undefined;

        return {
          id: post.id,
          title: post.title,
          content: post.content,
          createdAt: post.createdAt.toISOString(),
          updatedAt: post.updatedAt.toISOString(),
          images: post.images.map(img => ({
            ...img,
            createdAt: img.createdAt.toISOString(),
            updatedAt: img.updatedAt.toISOString(),
          })),
          thumbnailUrl,
        };
      })
    );
    console.timeEnd('🔐 S3 URL Generation');

    return postsWithThumbnails;
  },
  ['gallery-landing'],
  {
    revalidate: 60, // 60초마다 재검증
    tags: ['gallery'],
  }
);
