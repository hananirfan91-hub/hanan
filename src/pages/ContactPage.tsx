import React, { useState } from 'react';
import { PageId } from '../types';
import { PERSONAL_INFO } from '../data/portfolioData';
import { copyTextSafely } from '../lib/safeStorage';
import {
  Mail,
  MapPin,
  Copy,
  Check,
  ExternalLink,
  Clock,
  Globe2,
  Cpu,
  Code2,
  SearchCheck,
  Users,
  ArrowUpRight,
  Compass,
} from 'lucide-react';

interface ContactPageProps {
  onNavigate?: (page: PageId) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = async () => {
    const ok = await copyTextSafely(PERSONAL_INFO.email);
    if (ok) {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2200);
    }
  };

  const socialProfiles = [
    {
      ...PERSONAL_INFO.socials.github,
      note: 'Open-source repositories, web apps & code',
    },
    {
      ...PERSONAL_INFO.socials.x,
      note: 'Engineering updates, AI builds & SEO threads',
    },
    {
      ...PERSONAL_INFO.socials.linkedin,
      note: 'Professional profile & collaborations',
    },
    {
      ...PERSONAL_INFO.socials.instagram,
      note: 'Campus highlights & personal updates',
    },
    {
      ...PERSONAL_INFO.socials.facebook,
      note: 'Community announcements & events',
    },
    {
      ...PERSONAL_INFO.socials.tiktok,
      note: 'Short-form creator & community clips',
    },
  ];

  const collaborationAreas = [
    {
      title: 'AI Development & Workflows',
      desc: 'AI-assisted web tools, structured prompt workflows, and practical integration architectures.',
      icon: Cpu,
      page: 'services' as PageId,
    },
    {
      title: 'Frontend & Full-Stack Web Apps',
      desc: 'Responsive React, Next.js, TypeScript, Firebase, and Supabase applications engineered cleanly.',
      icon: Code2,
      page: 'web-development' as PageId,
    },
    {
      title: 'SEO, AEO, GEO & Content Strategy',
      desc: 'Technical SEO audits, keyword research & clustering, Schema.org markup, and answer-ready structure.',
      icon: SearchCheck,
      page: 'seo-expert' as PageId,
    },
    {
      title: 'Ventures & Campus Communities',
      desc: "Collaborations around The Sports Room, ACM KFUEIT technical initiatives, and D'Educationist outreach.",
      icon: Users,
      page: 'experience' as PageId,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="space-y-4">
        <span className="text-xs font-mono font-semibold text-[#3B82F6] tracking-wider uppercase">
          Direct Contact &amp; Social Channels
        </span>
        <h1 className="text-4xl sm:text-6xl font-black font-display text-[#F8FAFC] tracking-tight">
          Contact {PERSONAL_INFO.name}
        </h1>
        <p className="text-[#94A3B8] text-base sm:text-lg max-w-2xl leading-relaxed">
          Reach out directly via email or connect on my verified social profiles for AI development, full-stack web projects, technical SEO / AEO / GEO consulting, or academic and community collaborations.
        </p>
      </div>

      {/* Section 1: Email, Address & Verified Social Accounts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left: Email & Address */}
        <div className="lg:col-span-5 surface-card rounded-3xl p-7 sm:p-8 flex flex-col justify-between space-y-8">
          <div className="space-y-6">
            <div>
              <span className="text-xs font-mono text-[#3B82F6] font-semibold uppercase tracking-wider">
                Direct Contact Details
              </span>
              <h2 className="text-2xl font-bold font-display text-[#F8FAFC] mt-1">
                Email &amp; Address
              </h2>
            </div>

            <div className="space-y-4">
              {/* Email Card */}
              <div className="p-5 rounded-2xl bg-[#0D1425]/80 border border-white/[0.12] space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-[#3B82F6]/15 border border-[#3B82F6]/30 text-[#3B82F6]">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono text-[#94A3B8] uppercase block">
                        Email Address
                      </span>
                      <a
                        href={`mailto:${PERSONAL_INFO.email}`}
                        className="text-sm sm:text-base font-bold text-[#F8FAFC] hover:text-[#3B82F6] transition-colors break-all"
                      >
                        {PERSONAL_INFO.email}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-[#3B82F6] hover:bg-[#2563EB] text-[#F8FAFC] text-xs font-semibold transition-colors inline-flex items-center justify-center gap-1.5"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Open Email App</span>
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="py-2.5 px-4 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.12] text-[#F8FAFC] text-xs font-semibold transition-colors inline-flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#94A3B8]" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Address / Location Card */}
              <div className="p-5 rounded-2xl bg-[#0D1425]/80 border border-white/[0.12] flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 text-[#8B5CF6] shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] font-mono text-[#94A3B8] uppercase block">
                    Address &amp; Base
                  </span>
                  <p className="text-sm sm:text-base font-bold text-[#F8FAFC]">
                    Rahim Yar Khan, Punjab, Pakistan
                  </p>
                  <p className="text-xs text-[#94A3B8] leading-relaxed">
                    Khwaja Fareed University of Engineering and Information Technology (KFUEIT) &bull; HI Digital Group
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/[0.1] flex items-center justify-between text-xs font-mono text-[#94A3B8]">
            <span>Timezone: PKT (UTC+5)</span>
            <span>Replies within 24–48h</span>
          </div>
        </div>

        {/* Right: Social Account Links (GitHub, X, LinkedIn, Instagram, Facebook, TikTok) */}
        <div className="lg:col-span-7 surface-card rounded-3xl p-7 sm:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-mono text-[#8B5CF6] font-semibold uppercase tracking-wider">
              Social Accounts
            </span>
            <h2 className="text-2xl font-bold font-display text-[#F8FAFC]">
              Connect Across Verified Profiles
            </h2>
            <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
              Follow or message me directly on any of my official social accounts below.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {socialProfiles.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-white/[0.04] border border-white/[0.12] hover:border-[#3B82F6]/50 hover:bg-white/[0.08] transition-all flex items-start justify-between gap-3 group"
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold font-display text-[#F8FAFC] group-hover:text-[#3B82F6] transition-colors">
                      {social.name}
                    </span>
                    <span className="text-xs font-mono text-[#3B82F6] truncate">
                      {social.handle}
                    </span>
                  </div>
                  <p className="text-xs text-[#94A3B8] leading-relaxed">{social.note}</p>
                </div>
                <ExternalLink className="w-4 h-4 text-[#94A3B8] group-hover:text-[#F8FAFC] shrink-0 mt-0.5 transition-colors" />
              </a>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-[#0D1425]/80 border border-white/[0.1] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#94A3B8]">
            <div className="flex items-center gap-2">
              <Globe2 className="w-4 h-4 text-[#3B82F6] shrink-0" />
              <span>Official Portfolio Domain:</span>
            </div>
            <a
              href={PERSONAL_INFO.portfolioUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono font-semibold text-[#F8FAFC] hover:text-[#3B82F6] inline-flex items-center gap-1"
            >
              <span>{PERSONAL_INFO.portfolioUrl}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Section 2 (Added): Collaboration & Project Scope Areas */}
      <section className="space-y-6">
        <div className="space-y-1.5">
          <span className="text-xs font-mono font-semibold text-[#3B82F6] uppercase tracking-wider">
            Areas for Discussion
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-[#F8FAFC]">
            What We Can Collaborate On
          </h2>
          <p className="text-xs sm:text-sm text-[#94A3B8] max-w-2xl leading-relaxed">
            Whether you are building an AI-powered platform, launching a modern web app, or structuring technical SEO, here are my primary areas of focus.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {collaborationAreas.map((area) => {
            const Icon = area.icon;
            return (
              <div
                key={area.title}
                className="surface-card surface-card-hover rounded-2xl p-6 flex flex-col justify-between space-y-5"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#3B82F6]/15 border border-[#3B82F6]/30 flex items-center justify-center text-[#3B82F6]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold font-display text-[#F8FAFC] leading-snug">
                    {area.title}
                  </h3>
                  <p className="text-xs text-[#94A3B8] leading-relaxed">{area.desc}</p>
                </div>

                {onNavigate && (
                  <button
                    type="button"
                    onClick={() => onNavigate(area.page)}
                    className="text-xs font-mono font-semibold text-[#3B82F6] hover:text-[#F8FAFC] inline-flex items-center gap-1 self-start transition-colors cursor-pointer"
                  >
                    <span>Explore Details</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Section 3 (Added): Direct Outreach Workflow & Availability */}
      <section className="surface-card rounded-3xl p-7 sm:p-10 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.1] pb-5">
          <div>
            <span className="text-xs font-mono font-semibold text-[#8B5CF6] uppercase tracking-wider inline-flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5" /> Working Process
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-[#F8FAFC] mt-1">
              How to Reach Out Effectively
            </h2>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#94A3B8]">
            <Clock className="w-4 h-4 text-[#3B82F6]" />
            <span>Available for Remote &amp; RYK Collaborations</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-5 rounded-2xl bg-[#0D1425]/75 border border-white/[0.1] space-y-2">
            <span className="text-xs font-mono font-bold text-[#3B82F6] block">
              01. Send Brief via Email or X
            </span>
            <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
              Email <span className="text-[#F8FAFC] font-mono">{PERSONAL_INFO.email}</span> or message{' '}
              <span className="text-[#F8FAFC] font-mono">@hananirfan91</span> with your project goals, website URL, or collaboration idea.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-[#0D1425]/75 border border-white/[0.1] space-y-2">
            <span className="text-xs font-mono font-bold text-[#8B5CF6] block">
              02. Technical Alignment
            </span>
            <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
              We review architecture, SEO/AEO/GEO opportunities, expected deliverables, and practical timeline options together.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-[#0D1425]/75 border border-white/[0.1] space-y-2">
            <span className="text-xs font-mono font-bold text-[#3B82F6] block">
              03. Focused Execution
            </span>
            <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
              Clear milestones, clean Git/Vercel deployments, and structured handover across Rahim Yar Khan and international teams.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
