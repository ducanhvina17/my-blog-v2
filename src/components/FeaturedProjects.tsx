
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { projects } from "@/data/project-data";

export function FeaturedProjects() {
  const featuredProjects = projects
    .filter(project => project.featured)
    .slice(0, 3);
  
  return (
    <section className="py-16">
      <div className="container">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Featured Projects</h2>
            <p className="mt-2 text-muted-foreground">
              Stuff I've built and things I'm working on
            </p>
          </div>
          <Button asChild variant="ghost" className="group">
            <Link to="/projects">
              View all projects
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
