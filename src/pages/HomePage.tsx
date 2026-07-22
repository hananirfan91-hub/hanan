import React from 'react';
import { motion } from 'motion/react';
import { PageId, Project } from '../types';
import { PERSONAL_INFO, PROJECTS, SERVICES, SKILL_CATEGORIES, EXPERIENCE_ITEMS } from '../data/portfolioData';
import { ProjectSlider } from '../components/ProjectSlider';
import { Project3DCarousel } from '../components/Project3DCarousel';
import { SplitTextReveal } from '../components/animations/SplitTextReveal';
import { Parallax3DCard } from '../components/animations/Parallax3DCard';
import { HorizontalScrollShowcase } from '../components/animations/HorizontalScrollShowcase';
import { ImageMaskReveal } from '../components/animations/ImageMaskReveal';
import { ArrowUpRight, Sparkles, Code2, Terminal, ChevronDown, CheckCircle2, Cpu, Globe, Rocket, Layers, ExternalLink, Wrench, ShieldCheck } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onSelectProject: (project: Project) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onSelectProject }) => {
  const featuredProjects = PROJECTS.filter((p) => p.featured);

  return (
    <div className="space-y-24 sm:space-y-32 pb-20">
      
      {/* ================= SECTION 1: HERO SECTION ================= */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-12 overflow-hidden"
      >
        {/* Abstract Background Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />
        <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center sm:text-left">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* HELLO I'M */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 font-mono text-xs font-semibold"
              >
                <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
                <span>HELLO, I'M</span>
              </motion.div>

              {/* Large Brand Title HANAN */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="space-y-1"
              >
                <h1 className="text-6xl sm:text-8xl lg:text-9xl font-black font-display tracking-tight text-white leading-none text-glow">
                  {PERSONAL_INFO.primaryBrand}
                </h1>
                <div className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-300 to-cyan-400 font-display">
                  {PERSONAL_INFO.name}
                </div>
              </motion.div>

              {/* Tagline */}
              <motion.h2
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg sm:text-xl font-bold text-purple-200/90 tracking-wide font-display max-w-2xl"
              >
                Full-Stack Software Developer & Digital Creator
              </motion.h2>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl"
              >
                "Building digital experiences that move people and technology forward." I build modern web applications, digital products, and practical software solutions while combining full-stack engineering, design, technical SEO, and emerging AI technologies.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-2"
              >
                <button
                  onClick={() => onNavigate('projects')}
                  className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 text-white font-display font-extrabold text-xs tracking-wider shadow-2xl shadow-purple-600/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" /> VIEW MY WORK
                </button>
                <button
                  onClick={() => onNavigate('contact')}
                  className="px-7 py-3.5 rounded-2xl glass-card border border-white/15 text-white hover:border-purple-500/50 hover:bg-white/5 font-display font-bold text-xs tracking-wider transition-all flex items-center gap-2"
                >
                  <span>LET'S CONNECT</span>
                  <ArrowUpRight className="w-4 h-4 text-purple-400" />
                </button>
              </motion.div>

              {/* Key Location Badges */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="pt-4 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400"
              >
                <div className="flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-purple-400" />
                  <span>Rahim Yar Khan, Pakistan</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                  <span>BSCS @ KFUEIT</span>
                </div>
              </motion.div>

            </div>

            {/* Hero Right Code Card / Interactive UI Box */}
            <div className="lg:col-span-5">
              <Parallax3DCard parallaxSpeed={12}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="relative glass-card rounded-3xl p-6 border border-purple-500/30 shadow-2xl shadow-purple-950/40 bg-[#0b0d18]/85 overflow-hidden"
                >
                  {/* Header Dots */}
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/80" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                      <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    </div>
                    <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                      <Terminal className="w-3.5 h-3.5 text-purple-400" /> hanan.config.ts
                    </span>
                  </div>

                  {/* Code Snippet */}
                  <pre className="font-mono text-xs leading-relaxed text-slate-300 overflow-x-auto space-y-1">
                    <code>
                      <span className="text-purple-400">const</span> <span className="text-cyan-300">developer</span> = &#123;<br />
                      &nbsp;&nbsp;<span className="text-slate-400">name</span>: <span className="text-emerald-300">"Hanan Irfan"</span>,<br />
                      &nbsp;&nbsp;<span className="text-slate-400">brand</span>: <span className="text-emerald-300">"HANAN"</span>,<br />
                      &nbsp;&nbsp;<span className="text-slate-400">age</span>: <span className="text-amber-300">18</span>,<br />
                      &nbsp;&nbsp;<span className="text-slate-400">degree</span>: <span className="text-emerald-300">"BSCS @ KFUEIT"</span>,<br />
                      &nbsp;&nbsp;<span className="text-slate-400">location</span>: <span className="text-emerald-300">"Rahim Yar Khan, PK"</span>,<br />
                      &nbsp;&nbsp;<span className="text-slate-400">coreSkills</span>: [<br />
                      &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-cyan-300">"React"</span>, <span className="text-cyan-300">"Next.js"</span>, <span className="text-cyan-300">"Technical SEO"</span>,<br />
                      &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-cyan-300">"Supabase"</span>, <span className="text-cyan-300">"UI/UX Design"</span>, <span className="text-cyan-300">"AI"</span><br />
                      &nbsp;&nbsp;],<br />
                      &nbsp;&nbsp;<span className="text-slate-400">status</span>: <span className="text-purple-300">"Building & Launching 🚀"</span><br />
                      &#125;;
                    </code>
                  </pre>

                  {/* Live Stats Pill */}
                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
                    <span className="text-purple-300">10+ Projects Live</span>
                    <span className="text-emerald-400">✔ Vercel Ready</span>
                  </div>
                </motion.div>
              </Parallax3DCard>
            </div>

          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-500 font-mono text-[10px] tracking-widest uppercase">
          <span>SCROLL TO EXPLORE</span>
          <ChevronDown className="w-4 h-4 animate-bounce text-purple-400" />
        </div>
      </motion.section>

      {/* ================= SECTION 2: INTRODUCTION ================= */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="glass-card rounded-3xl p-8 sm:p-12 border border-purple-500/20 bg-gradient-to-br from-[#0c0e18] via-[#090b14] to-[#0d091a]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col items-start gap-6">
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border-2 border-purple-500/40 shadow-xl shadow-purple-600/30 shrink-0">
                <img
                  src="/hanan-irfan.jpg"
                  alt="Hanan Irfan Headshot"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src = '/avatar.jpg';
                  }}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="space-y-4">
                <span className="text-xs font-mono text-purple-400 uppercase tracking-widest">// ABOUT THE DEVELOPER</span>
                <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-wide">
                  WHO IS HANAN?
                </h2>
                <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full" />
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Hanan Irfan is a multidisciplinary technology professional focused on building modern digital experiences. From full-stack web applications and SaaS platforms (NEXA POS) to SEO-focused websites and creative digital projects, his work sits at the intersection of technology, design, and innovation.
              </p>

              {/* Large Animated Statement */}
              <div className="p-6 rounded-2xl bg-white/5 border border-purple-500/30">
                <div className="text-xs font-mono text-purple-400 mb-2">CORE DISCIPLINE</div>
                <div className="text-2xl sm:text-4xl font-black font-display tracking-wider text-white text-glow flex flex-wrap gap-x-4 gap-y-2">
                  <span className="text-purple-400">CODE.</span>
                  <span className="text-indigo-300">CREATE.</span>
                  <span className="text-cyan-400">OPTIMIZE.</span>
                  <span className="text-emerald-400">INNOVATE.</span>
                </div>
              </div>

              <div>
                <button
                  onClick={() => onNavigate('about')}
                  className="px-6 py-3 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 border border-purple-500/40 text-white font-display font-bold text-xs tracking-wider transition-all inline-flex items-center gap-2"
                >
                  <span>EXPLORE MY STORY</span>
                  <ArrowUpRight className="w-4 h-4 text-purple-300" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </motion.section>

      {/* ================= SECTION 2.5: ACM KFUEIT CERTIFICATE OF APPRECIATION ================= */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="glass-card rounded-3xl p-8 sm:p-10 border border-amber-500/30 bg-gradient-to-br from-[#0c0d18] via-[#090b14] to-[#120f09] relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5 relative group overflow-hidden rounded-2xl border-2 border-amber-500/40 shadow-2xl shadow-amber-950/40">
              <img
                src="/certificate.jpg"
                alt="ACM KFUEIT Web Developer Certificate — Abdul Hanan Irfan"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.src = '/avatar.jpg';
                }}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <a
                href="/certificate.jpg"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 text-amber-300 font-mono text-xs font-bold p-4 text-center"
              >
                <span>ACM KFUEIT SESSION 2025–26</span>
                <span className="text-white text-sm font-sans underline">Click to Open Full Certificate</span>
              </a>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-mono text-amber-400 uppercase tracking-widest px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 inline-block">
                ★ OFFICIAL RECOGNITION & CERTIFICATE
              </span>
              <h3 className="text-2xl sm:text-4xl font-extrabold font-display text-white">
                Certificate of Appreciation — Web Developer
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Proudly presented to <strong className="text-amber-300">Abdul Hanan Irfan</strong> in recognition of dedication, commitment, and valuable contributions as <strong className="text-cyan-300">WEB DEVELOPER</strong> for <strong className="text-purple-300">ACM KFUEIT</strong> during session 2025–26.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2 font-mono text-xs text-slate-300 border-t border-white/10">
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-slate-400 block text-[10px]">SUPERVISOR</span>
                  <span className="text-white font-bold">DR. ASMA NADEEM</span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-slate-400 block text-[10px]">PRESIDENT</span>
                  <span className="text-white font-bold">HAMZA ARSHAD</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </motion.section>

      {/* ================= SECTION 3: FEATURED PROJECTS 3D CAROUSEL ================= */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-mono text-purple-400 uppercase tracking-widest">// PORTFOLIO SHOWCASE</span>
            <SplitTextReveal
              text="FEATURED PROJECTS"
              as="h2"
              className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-wide"
            />
          </div>
          <button
            onClick={() => onNavigate('projects')}
            className="text-xs font-mono text-purple-400 hover:text-white flex items-center gap-1 transition-colors"
          >
            <span>VIEW ALL 10 PROJECTS</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Premium Draggable 3D Perspective Carousel */}
        <Project3DCarousel projects={PROJECTS} onSelectProject={onSelectProject} />
      </motion.section>

      {/* ================= SECTION 4: LIVE TOOLS HUB HIGHLIGHT ================= */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="glass-card rounded-3xl p-8 sm:p-12 border border-cyan-500/30 bg-gradient-to-r from-[#060a12] via-[#090d18] to-[#0a0718] relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">// LIVE UTILITY ENGINE</span>
              <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-wide">
                FREE TOOLS HUB
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Explore a suite of fast, privacy-focused online utilities created by Hanan Irfan — including word counters, QR code generators, JSON formatters, password generators, and CSS glassmorphism generators.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono">Word Counter</span>
                <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono">QR Generator</span>
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono">JSON Formatter</span>
                <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-mono">CSS Glass Maker</span>
              </div>
            </div>
            <div className="lg:col-span-5 flex flex-col items-center lg:items-end gap-4">
              <div className="w-full p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>DEPLOYED HUB</span>
                  <span className="text-emerald-400">● ACTIVE VERCEL</span>
                </div>
                <div className="text-sm text-slate-200 font-mono break-all">
                  freetoolshub.vercel.app
                </div>
                <a
                  href="https://freetoolshub.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-xl bg-cyan-500/20 hover:bg-cyan-500 text-cyan-200 hover:text-black font-display font-bold text-xs tracking-wider transition-all flex items-center justify-center gap-2"
                >
                  <span>LAUNCH FREE TOOLS HUB</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ================= SECTION 5: TECH STACK & SKILLS ================= */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-mono text-purple-400 uppercase tracking-widest">// TECHNICAL STACK</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-wide">
              CORE CAPABILITIES
            </h2>
          </div>
          <button
            onClick={() => onNavigate('skills')}
            className="text-xs font-mono text-purple-400 hover:text-white flex items-center gap-1 transition-colors"
          >
            <span>VIEW ALL SKILLS</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { name: 'React.js', desc: 'Modern SPA UI', color: 'from-cyan-500/20 to-blue-500/10' },
            { name: 'Next.js', desc: 'SSR & App Router', color: 'from-purple-500/20 to-indigo-500/10' },
            { name: 'TypeScript', desc: 'Type-Safe Code', color: 'from-blue-500/20 to-cyan-500/10' },
            { name: 'Technical SEO', desc: 'Schema & Core Vitals', color: 'from-emerald-500/20 to-teal-500/10' },
            { name: 'Tailwind CSS', desc: 'Modern Utility Styling', color: 'from-sky-500/20 to-indigo-500/10' },
            { name: 'Supabase / Firebase', desc: 'Cloud Auth & DB', color: 'from-amber-500/20 to-orange-500/10' }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -4 }}
              className={`glass-card rounded-2xl p-4 border border-white/10 bg-gradient-to-br ${item.color} space-y-2 text-center`}
            >
              <div className="text-sm font-bold font-display text-white">{item.name}</div>
              <div className="text-[10px] font-mono text-slate-400">{item.desc}</div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ================= SECTION 6: SERVICES PREVIEW ================= */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8"
      >
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-mono text-purple-400 uppercase tracking-widest">// DIGITAL SOLUTIONS</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-wide">
            CAPABILITIES & SERVICES
          </h2>
          <p className="text-slate-400 text-sm">
            Delivering end-to-end web engineering, search optimization, and visual design solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SERVICES.slice(0, 3).map((service) => (
            <div
              key={service.id}
              onClick={() => onNavigate('services')}
              className="glass-card glass-card-hover rounded-3xl p-6 border border-white/10 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="text-xs font-mono text-purple-400 mb-3">SERVICE {service.number}</div>
                <h3 className="text-xl font-bold font-display text-white mb-3">{service.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-6">{service.shortDesc}</p>
              </div>
              <div className="flex items-center gap-1 text-xs font-mono text-purple-400 group-hover:text-white">
                <span>EXPLORE SERVICE</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-4">
          <button
            onClick={() => onNavigate('services')}
            className="px-6 py-3 rounded-xl glass-card border border-purple-500/30 text-purple-300 hover:text-white font-display font-bold text-xs tracking-wider transition-all"
          >
            VIEW ALL 7 SERVICES
          </button>
        </div>
      </motion.section>

      {/* ================= SECTION 7: MILESTONES & JOURNEY ================= */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8"
      >
        <div className="glass-card rounded-3xl p-8 sm:p-12 border border-purple-500/20 bg-[#080a14]">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-white/10">
            <div>
              <span className="text-xs font-mono text-purple-400 uppercase tracking-widest">// EXPERIENCE & GROWTH</span>
              <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-white">
                ACADEMIC & INDUSTRY MILESTONES
              </h2>
            </div>
            <button
              onClick={() => onNavigate('experience')}
              className="px-5 py-2.5 rounded-xl bg-purple-600/20 border border-purple-500/30 text-purple-200 text-xs font-mono hover:bg-purple-600 hover:text-white transition-all"
            >
              VIEW FULL TIMELINE →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
            {EXPERIENCE_ITEMS.slice(0, 3).map((exp) => (
              <div key={exp.id} className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-3">
                <span className="text-[10px] font-mono text-purple-400 font-bold">{exp.period}</span>
                <h3 className="text-lg font-bold font-display text-white">{exp.title}</h3>
                <p className="text-xs font-mono text-slate-400">{exp.organization}</p>
                <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ================= SECTION 8: FINAL CTA SECTION ================= */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="glass-card rounded-3xl p-10 sm:p-16 border border-purple-500/30 text-center relative overflow-hidden bg-gradient-to-r from-purple-950/40 via-[#0a0c16] to-indigo-950/40">
          <div className="max-w-3xl mx-auto space-y-6 relative z-10">
            <span className="text-xs font-mono text-purple-400 uppercase tracking-widest">// START A CONVERSATION</span>
            <h2 className="text-4xl sm:text-6xl font-black font-display text-white tracking-wide text-glow">
              LET'S BUILD SOMETHING GREAT.
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Have an idea, project, website, digital product, or technology challenge? Let's turn it into something useful, functional, and memorable.
            </p>
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => onNavigate('contact')}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-display font-extrabold text-xs tracking-wider shadow-2xl shadow-purple-600/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
              >
                <Rocket className="w-4 h-4" /> START A PROJECT
              </button>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="px-8 py-4 rounded-2xl glass-card border border-white/15 text-white hover:border-purple-500/50 font-display font-bold text-xs tracking-wider transition-all"
              >
                DIRECT EMAIL ({PERSONAL_INFO.email})
              </a>
            </div>
          </div>
        </div>
      </motion.section>

    </div>
  );
};
