import { PageId } from '../types';
import {
  AEO_FAQS,
  EXPERIENCE_ITEMS,
  PERSONAL_INFO,
  PROJECTS,
  SERVICES,
  SKILL_CATEGORIES,
} from '../data/portfolioData';

export const BASE_URL = 'https://hanan56.vercel.app';
export const ANDROID_APP_ID = 'com.hananirfan.app';
export const PLAY_STORE_URL = `https://play.google.com/store/apps/details?id=${ANDROID_APP_ID}`;

interface PageSeoConfig {
  title: string;
  description: string;
  keywords: string;
  canonicalPath: string;
  ogType?: 'website' | 'profile' | 'article';
  noindex?: boolean;
  breadcrumbLabel: string;
}

const SEO_CONFIGS: Record<PageId, PageSeoConfig> = {
  home: {
    title: 'Hanan Irfan | Multidisciplinary Developer, SEO Specialist & Entrepreneur',
    description:
      'Official portfolio of Hanan Irfan — Multidisciplinary Developer, AI Developer & SEO/AEO/GEO Specialist from Rahim Yar Khan, Pakistan. BSCS 5th Semester (CGPA 3.65) at KFUEIT.',
    keywords:
      'Hanan Irfan, Abdul Hanan Irfan, AI Developer, Full-Stack Developer, Technical SEO, AEO, GEO, AIO, ASO, The Sports Room, NEXA POS, KFUEIT, Rahim Yar Khan',
    canonicalPath: '/',
    ogType: 'profile',
    breadcrumbLabel: 'Home',
  },
  about: {
    title: 'About Hanan Irfan | BSCS (5th Semester) @ KFUEIT & Founder of The Sports Room',
    description:
      "Learn about Hanan Irfan's Computer Science academic record at KFUEIT (CGPA 3.65, Dean's Honor Certificate), leadership at The Sports Room and ACM KFUEIT, and verified Google AI credentials.",
    keywords:
      "Hanan Irfan biography, KFUEIT BS Computer Science, Dean's Honor Certificate, Google AI Professional Certificate, ACM KFUEIT, D'Educationist Ambassador",
    canonicalPath: '/about',
    ogType: 'profile',
    breadcrumbLabel: 'About',
  },
  skills: {
    title: 'Skills & Expertise | AI Dev, Full-Stack, SEO, AEO & GEO — Hanan Irfan',
    description:
      'Technical stack and expertise of Hanan Irfan: AI Development, React, Next.js, TypeScript, Technical SEO, Answer Engine Optimization (AEO), GEO, Keyword Clustering & Content Strategy.',
    keywords:
      'Hanan Irfan skills, React TypeScript developer, AI development, Technical SEO, Answer Engine Optimization, Generative Engine Optimization, Firebase, Supabase',
    canonicalPath: '/skills',
    ogType: 'website',
    breadcrumbLabel: 'Skills',
  },
  experience: {
    title: 'Experience & Leadership | Hanan Irfan Portfolio',
    description:
      "Leadership and software engineering experience of Hanan Irfan across The Sports Room, ACM KFUEIT, D'Educationist, HI Digital Group, and KFUEIT.",
    keywords:
      'Hanan Irfan experience, The Sports Room founder, ACM KFUEIT Development Team Head, HI Digital Group, Full-Stack Developer Pakistan',
    canonicalPath: '/experience',
    ogType: 'profile',
    breadcrumbLabel: 'Experience',
  },
  projects: {
    title: 'Projects Portfolio | Hanan Irfan — Web Apps, AI & SEO',
    description:
      'Explore 11 live web apps and platforms built by Hanan Irfan, including The Sports Room, NEXA POS System, ACM KFUEIT, Free Tools Hub, and AI Tool Guide.',
    keywords:
      'Hanan Irfan projects, The Sports Room, NEXA POS System, Free Tools Hub, AI Tool Guide, HI Digital Group, React SaaS projects',
    canonicalPath: '/projects',
    ogType: 'website',
    breadcrumbLabel: 'Projects',
  },
  services: {
    title: 'Digital & Technical Services | AI, Web Apps, SEO, AEO & GEO — Hanan Irfan',
    description:
      'AI development, full-stack React/Next.js web applications, technical SEO, AEO, GEO, keyword strategy, and UI/UX services by Hanan Irfan.',
    keywords:
      'AI development services, full-stack web consulting, Technical SEO consultant Pakistan, AEO GEO optimization, WordPress speed optimization',
    canonicalPath: '/services',
    ogType: 'website',
    breadcrumbLabel: 'Services',
  },
  'web-development': {
    title: 'Web & Full-Stack Development | Hanan Irfan — Rahim Yar Khan',
    description:
      'Mobile-first React, Next.js, TypeScript, Firebase, and Supabase web application engineering by Hanan Irfan in Rahim Yar Khan, Pakistan.',
    keywords:
      'Web Developer Rahim Yar Khan, React Developer Pakistan, Next.js TypeScript Engineer, Full-Stack SaaS Developer',
    canonicalPath: '/web-development',
    ogType: 'website',
    breadcrumbLabel: 'Web Development',
  },
  'seo-expert': {
    title: 'SEO, AEO, GEO & AIO Consulting | Hanan Irfan — Rahim Yar Khan',
    description:
      'Search Engine Optimization (SEO), Answer Engine Optimization (AEO), Generative Engine Optimization (GEO), AIO, and keyword clustering by Hanan Irfan.',
    keywords:
      'SEO Specialist Rahim Yar Khan, Technical SEO audit, Answer Engine Optimization AEO, Generative Engine Optimization GEO, llms.txt AIO',
    canonicalPath: '/seo-expert',
    ogType: 'website',
    breadcrumbLabel: 'SEO, AEO & GEO',
  },
  'graphic-design': {
    title: 'UI/UX & Brand Design | Hanan Irfan — Rahim Yar Khan',
    description:
      'Human-centered UI/UX wireframes, responsive design systems, and clean visual brand assets engineered by Hanan Irfan.',
    keywords:
      'UI UX Designer Rahim Yar Khan, Design Systems, Brand Identity, Tailwind CSS UI Architecture',
    canonicalPath: '/graphic-design',
    ogType: 'website',
    breadcrumbLabel: 'UI/UX & Design',
  },
  contact: {
    title: 'Contact Hanan Irfan | Email, Location & Verified Social Profiles',
    description:
      'Contact Hanan Irfan directly via email (hananirfan91@gmail.com), WhatsApp, GitHub, LinkedIn, X (@hananirfan91), Instagram, Facebook, and TikTok.',
    keywords:
      'Contact Hanan Irfan, hananirfan91@gmail.com, Hire Full-Stack Developer Rahim Yar Khan, SEO Consultant Pakistan',
    canonicalPath: '/contact',
    ogType: 'website',
    breadcrumbLabel: 'Contact',
  },
  'privacy-policy': {
    title: 'Privacy Policy | Hanan Irfan Portfolio',
    description:
      'Privacy Policy detailing browser storage, Service Worker caching, push notifications, and Android TWA privacy practices for Hanan Irfan Portfolio.',
    keywords: 'Hanan Irfan Privacy Policy, Android TWA com.hananirfan.app Privacy Policy, Web Push privacy',
    canonicalPath: '/privacy-policy',
    ogType: 'website',
    breadcrumbLabel: 'Privacy Policy',
  },
  privacy: {
    title: 'Privacy Policy | Hanan Irfan Portfolio',
    description: 'Privacy Policy for Hanan Irfan Portfolio and Android App.',
    keywords: 'Hanan Irfan Privacy Policy',
    canonicalPath: '/privacy-policy',
    ogType: 'website',
    breadcrumbLabel: 'Privacy Policy',
  },
  'terms-and-conditions': {
    title: 'Terms & Conditions | Hanan Irfan Portfolio',
    description:
      'Terms and Conditions governing use of Hanan Irfan Portfolio, intellectual property, third-party demos, and consulting disclosures.',
    keywords: 'Hanan Irfan Portfolio Terms and Conditions',
    canonicalPath: '/terms-and-conditions',
    ogType: 'website',
    breadcrumbLabel: 'Terms & Conditions',
  },
  terms: {
    title: 'Terms & Conditions | Hanan Irfan Portfolio',
    description: 'Terms and Conditions for Hanan Irfan Portfolio.',
    keywords: 'Hanan Irfan Portfolio Terms',
    canonicalPath: '/terms-and-conditions',
    ogType: 'website',
    breadcrumbLabel: 'Terms & Conditions',
  },
  disclaimer: {
    title: 'Disclaimer | Hanan Irfan Portfolio',
    description:
      'General, external project, SEO performance, and informational disclaimers for Hanan Irfan Portfolio.',
    keywords: 'Hanan Irfan Portfolio Disclaimer',
    canonicalPath: '/disclaimer',
    ogType: 'website',
    breadcrumbLabel: 'Disclaimer',
  },
  'admin-notifications': {
    title: 'Notification Admin Console | Hanan Irfan Portfolio',
    description: 'Private Push Notification Management Console for Hanan Irfan Portfolio.',
    keywords: 'Notification Admin',
    canonicalPath: '/admin-notifications',
    ogType: 'website',
    noindex: true,
    breadcrumbLabel: 'Admin',
  },
};

