import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Download, X, Smartphone, CheckCircle2, Share, Monitor } from 'lucide-react';
import { usePWAInstall } from '../lib/usePWAInstall';
import { getSafeSessionItem, setSafeSessionItem } from '../lib/safeStorage';

export const PWAInstallModal: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, isWebView, install } = usePWAInstall();
  const [isOpen, setIsOpen] = useState(false);
  const [showManualInstructions, setShowManualInstructions] = useState<'ios' | 'browser' | null>(null);
  const [installSuccess, setInstallSuccess] = useState(false);

  useEffect(() => {
    // Do not show browser install prompts inside native Android WebView wrappers
    if (isInstalled || isWebView) return;

    const hasDismissed = getSafeSessionItem('hi_pwa_dismissed');
    if (hasDismissed) return;

    const timer = setTimeout(() => {
      const isStandalone =
        window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as unknown as { standalone?: boolean }).standalone === true;
      if (!isStandalone) {
        setIsOpen(true);
      }
    }, 10000);

    return () => clearTimeout(timer);
  }, [isInstalled, isWebView]);

  const handleClose = () => {
    setIsOpen(false);
    setShowManualInstructions(null);
    setSafeSessionItem('hi_pwa_dismissed', 'true');
  };

  const handleInstallClick = async () => {
    if (isInstallable) {
      const success = await install();
      if (success) {
        setInstallSuccess(true);
        setSafeSessionItem('hi_pwa_dismissed', 'true');
        setTimeout(() => {
          setIsOpen(false);
        }, 1800);
      }
    } else if (isIOS) {
      setShowManualInstructions('ios');
    } else {
      setShowManualInstructions('browser');
    }
  };

  if (isInstalled || isWebView || !isOpen) {
    return null;
  }

  return (
    <AnimatePresence>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="pwa-modal-title"
        className="fixed inset-0 z-[9990] flex items-end sm:items-center justify-center p-4 sm:p-6 pointer-events-none"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-[#040712]/70 backdrop-blur-sm pointer-events-auto"
        />

        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.97 }}
          transition={{ type: 'spring', damping: 28, stiffness: 320 }}
          className="relative w-full max-w-md bg-[#0D1425]/92 backdrop-blur-2xl border border-white/[0.14] rounded-3xl p-6 shadow-[0_24px_60px_rgba(4,8,20,0.85),0_0_32px_rgba(59,130,246,0.16)] pointer-events-auto z-10 text-[#F8FAFC]"
        >
          <button
            type="button"
            onClick={handleClose}
            aria-label="Dismiss install prompt"
            className="absolute top-4 right-4 p-2 rounded-xl text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/[0.08] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          {installSuccess ? (
            <div className="py-5 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 id="pwa-modal-title" className="text-lg font-bold font-display text-[#F8FAFC]">
                App Added to Device
              </h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                You can now open Hanan Irfan Portfolio directly from your home screen or app launcher.
              </p>
            </div>
          ) : showManualInstructions === 'ios' ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3 pr-8">
                <div className="w-10 h-10 rounded-xl bg-[#3B82F6]/15 border border-[#3B82F6]/35 flex items-center justify-center text-[#3B82F6] shrink-0">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <h3 id="pwa-modal-title" className="text-base font-bold font-display text-[#F8FAFC]">
                    Install on iPhone or iPad
                  </h3>
                  <p className="text-xs text-[#94A3B8]">Safari quick setup</p>
                </div>
              </div>

              <ol className="space-y-2.5 text-xs text-[#94A3B8] bg-white/[0.04] p-4 rounded-2xl border border-white/[0.1]">
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#3B82F6]/20 text-[#3B82F6] flex items-center justify-center text-[11px] font-bold shrink-0">
                    1
                  </span>
                  <span>
                    Tap the <strong className="text-[#F8FAFC]">Share</strong> button{' '}
                    <Share className="w-3.5 h-3.5 inline mx-0.5 text-[#3B82F6]" /> in Safari.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#3B82F6]/20 text-[#3B82F6] flex items-center justify-center text-[11px] font-bold shrink-0">
                    2
                  </span>
                  <span>
                    Scroll down and tap <strong className="text-[#F8FAFC]">Add to Home Screen</strong>.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#3B82F6]/20 text-[#3B82F6] flex items-center justify-center text-[11px] font-bold shrink-0">
                    3
                  </span>
                  <span>
                    Tap <strong className="text-[#F8FAFC]">Add</strong> in the top-right corner.
                  </span>
                </li>
              </ol>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowManualInstructions(null)}
                  className="flex-1 py-2.5 rounded-xl bg-[#3B82F6] hover:bg-[#2563EB] text-[#F8FAFC] font-semibold text-xs transition-colors cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-[#94A3B8] hover:text-[#F8FAFC] text-xs font-semibold transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          ) : showManualInstructions === 'browser' ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3 pr-8">
                <div className="w-10 h-10 rounded-xl bg-[#3B82F6]/15 border border-[#3B82F6]/35 flex items-center justify-center text-[#3B82F6] shrink-0">
                  <Monitor className="w-5 h-5" />
                </div>
                <div>
                  <h3 id="pwa-modal-title" className="text-base font-bold font-display text-[#F8FAFC]">
                    Install via Browser Menu
                  </h3>
                  <p className="text-xs text-[#94A3B8]">Chrome, Edge, or Android browser</p>
                </div>
              </div>

              <div className="space-y-2 text-xs text-[#94A3B8] bg-white/[0.04] p-4 rounded-2xl border border-white/[0.1] leading-relaxed">
                <p>
                  Your current browser session did not surface a one-tap install dialog automatically.
                </p>
                <p>
                  Look for the <strong className="text-[#F8FAFC]">Install app</strong> icon in the address bar, or open the browser menu and choose{' '}
                  <strong className="text-[#F8FAFC]">Install app</strong> or{' '}
                  <strong className="text-[#F8FAFC]">Add to Home screen</strong>.
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowManualInstructions(null)}
                  className="flex-1 py-2.5 rounded-xl bg-[#3B82F6] hover:bg-[#2563EB] text-[#F8FAFC] font-semibold text-xs transition-colors cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-[#94A3B8] hover:text-[#F8FAFC] text-xs font-semibold transition-colors cursor-pointer"
                >
                  Got It
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-3 pr-8">
                <img
                  src="/pwa-192x192.png"
                  alt="Hanan Irfan Portfolio App Icon"
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-2xl border border-white/[0.15] object-cover shrink-0 bg-[#080D1B]"
                />
                <div>
                  <span className="text-[11px] font-mono font-semibold text-[#3B82F6] block">
                    Web App Shortcut
                  </span>
                  <h3 id="pwa-modal-title" className="text-lg font-extrabold font-display text-[#F8FAFC] mt-0.5">
                    Install Hanan Irfan Portfolio
                  </h3>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                Save this portfolio to your home screen or desktop for quick launch, standalone navigation, and offline access to cached pages.
              </p>

              <div className="flex items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={handleInstallClick}
                  className="flex-1 py-3 px-4 rounded-xl bg-[#3B82F6] hover:bg-[#2563EB] text-[#F8FAFC] font-semibold text-xs tracking-wide transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>{isInstallable ? 'Install Web App' : 'How to Install'}</span>
                </button>
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-[#94A3B8] hover:text-[#F8FAFC] text-xs font-semibold transition-colors cursor-pointer"
                >
                  Not Now
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
