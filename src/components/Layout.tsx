
import { ReactNode, useEffect, useRef, useState } from "react";
import { MainNav } from "@/components/MainNav";
import { Footer } from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { CommandMenu } from "@/components/CommandMenu";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [commandMenuOpen, setCommandMenuOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Scroll to top on navigation
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
    
    // Command palette keyboard shortcut (Cmd+K or Ctrl+K)
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandMenuOpen(true);
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [children]);

  useEffect(() => {
    // Show a toast notifying about the keyboard shortcut when the page loads
    // Only show this once per session
    const hasShownTip = sessionStorage.getItem("has-shown-keyboard-tip");
    
    if (!hasShownTip) {
      const timer = setTimeout(() => {
        toast({
          title: "Pro tip!",
          description: "Press Cmd+K (or Ctrl+K) to open the command menu",
        });
        sessionStorage.setItem("has-shown-keyboard-tip", "true");
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [toast]);

  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <CommandMenu open={commandMenuOpen} onOpenChange={setCommandMenuOpen} />
      <main ref={contentRef} className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
