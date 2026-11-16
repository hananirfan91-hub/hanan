import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Project } from '../types';
import { ExternalLink, ChevronLeft, ChevronRight, ArrowUpRight, MoveHorizontal } from 'lucide-react';

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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCardWidth(Math.min(340, window.innerWidth * 0.84));
      } else {
        setCardWidth(410);
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

  const handleDragEnd = (_: unknown, info: { offset: { x: number }; velocity: { x: number } }) => {
    const threshold = 50;
    if (info.offset.x < -threshold || info.velocity.x < -300) {
      nextSlide();
    } else if (info.offset.x > threshold || info.velocity.x > 300) {
      prevSlide();
    }
  };

  return (
    <div className="relative py-4 overflow-hidden select-none" ref={containerRef}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-bold text-[#3B82F6]">
            Project {activeIndex + 1} of {projects.length}
          </span>
          <span aria-hidden="true" className="hidden sm:inline text-[#94A3B8]/50">&middot;</span>
          <div className="hidden sm:flex items-center gap-1.5 text-xs font-mono text-[#94A3B8]">
            <MoveHorizontal className="w-3.5 h-3.5 text-[#3B82F6]" />
            <span>Drag, swipe, or tap card to explore</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={prevSlide}
            className="p-2.5 rounded-xl bg-white/[0.05] border border-white/[0.12] text-[#94A3B8] hover:text-[#F8FAFC] hover:border-[#3B82F6]/50 transition-colors cursor-pointer"
            aria-label="Previous Project"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={nextSlide}
            className="p-2.5 rounded-xl bg-white/[0.05] border border-white/[0.12] text-[#94A3B8] hover:text-[#F8FAFC] hover:border-[#3B82F6]/50 transition-colors cursor-pointer"
            aria-label="Next Project"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="perspective-1200 py-4 min-h-[430px] flex items-center justify-center relative">
        <motion.div
          className="flex items-center gap-6 cursor-grab active:cursor-grabbing touch-pan-y"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.18}
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

            const rotateY = Math.max(-20, Math.min(20, distance * -10));
            const scale = isCenter ? 1 : Math.max(0.88, 1 - Math.abs(distance) * 0.06);
            const opacity = isCenter ? 1 : Math.max(0.55, 1 - Math.abs(distance) * 0.25);
            const translateZ = isCenter ? 32 : -Math.abs(distance) * 48;

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
                itemScope={project.seoTitle ? true : undefined}
                itemType={project.seoTitle ? 'https://schema.org/CreativeWork' : undefined}
                className={`shrink-0 rounded-3xl p-6 border backdrop-blur-xl transition-all duration-300 ${
                  isCenter
                    ? 'bg-white/[0.06] border-[#3B82F6]/45 shadow-[0_20px_48px_rgba(4,8,20,0.8),0_0_32px_rgba(59,130,246,0.18)]'
                    : 'bg-white/[0.04] border-white/[0.12] hover:border-[#3B82F6]/35'
                }`}
              >
                {project.seoTitle && <meta itemProp="name" content={project.seoTitle} />}
                {project.seoDescription && <meta itemProp="description" content={project.seoDescription} />}
                {project.seoTitle && <link itemProp="url" href={project.url} />}

                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2 text-xs font-mono">
                    <span className="text-[#3B82F6] font-bold">Project {project.number}</span>
                    <span className="text-[#94A3B8] truncate">{project.category}</span>
                  </div>

                  {project.image && (
                    <div
                      className={`h-40 rounded-2xl overflow-hidden border border-white/[0.12] relative group/img ${
                        project.preserveAspectRatio
                          ? 'bg-[#080D1B] flex items-center justify-center p-3'
                          : 'bg-[#080D1B]'
                      }`}
                    >
                      <img
                        src={project.image}
                        alt={project.imageAlt || project.title}
                        title={project.seoTitle || undefined}
                        width={project.preserveAspectRatio ? 1254 : 420}
                        height={project.preserveAspectRatio ? 1254 : 236}
                        loading="lazy"
                        decoding="async"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          const fallback = project.fallbackImage || '/nexapos.webp';
                          if (!e.currentTarget.src.endsWith(fallback)) {
                            e.currentTarget.src = fallback;
                          }
                        }}
                        className={
                          project.preserveAspectRatio
                            ? 'w-full h-full object-contain group-hover/img:scale-105 transition-transform duration-500 aspect-square'
                            : 'w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500 aspect-video'
                        }
                      />
                    </div>
                  )}

                  <h3 className="text-xl font-bold font-display text-[#F8FAFC] hover:text-[#3B82F6] transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-[#94A3B8] text-xs sm:text-sm line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.technologies.slice(0, 4).map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.1] text-[#94A3B8]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-5 border-t border-white/[0.1] flex items-center justify-between gap-3 mt-5">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectProject(project);
                    }}
                    className="px-4 py-2 rounded-xl bg-[#3B82F6] hover:bg-[#2563EB] text-[#F8FAFC] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Explore Details</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-2.5 rounded-xl bg-white/[0.05] border border-white/[0.12] text-[#94A3B8] hover:text-[#3B82F6] hover:border-[#3B82F6]/45 transition-colors"
                    aria-label={`Open ${project.title} live site`}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <div className="flex items-center justify-center gap-2 mt-4">
        {projects.map((p, idx) => (
          <button
            type="button"
            key={p.id}
            onClick={() => setActiveIndex(idx)}
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
              activeIndex === idx ? 'w-8 bg-[#3B82F6]' : 'w-2 bg-white/[0.2] hover:bg-white/[0.35]'
            }`}
            aria-label={`Go to project ${idx + 1}: ${p.title}`}
          />
        ))}
      </div>
    </div>
  );
};
