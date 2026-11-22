import React from 'react';
import { PageId } from '../types';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ArrowUp, Mail, MapPin, ExternalLink } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 bg-[#0D1425]/90 backdrop-blur-xl border-t border-white/[0.12] pt-14 pb-24 lg:pb-10 safe-bottom text-[#94A3B8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/[0.1]">
          <div className="lg:col-span-2 space-y-4">
            <button
              type="button"
              onClick={() => {
                onNavigate('home');
                scrollToTop();
              }}
              className="text-left group flex items-center gap-3 cursor-pointer"
            >
              <div className="w-11 h-11 rounded-xl overflow-hidden border border-white/[0.15] shrink-0 bg-[#080D1B]">
                <img
                  src="/avatar.webp"
                  alt="Hanan Irfan portrait"
                  width={44}
                  height={44}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.src.endsWith('/avatar.jpg')) {
                      target.src = '/avatar.jpg';
                    }
                  }}
                  className="w-full h-full object-cover aspect-square"
                />
              </div>
              <div>
                <h2 className="text-xl font-black font-display text-[#F8FAFC] group-hover:text-[#3B82F6] transition-colors">
                  {PERSONAL_INFO.name}
                </h2>
                <span className="text-xs font-mono text-[#94A3B8] block">
                  Multidisciplinary Developer &amp; SEO Specialist
                </span>
              </div>
            </button>

            <p className="text-sm text-[#94A3B8] max-w-sm leading-relaxed">
              {PERSONAL_INFO.education.degree} ({PERSONAL_INFO.education.semester}, CGPA {PERSONAL_INFO.education.cgpa}) at KFUEIT. Founder &amp; AI Developer of The Sports Room.
            </p>

            <div className="space-y-2 text-xs text-[#94A3B8] font-mono pt-1">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#3B82F6] shrink-0" />
                <span>{PERSONAL_INFO.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#3B82F6] shrink-0" />
                <a href={`mailto:${PERSONAL_INFO.email}`} className="text-[#F8FAFC] hover:text-[#3B82F6] transition-colors">
                  {PERSONAL_INFO.email}
                </a>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#F8FAFC] font-bold mb-4">
              Portfolio
            </h3>
            <ul className="space-y-2.5 text-xs font-medium">
              {(
                [
                  { id: 'home', label: 'Home' },
                  { id: 'about', label: 'About' },
                  { id: 'projects', label: 'Projects' },
                  { id: 'skills', label: 'Skills & Stack' },
                  { id: 'experience', label: 'Experience' },
                  { id: 'services', label: 'Services' },
                  { id: 'contact', label: 'Contact' },
                ] as { id: PageId; label: string }[]
              ).map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => {
                      onNavigate(item.id);
                      scrollToTop();
                    }}
                    className="text-[#94A3B8] hover:text-[#F8FAFC] transition-colors cursor-pointer"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#F8FAFC] font-bold mb-4">
              Connect
            </h3>
            <ul className="space-y-2.5 text-xs font-medium">
              {[
                PERSONAL_INFO.socials.github,
                PERSONAL_INFO.socials.linkedin,
                PERSONAL_INFO.socials.x,
                PERSONAL_INFO.socials.instagram,
                PERSONAL_INFO.socials.facebook,
                PERSONAL_INFO.socials.tiktok,
              ].map((social) => (
                <li key={social.name}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#94A3B8] hover:text-[#F8FAFC] transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>
                      {social.name} ({social.handle})
                    </span>
                    <ExternalLink className="w-3 h-3 opacity-60" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#F8FAFC] font-bold mb-4">
              Legal &amp; Trust
            </h3>
            <ul className="space-y-2.5 text-xs font-medium">
              <li>
                <button
                  type="button"
                  onClick={() => {
                    onNavigate('privacy-policy');
                    scrollToTop();
                  }}
                  className="text-[#94A3B8] hover:text-[#F8FAFC] transition-colors cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    onNavigate('terms-and-conditions');
                    scrollToTop();
                  }}
                  className="text-[#94A3B8] hover:text-[#F8FAFC] transition-colors cursor-pointer"
                >
                  Terms &amp; Conditions
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    onNavigate('disclaimer');
                    scrollToTop();
                  }}
                  className="text-[#94A3B8] hover:text-[#F8FAFC] transition-colors cursor-pointer"
                >
                  Disclaimer
                </button>
              </li>
              <li>
                <a
                  href="/sitemap.xml"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#94A3B8] hover:text-[#F8FAFC] transition-colors"
                >
                  XML Sitemap
                </a>
              </li>
              <li>
                <a
                  href="/robots.txt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#94A3B8] hover:text-[#F8FAFC] transition-colors"
                >
                  Robots.txt
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#94A3B8]">
          <p>© {new Date().getFullYear()} Hanan Irfan. All rights reserved.</p>

          <div className="flex items-center gap-4">
            <span className="font-mono text-[11px] text-[#94A3B8]">
              BSCS @ KFUEIT &bull; Rahim Yar Khan, Pakistan
            </span>
            <button
              type="button"
              onClick={scrollToTop}
              className="px-3 py-2 rounded-xl bg-white/[0.05] border border-white/[0.12] text-[#F8FAFC] hover:text-[#3B82F6] hover:border-[#3B82F6]/50 transition-colors flex items-center gap-1.5 cursor-pointer"
              id="btn-back-to-top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span className="font-mono text-[11px] font-semibold">TOP</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
