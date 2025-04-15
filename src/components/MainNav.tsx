
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useIsMobile } from "@/hooks/use-mobile";

export function MainNav() {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  
  const toggleNav = () => setIsOpen(!isOpen);
  const closeNav = () => setIsOpen(false);

  const navItems = [
    { title: "Home", href: "/" },
    { title: "Blog", href: "/blog" },
    { title: "Projects", href: "/projects" },
    { title: "Docs", href: "/docs" },
    { title: "About", href: "/about" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/80 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2" onClick={closeNav}>
            <span className="text-xl font-bold text-foreground bg-primary text-primary-foreground w-8 h-8 flex items-center justify-center rounded-md">I</span>
            <span className="text-lg font-bold hidden sm:inline-block">AnhDojo Blog</span>
          </Link>
        </div>
        
        {isMobile ? (
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleNav}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        ) : (
          <nav className="flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {item.title}
              </Link>
            ))}
            <ThemeToggle />
          </nav>
        )}
      </div>
      
      {isMobile && isOpen && (
        <div className="fixed inset-0 top-16 z-50 h-[calc(100vh-4rem)] w-full overflow-auto bg-background animate-fade-in py-6 px-4">
          <nav className="flex flex-col space-y-6 text-center">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="text-lg font-medium transition-colors hover:text-primary"
                onClick={closeNav}
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
