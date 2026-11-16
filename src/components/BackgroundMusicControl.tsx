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
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
      aria-pressed={isPlaying}
      title={isPlaying ? 'Pause ambient music' : 'Play ambient music'}
      className={`fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-30 safe-bottom rounded-full px-3.5 py-2 flex items-center gap-2.5 transition-all duration-200 cursor-pointer border backdrop-blur-xl ${
        isPlaying
          ? 'bg-[#3B82F6]/20 border-[#3B82F6]/50 text-[#F8FAFC] shadow-[0_0_24px_rgba(59,130,246,0.28)]'
          : 'bg-white/[0.06] border-white/[0.14] text-[#94A3B8] hover:border-[#3B82F6]/45 hover:text-[#F8FAFC] shadow-lg'
      }`}
    >
      <span
        className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
          isPlaying ? 'bg-[#3B82F6] text-[#F8FAFC]' : 'bg-white/[0.08] text-[#94A3B8]'
        }`}
      >
        {isPlaying ? <Music className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
      </span>

      <span className="hidden sm:inline text-[11px] font-mono font-semibold tracking-wide uppercase">
        {isPlaying ? 'Music On' : 'Soundtrack'}
      </span>
    </motion.button>
  );
};