function upsertMetaTag(
  selector: string,
  createAttrs: Record<string, string>,
  attrName: 'content' | 'href',
  value: string
) {
  let el = document.querySelector(selector);
  if (!el) {
    const tag = selector.startsWith('link[') ? 'link' : 'meta';
    el = document.createElement(tag);
    for (const [k, v] of Object.entries(createAttrs)) {
      el.setAttribute(k, v);
    }
    document.head.appendChild(el);
  }
  el.setAttribute(attrName, value);
}

function buildRouteJsonLd(page: PageId, config: PageSeoConfig, canonicalUrl: string) {
  const breadcrumb = {
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${BASE_URL}/`,
      },
      ...(config.canonicalPath !== '/'
        ? [
            {
              '@type': 'ListItem',
              position: 2,
              name: config.breadcrumbLabel,
              item: canonicalUrl,
            },
          ]
        : []),
    ],
  };

  const graph: Record<string, unknown>[] = [breadcrumb];

  if (page === 'projects') {
    graph.push({
      '@type': 'CollectionPage',
      name: 'Projects Portfolio — Hanan Irfan',
      url: canonicalUrl,
      mainEntity: {
        '@type': 'ItemList',
        numberOfItems: PROJECTS.length,
        itemListElement: PROJECTS.map((p, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          item: {
            '@type': 'SoftwareApplication',
            name: p.title,
            url: p.url,
            applicationCategory: p.category,
            operatingSystem: 'Web',
            author: { '@id': `${BASE_URL}/#person` },
            description: p.description,
          },
        })),
      },
    });
  } else if (page === 'about') {
    graph.push({
      '@type': 'AboutPage',
      name: 'About Hanan Irfan',
      url: canonicalUrl,
      mainEntity: { '@id': `${BASE_URL}/#person` },
    });
    graph.push({
      '@type': 'FAQPage',
      mainEntity: AEO_FAQS.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer },
      })),
    });
  } else if (page === 'skills') {
    graph.push({
      '@type': 'WebPage',
      name: 'Skills & Technical Stack — Hanan Irfan',
      url: canonicalUrl,
      about: SKILL_CATEGORIES.flatMap((c) => c.skills).map((s) => ({
        '@type': 'DefinedTerm',
        name: s.name,
        description: s.description,
      })),
    });
  } else if (page === 'experience') {
    graph.push({
      '@type': 'ProfilePage',
      name: 'Experience & Leadership — Hanan Irfan',
      url: canonicalUrl,
      mainEntity: {
        '@id': `${BASE_URL}/#person`,
        hasOccupation: EXPERIENCE_ITEMS.map((exp) => ({
          '@type': 'Role',
          roleName: exp.title,
          description: exp.description,
        })),
      },
    });
  } else if (
    page === 'services' ||
    page === 'web-development' ||
    page === 'seo-expert' ||
    page === 'graphic-design'
  ) {
    graph.push({
      '@type': 'Service',
      name: config.breadcrumbLabel,
      url: canonicalUrl,
      provider: { '@id': `${BASE_URL}/#person` },
      areaServed: ['Rahim Yar Khan', 'Pakistan', 'Worldwide'],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Engineering, AI & Search Services',
        itemListElement: SERVICES.map((svc) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: svc.title,
            description: svc.shortDesc,
          },
        })),
      },
    });
  } else if (page === 'contact') {
    graph.push({
      '@type': 'ContactPage',
      name: 'Contact Hanan Irfan',
      url: canonicalUrl,
      mainEntity: {
        '@id': `${BASE_URL}/#person`,
        email: PERSONAL_INFO.email,
      },
    });
  } else if (page === 'home') {
    graph.push({
      '@type': 'ItemList',
      name: 'Featured Projects by Hanan Irfan',
      itemListElement: PROJECTS.slice(0, 6).map((p, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: p.title,
        url: p.url,
      })),
    });
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}

