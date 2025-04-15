
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function getRandomAvatar(name: string): string {
  // Generate a deterministic color based on the name
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  const hue = hash % 360;
  return `hsla(${hue}, 70%, 60%, 1)`;
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
}

export function getAllTags(posts: Array<{ tags: string[] }>): string[] {
  const allTags = posts.flatMap(post => post.tags);
  const uniqueTags = [...new Set(allTags)];
  return uniqueTags.sort();
}

export function getAllUniqueYears(dates: string[]): number[] {
  const years = dates.map(date => new Date(date).getFullYear());
  return [...new Set(years)].sort((a, b) => b - a); // Sort descending
}

export function estimateReadingTime(text: string): number {
  const wordsPerMinute = 200;
  const numberOfWords = text.split(/\s/g).length;
  return Math.ceil(numberOfWords / wordsPerMinute);
}
