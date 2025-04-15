
import { useState, useEffect } from "react";
import { Search, Grid, List, X } from "lucide-react";
import { useLocation } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { BlogCard } from "@/components/blog/BlogCard";
import { BlogListItem } from "@/components/blog/BlogListItem";
import { TagFilter } from "@/components/blog/TagFilter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { blogPosts } from "@/data/blog-data";
import { getAllTags } from "@/lib/utils";

type ViewMode = "grid" | "list";

const Blog = () => {
  const location = useLocation();
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  
  const tags = getAllTags(blogPosts);

  // Load saved view preference and initialize search if requested
  useEffect(() => {
    const savedView = localStorage.getItem("blog-view-mode") as ViewMode | null;
    if (savedView) {
      setViewMode(savedView);
    }
    
    // Check if search parameter is present in URL
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get("search") === "true") {
      const searchInput = document.getElementById("search-posts");
      if (searchInput) {
        searchInput.focus();
        setIsSearchFocused(true);
      }
    }
  }, [location.search]);
  
  // Save view preference
  const handleViewChange = (value: ViewMode) => {
    if (value) {
      setViewMode(value);
      localStorage.setItem("blog-view-mode", value);
    }
  };
  
  // Filter posts by search query and tags
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

  const handleSearchClear = () => {
    setSearchQuery("");
    const searchInput = document.getElementById("search-posts");
    if (searchInput) {
      searchInput.focus();
    }
  };

  return (
    <Layout>
      <div className="container py-10">
        <div className="mb-10 animate-fade-in">
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Blog</h1>
          <p className="text-lg text-muted-foreground">
            Thoughts, tutorials and insights on development, design, and indie hacking.
          </p>
        </div>
        
        <div className="flex flex-col gap-6 lg:flex-row">
          <div className="order-2 lg:order-1 lg:w-3/4">
            {/* View toggle and post count */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-muted-foreground">
                {filteredPosts.length} {filteredPosts.length === 1 ? "post" : "posts"} found
              </p>
              
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
            </div>
            
            {/* Posts display based on view mode */}
            {viewMode === "grid" ? (
              <div className="grid gap-6 sm:grid-cols-2">
                {filteredPosts.map((post, index) => (
                  <BlogCard key={post.slug} post={post} index={index} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {filteredPosts.map((post, index) => (
                  <BlogListItem key={post.slug} post={post} index={index} />
                ))}
              </div>
            )}
            
            {filteredPosts.length === 0 && (
              <div className="flex h-40 flex-col items-center justify-center rounded-lg border border-dashed text-center">
                <p className="mb-2 text-lg font-medium">No posts found</p>
                <p className="text-sm text-muted-foreground">
                  Try adjusting your search or filter criteria
                </p>
                <Button 
                  variant="ghost" 
                  className="mt-4" 
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedTags([]);
                  }}
                >
                  Clear all filters
                </Button>
              </div>
            )}
          </div>
          
          <div className="order-1 lg:order-2 lg:w-1/4">
            <div className="rounded-lg border border-border bg-card p-4 shadow-sm sticky top-4">
              <div className="mb-6">
                <div className="relative">
                  <Search className={`absolute left-2 top-2.5 h-4 w-4 ${
                    isSearchFocused ? 'text-primary' : 'text-muted-foreground'
                  } transition-colors`} />
                  <Input
                    id="search-posts"
                    placeholder="Search posts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8 pr-8 transition-all border-muted focus:border-primary"
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                  />
                  {searchQuery && (
                    <button
                      onClick={handleSearchClear}
                      className="absolute right-2 top-2.5 text-muted-foreground hover:text-foreground"
                      aria-label="Clear search"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
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
