import { Project, SkillCategory, ExperienceItem, ServiceItem, FAQItem } from '../types';

export const PERSONAL_INFO = {
  name: 'Hanan Irfan',
  primaryBrand: 'HANAN',
  title: 'Full-Stack Software Developer, Web Developer & Digital Creator',
  roles: [
    'Full-Stack Developer',
    'Web Developer & Designer',
    'SEO & Web Performance Specialist',
    'SaaS & Digital Product Creator',
    'Graphic Designer & AI Enthusiast'
  ],
  age: 18,
  location: 'Rahim Yar Khan, Punjab, Pakistan',
  education: {
    degree: 'Bachelor of Science in Computer Science (BSCS)',
    institution: 'Khwaja Fareed University of Engineering and Information Technology (KFUEIT)',
    stage: 'Undergraduate Computer Science Student'
  },
  email: 'hananirfan91@gmail.com',
  socials: {
    instagram: { name: 'Instagram', handle: 'hananirfan2026', url: 'https://instagram.com/hananirfan2026' },
    tiktok: { name: 'TikTok', handle: '@pathan_x_babarian565', url: 'https://tiktok.com/@pathan_x_babarian565' },
    facebook: { name: 'Facebook', handle: 'HananIrfan001', url: 'https://facebook.com/HananIrfan001' },
    youtube: { name: 'YouTube', handle: 'Ancient Mystery', url: 'https://youtube.com' },
    linkedin: { name: 'LinkedIn', handle: 'Hanan Irfan', url: 'https://www.linkedin.com/in/hananirfan/' }
  },
  bioSummary: 'Hanan Irfan is an 18-year-old multidisciplinary full-stack software developer, entrepreneur, SEO specialist, graphic designer, and AI enthusiast based in Rahim Yar Khan, Punjab, Pakistan. He builds modern web experiences, SaaS applications, and practical digital tools at the intersection of technology, design, and innovation.',
  personalStatement: 'I believe the best digital products are built where technology meets creativity, usability, and real-world problem solving.'
};

