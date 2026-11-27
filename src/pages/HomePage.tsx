import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { PageId, Project } from '../types';
import { PERSONAL_INFO, PROJECTS, SERVICES, EXPERIENCE_ITEMS, AEO_FAQS } from '../data/portfolioData';
import { Project3DCarousel } from '../components/Project3DCarousel';
import { SpotlightCard } from '../components/SpotlightCard';
import { EditorialMarquee } from '../components/EditorialMarquee';
import { MotionReveal, AnimatedStat } from '../components/MotionReveal';
import { NotificationSubscriptionCard } from '../components/NotificationSubscriptionCard';
import {
  ArrowUpRight,
  Cpu,
  ExternalLink,
  GraduationCap,
  Award,
  X,
  ZoomIn,
  FileText,
  Download,
  CheckCircle2,
  MapPin,
  Code2,
  SearchCheck,
  Palette,
  HelpCircle,
  ChevronDown,
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onSelectProject: (project: Project) => void;
}

const GOOGLE_AI_BADGES = [
  {
    title: 'Google AI Fundamentals',
    type: 'Credly Verified',
    date: '15 Nov 2026',
    image: '/images/certificates/google-ai-fundamentals-2026.webp',
    fallbackImage: '/assets/aistudio/GoogleAIFundamentals_Badge20261115-21-oiv3es_page-0001_61ad1a4a.jpg',
    verifyUrl: 'https://www.credly.com/go/TWCMECRu',
    subtitle: 'Issued by Coursera & Google • ID: COSC241103038',
    width: 3300,
    height: 2550,
  },
  {
    title: 'Google AI for Writing and Communicating',
    type: 'Credly Verified',
    date: '15 Nov 2026',
    image: '/images/certificates/google-ai-writing-communicating-2026.webp',
    fallbackImage: '/assets/aistudio/GoogleAIforWritingandCommunicating_Badge20261115-21-pheskb_page-0001_9dfedb0c.jpg',
    verifyUrl: 'https://www.credly.com/go/NBK5o3WH',
    subtitle: 'Issued by Coursera & Google • ID: COSC241103038',
    width: 3300,
    height: 2550,
  },
  {
    title: 'Google AI for Brainstorming and Planning',
    type: 'Credly Verified',
    date: '15 Nov 2026',
    image: '/images/certificates/google-ai-brainstorming-planning-2026.webp',
    fallbackImage: '/assets/aistudio/GoogleAIforBrainstormingandPlanning_Badge20261115-21-nn2tzk_page-0001_02066a5f.jpg',
    verifyUrl: 'https://www.credly.com/go/oBw1opSn',
    subtitle: 'Issued by Coursera & Google • ID: COSC241103038',
    width: 3300,
    height: 2550,
  },
  {
    title: 'AI for App Building',
    type: 'Coursera Certificate',
    date: '16 Nov 2026',
    image: '/assets/aistudio/Coursera_CHB462QJ6RVH_page-0001_aadbbfe8.jpg',
    fallbackImage: '/assets/aistudio/Coursera_CHB462QJ6RVH_page-0001_aadbbfe8.jpg',
    verifyUrl: 'https://coursera.org/verify/CHB462QJ6RVH',
    subtitle: 'Authorized by Google & offered through Coursera • ID: CHB462QJ6RVH',
    width: 3300,
    height: 2550,
  },
  {
    title: 'AI for Data Analysis',
    type: 'Coursera Certificate',
    date: '17 Nov 2026',
    image: '/assets/aistudio/Coursera_TP7VLK5828ET_page-0001_725a85ff.jpg',
    fallbackImage: '/assets/aistudio/Coursera_TP7VLK5828ET_page-0001_725a85ff.jpg',
    verifyUrl: 'https://coursera.org/verify/TP7VLK5828ET',
    subtitle: 'Authorized by Google & offered through Coursera • ID: TP7VLK5828ET',
    width: 3300,
    height: 2550,
  },
  {
    title: 'AI for App Deployment',
    type: 'Coursera Certificate',
    date: '17 Nov 2026',
    image: '/assets/aistudio/Coursera_25V3FGI10PCJ_page-0001_50caa1fc.jpg',
    fallbackImage: '/assets/aistudio/Coursera_25V3FGI10PCJ_page-0001_50caa1fc.jpg',
    verifyUrl: 'https://coursera.org/verify/25V3FGI10PCJ',
    subtitle: 'Authorized by Google & offered through Coursera • ID: 25V3FGI10PCJ',
    width: 3300,
    height: 2550,
  },
];

