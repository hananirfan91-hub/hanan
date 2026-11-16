import React from 'react';
import { PageId } from '../types';
import { PERSONAL_INFO } from '../data/portfolioData';
import {
  Code2,
  Globe,
  Cpu,
  Layout,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Server,
  Zap,
} from 'lucide-react';

interface WebDevelopmentPageProps {
  onNavigate: (page: PageId) => void;
}

export const WebDevelopmentPage: React.FC<WebDevelopmentPageProps> = ({ onNavigate }) => {
  const capabilities = [
    {
      title: 'Full-Stack Web Engineering',
      desc: 'End-to-end web architectures built with React, Next.js, TypeScript, REST APIs, Firebase, and Supabase PostgreSQL.',
      icon: Code2,
    },
    {
      title: 'Frontend UI Engineering',
      desc: 'Responsive, high-contrast user interfaces with Tailwind CSS, clean component composition, and accessible navigation.',
      icon: Layout,
    },
    {
      title: 'Backend & Data Integrations',
      desc: 'Structured database schemas, validation workflows, and role-based application access tailored to practical needs.',
      icon: Server,
    },
    {
      title: 'React & TypeScript SPAs',
      desc: 'Maintainable single-page applications and multi-view dashboards engineered with strict TypeScript contracts.',
      icon: Cpu,
    },
    {
      title: 'WordPress & CMS Performance',
      desc: 'Custom Astra layouts, clean permalink hierarchy, asset compression, and practical publishing workflows.',
      icon: Globe,
    },
    {
      title: 'Mobile-First & PWA Readiness',
      desc: 'Responsive layouts tested across phones, tablets, and desktops with offline-resilient PWA support.',
      icon: Zap,
    },
  ];

  const featuresList = [
    'Custom React, Next.js & TypeScript web applications',
    'WordPress & lightweight CMS implementations',
    'Core Web Vitals & bundle size optimization',
    'Database modeling with Supabase & Firebase',
    'Mobile-first responsive layouts & TWA compatibility',
    'Semantic HTML5 & Schema.org structured metadata',
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#94A3B8]">
          <span className="font-semibold text-[#3B82F6] uppercase tracking-wider">
            Web Development Practice
          </span>
          <span aria-hidden="true">&middot;</span>
          <span>{PERSONAL_INFO.location}</span>
        </div>

        <h1 className="text-3xl sm:text-6xl font-black font-display text-[#F8FAFC] tracking-tight leading-tight">
          Full-Stack &amp; Frontend Web Development
        </h1>

        <p className="text-[#94A3B8] text-base sm:text-lg max-w-3xl leading-relaxed">
          {PERSONAL_INFO.name} designs and builds fast, accessible, search-ready web applications using React, Next.js, TypeScript, Tailwind CSS, and WordPress for clients in Rahim Yar Khan and globally.
        </p>

        <div className="pt-2 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => onNavigate('contact')}
            className="px-6 py-3 rounded-xl bg-[#3B82F6] hover:bg-[#2563EB] text-[#F8FAFC] font-semibold text-xs tracking-wide transition-colors inline-flex items-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" /> Discuss a Web Project
          </button>
          <button
            type="button"
            onClick={() => onNavigate('projects')}
            className="px-6 py-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-[#F8FAFC] border border-white/[0.12] text-xs font-mono font-semibold inline-flex items-center gap-2 cursor-pointer transition-colors"
          >
            View Live Projects <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Overview */}
      <section className="surface-card rounded-3xl p-7 sm:p-10 space-y-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-[#F8FAFC]">
          Practical Engineering from Architecture to Deployment
        </h2>
        <p className="text-[#94A3B8] text-sm sm:text-base leading-relaxed max-w-4xl">
          Whether building an independent SaaS tool, an editorial platform like The Sports Room, or a responsive business website, every build prioritizes clean code maintainability, mobile ergonomics, and strong search visibility.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-2">
          {featuresList.map((feat) => (
            <div
              key={feat}
              className="flex items-center gap-3 p-3.5 rounded-xl bg-[#0D1425]/80 border border-white/[0.1] text-[#F8FAFC]/90 text-xs font-medium"
            >
              <CheckCircle2 className="w-4 h-4 text-[#3B82F6] shrink-0" />
              <span>{feat}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Capabilities Grid */}
      <section className="space-y-8">
        <div className="space-y-2">
          <span className="text-xs font-mono font-semibold text-[#3B82F6] uppercase tracking-wider">
            Core Specializations
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-[#F8FAFC]">
            Web Engineering Capabilities
          </h2>
          <p className="text-[#94A3B8] text-sm">
            Modern development stack tailored to clean performance and reliable scaling.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="surface-card surface-card-hover rounded-2xl p-6 space-y-4 group"
              >
                <div className="w-11 h-11 rounded-xl bg-[#3B82F6]/15 border border-[#3B82F6]/30 flex items-center justify-center text-[#3B82F6]">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold font-display text-[#F8FAFC] group-hover:text-[#3B82F6] transition-colors">
                  {item.title}
                </h3>
                <p className="text-[#94A3B8] text-xs leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Collaboration Card */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="space-y-5">
          <span className="text-xs font-mono font-semibold text-[#3B82F6] uppercase tracking-wider">
            Working Together
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-[#F8FAFC]">
            Direct Engineering &amp; Clear Communication
          </h2>
          <p className="text-[#94A3B8] text-sm sm:text-base leading-relaxed">
            Every project is handled personally from initial wireframing to deployment and post-launch checks:
          </p>
          <ul className="space-y-3 text-xs sm:text-sm text-[#94A3B8]">
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-[#3B82F6] mt-2 shrink-0" />
              <span>
                <strong className="text-[#F8FAFC]">React &amp; Next.js:</strong> Component-driven architectures designed for responsive speed and maintainability.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400 mt-2 shrink-0" />
              <span>
                <strong className="text-[#F8FAFC]">WordPress &amp; CMS:</strong> Clean theme setups structured for straightforward editorial updates.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-[#8B5CF6] mt-2 shrink-0" />
              <span>
                <strong className="text-[#F8FAFC]">Full-Stack Integrations:</strong> Connected databases, authentication flows, and structured SEO.
              </span>
            </li>
          </ul>
        </div>

        <div className="surface-card rounded-3xl p-8 space-y-5 border-[#3B82F6]/30 bg-gradient-to-br from-[#3B82F6]/10 via-white/[0.04] to-[#8B5CF6]/10">
          <h3 className="text-xl font-bold font-display text-[#F8FAFC]">
            Start a Web Development Scope
          </h3>
          <p className="text-[#94A3B8] text-xs sm:text-sm leading-relaxed">
            Share your project brief, timeline, or technical requirements via email or social channels to discuss architecture and next steps.
          </p>
          <button
            type="button"
            onClick={() => onNavigate('contact')}
            className="w-full py-3.5 rounded-xl bg-[#3B82F6] hover:bg-[#2563EB] text-[#F8FAFC] font-semibold text-xs tracking-wide transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            View Contact Channels <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
