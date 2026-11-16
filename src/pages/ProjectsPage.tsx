import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Project, PageId } from '../types';
import { PROJECTS, PERSONAL_INFO } from '../data/portfolioData';
import { SpotlightCard } from '../components/SpotlightCard';
import { MotionReveal } from '../components/MotionReveal';
import {
  ExternalLink,
  Search,
  Sparkles,
  Code2,
  SearchCheck,
  Palette,
  ArrowRight,
  ArrowUpRight,
  Layers,
} from 'lucide-react';

interface ProjectsPageProps {
  onSelectProject: (project: Project) => void;
  onNavigate?: (page: PageId) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onSelectProject, onNavigate }) => {
  const [selectedFilter, setSelectedFilter] = useState<'ALL' | 'WEB' | 'SAAS' | 'AI' | 'TOOLS' | 'DESIGN'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filterCategories: { id: 'ALL' | 'WEB' | 'SAAS' | 'AI' | 'TOOLS' | 'DESIGN'; label: string }[] = [
    { id: 'ALL', label: 'All Projects' },
    { id: 'WEB', label: 'Web Apps & Media' },
    { id: 'SAAS', label: 'SaaS & POS' },
    { id: 'TOOLS', label: 'Web Tools' },
    { id: 'AI', label: 'AI Platforms' },
    { id: 'DESIGN', label: 'Creative UI' },
  ];

  const filteredProjects = PROJECTS.filter((p) => {
    const matchesFilter = selectedFilter === 'ALL' || p.filterCategory === selectedFilter;
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !query ||
      p.title.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query) ||
      p.technologies.some((t) => t.toLowerCase().includes(query));
    return matchesFilter && matchesSearch;
  });

  const flagshipProject = PROJECTS.find((p) => p.id === 'the-sports-room') || PROJECTS[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header Overview */}
      <div className="space-y-4">
        <span className="text-xs font-mono font-semibold text-[#3B82F6] uppercase tracking-wider block">
          Portfolio Work &amp; Case Studies
        </span>
        <h1 className="text-4xl sm:text-6xl font-black font-display text-[#F8FAFC] tracking-tight">
          Projects &amp; Digital Products
        </h1>
        <p className="text-[#94A3B8] text-base sm:text-lg max-w-3xl leading-relaxed">
          Live software applications, sports media platforms, SaaS utilities, AI guides, and search-engineered websites built by {PERSONAL_INFO.name}.
        </p>

        {/* Specialized Practice Hub */}
        {onNavigate && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <button
              type="button"
              onClick={() => onNavigate('web-development')}
              className="surface-card surface-card-hover p-5 rounded-2xl text-left flex flex-col justify-between cursor-pointer group"
            >
              <div className="space-y-2.5">
                <div className="w-10 h-10 rounded-xl bg-[#3B82F6]/15 border border-[#3B82F6]/30 flex items-center justify-center text-[#3B82F6]">
                  <Code2 className="w-5 h-5" />
                </div>
                <h2 className="text-lg font-bold font-display text-[#F8FAFC] group-hover:text-[#3B82F6] transition-colors">
                  Web Development
                </h2>
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  Full-stack React, Next.js, TypeScript, and WordPress engineering.
                </p>
              </div>
              <div className="pt-4 flex items-center gap-1 text-xs font-mono font-semibold text-[#3B82F6]">
                <span>View Web Development</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('seo-expert')}
              className="surface-card surface-card-hover p-5 rounded-2xl text-left flex flex-col justify-between cursor-pointer group"
            >
              <div className="space-y-2.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-400/30 flex items-center justify-center text-emerald-400">
                  <SearchCheck className="w-5 h-5" />
                </div>
                <h2 className="text-lg font-bold font-display text-[#F8FAFC] group-hover:text-emerald-400 transition-colors">
                  SEO, AEO &amp; GEO
                </h2>
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  Technical SEO, answer engine structure, keyword clustering, and content strategy.
                </p>
              </div>
              <div className="pt-4 flex items-center gap-1 text-xs font-mono font-semibold text-emerald-400">
                <span>View Search Strategy</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('graphic-design')}
              className="surface-card surface-card-hover p-5 rounded-2xl text-left flex flex-col justify-between cursor-pointer group"
            >
              <div className="space-y-2.5">
                <div className="w-10 h-10 rounded-xl bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 flex items-center justify-center text-[#8B5CF6]">
                  <Palette className="w-5 h-5" />
                </div>
                <h2 className="text-lg font-bold font-display text-[#F8FAFC] group-hover:text-[#8B5CF6] transition-colors">
                  UI/UX &amp; Graphic Design
                </h2>
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  Clean visual systems, brand assets, and responsive product layouts.
                </p>
              </div>
              <div className="pt-4 flex items-center gap-1 text-xs font-mono font-semibold text-[#8B5CF6]">
                <span>View Design Capabilities</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </button>
          </div>
        )}
      </div>

      {/* Flagship Featured Project */}
      {flagshipProject && (
        <MotionReveal>
          <SpotlightCard
            onClick={() => onSelectProject(flagshipProject)}
            className="rounded-3xl p-6 sm:p-10 border-[#3B82F6]/30 bg-gradient-to-br from-[#3B82F6]/10 via-white/[0.04] to-[#8B5CF6]/10 group"
          >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#94A3B8]">
                <span className="font-bold text-[#3B82F6]">
                  Flagship Venture &bull; {flagshipProject.number}
                </span>
                <span aria-hidden="true">&middot;</span>
                <span className="text-[#8B5CF6] font-semibold">{flagshipProject.category}</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-black font-display text-[#F8FAFC] group-hover:text-[#3B82F6] transition-colors">
                {flagshipProject.title}
              </h2>

              <p className="text-[#94A3B8] text-sm sm:text-base leading-relaxed">
                {flagshipProject.description}
              </p>

              <div className="flex flex-wrap gap-2 pt-1">
                {flagshipProject.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-mono px-3 py-1 rounded-lg bg-[#0D1425]/85 border border-white/[0.12] text-[#F8FAFC]"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="pt-3 flex flex-wrap items-center gap-3">
                <span className="px-5 py-2.5 rounded-xl bg-[#3B82F6] text-[#F8FAFC] font-semibold text-xs tracking-wide inline-flex items-center gap-2 shadow-[0_0_24px_rgba(59,130,246,0.22)]">
                  <Sparkles className="w-4 h-4" /> View Project Details
                </span>
                <a
                  href={flagshipProject.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="px-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/[0.12] text-[#F8FAFC] hover:border-[#3B82F6]/50 hover:bg-white/[0.09] text-xs font-mono font-semibold inline-flex items-center gap-1.5 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> Visit Live Site
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="p-6 rounded-2xl bg-[#0D1425]/85 border border-white/[0.12] space-y-3 font-mono text-xs">
                <div className="text-[#3B82F6] font-bold uppercase tracking-wider">Key Highlights</div>
                <ul className="text-[#94A3B8] space-y-2">
                  {flagshipProject.features.slice(0, 5).map((feat) => (
                    <li key={feat} className="flex items-start gap-2">
                      <span className="text-[#3B82F6] font-bold">&bull;</span>
                      <span className="text-[#F8FAFC]/90">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          </SpotlightCard>
        </MotionReveal>
      )}

      {/* Free Tools Hub Banner */}
      <MotionReveal>
        <div className="surface-card rounded-3xl p-6 sm:p-10 bg-[#0D1425]/70">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 space-y-2.5">
              <span className="text-xs font-mono font-semibold text-[#3B82F6] uppercase tracking-wider">
                Browser Utility Suite
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-[#F8FAFC]">
                Free Tools Hub — Client-Side Web Utilities
              </h2>
              <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                Browser utilities including JSON Formatting, Base64 encoding, Text Case Conversion, Word Counting, and Password Generation that execute directly inside your browser without backend storage.
              </p>
            </div>
            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <a
                href="https://freetoolshub1.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-[#3B82F6] hover:bg-[#2563EB] text-[#F8FAFC] font-semibold text-xs tracking-wide transition-colors inline-flex items-center gap-2 shadow-[0_0_24px_rgba(59,130,246,0.2)]"
              >
                <span>Open Free Tools Hub</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </MotionReveal>

      {/* Filter & Search Bar */}
      <MotionReveal>
        <div className="surface-card rounded-2xl p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          {filterCategories.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setSelectedFilter(f.id)}
              className={`relative px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                selectedFilter === f.id
                  ? 'text-[#F8FAFC]'
                  : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/[0.06]'
              }`}
            >
              {selectedFilter === f.id && (
                <motion.span
                  layoutId="projects-active-filter"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  className="absolute inset-0 rounded-xl bg-[#3B82F6] shadow-[0_0_20px_rgba(59,130,246,0.28)] -z-10"
                />
              )}
              <span className="relative z-10">{f.label}</span>
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
          <input
            type="text"
            aria-label="Search projects"
            placeholder="Search projects or stack..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0D1425]/90 border border-white/[0.12] rounded-xl pl-9 pr-4 py-2 text-xs text-[#F8FAFC] placeholder-[#94A3B8]/70 focus:outline-none focus:border-[#3B82F6]"
          />
        </div>
        </div>
      </MotionReveal>

      {/* Projects Grid */}
      <MotionReveal>
      {filteredProjects.length === 0 ? (
        <div className="surface-card rounded-3xl p-10 text-center space-y-3">
          <p className="text-sm font-semibold text-[#F8FAFC]">No projects match your current filter.</p>
          <button
            type="button"
            onClick={() => {
              setSelectedFilter('ALL');
              setSearchQuery('');
            }}
            className="px-4 py-2 rounded-xl bg-[#3B82F6] hover:bg-[#2563EB] text-[#F8FAFC] text-xs font-semibold cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.2 }}
                onClick={() => onSelectProject(project)}
                itemScope={project.seoTitle ? true : undefined}
                itemType={project.seoTitle ? 'https://schema.org/CreativeWork' : undefined}
                className="group surface-card surface-card-hover rounded-3xl p-6 cursor-pointer flex flex-col justify-between"
              >
                {project.seoTitle && <meta itemProp="name" content={project.seoTitle} />}
                {project.seoDescription && <meta itemProp="description" content={project.seoDescription} />}
                {project.seoTitle && <link itemProp="url" href={project.url} />}

                <div>
                  <div className="flex items-center justify-between mb-4 text-xs font-mono">
                    <span className="font-extrabold text-[#3B82F6]">
                      {project.number}
                    </span>
                    <span className="text-[11px] text-[#94A3B8] truncate max-w-[70%] text-right">
                      {project.category}
                    </span>
                  </div>

                  {project.image && (
                    <div
                      className={`h-44 rounded-2xl overflow-hidden border border-white/[0.12] mb-4 ${
                        project.preserveAspectRatio
                          ? 'bg-[#0D1425] flex items-center justify-center p-4'
                          : 'bg-[#0D1425]'
                      }`}
                    >
                      <img
                        src={project.image}
                        alt={project.imageAlt || project.title}
                        title={project.seoTitle || undefined}
                        width={project.preserveAspectRatio ? 1254 : 600}
                        height={project.preserveAspectRatio ? 1254 : 338}
                        loading="lazy"
                        decoding="async"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          const fallback = project.fallbackImage || '/images/projects/hi-digital-group.svg';
                          if (!e.currentTarget.src.endsWith(fallback)) {
                            e.currentTarget.src = fallback;
                          }
                        }}
                        className={
                          project.preserveAspectRatio
                            ? 'w-full h-full object-contain group-hover:scale-105 transition-transform duration-300'
                            : 'w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
                        }
                      />
                    </div>
                  )}

                  <h3 className="text-xl font-bold font-display text-[#F8FAFC] group-hover:text-[#3B82F6] transition-colors mb-2.5">
                    {project.title}
                  </h3>

                  <p className="text-[#94A3B8] text-xs leading-relaxed line-clamp-3 mb-5">
                    {project.description}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.1] text-[#94A3B8]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/[0.1]">
                    <span className="text-xs font-mono font-semibold text-[#3B82F6] group-hover:text-[#F8FAFC] transition-colors">
                      View Details
                    </span>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      aria-label={`Open ${project.title} live site`}
                      className="p-2 rounded-xl bg-white/[0.05] hover:bg-[#3B82F6] text-[#94A3B8] hover:text-[#F8FAFC] border border-white/[0.1] transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      )}
      </MotionReveal>

      {/* Architecture Standards */}
      <MotionReveal>
        <div className="surface-card rounded-3xl p-7 sm:p-10 space-y-6">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#3B82F6] uppercase tracking-wider">
            <Layers className="w-4 h-4" /> Engineering Principles
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-[#F8FAFC]">
            Architecture &amp; Quality Approach
          </h2>
          <p className="text-[#94A3B8] text-sm sm:text-base leading-relaxed max-w-4xl">
            Every project is built around modular TypeScript components, mobile-first layouts, clean asset loading, and semantic markup for reliable performance across browsers and mobile webviews.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs text-[#94A3B8]">
            <div className="p-4 rounded-2xl bg-[#0D1425]/80 border border-white/[0.1] space-y-1">
              <span className="text-[#3B82F6] font-bold block">Frontend Engineering</span>
              <span>React, Next.js, TypeScript, Tailwind CSS, and accessible navigation.</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#0D1425]/80 border border-white/[0.1] space-y-1">
              <span className="text-emerald-400 font-bold block">Data &amp; Auth</span>
              <span>Supabase PostgreSQL, Firebase Firestore, and validated REST workflows.</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#0D1425]/80 border border-white/[0.1] space-y-1">
              <span className="text-[#8B5CF6] font-bold block">Search &amp; Speed</span>
              <span>Semantic HTML, JSON-LD Schema, AEO/GEO structuring, and fast loading.</span>
            </div>
          </div>
        </div>
      </MotionReveal>

      {/* Call to Action */}
      <MotionReveal delay={0.05}>
        <div className="surface-card rounded-3xl p-8 sm:p-12 border-[#3B82F6]/30 text-center space-y-5 bg-gradient-to-br from-[#3B82F6]/10 via-white/[0.04] to-[#8B5CF6]/10">
          <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-[#F8FAFC]">
            Have a Web App, AI Feature, or SEO Project in Mind?
          </h2>
          <p className="text-xs sm:text-sm text-[#94A3B8] max-w-xl mx-auto leading-relaxed">
            Connect with {PERSONAL_INFO.name} to discuss custom web development, AI workflows, or technical search optimization.
          </p>
          <div className="pt-1">
            {onNavigate ? (
              <button
                type="button"
                onClick={() => onNavigate('contact')}
                className="px-7 py-3.5 rounded-xl bg-[#3B82F6] hover:bg-[#2563EB] text-[#F8FAFC] font-semibold text-sm inline-flex items-center gap-2 transition-colors cursor-pointer"
              >
                <span>Start a Conversation</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            ) : (
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="px-7 py-3.5 rounded-xl bg-[#3B82F6] hover:bg-[#2563EB] text-[#F8FAFC] font-semibold text-sm inline-flex items-center gap-2 transition-colors"
              >
                <span>Start a Conversation</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </MotionReveal>
    </div>
  );
};
