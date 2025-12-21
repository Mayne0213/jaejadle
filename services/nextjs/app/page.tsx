import Hero from "@/components/landing/Hero";
import Intro from "@/components/landing/Intro";
import NewsAndGallery from "@/components/landing/NewsAndGallery";
import Contact from "@/components/landing/Contact";
import Welcome from "@/components/landing/Welcome";
import { Suspense } from "react";

// 동적 렌더링 (빌드 시 정적 생성 방지)
export const dynamic = 'force-dynamic';

export default function JaejadlePage() {

  return (
    <div>
      <Hero />
      <Intro />
      <Welcome />
      <Suspense fallback={<NewsAndGallerySkeleton />}>
        <NewsAndGallery />
      </Suspense>
      <Contact />
    </div>
  );
}

// 로딩 스켈레톤
function NewsAndGallerySkeleton() {
  return (
    <section className="py-16 smalltablet:py-20 pc:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 smalltablet:px-6 pc:px-8">
        <div className="grid pc:grid-cols-2 gap-10 smalltablet:gap-12">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-200 rounded w-1/3 mb-8"></div>
            <div className="space-y-4">
              {[1,2,3,4].map(i => (
                <div key={i} className="h-20 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
          <div className="animate-pulse">
            <div className="h-12 bg-gray-200 rounded w-1/3 mb-8"></div>
            <div className="grid grid-cols-2 gap-3">
              {[1,2,3,4].map(i => (
                <div key={i} className="aspect-square bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}