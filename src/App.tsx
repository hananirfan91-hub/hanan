import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PageId, Project } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ParticleCanvas } from './components/ParticleCanvas';
import { ScrollAnimatedBackground } from './components/ScrollAnimatedBackground';
import { CustomCursor } from './components/CustomCursor';
import { ProjectModal } from './components/ProjectModal';
import { PageLoader } from './components/PageLoader';
import { SmoothLenis } from './components/animations/SmoothLenis';
import { BackgroundMusicControl } from './components/BackgroundMusicControl';

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
  const [audioError, setAudioError] = useState(false);

  // Single HTML5 Background Music Audio Instance
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const userManuallyPausedRef = useRef(false);
  const lastManualToggleMsRef = useRef(0);
  const cleanupInteractionListenersRef = useRef<(() => void) | null>(null);

  const toggleAudio = () => {
    const audio = audioRef.current;
    if (!audio || audioError) return;

    lastManualToggleMsRef.current = performance.now();

    if (!audio.paused) {
      userManuallyPausedRef.current = true;
      if (cleanupInteractionListenersRef.current) {
        cleanupInteractionListenersRef.current();
        cleanupInteractionListenersRef.current = null;
      }
      audio.pause();
      setAudioEnabled(false);
    } else {
      userManuallyPausedRef.current = false;
      audio
        .play()
        .then(() => {
          setAudioEnabled(true);
          if (cleanupInteractionListenersRef.current) {
            cleanupInteractionListenersRef.current();
            cleanupInteractionListenersRef.current = null;
          }
        })
        .catch(() => {
          setAudioEnabled(false);
        });
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.4;

    const removeInteractionListeners = () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
    };

    function handleFirstInteraction(e: Event) {
      if (userManuallyPausedRef.current) {
        removeInteractionListeners();
        return;
      }
      if (performance.now() - lastManualToggleMsRef.current < 300) {
        return;
      }
      const target = e.target;
      if (target instanceof Element && target.closest('[data-music-control="true"], #btn-audio-toggle')) {
        return;
      }

      const currentAudio = audioRef.current;
      if (!currentAudio || !currentAudio.paused) {
        removeInteractionListeners();
        return;
      }

      currentAudio
        .play()
        .then(() => {
          setAudioEnabled(true);
          removeInteractionListeners();
          cleanupInteractionListenersRef.current = null;
        })
        .catch(() => {
          // Keep listeners active until a browser-permitted user interaction occurs
        });
    }

    cleanupInteractionListenersRef.current = removeInteractionListeners;

    // Attempt autoplay on initial website load
    audio
      .play()
      .then(() => {
        setAudioEnabled(true);
        removeInteractionListeners();
        cleanupInteractionListenersRef.current = null;
      })
      .catch(() => {
        // Autoplay with sound was blocked by browser policy; wait for first permitted user interaction
        document.addEventListener('click', handleFirstInteraction, { passive: true });
        document.addEventListener('keydown', handleFirstInteraction, { passive: true });
      });

    return () => {
      removeInteractionListeners();
      cleanupInteractionListenersRef.current = null;
      audio.pause();
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

        {/* Scroll Animated Deep Depth Background featuring Hanan Irfan */}
        <ScrollAnimatedBackground />

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

        {/* Single Persistent Background Music Audio Element & Floating Control */}
        <audio
          ref={audioRef}
          src="/assets/aistudio/pilot2kid-wallpaper-glow-k-pop-312341_ace7dd72.mp3"
          loop
          preload="auto"
          onPlay={() => setAudioEnabled(true)}
          onPause={() => {
            setAudioEnabled(false);
            if (audioRef.current && audioRef.current.currentTime > 0 && !audioRef.current.ended) {
              userManuallyPausedRef.current = true;
            }
          }}
          onError={() => {
            setAudioError(true);
            setAudioEnabled(false);
            if (cleanupInteractionListenersRef.current) {
              cleanupInteractionListenersRef.current();
              cleanupInteractionListenersRef.current = null;
            }
          }}
        />
        <BackgroundMusicControl
          isPlaying={audioEnabled}
          onToggle={toggleAudio}
          disabled={audioError}
        />
      </div>
    </SmoothLenis>
  );
}
