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
import { AnnouncementBanner } from './components/AnnouncementBanner';
import {
  ForegroundPushToast,
  type ForegroundNotificationItem,
} from './components/ForegroundPushToast';
import { applyPageSeo } from './lib/seo';
import {
  dismissToastId,
  fetchLiveNotificationFeed,
  getReadNotificationIds,
  isToastDismissed,
  markAllNotificationsRead,
  markNotificationRead,
  type LiveNotificationItem,
} from './lib/liveNotifications';
import { autoSyncExistingPushSubscription } from './lib/pushNotifications';

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
const AdminNotificationsPage = lazy(() =>
  import('./pages/AdminNotificationsPage').then((m) => ({ default: m.AdminNotificationsPage }))
);

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
    'admin-notifications',
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
  const [foregroundPush, setForegroundPush] = useState<ForegroundNotificationItem | null>(null);
  const [activeToastFeedId, setActiveToastFeedId] = useState<string | null>(null);
  const [liveNotifications, setLiveNotifications] = useState<LiveNotificationItem[]>([]);
  const [readNotificationIds, setReadNotificationIds] = useState<Set<string>>(() =>
    getReadNotificationIds()
  );

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

  const navigateByNotificationTarget = (rawUrl?: string, notificationType?: string) => {
    setForegroundPush(null);

    if (rawUrl && /^https?:\/\//i.test(rawUrl)) {
      try {
        const parsed = new URL(rawUrl);
        if (parsed.origin !== window.location.origin) {
          window.location.href = parsed.href;
          return;
        }
        rawUrl = `${parsed.pathname}${parsed.search}${parsed.hash}`;
      } catch {
        // Fallback to route check below
      }
    }

    const fallbackPath =
      notificationType === 'new-project' || notificationType === 'project-update'
        ? '/projects'
        : notificationType === 'new-achievement' || notificationType === 'new-certificate'
          ? '/about#achievements'
          : notificationType === 'new-skill'
            ? '/skills'
            : notificationType === 'experience-update'
              ? '/experience'
              : '/';

    const target = rawUrl && rawUrl.startsWith('/') ? rawUrl : fallbackPath;
    const [pathOnly, hashPart] = target.split('#');
    const pageId = getPageFromPath(pathOnly || '/');
    handleNavigate(pageId);

    if (hashPart) {
      window.setTimeout(() => {
        const el = document.getElementById(hashPart);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 360);
    }
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Handle initial hash anchor (e.g. /about#achievements opened from closed app notification)
    if (window.location.hash) {
      const targetId = window.location.hash.slice(1);
      window.setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 450);
    }

    const handleSwMessage = (event: MessageEvent) => {
      const data = event.data as
        | {
            type?: string;
            url?: string;
            notificationType?: string;
            payload?: ForegroundNotificationItem;
          }
        | undefined;
      if (!data?.type) return;

      if (data.type === 'NOTIFICATION_NAVIGATE') {
        navigateByNotificationTarget(data.url, data.notificationType);
      } else if (data.type === 'PORTFOLIO_PUSH_RECEIVED' && data.payload) {
        setForegroundPush(data.payload);
      }
    };

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', handleSwMessage);
    }

    let unsubFcm: (() => void) | undefined;
    if ('Notification' in window && Notification.permission === 'granted') {
      void autoSyncExistingPushSubscription();
      void import('./lib/firebase')
        .then(({ listenToForegroundFcmMessages }) =>
          listenToForegroundFcmMessages((msg) => {
            if (msg.title || msg.body) {
              setActiveToastFeedId(null);
              setForegroundPush({
                title: msg.title || 'Hanan Irfan Portfolio',
                body: msg.body || 'New portfolio update available.',
                url: msg.url,
                notificationType: msg.type,
              });
            }
          })
        )
        .then((unsub) => {
          unsubFcm = unsub;
        })
        .catch(() => {});
    }

    // Fetch live updates automatically for ALL devices (no "Enable Now" required)
    let cancelled = false;
    const loadFeed = async () => {
      const items = await fetchLiveNotificationFeed();
      if (cancelled || items.length === 0) return;
      setLiveNotifications(items);

      const currentRead = getReadNotificationIds();
      setReadNotificationIds(currentRead);

      const firstUnread = items.find(
        (item) => !currentRead.has(item.id) && !isToastDismissed(item.id)
      );
      if (firstUnread) {
        setActiveToastFeedId(firstUnread.id);
        setForegroundPush((prev) =>
          prev
            ? prev
            : {
                title: firstUnread.title,
                body: firstUnread.body,
                url: firstUnread.targetUrl,
                notificationType: firstUnread.notificationType,
              }
        );
      }
    };

    const initialTimer = window.setTimeout(() => {
      void loadFeed();
    }, 1200);

    const refreshInterval = window.setInterval(() => {
      if (!document.hidden) {
        void loadFeed();
      }
    }, 5 * 60 * 1000);

    return () => {
      cancelled = true;
      window.clearTimeout(initialTimer);
      window.clearInterval(refreshInterval);
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.removeEventListener('message', handleSwMessage);
      }
      if (unsubFcm) unsubFcm();
    };
  }, []);

  useEffect(() => {
    if (!foregroundPush) return;
    const autoHide = window.setTimeout(() => {
      if (activeToastFeedId) {
        dismissToastId(activeToastFeedId);
        setActiveToastFeedId(null);
      }
      setForegroundPush(null);
    }, 9000);
    return () => window.clearTimeout(autoHide);
  }, [foregroundPush, activeToastFeedId]);

  useEffect(() => {
    applyPageSeo(currentPage);
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
      case 'admin-notifications':
        return <AdminNotificationsPage />;
      default:
        return <HomePage onNavigate={handleNavigate} onSelectProject={(p) => setSelectedProject(p)} />;
    }
  };

  return (
    <ErrorBoundary>
      <SmoothLenis>
        <div className="min-h-screen bg-[#080D1B] text-[#F8FAFC] font-sans relative overflow-x-clip selection:bg-[#3B82F6]/30 selection:text-[#F8FAFC]">
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

          <AnnouncementBanner />

          <Navbar
            currentPage={currentPage}
            onNavigate={handleNavigate}
            audioEnabled={audioEnabled}
            toggleAudio={toggleAudio}
            liveNotifications={liveNotifications}
            readNotificationIds={readNotificationIds}
            onMarkNotificationRead={(id) => setReadNotificationIds(markNotificationRead(id))}
            onMarkAllNotificationsRead={() =>
              setReadNotificationIds(markAllNotificationsRead(liveNotifications.map((n) => n.id)))
            }
            onSelectLiveNotification={(item) => {
              setReadNotificationIds(markNotificationRead(item.id));
              dismissToastId(item.id);
              navigateByNotificationTarget(item.targetUrl, item.notificationType);
            }}
          />

          <main className="relative z-10 pt-4 sm:pt-6">
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

          <ForegroundPushToast
            notification={foregroundPush}
            onDismiss={() => {
              if (activeToastFeedId) {
                dismissToastId(activeToastFeedId);
                setActiveToastFeedId(null);
              }
              setForegroundPush(null);
            }}
            onOpen={(url, type) => {
              if (activeToastFeedId) {
                setReadNotificationIds(markNotificationRead(activeToastFeedId));
                dismissToastId(activeToastFeedId);
                setActiveToastFeedId(null);
              }
              navigateByNotificationTarget(url, type);
            }}
          />

          <Suspense fallback={null}>
            <PWAInstallModal />
          </Suspense>
        </div>
      </SmoothLenis>
    </ErrorBoundary>
  );
}
