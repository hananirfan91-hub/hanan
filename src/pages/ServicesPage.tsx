import React from 'react';
import { motion } from 'motion/react';
import { PageId } from '../types';
import { SERVICES, PERSONAL_INFO } from '../data/portfolioData';
import { MotionReveal } from '../components/MotionReveal';
import {
  Check,
  Sparkles,
  ArrowUpRight,
  Layout,
  Code,
  Globe,
  Search,
  Palette,
  Cpu,
  ShieldCheck,
  Clock,
  Zap,
  Rocket,
} from 'lucide-react';

interface ServicesPageProps {
  onNavigate: (page: PageId) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate }) => {
  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu':
        return <Cpu className="w-6 h-6 text-[#3B82F6]" />;
      case 'Code':
        return <Code className="w-6 h-6 text-[#8B5CF6]" />;
      case 'Search':
        return <Search className="w-6 h-6 text-emerald-400" />;
      case 'Layout':
        return <Layout className="w-6 h-6 text-[#3B82F6]" />;
      case 'Globe':
        return <Globe className="w-6 h-6 text-amber-400" />;
      case 'Palette':
        return <Palette className="w-6 h-6 text-pink-400" />;
      default:
        return <Sparkles className="w-6 h-6 text-[#3B82F6]" />;
    }
  };

  const serviceWorkflow = [
    {
      step: '01',
      title: 'Discover & Audit',
      desc: 'Clarifying goals, user needs, search intent, and technical requirements before writing code.',
    },
    {
      step: '02',
      title: 'Architect & Design',
      desc: 'Structuring responsive UI layouts, data schemas, and clean navigation flows.',
    },
    {
      step: '03',
      title: 'Build & Integrate',
      desc: 'Implementing modular TypeScript, React/Next.js components, and backend or AI workflows.',
    },
    {
      step: '04',
      title: 'SEO & Quality Check',
      desc: 'Checking semantic HTML, Schema.org metadata, accessibility contrast, and mobile layout behavior.',
    },
    {
      step: '05',
      title: 'Deploy & Handover',
      desc: 'Shipping production builds to Vercel or cloud hosting with clear documentation and clean repositories.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="space-y-4">
        <span className="text-xs font-mono font-semibold text-[#3B82F6] uppercase tracking-wider block">
          Consulting &amp; Engineering Services
        </span>
        <h1 className="text-4xl sm:text-6xl font-black font-display text-[#F8FAFC] tracking-tight">
          Services &amp; Capabilities
        </h1>
        <p className="text-[#94A3B8] text-base sm:text-lg max-w-3xl leading-relaxed">
          AI development, full-stack web engineering, technical SEO, AEO, GEO, keyword clustering, and content strategy for organizations in {PERSONAL_INFO.location} and worldwide.
        </p>

        {/* Specialized Practice Pages */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
          <button
            type="button"
            onClick={() => onNavigate('web-development')}
            className="p-5 rounded-2xl surface-card surface-card-hover text-left flex items-center justify-between group cursor-pointer"
          >
            <div>
              <span className="text-[11px] font-mono text-[#3B82F6] font-semibold block uppercase">
                Specialty
              </span>
              <span className="text-base font-bold font-display text-[#F8FAFC] group-hover:text-[#3B82F6] transition-colors">
                Web Development
              </span>
            </div>
            <ArrowUpRight className="w-4 h-4 text-[#3B82F6] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>

          <button
            type="button"
            onClick={() => onNavigate('seo-expert')}
            className="p-5 rounded-2xl surface-card surface-card-hover text-left flex items-center justify-between group cursor-pointer"
          >
            <div>
              <span className="text-[11px] font-mono text-emerald-400 font-semibold block uppercase">
                Specialty
              </span>
              <span className="text-base font-bold font-display text-[#F8FAFC] group-hover:text-emerald-400 transition-colors">
                SEO, AEO &amp; GEO
              </span>
            </div>
            <ArrowUpRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>

          <button
            type="button"
            onClick={() => onNavigate('graphic-design')}
            className="p-5 rounded-2xl surface-card surface-card-hover text-left flex items-center justify-between group cursor-pointer"
          >
            <div>
              <span className="text-[11px] font-mono text-[#8B5CF6] font-semibold block uppercase">
                Specialty
              </span>
              <span className="text-base font-bold font-display text-[#F8FAFC] group-hover:text-[#8B5CF6] transition-colors">
                UI/UX &amp; Graphic Design
              </span>
            </div>
            <ArrowUpRight className="w-4 h-4 text-[#8B5CF6] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {SERVICES.map((service) => (
          <motion.div
            key={service.id}
            whileHover={{ y: -4 }}
            className="group surface-card surface-card-hover rounded-3xl p-7 flex flex-col justify-between transition-all"
          >
            <div className="space-y-5">
              <div className="flex items-center justify-between border-b border-white/[0.1] pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#0D1425]/85 border border-white/[0.12]">
                    {getServiceIcon(service.iconName)}
                  </div>
                  <span className="text-xs font-mono text-[#3B82F6] font-bold">
                    Service {service.number}
                  </span>
                </div>
              </div>

              <h2 className="text-xl sm:text-2xl font-extrabold font-display text-[#F8FAFC] group-hover:text-[#3B82F6] transition-colors">
                {service.title}
              </h2>

              <p className="text-[#94A3B8] text-sm leading-relaxed">{service.fullDesc}</p>

              <div className="space-y-2 pt-1">
                <span className="text-xs font-mono font-semibold text-[#94A3B8] uppercase tracking-wider block">
                  Scope &amp; Deliverables
                </span>
                <div className="space-y-2">
                  {service.deliverables.map((deliv) => (
                    <div key={deliv} className="flex items-start gap-2 text-xs text-[#F8FAFC]/90">
                      <Check className="w-4 h-4 text-[#3B82F6] mt-0.5 shrink-0" />
                      <span>{deliv}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/[0.1] mt-6">
              <button
                type="button"
                onClick={() => onNavigate('contact')}
                className="w-full py-3 rounded-xl bg-[#3B82F6] hover:bg-[#2563EB] text-[#F8FAFC] font-semibold text-xs tracking-wide transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Inquire About This Service</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 5-Step Workflow */}
      <MotionReveal>
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono font-semibold text-[#3B82F6] uppercase tracking-wider">
              Delivery Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-[#F8FAFC]">
              5-Stage Delivery Workflow
            </h2>
            <p className="text-xs sm:text-sm text-[#94A3B8]">
              A structured engineering process from initial discovery to production launch.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {serviceWorkflow.map((wf, idx) => (
              <MotionReveal key={wf.step} delay={idx * 0.05} yOffset={12}>
                <div className="surface-card surface-card-hover spotlight-surface rounded-2xl p-5 space-y-2.5 h-full">
                  <span className="text-xs font-mono font-bold text-[#3B82F6] block">
                    Step {wf.step}
                  </span>
                  <h3 className="text-sm font-bold font-display text-[#F8FAFC]">{wf.title}</h3>
                  <p className="text-xs text-[#94A3B8] leading-relaxed">{wf.desc}</p>
                </div>
              </MotionReveal>
            ))}
          </div>
        </div>
      </MotionReveal>

      {/* Engineering Standards */}
      <div className="surface-card rounded-3xl p-7 sm:p-10 space-y-6">
        <span className="text-xs font-mono font-semibold text-[#3B82F6] uppercase tracking-wider">
          Working Standards
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-[#F8FAFC]">
          How Collaborations Are Structured
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#0D1425]/80 border border-white/[0.1] space-y-2">
            <ShieldCheck className="w-6 h-6 text-[#3B82F6]" />
            <h3 className="text-lg font-bold font-display text-[#F8FAFC]">Full Code Ownership</h3>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              You receive full source repository access, clear setup notes, and deployment ownership with zero lock-in.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-[#0D1425]/80 border border-white/[0.1] space-y-2">
            <Clock className="w-6 h-6 text-emerald-400" />
            <h3 className="text-lg font-bold font-display text-[#F8FAFC]">Clear Milestones</h3>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              Regular progress updates, transparent scope checkpoints, and structured browser testing across devices.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-[#0D1425]/80 border border-white/[0.1] space-y-2">
            <Zap className="w-6 h-6 text-[#8B5CF6]" />
            <h3 className="text-lg font-bold font-display text-[#F8FAFC]">Performance &amp; Accessibility</h3>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              Mobile-first layout engineering, optimized asset formats, semantic HTML, and accessible keyboard navigation.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="surface-card rounded-3xl p-8 sm:p-12 border-[#3B82F6]/30 text-center space-y-5 bg-gradient-to-br from-[#3B82F6]/10 via-white/[0.04] to-[#8B5CF6]/10">
        <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-[#F8FAFC]">
          Ready to Discuss Your Project Scope?
        </h2>
        <p className="text-xs sm:text-sm text-[#94A3B8] max-w-xl mx-auto leading-relaxed">
          Share your goals, timeline, and requirements via direct contact channels to start a focused conversation.
        </p>
        <div className="pt-1">
          <button
            type="button"
            onClick={() => onNavigate('contact')}
            className="px-7 py-3.5 rounded-xl bg-[#3B82F6] hover:bg-[#2563EB] text-[#F8FAFC] font-semibold text-sm inline-flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Rocket className="w-4 h-4" />
            <span>View Contact Channels</span>
          </button>
        </div>
      </div>
    </div>
  );
};
