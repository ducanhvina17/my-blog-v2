
import { Calendar, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { BlogPost } from "@/types";
import { formatDate } from "@/lib/utils";
import { Card } from "@/components/ui/card";

interface BlogListItemProps {
  post: BlogPost;
  index: number;
}

export function BlogListItem({ post, index }: BlogListItemProps) {
  const animationDelay = `${index * 50}ms`;
  
  return (
    <Card
      className="animate-fade-in border-l-4 border-l-primary transition-all hover:border-l-primary/70 hover:shadow-md"
      style={{ animationDelay }}
    >
      <Link to={`/blog/${post.slug}`} className="flex flex-col sm:flex-row">
        <div className="sm:hidden aspect-video w-full overflow-hidden bg-muted">
          <img
            src={post.coverImage}
            alt={post.title}
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="hidden sm:block sm:w-48 md:w-56 lg:w-72 aspect-video overflow-hidden bg-muted">
          <img
            src={post.coverImage}
            alt={post.title}
            className="h-full w-full object-cover object-center transition-transform hover:scale-105"
          />
        </div>
        <div className="flex flex-col justify-between p-4 sm:flex-1">
          <div>
            <div className="flex flex-wrap gap-2 mb-2">
              {post.tags.map((tag) => (
                <span key={tag} className="tag-badge">
                  {tag}
                </span>
              ))}
            </div>
            <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
            <p className="text-muted-foreground line-clamp-2">{post.excerpt}</p>
          </div>
          <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{post.readingTime} min read</span>
            </div>
          </div>
        </div>
      </Link>
    </Card>
  );
}
