import React from 'react';
import { motion } from 'motion/react';
import { EXPERIENCE_ITEMS } from '../data/portfolioData';
import { Briefcase, Calendar, CheckCircle2, Layers, MapPin, Award, Terminal, Rocket, ArrowUpRight } from 'lucide-react';

export const ExperiencePage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      
      {/* SECTION 1: HEADER */}
      <div className="space-y-4">
        <span className="text-xs font-mono text-purple-400 uppercase tracking-widest">// MILESTONES & DISCIPLINE</span>
        <h1 className="text-4xl sm:text-7xl font-black font-display text-white tracking-wide text-glow">
          EXPERIENCE
        </h1>
        <p className="text-slate-300 text-base sm:text-lg max-w-3xl leading-relaxed">
          A track record across full-stack software development, live digital product launches, technical SEO consulting, and computer science academics.
        </p>
      </div>

      {/* SECTION 2: INTERACTIVE TIMELINE */}
      <div className="relative border-l-2 border-purple-500/30 ml-4 sm:ml-8 space-y-12 pl-6 sm:pl-10">
        {EXPERIENCE_ITEMS.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="relative group"
          >
            {/* Timeline Circle Marker */}
            <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-5 h-5 rounded-full bg-purple-600 border-4 border-[#07080c] shadow-lg shadow-purple-600/50 group-hover:scale-125 transition-transform" />

            <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 hover:border-purple-500/40 bg-[#090b14] space-y-4">
              
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4">
                <span className="text-xs font-mono font-extrabold text-purple-400 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20">
                  {item.category}
                </span>
                <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
                  <Calendar className="w-3.5 h-3.5 text-purple-400" />
                  <span>{item.period}</span>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold font-display text-white group-hover:text-purple-300 transition-colors">
                  {item.title}
                </h2>
                {item.organization && (
                  <span className="text-xs font-mono text-cyan-400 block mt-1">
                    @ {item.organization}
                  </span>
                )}
              </div>

              <p className="text-slate-300 text-sm leading-relaxed">
                {item.description}
              </p>

              {/* Highlights List */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-mono text-purple-400 uppercase tracking-wider block mb-2">
                  // KEY ACCOMPLISHMENTS
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {item.highlights.map((high, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 mt-0.5 shrink-0" />
                      <span>{high}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Badges */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap gap-2">
                {item.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>

            </div>
          </motion.div>
        ))}
      </div>

      {/* SECTION 3: KEY PRODUCT ENGINE SHOWCASE */}
      <div className="glass-card rounded-3xl p-8 sm:p-12 border border-purple-500/30 bg-gradient-to-r from-[#070912] via-[#0a0c18] to-[#0d0a1b] space-y-6">
        <span className="text-xs font-mono text-purple-400 uppercase tracking-widest">// FLAGSHIP SAAS & PRODUCT LAUNCHES</span>
        <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-white">
          NEXA POS & FREE TOOLS HUB ACHIEVEMENTS
        </h2>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-4xl">
          Hanan Irfan engineered and launched NEXA POS System — a modern web-based Point of Sale platform featuring local persistence, inventory management, invoice generation, and real-time transaction processing. Concurrently, he launched Free Tools Hub, serving privacy-focused utilities directly on Vercel.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 font-mono text-xs">
          <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1">
            <span className="text-purple-400 font-bold block">NEXA POS ENGINE</span>
            <span className="text-slate-300">Web POS, invoice printing, inventory management & chart dashboards.</span>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1">
            <span className="text-cyan-400 font-bold block">FREE TOOLS HUB</span>
            <span className="text-slate-300">10+ live client-side browser tools with 0 backend tracking.</span>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1">
            <span className="text-emerald-400 font-bold block">HI DIGITAL GROUP</span>
            <span className="text-slate-300">Web development & SEO strategy agency providing technical consulting.</span>
          </div>
        </div>
      </div>

      {/* SECTION 4: TECHNICAL METHODOLOGY & CODE STANDARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-3">
          <Terminal className="w-5 h-5 text-purple-400" />
          <h3 className="text-lg font-bold font-display text-white">CI/CD & Vercel Deployments</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Automated git-push deployments, zero-downtime rollouts, custom domain setup, and environment management on Vercel and GitHub.
          </p>
        </div>
        <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-3">
          <Award className="w-5 h-5 text-cyan-400" />
          <h3 className="text-lg font-bold font-display text-white">Performance Benchmarking</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Consistently achieving 95+ PageSpeed scores by optimizing bundle sizes, asset compression, lazy loading, and SSR rendering.
          </p>
        </div>
        <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-3">
          <Briefcase className="w-5 h-5 text-emerald-400" />
          <h3 className="text-lg font-bold font-display text-white">Agile Project Execution</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Iterative development cycles from scoping requirements to wireframing, frontend execution, testing, and production launch.
          </p>
        </div>
      </div>

      {/* SECTION 5: CALL TO ACTION */}
      <div className="glass-card rounded-3xl p-8 sm:p-12 border border-purple-500/30 text-center bg-gradient-to-r from-purple-900/30 via-[#0a0c16] to-cyan-900/30 space-y-6">
        <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-white">
          READY TO ELEVATE YOUR SOFTWARE EXPERIENCE?
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
          Leverage Hanan's full-stack development, technical SEO, and product design experience for your next release.
        </p>
        <div className="pt-2">
          <a
            href="mailto:hananirfan91@gmail.com"
            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-display font-extrabold text-xs tracking-wider shadow-xl shadow-purple-600/30 hover:scale-105 transition-all inline-flex items-center gap-2"
          >
            <span>DISCUSS AN OPPORTUNITY</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>

    </div>
  );
};
