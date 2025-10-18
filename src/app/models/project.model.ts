export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  technologies: string[];
  githubUrl?: string;
  demoUrl?: string;
  featured: boolean;
  category: 'web' | 'mobile' | 'desktop' | 'other';
}
