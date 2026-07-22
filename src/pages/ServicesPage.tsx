import React from 'react';
import { motion } from 'motion/react';
import { PageId } from '../types';
import { SERVICES } from '../data/portfolioData';
import { SplitTextReveal } from '../components/animations/SplitTextReveal';
import { Parallax3DCard } from '../components/animations/Parallax3DCard';
import { Check, Sparkles, ArrowUpRight, Layout, Code, Globe, Search, Palette, Zap, Cpu, ShieldCheck, Clock, Terminal, Rocket } from 'lucide-react';

interface ServicesPageProps {
  onNavigate: (page: PageId) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate }) => {
  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Layout': return <Layout className="w-6 h-6 text-purple-400" />;
      case 'Code': return <Code className="w-6 h-6 text-cyan-400" />;
      case 'Globe': return <Globe className="w-6 h-6 text-indigo-400" />;
      case 'Search': return <Search className="w-6 h-6 text-amber-400" />;
      case 'Palette': return <Palette className="w-6 h-6 text-pink-400" />;
      case 'Zap': return <Zap className="w-6 h-6 text-emerald-400" />;
      case 'Cpu': return <Cpu className="w-6 h-6 text-sky-400" />;
      default: return <Sparkles className="w-6 h-6 text-purple-400" />;
    }
  };

  const serviceWorkflow = [
    { step: '01', title: 'DISCOVER & AUDIT', desc: 'Understanding project goals, target user intent, wireframes, and technical specifications.' },
    { step: '02', title: 'ARCHITECT & DESIGN', desc: 'Designing high-contrast UI/UX layouts, database schemas, and API end-points.' },
    { step: '03', title: 'DEVELOP & INTEGRATE', desc: 'Writing clean TypeScript, React/Next.js components, database models, and animations.' },
    { step: '04', title: 'SEO & SPEED AUDIT', desc: 'Optimizing Core Web Vitals, Schema.org markup, meta tags, and mobile responsiveness.' },
    { step: '05', title: 'DEPLOY & LAUNCH', desc: 'Deploying production builds to Vercel/Netlify with SSL, CI/CD, and custom domain mapping.' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      
      {/* SECTION 1: HEADER */}
      <div className="space-y-4">
        <span className="text-xs font-mono text-purple-400 uppercase tracking-widest">// DIGITAL SOLUTIONS</span>
        <SplitTextReveal
          text="TECHNICAL SERVICES"
          as="h1"
          className="text-4xl sm:text-7xl font-black font-display text-white tracking-wide text-glow"
        />
        <p className="text-slate-300 text-base sm:text-lg max-w-3xl leading-relaxed">
          Comprehensive full-stack development, technical SEO, digital product design, and AI integrations engineered for performance, indexing, and user engagement.
        </p>
      </div>

      {/* SECTION 2: SERVICES GRID (7 DETAILED SERVICES) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {SERVICES.map((service) => (
          <motion.div
            key={service.id}
            whileHover={{ y: -6 }}
            className="group glass-card rounded-3xl p-8 border border-white/10 hover:border-purple-500/40 bg-[#090b14] transition-all flex flex-col justify-between"
          >
            <div className="space-y-6">
              
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-purple-500/10 border border-purple-500/20">
                    {getServiceIcon(service.iconName)}
                  </div>
                  <span className="text-xs font-mono text-purple-400 font-extrabold">
                    SERVICE {service.number}
                  </span>
                </div>
              </div>

              <h2 className="text-2xl font-extrabold font-display text-white group-hover:text-purple-300 transition-colors">
                {service.title}
              </h2>

              <p className="text-slate-300 text-sm leading-relaxed">
                {service.fullDesc}
              </p>

              {/* Deliverables Checklist */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-mono text-purple-400 uppercase tracking-wider block">
                  // DELIVERABLES & FEATURES
                </span>
                <div className="space-y-2">
                  {service.deliverables.map((deliv, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <Check className="w-3.5 h-3.5 text-purple-400 mt-0.5 shrink-0" />
                      <span>{deliv}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            <div className="pt-8 border-t border-white/10 mt-8">
              <button
                onClick={() => onNavigate('contact')}
                className="w-full py-3 rounded-2xl bg-purple-600/20 hover:bg-purple-600 border border-purple-500/40 text-purple-200 hover:text-white font-display font-bold text-xs tracking-wider transition-all flex items-center justify-center gap-2"
              >
                <span>REQUEST THIS SERVICE</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* SECTION 3: 5-STEP WORKFLOW METHODOLOGY */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono text-purple-400 uppercase tracking-widest">// PROCESS & EXECUTION</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-wide">
            5-STAGE SERVICE WORKFLOW
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            How Hanan transforms client ideas into live, high-performing digital applications.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {serviceWorkflow.map((wf, idx) => (
            <div key={idx} className="glass-card rounded-2xl p-5 border border-white/10 space-y-3 bg-[#080a14]">
              <span className="text-xs font-mono font-bold text-purple-400 px-2.5 py-0.5 rounded-md bg-purple-500/10 border border-purple-500/20">
                STEP {wf.step}
              </span>
              <h3 className="text-sm font-bold font-display text-white">{wf.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{wf.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 4: SERVICE SLA & QUALITY GUARANTEES */}
      <div className="glass-card rounded-3xl p-8 sm:p-12 border border-purple-500/20 bg-gradient-to-r from-[#070912] via-[#090b16] to-[#0c0a1b] space-y-6">
        <span className="text-xs font-mono text-purple-400 uppercase tracking-widest">// QUALITY STANDARDS</span>
        <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-white">
          WHY CLIENTS TRUST HANAN IRFAN
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <ShieldCheck className="w-6 h-6 text-purple-400" />
            <h3 className="text-lg font-bold font-display text-white">100% Code Ownership</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Full access to clean GitHub repositories, documentation, and deployment guides without lock-in.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <Clock className="w-6 h-6 text-cyan-400" />
            <h3 className="text-lg font-bold font-display text-white">Rapid SLA & Milestones</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Transparent project updates, clear delivery schedules, and continuous testing cycles.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <Zap className="w-6 h-6 text-emerald-400" />
            <h3 className="text-lg font-bold font-display text-white">Core Web Vitals Guarantee</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Every delivered web application is optimized for Google PageSpeed 90+ performance.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 5: CALL TO ACTION */}
      <div className="glass-card rounded-3xl p-8 sm:p-12 border border-purple-500/30 text-center bg-gradient-to-r from-purple-900/30 via-[#0a0c16] to-indigo-900/30 space-y-6">
        <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-white">
          READY TO START YOUR SERVICE ENGAGEMENT?
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
          Send Hanan details about your project, website, or SaaS requirements to receive a customized scope & proposal.
        </p>
        <div className="pt-2">
          <button
            onClick={() => onNavigate('contact')}
            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-display font-extrabold text-xs tracking-wider shadow-xl shadow-purple-600/30 hover:scale-105 transition-all inline-flex items-center gap-2"
          >
            <Rocket className="w-4 h-4" />
            <span>REQUEST A CUSTOM QUOTE</span>
          </button>
        </div>
      </div>

    </div>
  );
};
