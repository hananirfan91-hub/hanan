import React, { useState } from 'react';
import { PageId } from '../types';
import { SplitTextReveal } from '../components/animations/SplitTextReveal';
import { Search, TrendingUp, Target, BarChart3, CheckCircle2, ArrowRight, Sparkles, Shield, Zap } from 'lucide-react';

interface SeoPageProps {
  onNavigate: (page: PageId) => void;
}

export const SeoPage: React.FC<SeoPageProps> = ({ onNavigate }) => {
  const [auditDomain, setAuditDomain] = useState('');
  const [auditMessage, setAuditMessage] = useState('');

  const handleAuditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!auditDomain.trim()) return;
    setAuditMessage(`Initial technical check initiated for ${auditDomain}. Hanan Irfan will review your site strategy! Redirecting to contact page...`);
    setTimeout(() => {
      onNavigate('contact');
    }, 2000);
  };

  const seoCapabilities = [
    {
      title: 'Local SEO Expert in Rahim Yar Khan',
      desc: 'Google Business Profile setup, local citation building, and geo-targeted keywords to rank your local shop or service business #1 in Rahim Yar Khan search results.',
      icon: Target
    },
    {
      title: 'Technical SEO Expert in RYK',
      desc: 'Schema markup implementation, XML sitemaps, robots.txt configuration, Core Web Vitals optimization, and crawl error fixes for seamless search indexing.',
      icon: Zap
    },
    {
      title: 'Google Ranking Expert in Rahim Yar Khan',
      desc: 'On-page SEO optimization including targeted H1/H2 keyword placement, high-converting meta descriptions, canonical URLs, and internal linking structures.',
      icon: TrendingUp
    },
    {
      title: 'SEO Consultant in Rahim Yar Khan',
      desc: 'In-depth SEO audits, competitor analysis, keyword research, and actionable roadmap reports designed to dominate search engine results pages (SERPs).',
      icon: Search
    },
    {
      title: 'Website SEO Expert in RYK',
      desc: 'Combining technical site speed engineering with content strategy to turn organic search traffic into active paying customers.',
      icon: BarChart3
    },
    {
      title: 'Local SEO Specialist in RYK',
      desc: 'Building local domain authority through localized backlinks, Google Maps pack optimization, and customer review strategy for RYK businesses.',
      icon: Shield
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* HEADER SECTION */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">// SPECIALIZED SERVICE</span>
          <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-mono border border-cyan-500/30">
            SEARCH ENGINE OPTIMIZATION
          </span>
        </div>

        <SplitTextReveal
          text="SEO Expert in Rahim Yar Khan & Local SEO Specialist in RYK"
          as="h1"
          className="text-3xl sm:text-6xl font-black font-display text-white tracking-wide text-glow leading-tight"
        />

        <p className="text-slate-300 text-base sm:text-lg max-w-3xl leading-relaxed">
          Need a trusted <strong>SEO Expert in Rahim Yar Khan</strong> or <strong>SEO Specialist in RYK</strong>? Hanan Irfan provides top-tier <strong>SEO Services in Rahim Yar Khan</strong> and <strong>SEO Services in RYK</strong> to increase organic traffic, climb Google rankings, and dominate local search.
        </p>

        <div className="pt-2 flex flex-wrap gap-3">
          <button
            onClick={() => onNavigate('contact')}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-display font-bold text-xs tracking-wider shadow-xl shadow-cyan-600/30 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" /> HIRE SEO EXPERT IN RYK
          </button>
          <a
            href="#free-seo-audit"
            className="px-6 py-3 rounded-2xl glass-card text-slate-300 hover:text-white border border-white/10 hover:border-cyan-500/40 text-xs font-mono flex items-center gap-2"
          >
            GET FREE SEO AUDIT <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* OVERVIEW SECTION */}
      <section className="glass-card rounded-3xl p-8 sm:p-12 border border-cyan-500/30 bg-gradient-to-br from-[#0a1120] via-[#070b16] to-[#0b1629] space-y-6">
        <h2 className="text-2xl sm:text-4xl font-bold font-display text-white">
          SEO Specialist in Rahim Yar Khan — Google Ranking &amp; Technical SEO
        </h2>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          As a dedicated <strong>SEO Specialist in Rahim Yar Khan</strong> and <strong>Technical SEO Expert in RYK</strong>, I help local enterprises, online stores, and global SaaS products capture organic search share. My data-driven <strong>SEO Optimization Services in RYK</strong> ensure sustainable search engine growth without black-hat risks.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
          {[
            'Local SEO Expert in Rahim Yar Khan Google Map Pack',
            'Technical SEO Expert in RYK Speed & Indexing',
            'SEO Optimization Services in RYK Keyword Targeting',
            'Google Ranking Expert in Rahim Yar Khan Strategy',
            'Local SEO Services in Rahim Yar Khan Citations',
            'Website SEO Expert in RYK Conversion Rate Optimization'
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10 text-slate-200 text-xs font-medium">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CAPABILITIES GRID */}
      <section className="space-y-8">
        <div className="space-y-2">
          <span className="text-xs font-mono text-purple-400 uppercase tracking-widest">// SEO SERVICE MODULES</span>
          <h2 className="text-2xl sm:text-4xl font-bold font-display text-white">
            SEO Services in Rahim Yar Khan &amp; SEO Services in RYK
          </h2>
          <p className="text-slate-400 text-sm">
            End-to-end search engine optimization provided by <strong>Freelance SEO Expert in Rahim Yar Khan</strong>.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {seoCapabilities.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="glass-card rounded-2xl p-6 border border-white/10 hover:border-cyan-500/50 hover:bg-white/[0.03] transition-all space-y-4 group"
              >
                <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-300 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold font-display text-white group-hover:text-cyan-300 transition-colors">
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

      {/* INTERACTIVE FREE SEO AUDIT TOOL */}
      <section id="free-seo-audit" className="glass-card rounded-3xl p-8 sm:p-12 border border-cyan-500/30 bg-black/40 space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">// FREE WEBSITE SEO AUDIT</span>
          <h2 className="text-2xl sm:text-4xl font-bold font-display text-white">
            Request an Instant SEO Audit by Freelance SEO Expert in RYK
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl">
            Enter your website URL below to request a detailed technical SEO analysis from <strong>Freelance SEO Expert in RYK</strong> Hanan Irfan.
          </p>
        </div>

        <form onSubmit={handleAuditSubmit} className="flex flex-col sm:flex-row gap-3 max-w-2xl">
          <input
            type="url"
            required
            placeholder="https://yourwebsite.com"
            value={auditDomain}
            onChange={(e) => setAuditDomain(e.target.value)}
            className="flex-1 px-4 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 text-xs sm:text-sm"
          />
          <button
            type="submit"
            className="px-6 py-3.5 rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-white font-display font-bold text-xs tracking-wider shadow-lg shadow-cyan-600/30 transition-all shrink-0 flex items-center justify-center gap-2"
          >
            RUN SEO CHECK <Search className="w-4 h-4" />
          </button>
        </form>

        {auditMessage && (
          <p className="text-xs font-mono text-cyan-300 bg-cyan-950/40 border border-cyan-500/30 p-3 rounded-xl max-w-2xl">
            {auditMessage}
          </p>
        )}
      </section>

      {/* FREELANCE SEO SECTION */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">// WHY HIRE HANAN IRFAN FOR SEO</span>
          <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">
            Freelance SEO Expert in Rahim Yar Khan &amp; Local SEO Services
          </h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            As a certified <strong>SEO Consultant in Rahim Yar Khan</strong>, I don't just increase traffic — I focus on getting high-intent local customers to your website. Combining <strong>Local SEO Services in Rahim Yar Khan</strong> with technical optimizations gives your brand a permanent digital advantage.
          </p>
        </div>

        <div className="glass-card rounded-3xl p-8 border border-white/10 space-y-4">
          <h3 className="text-xl font-bold font-display text-white">
            Ready to Rank #1 on Google in Rahim Yar Khan?
          </h3>
          <p className="text-slate-400 text-xs leading-relaxed">
            Connect directly with <strong>SEO Expert in Rahim Yar Khan</strong> Hanan Irfan for customized monthly SEO growth strategies.
          </p>
          <button
            onClick={() => onNavigate('contact')}
            className="w-full py-3.5 rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-white font-display font-bold text-xs tracking-wider shadow-lg shadow-cyan-600/30 transition-all flex items-center justify-center gap-2"
          >
            CONTACT SEO EXPERT NOW <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

    </div>
  );
};
