
import { ReactNode, useEffect, useRef } from "react";
import { MainNav } from "@/components/MainNav";
import { Footer } from "@/components/Footer";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to top on navigation
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [children]);

  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <main ref={contentRef} className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
