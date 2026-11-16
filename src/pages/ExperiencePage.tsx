import React from 'react';
import { motion } from 'motion/react';
import { EXPERIENCE_ITEMS, PERSONAL_INFO } from '../data/portfolioData';
import {
  Briefcase,
  Calendar,
  CheckCircle2,
  Award,
  Terminal,
  ArrowUpRight,
} from 'lucide-react';

export const ExperiencePage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="space-y-4">
        <span className="text-xs font-mono font-semibold text-[#3B82F6] uppercase tracking-wider block">
          Milestones &amp; Leadership
        </span>
        <h1 className="text-4xl sm:text-6xl font-black font-display text-[#F8FAFC] tracking-tight">
          Experience
        </h1>
        <p className="text-[#94A3B8] text-base sm:text-lg max-w-3xl leading-relaxed">
          Building digital ventures, leading student developer teams, contributing to campus outreach, and advancing BS Computer Science studies at KFUEIT ({PERSONAL_INFO.education.semester}, CGPA {PERSONAL_INFO.education.cgpa}).
        </p>
      </div>

      {/* Timeline */}
      <div className="relative border-l-2 border-white/[0.14] ml-3 sm:ml-6 space-y-10 pl-6 sm:pl-10">
        {EXPERIENCE_ITEMS.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.06 }}
            className="relative group"
          >
            {/* Timeline Marker */}
            <div className="absolute -left-[33px] sm:-left-[49px] top-6 w-4 h-4 rounded-full bg-[#3B82F6] border-4 border-[#080D1B] ring-2 ring-[#3B82F6]/30 group-hover:scale-125 transition-transform" />

            <div className="surface-card surface-card-hover rounded-3xl p-6 sm:p-8 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.1] pb-4">
                <span className="text-xs font-mono font-bold text-[#3B82F6] uppercase tracking-wider">
                  {item.category}
                </span>
                <div className="flex items-center gap-1.5 text-xs font-mono text-[#94A3B8]">
                  <Calendar className="w-3.5 h-3.5 text-[#3B82F6]" />
                  <span>{item.period}</span>
                </div>
              </div>

              <div>
                <h2 className="text-xl sm:text-2xl font-bold font-display text-[#F8FAFC] group-hover:text-[#3B82F6] transition-colors">
                  {item.title}
                </h2>
                {item.organization && (
                  <span className="text-xs font-mono font-semibold text-emerald-400 block mt-1">
                    {item.organization}
                  </span>
                )}
              </div>

              <p className="text-[#94A3B8] text-sm leading-relaxed">{item.description}</p>

              {/* Highlights */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-mono font-semibold text-[#94A3B8] uppercase tracking-wider block">
                  Key Accomplishments
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {item.highlights.map((high) => (
                    <div key={high} className="flex items-start gap-2 text-xs text-[#F8FAFC]/90">
                      <CheckCircle2 className="w-4 h-4 text-[#3B82F6] mt-0.5 shrink-0" />
                      <span>{high}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack Tags */}
              <div className="pt-4 border-t border-white/[0.1] flex flex-wrap gap-2">
                {item.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.1] text-[#94A3B8]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Product & Venture Highlights */}
      <div className="surface-card rounded-3xl p-7 sm:p-10 space-y-6">
        <span className="text-xs font-mono font-semibold text-[#3B82F6] uppercase tracking-wider">
          Venture &amp; Software Launches
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-[#F8FAFC]">
          The Sports Room, NEXA POS &amp; Free Tools Hub
        </h2>
        <p className="text-[#94A3B8] text-sm sm:text-base leading-relaxed max-w-4xl">
          Co-founded The Sports Room with Urwah Farooq under HI Digital Group (2026–present), while building standalone full-stack products including NEXA POS System and Free Tools Hub deployed on modern cloud infrastructure.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
          <div className="p-4 rounded-2xl bg-[#0D1425]/80 border border-white/[0.1] space-y-1.5">
            <span className="text-[#3B82F6] font-bold block">The Sports Room</span>
            <span className="text-[#94A3B8] leading-relaxed block">
              Independent sports media &amp; analytics platform with AI workflows and structured SEO.
            </span>
          </div>
          <div className="p-4 rounded-2xl bg-[#0D1425]/80 border border-white/[0.1] space-y-1.5">
            <span className="text-emerald-400 font-bold block">NEXA POS System</span>
            <span className="text-[#94A3B8] leading-relaxed block">
              Web point-of-sale platform with billing, stock alerts, customer ledgers &amp; offline readiness.
            </span>
          </div>
          <div className="p-4 rounded-2xl bg-[#0D1425]/80 border border-white/[0.1] space-y-1.5">
            <span className="text-[#8B5CF6] font-bold block">Free Tools Hub</span>
            <span className="text-[#94A3B8] leading-relaxed block">
              Client-side developer and text utilities running in the browser without backend storage.
            </span>
          </div>
        </div>
      </div>

      {/* Engineering Workflow Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="surface-card rounded-2xl p-6 space-y-3">
          <Terminal className="w-5 h-5 text-[#3B82F6]" />
          <h3 className="text-lg font-bold font-display text-[#F8FAFC]">Git &amp; Cloud Deployments</h3>
          <p className="text-xs text-[#94A3B8] leading-relaxed">
            Clean branch workflows, continuous integration previews, domain DNS setup, and production builds on Vercel.
          </p>
        </div>
        <div className="surface-card rounded-2xl p-6 space-y-3">
          <Award className="w-5 h-5 text-emerald-400" />
          <h3 className="text-lg font-bold font-display text-[#F8FAFC]">Academic &amp; Leadership Rigor</h3>
          <p className="text-xs text-[#94A3B8] leading-relaxed">
            Balancing Dean&apos;s Honor Roll academic distinction (3.65 CGPA) with ACM KFUEIT and D&apos;Educationist community leadership.
          </p>
        </div>
        <div className="surface-card rounded-2xl p-6 space-y-3">
          <Briefcase className="w-5 h-5 text-[#8B5CF6]" />
          <h3 className="text-lg font-bold font-display text-[#F8FAFC]">End-to-End Execution</h3>
          <p className="text-xs text-[#94A3B8] leading-relaxed">
            Iterative cycles covering requirements scoping, responsive UI design, TypeScript implementation, and technical SEO checks.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="surface-card rounded-3xl p-8 sm:p-12 border-[#3B82F6]/30 text-center space-y-5 bg-gradient-to-br from-[#3B82F6]/10 via-white/[0.04] to-[#8B5CF6]/10">
        <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-[#F8FAFC]">
          Interested in Collaborating or Hiring?
        </h2>
        <p className="text-xs sm:text-sm text-[#94A3B8] max-w-xl mx-auto leading-relaxed">
          Reach out to discuss full-stack web engineering, AI workflows, or SEO/AEO/GEO consulting.
        </p>
        <div className="pt-1">
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="px-7 py-3.5 rounded-xl bg-[#3B82F6] hover:bg-[#2563EB] text-[#F8FAFC] font-semibold text-sm inline-flex items-center gap-2 transition-colors"
          >
            <span>Discuss an Opportunity</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};