export function applyPageSeo(page: PageId): void {
  if (typeof document === 'undefined') return;

  const config = SEO_CONFIGS[page] || SEO_CONFIGS.home;
  const canonicalUrl = `${BASE_URL}${config.canonicalPath}`;

  document.title = config.title;

  upsertMetaTag('meta[name="title"]', { name: 'title' }, 'content', config.title);
  upsertMetaTag('meta[name="description"]', { name: 'description' }, 'content', config.description);
  upsertMetaTag('meta[name="keywords"]', { name: 'keywords' }, 'content', config.keywords);
  upsertMetaTag(
    'meta[name="robots"]',
    { name: 'robots' },
    'content',
    config.noindex
      ? 'noindex, nofollow'
      : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
  );
  upsertMetaTag('link[rel="canonical"]', { rel: 'canonical' }, 'href', canonicalUrl);

  // OpenGraph
  upsertMetaTag('meta[property="og:type"]', { property: 'og:type' }, 'content', config.ogType || 'website');
  upsertMetaTag('meta[property="og:title"]', { property: 'og:title' }, 'content', config.title);
  upsertMetaTag('meta[property="og:description"]', { property: 'og:description' }, 'content', config.description);
  upsertMetaTag('meta[property="og:url"]', { property: 'og:url' }, 'content', canonicalUrl);

  // Twitter / X
  upsertMetaTag('meta[name="twitter:title"]', { name: 'twitter:title' }, 'content', config.title);
  upsertMetaTag('meta[name="twitter:description"]', { name: 'twitter:description' }, 'content', config.description);
  upsertMetaTag('meta[name="twitter:url"]', { name: 'twitter:url' }, 'content', canonicalUrl);

  // Dynamic Route JSON-LD
  if (!config.noindex) {
    let ldScript = document.getElementById('dynamic-page-jsonld') as HTMLScriptElement | null;
    if (!ldScript) {
      ldScript = document.createElement('script');
      ldScript.id = 'dynamic-page-jsonld';
      ldScript.type = 'application/ld+json';
      document.head.appendChild(ldScript);
    }
    ldScript.textContent = JSON.stringify(buildRouteJsonLd(page, config, canonicalUrl));
  } else {
    document.getElementById('dynamic-page-jsonld')?.remove();
  }
}