export const PROJECTS: Project[] = [
  {
    id: 'nexa-pos',
    number: '01',
    title: 'NEXA POS SYSTEM',
    url: 'https://nexapossystem.vercel.app/',
    category: 'SaaS',
    filterCategory: 'SAAS',
    featured: true,
    description: 'NEXA POS System is a modern business management and point-of-sale concept designed to help businesses manage inventory, billing, customers, ledgers, sales history, reports, and operational insights from one digital platform.',
    features: [
      'POS billing & fast checkout',
      'Inventory management with stock alerts',
      'Customer ledger & accounts tracking',
      'Customer CRM & contact management',
      'Loyalty scoring engine',
      'Sales history & analytics reports',
      'Admin role management',
      'PWA support & offline resilience',
      'Secure authentication & subscription tiers'
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'PWA', 'REST APIs', 'Chart.js'],
    status: 'Live SaaS Product',
    image: '/nexapos.jpg'
  },
  {
    id: 'free-tools-hub',
    number: '02',
    title: 'FREE TOOLS HUB',
    url: 'https://freetoolshub1.vercel.app/',
    category: 'Web Tools',
    filterCategory: 'TOOLS',
    featured: true,
    description: 'Free Tools Hub is a collection of practical browser-based utilities designed to simplify everyday digital tasks through a fast, accessible, and privacy-focused web interface.',
    features: [
      'JSON Formatter & Validator',
      'Base64 Encoder / Decoder',
      'Image Compressor & Image Resizer',
      'Text Case Converter & Word Counter',
      'URL Encoder / Decoder',
      'Password Generator & UUID Generator',
      'Color Picker & Palette Generator',
      'Resume Builder & Document Converters'
    ],
    technologies: ['React', 'JavaScript', 'Tailwind CSS', 'Client-side Processing', 'Canvas API'],
    status: 'Live Web Utility',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'ai-tool-guide',
    number: '03',
    title: 'AI TOOL GUIDE',
    url: 'https://aitoolguide.vercel.app/',
    category: 'AI',
    filterCategory: 'AI',
    featured: true,
    description: 'AI Tool Guide is a technology-focused platform designed to help users explore, categorize, and understand useful AI tools and emerging artificial intelligence technologies.',
    features: [
      'Curated directory of AI platforms',
      'Categorized search by AI use-case',
      'Prompt guides & workflow tutorials',
      'Feature comparison tables'
    ],
    technologies: ['React', 'Next.js', 'Tailwind CSS', 'AI APIs', 'Search Filters'],
    status: 'Live Platform',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'hanan-portfolio',
    number: '04',
    title: 'HANAN IRFAN PORTFOLIO',
    url: 'https://hanan56.vercel.app/',
    category: 'Portfolio',
    filterCategory: 'WEB',
    featured: false,
    description: 'The personal portfolio platform of Hanan Irfan, showcasing full-stack development skills, projects, technology interests, SEO capabilities, and digital work.',
    features: [
      'Cinematic interactive hero',
      'Full multi-page navigation',
      'AEO & GEO search optimization',
      'Custom motion design system'
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vite'],
    status: 'Official Site',
    image: '/hanan-irfan.jpg'
  },
  {
    id: 'hi-digital-group',
    number: '05',
    title: 'HI DIGITAL GROUP',
    url: 'https://hidigitalgroup.vercel.app/',
    category: 'Agency',
    filterCategory: 'WEB',
    featured: true,
    description: 'HI Digital Group represents a digital services vision focused on web development, graphic design, technical SEO, video editing, and content-related digital solutions.',
    features: [
      'Digital service showcase',
      'Interactive project scope calculator',
      'Client inquiry management',
      'Agency portfolio highlights'
    ],
    technologies: ['React', 'Tailwind CSS', 'SEO Optimization', 'Framer Motion'],
    status: 'Live Agency Hub',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'acm-kfueit',
    number: '06',
    title: 'ACM KFUEIT',
    url: 'https://acm-kfueit.vercel.app/',
    category: 'Education',
    filterCategory: 'WEB',
    featured: false,
    description: 'A technology-focused web project created around the ACM KFUEIT community and its digital presence at Khwaja Fareed University of Engineering and IT.',
    features: [
      'Community event announcements',
      'Member showcase & registration',
      'Tech workshop archives',
      'Responsive university portal'
    ],
    technologies: ['React', 'Tailwind CSS', 'JavaScript', 'Community Tools'],
    status: 'Live Community Site',
    image: '/certificate.jpg'
  },
  {
    id: 'caesar-2026',
    number: '07',
    title: 'CAESAR 2026',
    url: 'https://caesar2026.vercel.app/',
    category: 'Web Project',
    filterCategory: 'DESIGN',
    featured: false,
    description: 'A modern web project developed and deployed as part of Hanan Irfan\'s growing collection of experimental and practical digital experiences.',
    features: [
      'Interactive UI concepts',
      'Futuristic dark mode design',
      'Smooth micro-animations'
    ],
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Vercel Deployment'],
    status: 'Live Concept Project',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'garden-layout-tips',
    number: '08',
    title: 'GARDEN LAYOUT TIPS',
    url: 'https://gardenlayouttips.vercel.app/',
    category: 'Content',
    filterCategory: 'WEB',
    featured: false,
    description: 'A specialized web experience focused on garden layout ideas, landscape planning, SEO-optimized structure, and visual design inspiration.',
    features: [
      'SEO-optimized article layouts',
      'Interactive visual planner concepts',
      'Fast loading speed & Core Web Vitals focus'
    ],
    technologies: ['React', 'Technical SEO', 'Tailwind CSS', 'Content Structure'],
    status: 'Live Web Experience',
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'punch-monkey',
    number: '09',
    title: 'PUNCH MONKEY',
    url: 'https://punchmonkey.vercel.app/',
    category: 'Creative Web Project',
    filterCategory: 'DESIGN',
    featured: false,
    description: 'A creative web experience developed as part of Hanan Irfan\'s experimental digital project portfolio featuring interactive canvas interactions.',
    features: [
      'Interactive click/touch physics',
      'Sound effect integration',
      'Playful canvas rendering'
    ],
    technologies: ['HTML5 Canvas', 'JavaScript', 'CSS Animations'],
    status: 'Live Experimental Project',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'ai-course-hanan',
    number: '10',
    title: 'AI COURSE BY HANAN IRFAN',
    url: 'https://aicoursebyhananirfan.vercel.app/',
    category: 'AI',
    filterCategory: 'AI',
    featured: false,
    description: 'An AI-focused educational project built around learning and exploring artificial intelligence concepts, prompt engineering, and modern tool stacks.',
    features: [
      'Structured AI curriculum layout',
      'Interactive code & prompt samples',
      'Student resource downloads'
    ],
    technologies: ['React', 'Tailwind CSS', 'Markdown Reader', 'AI Integration'],
    status: 'Live Educational Resource',
    image: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=1000&q=80'
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'dev',
    name: 'DEVELOPMENT',
    skills: [
      { name: 'HTML5 / CSS3', level: 98, description: 'Semantic structure, flexbox, CSS grid, keyframe animations & accessibility.', highlight: true },
      { name: 'JavaScript (ES6+)', level: 95, description: 'Asynchronous JS, promises, DOM manipulation, ES modules & performance.', highlight: true },
      { name: 'React.js', level: 94, description: 'Functional components, hooks, custom state engines, context API & Vite.', highlight: true },
      { name: 'Next.js', level: 90, description: 'Server-side rendering, static generation, API routes, App Router & caching.', highlight: true },
      { name: 'Frontend Architecture', level: 92, description: 'Responsive web design, modular component design, mobile-first layouts.' },
      { name: 'Full-Stack Integration', level: 88, description: 'End-to-end full stack architecture connecting APIs, state & databases.' }
    ]
  },
  {
    id: 'prog',
    name: 'PROGRAMMING',
    skills: [
      { name: 'C++', level: 88, description: 'Object-oriented programming, data structures, algorithms & memory management.' },
      { name: 'Java', level: 85, description: 'Class hierarchies, OOP principles, application logic & backend fundamentals.' },
      { name: 'Python', level: 86, description: 'Scripting, data manipulation, automation & AI/ML integration concepts.' },
      { name: 'SQL', level: 90, description: 'Relational queries, database normalization, indexing & joins.' }
    ]
  },
  {
    id: 'backend',
    name: 'BACKEND & DATABASE',
    skills: [
      { name: 'Supabase', level: 88, description: 'PostgreSQL database hosting, authentication, real-time subscriptions & row security.', highlight: true },
      { name: 'Firebase', level: 86, description: 'Firestore database, Firebase Auth, storage & cloud functions.' },
      { name: 'REST APIs', level: 92, description: 'API route design, JSON payloads, HTTP headers & rate-limiting.' },
      { name: 'Authentication', level: 90, description: 'JWT tokens, OAuth integration, session state management & security.' },
      { name: 'Database Design', level: 88, description: 'Entity relationship design, schema validation & data optimization.' }
    ]
  },
  {
    id: 'cms',
    name: 'CMS & WEB',
    skills: [
      { name: 'WordPress', level: 94, description: 'Theme customization, plugin setup, custom post types & headless setups.', highlight: true },
      { name: 'Astra Theme', level: 92, description: 'Custom Astra building, speed optimization & layout styling.' },
      { name: 'Website Optimization', level: 95, description: 'Core Web Vitals tuning, caching strategies, image compression & asset minification.' }
    ]
  },
  {
    id: 'seo',
    name: 'SEO & ANALYTICS',
    skills: [
      { name: 'Technical SEO', level: 96, description: 'Crawlability, indexing, canonical URLs, robots.txt & XML sitemaps.', highlight: true },
      { name: 'On-Page SEO', level: 95, description: 'Keyword strategy, heading structures, meta descriptions & content organization.', highlight: true },
      { name: 'Google Search Console', level: 92, description: 'Search performance monitoring, index inspection & coverage audits.' },
      { name: 'Google Analytics (GA4)', level: 88, description: 'Event tracking, user journey analytics & conversion metrics.' },
      { name: 'Structured Data (Schema.org)', level: 94, description: 'JSON-LD schema for Person, WebSite, Product & Organization.' }
    ]
  },
  {
    id: 'design',
    name: 'DESIGN',
    skills: [
      { name: 'Graphic Design', level: 90, description: 'Visual branding, typography pairing, contrast, layout hierarchy & banners.' },
      { name: 'UI/UX Design', level: 88, description: 'User flows, wireframing, component libraries & interactive prototype design.' },
      { name: 'Canva Pro', level: 95, description: 'Speed social media graphics, thumbnails & brand assets.' },
      { name: 'Adobe Photoshop', level: 85, description: 'Photo editing, image manipulation & poster design.' },
      { name: 'CorelDRAW', level: 82, description: 'Vector graphics, printing assets & logo layout.' }
    ]
  },
  {
    id: 'tools',
    name: 'TOOLS & PLATFORMS',
    skills: [
      { name: 'GitHub / Git', level: 92, description: 'Version control, branch management, pull requests & code collaboration.' },
      { name: 'Vercel / Netlify', level: 95, description: 'Edge deployment, continuous integration, domain routing & environment variables.' },
      { name: 'XAMPP / Local Server', level: 88, description: 'Local PHP/MySQL development environment configuration.' },
      { name: 'Cisco Packet Tracer', level: 80, description: 'Network topology simulation & routing protocols.' },
      { name: 'CrypTool', level: 78, description: 'Cryptographic algorithm analysis & security concepts.' }
    ]
  }
];

export const EXPERIENCE_ITEMS: ExperienceItem[] = [
  {
    id: 'exp-1',
    period: '2024 — PRESENT',
    title: 'Full-Stack Software Developer & Digital Creator',
    category: 'SOFTWARE DEVELOPMENT',
    organization: 'Independent & Founder of HI Digital',
    description: 'Architecting and deploying full-stack web applications, SaaS platforms (NEXA POS System), interactive web utilities (Free Tools Hub), and SEO-driven digital products using React, Next.js, and modern cloud stacks.',
    highlights: [
      'Built and launched NEXA POS System SaaS with full offline inventory & ledger management',
      'Developed Free Tools Hub featuring 12+ client-side developer utilities',
      'Deployed over 10 live web applications on Vercel with high Core Web Vitals scores',
      'Implemented advanced technical SEO strategies yielding top search indexing performance'
    ],
    technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Vercel', 'REST APIs']
  },
  {
    id: 'exp-2',
    period: '2023 — PRESENT',
    title: 'BS Computer Science Undergraduate Student',
    category: 'ACADEMIC GROWTH',
    organization: 'Khwaja Fareed University of Engineering and Information Technology (KFUEIT)',
    description: 'Pursuing a Bachelor of Science in Computer Science in Rahim Yar Khan. Mastering data structures, object-oriented programming, database management systems, network engineering, and algorithms.',
    highlights: [
      'Active participant in university ACM tech community projects',
      'Created the ACM KFUEIT community web presence (acm-kfueit.vercel.app)',
      'Completed coursework in C++, Java, Python, SQL, and Networking'
    ],
    technologies: ['C++', 'Java', 'Python', 'SQL', 'Data Structures', 'Networking']
  },
  {
    id: 'exp-3',
    period: '2022 — PRESENT',
    title: 'Technical SEO & Web Specialist',
    category: 'SEO & OPTIMIZATION',
    organization: 'Client Projects & Self-Owned Websites',
    description: 'Specializing in technical website audits, crawlability optimization, schema markup implementation, speed enhancements, and search visibility for business platforms and content sites.',
    highlights: [
      'Structured XML sitemaps, canonical tags, and JSON-LD schema across multiple domains',
      'Optimized WordPress websites with custom Astra theme code & speed plugins',
      'Achieved 95+ Google Lighthouse scores across desktop & mobile performance'
    ],
    technologies: ['Technical SEO', 'Google Search Console', 'Google Analytics', 'WordPress', 'Schema.org']
  },
  {
    id: 'exp-4',
    period: '2022 — PRESENT',
    title: 'Digital Entrepreneur & Graphic Designer',
    category: 'ENTREPRENEURSHIP & DESIGN',
    organization: 'HI Digital Group',
    description: 'Founded HI Digital Group to offer web development, UI/UX design, SEO services, graphic design, and content digital solutions for growing regional and international clients.',
    highlights: [
      'Designed visual identities, social assets, logos, and UI prototypes',
      'Managed client project lifecycles from concept to live production deployment'
    ],
    technologies: ['Graphic Design', 'UI/UX Design', 'Canva', 'Photoshop', 'Client Relations']
  }
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'web-dev',
    number: '01',
    title: 'WEB DEVELOPMENT',
    shortDesc: 'Modern, responsive, ultra-fast websites built with React, Next.js, and clean Tailwind CSS styling.',
    fullDesc: 'I create modern, high-performance websites tailored to your brand identity. Every site is crafted with responsive layouts, fluid animations, mobile-first precision, and clean semantic architecture that loads instantly.',
    iconName: 'Layout',
    deliverables: [
      'Custom React / Next.js implementation',
      'Responsive design across mobile, tablet & desktop',
      'Framer Motion smooth scroll & interactive UI',
      'Clean semantic code with zero bloat',
      'Fast loading speed & optimized Core Web Vitals'
    ]
  },
  {
    id: 'full-stack',
    number: '02',
    title: 'FULL-STACK DEVELOPMENT',
    shortDesc: 'End-to-end digital products with frontend state, backend APIs, databases, authentication, and cloud deployment.',
    fullDesc: 'From database schema design to interactive client interfaces, I build complete full-stack web applications. Whether you need a SaaS platform, a custom dashboard, or a multi-user web app, I handle the entire engineering pipeline.',
    iconName: 'Code',
    deliverables: [
      'Frontend React/TypeScript UI architecture',
      'Backend REST API endpoints & serverless routes',
      'Database integration (Supabase, Firebase, SQL)',
      'User authentication & role-based permissions',
      'Automated deployment on Vercel or cloud containers'
    ]
  },
  {
    id: 'wordpress',
    number: '03',
    title: 'WORDPRESS DEVELOPMENT',
    shortDesc: 'Professional WordPress websites, theme customization, Astra setup, and speed optimization.',
    fullDesc: 'Custom WordPress development designed for businesses, blogs, and service providers. I specialize in lightweight setups using the Astra theme, custom styling, essential security setups, and rapid load speed.',
    iconName: 'Globe',
    deliverables: [
      'Custom WordPress installation & setup',
      'Astra theme customization & responsive tweaks',
      'Plugin setup, security hardening & backups',
      'Content management training & documentation'
    ]
  },
  {
    id: 'seo-services',
    number: '04',
    title: 'SEO & TECHNICAL OPTIMIZATION',
    shortDesc: 'Technical SEO, on-page optimization, site architecture, indexing, metadata, and search visibility.',
    fullDesc: 'Ensure your website ranks prominently on Google and AI search engines. I implement rigorous technical SEO, clean URL structures, canonical tags, JSON-LD structured data schema, XML sitemaps, and Core Web Vitals speed tuning.',
    iconName: 'Search',
    deliverables: [
      'Complete technical SEO audit & fix plan',
      'JSON-LD schema markup (Person, WebSite, Product)',
      'Google Search Console & Analytics integration',
      'Canonical tags, robots.txt & XML sitemap setup',
      'Speed optimization & image compression'
    ]
  },
  {
    id: 'ui-ux',
    number: '05',
    title: 'UI/UX & GRAPHIC DESIGN',
    shortDesc: 'Modern user interfaces, graphic assets, brand logos, thumbnails, and visual prototypes.',
    fullDesc: 'Combining visual aesthetics with functional usability. I design clean UI layouts, brand identities, promotional banners, social graphics, and interactive prototypes that elevate your digital presence.',
    iconName: 'Palette',
    deliverables: [
      'UI/UX layout design & wireframes',
      'Brand logos, social media banners & thumbnails',
      'Design systems, typography & color palettes',
      'High-resolution vector assets'
    ]
  },
  {
    id: 'digital-product',
    number: '06',
    title: 'DIGITAL PRODUCT DEVELOPMENT',
    shortDesc: 'Building practical web tools, SaaS platforms, browser utilities, and product prototypes.',
    fullDesc: 'Have an idea for a web app or SaaS tool? I translate raw product ideas into live functional web platforms like NEXA POS System and Free Tools Hub, complete with billing, tools, and user analytics.',
    iconName: 'Zap',
    deliverables: [
      'Product architecture & MVP development',
      'Custom tool & utility widget development',
      'Subscription model & ledger integrations',
      'User workflow optimization'
    ]
  },
  {
    id: 'ai-tech',
    number: '07',
    title: 'AI & EMERGING TECH INTEGRATION',
    shortDesc: 'Integrating modern AI capabilities, intelligent chat/search, and automation into digital web apps.',
    fullDesc: 'Leverage artificial intelligence to enhance your application. I integrate modern Gemini APIs, automated content processing, intelligent search, and AI-powered recommendations directly into custom web interfaces.',
    iconName: 'Cpu',
    deliverables: [
      'Gemini API & AI model integrations',
      'AI tool directory & course platform setups',
      'Automated content synthesis workflows',
      'Smart search & prompt guidance features'
    ]
  }
];

