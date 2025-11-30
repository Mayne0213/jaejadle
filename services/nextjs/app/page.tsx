import Hero from "@/components/landing/Hero";
import Intro from "@/components/landing/Intro";
import NewsAndGallery from "@/components/landing/NewsAndGallery";
import Ministries from "@/components/landing/Ministries";
import FAQ from "@/components/landing/FAQ";
import Contact from "@/components/landing/Contact";
import Welcome from "@/components/landing/Welcome";

export default function JaejadlePage() {

  return (
    <div>
      <Hero />
      <Intro />
      <Welcome />
      <NewsAndGallery />
      <FAQ />
      <Ministries />
      <Contact />
    </div>
  );
}