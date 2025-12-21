import Hero from "@/components/landing/Hero";
import Intro from "@/components/landing/Intro";
import NewsAndGallery from "@/components/landing/NewsAndGallery";
import Contact from "@/components/landing/Contact";
import Welcome from "@/components/landing/Welcome";
import FAQ from "@/components/landing/FAQ";
import ServiceTimes from "@/components/landing/ServiceTimes";
import Ministries from "@/components/landing/Ministries";

export default function JaejadlePage() {

  return (
    <div>
      <Hero />
      <Intro />
      <Welcome />
      {/* <NewsAndGallery /> */}
      <Contact />
      <FAQ />
      <ServiceTimes />
      <Ministries />
    </div>
  );
}