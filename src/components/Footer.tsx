import React from 'react';
import { PageId } from '../types';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ArrowUp, Heart, Globe, Mail, MapPin } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 bg-[#050609] border-t border-white/10 pt-16 pb-12 overflow-hidden text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Col 1 & 2: Primary Brand */}
          <div className="lg:col-span-2 space-y-4">
            <button
              onClick={() => { onNavigate('home'); scrollToTop(); }}
              className="text-left group flex items-center gap-3"
            >
              <div className="w-12 h-12 rounded-xl overflow-hidden border border-purple-500/40 shadow-lg shadow-purple-600/30 shrink-0">
                <img
                  src="/hanan-irfan.jpg"
                  alt="Hanan Irfan Avatar"
                  width={48}
                  height={48}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src = '/avatar.jpg';
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform aspect-square"
                />
              </div>
              <div>
                <h2 className="text-3xl sm:text-4xl font-black font-display text-white tracking-wider group-hover:text-purple-400 transition-colors text-glow">
                  {PERSONAL_INFO.primaryBrand}
                </h2>
                <span className="text-xs font-mono tracking-widest text-purple-400 block mt-0.5">
                  HANAN IRFAN PORTFOLIO
                </span>
              </div>
            </button>

            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Hanan Irfan — Full-Stack Developer, SEO Specialist, Graphic Designer & Digital Creator from Rahim Yar Khan, Punjab, Pakistan.
            </p>

            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono pt-2">
              <MapPin className="w-4 h-4 text-purple-400" />
              <span>{PERSONAL_INFO.location}</span>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
              <Mail className="w-4 h-4 text-purple-400" />
              <a href={`mailto:${PERSONAL_INFO.email}`} className="hover:text-white transition-colors">
                {PERSONAL_INFO.email}
              </a>
            </div>
          </div>

          {/* Col 3: Navigation */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-purple-400 mb-4">
              // NAVIGATION
            </h3>
            <ul className="space-y-2.5 text-xs font-semibold">
              {(['home', 'about', 'projects', 'web-development', 'seo-expert', 'graphic-design', 'services', 'contact'] as PageId[]).map((p) => {
                const labels: Record<string, string> = {
                  'web-development': 'WEB DEVELOPMENT',
                  'seo-expert': 'SEO EXPERT',
                  'graphic-design': 'GRAPHIC DESIGN'
                };
                return (
                  <li key={p}>
                    <button
                      onClick={() => { onNavigate(p); scrollToTop(); }}
                      className="text-slate-400 hover:text-white hover:translate-x-1 transition-all uppercase"
                    >
                      {labels[p] || p}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Col 4: Social Channels */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-purple-400 mb-4">
              // SOCIAL CONNECT
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a
                  href={PERSONAL_INFO.socials.linkedin.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-purple-400 transition-colors flex items-center gap-2"
                >
                  <Globe className="w-3.5 h-3.5 text-purple-400" /> LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={PERSONAL_INFO.socials.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-purple-400 transition-colors flex items-center gap-2"
                >
                  <Globe className="w-3.5 h-3.5 text-purple-400" /> Instagram (@{PERSONAL_INFO.socials.instagram.handle})
                </a>
              </li>
              <li>
                <a
                  href={PERSONAL_INFO.socials.facebook.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-purple-400 transition-colors flex items-center gap-2"
                >
                  <Globe className="w-3.5 h-3.5 text-purple-400" /> Facebook ({PERSONAL_INFO.socials.facebook.handle})
                </a>
              </li>
              <li>
                <a
                  href={PERSONAL_INFO.socials.tiktok.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-purple-400 transition-colors flex items-center gap-2"
                >
                  <Globe className="w-3.5 h-3.5 text-purple-400" /> TikTok ({PERSONAL_INFO.socials.tiktok.handle})
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: Legal & Utilities */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-purple-400 mb-4">
              // LEGAL & INFO
            </h3>
            <ul className="space-y-2.5 text-xs font-semibold">
              <li>
                <button
                  onClick={() => { onNavigate('privacy'); scrollToTop(); }}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('terms'); scrollToTop(); }}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Terms & Conditions
                </button>
              </li>
              <li>
                <a
                  href="/sitemap.xml"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-purple-400 transition-colors"
                >
                  XML Sitemap
                </a>
              </li>
              <li>
                <a
                  href="/robots.txt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-purple-400 transition-colors"
                >
                  Robots.txt
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-1">
            <span>© 2026 Hanan Irfan. All rights reserved. Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-purple-500 fill-purple-500 inline mx-0.5" />
            <span>in Pakistan.</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="font-mono text-[11px] text-slate-400">
              BSCS @ KFUEIT
            </span>
            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-xl glass-card border border-white/10 text-slate-300 hover:text-white hover:border-purple-500/50 hover:bg-purple-600/20 transition-all flex items-center gap-1.5"
              id="btn-back-to-top"
            >
              <ArrowUp className="w-4 h-4" />
              <span className="font-mono text-[10px]">TOP</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
