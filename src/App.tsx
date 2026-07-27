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
import { WebDevelopmentPage } from './pages/WebDevelopmentPage';
import { SeoPage } from './pages/SeoPage';
import { GraphicDesignPage } from './pages/GraphicDesignPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';

function getPageFromPath(path: string): PageId {
  const cleanPath = path.replace(/^\/+|\/+$/g, '').toLowerCase();
  const validPages: PageId[] = ['home', 'about', 'skills', 'experience', 'projects', 'services', 'web-development', 'seo-expert', 'graphic-design', 'contact', 'privacy', 'terms'];
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
      home: 'Hanan Irfan | Web Developer & SEO Expert',
      about: 'About Hanan Irfan | Web Developer in RYK',
      skills: 'Skills & Stack | Hanan Irfan SEO Specialist',
      experience: 'Hanan Irfan Experience | Full Stack Developer',
      projects: 'Projects Overview | Hanan Irfan Web Developer',
      services: 'Web Development Services | Hanan Irfan',
      'web-development': 'Web Developer in Rahim Yar Khan | Hanan Irfan',
      'seo-expert': 'SEO Expert in Rahim Yar Khan | Hanan Irfan RYK',
      'graphic-design': 'Graphic Designer in Rahim Yar Khan | Hanan Irfan',
      contact: 'Contact Hanan Irfan | Web Developer in RYK',
      privacy: 'Privacy Policy | Hanan Irfan Portfolio',
      terms: 'Terms of Service | Hanan Irfan Portfolio'
    };

    const descriptionMap: Record<PageId, string> = {
      home: 'Hanan Irfan is a professional full-stack web developer, SEO expert, and graphic designer in Rahim Yar Khan (RYK), Pakistan, creating modern responsive websites and digital applications.',
      about: 'Learn about Hanan Irfan, an 18-year-old BSCS student at KFUEIT, full stack developer, SEO specialist, and entrepreneur in Rahim Yar Khan offering custom web development and tech solutions.',
      skills: "Explore Hanan Irfan's skills in React, Next.js, TypeScript, WordPress, technical SEO, local SEO, graphic design, and database engineering. Expert web development services in Rahim Yar Khan.",
      experience: 'Review the career milestones, software projects, and academic background of Hanan Irfan, full stack web developer and technical SEO specialist operating out of Rahim Yar Khan, Pakistan.',
      projects: 'Explore the project overview portfolio by Hanan Irfan featuring web development, SEO optimization, SaaS apps, and graphic design work crafted for clients in Rahim Yar Khan and globally.',
      services: 'Professional website development, local SEO optimization, graphic design, and full stack web development services in Rahim Yar Khan (RYK) by freelance developer Hanan Irfan.',
      'web-development': 'Hanan Irfan is a professional web developer in Rahim Yar Khan (RYK) providing custom website development services, React, Next.js, and WordPress solutions for local and global businesses.',
      'seo-expert': 'Hanan Irfan is a local SEO expert in Rahim Yar Khan (RYK) specializing in Google rankings, technical SEO audits, and keyword optimization services to grow your business search visibility.',
      'graphic-design': 'Hanan Irfan is a creative graphic designer in Rahim Yar Khan (RYK) providing logo design, social media post design, and branding services for businesses looking for premium visual identity.',
      contact: 'Contact Hanan Irfan to hire a professional web developer, SEO specialist, or graphic designer in Rahim Yar Khan (RYK). Get a custom quote for your website or SaaS project today.',
      privacy: "Read the Privacy Policy for Hanan Irfan's portfolio website. Learn how we handle user data with complete transparency, privacy protection, and security across all our web applications.",
      terms: "Review the Terms of Service for using Hanan Irfan's website, web apps, and digital services. Clear terms governing usage, intellectual property, and service agreements."
    };

    if (titleMap[currentPage]) {
      document.title = titleMap[currentPage];
    }

    if (descriptionMap[currentPage]) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', descriptionMap[currentPage]);
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
