import React, { useState } from 'react';
import { motion } from 'motion/react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { Sparkles, Code, Cpu, Database, Globe, Search, Palette, Terminal, CheckCircle2, ShieldCheck, Zap, Layers, ArrowUpRight } from 'lucide-react';

export const SkillsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const getCategoryIcon = (catId: string) => {
    switch (catId) {
      case 'dev': return <Code className="w-5 h-5 text-purple-400" />;
      case 'prog': return <Cpu className="w-5 h-5 text-cyan-400" />;
      case 'backend': return <Database className="w-5 h-5 text-indigo-400" />;
      case 'cms': return <Globe className="w-5 h-5 text-emerald-400" />;
      case 'seo': return <Search className="w-5 h-5 text-amber-400" />;
      case 'design': return <Palette className="w-5 h-5 text-pink-400" />;
      case 'tools': return <Terminal className="w-5 h-5 text-sky-400" />;
      default: return <Sparkles className="w-5 h-5 text-purple-400" />;
    }
  };

  const categoriesToDisplay = selectedCategory === 'ALL'
    ? SKILL_CATEGORIES
    : SKILL_CATEGORIES.filter((c) => c.id === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      
      {/* SECTION 1: HEADER & TECHNICAL STRATEGY */}
      <div className="space-y-4">
        <span className="text-xs font-mono text-purple-400 uppercase tracking-widest">// TECHNICAL CAPABILITIES</span>
        <h1 className="text-4xl sm:text-7xl font-black font-display text-white tracking-wide text-glow">
          SKILLS & STACK
        </h1>
        <p className="text-slate-300 text-base sm:text-lg max-w-3xl leading-relaxed">
          Interactive showcase of Hanan Irfan's engineering disciplines across full-stack development, technical SEO, database design, visual graphics, and modern web tools.
        </p>
      </div>

      {/* SECTION 2: CATEGORY FILTER TABS */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 border-b border-white/10">
        <button
          onClick={() => setSelectedCategory('ALL')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            selectedCategory === 'ALL'
              ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
              : 'glass-card text-slate-400 hover:text-white'
          }`}
        >
          ALL CATEGORIES
        </button>
        {SKILL_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
              selectedCategory === cat.id
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                : 'glass-card text-slate-400 hover:text-white'
            }`}
          >
            {getCategoryIcon(cat.id)}
            <span>{cat.name}</span>
          </button>
        ))}
      </div>

      {/* SECTION 3: SKILL CATEGORIES DEEP DIVE */}
      <div className="space-y-16">
        {categoriesToDisplay.map((cat) => (
          <div key={cat.id} className="space-y-6">
            
            {/* Category Title */}
            <div className="flex items-center gap-3 border-b border-white/10 pb-3">
              <div className="p-2.5 rounded-2xl bg-purple-500/10 border border-purple-500/20">
                {getCategoryIcon(cat.id)}
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold font-display text-white tracking-wider">
                {cat.name}
              </h2>
            </div>

            {/* Skill Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {cat.skills.map((skill, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className={`group glass-card rounded-2xl p-5 border transition-all duration-300 relative overflow-hidden bg-[#090b14] ${
                    skill.highlight
                      ? 'border-purple-500/40 shadow-lg shadow-purple-950/20'
                      : 'border-white/10 hover:border-purple-500/30'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="space-y-1">
                      <h3 className="text-base font-bold font-display text-white group-hover:text-purple-300 transition-colors">
                        {skill.name}
                      </h3>
                      {skill.highlight && (
                        <span className="inline-block text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                          CORE FOCUS
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-mono text-purple-400 font-extrabold">{skill.level}%</span>
                  </div>

                  {/* Level Progress Bar */}
                  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mb-3">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full transition-all duration-1000"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {skill.description}
                  </p>
                </motion.div>
              ))}
            </div>

          </div>
        ))}
      </div>

      {/* SECTION 4: ARCHITECTURE & CORE CONCEPTS */}
      <div className="glass-card rounded-3xl p-8 sm:p-12 border border-purple-500/30 bg-gradient-to-br from-[#0c0e18] via-[#080a14] to-[#0c0b1c] space-y-6">
        <div className="flex items-center gap-2 text-xs font-mono text-purple-400 uppercase tracking-widest">
          <Layers className="w-4 h-4" /> CORE CS & SOFTWARE PRINCIPLES
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-white">
          COMPUTER SCIENCE FOUNDATIONS AT KFUEIT
        </h2>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-4xl">
          Beyond individual frameworks, Hanan Irfan's skill set is anchored in foundational computer science principles studied at Khwaja Fareed University of Engineering and Information Technology (KFUEIT).
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 font-mono text-xs text-slate-300">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <span className="text-purple-400 font-bold block mb-1">DATA STRUCTURES & ALGORITHMS</span>
            <span>Array manipulation, linked lists, trees, graphs, sorting algorithms, and complexity analysis (Big-O).</span>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <span className="text-cyan-400 font-bold block mb-1">DATABASE & RELATIONAL DESIGN</span>
            <span>SQL querying, ER diagrams, normalization, indexes, Supabase PostgreSQL, and Firebase Firestore.</span>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <span className="text-emerald-400 font-bold block mb-1">OBJECT-ORIENTED PROGRAMMING</span>
            <span>Encapsulation, inheritance, polymorphism, and abstraction implemented in C++ and Java.</span>
          </div>
        </div>
      </div>

      {/* SECTION 5: TECHNICAL SEO & WEB AUDIT MASTERY */}
      <div className="glass-card rounded-3xl p-8 sm:p-12 border border-amber-500/30 bg-[#090b14] space-y-6">
        <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-widest">
          <Search className="w-4 h-4" /> SEARCH & ANSWER ENGINE ARCHITECTURE
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-white">
          TECHNICAL SEO, CORE WEB VITALS & AEO AUDITING
        </h2>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          In addition to software engineering, Hanan specializes in technical search engine optimization (SEO), ensuring web apps rank high on Google and answer engine models (ChatGPT, Perplexity, Gemini).
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 font-mono text-xs">
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 text-slate-300">
            <span className="text-amber-400 font-bold block">1. Schema.org</span>
            <span>JSON-LD Structured Data</span>
          </div>
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 text-slate-300">
            <span className="text-amber-400 font-bold block">2. Core Web Vitals</span>
            <span>LCP, FID, CLS Optimization</span>
          </div>
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 text-slate-300">
            <span className="text-amber-400 font-bold block">3. Speed Optimization</span>
            <span>Image Compression & SSR</span>
          </div>
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 text-slate-300">
            <span className="text-amber-400 font-bold block">4. Crawl Efficiency</span>
            <span>Sitemap.xml & Robots.txt</span>
          </div>
        </div>
      </div>

      {/* SECTION 6: NEED A CUSTOM TECH STACK IMPLEMENTED? */}
      <div className="glass-card rounded-3xl p-8 sm:p-12 border border-purple-500/30 text-center bg-gradient-to-r from-purple-900/30 via-[#0a0c16] to-cyan-900/30 space-y-6">
        <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-white">
          NEED A CUSTOM TECH STACK OR FULL-STACK APP?
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
          Hanan Irfan can build, optimize, or redesign your digital products using the ideal technology stack.
        </p>
        <div className="pt-2">
          <a
            href="mailto:hananirfan91@gmail.com"
            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-display font-extrabold text-xs tracking-wider shadow-xl shadow-purple-600/30 hover:scale-105 transition-all inline-flex items-center gap-2"
          >
            <span>DISCUSS YOUR TECH STACK</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>

    </div>
  );
};
