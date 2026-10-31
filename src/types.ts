export type PageId = 'home' | 'about' | 'skills' | 'experience' | 'projects' | 'services' | 'web-development' | 'seo-expert' | 'graphic-design' | 'contact' | 'privacy' | 'terms';

export interface Project {
  id: string;
  number: string;
  title: string;
  url: string;
  category: 'SaaS' | 'Web Tools' | 'AI' | 'Portfolio' | 'Agency' | 'Education' | 'Web Project' | 'Content' | 'Creative Web Project' | 'Web Development & SEO';
  filterCategory: 'WEB' | 'SAAS' | 'AI' | 'TOOLS' | 'DESIGN';
  description: string;
  featured?: boolean;
  features: string[];
  technologies: string[];
  status: string;
  image: string;
  imageAlt?: string;
  fallbackImage?: string;
  preserveAspectRatio?: boolean;
  seoTitle?: string;
  seoDescription?: string;
  projectType?: string;
  coFounders?: string;
  organization?: string;
  location?: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  skills: {
    name: string;
    level: number; // 1-100
    description: string;
    highlight?: boolean;
  }[];
}

export interface ExperienceItem {
  id: string;
  period: string;
  title: string;
  category: string;
  organization?: string;
  description: string;
  highlights: string[];
  technologies: string[];
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  deliverables: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'General' | 'Development' | 'SEO' | 'Education' | 'Contact';
}

export interface ContactFormData {
  name: string;
  email: string;
  projectType: string;
  message: string;
}
