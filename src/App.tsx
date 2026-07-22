import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PageId, Project } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ParticleCanvas } from './components/ParticleCanvas';
import { CustomCursor } from './components/CustomCursor';
import { ProjectModal } from './components/ProjectModal';
import { PageLoader } from './components/PageLoader';
import { SmoothLenis } from './components/animations/SmoothLenis';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { SkillsPage } from './pages/SkillsPage';
import { ExperiencePage } from './pages/ExperiencePage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ServicesPage } from './pages/ServicesPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';

function getPageFromPath(path: string): PageId {
  const cleanPath = path.replace(/^\/+|\/+$/g, '').toLowerCase();
  const validPages: PageId[] = ['home', 'about', 'skills', 'experience', 'projects', 'services', 'contact', 'privacy', 'terms'];
  if (cleanPath === '' || cleanPath === 'home') return 'home';
  if (validPages.includes(cleanPath as PageId)) return cleanPath as PageId;
  return 'home';
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<PageId>(() => {
    if (typeof window !== 'undefined') {
      return getPageFromPath(window.location.pathname);
    }
    return 'home';
  });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [audioEnabled, setAudioEnabled] = useState(false);

  // Web Audio Synth ambient sound setup
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  const toggleAudio = () => {
    if (!audioEnabled) {
      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (!audioCtxRef.current) {
          audioCtxRef.current = new AudioCtx();
        }
        const ctx = audioCtxRef.current;
        if (ctx.state === 'suspended') {
          ctx.resume();
        }

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(110, ctx.currentTime); // Low deep drone (A2)

        gain.gain.setValueAtTime(0.015, ctx.currentTime); // Very soft background level

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        oscRef.current = osc;
        gainRef.current = gain;

        setAudioEnabled(true);
      } catch (err) {
        console.log('Audio init blocked or unsupported');
      }
    } else {
      if (oscRef.current) {
        try {
          oscRef.current.stop();
          oscRef.current.disconnect();
        } catch (e) {}
      }
      setAudioEnabled(false);
    }
  };

  useEffect(() => {
    return () => {
      if (oscRef.current) {
        try {
          oscRef.current.stop();
        } catch (e) {}
      }
    };
  }, []);

  // Listen to browser Back/Forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const pageFromUrl = getPageFromPath(window.location.pathname);
      setCurrentPage(pageFromUrl);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (page: PageId, pushState = true) => {
    setCurrentPage(page);
    if (pushState && typeof window !== 'undefined') {
      const targetPath = page === 'home' ? '/' : `/${page}`;
      if (window.location.pathname !== targetPath) {
        window.history.pushState({ page }, '', targetPath);
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const titleMap: Record<PageId, string> = {
      home: 'Hanan Irfan | Full-Stack Developer, Web Developer & Digital Creator',
      about: 'About Hanan Irfan | BSCS Student, Software Developer & Tech Enthusiast',
      skills: 'Skills & Tech Stack | Hanan Irfan — React, Next.js, Technical SEO & AI',
      experience: 'Experience & Milestones | Hanan Irfan — Full-Stack Developer & Entrepreneur',
      projects: 'Featured Projects & Software | Hanan Irfan — NEXA POS & Web Applications',
      services: 'Services & Digital Solutions | Hanan Irfan — Development, SEO & UI/UX',
      contact: "Contact & Let's Work Together | Hanan Irfan — Rahim Yar Khan, Pakistan",
      privacy: 'Privacy Policy | Hanan Irfan Portfolio',
      terms: 'Terms of Service | Hanan Irfan Portfolio'
    };

    if (titleMap[currentPage]) {
      document.title = titleMap[currentPage];
    }
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage
            onNavigate={handleNavigate}
            onSelectProject={(p) => setSelectedProject(p)}
          />
        );
      case 'about':
        return <AboutPage onNavigate={handleNavigate} />;
      case 'skills':
        return <SkillsPage />;
      case 'experience':
        return <ExperiencePage />;
      case 'projects':
        return <ProjectsPage onSelectProject={(p) => setSelectedProject(p)} />;
      case 'services':
        return <ServicesPage onNavigate={handleNavigate} />;
      case 'contact':
        return <ContactPage />;
      case 'privacy':
        return <PrivacyPage />;
      case 'terms':
        return <TermsPage />;
      default:
        return (
          <HomePage
            onNavigate={handleNavigate}
            onSelectProject={(p) => setSelectedProject(p)}
          />
        );
    }
  };

  return (
    <SmoothLenis>
      <div className="min-h-screen bg-[#07080c] text-slate-100 font-sans relative overflow-x-hidden selection:bg-purple-500/30 selection:text-purple-200">
        
        {/* Cinematic Page Loader */}
        <AnimatePresence>
          {loading && <PageLoader onComplete={() => setLoading(false)} />}
        </AnimatePresence>

        {/* Interactive Background Particle Canvas */}
        <ParticleCanvas />

        {/* Smooth Custom Cursor */}
        <CustomCursor />

        {/* Header Navbar */}
        <Navbar
          currentPage={currentPage}
          onNavigate={handleNavigate}
          audioEnabled={audioEnabled}
          toggleAudio={toggleAudio}
        />

        {/* Main Content View with Smooth Page Transitions */}
        <main className="relative z-10 pt-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Footer */}
        <Footer onNavigate={handleNavigate} />

        {/* Project Detail Modal */}
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </SmoothLenis>
  );
}
