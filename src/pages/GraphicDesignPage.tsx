import React, { useState } from 'react';
import { PageId } from '../types';
import { SplitTextReveal } from '../components/animations/SplitTextReveal';
import { Palette, Feather, Share2, Layers, CheckCircle2, ArrowRight, Sparkles, Image, ShieldCheck } from 'lucide-react';

interface GraphicDesignPageProps {
  onNavigate: (page: PageId) => void;
}

export const GraphicDesignPage: React.FC<GraphicDesignPageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'ALL' | 'LOGO' | 'SOCIAL' | 'BRANDING'>('ALL');

  const designServices = [
    {
      title: 'Logo Designer in Rahim Yar Khan',
      category: 'LOGO',
      desc: 'Unique, memorable vector logos created from scratch. Brand marks, wordmarks, and iconic logos tailored for startups and businesses in RYK.',
      icon: Feather
    },
    {
      title: 'Social Media Designer in RYK',
      desc: 'Eye-catching Instagram posts, Facebook banners, promotional flyers, and YouTube thumbnails designed to boost engagement and clicks.',
      category: 'SOCIAL',
      icon: Share2
    },
    {
      title: 'Branding Services in Rahim Yar Khan',
      category: 'BRANDING',
      desc: 'Complete corporate brand identity kits including typography guidelines, color palettes, business cards, letterheads, and brand style guides.',
      icon: Palette
    },
    {
      title: 'Social Media Post Design in RYK',
      category: 'SOCIAL',
      desc: 'High-converting social media creatives for marketing campaigns, product launches, and brand awareness across all digital platforms.',
      icon: Image
    },
    {
      title: 'Branding Designer in RYK',
      category: 'BRANDING',
      desc: 'Consistent visual storytelling and packaging design crafted by an experienced Freelance Graphic Designer in RYK.',
      icon: Layers
    },
    {
      title: 'Graphic Design Services in RYK',
      category: 'ALL',
      desc: 'Custom UI elements, web graphics, marketing collateral, vector artwork, and digital banners for modern business growth.',
      icon: ShieldCheck
    }
  ];

  const filteredServices = designServices.filter(
    (s) => activeTab === 'ALL' || s.category === activeTab || s.category === 'ALL'
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* HEADER SECTION */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-pink-400 uppercase tracking-widest">// SPECIALIZED SERVICE</span>
          <span className="px-2.5 py-0.5 rounded-full bg-pink-500/20 text-pink-300 text-[10px] font-mono border border-pink-500/30">
            CREATIVE BRANDING &amp; DESIGN
          </span>
        </div>

        <SplitTextReveal
          text="Graphic Designer in Rahim Yar Khan & Branding Services in RYK"
          as="h1"
          className="text-3xl sm:text-6xl font-black font-display text-white tracking-wide text-glow leading-tight"
        />

        <p className="text-slate-300 text-base sm:text-lg max-w-3xl leading-relaxed">
          Looking for a creative <strong>Graphic Designer in Rahim Yar Khan</strong> or <strong>Graphic Designer in RYK</strong>? Hanan Irfan delivers professional <strong>Graphic Design Services in RYK</strong>, custom <strong>Logo Design Services in Rahim Yar Khan</strong>, and high-impact <strong>Social Media Post Design in RYK</strong>.
        </p>

        <div className="pt-2 flex flex-wrap gap-3">
          <button
            onClick={() => onNavigate('contact')}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-display font-bold text-xs tracking-wider shadow-xl shadow-pink-600/30 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" /> HIRE GRAPHIC DESIGNER IN RYK
          </button>
          <button
            onClick={() => onNavigate('projects')}
            className="px-6 py-3 rounded-2xl glass-card text-slate-300 hover:text-white border border-white/10 hover:border-pink-500/40 text-xs font-mono flex items-center gap-2"
          >
            VIEW CREATIVE WORK <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* OVERVIEW SECTION */}
      <section className="glass-card rounded-3xl p-8 sm:p-12 border border-pink-500/30 bg-gradient-to-br from-[#180a14] via-[#100812] to-[#1e0a18] space-y-6">
        <h2 className="text-2xl sm:text-4xl font-bold font-display text-white">
          Graphic Design in Rahim Yar Khan — Logo, Social Media &amp; Branding
        </h2>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          As a top-rated <strong>Freelance Graphic Designer in RYK</strong> and <strong>Best Graphic Designer in RYK</strong>, I create visually compelling brand identities that capture customer attention. From vector logo design to daily <strong>Social Media Post Design in Rahim Yar Khan</strong>, every design asset is custom-crafted to align with your business goals.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
          {[
            'Logo Designer in RYK Vector Branding',
            'Social Media Designer in Rahim Yar Khan Banners',
            'Branding Services in Rahim Yar Khan Kits',
            'Social Media Post Design in Rahim Yar Khan Creatives',
            'Logo Design Services in Rahim Yar Khan Typography',
            'Freelance Graphic Designer in RYK Collateral'
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10 text-slate-200 text-xs font-medium">
              <CheckCircle2 className="w-4 h-4 text-pink-400 shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* DESIGN FILTER CATEGORIES */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs font-mono text-pink-400 uppercase tracking-widest">// CREATIVE SERVICES</span>
            <h2 className="text-2xl sm:text-4xl font-bold font-display text-white">
              Graphic Design Services in RYK
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 glass-card p-1.5 rounded-2xl border border-white/10">
            {[
              { id: 'ALL', label: 'ALL SERVICES' },
              { id: 'LOGO', label: 'LOGO DESIGN' },
              { id: 'SOCIAL', label: 'SOCIAL MEDIA' },
              { id: 'BRANDING', label: 'BRANDING' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-1.5 rounded-xl text-xs font-mono transition-all ${
                  activeTab === tab.id
                    ? 'bg-pink-600 text-white font-bold shadow-lg shadow-pink-600/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="glass-card rounded-2xl p-6 border border-white/10 hover:border-pink-500/50 hover:bg-white/[0.03] transition-all space-y-4 group"
              >
                <div className="w-12 h-12 rounded-xl bg-pink-500/20 border border-pink-500/30 flex items-center justify-center text-pink-300 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold font-display text-white group-hover:text-pink-300 transition-colors">
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

      {/* LOGO & BRANDING SHOWCASE CTA */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <span className="text-xs font-mono text-pink-400 uppercase tracking-widest">// BRAND IDENTITY DESIGN</span>
          <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">
            Logo Designer in RYK &amp; Branding Designer in RYK
          </h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            Your logo is the foundation of your company's identity. As a specialized <strong>Logo Designer in Rahim Yar Khan</strong>, I build complete visual brand guidelines ensuring your business looks professional across websites, business cards, social media, and packaging.
          </p>
        </div>

        <div className="glass-card rounded-3xl p-8 border border-white/10 space-y-4 bg-black/40">
          <h3 className="text-xl font-bold font-display text-white">
            Need Custom Design Work in Rahim Yar Khan?
          </h3>
          <p className="text-slate-400 text-xs leading-relaxed">
            Get in touch with <strong>Graphic Designer in Rahim Yar Khan</strong> Hanan Irfan for custom logo packages, brand kits, or monthly social media post management.
          </p>
          <button
            onClick={() => onNavigate('contact')}
            className="w-full py-3.5 rounded-2xl bg-pink-600 hover:bg-pink-500 text-white font-display font-bold text-xs tracking-wider shadow-lg shadow-pink-600/30 transition-all flex items-center justify-center gap-2"
          >
            DISCUSS YOUR DESIGN PROJECT <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

    </div>
  );
};
