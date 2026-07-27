import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'motion/react';
import { Project } from '../types';
import { Sparkles, ExternalLink, ChevronLeft, ChevronRight, ArrowUpRight, MoveHorizontal } from 'lucide-react';

interface Project3DCarouselProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

export const Project3DCarousel: React.FC<Project3DCarouselProps> = ({
  projects,
  onSelectProject,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState(380);

  // Measure card width dynamically for touch & desktop responsiveness
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCardWidth(window.innerWidth * 0.82);
      } else {
        setCardWidth(420);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % projects.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const handleDragEnd = (_: any, info: { offset: { x: number }; velocity: { x: number } }) => {
    const threshold = 50;
    if (info.offset.x < -threshold || info.velocity.x < -300) {
      nextSlide();
    } else if (info.offset.x > threshold || info.velocity.x > 300) {
      prevSlide();
    }
  };

  return (
    <div className="relative py-8 overflow-hidden select-none" ref={containerRef}>
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Header controls & drag indicator */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-extrabold text-purple-400 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20">
            3D CAROUSEL — {activeIndex + 1} OF {projects.length}
          </span>
          <div className="hidden sm:flex items-center gap-1.5 text-xs font-mono text-cyan-400">
            <MoveHorizontal className="w-3.5 h-3.5 animate-pulse" />
            <span>DRAG OR SWIPE</span>
          </div>
        </div>

        {/* Carousel Navigation Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={prevSlide}
            className="p-3 rounded-2xl glass-card border border-white/10 text-slate-300 hover:text-white hover:border-purple-500/50 hover:bg-purple-600/20 transition-all focus:outline-none active:scale-95"
            aria-label="Previous Project"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="p-3 rounded-2xl glass-card border border-white/10 text-slate-300 hover:text-white hover:border-purple-500/50 hover:bg-purple-600/20 transition-all focus:outline-none active:scale-95"
            aria-label="Next Project"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* 3D Perspective Stage */}
      <div className="perspective-1200 py-6 min-h-[460px] flex items-center justify-center relative">
        <motion.div
          className="flex items-center gap-6 cursor-grab active:cursor-grabbing touch-pan-y"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
          animate={{
            x: -activeIndex * (cardWidth + 24),
          }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 28,
          }}
          style={{
            transformStyle: 'preserve-3d',
          }}
        >
          {projects.map((project, index) => {
            const distance = index - activeIndex;
            const isCenter = distance === 0;

            // Calculate subtle 3D transforms based on offset distance
            const rotateY = Math.max(-25, Math.min(25, distance * -12));
            const scale = isCenter ? 1 : Math.max(0.85, 1 - Math.abs(distance) * 0.08);
            const opacity = isCenter ? 1 : Math.max(0.5, 1 - Math.abs(distance) * 0.3);
            const translateZ = isCenter ? 40 : -Math.abs(distance) * 60;

            return (
              <motion.div
                key={project.id}
                onClick={() => {
                  if (isCenter) {
                    onSelectProject(project);
                  } else {
                    setActiveIndex(index);
                  }
                }}
                animate={{
                  rotateY,
                  scale,
                  opacity,
                  z: translateZ,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 260,
                  damping: 28,
                }}
                style={{
                  width: `${cardWidth}px`,
                  transformStyle: 'preserve-3d',
                }}
                className={`shrink-0 glass-card rounded-3xl p-6 sm:p-8 border transition-colors duration-300 ${
                  isCenter
                    ? 'border-purple-500/60 bg-[#0c0f1e] shadow-2xl shadow-purple-950/50'
                    : 'border-white/10 bg-[#080a14] hover:border-purple-500/30'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-purple-400 font-extrabold px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20">
                      PROJECT {project.number}
                    </span>
                    <span className="text-xs font-mono text-cyan-400 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                      {project.category}
                    </span>
                  </div>

                  {project.image && (
                    <div className="h-36 sm:h-44 rounded-2xl overflow-hidden border border-white/10 relative group/img">
                      <img
                        src={project.image}
                        alt={project.title}
                        width={420}
                        height={236}
                        loading="lazy"
                        decoding="async"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          e.currentTarget.src = '/nexapos.jpg';
                        }}
                        className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500 aspect-video"
                      />
                    </div>
                  )}

                  <h3 className="text-2xl font-bold font-display text-white hover:text-purple-300 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-slate-300 text-xs sm:text-sm line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.technologies.slice(0, 4).map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono px-2.5 py-1 rounded-lg bg-purple-950/40 border border-purple-500/20 text-purple-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10 flex items-center justify-between gap-3 mt-6">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectProject(project);
                    }}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold font-display flex items-center gap-2 transition-all shadow-md shadow-purple-600/30"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>EXPLORE DETAILS</span>
                  </button>

                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-2.5 rounded-xl glass-card text-slate-300 hover:text-white transition-colors"
                    aria-label="View live project"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Pagination Dots Indicator */}
      <div className="flex items-center justify-center gap-2 mt-4">
        {projects.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              activeIndex === idx
                ? 'w-10 bg-purple-400 shadow-md shadow-purple-500/50'
                : 'w-2.5 bg-white/20 hover:bg-white/40'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
