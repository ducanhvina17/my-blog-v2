
import { useState, useEffect } from "react";
import { ArrowRight, Grid, List } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BlogCard } from "@/components/blog/BlogCard";
import { BlogListItem } from "@/components/blog/BlogListItem";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { blogPosts } from "@/data/blog-data";

type ViewMode = "grid" | "list";

export function LatestPosts() {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const latestPosts = blogPosts.slice(0, 3);
  
  // Load saved view preference from localStorage
  useEffect(() => {
    const savedView = localStorage.getItem("blog-view-mode") as ViewMode | null;
    if (savedView) {
      setViewMode(savedView);
    }
  }, []);

  // Save view preference to localStorage
  const handleViewChange = (value: ViewMode) => {
    if (value) {
      setViewMode(value);
      localStorage.setItem("blog-view-mode", value);
    }
  };
  
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
          <div className="flex items-center gap-4">
            <ToggleGroup 
              type="single" 
              value={viewMode} 
              onValueChange={(value) => handleViewChange(value as ViewMode)}
              className="hidden sm:flex"
            >
              <ToggleGroupItem value="grid" aria-label="Grid view">
                <Grid className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="list" aria-label="List view">
                <List className="h-4 w-4" />
              </ToggleGroupItem>
            </ToggleGroup>
            
            <Button asChild variant="ghost" className="group">
              <Link to="/blog">
                View all posts
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
        
        {viewMode === "grid" ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latestPosts.map((post, index) => (
              <BlogCard key={post.slug} post={post} index={index} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {latestPosts.map((post, index) => (
              <BlogListItem key={post.slug} post={post} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
