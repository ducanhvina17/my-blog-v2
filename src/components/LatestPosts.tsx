
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BlogCard } from "@/components/blog/BlogCard";
import { blogPosts } from "@/data/blog-data";

export function LatestPosts() {
  const latestPosts = blogPosts.slice(0, 3);
  
  return (
    <section className="py-16 bg-muted/30">
      <div className="container">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Latest Posts</h2>
            <p className="mt-2 text-muted-foreground">
              Thoughts on development, design, and the indie hacking journey
            </p>
          </div>
          <Button asChild variant="ghost" className="group">
            <Link to="/blog">
              View all posts
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {latestPosts.map((post, index) => (
            <BlogCard key={post.slug} post={post} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
