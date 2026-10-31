import React from 'react';
import { motion } from 'motion/react';
import { Music, VolumeX } from 'lucide-react';

interface BackgroundMusicControlProps {
  isPlaying: boolean;
  onToggle: () => void;
  disabled?: boolean;
}

export const BackgroundMusicControl: React.FC<BackgroundMusicControlProps> = ({
  isPlaying,
  onToggle,
  disabled = false,
}) => {
  if (disabled) return null;

  return (
    <motion.button
      type="button"
      data-music-control="true"
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
      aria-pressed={isPlaying}
      title={isPlaying ? 'Pause background music' : 'Play background music'}
      className={`fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-30 glass-card rounded-full px-3.5 py-2.5 sm:px-4 sm:py-2.5 flex items-center gap-2.5 transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 ${
        isPlaying
          ? 'border-purple-500/50 bg-[#0c0f1e]/90 text-white shadow-xl shadow-purple-600/25 hover:border-purple-400'
          : 'border-white/15 bg-[#090b14]/85 text-slate-400 hover:text-white hover:border-purple-500/40 shadow-lg shadow-black/40'
      }`}
    >
      <span
        className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
          isPlaying
            ? 'bg-gradient-to-tr from-purple-600/40 to-cyan-500/30 border border-purple-400/40 text-purple-200'
            : 'bg-white/5 border border-white/10 text-slate-400'
        }`}
      >
        {isPlaying ? (
          <Music className="w-3.5 h-3.5 text-purple-300" />
        ) : (
          <VolumeX className="w-3.5 h-3.5 text-slate-400" />
        )}
      </span>

      {/* Subtle Soundwave Indicator */}
      <span className="flex items-end gap-0.5 h-3.5" aria-hidden="true">
        {[0, 1, 2].map((bar) => (
          <motion.span
            key={bar}
            animate={
              isPlaying
                ? {
                    height: bar === 1 ? ['5px', '14px', '6px'] : ['11px', '4px', '12px'],
                  }
                : { height: '4px' }
            }
            transition={
              isPlaying
                ? {
                    duration: 0.75 + bar * 0.15,
                    repeat: Infinity,
                    repeatType: 'mirror',
                    ease: 'easeInOut',
                  }
                : { duration: 0.2 }
            }
            className={`w-0.5 rounded-full transition-colors ${
              isPlaying
                ? bar === 1
                  ? 'bg-cyan-400'
                  : 'bg-purple-400'
                : 'bg-slate-600'
            }`}
          />
        ))}
      </span>

      <span
        className={`hidden sm:inline text-[10px] font-mono font-bold tracking-wider uppercase ${
          isPlaying ? 'text-purple-200' : 'text-slate-400'
        }`}
      >
        {isPlaying ? 'MUSIC ON' : 'MUSIC PAUSED'}
      </span>
    </motion.button>
  );
};
