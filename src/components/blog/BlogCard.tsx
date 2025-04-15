
import { Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BlogPost } from "@/types";
import { formatDate } from "@/lib/utils";

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

export function BlogCard({ post, index }: BlogCardProps) {
  const animationDelay = `${index * 100}ms`;
  
  return (
    <Card 
      className="blog-card card-hover overflow-hidden animate-fade-in transition-all" 
      style={{ animationDelay }}
    >
      <Link to={`/blog/${post.slug}`} className="block h-full">
        <div className="aspect-video w-full overflow-hidden bg-muted">
          <img
            src={post.coverImage}
            alt={post.title}
            className="h-full w-full object-cover object-center transition-transform hover:scale-105"
          />
        </div>
        <CardHeader>
          <div className="flex flex-wrap gap-2 mb-2">
            {post.tags.map((tag) => (
              <span key={tag} className="tag-badge">
                {tag}
              </span>
            ))}
          </div>
          <CardTitle className="line-clamp-2">{post.title}</CardTitle>
          <CardDescription className="line-clamp-2">
            {post.excerpt}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {post.excerpt}
          </p>
        </CardContent>
        <CardFooter className="border-t border-border/50 bg-muted/30 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="h-3 w-3" />
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </div>
        </CardFooter>
      </Link>
    </Card>
  );
}