export const AEO_FAQS: FAQItem[] = [
  {
    question: 'Who is Hanan Irfan?',
    answer: 'Hanan Irfan is an 18-year-old multidisciplinary full-stack software developer, entrepreneur, SEO specialist, graphic designer, and AI enthusiast based in Rahim Yar Khan, Punjab, Pakistan. He is currently pursuing a BS in Computer Science at KFUEIT while building modern digital products and web applications.',
    category: 'General'
  },
  {
    question: 'What does Hanan Irfan do?',
    answer: 'Hanan Irfan builds full-stack web applications, SaaS platforms, custom WordPress sites, and digital utilities. He also provides technical SEO optimization, UI/UX graphic design, and AI integration services for businesses and digital platforms.',
    category: 'General'
  },
  {
    question: 'Where is Hanan Irfan based?',
    answer: 'Hanan Irfan is based in Rahim Yar Khan, Punjab, Pakistan, where he studies Computer Science at Khwaja Fareed University of Engineering and Information Technology (KFUEIT) and works globally on digital development projects.',
    category: 'Contact'
  },
  {
    question: 'What technologies does Hanan Irfan use?',
    answer: 'Hanan Irfan works extensively with React, Next.js, JavaScript (ES6+), TypeScript, Tailwind CSS, HTML5, CSS3, C++, Java, Python, SQL, Supabase, Firebase, REST APIs, WordPress, Google Search Console, and Canva/Photoshop.',
    category: 'Development'
  },
  {
    question: 'What projects has Hanan Irfan built?',
    answer: 'Hanan Irfan has built prominent web projects including NEXA POS System (a business management SaaS), Free Tools Hub (a web tools platform), AI Tool Guide, HI Digital Group agency hub, ACM KFUEIT community portal, AI Course platform, and several specialized web experiences.',
    category: 'Development'
  },
  {
    question: 'Is Hanan Irfan a full-stack developer?',
    answer: 'Yes, Hanan Irfan is a full-stack developer skilled in frontend component design with React and Tailwind CSS, as well as backend logic, database management with Supabase/Firebase/SQL, REST APIs, authentication, and cloud deployment.',
    category: 'Development'
  },
  {
    question: 'Does Hanan Irfan provide web development services?',
    answer: 'Yes, Hanan Irfan provides custom web development, full-stack application development, WordPress customization, speed optimization, and digital product building through his portfolio and HI Digital Group.',
    category: 'General'
  },
  {
    question: 'Does Hanan Irfan work with SEO?',
    answer: 'Yes, Hanan Irfan is a technical SEO specialist who optimizes websites for search engine crawlability, structured data schema (JSON-LD), canonical links, XML sitemaps, Core Web Vitals speed, and on-page keyword rankings.',
    category: 'SEO'
  },
  {
    question: "What is Hanan Irfan's educational background?",
    answer: 'Hanan Irfan is currently an undergraduate Computer Science student pursuing a Bachelor of Science in Computer Science (BSCS) at Khwaja Fareed University of Engineering and Information Technology (KFUEIT) in Rahim Yar Khan, Pakistan.',
    category: 'Education'
  },
  {
    question: 'How can someone contact Hanan Irfan?',
    answer: 'You can contact Hanan Irfan directly via email at hananirfan91@gmail.com, or through his social channels on LinkedIn (hananirfan), Instagram (hananirfan2026), Facebook (HananIrfan001), or by submitting the contact form on his official portfolio website.',
    category: 'Contact'
  }
];
