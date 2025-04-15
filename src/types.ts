
export interface Author {
  name: string;
  avatar?: string;
  bio?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  coverImage: string;
  readingTime: number;
  tags: string[];
  author: Author;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  demoUrl?: string;
  githubUrl?: string;
  tags: string[];
  featured: boolean;
}
