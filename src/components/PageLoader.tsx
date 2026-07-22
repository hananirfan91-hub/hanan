import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Code, Terminal, Cpu } from 'lucide-react';

interface PageLoaderProps {
  onComplete?: () => void;
}

export const PageLoader: React.FC<PageLoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('INITIALIZING ENGINE...');
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check if session already loaded to avoid spamming user
    const hasLoaded = sessionStorage.getItem('hi_loader_shown');
    if (hasLoaded) {
      setIsVisible(false);
      if (onComplete) onComplete();
      return;
    }

    const textSequence = [
      { p: 15, text: 'LOADING PORTFOLIO CORE...' },
      { p: 40, text: 'INITIALIZING THREE/PARTICLE ENGINE...' },
      { p: 65, text: 'COMPILING FULL-STACK SERVICES...' },
      { p: 85, text: 'INDEXING SEO & KEYWORD ARCHITECTURE...' },
      { p: 100, text: 'HANAN IRFAN // READY' }
    ];

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 3;
        const currentMsg = textSequence.find(t => next <= t.p)?.text;
        if (currentMsg) setLoadingText(currentMsg);

        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsVisible(false);
            sessionStorage.setItem('hi_loader_shown', 'true');
            if (onComplete) onComplete();
          }, 400);
          return 100;
        }
        return next;
      });
    }, 30);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -40, filter: 'blur(10px)' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] bg-[#05060a] flex flex-col items-center justify-between p-8 sm:p-12 text-white overflow-hidden selection:bg-none select-none"
        >
          {/* Top subtle bar */}
          <div className="w-full max-w-7xl flex items-center justify-between text-xs font-mono text-slate-500 border-b border-white/5 pb-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>HANAN IRFAN // PORTFOLIO V2026</span>
            </div>
            <span>RAHIM YAR KHAN, PAKISTAN</span>
          </div>

          {/* Central Logo and Progress */}
          <div className="flex flex-col items-center justify-center space-y-8 my-auto text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-tr from-purple-600/30 via-indigo-600/20 to-cyan-500/30 border border-purple-500/40 p-0.5 shadow-2xl shadow-purple-600/20 flex items-center justify-center relative group">
                <div className="w-full h-full bg-[#080a12] rounded-[22px] flex items-center justify-center">
                  <span className="text-3xl sm:text-4xl font-black font-display tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-300 to-cyan-300">
                    HI
                  </span>
                </div>
              </div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                className="absolute -inset-2 border border-dashed border-purple-500/20 rounded-full pointer-events-none"
              />
            </motion.div>

            <div className="space-y-3 max-w-md w-full">
              <h1 className="text-2xl sm:text-3xl font-black font-display tracking-wide text-white">
                HANAN IRFAN
              </h1>
              <p className="text-xs font-mono text-purple-400 uppercase tracking-widest min-h-[1.5rem]">
                {loadingText}
              </p>
            </div>

            {/* Percentage Bar */}
            <div className="w-64 sm:w-80 space-y-2">
              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden p-0.5 border border-white/5">
                <motion.div
                  className="h-full bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span>SYSTEM INIT</span>
                <span className="font-bold text-white">{progress}%</span>
              </div>
            </div>
          </div>

          {/* Bottom stats footer */}
          <div className="w-full max-w-7xl flex items-center justify-between text-[11px] font-mono text-slate-600 border-t border-white/5 pt-4">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Terminal className="w-3 h-3 text-purple-400" />
                <span>FULL-STACK</span>
              </span>
              <span className="flex items-center gap-1">
                <Cpu className="w-3 h-3 text-cyan-400" />
                <span>TECHNICAL SEO</span>
              </span>
            </div>
            <span>KFUEIT CS STUDENT</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
