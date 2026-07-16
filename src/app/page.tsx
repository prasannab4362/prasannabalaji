import HeroSection from "@/components/HeroSection/HeroSection";
import AboutSection from "@/components/AboutSection/AboutSection";
import SkillsMarquee from "@/components/SkillsMarquee/SkillsMarquee";
import ExperienceTimeline from "@/components/ExperienceTimeline/ExperienceTimeline";
import FeaturedProjects from "@/components/FeaturedProjects/FeaturedProjects";
import GithubSection from "@/components/GithubSection/GithubSection";
import ContactSection from "@/components/ContactSection/ContactSection";

export default function Home() {
  return (
    <div className="scroll-container">
      <div className="scroll-section" id="home">
        <HeroSection />
      </div>
      <div className="scroll-section" id="about">
        <AboutSection />
      </div>
      <div className="scroll-section" id="skills">
        <SkillsMarquee />
      </div>
      <div className="scroll-section" id="experience">
        <ExperienceTimeline />
      </div>
      <div className="scroll-section" id="projects">
        <FeaturedProjects />
        <GithubSection />
      </div>
      <div className="scroll-section" id="contact">
        <ContactSection />
      </div>
    </div>
  );
}
