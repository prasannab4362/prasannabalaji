import SkillsMarquee from "@/components/SkillsMarquee/SkillsMarquee";

export const metadata = {
  title: "Skills | Prasanna B - AI and Automation",
  description: "Technical skills including Generative AI, Agentic workflows, Computer Vision, and Automation.",
};

export default function SkillsPage() {
  return (
    <main style={{ paddingTop: '80px', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <SkillsMarquee />
    </main>
  );
}
