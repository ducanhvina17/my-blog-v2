
import { Layout } from "@/components/Layout";
import { HeroSection } from "@/components/HeroSection";
import { LatestPosts } from "@/components/LatestPosts";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import { AboutSection } from "@/components/AboutSection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <LatestPosts />
      <AboutSection />
      <FeaturedProjects />
    </Layout>
  );
};

export default Index;
