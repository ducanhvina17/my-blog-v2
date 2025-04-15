
import { useState } from "react";
import { Search } from "lucide-react";
import { Layout } from "@/components/Layout";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { TagFilter } from "@/components/blog/TagFilter";
import { Input } from "@/components/ui/input";
import { projects } from "@/data/project-data";
import { getAllTags } from "@/lib/utils";

const Projects = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const tags = getAllTags(projects);

  const filteredProjects = projects.filter((project) => {
    // Filter by search query
    const matchesSearch =
      searchQuery === "" ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    // Filter by selected tags
    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.every((tag) => project.tags.includes(tag));

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
          <h1 className="mb-4">Projects</h1>
          <p className="text-lg text-muted-foreground">
            Applications, libraries, and tools I've built as an indie developer.
          </p>
        </div>

        <div className="mb-8 flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
          <div className="w-full sm:w-64">
            <TagFilter
              tags={tags}
              selectedTags={selectedTags}
              onTagSelect={handleTagSelect}
              onTagClear={handleTagClear}
            />
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="flex h-60 flex-col items-center justify-center rounded-lg border border-dashed text-center">
            <p className="mb-2 text-lg font-medium">No projects found</p>
            <p className="text-sm text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Projects;
