import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PageId, Project } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SmoothLenis } from './components/animations/SmoothLenis';
import { BackgroundMusicControl } from './components/BackgroundMusicControl';
import { ErrorBoundary } from './components/ErrorBoundary';
import { OfflineIndicator } from './components/OfflineIndicator';
import { MobileBottomNav } from './components/MobileBottomNav';

import { HomePage } from './pages/HomePage';

const ProjectModal = lazy(() => import('./components/ProjectModal').then((m) => ({ default: m.ProjectModal })));
const PWAInstallModal = lazy(() => import('./components/PWAInstallModal').then((m) => ({ default: m.PWAInstallModal })));
const AboutPage = lazy(() => import('./pages/AboutPage').then((m) => ({ default: m.AboutPage })));
const SkillsPage = lazy(() => import('./pages/SkillsPage').then((m) => ({ default: m.SkillsPage })));
const ExperiencePage = lazy(() => import('./pages/ExperiencePage').then((m) => ({ default: m.ExperiencePage })));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage').then((m) => ({ default: m.ProjectsPage })));
const ServicesPage = lazy(() => import('./pages/ServicesPage').then((m) => ({ default: m.ServicesPage })));
const WebDevelopmentPage = lazy(() => import('./pages/WebDevelopmentPage').then((m) => ({ default: m.WebDevelopmentPage })));
const SeoPage = lazy(() => import('./pages/SeoPage').then((m) => ({ default: m.SeoPage })));
const GraphicDesignPage = lazy(() => import('./pages/GraphicDesignPage').then((m) => ({ default: m.GraphicDesignPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then((m) => ({ default: m.ContactPage })));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage').then((m) => ({ default: m.PrivacyPage })));
const TermsPage = lazy(() => import('./pages/TermsPage').then((m) => ({ default: m.TermsPage })));
const DisclaimerPage = lazy(() => import('./pages/DisclaimerPage').then((m) => ({ default: m.DisclaimerPage })));

function getPageFromPath(path: string): PageId {
  const cleanPath = path.replace(/^\/+|\/+$/g, '').toLowerCase();
  if (cleanPath === '' || cleanPath === 'home') return 'home';
  if (cleanPath === 'privacy' || cleanPath === 'privacy-policy') return 'privacy-policy';
  if (cleanPath === 'terms' || cleanPath === 'terms-and-conditions') return 'terms-and-conditions';
  if (cleanPath === 'disclaimer') return 'disclaimer';

  const validPages: PageId[] = [
    'about',
    'skills',
    'experience',
    'projects',
    'services',
    'web-development',
    'seo-expert',
    'graphic-design',
    'contact',
  ];
  if (validPages.includes(cleanPath as PageId)) return cleanPath as PageId;
  return 'home';
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>(() => {
    if (typeof window !== 'undefined') {
      return getPageFromPath(window.location.pathname);
    }
    return 'home';
  });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [audioError, setAudioError] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleAudio = () => {
    const audio = audioRef.current;
    if (!audio || audioError) return;

    if (!audio.paused) {
      audio.pause();
      setAudioEnabled(false);
    } else {
      audio.volume = 0.35;
      audio
        .play()
        .then(() => {
          setAudioEnabled(true);
        })
        .catch(() => {
          setAudioEnabled(false);
        });
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    const handleVisibility = () => {
      if (document.hidden && audio && !audio.paused) {
        audio.pause();
        setAudioEnabled(false);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      if (audio) audio.pause();
    };
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      const pageFromUrl = getPageFromPath(window.location.pathname);
      setCurrentPage(pageFromUrl);
      setSelectedProject(null);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (page: PageId, pushState = true) => {
    const normalized: PageId =
      page === 'privacy' ? 'privacy-policy' : page === 'terms' ? 'terms-and-conditions' : page;

    setCurrentPage(normalized);
    if (pushState && typeof window !== 'undefined') {
      const targetPath = normalized === 'home' ? '/' : `/${normalized}`;
      if (window.location.pathname !== targetPath) {
        try {
          window.history.pushState({ page: normalized }, '', targetPath);
        } catch {
          // Ignore pushState restrictions in sandboxed viewers
        }
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const titleMap: Record<PageId, string> = {
      home: 'Hanan Irfan | Multidisciplinary Developer, SEO Specialist & Entrepreneur',
      about: 'About Hanan Irfan | BSCS (5th Semester) @ KFUEIT & Founder of The Sports Room',
      skills: 'Skills & Expertise | AI Dev, Full-Stack, SEO, AEO & GEO — Hanan Irfan',
      experience: 'Experience & Leadership | Hanan Irfan Portfolio',
      projects: 'Projects Portfolio | Hanan Irfan — Web Apps, AI & SEO',
      services: 'Digital & Technical Services | Hanan Irfan',
      'web-development': 'Web & Full-Stack Development | Hanan Irfan — Rahim Yar Khan',
      'seo-expert': 'SEO, AEO & GEO Consulting | Hanan Irfan — Rahim Yar Khan',
      'graphic-design': 'UI/UX & Brand Design | Hanan Irfan — Rahim Yar Khan',
      contact: 'Contact Hanan Irfan | Email, Address & Social Profiles',
      'privacy-policy': 'Privacy Policy | Hanan Irfan Portfolio',
      privacy: 'Privacy Policy | Hanan Irfan Portfolio',
      'terms-and-conditions': 'Terms & Conditions | Hanan Irfan Portfolio',
      terms: 'Terms & Conditions | Hanan Irfan Portfolio',
      disclaimer: 'Disclaimer | Hanan Irfan Portfolio',
    };

    const descriptionMap: Record<PageId, string> = {
      home: 'Portfolio of Hanan Irfan — Multidisciplinary Developer, SEO Specialist & Entrepreneur from Rahim Yar Khan, Pakistan. BSCS 5th Semester (CGPA 3.65) at KFUEIT, Founder of The Sports Room, and ACM KFUEIT Development Team Head.',
      about: "Learn about Hanan Irfan's Computer Science background at KFUEIT (5th Semester, CGPA 3.65), leadership roles at The Sports Room, ACM KFUEIT, and D'Educationist, and verified certifications.",
      skills: 'Technical stack and expertise of Hanan Irfan: AI Development, Frontend & Full-Stack Development, SEO, AEO, GEO, Technical SEO, Keyword Clustering, and Content Strategy.',
      experience: 'Leadership and engineering experience of Hanan Irfan across The Sports Room, ACM KFUEIT, HI Digital Group, and KFUEIT.',
      projects: 'Explore live web applications and digital platforms built by Hanan Irfan, including The Sports Room, NEXA POS System, ACM KFUEIT, Free Tools Hub, and AI Tool Guide.',
      services: 'AI development, full-stack web applications, technical SEO, AEO, GEO, keyword strategy, and UI/UX services by Hanan Irfan.',
      'web-development': 'React, Next.js, TypeScript, and full-stack web application development by Hanan Irfan in Rahim Yar Khan, Pakistan.',
      'seo-expert': 'Search Engine Optimization (SEO), Answer Engine Optimization (AEO), Generative Engine Optimization (GEO), and keyword clustering services by Hanan Irfan.',
      'graphic-design': 'UI/UX design, brand visuals, and clean responsive interface design by Hanan Irfan.',
      contact: 'Connect directly with Hanan Irfan via email (hananirfan91@gmail.com), location details in Rahim Yar Khan, GitHub, LinkedIn, X (@hananirfan91), Instagram, Facebook, and TikTok.',
      'privacy-policy': 'Privacy Policy detailing exact storage, Service Worker caching, external links, and user privacy practices for Hanan Irfan Portfolio.',
      privacy: 'Privacy Policy for Hanan Irfan Portfolio.',
      'terms-and-conditions': 'Terms and Conditions governing use of Hanan Irfan Portfolio, intellectual property, third-party project demos, and liability disclosures.',
      terms: 'Terms and Conditions for Hanan Irfan Portfolio.',
      disclaimer: 'General, external project, and informational disclaimers for Hanan Irfan Portfolio.',
    };

    const pageTitle = titleMap[currentPage] || titleMap.home;
    const pageDescription = descriptionMap[currentPage] || descriptionMap.home;
    const canonicalPath = currentPage === 'home' ? '/' : `/${currentPage}`;
    const canonicalUrl = `https://hanan56.vercel.app${canonicalPath}`;

    document.title = pageTitle;

    const updateMeta = (selector: string, attr: string, content: string) => {
      const el = document.querySelector(selector);
      if (el) el.setAttribute(attr, content);
    };

    updateMeta('meta[name="description"]', 'content', pageDescription);
    updateMeta('meta[property="og:title"]', 'content', pageTitle);
    updateMeta('meta[property="og:description"]', 'content', pageDescription);
    updateMeta('meta[property="og:url"]', 'content', canonicalUrl);
    updateMeta('meta[name="twitter:title"]', 'content', pageTitle);
    updateMeta('meta[name="twitter:description"]', 'content', pageDescription);
    updateMeta('meta[name="twitter:url"]', 'content', canonicalUrl);
    updateMeta('link[rel="canonical"]', 'href', canonicalUrl);
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} onSelectProject={(p) => setSelectedProject(p)} />;
      case 'about':
        return <AboutPage onNavigate={handleNavigate} />;
      case 'skills':
        return <SkillsPage />;
      case 'experience':
        return <ExperiencePage />;
      case 'projects':
        return <ProjectsPage onSelectProject={(p) => setSelectedProject(p)} onNavigate={handleNavigate} />;
      case 'services':
        return <ServicesPage onNavigate={handleNavigate} />;
      case 'web-development':
        return <WebDevelopmentPage onNavigate={handleNavigate} />;
      case 'seo-expert':
        return <SeoPage onNavigate={handleNavigate} />;
      case 'graphic-design':
        return <GraphicDesignPage onNavigate={handleNavigate} />;
      case 'contact':
        return <ContactPage onNavigate={handleNavigate} />;
      case 'privacy-policy':
      case 'privacy':
        return <PrivacyPage onNavigate={handleNavigate} />;
      case 'terms-and-conditions':
      case 'terms':
        return <TermsPage onNavigate={handleNavigate} />;
      case 'disclaimer':
        return <DisclaimerPage onNavigate={handleNavigate} />;
      default:
        return <HomePage onNavigate={handleNavigate} onSelectProject={(p) => setSelectedProject(p)} />;
    }
  };

  return (
    <ErrorBoundary>
      <SmoothLenis>
        <div className="min-h-screen bg-[#080D1B] text-[#F8FAFC] font-sans relative overflow-x-hidden selection:bg-[#3B82F6]/30 selection:text-[#F8FAFC]">
          {/* Midnight Navy radial blue/violet ambient backdrop */}
          <div
            aria-hidden="true"
            className="fixed inset-0 pointer-events-none z-0 editorial-grid-bg"
          />
          <div
            aria-hidden="true"
            className="fixed -top-48 -left-40 w-[620px] h-[620px] rounded-full pointer-events-none z-0 aurora-orb-a"
            style={{
              background: 'radial-gradient(circle, rgba(59, 130, 246, 0.16) 0%, rgba(59, 130, 246, 0) 70%)',
            }}
          />
          <div
            aria-hidden="true"
            className="fixed top-1/3 -right-40 w-[560px] h-[560px] rounded-full pointer-events-none z-0 aurora-orb-b"
            style={{
              background: 'radial-gradient(circle, rgba(139, 92, 246, 0.13) 0%, rgba(139, 92, 246, 0) 70%)',
            }}
          />
          <div
            aria-hidden="true"
            className="fixed -bottom-48 left-1/4 w-[520px] h-[520px] rounded-full pointer-events-none z-0 aurora-orb-a"
            style={{
              background: 'radial-gradient(circle, rgba(59, 130, 246, 0.10) 0%, rgba(59, 130, 246, 0) 70%)',
            }}
          />

          <Navbar
            currentPage={currentPage}
            onNavigate={handleNavigate}
            audioEnabled={audioEnabled}
            toggleAudio={toggleAudio}
          />

          <main className="relative z-10 pt-20 sm:pt-24">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              >
                <Suspense fallback={<div className="min-h-[60vh]" />}>
                  {renderPage()}
                </Suspense>
              </motion.div>
            </AnimatePresence>
          </main>

          <Footer onNavigate={handleNavigate} />

          <MobileBottomNav currentPage={currentPage} onNavigate={handleNavigate} />

          {selectedProject && (
            <Suspense fallback={null}>
              <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
            </Suspense>
          )}

          <audio
            ref={audioRef}
            src="/assets/aistudio/pilot2kid-wallpaper-glow-k-pop-312341_ace7dd72.mp3"
            loop
            preload="none"
            onPlay={() => setAudioEnabled(true)}
            onPause={() => setAudioEnabled(false)}
            onError={() => {
              setAudioError(true);
              setAudioEnabled(false);
            }}
          />
          <BackgroundMusicControl isPlaying={audioEnabled} onToggle={toggleAudio} disabled={audioError} />

          <OfflineIndicator />

          <Suspense fallback={null}>
            <PWAInstallModal />
          </Suspense>
        </div>
      </SmoothLenis>
    </ErrorBoundary>
  );
}
