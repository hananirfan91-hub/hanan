import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Project } from '../types';
import { PROJECTS } from '../data/portfolioData';
import { SplitTextReveal } from '../components/animations/SplitTextReveal';
import { ExternalLink, Search, Sparkles, Filter, ArrowUpRight, Layers, Wrench, ShieldCheck, Terminal, Rocket } from 'lucide-react';

interface ProjectsPageProps {
  onSelectProject: (project: Project) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onSelectProject }) => {
  const [selectedFilter, setSelectedFilter] = useState<'ALL' | 'WEB' | 'SAAS' | 'AI' | 'TOOLS' | 'DESIGN'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filterCategories = [
    { id: 'ALL', label: 'ALL PROJECTS' },
    { id: 'SAAS', label: 'SAAS & POS' },
    { id: 'TOOLS', label: 'WEB TOOLS' },
    { id: 'AI', label: 'AI PLATFORMS' },
    { id: 'WEB', label: 'WEB APPS' },
    { id: 'DESIGN', label: 'CREATIVE & DESIGN' }
  ];

  const filteredProjects = PROJECTS.filter((p) => {
    const matchesFilter = selectedFilter === 'ALL' || p.filterCategory === selectedFilter;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.technologies.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const featuredProject = PROJECTS[0]; // NEXA POS

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      
      {/* SECTION 1: HEADER */}
      <div className="space-y-4">
        <span className="text-xs font-mono text-purple-400 uppercase tracking-widest">// ARCHITECTURE & CODE</span>
        <SplitTextReveal
          text="PROJECTS & SAAS"
          as="h1"
          className="text-4xl sm:text-7xl font-black font-display text-white tracking-wide text-glow"
        />
        <p className="text-slate-300 text-base sm:text-lg max-w-3xl leading-relaxed">
          Explore 10 live web applications, SaaS platforms, browser utilities, and creative digital experiences built and launched by Hanan Irfan.
        </p>
      </div>

      {/* SECTION 2: FEATURED BANNER PROJECT - NEXA POS */}
      {featuredProject && (
        <div
          onClick={() => onSelectProject(featuredProject)}
          className="glass-card rounded-3xl p-8 sm:p-12 border border-purple-500/40 bg-gradient-to-r from-[#0c0d1a] via-[#090b16] to-[#0a0d1d] hover:border-purple-500 transition-all cursor-pointer group relative overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-extrabold text-purple-300 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/40">
                  FEATURED SAAS — {featuredProject.number}
                </span>
                <span className="text-xs font-mono text-cyan-400 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                  {featuredProject.category}
                </span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-black font-display text-white group-hover:text-purple-300 transition-colors">
                {featuredProject.title}
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {featuredProject.description}
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {featuredProject.technologies.map((tech, idx) => (
                  <span key={idx} className="text-xs font-mono px-3 py-1 rounded-xl bg-purple-950/50 border border-purple-500/30 text-purple-300">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="pt-4 flex items-center gap-3">
                <button className="px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-display font-bold text-xs tracking-wider shadow-lg shadow-purple-600/30 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" /> EXPLORE NEXA POS
                </button>
                <a
                  href={featuredProject.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="px-4 py-3 rounded-2xl glass-card text-slate-300 hover:text-white text-xs font-mono flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> LIVE SITE
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="p-6 rounded-2xl bg-[#05060b] border border-white/10 space-y-3 font-mono text-xs">
                <div className="text-purple-400 font-bold">// KEY MODULES</div>
                <div className="text-slate-300 space-y-1.5">
                  <div>• POS Billing & Quick Checkout</div>
                  <div>• Stock & Inventory Alerts</div>
                  <div>• Customer Ledger & CRM</div>
                  <div>• Sales Analytics & Reports</div>
                  <div>• PWA Offline Resilience</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* SECTION 3: FREE TOOLS HUB ENGINE BANNER */}
      <div className="glass-card rounded-3xl p-8 sm:p-12 border border-cyan-500/30 bg-gradient-to-r from-[#060a12] via-[#090d18] to-[#0a0718]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-3">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">// DEPLOYED UTILITY HUB</span>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-white">
              FREE TOOLS HUB — BROWSER UTILITIES
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              10+ client-side tools (Word Counter, QR Code Generator, JSON Formatter, Password Generator, Glassmorphism Maker) deployed on Vercel. 100% private, client-side, zero database tracking.
            </p>
          </div>
          <div className="lg:col-span-4 flex justify-start lg:justify-end">
            <a
              href="https://freetoolshub.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-200 hover:bg-cyan-500 hover:text-black font-display font-bold text-xs tracking-wider transition-all flex items-center gap-2"
            >
              <span>LAUNCH BROWSER TOOLS</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* SECTION 4: FILTER AND SEARCH CONTROLS */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 glass-card p-4 rounded-2xl border border-white/10">
        
        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          {filterCategories.map((f) => (
            <button
              key={f.id}
              onClick={() => setSelectedFilter(f.id as any)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedFilter === f.id
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search projects or tech..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#05060a] border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
          />
        </div>

      </div>

      {/* SECTION 5: 10-PROJECT SHOWCASE GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence>
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              onClick={() => onSelectProject(project)}
              className="group glass-card rounded-3xl p-6 border border-white/10 hover:border-purple-500/50 bg-[#090b14] transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-extrabold text-purple-400">
                    {project.number}
                  </span>
                  <span className="text-[11px] font-mono text-cyan-400 px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                    {project.category}
                  </span>
                </div>

                {project.image && (
                  <div className="h-40 rounded-2xl overflow-hidden border border-white/10 mb-4 bg-black/40">
                    <img
                      src={project.image}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.currentTarget.src = '/nexapos.jpg';
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}

                <h3 className="text-xl font-bold font-display text-white group-hover:text-purple-300 transition-colors mb-3">
                  {project.title}
                </h3>

                <p className="text-slate-300 text-xs leading-relaxed line-clamp-3 mb-6">
                  {project.description}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/5 text-slate-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <span className="text-xs font-mono text-purple-400 group-hover:text-white transition-colors">
                    DETAILS & LIVE DEMO
                  </span>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 rounded-xl bg-purple-600/20 hover:bg-purple-600 text-purple-300 hover:text-white transition-all"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* SECTION 6: ARCHITECTURE STANDARDS */}
      <div className="glass-card rounded-3xl p-8 sm:p-12 border border-purple-500/20 bg-[#080a14] space-y-6">
        <span className="text-xs font-mono text-purple-400 uppercase tracking-widest">// SOFTWARE INTEGRITY</span>
        <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-white">
          PORTFOLIO ARCHITECTURE STANDARDS
        </h2>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          All projects are designed with explicit modularity, clean component hierarchy, fast initial load times, responsive breakpoints, and strict TypeScript types.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 font-mono text-xs text-slate-300">
          <div className="p-4 rounded-xl bg-white/5 border border-white/5">
            <span className="text-purple-400 font-bold block mb-1">FRONTEND ENGINE</span>
            <span>React 18+, Vite, Tailwind CSS, Motion/React animations.</span>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/5">
            <span className="text-cyan-400 font-bold block mb-1">DATABASE & AUTH</span>
            <span>Supabase PostgreSQL, Firebase Firestore & Authentication.</span>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/5">
            <span className="text-emerald-400 font-bold block mb-1">SEO & SPEED</span>
            <span>SSR / SSG routing, JSON-LD Schema, sub-1s Vercel response times.</span>
          </div>
        </div>
      </div>

      {/* SECTION 7: CALL TO ACTION */}
      <div className="glass-card rounded-3xl p-8 sm:p-12 border border-purple-500/30 text-center bg-gradient-to-r from-purple-900/30 via-[#0a0c16] to-cyan-900/30 space-y-6">
        <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-white">
          WANT A CUSTOM WEB APP OR SAAS PLATFORM ENGINEERED?
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
          Contact Hanan Irfan for custom SaaS development, web application design, and technical SEO architecture.
        </p>
        <div className="pt-2">
          <a
            href="mailto:hananirfan91@gmail.com"
            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-display font-extrabold text-xs tracking-wider shadow-xl shadow-purple-600/30 hover:scale-105 transition-all inline-flex items-center gap-2"
          >
            <span>START A CUSTOM PROJECT</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>

    </div>
  );
};
