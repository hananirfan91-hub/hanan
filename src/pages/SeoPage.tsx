import React, { useState } from 'react';
import { PageId } from '../types';
import { PERSONAL_INFO } from '../data/portfolioData';
import {
  Search,
  TrendingUp,
  Target,
  BarChart3,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Shield,
  Zap,
  Mail,
} from 'lucide-react';

interface SeoPageProps {
  onNavigate: (page: PageId) => void;
}

export const SeoPage: React.FC<SeoPageProps> = ({ onNavigate }) => {
  const [auditDomain, setAuditDomain] = useState('');
  const [auditMessage, setAuditMessage] = useState('');

  const handleAuditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!auditDomain.trim()) return;
    setAuditMessage(
      `Ready: share ${auditDomain.trim()} via ${PERSONAL_INFO.email} or X (@hananirfan91) so Hanan Irfan can prepare a technical SEO, AEO & GEO review.`
    );
  };

  const seoCapabilities = [
    {
      title: 'Technical SEO Architecture',
      desc: 'XML sitemaps, robots.txt rules, canonical URLs, Core Web Vitals optimization, and clean crawl indexing.',
      icon: Zap,
    },
    {
      title: 'Answer Engine Optimization (AEO)',
      desc: 'Direct-answer section formatting, FAQ structuring, and clear entity signals designed for answer engines.',
      icon: Target,
    },
    {
      title: 'Generative Engine Optimization (GEO)',
      desc: 'Structured Schema.org graphs, verifiable facts, and citation-ready authority signals for AI search discovery.',
      icon: TrendingUp,
    },
    {
      title: 'Keyword Research & Clustering',
      desc: 'Search intent mapping, semantic topic clusters, and structured internal linking plans across content pillars.',
      icon: Search,
    },
    {
      title: 'Content Strategy',
      desc: 'Editorial topic planning, readable heading hierarchy (H1–H3), and helpful content designed for real readers.',
      icon: BarChart3,
    },
    {
      title: 'Local SEO & Search Console',
      desc: 'Google Business Profile accuracy, regional metadata for Rahim Yar Khan & global markets, and index diagnostics.',
      icon: Shield,
    },
  ];

  const encodedSubject = encodeURIComponent(
    auditDomain.trim()
      ? `SEO / AEO / GEO Review Request: ${auditDomain.trim()}`
      : 'SEO / AEO / GEO Consultation Request'
  );
  const encodedBody = encodeURIComponent(
    auditDomain.trim()
      ? `Hi Hanan,\n\nI would like to request a technical SEO, AEO, and GEO review for: ${auditDomain.trim()}\n\nGoals & timeline:\n`
      : `Hi Hanan,\n\nI would like to discuss SEO, AEO, and GEO strategy.\n`
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#94A3B8]">
          <span className="font-semibold text-emerald-400 uppercase tracking-wider">
            Search, Answer &amp; Generative Optimization
          </span>
          <span aria-hidden="true">&middot;</span>
          <span>SEO &bull; AEO &bull; GEO</span>
        </div>

        <h1 className="text-3xl sm:text-6xl font-black font-display text-[#F8FAFC] tracking-tight leading-tight">
          SEO, AEO &amp; GEO Strategy
        </h1>

        <p className="text-[#94A3B8] text-base sm:text-lg max-w-3xl leading-relaxed">
          {PERSONAL_INFO.name} provides Technical SEO, Answer Engine Optimization (AEO), Generative Engine Optimization (GEO), keyword research &amp; clustering, and content strategy from {PERSONAL_INFO.location}.
        </p>

        <div className="pt-2 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => onNavigate('contact')}
            className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-[#F8FAFC] font-semibold text-xs tracking-wide transition-colors inline-flex items-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" /> Request SEO Consultation
          </button>
          <a
            href="#seo-audit-intake"
            className="px-6 py-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-[#F8FAFC] border border-white/[0.12] text-xs font-mono font-semibold inline-flex items-center gap-2 transition-colors"
          >
            Request Site Review <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Overview */}
      <section className="surface-card rounded-3xl p-7 sm:p-10 space-y-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-[#F8FAFC]">
          Built for Search Engines and Modern Answer Engines
        </h2>
        <p className="text-[#94A3B8] text-sm sm:text-base leading-relaxed max-w-4xl">
          Sustainable search visibility depends on clean engineering, accurate structured metadata, and genuinely helpful content — not shortcuts. Every engagement focuses on verifiable technical improvements and clear editorial architecture.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-2">
          {[
            'Technical SEO Audits & Crawl Health',
            'Answer Engine Optimization (AEO) Formatting',
            'Generative Engine Optimization (GEO) Entity Markup',
            'Keyword Research & Semantic Topic Clustering',
            'Content Strategy & Internal Linking Maps',
            'Google Search Console Index Diagnostics',
          ].map((item) => (
            <div
              key={item}
              className="flex items-center gap-3 p-3.5 rounded-xl bg-[#0D1425]/80 border border-white/[0.1] text-[#F8FAFC]/90 text-xs font-medium"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Capabilities Grid */}
      <section className="space-y-8">
        <div className="space-y-2">
          <span className="text-xs font-mono font-semibold text-[#3B82F6] uppercase tracking-wider">
            Optimization Pillars
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-[#F8FAFC]">
            Core Search &amp; Content Disciplines
          </h2>
          <p className="text-[#94A3B8] text-sm">
            Practical search engineering applied across independent ventures and client sites.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {seoCapabilities.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="surface-card surface-card-hover rounded-2xl p-6 space-y-4 group"
              >
                <div className="w-11 h-11 rounded-xl bg-emerald-500/15 border border-emerald-400/30 flex items-center justify-center text-emerald-400">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold font-display text-[#F8FAFC] group-hover:text-emerald-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-[#94A3B8] text-xs leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Audit Intake Section */}
      <section
        id="seo-audit-intake"
        className="surface-card rounded-3xl p-7 sm:p-10 space-y-5"
      >
        <div className="space-y-2">
          <span className="text-xs font-mono font-semibold text-emerald-400 uppercase tracking-wider">
            Site Review Brief
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-[#F8FAFC]">
            Prepare a Technical SEO, AEO &amp; GEO Review
          </h2>
          <p className="text-[#94A3B8] text-xs sm:text-sm max-w-2xl">
            Enter your website URL below to generate a pre-filled email draft or jump to direct contact channels.
          </p>
        </div>

        <form onSubmit={handleAuditSubmit} className="flex flex-col sm:flex-row gap-3 max-w-2xl">
          <input
            type="url"
            required
            aria-label="Website URL"
            placeholder="https://yourwebsite.com"
            value={auditDomain}
            onChange={(e) => setAuditDomain(e.target.value)}
            className="flex-1 px-4 py-3 rounded-xl bg-[#0D1425]/90 border border-white/[0.12] text-[#F8FAFC] placeholder-[#94A3B8]/70 focus:outline-none focus:border-emerald-400 text-xs sm:text-sm"
          />
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-[#F8FAFC] font-semibold text-xs tracking-wide transition-colors shrink-0 inline-flex items-center justify-center gap-2 cursor-pointer"
          >
            Prepare Brief <Search className="w-4 h-4" />
          </button>
        </form>

        {auditMessage && (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-400/30 max-w-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <p className="text-xs font-mono text-emerald-300 leading-relaxed">{auditMessage}</p>
            <div className="flex items-center gap-2 shrink-0">
              <a
                href={`mailto:${PERSONAL_INFO.email}?subject=${encodedSubject}&body=${encodedBody}`}
                className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-[#F8FAFC] text-xs font-semibold inline-flex items-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Send Email</span>
              </a>
              <button
                type="button"
                onClick={() => onNavigate('contact')}
                className="px-4 py-2 rounded-lg bg-white/[0.08] hover:bg-white/[0.14] border border-white/[0.12] text-[#F8FAFC] text-xs font-semibold cursor-pointer"
              >
                Contact Channels
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Bottom Summary CTA */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <span className="text-xs font-mono font-semibold text-emerald-400 uppercase tracking-wider">
            Why Engineering + SEO Matters
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-[#F8FAFC]">
            Code-Level Search &amp; Content Alignment
          </h3>
          <p className="text-[#94A3B8] text-sm leading-relaxed">
            Combining full-stack frontend development with technical SEO, keyword clustering, AEO, and GEO eliminates the gap between recommendations and actual implementation.
          </p>
        </div>

        <div className="surface-card rounded-3xl p-8 space-y-4 border-emerald-400/30 bg-gradient-to-br from-emerald-500/10 via-white/[0.04] to-[#3B82F6]/10">
          <h3 className="text-xl font-bold font-display text-[#F8FAFC]">
            Ready to Strengthen Your Search Visibility?
          </h3>
          <p className="text-[#94A3B8] text-xs sm:text-sm leading-relaxed">
            Connect directly with {PERSONAL_INFO.name} via email or X to review site architecture, structured metadata, and content priorities.
          </p>
          <button
            type="button"
            onClick={() => onNavigate('contact')}
            className="w-full py-3.5 rounded-xl bg-[#3B82F6] hover:bg-[#2563EB] text-[#F8FAFC] font-semibold text-xs tracking-wide transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            Contact Hanan Irfan <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
