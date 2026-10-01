import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import ManagedProcessSection from "../components/ManagedProcessSection";
import IndustryAdvantagesSection from "../components/IndustryAdvantagesSection";
import ProjectsGallerySection from "../components/ProjectsGallerySection";
import FaqSection from "../components/FaqSection";
import ProjectCtaSection from "../components/ProjectCtaSection";

export default function Home() {
  return (
    <div className="flex min-h-screen w-full min-w-0 flex-col overflow-x-clip bg-white text-[#18181B]">
      <Navbar />
      <HeroSection />
      <ManagedProcessSection />
      <IndustryAdvantagesSection />
      <ProjectsGallerySection />
      <FaqSection />
      <ProjectCtaSection />
    </div>
  );
}
