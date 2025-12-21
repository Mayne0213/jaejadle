import { prisma } from '@/lib/prisma';
import { unstable_cache } from 'next/cache';

export interface AnnouncementAuthor {
  userId: string;
  userName: string;
}

export interface Announcement {
  id: number;
  title: string;
  content: string;
  isImportant: boolean;
  viewCount: number;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  author: AnnouncementAuthor;
}

/**
 * 서버 사이드에서 공지사항 목록 조회 (캐싱 적용)
 */
export const getAnnouncementsServer = unstable_cache(
  async (limit: number = 6) => {
    const announcements = await prisma.announcement.findMany({
      include: {
        author: {
          select: {
            id: true,
            userId: true,
            userName: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });

    return announcements.map(announcement => ({
      ...announcement,
      createdAt: announcement.createdAt.toISOString(),
      updatedAt: announcement.updatedAt.toISOString(),
    }));
  },
  ['announcements-landing'],
  {
    revalidate: 60, // 60초마다 재검증
    tags: ['announcements'],
  }
);
