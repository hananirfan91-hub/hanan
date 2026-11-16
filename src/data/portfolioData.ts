import { Project, SkillCategory, ExperienceItem, ServiceItem, FAQItem } from '../types';

export const PERSONAL_INFO = {
  name: 'Hanan Irfan',
  fullName: 'Abdul Hanan Irfan',
  primaryBrand: 'HANAN',
  title: 'Multidisciplinary Developer, SEO Specialist & Entrepreneur',
  roles: [
    'Founder & AI Developer — The Sports Room',
    'ACM KFUEIT Development Team Head',
    "Ambassador of D'Educationist @ KFUEIT",
    'Full-Stack & Frontend Web Developer',
    'SEO, AEO & GEO Specialist',
    'Digital Product Builder & Consultant',
  ],
  location: 'Rahim Yar Khan, Pakistan',
  education: {
    degree: 'BS Computer Science',
    institution: 'Khwaja Fareed University of Engineering and Information Technology (KFUEIT)',
    semester: '5th Semester',
    cgpa: '3.65',
    stage: 'BS Computer Science (5th Semester • CGPA 3.65)',
  },
  email: 'hananirfan91@gmail.com',
  portfolioUrl: 'https://hanan56.vercel.app',
  socials: {
    linkedin: { name: 'LinkedIn', handle: 'in/hananirfan', url: 'https://linkedin.com/in/hananirfan' },
    x: { name: 'X', handle: '@hananirfan91', url: 'https://x.com/hananirfan91' },
    instagram: { name: 'Instagram', handle: '@hananirfan2026', url: 'https://instagram.com/hananirfan2026' },
    facebook: { name: 'Facebook', handle: 'HananIrfan001', url: 'https://facebook.com/HananIrfan001' },
    tiktok: { name: 'TikTok', handle: '@pathan_x_babarian565', url: 'https://tiktok.com/@pathan_x_babarian565' },
  },
  professionalAreas: [
    'AI Development',
    'Frontend Development',
    'Full-Stack Development',
    'Search Engine Optimization (SEO)',
    'Answer Engine Optimization (AEO)',
    'Generative Engine Optimization (GEO)',
    'Technical SEO',
    'Keyword Research & Clustering',
    'Content Strategy',
    'Web Application Development',
  ],
  bioSummary:
    "Hanan Irfan is a Multidisciplinary Developer, SEO Specialist & Entrepreneur based in Rahim Yar Khan, Pakistan, currently in the 5th Semester of BS Computer Science at KFUEIT with a 3.65 CGPA. He serves as Founder and AI Developer of The Sports Room, ACM KFUEIT Development Team Head, and Ambassador of D'Educationist, building AI-powered applications, full-stack web software, and search-engineered platforms.",
  personalStatement:
    'Meaningful digital products live at the intersection of solid engineering, clear search visibility, and practical real-world usefulness.',
};

