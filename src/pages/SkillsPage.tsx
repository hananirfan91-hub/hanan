import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { SKILL_CATEGORIES, PERSONAL_INFO } from '../data/portfolioData';
import { MotionReveal } from '../components/MotionReveal';
import {
  Sparkles,
  Code,
  Cpu,
  Database,
  Search,
  Terminal,
  Layers,
  ArrowUpRight,
} from 'lucide-react';

export const SkillsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const shouldReduceMotion = useReducedMotion();

  const getCategoryIcon = (catId: string) => {
    switch (catId) {
      case 'ai':
        return <Cpu className="w-5 h-5 text-[#3B82F6]" />;
      case 'dev':
        return <Code className="w-5 h-5 text-[#8B5CF6]" />;
      case 'seo':
        return <Search className="w-5 h-5 text-emerald-400" />;
      case 'backend':
        return <Database className="w-5 h-5 text-amber-400" />;
      case 'tools':
        return <Terminal className="w-5 h-5 text-[#F8FAFC]" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#3B82F6]" />;
    }
  };

  const categoriesToDisplay =
    selectedCategory === 'ALL'
      ? SKILL_CATEGORIES
      : SKILL_CATEGORIES.filter((c) => c.id === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="space-y-4">
        <span className="text-xs font-mono font-semibold text-[#3B82F6] uppercase tracking-wider block">
          Technical Capabilities
        </span>
        <h1 className="text-4xl sm:text-6xl font-black font-display text-[#F8FAFC] tracking-tight">
          Skills &amp; Stack
        </h1>
        <p className="text-[#94A3B8] text-base sm:text-lg max-w-3xl leading-relaxed">
          Engineering, AI development, and search optimization disciplines applied across live web platforms by {PERSONAL_INFO.name}.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 border-b border-white/[0.1]">
        <button
          type="button"
          onClick={() => setSelectedCategory('ALL')}
          className={`relative px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${
            selectedCategory === 'ALL'
              ? 'text-[#F8FAFC]'
              : 'bg-white/[0.05] text-[#94A3B8] border border-white/[0.1] hover:bg-white/[0.09] hover:text-[#F8FAFC]'
          }`}
        >
          {selectedCategory === 'ALL' && (
            <motion.span
              layoutId="skills-active-tab"
              transition={{ type: 'spring', stiffness: 380, damping: 32 }}
              className="absolute inset-0 rounded-xl bg-[#3B82F6] shadow-[0_0_20px_rgba(59,130,246,0.28)] -z-10"
            />
          )}
          <span className="relative z-10">All Disciplines</span>
        </button>
        {SKILL_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setSelectedCategory(cat.id)}
            className={`relative px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors whitespace-nowrap flex items-center gap-2 cursor-pointer ${
              selectedCategory === cat.id
                ? 'text-[#F8FAFC]'
                : 'bg-white/[0.05] text-[#94A3B8] border border-white/[0.1] hover:bg-white/[0.09] hover:text-[#F8FAFC]'
            }`}
          >
            {selectedCategory === cat.id && (
              <motion.span
                layoutId="skills-active-tab"
                transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                className="absolute inset-0 rounded-xl bg-[#3B82F6] shadow-[0_0_20px_rgba(59,130,246,0.28)] -z-10"
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              {getCategoryIcon(cat.id)}
              <span>{cat.name}</span>
            </span>
          </button>
        ))}
      </div>

      {/* Skill Categories Deep Dive */}
      <div className="space-y-14">
        {categoriesToDisplay.map((cat) => (
          <MotionReveal key={cat.id}>
            <section className="space-y-6">
              <div className="flex items-center gap-3 border-b border-white/[0.1] pb-3">
                <div className="p-2.5 rounded-xl bg-[#0D1425]/85 border border-white/[0.12]">
                  {getCategoryIcon(cat.id)}
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold font-display text-[#F8FAFC] tracking-tight">
                  {cat.name}
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {cat.skills.map((skill, idx) => (
                  <motion.div
                    key={skill.name}
                    whileHover={shouldReduceMotion ? undefined : { y: -3 }}
                    className={`surface-card spotlight-surface surface-card-hover rounded-2xl p-5 transition-all ${
                      skill.highlight ? 'border-[#3B82F6]/35 bg-[#3B82F6]/[0.07]' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div className="space-y-1">
                        <h3 className="text-base font-bold font-display text-[#F8FAFC]">
                          {skill.name}
                        </h3>
                        {skill.highlight && (
                          <span className="text-[10px] font-mono font-semibold text-[#3B82F6] block uppercase tracking-wider">
                            Core Practice
                          </span>
                        )}
                      </div>
                      <span className="text-xs font-mono text-[#3B82F6] font-bold shrink-0 tabular-nums">
                        {skill.level}%
                      </span>
                    </div>

                    <div className="w-full h-1.5 bg-white/[0.1] rounded-full overflow-hidden mb-3">
                      <motion.div
                        initial={shouldReduceMotion ? false : { scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.65, delay: Math.min(idx * 0.05, 0.25), ease: [0.16, 1, 0.3, 1] }}
                        className="h-full bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] rounded-full origin-left"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>

                    <p className="text-xs text-[#94A3B8] leading-relaxed">{skill.description}</p>
                  </motion.div>
                ))}
              </div>
            </section>
          </MotionReveal>
        ))}
      </div>

      {/* Computer Science Foundations */}
      <MotionReveal>
        <div className="surface-card rounded-3xl p-7 sm:p-10 space-y-6">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#3B82F6] uppercase tracking-wider">
            <Layers className="w-4 h-4" /> Academic Grounding
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-[#F8FAFC]">
            Computer Science Foundations at KFUEIT
          </h2>
          <p className="text-[#94A3B8] text-sm sm:text-base leading-relaxed max-w-4xl">
            Alongside shipping production web applications, {PERSONAL_INFO.name} is completing a BS in Computer Science ({PERSONAL_INFO.education.semester}, CGPA {PERSONAL_INFO.education.cgpa}) at {PERSONAL_INFO.education.institution}.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs text-[#94A3B8]">
            <div className="p-4 rounded-2xl bg-[#0D1425]/80 border border-white/[0.1] space-y-1">
              <span className="text-[#3B82F6] font-bold block">Data Structures &amp; Algorithms</span>
              <span>Arrays, linked lists, trees, graphs, sorting, and complexity analysis.</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#0D1425]/80 border border-white/[0.1] space-y-1">
              <span className="text-emerald-400 font-bold block">Database Systems</span>
              <span>SQL querying, ER modeling, normalization, PostgreSQL, and Firestore.</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#0D1425]/80 border border-white/[0.1] space-y-1">
              <span className="text-[#8B5CF6] font-bold block">Object-Oriented Engineering</span>
              <span>Encapsulation, inheritance, polymorphism, and clean modular architecture in C++ and Java.</span>
            </div>
          </div>
        </div>
      </MotionReveal>

      {/* Search, AEO & GEO Architecture */}
      <MotionReveal delay={0.05}>
        <div className="surface-card rounded-3xl p-7 sm:p-10 space-y-6">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-emerald-400 uppercase tracking-wider">
            <Search className="w-4 h-4" /> Search &amp; Answer Architecture
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-[#F8FAFC]">
            Technical SEO, AEO, GEO &amp; Content Strategy
          </h2>
          <p className="text-[#94A3B8] text-sm sm:text-base leading-relaxed max-w-4xl">
            Every website is structured to be clear for human readers, search engine crawlers, and modern answer engines through semantic schemas, keyword clustering, and fast rendering.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
            <div className="p-4 rounded-2xl bg-[#0D1425]/80 border border-white/[0.1] text-[#94A3B8] space-y-1">
              <span className="text-emerald-400 font-bold block">1. Schema.org &amp; AEO</span>
              <span>JSON-LD Person, Organization &amp; FAQ structuring</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#0D1425]/80 border border-white/[0.1] text-[#94A3B8] space-y-1">
              <span className="text-[#3B82F6] font-bold block">2. Keyword Clustering</span>
              <span>Topic pillars and search intent mapping</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#0D1425]/80 border border-white/[0.1] text-[#94A3B8] space-y-1">
              <span className="text-[#8B5CF6] font-bold block">3. Technical SEO</span>
              <span>Canonicals, XML sitemaps &amp; crawl diagnostics</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#0D1425]/80 border border-white/[0.1] text-[#94A3B8] space-y-1">
              <span className="text-amber-400 font-bold block">4. GEO &amp; Content</span>
              <span>Verifiable entity signals &amp; clear editorial structure</span>
            </div>
          </div>
        </div>
      </MotionReveal>

      {/* CTA */}
      <MotionReveal delay={0.05}>
        <div className="surface-card rounded-3xl p-8 sm:p-12 border-[#3B82F6]/30 text-center space-y-5 bg-gradient-to-br from-[#3B82F6]/10 via-white/[0.04] to-[#8B5CF6]/10">
          <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-[#F8FAFC]">
            Looking for Full-Stack, AI, or SEO Execution?
          </h2>
          <p className="text-xs sm:text-sm text-[#94A3B8] max-w-xl mx-auto leading-relaxed">
            Reach out directly to discuss your technical architecture, web product, or search visibility goals.
          </p>
          <div className="pt-1">
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="px-7 py-3.5 rounded-xl bg-[#3B82F6] hover:bg-[#2563EB] text-[#F8FAFC] font-semibold text-sm inline-flex items-center gap-2 transition-colors"
            >
              <span>Email {PERSONAL_INFO.name}</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </MotionReveal>
    </div>
  );
};
