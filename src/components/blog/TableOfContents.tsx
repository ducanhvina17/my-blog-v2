
import { useState, useEffect, useRef } from "react";
import { Link } from "lucide-react";

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  activeId: string;
}

export function TableOfContents({ activeId }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([]);

  useEffect(() => {
    // Find all headings in the article
    const article = document.querySelector('article');
    if (!article) return;
    
    const elements = Array.from(article.querySelectorAll('h1, h2, h3'));
    const headingsList = elements.map((element) => {
      // Add IDs to headings if they don't have them
      if (!element.id) {
        element.id = element.textContent?.toLowerCase().replace(/\s+/g, '-') ?? '';
      }
      
      return {
        id: element.id,
        text: element.textContent || '',
        level: parseInt(element.tagName.charAt(1))
      };
    });
    
    setHeadings(headingsList);
  }, []);

  if (headings.length < 2) return null;

  return (
    <nav className="not-prose mb-8 py-4">
      <div className="flex items-center mb-2 text-sm font-medium text-muted-foreground">
        <Link className="h-3.5 w-3.5 mr-2" />
        <span>Table of Contents</span>
      </div>
      <ul className="space-y-1 text-sm">
        {headings.map((heading) => (
          <li key={heading.id} style={{ paddingLeft: `${(heading.level - 1) * 0.5}rem` }}>
            <a
              href={`#${heading.id}`}
              className={`block py-1 transition-colors ${
                activeId === heading.id
                  ? 'text-primary font-medium'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
