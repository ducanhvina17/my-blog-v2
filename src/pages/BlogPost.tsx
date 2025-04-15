
import { useEffect, useState, useRef } from "react";
import { ArrowLeft, ArrowRight, Share, Copy, Check, Link, X } from "lucide-react";
import { useParams, Link as RouterLink } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { BlogHeader } from "@/components/blog/BlogHeader";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { CodeBlock } from "@/components/blog/CodeBlock";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { blogPosts } from "@/data/blog-data";
import { BlogPost as BlogPostType } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { formatDate } from "@/lib/utils";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [prevPost, setPrevPost] = useState<BlogPostType | null>(null);
  const [nextPost, setNextPost] = useState<BlogPostType | null>(null);
  const [readingProgress, setReadingProgress] = useState(0);
  const [activeHeading, setActiveHeading] = useState("");
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState("");
  const { toast } = useToast();
  
  const contentRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const currentPost = blogPosts.find((p) => p.slug === slug);
    if (currentPost) {
      setPost(currentPost);
      
      const currentIndex = blogPosts.findIndex((p) => p.slug === slug);
      setPrevPost(currentIndex > 0 ? blogPosts[currentIndex - 1] : null);
      setNextPost(currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null);
    }
  }, [slug]);

  useEffect(() => {
    const updateReadingProgress = () => {
      const scrolled = window.scrollY;
      const articleHeight = document.body.scrollHeight - window.innerHeight;
      if (articleHeight) {
        setReadingProgress((scrolled / articleHeight) * 100);
      }
    };
    
    window.addEventListener('scroll', updateReadingProgress);
    return () => window.removeEventListener('scroll', updateReadingProgress);
  }, []);

  // Set up intersection observer for headings to track active section
  useEffect(() => {
    if (!contentRef.current) return;
    
    // Disconnect previous observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }
    
    // Set a small delay to ensure DOM elements are loaded
    const timer = setTimeout(() => {
      const headings = Array.from(document.querySelectorAll('h1, h2, h3'));
      
      // Add IDs to headings if they don't have them
      headings.forEach(heading => {
        if (!heading.id) {
          heading.id = heading.textContent?.toLowerCase().replace(/\s+/g, '-') ?? '';
        }
      });
      
      // Create new observer
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveHeading(entry.target.id);
            }
          });
        },
        {
          rootMargin: '-100px 0px -80% 0px',
          threshold: 0.1
        }
      );
      
      // Observe all headings
      headings.forEach(heading => observerRef.current?.observe(heading));
    }, 500);
    
    return () => {
      clearTimeout(timer);
      observerRef.current?.disconnect();
    };
  }, [post]);

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: post?.title,
          text: post?.excerpt,
          url: window.location.href,
        })
        .catch((error) => console.error('Error sharing', error));
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied to clipboard",
        description: "You can now share this post with others",
      });
    }
  };
  
  const handleCopyLink = (id: string) => {
    const url = `${window.location.href.split('#')[0]}#${id}`;
    navigator.clipboard.writeText(url);
    toast({
      title: "Link copied",
      description: "Section link has been copied to clipboard",
      duration: 2000,
    });
  };
  
  const openLightbox = (src: string) => {
    setLightboxImage(src);
    setIsLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };
  
  const closeLightbox = () => {
    setIsLightboxOpen(false);
    document.body.style.overflow = '';
  };

  // Process markdown content
  const processContent = (content: string) => {
    // This is a simplified example - a real implementation would use a proper markdown parser
    // For this example, we'll just handle basic headings, code blocks, and images
    
    return content.split('\n').map((line, i) => {
      // Handle headings
      if (line.startsWith('# ')) {
        const text = line.substring(2);
        const id = text.toLowerCase().replace(/\s+/g, '-');
        return (
          <h1 id={id} key={i} className="group">
            {text}
            <button 
              onClick={() => handleCopyLink(id)}
              className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Copy link to section"
            >
              <Link className="h-4 w-4" />
            </button>
          </h1>
        );
      }
      if (line.startsWith('## ')) {
        const text = line.substring(3);
        const id = text.toLowerCase().replace(/\s+/g, '-');
        return (
          <h2 id={id} key={i} className="group">
            {text}
            <button 
              onClick={() => handleCopyLink(id)}
              className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Copy link to section"
            >
              <Link className="h-4 w-4" />
            </button>
          </h2>
        );
      }
      if (line.startsWith('### ')) {
        const text = line.substring(4);
        const id = text.toLowerCase().replace(/\s+/g, '-');
        return (
          <h3 id={id} key={i} className="group">
            {text}
            <button 
              onClick={() => handleCopyLink(id)}
              className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Copy link to section"
            >
              <Link className="h-4 w-4" />
            </button>
          </h3>
        );
      }
      
      // Handle image links (simplified)
      if (line.match(/!\[.*?\]\(.*?\)/)) {
        const alt = line.match(/!\[(.*?)\]/)?.[1] || '';
        const src = line.match(/\((.*?)\)/)?.[1] || '';
        return (
          <figure key={i} className="my-6">
            <img 
              src={src} 
              alt={alt} 
              className="rounded-md cursor-zoom-in" 
              onClick={() => openLightbox(src)}
            />
            {alt && <figcaption className="text-center text-sm text-muted-foreground mt-2">{alt}</figcaption>}
          </figure>
        );
      }
      
      // Handle code blocks (simplified - this would need more sophisticated parsing)
      if (line.startsWith('```')) {
        // Skip the opening marker
        return null;
      }
      
      // Handle empty lines as paragraph breaks
      if (line.trim() === '') {
        return <br key={i} />;
      }
      
      // Regular text
      return <p key={i}>{line}</p>;
    });
  };

  if (!post) {
    return (
      <Layout>
        <div className="container py-10">
          <div className="flex h-96 items-center justify-center">
            <p className="text-xl">Post not found</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Reading progress bar */}
      <div
        className="fixed top-16 left-0 z-30 h-1 bg-primary transition-all duration-300"
        style={{ width: `${readingProgress}%` }}
      />

      <article className="container py-10">
        <div className="mx-auto max-w-3xl">
          <BlogHeader post={post} />
          
          <div className="aspect-video w-full overflow-hidden rounded-lg bg-muted mb-8 animate-fade-in">
            <img
              src={post.coverImage}
              alt={post.title}
              className="h-full w-full object-cover"
              onClick={() => openLightbox(post.coverImage)}
            />
          </div>
          
          <div className="lg:flex lg:gap-10">
            {/* Table of contents (desktop) */}
            <div className="hidden lg:block lg:w-64 sticky top-24 self-start">
              <TableOfContents activeId={activeHeading} />
            </div>
            
            {/* Article content */}
            <div 
              ref={contentRef}
              className="prose prose-lg dark:prose-invert mx-auto lg:mx-0 animate-fade-in"
            >
              {processContent(post.content)}
            </div>
          </div>
          
          <div className="mt-10 flex justify-center">
            <Button
              variant="outline"
              className="rounded-full"
              onClick={handleShare}
            >
              <Share className="mr-2 h-4 w-4" />
              Share this post
            </Button>
          </div>
          
          <div className="my-10 border-t border-border" />
          
          <div className="flex flex-col gap-6 sm:flex-row">
            {prevPost && (
              <Card className="flex-1 transition-all hover:shadow-lg hover:-translate-y-1">
                <RouterLink
                  to={`/blog/${prevPost.slug}`}
                  className="flex h-full flex-col p-4"
                >
                  <div className="mb-2 text-sm text-muted-foreground">
                    Previous Post
                  </div>
                  <h3 className="mb-2 line-clamp-2 text-lg font-medium">
                    <ArrowLeft className="mr-1 inline h-4 w-4" />
                    {prevPost.title}
                  </h3>
                  <div className="mt-auto text-xs text-muted-foreground">
                    {formatDate(prevPost.date)}
                  </div>
                </RouterLink>
              </Card>
            )}
            
            {nextPost && (
              <Card className="flex-1 transition-all hover:shadow-lg hover:-translate-y-1">
                <RouterLink
                  to={`/blog/${nextPost.slug}`}
                  className="flex h-full flex-col p-4 text-right"
                >
                  <div className="mb-2 text-sm text-muted-foreground">
                    Next Post
                  </div>
                  <h3 className="mb-2 line-clamp-2 text-lg font-medium">
                    {nextPost.title}
                    <ArrowRight className="ml-1 inline h-4 w-4" />
                  </h3>
                  <div className="mt-auto text-xs text-muted-foreground">
                    {formatDate(nextPost.date)}
                  </div>
                </RouterLink>
              </Card>
            )}
          </div>
          
          <div className="my-10 flex items-center justify-center">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button asChild variant="ghost">
                    <a
                      href={`https://github.com/example/blog/edit/main/posts/${slug}.md`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Edit this post on GitHub
                    </a>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Found a typo? Help fix it!</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </article>
      
      {/* Image lightbox */}
      {isLightboxOpen && (
        <div 
          className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center"
          onClick={closeLightbox}
        >
          <div className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-lg">
            <img 
              src={lightboxImage} 
              alt="Enlarged view" 
              className="max-h-[90vh] w-auto object-contain"
            />
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute top-2 right-2 bg-background/50 hover:bg-background/70"
              onClick={closeLightbox}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default BlogPost;
