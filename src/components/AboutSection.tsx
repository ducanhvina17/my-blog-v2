
import { ArrowRight, Code, Lightbulb, Rocket } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function AboutSection() {
  const skills = [
    {
      title: "Development",
      description: "Building software with React, TypeScript, and Node.js",
      icon: Code,
    },
    {
      title: "Product Design",
      description: "Crafting intuitive and beautiful user experiences",
      icon: Lightbulb,
    },
    {
      title: "Indie Hacking",
      description: "Creating and launching products independently",
      icon: Rocket,
    },
  ];

  return (
    <section className="py-16">
      <div className="container">
        <div className="mb-10">
          <h2 className="text-3xl font-bold tracking-tight">About Me</h2>
          <p className="mt-2 text-muted-foreground">
            A bit about who I am and what I do
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <p className="leading-relaxed">
              I'm an developer passionate about building products that solve real problems. 
              With a background in software engineering, I enjoy the entire process from ideation to launch.
            </p>
            <p className="leading-relaxed">
              When I'm not coding, you'll find me writing about tech, sharing my journey, 
              and connecting with other developers and creators.
            </p>
            <div className="pt-4">
              <Button asChild variant="outline" className="group">
                <Link to="/about">
                  Learn more about me
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-3">
            {skills.map((skill, index) => (
              <Card key={index} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <CardHeader className="space-y-0 pb-2">
                  <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <skill.icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-lg">{skill.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{skill.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
