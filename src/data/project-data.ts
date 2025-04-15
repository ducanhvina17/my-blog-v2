
import { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "codehub",
    title: "CodeHub",
    description: "A modern code snippet manager for developers",
    longDescription: "CodeHub helps developers store, organize, and share code snippets with syntax highlighting and powerful search capabilities.",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    demoUrl: "https://codehub-demo.example.com",
    githubUrl: "https://github.com/example/codehub",
    tags: ["React", "TypeScript", "Firebase"],
    featured: true
  },
  {
    id: "timetrail",
    title: "TimeTrail",
    description: "Time tracking for developers",
    longDescription: "A minimalist time tracking tool designed specifically for developers with IDE integrations and project-based reporting.",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    demoUrl: "https://timetrail-demo.example.com",
    githubUrl: "https://github.com/example/timetrail",
    tags: ["React", "Node.js", "PostgreSQL"],
    featured: true
  },
  {
    id: "quickdev",
    title: "QuickDev",
    description: "Instant development environments",
    longDescription: "Spin up preconfigured development environments in seconds with this cloud-based platform supporting multiple programming languages and frameworks.",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
    demoUrl: "https://quickdev-demo.example.com",
    githubUrl: "https://github.com/example/quickdev",
    tags: ["Docker", "Kubernetes", "Cloud"],
    featured: true
  },
  {
    id: "bugtracker",
    title: "BugTracker",
    description: "Simple issue tracking for small teams",
    longDescription: "A lightweight issue tracking system focused on simplicity and ease of use, perfect for small teams and indie projects.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
    demoUrl: "https://bugtracker-demo.example.com",
    githubUrl: "https://github.com/example/bugtracker",
    tags: ["React", "Express", "MongoDB"],
    featured: false
  },
  {
    id: "devnotes",
    title: "DevNotes",
    description: "Markdown notes for developers",
    longDescription: "A markdown-based note-taking app with code syntax highlighting, diagrams, and automatic GitHub syncing.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    demoUrl: "https://devnotes-demo.example.com",
    githubUrl: "https://github.com/example/devnotes",
    tags: ["Electron", "React", "Markdown"],
    featured: false
  }
];