export const PROJECTS: Project[] = [
  {
    id: 'the-sports-room',
    number: '01',
    title: 'The Sports Room',
    url: 'https://thesportsroom.online',
    category: 'Web Development & SEO',
    filterCategory: 'WEB',
    featured: true,
    projectType: 'Independent Digital Sports Media and Analytics Platform',
    coFounders: 'Hanan Irfan and Urwah Farooq',
    organization: 'HI Digital Group',
    location: 'Rahim Yar Khan, Pakistan',
    description:
      'Independent digital sports media and analytics platform co-founded by Hanan Irfan and Urwah Farooq (2026–present) under HI Digital Group. Built with AI-assisted workflows, technical SEO, and structured content delivery for live match coverage, cricket telemetry, tactical breakdowns, daily quizzes, and fan leaderboards.',
    features: [
      'Founder & AI Developer (2026–present), co-founded with Urwah Farooq',
      'Operated under HI Digital Group — Rahim Yar Khan, Pakistan',
      'Real-time sports news, live match coverage & tactical breakdowns',
      'Cricket telemetry, daily sports quizzes & monthly fan leaderboards',
      'Technical SEO, AEO & GEO schema structure for search discovery',
      'Multi-sport coverage across cricket, football, basketball & more',
    ],
    technologies: ['AI Development', 'Web Development', 'Technical SEO', 'AEO & GEO', 'Sports Analytics'],
    status: 'Live Platform',
    image: '/the-sports-room.webp',
    fallbackImage: '/images/projects/hi-digital-group.svg',
    imageAlt: 'The Sports Room sports media and analytics platform co-founded by Hanan Irfan.',
    preserveAspectRatio: true,
    seoTitle: 'The Sports Room — Web Development & SEO Project by Hanan Irfan',
    seoDescription:
      'The Sports Room is an independent sports media and analytics platform co-founded by Hanan Irfan, featuring real-time sports news, match coverage, analytics, and interactive fan experiences.',
  },
  {
    id: 'nexa-pos',
    number: '02',
    title: 'NEXA POS SYSTEM',
    url: 'https://nexapossystem.vercel.app/',
    category: 'SaaS',
    filterCategory: 'SAAS',
    featured: true,
    description:
      'Modern point-of-sale and business management web application built to streamline retail billing, stock inventory alerts, customer ledgers, CRM tracking, role permissions, and sales reporting in one responsive interface.',
    features: [
      'POS billing & quick invoice checkout',
      'Inventory tracking with low-stock alerts',
      'Customer ledger & accounts receivable management',
      'Customer CRM & loyalty scoring workflow',
      'Sales history & interactive analytics reports',
      'Role-based access & PWA offline resilience',
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'PWA', 'REST APIs', 'Charts'],
    status: 'Live SaaS Product',
    image: '/nexapos.webp',
    fallbackImage: '/nexapos.jpg',
    imageAlt: 'NEXA POS System full-stack web application preview.',
  },
  {
    id: 'acm-kfueit',
    number: '03',
    title: 'ACM KFUEIT',
    url: 'https://acm-kfueit.vercel.app/',
    category: 'Education',
    filterCategory: 'WEB',
    featured: true,
    description:
      'Official community web platform developed for the ACM KFUEIT Student Chapter at Khwaja Fareed University of Engineering and Information Technology, supporting announcements, developer showcases, and campus technical events.',
    features: [
      'Community event announcements & schedules',
      'Member spotlight & registration workflows',
      'Technical workshop archives & resources',
      'Mobile-first responsive university portal',
    ],
    technologies: ['React', 'Tailwind CSS', 'JavaScript', 'Community Architecture'],
    status: 'Live Community Site',
    image: '/certificate.webp',
    fallbackImage: '/certificate.jpg',
    imageAlt: 'ACM KFUEIT web platform and appreciation recognition.',
  },
  {
    id: 'free-tools-hub',
    number: '04',
    title: 'FREE TOOLS HUB',
    url: 'https://freetoolshub1.vercel.app/',
    category: 'Web Tools',
    filterCategory: 'TOOLS',
    featured: true,
    description:
      'Browser-based developer and productivity utilities suite engineered for instant client-side processing with zero server data retention — featuring JSON formatting, Base64 encoding, text utilities, and password generation.',
    features: [
      'JSON Formatter & Validator',
      'Base64 Encoder / Decoder',
      'Image Compressor & Resizer utilities',
      'Text Case Converter & Word Counter',
      'Password & UUID Generator',
      'Color Picker & Palette helpers',
    ],
    technologies: ['React', 'JavaScript', 'Tailwind CSS', 'Client-Side Processing', 'Canvas API'],
    status: 'Live Web Utility',
    image: '/images/projects/free-tools-hub.svg',
    imageAlt: 'Free Tools Hub client-side developer utilities interface preview.',
  },
  {
    id: 'ai-tool-guide',
    number: '05',
    title: 'AI TOOL GUIDE',
    url: 'https://aitoolguide.vercel.app/',
    category: 'AI',
    filterCategory: 'AI',
    featured: true,
    description:
      'Technology discovery platform structured to help creators, students, and developers explore, compare, and apply practical AI platforms across coding, research, writing, and productivity.',
    features: [
      'Curated directory of AI platforms',
      'Categorized search by workflow & use-case',
      'Prompt workflow guides & tutorials',
      'Structured comparison views',
    ],
    technologies: ['React', 'Next.js', 'Tailwind CSS', 'AI Workflows', 'Search Filtering'],
    status: 'Live Platform',
    image: '/images/projects/ai-tool-guide.svg',
    imageAlt: 'AI Tool Guide curated AI platforms interface preview.',
  },
  {
    id: 'hi-digital-group',
    number: '06',
    title: 'HI DIGITAL GROUP',
    url: 'https://hidigitalgroup.vercel.app/',
    category: 'Agency',
    filterCategory: 'WEB',
    featured: false,
    description:
      'Digital consulting and engineering hub showcasing full-stack web development, technical SEO, AEO & GEO strategy, keyword clustering, and visual brand systems for organizations.',
    features: [
      'Digital engineering & consulting showcase',
      'Interactive project scope estimation',
      'Client inquiry management',
      'Service & capability highlights',
    ],
    technologies: ['React', 'Tailwind CSS', 'Technical SEO', 'Motion UI'],
    status: 'Live Agency Hub',
    image: '/images/projects/hi-digital-group.svg',
    imageAlt: 'HI Digital Group engineering and search consulting portal preview.',
  },
  {
    id: 'hanan-portfolio',
    number: '07',
    title: 'HANAN IRFAN PORTFOLIO',
    url: 'https://hanan56.vercel.app/',
    category: 'Portfolio',
    filterCategory: 'WEB',
    featured: false,
    description:
      'Official multi-page portfolio web app and PWA built with React, TypeScript, and Tailwind CSS — engineered with Schema.org JSON-LD, AEO/GEO structure, offline resilience, and Android TWA compatibility.',
    features: [
      'Multi-page SPA routing with legal & trust pages',
      'AEO, GEO & Schema.org structured data',
      'Progressive Web App & Android TWA readiness',
      'Interactive verified credentials gallery',
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'PWA', 'Vite'],
    status: 'Official Site',
    image: '/avatar.webp',
    fallbackImage: '/avatar.jpg',
    imageAlt: 'Hanan Irfan official portfolio avatar and site.',
  },
  {
    id: 'caesar-2026',
    number: '08',
    title: 'CAESAR 2026',
    url: 'https://caesar2026.vercel.app/',
    category: 'Web Project',
    filterCategory: 'DESIGN',
    featured: false,
    description:
      'Focused frontend layout and interactive web UI concept built to explore clean typography hierarchy, responsive CSS architectures, and lightweight client interactions.',
    features: [
      'Interactive frontend UI layouts',
      'Responsive CSS grid system',
      'Lightweight micro-interactions',
    ],
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Vercel'],
    status: 'Live Concept Project',
    image: '/images/projects/caesar-2026.svg',
    imageAlt: 'Caesar 2026 web concept preview.',
  },
  {
    id: 'garden-layout-tips',
    number: '09',
    title: 'GARDEN LAYOUT TIPS',
    url: 'https://gardenlayouttips.vercel.app/',
    category: 'Content',
    filterCategory: 'WEB',
    featured: false,
    description:
      'Search-engineered content platform centered on garden zoning, landscape design ideas, structured headings, and fast Core Web Vitals performance.',
    features: [
      'SEO-structured informational articles',
      'Keyword-clustered topic architecture',
      'Lightweight page load & accessibility',
    ],
    technologies: ['React', 'Technical SEO', 'Content Strategy', 'Tailwind CSS'],
    status: 'Live Web Experience',
    image: '/images/projects/garden-layout-tips.svg',
    imageAlt: 'Garden Layout Tips SEO content site preview.',
  },
  {
    id: 'punch-monkey',
    number: '10',
    title: 'PUNCH MONKEY',
    url: 'https://punchmonkey.vercel.app/',
    category: 'Creative Web Project',
    filterCategory: 'DESIGN',
    featured: false,
    description:
      'Experimental HTML5 Canvas web interaction built to practice responsive pointer/touch physics, frame scheduling, and playful client-side feedback.',
    features: [
      'Touch and pointer interaction physics',
      'Lightweight audio feedback hooks',
      '2D Canvas rendering loop',
    ],
    technologies: ['HTML5 Canvas', 'JavaScript', 'CSS Animations'],
    status: 'Live Experimental Project',
    image: '/images/projects/punch-monkey.svg',
    imageAlt: 'Punch Monkey HTML5 Canvas experiment preview.',
  },
  {
    id: 'ai-course-hanan',
    number: '11',
    title: 'AI COURSE BY HANAN IRFAN',
    url: 'https://aicoursebyhananirfan.vercel.app/',
    category: 'AI',
    filterCategory: 'AI',
    featured: false,
    description:
      'Educational web project organizing foundational artificial intelligence topics, structured prompt engineering patterns, and modern AI development concepts for learners.',
    features: [
      'Structured AI learning modules',
      'Prompt engineering examples',
      'Accessible typography & study notes',
    ],
    technologies: ['React', 'Tailwind CSS', 'Markdown Content', 'AI Education'],
    status: 'Live Educational Resource',
    image: '/images/projects/ai-course-hanan.svg',
    imageAlt: 'AI Course by Hanan Irfan educational site preview.',
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'ai',
    name: 'AI DEVELOPMENT',
    skills: [
      {
        name: 'AI Application Development',
        level: 92,
        description: 'Designing AI-assisted web workflows, prompt pipelines, and intelligent content/search interfaces.',
        highlight: true,
      },
      {
        name: 'Prompt Engineering & Workflows',
        level: 94,
        description: 'Structured prompting for app building, research synthesis, content workflows, and data analysis.',
        highlight: true,
      },
      {
        name: 'Answer & Generative Engine Optimization',
        level: 93,
        description: 'Structuring entities, schemas, and factual answers for AI search citations and answer engines.',
        highlight: true,
      },
      {
        name: 'Python & Automation Scripting',
        level: 86,
        description: 'Scripting data processing pipelines, SEO analysis checks, and AI integration backends.',
      },
    ],
  },
  {
    id: 'dev',
    name: 'FRONTEND & FULL-STACK',
    skills: [
      {
        name: 'Frontend Development (React & Next.js)',
        level: 95,
        description: 'Modular React.js & Next.js SPAs/SSR apps with TypeScript, hooks, and responsive design.',
        highlight: true,
      },
      {
        name: 'Full-Stack Web Application Dev',
        level: 90,
        description: 'End-to-end engineering spanning UI systems, REST APIs, database modeling, and cloud deployment.',
        highlight: true,
      },
      {
        name: 'HTML5, CSS3 & Tailwind CSS',
        level: 97,
        description: 'Accessible semantic HTML, responsive CSS Grid/Flexbox, and scalable Tailwind design tokens.',
        highlight: true,
      },
      {
        name: 'JavaScript (ES6+) & TypeScript',
        level: 94,
        description: 'Type-safe frontend & API engineering, async data flows, and modular state architecture.',
      },
    ],
  },
  {
    id: 'seo',
    name: 'SEO, AEO, GEO & CONTENT',
    skills: [
      {
        name: 'Search Engine Optimization (SEO)',
        level: 96,
        description: 'End-to-end organic search architecture, on-page structure, internal linking, and site health.',
        highlight: true,
      },
      {
        name: 'Answer Engine Optimization (AEO)',
        level: 94,
        description: 'FAQ structuring, direct-answer formatting, and entity clarity for zero-click & voice/AI answers.',
        highlight: true,
      },
      {
        name: 'Generative Engine Optimization (GEO)',
        level: 93,
        description: 'Citation-ready content signals, Schema.org Person/Organization graphs, and authoritative sourcing.',
        highlight: true,
      },
      {
        name: 'Technical SEO',
        level: 96,
        description: 'Crawlability, canonical URLs, robots.txt, XML sitemaps, JSON-LD, and Core Web Vitals optimization.',
      },
      {
        name: 'Keyword Research & Clustering',
        level: 92,
        description: 'Search intent mapping, semantic topic clusters, and competitive gap analysis.',
      },
      {
        name: 'Content Strategy',
        level: 91,
        description: 'Editorial topic pillars, information architecture, and reader-first digital publishing.',
      },
    ],
  },
  {
    id: 'backend',
    name: 'PROGRAMMING & DATABASES',
    skills: [
      {
        name: 'C++, Java & SQL',
        level: 88,
        description: 'Object-oriented design, data structures, algorithms, relational schema design, and indexing.',
      },
      {
        name: 'Firebase & Supabase',
        level: 88,
        description: 'Firestore, Firebase Auth, PostgreSQL hosting, row-level security, and REST integrations.',
        highlight: true,
      },
      {
        name: 'WordPress & CMS Performance',
        level: 92,
        description: 'Custom Astra layouts, speed optimization, caching setup, and clean publishing workflows.',
      },
    ],
  },
  {
    id: 'tools',
    name: 'DESIGN & PLATFORMS',
    skills: [
      {
        name: 'UI/UX & Graphic Design',
        level: 89,
        description: 'Mobile-first wireframing, typography systems, visual hierarchy, Figma/Canva/Photoshop assets.',
      },
      {
        name: 'Git, GitHub & Vercel',
        level: 94,
        description: 'Version control workflows, CI/CD previews, custom domain DNS, and PWA edge hosting.',
      },
      {
        name: 'Google Search Console',
        level: 93,
        description: 'Index coverage diagnostics, structured data validation, and search query performance tracking.',
      },
    ],
  },
];

