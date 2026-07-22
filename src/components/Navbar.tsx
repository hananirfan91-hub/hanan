import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PageId } from '../types';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Menu, X, Volume2, VolumeX, Sparkles, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  audioEnabled: boolean;
  toggleAudio: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  audioEnabled,
  toggleAudio
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { id: PageId; label: string }[] = [
    { id: 'home', label: 'HOME' },
    { id: 'about', label: 'ABOUT' },
    { id: 'skills', label: 'SKILLS' },
    { id: 'experience', label: 'EXPERIENCE' },
    { id: 'projects', label: 'PROJECTS' },
    { id: 'services', label: 'SERVICES' },
    { id: 'contact', label: 'CONTACT' }
  ];

  const handleNavClick = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#07080c]/85 backdrop-blur-xl border-b border-white/10 py-3 shadow-2xl shadow-purple-950/20'
            : 'bg-transparent py-5'
        }`}
      >
        {/* Scroll Progress Bar Indicator */}
        <div
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-purple-500 via-indigo-400 to-cyan-400 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="group text-left focus:outline-none flex items-center gap-3"
            id="nav-brand-logo"
          >
            <div className="w-10 h-10 rounded-xl overflow-hidden border border-purple-500/40 shadow-lg shadow-purple-600/30 group-hover:scale-105 transition-all">
              <img
                src="/hanan-irfan.jpg"
                alt="Hanan Irfan Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="font-display font-black text-2xl tracking-wider text-white group-hover:text-purple-400 transition-colors block leading-none text-glow">
                {PERSONAL_INFO.primaryBrand}
              </span>
              <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400 group-hover:text-purple-300 transition-colors">
                Hanan Irfan
              </span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1.5 glass-card rounded-full px-4 py-1.5 border border-white/10">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  id={`nav-link-${item.id}`}
                  className={`relative px-4 py-1.5 rounded-full text-xs font-bold tracking-wider transition-all duration-300 ${
                    isActive
                      ? 'text-white'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-white/5'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full z-[-1] shadow-lg shadow-purple-600/40"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Audio Toggle */}
            <button
              onClick={toggleAudio}
              className="p-2.5 rounded-xl glass-card border border-white/10 text-slate-300 hover:text-purple-400 hover:border-purple-500/40 transition-all text-xs flex items-center gap-1.5"
              title={audioEnabled ? 'Mute Ambient Audio' : 'Enable Ambient Sound'}
              id="btn-audio-toggle"
            >
              {audioEnabled ? (
                <>
                  <Volume2 className="w-4 h-4 text-purple-400 animate-pulse" />
                  <span className="text-[10px] font-mono text-purple-300 hidden md:inline">AUDIO ON</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4 text-slate-400" />
                  <span className="text-[10px] font-mono text-slate-500 hidden md:inline">SOUND</span>
                </>
              )}
            </button>

            {/* Let's Work Together CTA */}
            <button
              onClick={() => handleNavClick('contact')}
              id="btn-nav-contact"
              className="relative group overflow-hidden rounded-xl px-5 py-2.5 text-xs font-extrabold tracking-wider bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 text-white shadow-xl shadow-purple-600/25 hover:shadow-purple-600/40 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>LET'S WORK TOGETHER</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={toggleAudio}
              className="p-2 rounded-lg glass-card text-slate-300"
            >
              {audioEnabled ? <Volume2 className="w-4 h-4 text-purple-400" /> : <VolumeX className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="btn-mobile-menu-toggle"
              className="p-2.5 rounded-xl glass-card border border-white/10 text-white hover:text-purple-400 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#07080c]/98 backdrop-blur-2xl flex flex-col justify-between p-6 pt-28 lg:hidden"
          >
            <div className="flex flex-col gap-3">
              <span className="text-xs font-mono text-purple-400 tracking-widest uppercase mb-2">
                // NAVIGATION MENU
              </span>
              {navItems.map((item, idx) => {
                const isActive = currentPage === item.id;
                return (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => handleNavClick(item.id)}
                    className={`text-left text-2xl font-display font-black tracking-wider py-2 transition-all flex items-center justify-between border-b border-white/5 ${
                      isActive ? 'text-purple-400 pl-3 border-purple-500/40' : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className="text-xs font-mono text-slate-500">0{idx + 1}</span>
                  </motion.button>
                );
              })}
            </div>

            <div className="mt-8 space-y-4">
              <button
                onClick={() => handleNavClick('contact')}
                className="w-full py-4 rounded-xl font-display font-extrabold text-sm tracking-wider bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-xl shadow-purple-600/30 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" /> START A PROJECT
              </button>
              <div className="text-center text-xs text-slate-400 font-mono">
                Rahim Yar Khan, Punjab, Pakistan
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
