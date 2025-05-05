import { icons } from '@/components/achievements';

// types/about.ts
export interface SocialLinks {
  github?: string;
  linkedin?: string;
  facebook?: string;
  instagram?: string;
  codeforces?: string;
  codechef?: string;
  youtube?: string;
}

export interface AboutData {
  name: string;
  title: string;
  description: string;
  longDescription?: string;
  image?: string;
  resumeUrl?: string;
  socialLinks: SocialLinks;
  createdAt: Date;
  updatedAt: Date;
}
// types/achievement.ts
export interface Achievement {
  _id?: string;
  title: string;
  organization: string;
  year: number;
  image: string;
  description: string;
  icon?: keyof typeof icons;
  createdAt?: Date;
  updatedAt?: Date;
}
// types/blog.ts
export interface Blog {
  _id?: string;
  title: string;
  excerpt: string;
  content_markdown: string;
  cover_image_url: string;
  publication_date: Date;
  author: string;
  tags: string[];
  createdAt?: Date;
  updatedAt?: Date;
}
// types/certificate.ts
export interface Certificate {
  _id?: string;
  title: string;
  issuer: string;
  date: Date;
  credential_url: string;
  photo: string;
  createdAt?: Date;
  updatedAt?: Date;
}
// types/contactDetails.ts
export interface ContactDetails {
  email: string;
  phone: string;
  address: string;
  linkedin_url: string;
  github_url: string;
  twitter_url: string;
  available_for: string[];
  createdAt?: Date;
  updatedAt?: Date;
}
// types/experience.ts
export interface Experience {
  _id?: string;
  company_name: string;
  position: string;
  duration: string; // e.g. "Jan 2021 - Dec 2022"
  description: string;
  responsibilities: string[];
  technologies: string[];
  createdAt?: Date;
  updatedAt?: Date;
}
// types/project.ts
export interface Project {
  _id?: string;
  title: string;
  completion_date: Date;
  short_description: string;
  detailed_description: string;
  role: string;
  photo_url: string;
  featured: boolean;
  live_url?: string;
  github_url?: string;
  tags: string[];
  createdAt?: Date;
  updatedAt?: Date;
}
export interface Skill {
  name: string;
  level: number;
}

export interface SkillCategory {
  _id?: string;
  category: string;
  skills: Skill[];
  createdAt?: Date;
  updatedAt?: Date;
}