export const EXPERIENCE_ITEMS: ExperienceItem[] = [
  {
    id: 'exp-sports-room',
    period: '2026 — PRESENT',
    title: 'Founder & AI Developer — The Sports Room',
    category: 'ENTREPRENEURSHIP & AI DEVELOPMENT',
    organization: 'The Sports Room (HI Digital Group)',
    description:
      'Co-founded The Sports Room (with Urwah Farooq) as an independent digital sports media and analytics platform, leading product architecture, AI-assisted content & telemetry workflows, and technical SEO / AEO / GEO optimization.',
    highlights: [
      'Architecting platform web application and AI-powered sports workflow modules',
      'Implementing structured Schema.org, technical SEO, keyword clustering, and content strategy',
      'Operating live digital media publishing across cricket, football, and multi-sport analytics',
    ],
    technologies: ['AI Development', 'Full-Stack Web', 'Technical SEO', 'AEO & GEO', 'Content Strategy'],
  },
  {
    id: 'exp-acm-head',
    period: '2025 — PRESENT',
    title: 'Development Team Head — ACM KFUEIT',
    category: 'TECHNICAL LEADERSHIP',
    organization: 'ACM Student Chapter — KFUEIT',
    description:
      'Leading web development initiatives for the ACM KFUEIT community at Khwaja Fareed University of Engineering and Information Technology, mentoring fellow CS peers and building official chapter web tools.',
    highlights: [
      'Directed development and deployment of the ACM KFUEIT community web portal',
      'Recognized with Official Certificate of Appreciation for Web Developer contributions (Session 2025–26)',
      'Collaborated with student teams on campus technical workshops and project showcases',
    ],
    technologies: ['Team Leadership', 'React', 'Web Engineering', 'UI Architecture'],
  },
  {
    id: 'exp-ambassador',
    period: '2025 — PRESENT',
    title: "Ambassador of D'Educationist @ KFUEIT",
    category: 'CAMPUS LEADERSHIP & OUTREACH',
    organization: "D'Educationist — Rahim Yar Khan",
    description:
      "Serving as official Campus Ambassador of D'Educationist at KFUEIT, connecting university students with higher education pathways, scholarship resources, and career readiness initiatives.",
    highlights: [
      "Representing D'Educationist across the KFUEIT student body in Rahim Yar Khan",
      'Supporting student outreach, seminars, and academic guidance initiatives',
      'Building community engagement across university networks',
    ],
    technologies: ['Student Leadership', 'Career Outreach', 'Public Communication', 'Community Building'],
  },
  {
    id: 'exp-consulting',
    period: '2023 — PRESENT',
    title: 'Full-Stack Developer, SEO Specialist & Digital Consultant',
    category: 'SOFTWARE & SEARCH CONSULTING',
    organization: 'HI Digital Group & Independent Projects',
    description:
      'Designing and shipping full-stack web applications, SaaS tools (NEXA POS System, Free Tools Hub, AI Tool Guide), and technical SEO/AEO/GEO consulting for local and remote digital projects.',
    highlights: [
      'Engineered NEXA POS System with inventory alerts, customer ledgers, and PWA offline support',
      'Built Free Tools Hub and AI Tool Guide for privacy-focused client-side workflows',
      'Delivered technical SEO, keyword clustering, and content strategy improvements',
    ],
    technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Firebase', 'Supabase', 'SEO/AEO/GEO'],
  },
  {
    id: 'exp-education',
    period: '2024 — PRESENT',
    title: 'BS Computer Science — 5th Semester (CGPA: 3.65)',
    category: 'ACADEMIC EXCELLENCE',
    organization: 'Khwaja Fareed University of Engineering and Information Technology (KFUEIT)',
    description:
      "Pursuing a Bachelor of Science in Computer Science in Rahim Yar Khan (currently 5th Semester, CGPA 3.65). Awarded the Faculty of IT Dean's Honor Certificate for single-semester academic distinction.",
    highlights: [
      "Awarded Dean's Honor Roll Certificate (Spring 2026) from Faculty of Information Technology, KFUEIT",
      'Completed Google AI Professional Certificate (8-course specialization on Coursera)',
      'Core coursework across OOP (C++, Java), Data Structures, Databases (SQL), and AI',
    ],
    technologies: ['C++', 'Java', 'Python', 'SQL', 'Data Structures', 'Algorithms'],
  },
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'ai-dev',
    number: '01',
    title: 'AI DEVELOPMENT & WORKFLOWS',
    shortDesc: 'Practical AI integrations, intelligent search features, and AI-assisted web products built for real utility.',
    fullDesc:
      'Design and build modern AI-powered web features, structured prompt pipelines, curated AI directories, and automated content or data workflows tailored to your product requirements.',
    iconName: 'Cpu',
    deliverables: [
      'AI-powered web feature architecture',
      'Prompt engineering & workflow automation',
      'Custom directory & educational AI interfaces',
      'Privacy-aware API & client integration',
    ],
  },
  {
    id: 'full-stack',
    number: '02',
    title: 'FULL-STACK & WEB APP DEVELOPMENT',
    shortDesc: 'End-to-end React, Next.js, TypeScript, Firebase, and Supabase applications built mobile-first.',
    fullDesc:
      'From clean UI components to database design and cloud deployment, I build responsive, maintainable web applications and SaaS MVPs designed for fast loading and everyday reliability.',
    iconName: 'Code',
    deliverables: [
      'React, Next.js & TypeScript frontend architecture',
      'REST APIs, Firebase / Supabase database integration',
      'Authentication & role-based workflows',
      'PWA offline capability & responsive layout testing',
    ],
  },
  {
    id: 'seo-aeo-geo',
    number: '03',
    title: 'SEO, AEO & GEO OPTIMIZATION',
    shortDesc: 'Technical SEO, Answer Engine Optimization, Generative Engine Optimization, keyword clustering, and content strategy.',
    fullDesc:
      'Improve discoverability across traditional search engines and modern AI answer engines through technical audits, Schema.org structured data, semantic keyword clustering, and clear content strategy.',
    iconName: 'Search',
    deliverables: [
      'Technical SEO audit, canonicals, sitemaps & Core Web Vitals',
      'AEO & GEO structured Schema.org (JSON-LD) implementation',
      'Keyword research, topic clustering & search intent mapping',
      'Content strategy & Google Search Console diagnostics',
    ],
  },
  {
    id: 'web-dev',
    number: '04',
    title: 'FRONTEND & PORTFOLIO ARCHITECTURE',
    shortDesc: 'Fast, accessible, mobile-first web interfaces with clean design systems and cross-device polish.',
    fullDesc:
      'Modern responsive websites crafted with Tailwind CSS, clean typographic hierarchy, accessible contrast, and smooth navigation tuned for both desktop browsers and mobile web/TWA apps.',
    iconName: 'Layout',
    deliverables: [
      'Mobile-first responsive layout engineering',
      'Semantic HTML5 & WCAG accessibility alignment',
      'Clean component system & lightweight motion',
      'Production deployment on Vercel or cloud hosting',
    ],
  },
  {
    id: 'wordpress',
    number: '05',
    title: 'WORDPRESS & CMS SOLUTIONS',
    shortDesc: 'Lightweight WordPress builds, theme customization, and page-speed optimization.',
    fullDesc:
      'Structured WordPress websites tailored for content publishers and local businesses using clean themes, SEO-ready permalink hierarchy, and practical speed tuning.',
    iconName: 'Globe',
    deliverables: [
      'WordPress & Astra theme setup & styling',
      'On-page SEO structure & schema readiness',
      'Asset optimization & caching configuration',
      'Editorial training & handover notes',
    ],
  },
  {
    id: 'ui-ux',
    number: '06',
    title: 'UI/UX & VISUAL DESIGN',
    shortDesc: 'Clean product interfaces, wireframes, brand marks, and social media visual systems.',
    fullDesc:
      'Human-centered visual design combining legible typography, structured whitespace, and consistent brand assets across web products and social channels.',
    iconName: 'Palette',
    deliverables: [
      'UI/UX wireframes & clean design systems',
      'Brand visual assets & social graphics',
      'Consistent typography & color contrast',
      'Responsive component prototypes',
    ],
  },
];

