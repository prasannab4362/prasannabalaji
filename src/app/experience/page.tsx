import ExperienceTimeline from "@/components/ExperienceTimeline/ExperienceTimeline";

export const metadata = {
  title: "Experience | Prasanna B - AI and Automation",
  description: "Professional experience of Prasanna B as an AI Engineer.",
};

export default function ExperiencePage() {
  return (
    <main style={{ paddingTop: '80px', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <ExperienceTimeline />
    </main>
  );
}
