
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Share } from "lucide-react";
import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { BlogHeader } from "@/components/blog/BlogHeader";
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
  const { toast } = useToast();

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
            />
          </div>
          
          <div className="prose prose-lg dark:prose-invert mx-auto animate-fade-in">
            {post.content.split('\n').map((line, i) => {
              // Handle headings
              if (line.startsWith('# ')) {
                return <h1 key={i}>{line.substring(2)}</h1>;
              }
              if (line.startsWith('## ')) {
                return <h2 key={i}>{line.substring(3)}</h2>;
              }
              if (line.startsWith('### ')) {
                return <h3 key={i}>{line.substring(4)}</h3>;
              }
              
              // Handle code blocks
              if (line.startsWith('```')) {
                return null; // Skip code block markers, would need more complex parsing for real Markdown
              }
              
              // Handle empty lines as paragraph breaks
              if (line.trim() === '') {
                return <br key={i} />;
              }
              
              // Regular text
              return <p key={i}>{line}</p>;
            })}
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
                <Link
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
                </Link>
              </Card>
            )}
            
            {nextPost && (
              <Card className="flex-1 transition-all hover:shadow-lg hover:-translate-y-1">
                <Link
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
                </Link>
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
    </Layout>
  );
};

export default BlogPost;
