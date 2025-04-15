
import { Github, Linkedin, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-muted/30 py-12">
      <div className="container flex flex-col items-center gap-6 md:flex-row md:justify-between">
        <div className="flex flex-col items-center gap-4 md:items-start">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-lg font-bold text-foreground bg-primary text-primary-foreground w-8 h-8 flex items-center justify-center rounded-md">I</span>
            <span className="text-base font-bold">Indie Dev Blog</span>
          </Link>
          <p className="text-sm text-muted-foreground text-center md:text-left">
            Exploring code, design, and the indie hacker journey
          </p>
        </div>
        
        <nav className="flex flex-col gap-4 text-center md:flex-row md:items-center md:gap-6">
          <Link to="/" className="text-sm hover:text-primary">Home</Link>
          <Link to="/blog" className="text-sm hover:text-primary">Blog</Link>
          <Link to="/projects" className="text-sm hover:text-primary">Projects</Link>
          <Link to="/about" className="text-sm hover:text-primary">About</Link>
        </nav>
        
        <div className="flex items-center gap-4">
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary"
            aria-label="GitHub"
          >
            <Github className="h-5 w-5" />
          </a>
          <a 
            href="https://twitter.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary"
            aria-label="Twitter"
          >
            <Twitter className="h-5 w-5" />
          </a>
          <a 
            href="https://linkedin.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-5 w-5" />
          </a>
        </div>
      </div>
      
      <div className="container mt-8 border-t border-border/50 pt-6">
        <p className="text-xs text-muted-foreground text-center">
          © {new Date().getFullYear()} Indie Developer Blog. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
