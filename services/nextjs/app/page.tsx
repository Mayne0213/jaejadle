import Hero from "@/components/landing/Hero";
import Intro from "@/components/landing/Intro";
import NewsAndGallery from "@/components/landing/NewsAndGallery";
import Contact from "@/components/landing/Contact";
import Welcome from "@/components/landing/Welcome";

// 빌드 시 정적 생성 방지 (데이터베이스 연결이 필요하므로 런타임에 렌더링)
export const dynamic = 'force-dynamic';
// 캐싱 설정
export const revalidate = 60; // 60초마다 재검증

export default function JaejadlePage() {

  return (
    <div>
      <Hero />
      <Intro />
      <Welcome />
      <NewsAndGallery />
      <Contact />
    </div>
  );
}