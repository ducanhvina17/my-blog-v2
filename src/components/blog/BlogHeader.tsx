
import { Calendar, Clock, Tag } from "lucide-react";
import { BlogPost } from "@/types";
import { formatDate } from "@/lib/utils";

interface BlogHeaderProps {
  post: BlogPost;
}

export function BlogHeader({ post }: BlogHeaderProps) {
  return (
    <div className="mb-10 animate-fade-in">
      <div className="mb-4">
        {post.tags.map((tag) => (
          <span key={tag} className="tag-badge mr-2">
            {tag}
          </span>
        ))}
      </div>
      
      <h1 className="mb-4 text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl lg:text-5xl">
        {post.title}
      </h1>
      
      <p className="mb-6 text-xl text-muted-foreground">
        {post.excerpt}
      </p>
      
      <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <Calendar className="h-4 w-4" />
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </div>
        
        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
          <span>{post.readingTime} min read</span>
        </div>
        
        <div className="flex items-center gap-1">
          <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold">
            {post.author.name.charAt(0)}
          </div>
          <span>{post.author.name}</span>
        </div>
      </div>
    </div>
  );
}
