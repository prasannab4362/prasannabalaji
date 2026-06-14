import FeaturedProjects from "@/components/FeaturedProjects/FeaturedProjects";
import GithubSection from "@/components/GithubSection/GithubSection";

export const metadata = {
  title: "Projects | Prasanna B - AI & Automation Hub",
  description: "Featured AI projects, autonomous agents, and open-source contributions by Prasanna B.",
};

export default function ProjectsPage() {
  return (
    <main style={{ paddingTop: '80px' }}>
      <FeaturedProjects />
      <GithubSection />
    </main>
  );
}
