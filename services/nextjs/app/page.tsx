import Hero from "@/components/landing/Hero";
import Intro from "@/components/landing/Intro";
import NewsAndGalleryClient from "@/components/landing/NewsAndGalleryClient";
import Contact from "@/components/landing/Contact";
import Welcome from "@/components/landing/Welcome";

export default function JaejadlePage() {

  return (
    <div>
      <Hero />
      <Intro />
      <Welcome />
      <NewsAndGalleryClient />
      <Contact />
    </div>
  );
}