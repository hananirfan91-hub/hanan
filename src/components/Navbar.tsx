import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PageId } from '../types';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Menu, X, Volume2, VolumeX, ArrowUpRight, ArrowLeft, Search } from 'lucide-react';
import { LiveNotificationBell } from './LiveNotificationBell';
import { LiveNotificationItem } from '../lib/liveNotifications';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  audioEnabled: boolean;
  toggleAudio: () => void;
  liveNotifications?: LiveNotificationItem[];
  readNotificationIds?: Set<string>;
  onMarkNotificationRead?: (id: string) => void;
  onMarkAllNotificationsRead?: () => void;
  onSelectLiveNotification?: (item: LiveNotificationItem) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  audioEnabled,
  toggleAudio,
  liveNotifications = [],
  readNotificationIds = new Set<string>(),
  onMarkNotificationRead = () => {},
  onMarkAllNotificationsRead = () => {},
  onSelectLiveNotification = () => {},
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { id: PageId; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'services', label: 'Services' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`sticky top-0 left-0 right-0 z-50 safe-top transition-all duration-300 ${
          scrolled
            ? 'bg-[#080D1B]/88 backdrop-blur-xl border-b border-white/[0.12] py-3 shadow-[0_8px_32px_rgba(4,8,20,0.65)]'
            : 'bg-[#080D1B]/72 backdrop-blur-lg border-b border-white/[0.08] py-4'
        }`}
      >
        <div
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />

        {/* Desktop Header (Unchanged on lg+) */}
        <div className="hidden lg:flex max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => handleNavClick('home')}
            className="group text-left flex items-center gap-3 shrink-0 cursor-pointer"
            id="nav-brand-logo"
          >
            <div className="w-10 h-10 rounded-xl overflow-hidden border border-white/[0.16] group-hover:border-[#3B82F6] transition-colors shrink-0 bg-[#0D1425]">
              <img
                src="/avatar.webp"
                alt="Hanan Irfan portrait"
                width={40}
                height={40}
                loading="eager"
                decoding="async"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.src.endsWith('/avatar.jpg')) {
                    target.src = '/avatar.jpg';
                  }
                }}
                className="w-full h-full object-cover aspect-square"
              />
            </div>
            <div>
              <span className="font-display font-extrabold text-lg sm:text-xl tracking-tight text-[#F8FAFC] group-hover:text-[#3B82F6] transition-colors block leading-none whitespace-nowrap">
                {PERSONAL_INFO.name}
              </span>
              <span className="text-[11px] font-mono text-[#94A3B8] block mt-0.5 whitespace-nowrap">
                Developer &amp; SEO Specialist
              </span>
            </div>
          </button>

          <nav aria-label="Primary navigation" className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  id={`nav-link-${item.id}`}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'text-[#F8FAFC]'
                      : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/[0.06]'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="navbar-active-tab"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      className="absolute inset-0 rounded-xl bg-[#3B82F6] shadow-[0_0_20px_rgba(59,130,246,0.35)] -z-10"
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-2.5 shrink-0">
            <LiveNotificationBell
              items={liveNotifications}
              readIds={readNotificationIds}
              onMarkRead={onMarkNotificationRead}
              onMarkAllRead={onMarkAllNotificationsRead}
              onSelectNotification={onSelectLiveNotification}
            />

            <motion.button
              type="button"
              whileTap={{ scale: 0.94 }}
              onClick={toggleAudio}
              className="p-2.5 rounded-xl bg-white/[0.05] border border-white/[0.12] text-[#94A3B8] hover:text-[#F8FAFC] hover:border-[#3B82F6]/50 transition-colors cursor-pointer"
              title={audioEnabled ? 'Mute background music' : 'Play background music'}
              aria-label={audioEnabled ? 'Mute background music' : 'Play background music'}
              id="btn-audio-toggle"
            >
              {audioEnabled ? (
                <Volume2 className="w-4 h-4 text-[#3B82F6]" />
              ) : (
                <VolumeX className="w-4 h-4 text-[#94A3B8]" />
              )}
            </motion.button>

            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleNavClick('contact')}
              id="btn-nav-contact"
              className="rounded-xl px-4 py-2.5 text-xs font-bold bg-[#3B82F6] hover:bg-[#2563EB] text-[#F8FAFC] shadow-[0_0_24px_rgba(59,130,246,0.28)] transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Connect</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </motion.button>
          </div>
        </div>

        {/* Mobile App-Style Top Bar (< lg) */}
        <div className="flex lg:hidden items-center justify-between px-4 gap-2">
          <div className="w-20 flex items-center">
            {currentPage !== 'home' ? (
              <button
                type="button"
                onClick={() => handleNavClick('home')}
                aria-label="Back to Home"
                className="p-2 rounded-xl bg-white/[0.05] border border-white/[0.12] text-[#F8FAFC] hover:border-[#3B82F6]/50 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => handleNavClick('projects')}
                aria-label="Browse Projects"
                className="p-2 rounded-xl bg-white/[0.05] border border-white/[0.12] text-[#94A3B8] hover:text-[#F8FAFC] hover:border-[#3B82F6]/50 transition-colors cursor-pointer"
              >
                <Search className="w-4 h-4" />
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2 cursor-pointer"
            aria-label="Hanan Irfan Home"
          >
            <div className="w-8 h-8 rounded-xl overflow-hidden border border-[#3B82F6]/45 bg-[#0D1425] shadow-[0_0_16px_rgba(59,130,246,0.22)]">
              <img
                src="/avatar.webp"
                alt="Hanan Irfan"
                width={32}
                height={32}
                loading="eager"
                decoding="async"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.src.endsWith('/avatar.jpg')) {
                    target.src = '/avatar.jpg';
                  }
                }}
                className="w-full h-full object-cover aspect-square"
              />
            </div>
            <span className="font-display font-black text-base tracking-tight text-[#F8FAFC]">
              {PERSONAL_INFO.primaryBrand}
            </span>
          </button>

          <div className="w-24 flex items-center justify-end gap-1.5">
            <LiveNotificationBell
              compact
              items={liveNotifications}
              readIds={readNotificationIds}
              onMarkRead={onMarkNotificationRead}
              onMarkAllRead={onMarkAllNotificationsRead}
              onSelectNotification={onSelectLiveNotification}
            />
            <button
              type="button"
              onClick={toggleAudio}
              aria-label={audioEnabled ? 'Mute background music' : 'Play background music'}
              className="p-2 rounded-xl bg-white/[0.05] border border-white/[0.12] text-[#F8FAFC] cursor-pointer"
            >
              {audioEnabled ? <Volume2 className="w-4 h-4 text-[#3B82F6]" /> : <VolumeX className="w-4 h-4 text-[#94A3B8]" />}
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="btn-mobile-menu-toggle"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              className="p-2 rounded-xl bg-white/[0.05] border border-white/[0.12] text-[#F8FAFC] hover:bg-white/[0.1] transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] safe-top bg-[#080D1B]/95 backdrop-blur-2xl pt-4 pb-24 px-6 flex flex-col justify-between overflow-y-auto lg:hidden"
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.1]">
                <span className="font-display font-black text-base tracking-tight text-[#F8FAFC]">
                  {PERSONAL_INFO.primaryBrand}
                </span>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close navigation menu"
                  className="p-2 rounded-xl bg-white/[0.05] border border-white/[0.12] text-[#F8FAFC] hover:bg-white/[0.1] transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div>
                <p className="text-[11px] font-mono uppercase tracking-wider text-[#94A3B8] mb-3">
                  More Pages
                </p>
                <div className="flex flex-col divide-y divide-white/[0.08]">
                  {(
                    [
                      { id: 'experience', label: 'Experience' },
                      { id: 'services', label: 'Services' },
                    ] as { id: PageId; label: string }[]
                  ).map((item) => {
                    const isActive = currentPage === item.id;
                    return (
                      <button
                        type="button"
                        key={item.id}
                        onClick={() => handleNavClick(item.id)}
                        className={`text-left text-lg font-display font-bold py-3.5 transition-colors flex items-center justify-between cursor-pointer ${
                          isActive ? 'text-[#3B82F6]' : 'text-[#F8FAFC] hover:text-[#3B82F6]'
                        }`}
                      >
                        <span>{item.label}</span>
                        <ArrowUpRight className="w-4 h-4 text-[#94A3B8]" />
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <p className="text-[11px] font-mono uppercase tracking-wider text-[#94A3B8] mb-2">
                  Specialties &amp; Legal
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {(
                    [
                      { id: 'web-development', label: 'Web Development' },
                      { id: 'seo-expert', label: 'SEO & AEO' },
                      { id: 'graphic-design', label: 'UI & Design' },
                      { id: 'privacy-policy', label: 'Privacy Policy' },
                      { id: 'terms-and-conditions', label: 'Terms' },
                      { id: 'disclaimer', label: 'Disclaimer' },
                    ] as { id: PageId; label: string }[]
                  ).map((sub) => {
                    const isSubActive = currentPage === sub.id;
                    return (
                      <button
                        type="button"
                        key={sub.id}
                        onClick={() => handleNavClick(sub.id)}
                        className={`text-left px-3 py-2.5 rounded-xl border font-medium transition-colors cursor-pointer ${
                          isSubActive
                            ? 'bg-[#3B82F6]/15 border-[#3B82F6]/50 text-[#3B82F6]'
                            : 'bg-white/[0.05] border-white/[0.12] text-[#F8FAFC] hover:border-[#3B82F6]/50'
                        }`}
                      >
                        {sub.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/[0.1]">
              <p className="text-center text-xs text-[#94A3B8] font-mono">
                {PERSONAL_INFO.location} &bull; {PERSONAL_INFO.education.semester}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
