
import { useState } from "react";
import { Search } from "lucide-react";
import { Layout } from "@/components/Layout";
import { BlogCard } from "@/components/blog/BlogCard";
import { TagFilter } from "@/components/blog/TagFilter";
import { Input } from "@/components/ui/input";
import { blogPosts } from "@/data/blog-data";
import { getAllTags } from "@/lib/utils";

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  const tags = getAllTags(blogPosts);
  
  const filteredPosts = blogPosts.filter((post) => {
    // Filter by search query
    const matchesSearch =
      searchQuery === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Filter by selected tags
    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.every((tag) => post.tags.includes(tag));
    
    return matchesSearch && matchesTags;
  });

  const handleTagSelect = (tag: string) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    );
  };

  const handleTagClear = () => {
    setSelectedTags([]);
  };

  return (
    <Layout>
      <div className="container py-10">
        <div className="mb-10 animate-fade-in">
          <h1 className="mb-4">Blog</h1>
          <p className="text-lg text-muted-foreground">
            Thoughts, tutorials and insights on development, design, and indie hacking.
          </p>
        </div>
        
        <div className="flex flex-col gap-6 lg:flex-row">
          <div className="order-2 lg:order-1 lg:w-3/4">
            <div className="mb-6 grid gap-6 sm:grid-cols-2">
              {filteredPosts.map((post, index) => (
                <BlogCard key={post.slug} post={post} index={index} />
              ))}
            </div>
            
            {filteredPosts.length === 0 && (
              <div className="flex h-40 flex-col items-center justify-center rounded-lg border border-dashed text-center">
                <p className="mb-2 text-lg font-medium">No posts found</p>
                <p className="text-sm text-muted-foreground">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </div>
          
          <div className="order-1 lg:order-2 lg:w-1/4">
            <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search posts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>
              
              <TagFilter
                tags={tags}
                selectedTags={selectedTags}
                onTagSelect={handleTagSelect}
                onTagClear={handleTagClear}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Blog;
