
import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { HeroSection } from "@/components/HeroSection";
import { LatestPosts } from "@/components/LatestPosts";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import { AboutSection } from "@/components/AboutSection";
import { CommandMenu } from "@/components/CommandMenu";
import { useIntersectionAnimation } from "@/lib/animation-utils";

const Index = () => {
  const [commandMenuOpen, setCommandMenuOpen] = useState(false);
  
  const heroAnimation = useIntersectionAnimation(0.1);
  const postsAnimation = useIntersectionAnimation(0.1);
  const aboutAnimation = useIntersectionAnimation(0.1);
  const projectsAnimation = useIntersectionAnimation(0.1);

  // Handle keyboard shortcut for command menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandMenuOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <Layout>
      {/* Command palette */}
      <CommandMenu open={commandMenuOpen} onOpenChange={setCommandMenuOpen} />
      
      {/* Hero section with animation */}
      <div 
        ref={heroAnimation.ref} 
        className={`transition-opacity duration-500 ease-out ${
          heroAnimation.isVisible ? "opacity-100" : "opacity-0 transform translate-y-4"
        }`}
      >
        <HeroSection />
      </div>
      
      {/* Latest posts with animation */}
      <div 
        ref={postsAnimation.ref} 
        className={`transition-all duration-500 ease-out delay-100 ${
          postsAnimation.isVisible ? "opacity-100" : "opacity-0 transform translate-y-4"
        }`}
      >
        <LatestPosts />
      </div>
      
      {/* About section with animation */}
      <div 
        ref={aboutAnimation.ref} 
        className={`transition-all duration-500 ease-out delay-200 ${
          aboutAnimation.isVisible ? "opacity-100" : "opacity-0 transform translate-y-4"
        }`}
      >
        <AboutSection />
      </div>
      
      {/* Featured projects with animation */}
      <div 
        ref={projectsAnimation.ref} 
        className={`transition-all duration-500 ease-out delay-300 ${
          projectsAnimation.isVisible ? "opacity-100" : "opacity-0 transform translate-y-4"
        }`}
      >
        <FeaturedProjects />
      </div>
    </Layout>
  );
};

export default Index;
