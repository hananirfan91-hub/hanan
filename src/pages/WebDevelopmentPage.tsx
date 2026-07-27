import React from 'react';
import { PageId } from '../types';
import { SplitTextReveal } from '../components/animations/SplitTextReveal';
import { Code2, Globe, Cpu, Layout, CheckCircle2, ArrowRight, Sparkles, Server, Zap } from 'lucide-react';

interface WebDevelopmentPageProps {
  onNavigate: (page: PageId) => void;
}

export const WebDevelopmentPage: React.FC<WebDevelopmentPageProps> = ({ onNavigate }) => {
  const capabilities = [
    {
      title: 'Full Stack Developer in Rahim Yar Khan',
      desc: 'Complete end-to-end web architectures built using React, Next.js, Node.js, and TypeScript. Robust backend APIs and modern interfaces for businesses in RYK.',
      icon: Code2
    },
    {
      title: 'Front End Developer in RYK',
      desc: 'Pixel-perfect, high-performance UI engineering with Tailwind CSS and Framer Motion. Lightning fast page loads with clean component structures.',
      icon: Layout
    },
    {
      title: 'Backend Developer in Rahim Yar Khan',
      desc: 'Secure server-side API integration, REST services, database architecture, and authentication systems designed for scalable client operations.',
      icon: Server
    },
    {
      title: 'React Developer in Rahim Yar Khan',
      desc: 'Interactive Single Page Applications (SPAs) and dynamic web platforms engineered with modular React components and state management.',
      icon: Cpu
    },
    {
      title: 'WordPress Website Developer in RYK',
      desc: 'Custom WordPress theme customization, WooCommerce online stores, speed optimization, and CMS management for local business growth.',
      icon: Globe
    },
    {
      title: 'Responsive Website Developer in RYK',
      desc: 'Mobile-first design principles ensuring flawless rendering across mobile, tablet, laptop, and desktop viewports.',
      icon: Zap
    }
  ];

  const featuresList = [
    'Custom React & Next.js Web App Development',
    'WordPress Developer in Rahim Yar Khan Solutions',
    'Speed & Performance Optimization (100/100 Lighthouse)',
    'E-Commerce & Payment Gateway Integration',
    'Responsive Website Developer in RYK Mobile Compatibility',
    'Clean Code & SEO-Friendly Semantic HTML'
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* HEADER SECTION */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-purple-400 uppercase tracking-widest">// SPECIALIZED SERVICE</span>
          <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-mono border border-purple-500/30">
            RAHIM YAR KHAN (RYK)
          </span>
        </div>

        <SplitTextReveal
          text="Web Development Services in Rahim Yar Khan"
          as="h1"
          className="text-3xl sm:text-6xl font-black font-display text-white tracking-wide text-glow leading-tight"
        />

        <p className="text-slate-300 text-base sm:text-lg max-w-3xl leading-relaxed">
          Looking for a <strong>Web Developer in Rahim Yar Khan</strong> or <strong>Web Developer in RYK</strong>? Hanan Irfan provides custom <strong>Website Development Services in RYK</strong>, building fast, modern, and SEO-optimized web applications for local and international clients.
        </p>

        <div className="pt-2 flex flex-wrap gap-3">
          <button
            onClick={() => onNavigate('contact')}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-display font-bold text-xs tracking-wider shadow-xl shadow-purple-600/30 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" /> HIRE WEB DEVELOPER IN RYK
          </button>
          <button
            onClick={() => onNavigate('projects')}
            className="px-6 py-3 rounded-2xl glass-card text-slate-300 hover:text-white border border-white/10 hover:border-purple-500/40 text-xs font-mono flex items-center gap-2"
          >
            VIEW WEB PROJECTS <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* OVERVIEW SECTION */}
      <section className="glass-card rounded-3xl p-8 sm:p-12 border border-purple-500/30 bg-gradient-to-br from-[#0c0e1e] via-[#080a18] to-[#0d1024] space-y-6">
        <h2 className="text-2xl sm:text-4xl font-bold font-display text-white">
          Professional Web Developer in RYK &amp; Rahim Yar Khan
        </h2>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          As a premier <strong>Website Developer in Rahim Yar Khan</strong> and experienced <strong>Full Stack Developer in RYK</strong>, I specialize in crafting bespoke digital experiences that drive real business results. Whether you need a corporate business website, a SaaS web platform, or a responsive WooCommerce store, my <strong>Website Development in Rahim Yar Khan</strong> guarantees maximum speed, security, and top search engine rankings.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
          {featuresList.map((feat, i) => (
            <div key={i} className="flex items-center gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10 text-slate-200 text-xs font-medium">
              <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
              <span>{feat}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CAPABILITIES & SERVICES GRID */}
      <section className="space-y-8">
        <div className="space-y-2">
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">// CORE SPECIALIZATIONS</span>
          <h2 className="text-2xl sm:text-4xl font-bold font-display text-white">
            Website Development Services in RYK
          </h2>
          <p className="text-slate-400 text-sm">
            Comprehensive development packages delivered by a <strong>Freelance Web Developer in Rahim Yar Khan</strong>.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="glass-card rounded-2xl p-6 border border-white/10 hover:border-purple-500/50 hover:bg-white/[0.03] transition-all space-y-4 group"
              >
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-300 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold font-display text-white group-hover:text-purple-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-300 text-xs leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* DETAILED SERVICE BREAKDOWN */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <span className="text-xs font-mono text-purple-400 uppercase tracking-widest">// WHY WORK WITH HANAN IRFAN</span>
          <h2 className="text-2xl sm:text-4xl font-bold font-display text-white">
            Freelance Web Developer in RYK
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Working as a <strong>Freelance Web Developer in Rahim Yar Khan</strong>, I handle every phase of website development personally — from initial wireframing to production deployment and technical support. Every site built by a <strong>Professional Web Developer in RYK</strong> includes:
          </p>
          <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-purple-400 mt-2 shrink-0" />
              <span><strong>React Developer in Rahim Yar Khan:</strong> Built with cutting-edge UI frameworks for modern interactive web applications.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-cyan-400 mt-2 shrink-0" />
              <span><strong>WordPress Developer in Rahim Yar Khan:</strong> User-friendly content management systems tailored for client independence.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-indigo-400 mt-2 shrink-0" />
              <span><strong>Full Stack Developer in Rahim Yar Khan:</strong> Complete database, server API, and client-side web synchronization.</span>
            </li>
          </ul>
        </div>

        <div className="glass-card rounded-3xl p-8 border border-white/10 space-y-6 bg-black/40">
          <h3 className="text-xl font-bold font-display text-white">
            Website Developer in Rahim Yar Khan — Custom Quote
          </h3>
          <p className="text-slate-400 text-xs leading-relaxed">
            Ready to launch your project with a top-rated <strong>Website Developer in Rahim Yar Khan</strong>? Contact Hanan Irfan today for a free project timeline and technical strategy proposal.
          </p>
          <button
            onClick={() => onNavigate('contact')}
            className="w-full py-3.5 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-display font-bold text-xs tracking-wider shadow-lg shadow-purple-600/30 transition-all flex items-center justify-center gap-2"
          >
            REQUEST FREE CONSULTATION <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

    </div>
  );
};
