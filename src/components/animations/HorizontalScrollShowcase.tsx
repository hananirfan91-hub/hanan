import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Project } from '../../types';
import { Sparkles, ExternalLink, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface HorizontalScrollShowcaseProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

export const HorizontalScrollShowcase: React.FC<HorizontalScrollShowcaseProps> = ({
  projects,
  onSelectProject,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !triggerRef.current || projects.length === 0) return;

    const ctx = gsap.context(() => {
      const scrollWidth = sectionRef.current!.scrollWidth - window.innerWidth;

      gsap.to(sectionRef.current, {
        x: -scrollWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: triggerRef.current,
          start: 'top top',
          end: () => `+=${scrollWidth + 300}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }, triggerRef);

    return () => ctx.revert();
  }, [projects]);

  return (
    <div ref={triggerRef} className="relative overflow-hidden bg-[#070912] py-12 my-16 border-y border-purple-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 flex items-center justify-between">
        <div>
          <span className="text-xs font-mono text-purple-400 uppercase tracking-widest">// PINNED HORIZONTAL GALLERY</span>
          <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-white mt-1">
            Featured Works Showcase
          </h2>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-cyan-400">
          <span>SCROLL DOWN TO EXPLORE</span>
          <ArrowRight className="w-4 h-4 animate-pulse" />
        </div>
      </div>

      <div className="flex items-center">
        <div ref={sectionRef} className="flex gap-8 px-4 sm:px-8 w-max">
          {projects.map((project) => (
            <div
              key={project.id}
              className="w-[85vw] sm:w-[420px] shrink-0 glass-card rounded-3xl p-6 sm:p-8 border border-purple-500/30 bg-[#0c0f1d] hover:border-purple-400/60 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-cyan-400 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                    {project.category}
                  </span>
                  <span className="text-xs font-mono text-purple-400 font-bold">
                    {project.number}
                  </span>
                </div>

                <h3 className="text-2xl font-bold font-display text-white group-hover:text-purple-300 transition-colors">
                  {project.title}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono px-2.5 py-0.5 rounded-lg bg-purple-950/40 border border-purple-500/20 text-purple-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 flex items-center justify-between gap-3 mt-6">
                <button
                  onClick={() => onSelectProject(project)}
                  className="px-4 py-2 rounded-xl bg-purple-600/80 hover:bg-purple-600 text-white text-xs font-bold font-display flex items-center gap-2 transition-all shadow-md shadow-purple-600/30"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>DETAILS</span>
                </button>

                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl glass-card text-slate-300 hover:text-white transition-colors"
                  aria-label="View live project"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
