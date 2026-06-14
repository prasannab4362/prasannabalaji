import AboutSection from "@/components/AboutSection/AboutSection";
import Certifications from "@/components/Certifications/Certifications";

export const metadata = {
  title: "About | Prasanna B - AI and Automation",
  description: "Learn more about Prasanna B's background, vision, and certifications.",
};

export default function AboutPage() {
  return (
    <main style={{ paddingTop: '80px' }}>
      <AboutSection />
      <Certifications />
    </main>
  );
}
