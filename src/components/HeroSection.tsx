
import { ArrowRight, Github, Linkedin, Twitter } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function HeroSection() {
  const [typedText, setTypedText] = useState("");
  const fullText = "indie developer";
  
  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setTypedText(fullText.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);
    
    return () => clearInterval(typingInterval);
  }, []);
  
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Abstract shapes */}
      <div className="absolute -top-10 -left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
      
      <div className="container relative flex flex-col items-center text-center">
        <div className="animate-fade-in mb-6 overflow-hidden rounded-full border-4 border-primary p-1">
          <div className="h-32 w-32 overflow-hidden rounded-full bg-muted">
            {/* Avatar placeholder - replace with your profile image */}
            <div className="flex h-full w-full items-center justify-center bg-primary/20 text-3xl font-bold text-primary">
              ID
            </div>
          </div>
        </div>
        
        <h1 className="mb-4 animate-fade-in text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
          Hello, I'm an{" "}
          <span className="text-primary relative">
            {typedText}
            <span className="absolute -right-1 top-0 h-full w-1 animate-pulse bg-primary" style={{ display: typedText === fullText ? 'none' : 'block' }}></span>
          </span>
        </h1>
        
        <p className="mb-8 max-w-2xl animate-fade-in text-lg text-muted-foreground md:text-xl">
          Welcome to my digital garden where I share my journey in coding, design, and building indie products.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild className="animate-fade-in" style={{ animationDelay: "200ms" }}>
            <Link to="/blog">
              Read My Blog <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          
          <div className="flex items-center gap-3 animate-fade-in" style={{ animationDelay: "400ms" }}>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="rounded-full bg-secondary p-2.5 text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="rounded-full bg-secondary p-2.5 text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="rounded-full bg-secondary p-2.5 text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
