import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PageId } from '../types';
import { PERSONAL_INFO, AEO_FAQS } from '../data/portfolioData';
import { Award, GraduationCap, MapPin, Sparkles, ChevronDown, Check, UserCheck, HelpCircle, Building2, Rocket, ArrowUpRight } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const timelineStages = [
    {
      stage: '01. LEARNING',
      title: 'Computer Science & Software Foundations',
      desc: 'Mastered programming fundamentals in C++, Java, and Python at KFUEIT while building strong core knowledge in data structures, SQL databases, and computer networks.'
    },
    {
      stage: '02. BUILDING',
      title: 'Frontend & Full-Stack Mastery',
      desc: 'Advanced into modern web engineering using React, Next.js, JavaScript (ES6+), TypeScript, Tailwind CSS, Supabase, and REST API development.'
    },
    {
      stage: '03. EXPERIMENTING',
      title: 'SEO, Design & AI Integration',
      desc: 'Expanded into technical SEO, site speed optimization, schema markup, graphic design, UI/UX design, and AI model workflows.'
    },
    {
      stage: '04. LAUNCHING',
      title: 'Live SaaS & Web Platforms',
      desc: 'Built and deployed real digital products including NEXA POS System, Free Tools Hub, AI Tool Guide, HI Digital Group, and community platforms.'
    },
    {
      stage: '05. GROWING',
      title: 'Entrepreneurship & Future Innovation',
      desc: 'Scaling digital products, providing consulting services, and continuously experimenting with modern AI and emerging tech stacks.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      
      {/* SECTION 1: HEADER */}
      <div className="space-y-4">
        <span className="text-xs font-mono text-purple-400 uppercase tracking-widest">// PERSONAL BRAND STORY</span>
        <h1 className="text-4xl sm:text-7xl font-black font-display text-white tracking-wide text-glow">
          ABOUT HANAN
        </h1>
        <p className="text-slate-300 text-base sm:text-lg max-w-3xl leading-relaxed">
          Hanan Irfan is an 18-year-old multidisciplinary full-stack software developer, entrepreneur, SEO specialist, graphic designer, and AI enthusiast based in Rahim Yar Khan, Punjab, Pakistan.
        </p>
      </div>

      {/* SECTION 2: MAIN PROFILE & PERSONAL STATEMENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Profile Card */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-purple-500/30 bg-[#0a0c16] text-center space-y-6">
            <div className="relative w-36 h-36 mx-auto rounded-3xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-500 p-1 shadow-2xl shadow-purple-600/40 overflow-hidden group">
              <img
                src="/hanan-irfan.jpg"
                alt="Hanan Irfan — Full-Stack Developer & SEO Expert in Rahim Yar Khan"
                width={144}
                height={144}
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.src = '/avatar.jpg';
                }}
                className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500 aspect-square"
              />
            </div>

            <div>
              <h2 className="text-2xl font-extrabold font-display text-white">{PERSONAL_INFO.name}</h2>
              <p className="text-xs font-mono text-purple-400 mt-1 uppercase tracking-wider">{PERSONAL_INFO.title}</p>
            </div>

            <div className="space-y-3 text-xs text-slate-300 font-mono text-left pt-4 border-t border-white/10">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-purple-400 shrink-0" />
                <span>{PERSONAL_INFO.education.degree}</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{PERSONAL_INFO.education.institution}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{PERSONAL_INFO.location}</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onNavigate('contact')}
                className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-display font-bold text-xs tracking-wider shadow-lg shadow-purple-600/30 transition-all"
              >
                CONNECT WITH HANAN
              </button>
            </div>
          </div>

          {/* Personal Statement Card */}
          <div className="glass-card rounded-3xl p-6 border border-cyan-500/20 bg-gradient-to-br from-cyan-950/20 to-purple-950/20">
            <div className="text-xs font-mono text-cyan-400 mb-2 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> PERSONAL STATEMENT
            </div>
            <p className="text-sm text-slate-200 italic leading-relaxed">
              "{PERSONAL_INFO.personalStatement}"
            </p>
          </div>

          {/* Official ACM Certificate Highlight */}
          <div className="glass-card rounded-3xl p-6 border border-purple-500/30 bg-[#090c1a] space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-extrabold text-amber-400 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5" /> ACM KFUEIT CERTIFICATE
              </span>
              <span className="text-[10px] font-mono text-slate-400">SESSION 2025–26</span>
            </div>

            <div className="relative group overflow-hidden rounded-2xl border border-amber-500/30 shadow-xl shadow-amber-950/30">
              <img
                src="/certificate.jpg"
                alt="Abdul Hanan Irfan — Web Developer Certificate of Appreciation ACM KFUEIT"
                width={900}
                height={672}
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.src = '/avatar.jpg';
                }}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500 aspect-[4/3]"
              />
              <a
                href="/certificate.jpg"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-mono text-xs font-bold"
              >
                <span>CLICK TO VIEW FULL RESOLUTION</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

            <div>
              <h3 className="text-base font-bold font-display text-white">Certificate of Appreciation — Web Developer</h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Presented to <strong className="text-amber-300">Abdul Hanan Irfan</strong> by <strong className="text-cyan-300">ACM KFUEIT</strong> in recognition of valuable contributions as Web Developer (Session 2025–26). Signed by Dr. Asma Nadeem (Supervisor) and Hamza Arshad (President).
              </p>
            </div>
          </div>
        </div>

        {/* Right Content Story */}
        <div className="lg:col-span-7 space-y-8">
          <div className="glass-card rounded-3xl p-8 border border-white/10 space-y-6">
            <h3 className="text-2xl font-bold font-display text-white">THE JOURNEY & VISION</h3>
            
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Hanan Irfan's technology journey combines rigorous academic learning with hands-on development, digital product creation, technical SEO, and entrepreneurship.
            </p>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Pursuing a BS in Computer Science at Khwaja Fareed University of Engineering and Information Technology (KFUEIT) in Rahim Yar Khan, he bridges theoretical computer science concepts with modern web technology stacks.
            </p>

            <div className="pt-4 border-t border-white/10">
              <h4 className="text-xs font-mono text-purple-400 uppercase tracking-widest mb-4">// CORE CAPABILITY DOMAINS</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
                {[
                  'Frontend Development (React / Next.js)',
                  'Full-Stack Web Engineering',
                  'Technical SEO & Speed Optimization',
                  'WordPress Theme Customization',
                  'UI/UX & Graphic Design',
                  'Digital Products & SaaS Concepts',
                  'Database Architecture (SQL / Supabase)',
                  'AI Exploration & API Integrations'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/5">
                    <Check className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* SECTION 3: THE FIVE STAGES OF GROWTH */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono text-purple-400 uppercase tracking-widest">// EVOLUTION TIMELINE</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-wide">
            THE FIVE STAGES OF GROWTH
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {timelineStages.map((stage, i) => (
            <div
              key={i}
              className="glass-card glass-card-hover rounded-2xl p-5 border border-white/10 flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-mono text-purple-400 block mb-2 font-bold">{stage.stage}</span>
                <h3 className="text-sm font-bold font-display text-white mb-2">{stage.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{stage.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 4: LOCAL SEO & REGIONAL IMPACT */}
      <div className="glass-card rounded-3xl p-8 sm:p-12 border border-emerald-500/20 bg-gradient-to-r from-[#060c10] via-[#090b14] to-[#0a0718] space-y-6">
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-widest">
          <Building2 className="w-4 h-4" /> REGIONAL & ACADEMIC FOOTPRINT
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-white">
          DRIVING TECH INNOVATION IN RAHIM YAR KHAN, PAKISTAN
        </h2>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-4xl">
          Based in Rahim Yar Khan, South Punjab, Hanan Irfan represents a rising generation of Pakistani software engineers and tech entrepreneurs. At KFUEIT (Khwaja Fareed University of Engineering and Information Technology), he actively builds practical software, conducts technical SEO research, and mentors aspiring developers in web development and open-source software tools.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 font-mono text-xs text-slate-300">
          <div className="p-4 rounded-xl bg-white/5 border border-white/5">
            <span className="text-emerald-400 block font-bold mb-1">LOCAL IMPACT</span>
            <span>Building SEO-optimized platforms & tools for regional tech growth.</span>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/5">
            <span className="text-cyan-400 block font-bold mb-1">KFUEIT COMMUNITY</span>
            <span>Active BSCS student collaborating on university & indie tech projects.</span>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/5">
            <span className="text-purple-400 block font-bold mb-1">GLOBAL REACH</span>
            <span>Deploying cloud applications on Vercel accessed globally.</span>
          </div>
        </div>
      </div>

      {/* SECTION 5: AEO / GEO SEARCH ENGINES FAQ */}
      <div className="glass-card rounded-3xl p-8 sm:p-12 border border-purple-500/20 space-y-8">
        <div className="space-y-2">
          <span className="text-xs font-mono text-purple-400 uppercase tracking-widest flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4" /> ANSWER ENGINE OPTIMIZATION (AEO & GEO)
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-white">
            FREQUENTLY ASKED QUESTIONS ABOUT HANAN IRFAN
          </h2>
          <p className="text-xs text-slate-400">
            Structured information for search engines, AI models, and visitors.
          </p>
        </div>

        <div className="space-y-3">
          {AEO_FAQS.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="border border-white/10 rounded-2xl overflow-hidden bg-[#0a0c16]/80 transition-all"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between font-display font-bold text-sm sm:text-base text-white hover:text-purple-300 transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <span className="text-xs font-mono text-purple-400">0{idx + 1}</span>
                    <span>{faq.question}</span>
                  </span>
                  <ChevronDown className={`w-4 h-4 text-purple-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 6: PHILOSOPHY & WORK ETHIC */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-card rounded-3xl p-8 border border-white/10 space-y-4">
          <span className="text-xs font-mono text-purple-400 uppercase tracking-widest">// ENGINEERING PHILOSOPHY</span>
          <h3 className="text-xl sm:text-2xl font-bold font-display text-white">Clean Code & High Performance</h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Every software product built by Hanan Irfan prioritizes maintainability, explicit TypeScript types, fast server render cycles, and clean component architecture. Code quality is never sacrificed for superficial shortcuts.
          </p>
        </div>
        <div className="glass-card rounded-3xl p-8 border border-white/10 space-y-4">
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">// DESIGN & USER EXPERIENCE</span>
          <h3 className="text-xl sm:text-2xl font-bold font-display text-white">Pixel-Perfect & Human Centric</h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            A aesthetic interface is useless if it's confusing. Combining graphic design expertise with modern Tailwind CSS and motion design, Hanan creates interfaces that feel fluid, responsive, accessible, and intuitive.
          </p>
        </div>
      </div>

      {/* SECTION 7: CALL TO ACTION */}
      <div className="glass-card rounded-3xl p-8 sm:p-12 border border-purple-500/30 text-center bg-gradient-to-r from-purple-900/30 via-[#0a0c16] to-indigo-900/30 space-y-6">
        <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-white">
          WANT TO WORK TOGETHER OR DISCUSS A PROJECT?
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
          Hanan Irfan is available for custom web development, technical SEO audits, SaaS engineering, and technology consultation.
        </p>
        <div className="pt-2">
          <button
            onClick={() => onNavigate('contact')}
            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-display font-extrabold text-xs tracking-wider shadow-xl shadow-purple-600/30 hover:scale-105 transition-all inline-flex items-center gap-2"
          >
            <span>GET IN TOUCH WITH HANAN</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
};