const HERO_ROLES = [
  'Multidisciplinary Developer, SEO Specialist & Entrepreneur',
  'Full-Stack React, Next.js & TypeScript Engineer',
  'AI Developer & Prompt Workflow Architect',
  'Technical SEO, AEO & GEO Strategist',
];

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onSelectProject }) => {
  const [activeCertificate, setActiveCertificate] = useState<{
    title: string;
    image: string;
    fallbackImage?: string;
    subtitle?: string;
    verifyUrl?: string;
    pdfUrl?: string;
  } | null>(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;
    const interval = window.setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % HERO_ROLES.length);
    }, 3400);
    return () => window.clearInterval(interval);
  }, [shouldReduceMotion]);

  useEffect(() => {
    if (!activeCertificate) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveCertificate(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeCertificate]);

  return (
    <div className="space-y-20 sm:space-y-24 pb-20">
      {/* ================= HERO SECTION ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-12 space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="flex flex-wrap items-center gap-2 text-[#3B82F6] font-mono text-xs font-semibold">
              <MapPin className="w-3.5 h-3.5" />
              <span>{PERSONAL_INFO.location}</span>
              <span aria-hidden="true" className="text-[#94A3B8]/50">&middot;</span>
              <span className="text-[#94A3B8]">BSCS 5th Semester &bull; CGPA 3.65</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-display tracking-tight text-[#F8FAFC] leading-[1.05]">
                {PERSONAL_INFO.name}
              </h1>
              <div className="min-h-[2.25rem] sm:min-h-[2.5rem] flex items-center overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={roleIndex}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={shouldReduceMotion ? undefined : { opacity: 0, y: -10 }}
                    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                    className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-[#3B82F6] via-[#60A5FA] to-[#8B5CF6] bg-clip-text text-transparent font-display"
                  >
                    {HERO_ROLES[roleIndex]}
                  </motion.p>
                </AnimatePresence>
              </div>
              <div className="flex lg:hidden items-center gap-1.5 pt-0.5">
                {HERO_ROLES.map((role, idx) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => setRoleIndex(idx)}
                    aria-label={`Show role ${idx + 1}`}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      roleIndex === idx ? 'w-5 bg-[#3B82F6]' : 'w-1.5 bg-white/[0.25]'
                    }`}
                  />
                ))}
              </div>
            </div>

            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed max-w-2xl">
              {PERSONAL_INFO.bioSummary}
            </p>

            {/* Primary CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <motion.button
                type="button"
                whileHover={shouldReduceMotion ? undefined : { y: -2 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
                onClick={() => onNavigate('projects')}
                className="group px-6 py-3.5 rounded-xl bg-[#3B82F6] hover:bg-[#2563EB] text-[#F8FAFC] font-semibold text-sm shadow-[0_0_28px_rgba(59,130,246,0.28)] transition-all inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Explore Projects</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </motion.button>
              <motion.button
                type="button"
                whileHover={shouldReduceMotion ? undefined : { y: -2 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
                onClick={() => onNavigate('contact')}
                className="px-6 py-3.5 rounded-xl bg-white/[0.05] border border-white/[0.14] hover:border-[#3B82F6]/50 hover:bg-white/[0.08] text-[#F8FAFC] font-semibold text-sm transition-all inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Direct Contact</span>
              </motion.button>
            </div>

            {/* Clean Typographic Highlights */}
            <div className="pt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-mono text-[#94A3B8]">
              <span>Founder &amp; AI Developer — The Sports Room</span>
              <span aria-hidden="true" className="text-white/25">&middot;</span>
              <span>ACM KFUEIT Dev Team Head</span>
              <span aria-hidden="true" className="text-white/25">&middot;</span>
              <span>Ambassador of D&apos;Educationist</span>
            </div>
          </motion.div>

          {/* Right Glass Portrait & Verified Profile Card */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.45, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <SpotlightCard className="rounded-3xl p-6 sm:p-7 border-[#3B82F6]/25">
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border border-[#3B82F6]/40 shadow-[0_0_24px_rgba(59,130,246,0.18)] shrink-0 bg-[#0D1425] group/avatar">
                    <img
                      src="/avatar.webp"
                      alt="Hanan Irfan — Developer & SEO Specialist"
                      width={96}
                      height={96}
                      loading="eager"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (!target.src.endsWith('/avatar.jpg')) {
                          target.src = '/avatar.jpg';
                        }
                      }}
                      className="w-full h-full object-cover aspect-square group-hover/avatar:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs font-mono text-[#3B82F6] font-semibold">Verified Profile</div>
                    <h2 className="text-xl font-extrabold font-display text-[#F8FAFC]">
                      {PERSONAL_INFO.name}
                    </h2>
                    <p className="text-xs text-[#94A3B8]">
                      {PERSONAL_INFO.education.degree} &bull; KFUEIT
                    </p>
                  </div>
                </div>

                <div className="border-t border-white/[0.1] pt-4 space-y-2.5 text-xs">
                  <div className="flex items-center justify-between py-1 gap-2">
                    <span className="text-[#94A3B8] font-mono">Academic Standing</span>
                    <span className="font-semibold text-[#F8FAFC] text-right">5th Semester (CGPA 3.65)</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-t border-white/[0.08] gap-2">
                    <span className="text-[#94A3B8] font-mono">Founder Role</span>
                    <a
                      href="https://thesportsroom.online"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-[#3B82F6] hover:underline inline-flex items-center gap-1"
                    >
                      The Sports Room <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <div className="flex items-center justify-between py-1 border-t border-white/[0.08] gap-2">
                    <span className="text-[#94A3B8] font-mono">Campus Leadership</span>
                    <span className="font-semibold text-[#F8FAFC] text-right">ACM Dev Head &bull; D&apos;Educationist</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-t border-white/[0.08] gap-2">
                    <span className="text-[#94A3B8] font-mono">Core Focus</span>
                    <span className="font-semibold text-[#F8FAFC] text-right">AI Dev &bull; Full-Stack &bull; SEO/AEO/GEO</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap gap-2">
                  <a
                    href={PERSONAL_INFO.socials.github.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-xl bg-white/[0.05] border border-white/[0.1] hover:border-[#3B82F6]/50 hover:text-[#3B82F6] text-[#F8FAFC] text-xs font-medium transition-colors"
                  >
                    GitHub
                  </a>
                  <a
                    href={PERSONAL_INFO.socials.linkedin.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-xl bg-white/[0.05] border border-white/[0.1] hover:border-[#3B82F6]/50 hover:text-[#3B82F6] text-[#F8FAFC] text-xs font-medium transition-colors"
                  >
                    LinkedIn
                  </a>
                  <a
                    href={PERSONAL_INFO.socials.x.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-xl bg-white/[0.05] border border-white/[0.1] hover:border-[#3B82F6]/50 hover:text-[#3B82F6] text-[#F8FAFC] text-xs font-medium transition-colors"
                  >
                    X (@hananirfan91)
                  </a>
                  <a
                    href={PERSONAL_INFO.socials.instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-xl bg-white/[0.05] border border-white/[0.1] hover:border-[#3B82F6]/50 hover:text-[#3B82F6] text-[#F8FAFC] text-xs font-medium transition-colors"
                  >
                    Instagram
                  </a>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>
        </div>

        {/* 4-Column Verified Key Metrics Row */}
        <MotionReveal delay={0.08}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <SpotlightCard className="rounded-2xl p-5 space-y-1.5">
              <div className="text-2xl sm:text-3xl font-black font-mono text-[#F8FAFC]">
                <AnimatedStat target={3.65} decimals={2} />
                <span className="text-xs text-[#94A3B8] font-normal ml-1">/ 4.00</span>
              </div>
              <div className="text-xs font-semibold text-[#3B82F6]">BSCS CGPA &bull; 5th Sem</div>
              <p className="text-[11px] text-[#94A3B8]">KFUEIT Dean&apos;s Honor Roll</p>
            </SpotlightCard>

            <SpotlightCard
              onClick={() => onNavigate('projects')}
              className="rounded-2xl p-5 space-y-1.5"
            >
              <div className="text-2xl sm:text-3xl font-black font-mono text-[#F8FAFC]">
                <AnimatedStat target={PROJECTS.length} suffix="+" />
              </div>
              <div className="text-xs font-semibold text-[#8B5CF6]">Live Digital Products</div>
              <p className="text-[11px] text-[#94A3B8]">Web Apps, SaaS, AI &amp; Media</p>
            </SpotlightCard>

            <SpotlightCard className="rounded-2xl p-5 space-y-1.5">
              <div className="text-2xl sm:text-3xl font-black font-mono text-[#F8FAFC]">
                <AnimatedStat target={GOOGLE_AI_BADGES.length + 4} />
              </div>
              <div className="text-xs font-semibold text-emerald-400">Honors &amp; AI Credentials</div>
              <p className="text-[11px] text-[#94A3B8]">Google, Coursera &amp; University</p>
            </SpotlightCard>

            <SpotlightCard
              onClick={() => onNavigate('experience')}
              className="rounded-2xl p-5 space-y-1.5"
            >
              <div className="text-2xl sm:text-3xl font-black font-mono text-[#F8FAFC]">
                <AnimatedStat target={3} />
              </div>
              <div className="text-xs font-semibold text-[#3B82F6]">Leadership Roles</div>
              <p className="text-[11px] text-[#94A3B8]">The Sports Room, ACM &amp; Ambassador</p>
            </SpotlightCard>
          </div>
        </MotionReveal>

        {/* Mobile-only 3-Column Quick Practice Strip (App-Style Layout) */}
        <div className="lg:hidden space-y-3 pt-1">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-extrabold font-display text-[#F8FAFC] tracking-tight">
              Explore by Practice
            </h2>
            <button
              type="button"
              onClick={() => onNavigate('services')}
              className="text-[11px] font-mono font-semibold text-[#3B82F6] cursor-pointer"
            >
              View All
            </button>
          </div>
          <div className="grid grid-cols-3 gap-2.5">
            <button
              type="button"
              onClick={() => onNavigate('web-development')}
              className="surface-card rounded-2xl p-2.5 text-center space-y-2 hover:border-[#3B82F6]/45 transition-colors cursor-pointer"
            >
              <div className="aspect-square rounded-xl bg-[#3B82F6]/12 border border-[#3B82F6]/25 flex items-center justify-center text-[#3B82F6]">
                <Code2 className="w-6 h-6" />
              </div>
              <span className="block text-[11px] font-bold text-[#F8FAFC] truncate">
                Web Dev
              </span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('seo-expert')}
              className="surface-card rounded-2xl p-2.5 text-center space-y-2 hover:border-[#3B82F6]/45 transition-colors cursor-pointer"
            >
              <div className="aspect-square rounded-xl bg-emerald-500/12 border border-emerald-400/25 flex items-center justify-center text-emerald-400">
                <SearchCheck className="w-6 h-6" />
              </div>
              <span className="block text-[11px] font-bold text-[#F8FAFC] truncate">
                SEO &amp; GEO
              </span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('graphic-design')}
              className="surface-card rounded-2xl p-2.5 text-center space-y-2 hover:border-[#3B82F6]/45 transition-colors cursor-pointer"
            >
              <div className="aspect-square rounded-xl bg-[#8B5CF6]/12 border border-[#8B5CF6]/25 flex items-center justify-center text-[#8B5CF6]">
                <Palette className="w-6 h-6" />
              </div>
              <span className="block text-[11px] font-bold text-[#F8FAFC] truncate">
                UI Design
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Editorial Kinetic Marquee Ribbon */}
      <EditorialMarquee />

      {/* ================= RECOGNITION & CERTIFICATIONS ================= */}
      <section
        aria-labelledby="recognition-certifications-heading"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8"
      >
        <MotionReveal>
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-[#8B5CF6] font-mono text-xs font-semibold uppercase tracking-wider">
              <Award className="w-4 h-4" />
              <span>Honors, Awards &amp; Credentials</span>
            </div>
            <h3 id="recognition-certifications-heading" className="text-3xl sm:text-4xl font-black font-display text-[#F8FAFC] tracking-tight">
              Recognition &amp; Certifications
            </h3>
            <p className="text-[#94A3B8] text-sm sm:text-base max-w-3xl leading-relaxed">
              A collection of my academic achievements and professional certifications, reflecting my commitment to continuous learning, technical growth, and academic excellence.
            </p>
          </div>
        </MotionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 1. Dean's Honor Certificate (First) */}
          <article className="md:col-span-2 lg:col-span-3 surface-card spotlight-surface surface-card-hover rounded-3xl p-6 sm:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
              <div className="lg:col-span-5">
                <div
                  onClick={() =>
                    setActiveCertificate({
                      title: "Dean's Honor Certificate",
                      subtitle: 'Khwaja Fareed University of Engineering and Information Technology (KFUEIT)',
                      image: '/images/certificates/deans-honor-certificate-2026.webp',
                      fallbackImage: '/images/certificates/deans-honor-certificate-2026.png',
                    })
                  }
                  className="relative group/img overflow-hidden rounded-2xl border border-white/[0.14] bg-[#0D1425] cursor-pointer aspect-[3/4] max-h-80 mx-auto flex items-center justify-center"
                >
                  <picture className="block w-full h-full">
                    <source srcSet="/images/certificates/deans-honor-certificate-2026.webp" type="image/webp" />
                    <img
                      src="/images/certificates/deans-honor-certificate-2026.webp"
                      alt="Dean's Honor Certificate awarded to Abdul Hanan Irfan by KFUEIT"
                      width={1086}
                      height={1448}
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (!target.src.endsWith('/images/certificates/deans-honor-certificate-2026.png')) {
                          target.src = '/images/certificates/deans-honor-certificate-2026.png';
                        }
                      }}
                      className="w-full h-full object-contain p-1.5 group-hover/img:scale-[1.03] transition-transform duration-300"
                    />
                  </picture>
                  <div className="absolute inset-0 bg-[#080D1B]/75 opacity-0 group-hover/img:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1.5 text-[#F8FAFC] text-xs font-semibold p-4 text-center">
                    <ZoomIn className="w-5 h-5 text-[#3B82F6]" />
                    <span>View Full Certificate</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-4">
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#94A3B8]">
                  <span className="text-[#3B82F6] font-semibold">Latest Achievement</span>
                  <span aria-hidden="true">&middot;</span>
                  <span>November 2026</span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#8B5CF6] font-semibold">
                    <Award className="w-4 h-4" />
                    <span>Academic Excellence &bull; KFUEIT</span>
                  </div>
                  <h4 className="text-2xl sm:text-3xl font-extrabold font-display text-[#F8FAFC]">
                    Dean&apos;s Honor Certificate
                  </h4>
                  <p className="text-[#94A3B8] text-sm leading-relaxed">
                    Received in recognition of achieving a good CGPA in a single semester. Awarded to{' '}
                    <strong className="text-[#F8FAFC]">Abdul Hanan Irfan</strong> by the{' '}
                    <strong className="text-[#F8FAFC]">Faculty of Information Technology</strong> at Khwaja Fareed University of Engineering and Information Technology (KFUEIT).
                  </p>
                </div>

                <div className="pt-4 border-t border-white/[0.1] flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                  <span className="text-[#94A3B8] font-medium">KFUEIT &bull; BS Computer Science</span>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveCertificate({
                        title: "Dean's Honor Certificate",
                        subtitle: 'Khwaja Fareed University of Engineering and Information Technology (KFUEIT)',
                        image: '/images/certificates/deans-honor-certificate-2026.webp',
                        fallbackImage: '/images/certificates/deans-honor-certificate-2026.png',
                      })
                    }
                    className="text-[#3B82F6] hover:text-[#F8FAFC] font-semibold inline-flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <span>View Certificate</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </article>

          {/* 2. Google AI Professional Certificate + 5 Badges */}
          <article className="md:col-span-2 lg:col-span-3 surface-card surface-card-hover rounded-3xl p-6 sm:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
              <div className="lg:col-span-5">
                <div
                  onClick={() =>
                    setActiveCertificate({
                      title: 'Google AI Professional Certificate',
                      subtitle: '8-Course Specialization • Google & Coursera • Nov 16, 2026',
                      image: '/images/certificates/google-ai-professional-certificate-2026.png',
                      fallbackImage: '/images/certificates/google-ai-fundamentals-2026.webp',
                      verifyUrl: 'https://coursera.org/verify/professional-cert/X7TCM4MBEUWP',
                      pdfUrl: '/assets/aistudio/Coursera_X7TCM4MBEUWP_694dbd0c.pdf',
                    })
                  }
                  className="relative group/img overflow-hidden rounded-2xl border border-white/[0.14] bg-[#0D1425] cursor-pointer aspect-[4/3] max-h-80 mx-auto flex items-center justify-center"
                >
                  <img
                    src="/images/certificates/google-ai-professional-certificate-2026.png"
                    alt="Google AI Professional Certificate issued by Google and Coursera to Abdul Hanan Irfan"
                    width={2420}
                    height={1870}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain p-1.5 group-hover/img:scale-[1.03] transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-[#080D1B]/75 opacity-0 group-hover/img:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1.5 text-[#F8FAFC] text-xs font-semibold p-4 text-center">
                    <ZoomIn className="w-5 h-5 text-[#3B82F6]" />
                    <span>View Full Certificate</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-4">
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#94A3B8]">
                  <span className="text-[#3B82F6] font-semibold">8-Course Specialization</span>
                  <span aria-hidden="true">&middot;</span>
                  <span>16 Nov 2026</span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#8B5CF6] font-semibold">
                    <Cpu className="w-4 h-4" />
                    <span>Google Career Certificates &bull; Coursera</span>
                  </div>
                  <h4 className="text-2xl sm:text-3xl font-extrabold font-display text-[#F8FAFC]">
                    Google AI Professional Certificate
                  </h4>
                  <p className="text-[#94A3B8] text-sm leading-relaxed">
                    Awarded to <strong className="text-[#F8FAFC]">Abdul Hanan Irfan</strong> by{' '}
                    <strong className="text-[#F8FAFC]">Google &amp; Coursera</strong> after completing all 8 courses covering AI Fundamentals, Brainstorming &amp; Planning, Research &amp; Insights, Writing &amp; Communicating, Content Creation, Data Analysis, App Building, and App Deployment.
                  </p>
                </div>

                <div className="pt-4 border-t border-white/[0.1] flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                  <span className="text-[#94A3B8] font-medium">Credential ID: X7TCM4MBEUWP</span>
                  <div className="flex flex-wrap items-center gap-4">
                    <button
                      type="button"
                      onClick={() =>
                        setActiveCertificate({
                          title: 'Google AI Professional Certificate',
                          subtitle: '8-Course Specialization • Google & Coursera • Nov 16, 2026',
                          image: '/images/certificates/google-ai-professional-certificate-2026.png',
                          fallbackImage: '/images/certificates/google-ai-fundamentals-2026.webp',
                          verifyUrl: 'https://coursera.org/verify/professional-cert/X7TCM4MBEUWP',
                          pdfUrl: '/assets/aistudio/Coursera_X7TCM4MBEUWP_694dbd0c.pdf',
                        })
                      }
                      className="text-[#3B82F6] hover:text-[#F8FAFC] font-semibold inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>View</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                    <a
                      href="/assets/aistudio/Coursera_X7TCM4MBEUWP_694dbd0c.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#F8FAFC] hover:text-[#3B82F6] font-semibold inline-flex items-center gap-1"
                    >
                      <span>Open PDF</span>
                      <FileText className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href="/assets/aistudio/Coursera_X7TCM4MBEUWP_694dbd0c.pdf"
                      download="Hanan_Irfan_Google_AI_Certificate.pdf"
                      className="text-[#94A3B8] hover:text-[#F8FAFC] font-semibold inline-flex items-center gap-1"
                    >
                      <span>Save</span>
                      <Download className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href="https://coursera.org/verify/professional-cert/X7TCM4MBEUWP"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#8B5CF6] hover:text-[#F8FAFC] font-semibold inline-flex items-center gap-1"
                    >
                      <span>Verify</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-7 pt-6 border-t border-white/[0.1] space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-mono text-[#F8FAFC] font-bold uppercase tracking-wider">
                  Earned Google AI &amp; Coursera Course Badges
                </span>
                <span className="text-xs font-mono text-[#94A3B8]">
                  {GOOGLE_AI_BADGES.length} Verified Badges &amp; Certificates
                </span>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {GOOGLE_AI_BADGES.map((badge) => (
                  <div
                    key={badge.title}
                    className="rounded-2xl p-3 sm:p-3.5 border border-white/[0.12] bg-[#0D1425]/70 hover:border-[#3B82F6]/45 transition-colors flex flex-col justify-between gap-2.5 sm:gap-3"
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between gap-1 text-[10px] font-mono text-[#94A3B8]">
                        <span className="text-[#3B82F6] font-semibold truncate">{badge.type}</span>
                        <span className="shrink-0">{badge.date}</span>
                      </div>

                      <div
                        onClick={() =>
                          setActiveCertificate({
                            title: badge.title,
                            subtitle: badge.subtitle,
                            image: badge.image,
                            fallbackImage: badge.fallbackImage,
                            verifyUrl: badge.verifyUrl,
                          })
                        }
                        className="relative overflow-hidden rounded-xl border border-white/[0.1] bg-[#080D1B] cursor-pointer aspect-[4/3] flex items-center justify-center p-1.5 group/badge"
                      >
                        <picture className="block w-full h-full">
                          {badge.image.endsWith('.webp') && (
                            <source srcSet={badge.image} type="image/webp" />
                          )}
                          <img
                            src={badge.image}
                            alt={`${badge.title} — Abdul Hanan Irfan`}
                            width={badge.width}
                            height={badge.height}
                            loading="lazy"
                            decoding="async"
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              const target = e.currentTarget;
                              if (!target.src.endsWith(badge.fallbackImage)) {
                                target.src = badge.fallbackImage;
                              }
                            }}
                            className="w-full h-full object-contain group-hover/badge:scale-105 transition-transform duration-300"
                          />
                        </picture>
                      </div>

                      <h5 className="text-xs font-bold font-display text-[#F8FAFC] leading-snug">
                        {badge.title}
                      </h5>
                    </div>

                    <div className="pt-2 border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono">
                      <button
                        type="button"
                        onClick={() =>
                          setActiveCertificate({
                            title: badge.title,
                            subtitle: badge.subtitle,
                            image: badge.image,
                            fallbackImage: badge.fallbackImage,
                            verifyUrl: badge.verifyUrl,
                          })
                        }
                        className="text-[#3B82F6] hover:underline inline-flex items-center gap-0.5 cursor-pointer"
                      >
                        <span>View</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </button>
                      <a
                        href={badge.verifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#8B5CF6] hover:underline inline-flex items-center gap-0.5"
                      >
                        <span>Verify</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </article>

          {/* 3. ACM KFUEIT Certificate of Appreciation */}
          <article className="surface-card surface-card-hover rounded-3xl p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2 text-xs font-mono text-[#94A3B8]">
                <span className="text-[#3B82F6] font-semibold">Web Developer</span>
                <span>Session 2025–26</span>
              </div>

              <div
                onClick={() =>
                  setActiveCertificate({
                    title: 'Certificate of Appreciation — Web Developer',
                    subtitle: 'ACM KFUEIT Student Chapter',
                    image: '/certificate.webp',
                    fallbackImage: '/certificate.jpg',
                  })
                }
                className="relative group/img overflow-hidden rounded-2xl border border-white/[0.12] bg-[#0D1425] cursor-pointer aspect-[4/3] flex items-center justify-center"
              >
                <picture className="block w-full h-full">
                  <source srcSet="/certificate.webp" type="image/webp" />
                  <img
                    src="/certificate.webp"
                    alt="ACM KFUEIT Web Developer Certificate — Abdul Hanan Irfan"
                    width={900}
                    height={672}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.src.endsWith('/certificate.jpg')) {
                        target.src = '/certificate.jpg';
                      }
                    }}
                    className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-300"
                  />
                </picture>
              </div>

              <div className="space-y-1.5">
                <h4 className="text-lg font-bold font-display text-[#F8FAFC]">
                  Certificate of Appreciation — ACM KFUEIT
                </h4>
                <p className="text-[#94A3B8] text-xs sm:text-sm leading-relaxed">
                  Presented to <strong className="text-[#F8FAFC]">Abdul Hanan Irfan</strong> for dedication and contributions as Web Developer for <strong className="text-[#F8FAFC]">ACM KFUEIT</strong> during session 2025–26.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-white/[0.1] flex items-center justify-between text-xs font-mono">
              <span className="text-[#94A3B8] truncate pr-2">ACM KFUEIT Chapter</span>
              <button
                type="button"
                onClick={() =>
                  setActiveCertificate({
                    title: 'Certificate of Appreciation — Web Developer',
                    subtitle: 'ACM KFUEIT Student Chapter',
                    image: '/certificate.webp',
                    fallbackImage: '/certificate.jpg',
                  })
                }
                className="text-[#3B82F6] hover:underline font-semibold inline-flex items-center gap-1 shrink-0 cursor-pointer"
              >
                <span>View</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </article>

          {/* 4. Nayi Manzil Web Development Certificate */}
          <article className="surface-card surface-card-hover rounded-3xl p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2 text-xs font-mono text-[#94A3B8]">
                <span className="text-[#8B5CF6] font-semibold">Program Completion</span>
                <span>Web Development</span>
              </div>

              <div
                onClick={() =>
                  setActiveCertificate({
                    title: 'Web Development Certificate — Nayi Manzil',
                    subtitle: 'Nayi Manzil Program Completion',
                    image: '/abdul-hanan-irfan-nayi-manzil-web-development-certificate.webp',
                    fallbackImage: '/assets/aistudio/NM-CCC-2026-KBJNSFEG5E_page-0001_3ed9f65f.jpg',
                  })
                }
                className="relative group/img overflow-hidden rounded-2xl border border-white/[0.12] bg-[#0D1425] cursor-pointer aspect-[4/3] flex items-center justify-center"
              >
                <picture className="block w-full h-full">
                  <source srcSet="/abdul-hanan-irfan-nayi-manzil-web-development-certificate.webp" type="image/webp" />
                  <img
                    src="/abdul-hanan-irfan-nayi-manzil-web-development-certificate.webp"
                    alt="Abdul Hanan Irfan's Web Development Certificate awarded by Nayi Manzil."
                    width={3508}
                    height={2481}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.src.endsWith('/assets/aistudio/NM-CCC-2026-KBJNSFEG5E_page-0001_3ed9f65f.jpg')) {
                        target.src = '/assets/aistudio/NM-CCC-2026-KBJNSFEG5E_page-0001_3ed9f65f.jpg';
                      }
                    }}
                    className="w-full h-full object-contain p-1 group-hover/img:scale-105 transition-transform duration-300"
                  />
                </picture>
              </div>

              <div className="space-y-1.5">
                <h4 className="text-lg font-bold font-display text-[#F8FAFC]">
                  Web Development Certificate — Nayi Manzil
                </h4>
                <p className="text-[#94A3B8] text-xs sm:text-sm leading-relaxed">
                  Awarded to <strong className="text-[#F8FAFC]">Abdul Hanan Irfan</strong> upon completing the Nayi Manzil Web Development curriculum and practical projects.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-white/[0.1] flex items-center justify-between text-xs font-mono">
              <span className="text-[#94A3B8]">Nayi Manzil</span>
              <button
                type="button"
                onClick={() =>
                  setActiveCertificate({
                    title: 'Web Development Certificate — Nayi Manzil',
                    subtitle: 'Nayi Manzil Program Completion',
                    image: '/abdul-hanan-irfan-nayi-manzil-web-development-certificate.webp',
                    fallbackImage: '/assets/aistudio/NM-CCC-2026-KBJNSFEG5E_page-0001_3ed9f65f.jpg',
                  })
                }
                className="text-[#3B82F6] hover:underline font-semibold inline-flex items-center gap-1 cursor-pointer"
              >
                <span>View</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </article>

          {/* 5. D'Educationist Ambassador */}
          <article className="md:col-span-2 lg:col-span-1 surface-card surface-card-hover rounded-3xl p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2 text-xs font-mono text-[#94A3B8]">
                <span className="text-[#3B82F6] font-semibold inline-flex items-center gap-1">
                  <GraduationCap className="w-3.5 h-3.5" /> Campus Role
                </span>
                <span>KFUEIT Campus</span>
              </div>

              <div
                onClick={() =>
                  setActiveCertificate({
                    title: "Ambassador of D'Educationist @ KFUEIT",
                    subtitle: "D'Educationist Student Outreach & Guidance",
                    image: '/deducationist-ambassador.webp',
                    fallbackImage: '/deducationist-ambassador.jpg',
                  })
                }
                className="relative group/img overflow-hidden rounded-2xl border border-white/[0.12] bg-[#0D1425] cursor-pointer aspect-[4/3] flex items-center justify-center"
              >
                <picture className="block w-full h-full">
                  <source srcSet="/deducationist-ambassador.webp" type="image/webp" />
                  <img
                    src="/deducationist-ambassador.webp"
                    alt="Hanan Irfan joins D'Educationist as Ambassador at KFUEIT RYK"
                    width={800}
                    height={1000}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.src.endsWith('/deducationist-ambassador.jpg')) {
                        target.src = '/deducationist-ambassador.jpg';
                      }
                    }}
                    className="w-full h-full object-cover object-top group-hover/img:scale-105 transition-transform duration-300"
                  />
                </picture>
              </div>

              <div className="space-y-1.5">
                <h4 className="text-lg font-bold font-display text-[#F8FAFC]">
                  Ambassador of D&apos;Educationist @ KFUEIT
                </h4>
                <p className="text-[#94A3B8] text-xs sm:text-sm leading-relaxed">
                  Representing D&apos;Educationist across the <strong className="text-[#F8FAFC]">KFUEIT</strong> community, sharing academic guidance and global study pathways with students.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-white/[0.1] flex items-center justify-between text-xs font-mono">
              <span className="text-[#94A3B8]">D&apos;Educationist &bull; KFUEIT</span>
              <button
                type="button"
                onClick={() =>
                  setActiveCertificate({
                    title: "Ambassador of D'Educationist @ KFUEIT",
                    subtitle: "D'Educationist Student Outreach & Guidance",
                    image: '/deducationist-ambassador.webp',
                    fallbackImage: '/deducationist-ambassador.jpg',
                  })
                }
                className="text-[#3B82F6] hover:underline font-semibold inline-flex items-center gap-1 cursor-pointer"
              >
                <span>View</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </article>
        </div>

        <AnimatePresence>
          {activeCertificate && (
            <div
              role="dialog"
              aria-modal="true"
              aria-label={activeCertificate.title}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveCertificate(null)}
                className="fixed inset-0 bg-[#040712]/80 backdrop-blur-md"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.97, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97, y: 16 }}
                transition={{ type: 'spring', damping: 28, stiffness: 320 }}
                className="relative w-full max-w-4xl bg-[#0D1425]/92 backdrop-blur-2xl border border-white/[0.14] rounded-3xl p-6 sm:p-8 shadow-2xl z-10 max-h-[92vh] overflow-y-auto text-[#F8FAFC]"
              >
                <button
                  type="button"
                  onClick={() => setActiveCertificate(null)}
                  className="absolute top-5 right-5 p-2 rounded-full bg-white/[0.06] border border-white/[0.12] text-[#94A3B8] hover:bg-white/[0.12] hover:text-[#F8FAFC] transition-colors cursor-pointer"
                  aria-label="Close certificate modal"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="space-y-1 mb-4 pr-10">
                  <span className="text-xs font-mono text-[#3B82F6] font-semibold uppercase tracking-wider">
                    Verified Credential
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-[#F8FAFC]">
                    {activeCertificate.title}
                  </h3>
                  {activeCertificate.subtitle && (
                    <p className="text-xs font-mono text-[#94A3B8]">{activeCertificate.subtitle}</p>
                  )}
                </div>

                <div className="rounded-2xl overflow-hidden border border-white/[0.12] bg-[#080D1B] p-2 flex items-center justify-center max-h-[68vh]">
                  <img
                    src={activeCertificate.image}
                    alt={activeCertificate.title}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const fallback = activeCertificate.fallbackImage;
                      if (fallback && !e.currentTarget.src.endsWith(fallback)) {
                        e.currentTarget.src = fallback;
                      }
                    }}
                    className="max-h-[64vh] w-auto object-contain mx-auto"
                  />
                </div>

                <div className="pt-4 flex flex-wrap items-center justify-between gap-4 mt-2">
                  <span className="text-xs font-mono text-[#94A3B8]">Abdul Hanan Irfan</span>
                  <div className="flex flex-wrap items-center gap-2">
                    {activeCertificate.verifyUrl && (
                      <a
                        href={activeCertificate.verifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-xl bg-[#3B82F6] hover:bg-[#2563EB] text-[#F8FAFC] text-xs font-semibold inline-flex items-center gap-1.5 transition-colors"
                      >
                        <span>Verify Credential</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {activeCertificate.pdfUrl && (
                      <a
                        href={activeCertificate.pdfUrl}
                        download="Hanan_Irfan_Certificate.pdf"
                        className="px-4 py-2 rounded-xl bg-white/[0.06] border border-white/[0.12] hover:bg-white/[0.1] text-[#F8FAFC] text-xs font-semibold inline-flex items-center gap-1.5 transition-colors"
                      >
                        <span>Download PDF</span>
                        <FileText className="w-3.5 h-3.5" />
                      </a>
                    )}
                    <a
                      href={activeCertificate.image}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl bg-white/[0.06] border border-white/[0.12] hover:bg-white/[0.1] text-[#F8FAFC] text-xs font-semibold inline-flex items-center gap-1.5 transition-colors"
                    >
                      <span>Open Full Image</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </section>

      {/* ================= FEATURED PROJECTS ================= */}
      <MotionReveal>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-mono font-semibold text-[#3B82F6] uppercase tracking-wider">
                Selected Engineering &amp; Product Work
              </span>
              <h2 className="text-3xl sm:text-4xl font-black font-display text-[#F8FAFC] tracking-tight">
                Featured Projects
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('projects')}
              className="text-xs font-mono font-semibold text-[#3B82F6] hover:text-[#F8FAFC] inline-flex items-center gap-1 cursor-pointer transition-colors"
            >
              <span>View All {PROJECTS.length} Projects</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          <Project3DCarousel projects={PROJECTS} onSelectProject={onSelectProject} />
        </section>
      </MotionReveal>

      {/* ================= SKILLS & EXPERTISE MATRIX ================= */}
      <MotionReveal>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-mono font-semibold text-[#3B82F6] uppercase tracking-wider">
                Core Disciplines
              </span>
              <h2 className="text-3xl sm:text-4xl font-black font-display text-[#F8FAFC] tracking-tight">
                Skills &amp; Professional Areas
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('skills')}
              className="text-xs font-mono font-semibold text-[#3B82F6] hover:text-[#F8FAFC] inline-flex items-center gap-1 cursor-pointer transition-colors"
            >
              <span>Explore Full Tech Stack</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
            {PERSONAL_INFO.professionalAreas.map((area, idx) => (
              <MotionReveal key={area} delay={idx * 0.03} yOffset={10}>
                <SpotlightCard
                  onClick={() => onNavigate('skills')}
                  className="rounded-2xl p-3.5 sm:p-4 h-full flex items-center gap-2 sm:gap-2.5 text-[11px] sm:text-xs font-semibold text-[#F8FAFC]"
                >
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#3B82F6] shrink-0" />
                    <span>{area}</span>
                  </div>
                </SpotlightCard>
              </MotionReveal>
            ))}
          </div>
        </section>
      </MotionReveal>

      {/* ================= EXPERIENCE & LEADERSHIP HIGHLIGHTS ================= */}
      <MotionReveal>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <SpotlightCard hoverable={false} className="rounded-3xl p-6 sm:p-10">
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/[0.1] pb-6">
                <div>
                  <span className="text-xs font-mono font-semibold text-[#8B5CF6] uppercase tracking-wider">
                    Experience &amp; Leadership
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-black font-display text-[#F8FAFC] mt-1">
                    Leadership &amp; Milestones
                  </h2>
                </div>
                <motion.button
                  type="button"
                  whileHover={shouldReduceMotion ? undefined : { y: -1 }}
                  whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
                  onClick={() => onNavigate('experience')}
                  className="px-4 py-2.5 rounded-xl bg-[#3B82F6] hover:bg-[#2563EB] text-[#F8FAFC] text-xs font-semibold transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Full Timeline</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </motion.button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {EXPERIENCE_ITEMS.slice(0, 3).map((exp, idx) => (
                  <MotionReveal key={exp.id} delay={idx * 0.05} yOffset={12}>
                    <div className="p-5 rounded-2xl bg-[#0D1425]/80 border border-white/[0.1] hover:border-[#3B82F6]/35 transition-colors space-y-2.5 h-full">
                      <span className="text-[11px] font-mono text-[#3B82F6] font-bold block">{exp.period}</span>
                      <h3 className="text-lg font-bold font-display text-[#F8FAFC] leading-snug">{exp.title}</h3>
                      {exp.organization && (
                        <p className="text-xs font-mono text-[#94A3B8]">{exp.organization}</p>
                      )}
                      <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed line-clamp-3">
                        {exp.description}
                      </p>
                    </div>
                  </MotionReveal>
                ))}
              </div>
            </div>
          </SpotlightCard>
        </section>
      </MotionReveal>

      {/* ================= SERVICES PREVIEW ================= */}
      <MotionReveal>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-mono font-semibold text-[#3B82F6] uppercase tracking-wider">
                Consulting &amp; Engineering
              </span>
              <h2 className="text-3xl sm:text-4xl font-black font-display text-[#F8FAFC] tracking-tight">
                Capabilities &amp; Services
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('services')}
              className="text-xs font-mono font-semibold text-[#3B82F6] hover:text-[#F8FAFC] inline-flex items-center gap-1 cursor-pointer transition-colors"
            >
              <span>View All {SERVICES.length} Services</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SERVICES.slice(0, 3).map((service, idx) => (
              <MotionReveal key={service.id} delay={idx * 0.06}>
                <SpotlightCard
                  onClick={() => onNavigate('services')}
                  className="rounded-3xl p-6 h-full group"
                >
                  <div className="flex flex-col justify-between h-full">
                    <div>
                      <div className="text-xs font-mono font-bold text-[#8B5CF6] mb-3">0{Number(service.number)}.</div>
                      <h3 className="text-xl font-bold font-display text-[#F8FAFC] group-hover:text-[#3B82F6] transition-colors mb-2">
                        {service.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed mb-5">{service.shortDesc}</p>
                    </div>
                    <div className="inline-flex items-center gap-1 text-xs font-semibold text-[#3B82F6]">
                      <span>Explore Service</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                </SpotlightCard>
              </MotionReveal>
            ))}
          </div>
        </section>
      </MotionReveal>

      {/* ================= PUSH NOTIFICATION SUBSCRIPTION ================= */}
      <MotionReveal>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <NotificationSubscriptionCard
            compact
            onOpenAdmin={() => onNavigate('admin-notifications')}
          />
        </div>
      </MotionReveal>

      {/* ================= QUICK ANSWERS (AEO / GEO FAQ) ================= */}
      <MotionReveal>
        <section
          aria-labelledby="home-aeo-faq-heading"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-mono font-semibold text-[#3B82F6] uppercase tracking-wider inline-flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Direct Answers (AEO &amp; GEO)</span>
              </span>
              <h2
                id="home-aeo-faq-heading"
                className="text-3xl sm:text-4xl font-black font-display text-[#F8FAFC] tracking-tight"
              >
                Frequently Asked Questions
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('seo-expert')}
              className="text-xs font-mono font-semibold text-[#3B82F6] hover:text-[#F8FAFC] inline-flex items-center gap-1 cursor-pointer transition-colors"
            >
              <span>SEO, AEO &amp; GEO Services</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {AEO_FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <article
                  key={faq.question}
                  className="surface-card rounded-2xl border border-white/[0.12] overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-3 font-display font-bold text-sm sm:text-base text-[#F8FAFC] hover:text-[#3B82F6] transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-2.5">
                      <span className="text-xs font-mono text-[#3B82F6]">0{idx + 1}</span>
                      <span>{faq.question}</span>
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#94A3B8] shrink-0 transition-transform ${
                        isOpen ? 'rotate-180 text-[#3B82F6]' : ''
                      }`}
                    />
                  </button>
                  <div
                    className={`px-5 pb-4 pt-2 text-xs sm:text-sm text-[#94A3B8] leading-relaxed border-t border-white/[0.08] bg-[#0D1425]/60 ${
                      isOpen ? 'block' : 'hidden'
                    }`}
                  >
                    {faq.answer}
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </MotionReveal>

      {/* ================= FINAL CONTACT CTA ================= */}
      <MotionReveal>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SpotlightCard
            hoverable={false}
            className="rounded-3xl p-8 sm:p-14 border-[#3B82F6]/30 text-center bg-gradient-to-br from-[#3B82F6]/12 via-white/[0.04] to-[#8B5CF6]/12"
          >
            <div className="space-y-5">
              <span className="text-xs font-mono uppercase tracking-wider text-[#3B82F6] block">
                Open for Collaboration &amp; Projects
              </span>
              <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-[#F8FAFC]">
                Let&apos;s Build Something Useful Together
              </h2>
              <p className="text-[#94A3B8] text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
                Interested in collaborating on AI web applications, full-stack software, or SEO/AEO/GEO growth? Reach out directly.
              </p>
              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <motion.button
                  type="button"
                  whileHover={shouldReduceMotion ? undefined : { y: -2 }}
                  whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
                  onClick={() => onNavigate('contact')}
                  className="px-7 py-3.5 rounded-xl bg-[#3B82F6] hover:bg-[#2563EB] text-[#F8FAFC] font-semibold text-sm transition-colors inline-flex items-center gap-2 cursor-pointer shadow-[0_0_24px_rgba(59,130,246,0.28)]"
                >
                  <span>Contact Channels</span>
                  <ArrowUpRight className="w-4 h-4" />
                </motion.button>
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="px-7 py-3.5 rounded-xl bg-white/[0.06] border border-white/[0.14] hover:bg-white/[0.1] hover:border-[#3B82F6]/45 text-[#F8FAFC] font-semibold text-sm transition-colors"
                >
                  {PERSONAL_INFO.email}
                </a>
              </div>
            </div>
          </SpotlightCard>
        </section>
      </MotionReveal>
    </div>
  );
};
