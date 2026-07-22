import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Project } from '../types';
import { X, ExternalLink, CheckCircle2, Sparkles, Layers } from 'lucide-react';
import { InteractiveToolsEngine } from './InteractiveToolsEngine';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  const isFreeToolsHub = project.id === 'free-tools-hub';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl bg-[#0a0c14] border border-purple-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-purple-950/50 z-10 max-h-[90vh] overflow-y-auto"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full glass-card text-slate-400 hover:text-white hover:border-purple-500/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-3 mb-2">
            <span className="text-sm font-mono text-purple-400 font-extrabold px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20">
              PROJECT {project.number}
            </span>
            <span className="text-xs font-mono text-cyan-400 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
              {project.category}
            </span>
            <span className="text-xs text-emerald-400 font-mono flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
              {project.status}
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-white tracking-wide mb-4">
            {project.title}
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
            {project.description}
          </p>

          {/* Project Banner Image */}
          {project.image && (
            <div className="mb-6 rounded-2xl overflow-hidden border border-white/10 max-h-64 sm:max-h-80 bg-black/40">
              <img
                src={project.image}
                alt={project.title}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.src = '/nexapos.jpg';
                }}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Live Button CTA */}
          <div className="mb-8">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-display font-bold text-sm shadow-xl shadow-purple-600/30 hover:scale-105 active:scale-95 transition-all"
            >
              <ExternalLink className="w-4 h-4" />
              <span>VISIT LIVE DEMO SITE ({project.url.replace('https://', '').replace('/', '')})</span>
            </a>
          </div>

          {/* If Free Tools Hub, show the live embedded tool playground */}
          {isFreeToolsHub && <InteractiveToolsEngine />}

          {/* Key Features */}
          <div className="mb-8">
            <h3 className="text-xs font-mono uppercase tracking-widest text-purple-400 mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> KEY FEATURES & HIGHLIGHTS
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {project.features.map((feat, i) => (
                <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-white/5 border border-white/5">
                  <CheckCircle2 className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" />
                  <span className="text-xs text-slate-200">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technologies */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-purple-400 mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4" /> TECH STACK & TOOLS
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-xl bg-purple-950/40 border border-purple-500/30 text-purple-300 font-mono text-xs"
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
