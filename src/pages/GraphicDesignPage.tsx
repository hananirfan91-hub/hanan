import React, { useState } from 'react';
import { PageId } from '../types';
import { PERSONAL_INFO } from '../data/portfolioData';
import {
  Palette,
  Feather,
  Share2,
  Layers,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Image,
  ShieldCheck,
} from 'lucide-react';

interface GraphicDesignPageProps {
  onNavigate: (page: PageId) => void;
}

export const GraphicDesignPage: React.FC<GraphicDesignPageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'ALL' | 'LOGO' | 'SOCIAL' | 'BRANDING'>('ALL');

  const designServices = [
    {
      title: 'Logo & Mark Design',
      category: 'LOGO',
      desc: 'Clean, memorable vector logos, wordmarks, and geometric brand emblems built to scale from mobile icons to banners.',
      icon: Feather,
    },
    {
      title: 'Social Media Visuals',
      category: 'SOCIAL',
      desc: 'Consistent graphics, announcement cards, and editorial visuals tailored for LinkedIn, X, Instagram, and TikTok.',
      icon: Share2,
    },
    {
      title: 'Brand Identity Systems',
      category: 'BRANDING',
      desc: 'Cohesive color palettes, typography pairings, business stationery, and visual guidelines for digital-first teams.',
      icon: Palette,
    },
    {
      title: 'Campaign & Post Creatives',
      category: 'SOCIAL',
      desc: 'Clear product launch graphics and event announcements engineered for legibility on mobile screens.',
      icon: Image,
    },
    {
      title: 'UI & Product Visual Design',
      category: 'BRANDING',
      desc: 'Wireframes, component systems, and clean visual polish aligned with modern web and mobile accessibility standards.',
      icon: Layers,
    },
    {
      title: 'Digital Marketing Assets',
      category: 'ALL',
      desc: 'Web graphics, OpenGraph social share visuals, and custom illustrations tailored to your brand personality.',
      icon: ShieldCheck,
    },
  ];

  const filteredServices = designServices.filter(
    (s) => activeTab === 'ALL' || s.category === activeTab || s.category === 'ALL'
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#94A3B8]">
          <span className="font-semibold text-[#8B5CF6] uppercase tracking-wider">
            UI/UX &amp; Visual Design
          </span>
          <span aria-hidden="true">&middot;</span>
          <span>Brand Systems &amp; Creative Assets</span>
        </div>

        <h1 className="text-3xl sm:text-6xl font-black font-display text-[#F8FAFC] tracking-tight leading-tight">
          UI/UX &amp; Graphic Design
        </h1>

        <p className="text-[#94A3B8] text-base sm:text-lg max-w-3xl leading-relaxed">
          Clean interface systems, brand identities, logos, and social graphics crafted by {PERSONAL_INFO.name} with clear typography, contrast, and responsive precision.
        </p>

        <div className="pt-2 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => onNavigate('contact')}
            className="px-6 py-3 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-[#F8FAFC] font-semibold text-xs tracking-wide transition-colors inline-flex items-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" /> Discuss a Design Project
          </button>
          <button
            type="button"
            onClick={() => onNavigate('projects')}
            className="px-6 py-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-[#F8FAFC] border border-white/[0.12] text-xs font-mono font-semibold inline-flex items-center gap-2 cursor-pointer transition-colors"
          >
            View Portfolio Projects <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Overview */}
      <section className="surface-card rounded-3xl p-7 sm:p-10 space-y-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-[#F8FAFC]">
          Visual Clarity Across Web &amp; Social Channels
        </h2>
        <p className="text-[#94A3B8] text-sm sm:text-base leading-relaxed max-w-4xl">
          Strong visual design supports usability and credibility. From vector logos to responsive product UI kits and campus event creatives, every visual asset is designed for readability and consistency.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-2">
          {[
            'Vector logos & clean brand marks',
            'Social media & announcement graphics',
            'Brand typography & color palettes',
            'Mobile-first UI wireframes & layouts',
            'OpenGraph & web showcase banners',
            'Consistent cross-platform design kits',
          ].map((item) => (
            <div
              key={item}
              className="flex items-center gap-3 p-3.5 rounded-xl bg-[#0D1425]/80 border border-white/[0.1] text-[#F8FAFC]/90 text-xs font-medium"
            >
              <CheckCircle2 className="w-4 h-4 text-[#8B5CF6] shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Filter Categories & Services */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <span className="text-xs font-mono font-semibold text-[#8B5CF6] uppercase tracking-wider">
              Creative Scope
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-[#F8FAFC]">
              Design Services
            </h2>
          </div>

          <div className="flex flex-wrap gap-1.5 bg-[#0D1425]/90 p-1.5 rounded-2xl border border-white/[0.12]">
            {[
              { id: 'ALL', label: 'All' },
              { id: 'LOGO', label: 'Logo Design' },
              { id: 'SOCIAL', label: 'Social Media' },
              { id: 'BRANDING', label: 'Branding & UI' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as 'ALL' | 'LOGO' | 'SOCIAL' | 'BRANDING')}
                className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[#8B5CF6] text-[#F8FAFC] shadow-[0_0_20px_rgba(139,92,246,0.28)]'
                    : 'text-[#94A3B8] hover:text-[#F8FAFC]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="surface-card surface-card-hover rounded-2xl p-6 space-y-4 group"
              >
                <div className="w-11 h-11 rounded-xl bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 flex items-center justify-center text-[#8B5CF6]">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold font-display text-[#F8FAFC] group-hover:text-[#8B5CF6] transition-colors">
                  {item.title}
                </h3>
                <p className="text-[#94A3B8] text-xs leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <span className="text-xs font-mono font-semibold text-[#8B5CF6] uppercase tracking-wider">
            Brand Identity
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-[#F8FAFC]">
            Cohesive Visual Systems That Scale
          </h3>
          <p className="text-[#94A3B8] text-sm leading-relaxed">
            A cohesive visual identity ensures your website, mobile app, and social channels feel unified and trustworthy from the very first impression.
          </p>
        </div>

        <div className="surface-card rounded-3xl p-8 space-y-4 border-[#8B5CF6]/30 bg-gradient-to-br from-[#8B5CF6]/10 via-white/[0.04] to-[#3B82F6]/10">
          <h3 className="text-xl font-bold font-display text-[#F8FAFC]">
            Need UI/UX or Brand Design Support?
          </h3>
          <p className="text-[#94A3B8] text-xs sm:text-sm leading-relaxed">
            Get in touch with {PERSONAL_INFO.name} via email or social channels to discuss brand kits, product UI design, or social visual packages.
          </p>
          <button
            type="button"
            onClick={() => onNavigate('contact')}
            className="w-full py-3.5 rounded-xl bg-[#3B82F6] hover:bg-[#2563EB] text-[#F8FAFC] font-semibold text-xs tracking-wide transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            Discuss Your Design Project <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