export const AEO_FAQS: FAQItem[] = [
  {
    question: 'Who is Hanan Irfan?',
    answer:
      "Hanan Irfan is a Multidisciplinary Developer, SEO Specialist & Entrepreneur from Rahim Yar Khan, Pakistan. He is a 5th Semester BS Computer Science student at KFUEIT (CGPA 3.65), Founder & AI Developer of The Sports Room, ACM KFUEIT Development Team Head, and Ambassador of D'Educationist.",
    category: 'General',
  },
  {
    question: 'What is Hanan Irfan studying?',
    answer:
      'Hanan Irfan is pursuing a Bachelor of Science in Computer Science (BSCS) at Khwaja Fareed University of Engineering and Information Technology (KFUEIT) in Rahim Yar Khan, currently in his 5th Semester with a 3.65 CGPA and a Spring 2026 Dean’s Honor Certificate.',
    category: 'Education',
  },
  {
    question: 'What are Hanan Irfan’s core professional areas?',
    answer:
      'His core areas span AI Development, Frontend Development, Full-Stack Web Application Development, Search Engine Optimization (SEO), Answer Engine Optimization (AEO), Generative Engine Optimization (GEO), Technical SEO, Keyword Research & Clustering, and Content Strategy.',
    category: 'Development',
  },
  {
    question: 'What leadership roles and projects is Hanan Irfan known for?',
    answer:
      "Hanan Irfan is Founder and AI Developer of The Sports Room (co-founded with Urwah Farooq, 2026–present), Development Team Head at ACM KFUEIT, and Campus Ambassador of D'Educationist. His deployed software products include The Sports Room, NEXA POS System, Free Tools Hub, AI Tool Guide, and HI Digital Group.",
    category: 'Development',
  },
  {
    question: 'How does Hanan Irfan approach SEO, AEO, and GEO?',
    answer:
      'He combines technical crawlability, Schema.org structured data, Core Web Vitals performance, keyword clustering, and clear answer-first content strategy so websites perform well in both traditional search engines and AI answer engines.',
    category: 'SEO',
  },
  {
    question: 'How can I contact Hanan Irfan?',
    answer:
      'You can reach Hanan Irfan directly via email at hananirfan91@gmail.com, on the Contact page at https://hanan56.vercel.app/contact, or on X (@hananirfan91), LinkedIn (linkedin.com/in/hananirfan), and Instagram (@hananirfan2026).',
    category: 'Contact',
  },
];
