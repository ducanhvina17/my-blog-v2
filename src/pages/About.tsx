
import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const About = () => {
  const skills = [
    { category: "Languages", items: ["TypeScript", "JavaScript", "Python", "SQL"] },
    { category: "Frontend", items: ["React", "Next.js", "TailwindCSS", "Framer Motion"] },
    { category: "Backend", items: ["Node.js", "Express", "PostgreSQL", "MongoDB"] },
    { category: "DevOps", items: ["AWS", "Docker", "CI/CD", "Terraform"] },
    { category: "Tools", items: ["Git", "VS Code", "Figma", "Notion"] }
  ];

  const experiences = [
    {
      period: "2022 - Present",
      title: "Independent Developer",
      description: "Building and launching my own products and working with select clients on interesting projects."
    },
    {
      period: "2019 - 2022",
      title: "Senior Frontend Developer",
      description: "Led frontend development for a SaaS startup, building features used by thousands of customers."
    },
    {
      period: "2017 - 2019",
      title: "Full Stack Developer",
      description: "Worked on a range of web applications using React, Node.js, and various databases."
    },
    {
      period: "2015 - 2017",
      title: "Junior Developer",
      description: "Started my career working on web applications and learning the fundamentals of software development."
    }
  ];

  return (
    <Layout>
      <div className="container py-10">
        <div className="mb-16 grid gap-10 md:grid-cols-2">
          <div className="animate-fade-in">
            <h1 className="mb-4">About Me</h1>
            <div className="space-y-4 text-lg">
              <p>
                Hello! I'm an indie developer passionate about creating useful software and sharing what I learn along the way.
              </p>
              <p>
                After several years working in tech companies, I decided to pursue the independent route, building my own products and working with select clients on projects I'm passionate about.
              </p>
              <p>
                When I'm not coding, you'll find me writing technical articles, contributing to open-source projects, and exploring new technologies.
              </p>
              <p>
                This blog is my digital garden where I share insights, tutorials, and lessons learned from my journey as an indie developer.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild variant="default">
                <a href="mailto:contact@example.com">
                  <Mail className="mr-2 h-4 w-4" />
                  Get in Touch
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <Twitter className="mr-2 h-4 w-4" />
                  Twitter
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="mr-2 h-4 w-4" />
                  LinkedIn
                </a>
              </Button>
            </div>
          </div>

          <div className="animate-fade-in" style={{ animationDelay: "200ms" }}>
            <div className="h-full rounded-lg border border-border bg-card p-6 shadow-sm">
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 overflow-hidden rounded-full border-4 border-primary p-1">
                  <div className="h-32 w-32 overflow-hidden rounded-full bg-muted">
                    {/* Avatar placeholder - replace with your profile image */}
                    <div className="flex h-full w-full items-center justify-center bg-primary/20 text-3xl font-bold text-primary">
                      JD
                    </div>
                  </div>
                </div>
                <h2 className="mb-2 text-2xl font-bold">Jane Developer</h2>
                <p className="mb-4 text-muted-foreground">Indie Developer & Writer</p>
                <div className="mb-4 flex flex-wrap justify-center gap-2">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    React
                  </span>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    TypeScript
                  </span>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    Node.js
                  </span>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    UI/UX
                  </span>
                </div>
                <p>
                  Building useful tools for developers and sharing what I learn along the way.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="mb-6 text-3xl font-bold">Skills & Technologies</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((skill, index) => (
              <Card key={skill.category} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <CardHeader>
                  <CardTitle>{skill.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {skill.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full bg-secondary px-3 py-1 text-xs font-medium"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <h2 className="mb-6 text-3xl font-bold">Experience</h2>
          <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-border md:before:mx-auto md:before:translate-x-0">
            {experiences.map((item, index) => (
              <div
                key={index}
                className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground shadow md:order-1 md:mx-4">
                  <span>{item.period.split('-')[0]}</span>
                </div>
                <div className="w-[calc(100%-4rem)] rounded-lg border border-border bg-card p-4 shadow-sm md:w-5/12">
                  <div className="mb-1 text-xs text-muted-foreground">{item.period}</div>
                  <div className="mb-2 text-xl font-bold">{item.title}</div>
                  <div className="text-muted-foreground">{item.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold">Let's Connect</h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
            I'm always interested in hearing about new projects, opportunities, or just chatting about web development.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <a href="mailto:contact@example.com">
                <Mail className="mr-2 h-5 w-5" />
                Send me an email
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="#" target="_blank" rel="noopener noreferrer">
                Download Resume
              </a>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
