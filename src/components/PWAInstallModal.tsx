import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Download, X, Sparkles, Smartphone, CheckCircle2, Share } from 'lucide-react';
import { usePWAInstall } from '../lib/usePWAInstall';

export const PWAInstallModal: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [isOpen, setIsOpen] = useState(false);
  const [showIOSInstructions, setShowIOSInstructions] = useState(false);
  const [installSuccess, setInstallSuccess] = useState(false);

  useEffect(() => {
    // If running in standalone / already installed, never show popup
    if (isInstalled) return;

    // Check if user already dismissed or interacted with install popup in this session
    const hasDismissed = sessionStorage.getItem('hi_pwa_dismissed');
    if (hasDismissed) return;

    // Trigger exactly after 10 seconds of website launch
    const timer = setTimeout(() => {
      // Re-check installed state
      const isStandalone =
        window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as unknown as { standalone?: boolean }).standalone === true;
      if (!isStandalone) {
        setIsOpen(true);
      }
    }, 10000);

    return () => clearTimeout(timer);
  }, [isInstalled]);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('hi_pwa_dismissed', 'true');
  };

  const handleInstallClick = async () => {
    if (isInstallable) {
      const success = await install();
      if (success) {
        setInstallSuccess(true);
        setTimeout(() => {
          setIsOpen(false);
        }, 1800);
      }
    } else if (isIOS) {
      setShowIOSInstructions(true);
    } else {
      // Direct user fallback for desktop browsers (e.g. Chrome/Edge address bar icon)
      setInstallSuccess(true);
      setTimeout(() => {
        setIsOpen(false);
      }, 2500);
    }
  };

  if (isInstalled || !isOpen) {
    return null;
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9990] flex items-end sm:items-center justify-center p-4 sm:p-6 pointer-events-none">
        {/* Soft Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.95 }}
          transition={{ type: 'spring', damping: 26, stiffness: 320 }}
          className="relative w-full max-w-md bg-[#0a0d18] border border-purple-500/40 rounded-3xl p-6 shadow-2xl shadow-purple-950/60 pointer-events-auto z-10 overflow-hidden"
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-purple-600/15 rounded-full blur-[70px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-cyan-500/15 rounded-full blur-[60px] pointer-events-none" />

          {/* Close button */}
          <button
            onClick={handleClose}
            aria-label="Dismiss install prompt"
            className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white glass-card hover:border-purple-500/40 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {installSuccess ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="py-6 text-center space-y-3"
            >
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold font-display text-white">App Installed!</h3>
              <p className="text-xs text-slate-300">
                You can now launch Hanan Irfan's portfolio directly from your home screen or desktop anytime.
              </p>
            </motion.div>
          ) : showIOSInstructions ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-300">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold font-display text-white">Install on iPhone / iPad</h3>
                  <p className="text-[11px] text-slate-400 font-mono">Safari Quick Setup</p>
                </div>
              </div>

              <div className="space-y-2.5 text-xs text-slate-200 bg-white/5 p-4 rounded-2xl border border-white/5">
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-300 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                    1
                  </span>
                  <span>Tap the <strong>Share</strong> button <Share className="w-3.5 h-3.5 inline mx-1 text-cyan-300" /> at the bottom of Safari.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-300 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                    2
                  </span>
                  <span>Scroll down and select <strong>Add to Home Screen</strong>.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-300 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                    3
                  </span>
                  <span>Tap <strong>Add</strong> in the top-right corner to finish.</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setShowIOSInstructions(false)}
                  className="flex-1 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-display font-bold text-xs tracking-wider transition-all text-center"
                >
                  Got It
                </button>
                <button
                  onClick={handleClose}
                  className="px-4 py-2.5 rounded-xl glass-card text-slate-300 hover:text-white text-xs font-mono"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              {/* Top Icon & Badge */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-cyan-500 p-0.5 shadow-lg shadow-purple-600/30 shrink-0">
                  <div className="w-full h-full bg-[#080a14] rounded-[14px] flex items-center justify-center">
                    <span className="text-xl font-black font-display text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-300">
                      HI
                    </span>
                  </div>
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-[10px] font-mono">
                    <Sparkles className="w-3 h-3 text-cyan-400" />
                    <span>PROGRESSIVE WEB APP</span>
                  </div>
                  <h3 className="text-lg font-extrabold font-display text-white mt-1">
                    Install Hanan Irfan's App
                  </h3>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Install this portfolio as a lightweight, fast web application on your device for instant offline access, fullscreen experience, and smooth navigation.
              </p>

              {/* Benefit tags */}
              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-slate-300">
                <div className="flex items-center gap-1.5 p-2 rounded-xl bg-white/5 border border-white/5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Instant Loading</span>
                </div>
                <div className="flex items-center gap-1.5 p-2 rounded-xl bg-white/5 border border-white/5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span>Offline Ready</span>
                </div>
                <div className="flex items-center gap-1.5 p-2 rounded-xl bg-white/5 border border-white/5">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                  <span>Zero Storage Bloat</span>
                </div>
                <div className="flex items-center gap-1.5 p-2 rounded-xl bg-white/5 border border-white/5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>Desktop & Mobile</span>
                </div>
              </div>

              {/* CTA Action Buttons */}
              <div className="flex items-center gap-3 pt-1">
                <button
                  onClick={handleInstallClick}
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-display font-extrabold text-xs tracking-wider shadow-lg shadow-purple-600/30 transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>INSTALL WEB APP</span>
                </button>
                <button
                  onClick={handleClose}
                  className="px-4 py-3 rounded-xl glass-card text-slate-400 hover:text-white text-xs font-mono transition-colors"
                >
                  Maybe Later
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
