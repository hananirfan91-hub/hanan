import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Project } from '../types';
import { X, ExternalLink, CheckCircle2, Sparkles, Layers } from 'lucide-react';
import { InteractiveToolsEngine } from './InteractiveToolsEngine';
import { SportsRoomImpactChart } from './SportsRoomImpactChart';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    if (!project?.seoTitle && !project?.seoDescription) return;

    const prevTitle = document.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    const prevDesc = metaDesc?.getAttribute('content') ?? null;

    if (project.seoTitle) {
      document.title = project.seoTitle;
    }
    if (project.seoDescription && metaDesc) {
      metaDesc.setAttribute('content', project.seoDescription);
    }

    return () => {
      document.title = prevTitle;
      if (prevDesc !== null && metaDesc) {
        metaDesc.setAttribute('content', prevDesc);
      }
    };
  }, [project]);

  if (!project) return null;

  const isFreeToolsHub = project.id === 'free-tools-hub';
  const isTheSportsRoom = project.id === 'the-sports-room';

  return (
    <AnimatePresence>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#040712]/75 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: 16 }}
          transition={{ type: 'spring', damping: 28, stiffness: 320 }}
          className="relative w-full max-w-4xl bg-[#0D1425]/92 backdrop-blur-2xl border border-white/[0.14] rounded-3xl p-6 sm:p-8 shadow-[0_24px_60px_rgba(4,8,20,0.85),0_0_32px_rgba(59,130,246,0.16)] z-10 max-h-[90vh] overflow-y-auto text-[#F8FAFC]"
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close project details"
            className="absolute top-5 right-5 p-2 rounded-full bg-white/[0.06] border border-white/[0.12] text-[#94A3B8] hover:bg-white/[0.12] hover:text-[#F8FAFC] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#94A3B8] mb-3 pr-10">
            <span className="text-[#3B82F6] font-bold">Project {project.number}</span>
            <span aria-hidden="true">&middot;</span>
            <span>{project.category}</span>
            <span aria-hidden="true">&middot;</span>
            <span className="text-[#8B5CF6] font-semibold">{project.status}</span>
          </div>

          <h2 id="project-modal-title" className="text-2xl sm:text-4xl font-extrabold font-display text-[#F8FAFC] tracking-tight mb-3">
            {project.title}
          </h2>

          <p className="text-[#94A3B8] text-sm sm:text-base leading-relaxed mb-6">
            {project.description}
          </p>

          {project.image && (
            <div
              className={`mb-6 rounded-2xl overflow-hidden border border-white/[0.12] ${
                project.preserveAspectRatio
                  ? 'max-h-80 sm:max-h-96 bg-[#080D1B] flex items-center justify-center p-4'
                  : 'max-h-64 sm:max-h-80 bg-[#080D1B]'
              }`}
            >
              <img
                src={project.image}
                alt={project.imageAlt || project.title}
                title={project.seoTitle || undefined}
                width={project.preserveAspectRatio ? 1254 : 800}
                height={project.preserveAspectRatio ? 1254 : 450}
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
                    ? 'w-full max-h-72 sm:max-h-88 object-contain aspect-square'
                    : 'w-full h-full object-cover aspect-video'
                }
              />
            </div>
          )}

          <div className="mb-8">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#3B82F6] hover:bg-[#2563EB] text-[#F8FAFC] font-semibold text-sm shadow-[0_0_24px_rgba(59,130,246,0.28)] transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Visit Live Project ({project.url.replace(/^https?:\/\//, '').replace(/\/$/, '')})</span>
            </a>
          </div>

          {isFreeToolsHub && <InteractiveToolsEngine />}

          {isTheSportsRoom && <SportsRoomImpactChart />}

          <div className="mb-8">
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#F8FAFC] font-bold mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#3B82F6]" /> Key Features &amp; Highlights
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {project.features.map((feat, i) => (
                <div key={i} className="flex items-start gap-2.5 p-3.5 rounded-xl bg-white/[0.04] border border-white/[0.1]">
                  <CheckCircle2 className="w-4 h-4 text-[#3B82F6] mt-0.5 shrink-0" />
                  <span className="text-xs text-[#94A3B8] leading-relaxed">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#F8FAFC] font-bold mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#8B5CF6]" /> Stack &amp; Capabilities
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-[#94A3B8] font-mono text-xs font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
