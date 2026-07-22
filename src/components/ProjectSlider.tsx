import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Project } from '../types';
import { ChevronLeft, ChevronRight, ExternalLink, Sparkles, ArrowUpRight } from 'lucide-react';

interface ProjectSliderProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

export const ProjectSlider: React.FC<ProjectSliderProps> = ({ projects, onSelectProject }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  useEffect(() => {
    if (isPaused || projects.length <= 1) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex, isPaused, projects.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    touchStartX.current = null;
  };

  if (!projects || projects.length === 0) return null;

  const currentProject = projects[currentIndex];

  return (
    <div
      className="relative glass-card rounded-3xl border border-purple-500/30 bg-[#090b14] overflow-hidden p-6 sm:p-10"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Header controls */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-extrabold text-purple-400 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20">
            SLIDER — {currentIndex + 1} OF {projects.length}
          </span>
          <span className="text-xs font-mono text-cyan-400 hidden sm:inline-block">
            {currentProject.category}
          </span>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={prevSlide}
            className="p-2.5 rounded-xl glass-card border border-white/10 text-slate-300 hover:text-white hover:border-purple-500/40 transition-all focus:outline-none"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={nextSlide}
            className="p-2.5 rounded-xl glass-card border border-white/10 text-slate-300 hover:text-white hover:border-purple-500/40 transition-all focus:outline-none"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Slide Content with AnimatePresence */}
      <div className="min-h-[280px] sm:min-h-[240px] flex flex-col justify-between">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentProject.id}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-2xl sm:text-4xl font-extrabold font-display text-white hover:text-purple-300 transition-colors cursor-pointer"
                  onClick={() => onSelectProject(currentProject)}>
                {currentProject.title}
              </h3>
              <span className="text-xs font-mono text-purple-400 font-bold">
                {currentProject.number}
              </span>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {currentProject.description}
            </p>

            {/* Tech Badges */}
            <div className="flex flex-wrap gap-2 pt-2">
              {currentProject.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="text-xs font-mono px-3 py-1 rounded-xl bg-purple-950/40 border border-purple-500/30 text-purple-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Action Controls & Pagination */}
        <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 mt-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onSelectProject(currentProject)}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-display font-bold text-xs tracking-wider shadow-lg shadow-purple-600/30 hover:scale-105 transition-all flex items-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>EXPLORE DETAILS</span>
            </button>
            <a
              href={currentProject.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl glass-card text-slate-300 hover:text-white text-xs font-mono flex items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>LIVE SITE</span>
            </a>
          </div>

          {/* Dots Pagination */}
          <div className="flex items-center gap-1.5">
            {projects.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === idx
                    ? 'w-8 bg-purple-400 shadow-md shadow-purple-500/50'
                    : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
