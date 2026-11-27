import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PageId } from '../types';
import { PERSONAL_INFO, AEO_FAQS } from '../data/portfolioData';
import { MotionReveal } from '../components/MotionReveal';
import {
  Award,
  GraduationCap,
  MapPin,
  ChevronDown,
  Check,
  HelpCircle,
  Building2,
  ArrowUpRight,
  ExternalLink,
  Cpu,
  FileText,
  Download,
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const timelineStages = [
    {
      stage: '01. Foundations',
      title: 'BS Computer Science @ KFUEIT',
      desc: 'Currently in the 5th Semester with a 3.65 CGPA, building core grounding in C++, Java, Python, SQL, data structures, and software engineering.',
    },
    {
      stage: '02. Engineering',
      title: 'Frontend & Full-Stack Web Apps',
      desc: 'Shipping responsive, accessible React, Next.js, TypeScript, Firebase, and Supabase applications including NEXA POS and ACM KFUEIT.',
    },
    {
      stage: '03. Search & AI',
      title: 'SEO, AEO, GEO & AI Development',
      desc: 'Combining technical SEO, keyword clustering, content strategy, and Google AI workflows to help platforms rank and answer user intent.',
    },
    {
      stage: '04. Ventures',
      title: 'The Sports Room & Consulting',
      desc: 'Co-founded The Sports Room (2026–present) as Founder & AI Developer under HI Digital Group, applying full-stack & SEO craft in production.',
    },
    {
      stage: '05. Leadership',
      title: "ACM KFUEIT & D'Educationist",
      desc: "Serving as ACM KFUEIT Development Team Head and Ambassador of D'Educationist to mentor peers and support campus outreach.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      <div className="space-y-4">
        <span className="text-xs font-mono font-semibold text-[#3B82F6] uppercase tracking-wider">
          About Hanan Irfan
        </span>
        <h1 className="text-4xl sm:text-6xl font-black font-display text-[#F8FAFC] tracking-tight">
          Developer, SEO Specialist &amp; Builder
        </h1>
        <p className="text-[#94A3B8] text-base sm:text-lg max-w-3xl leading-relaxed">
          {PERSONAL_INFO.bioSummary}
        </p>
      </div>

      <MotionReveal>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-5 space-y-6">
          <div className="surface-card rounded-3xl p-6 sm:p-8 text-center space-y-5">
            <div className="w-32 h-32 mx-auto rounded-3xl border border-white/[0.15] overflow-hidden bg-[#0D1425]">
              <img
                src="/avatar.webp"
                alt="Hanan Irfan — Developer & SEO Specialist in Rahim Yar Khan"
                width={128}
                height={128}
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
              <h2 className="text-2xl font-extrabold font-display text-[#F8FAFC]">{PERSONAL_INFO.name}</h2>
              <p className="text-xs font-mono text-[#3B82F6] mt-1 font-semibold">{PERSONAL_INFO.title}</p>
            </div>

            <div className="space-y-3 text-xs text-[#94A3B8] font-mono text-left pt-4 border-t border-white/[0.1]">
              <div className="flex items-start gap-2.5">
                <GraduationCap className="w-4 h-4 text-[#3B82F6] shrink-0 mt-0.5" />
                <span className="text-[#F8FAFC]">
                  {PERSONAL_INFO.education.degree} &bull; {PERSONAL_INFO.education.semester} &bull; CGPA{' '}
                  {PERSONAL_INFO.education.cgpa}
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <Award className="w-4 h-4 text-[#8B5CF6] shrink-0 mt-0.5" />
                <span>{PERSONAL_INFO.education.institution}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#3B82F6] shrink-0 mt-0.5" />
                <span>{PERSONAL_INFO.location}</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => onNavigate('contact')}
                className="w-full py-3 rounded-xl bg-[#3B82F6] hover:bg-[#2563EB] text-[#F8FAFC] font-semibold text-xs tracking-wide transition-colors cursor-pointer"
              >
                Connect with Hanan
              </button>
            </div>
          </div>

          <div className="surface-card rounded-3xl p-6 space-y-2">
            <div className="text-xs font-mono font-semibold text-[#8B5CF6] uppercase tracking-wider">Approach</div>
            <p className="text-sm text-[#94A3B8] italic leading-relaxed">
              &ldquo;{PERSONAL_INFO.personalStatement}&rdquo;
            </p>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-6">
          <div className="surface-card rounded-3xl p-7 sm:p-8 space-y-5">
            <h3 className="text-2xl font-bold font-display text-[#F8FAFC]">Background &amp; Focus</h3>
            <p className="text-[#94A3B8] text-sm sm:text-base leading-relaxed">
              Currently in my 5th Semester of BS Computer Science at Khwaja Fareed University of Engineering and Information Technology (KFUEIT) with a 3.65 CGPA, I combine computer science fundamentals with practical software shipping and search engineering.
            </p>
            <p className="text-[#94A3B8] text-sm sm:text-base leading-relaxed">
              Alongside coursework, I serve as Founder and AI Developer of{' '}
              <a
                href="https://thesportsroom.online"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#3B82F6] font-semibold hover:underline"
              >
                The Sports Room
              </a>{' '}
              (co-founded with Urwah Farooq), Development Team Head at ACM KFUEIT, and Campus Ambassador for D&apos;Educationist.
            </p>

            <div className="pt-4 border-t border-white/[0.1]">
              <h4 className="text-xs font-mono font-bold text-[#F8FAFC] uppercase tracking-wider mb-3">
                Core Areas of Practice
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-[#94A3B8]">
                {PERSONAL_INFO.professionalAreas.map((item) => (
                  <div key={item} className="flex items-center gap-2 p-3 rounded-xl bg-white/[0.04] border border-white/[0.1]">
                    <Check className="w-3.5 h-3.5 text-[#3B82F6] shrink-0" />
                    <span className="text-[#F8FAFC]">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        </div>
      </MotionReveal>

      {/* Certificates & Credentials Section */}
      <MotionReveal>
        <div id="achievements" className="space-y-6 scroll-mt-24">
        <div className="space-y-2">
          <span className="text-xs font-mono font-semibold text-[#3B82F6] uppercase tracking-wider">
            Credentials &amp; Honors
          </span>
          <h2 className="text-3xl sm:text-4xl font-black font-display text-[#F8FAFC]">
            Certificates &amp; Recognition
          </h2>
          <p className="text-[#94A3B8] text-sm sm:text-base max-w-3xl leading-relaxed">
            Academic honors, Google &amp; Coursera AI certifications, web development credentials, and campus leadership appointments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Dean's Honor */}
          <article className="md:col-span-2 lg:col-span-3 surface-card rounded-3xl p-6 sm:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-5">
                <a
                  href="/images/certificates/deans-honor-certificate-2026.webp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-2xl border border-white/[0.14] bg-[#0D1425] overflow-hidden aspect-[3/4] max-h-72 mx-auto"
                >
                  <img
                    src="/images/certificates/deans-honor-certificate-2026.webp"
                    alt="Dean's Honor Certificate awarded to Abdul Hanan Irfan by KFUEIT"
                    width={1086}
                    height={1448}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain p-1.5"
                  />
                </a>
              </div>
              <div className="lg:col-span-7 space-y-3">
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#94A3B8]">
                  <span className="text-[#3B82F6] font-semibold">Latest Achievement</span>
                  <span aria-hidden="true">&middot;</span>
                  <span>November 2026</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-display text-[#F8FAFC]">
                  Dean&apos;s Honor Certificate — KFUEIT
                </h3>
                <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                  Awarded to Abdul Hanan Irfan by the Faculty of Information Technology at KFUEIT for achieving a high semester CGPA in BS Computer Science.
                </p>
              </div>
            </div>
          </article>

          {/* Google AI Professional */}
          <article className="md:col-span-2 lg:col-span-3 surface-card rounded-3xl p-6 sm:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-5">
                <a
                  href="/images/certificates/google-ai-professional-certificate-2026.png"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-2xl border border-white/[0.14] bg-[#0D1425] overflow-hidden aspect-[4/3] max-h-72 mx-auto"
                >
                  <img
                    src="/images/certificates/google-ai-professional-certificate-2026.png"
                    alt="Google AI Professional Certificate issued by Google and Coursera to Abdul Hanan Irfan"
                    width={2420}
                    height={1870}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain p-1.5"
                  />
                </a>
              </div>
              <div className="lg:col-span-7 space-y-3">
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#94A3B8]">
                  <span className="text-[#8B5CF6] font-semibold">8-Course Specialization</span>
                  <span aria-hidden="true">&middot;</span>
                  <span>16 Nov 2026</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-mono text-[#3B82F6] font-semibold">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>Google Career Certificates &bull; Coursera</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-display text-[#F8FAFC]">
                  Google AI Professional Certificate
                </h3>
                <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                  Credential ID X7TCM4MBEUWP — 8-course program covering AI Fundamentals, Brainstorming &amp; Planning, Research &amp; Insights, Writing &amp; Communicating, Content Creation, Data Analysis, App Building, and App Deployment.
                </p>
                <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono">
                  <a
                    href="https://coursera.org/verify/professional-cert/X7TCM4MBEUWP"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#3B82F6] hover:underline inline-flex items-center gap-1 font-semibold"
                  >
                    Verify on Coursera <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="/assets/aistudio/Coursera_X7TCM4MBEUWP_694dbd0c.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#F8FAFC] hover:text-[#3B82F6] inline-flex items-center gap-1 font-semibold"
                  >
                    Open PDF <FileText className="w-3 h-3" />
                  </a>
                  <a
                    href="/assets/aistudio/Coursera_X7TCM4MBEUWP_694dbd0c.pdf"
                    download="Hanan_Irfan_Google_AI_Certificate.pdf"
                    className="text-[#94A3B8] hover:text-[#F8FAFC] inline-flex items-center gap-1 font-semibold"
                  >
                    Download PDF <Download className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </article>

          {/* ACM, Nayi Manzil, D'Educationist compact cards */}
          <article className="surface-card rounded-3xl p-6 space-y-3">
            <img
              src="/certificate.webp"
              alt="ACM KFUEIT Web Developer Certificate"
              width={900}
              height={672}
              loading="lazy"
              referrerPolicy="no-referrer"
              className="rounded-xl border border-white/[0.12] aspect-[4/3] object-cover w-full bg-[#0D1425]"
            />
            <h3 className="text-base font-bold font-display text-[#F8FAFC]">
              ACM KFUEIT Certificate of Appreciation
            </h3>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              Recognized as Web Developer for ACM KFUEIT (Session 2025–26).
            </p>
          </article>

          <article className="surface-card rounded-3xl p-6 space-y-3">
            <img
              src="/abdul-hanan-irfan-nayi-manzil-web-development-certificate.webp"
              alt="Nayi Manzil Web Development Certificate"
              width={3508}
              height={2481}
              loading="lazy"
              referrerPolicy="no-referrer"
              className="rounded-xl border border-white/[0.12] aspect-[4/3] object-contain bg-[#0D1425] w-full"
            />
            <h3 className="text-base font-bold font-display text-[#F8FAFC]">
              Web Development Certificate — Nayi Manzil
            </h3>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              Completed Web Development curriculum at Nayi Manzil.
            </p>
          </article>

          <article className="surface-card rounded-3xl p-6 space-y-3">
            <img
              src="/deducationist-ambassador.webp"
              alt="Ambassador of D'Educationist at KFUEIT"
              width={800}
              height={1000}
              loading="lazy"
              referrerPolicy="no-referrer"
              className="rounded-xl border border-white/[0.12] aspect-[4/3] object-cover object-top w-full bg-[#0D1425]"
            />
            <h3 className="text-base font-bold font-display text-[#F8FAFC]">
              Ambassador of D&apos;Educationist @ KFUEIT
            </h3>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              Representing D&apos;Educationist at KFUEIT for student study guidance.
            </p>
          </article>
        </div>
        </div>
      </MotionReveal>

      {/* Timeline Stages */}
      <MotionReveal>
        <div className="space-y-6">
        <div className="space-y-1">
          <span className="text-xs font-mono font-semibold text-[#3B82F6] uppercase tracking-wider">
            Growth Path
          </span>
          <h2 className="text-3xl sm:text-4xl font-black font-display text-[#F8FAFC]">
            Five Stages of Progress
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {timelineStages.map((stage) => (
            <div key={stage.stage} className="surface-card rounded-2xl p-5 space-y-2">
              <span className="text-[11px] font-mono text-[#3B82F6] font-bold block">{stage.stage}</span>
              <h3 className="text-sm font-bold font-display text-[#F8FAFC]">{stage.title}</h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">{stage.desc}</p>
            </div>
          ))}
        </div>
        </div>
      </MotionReveal>

      {/* Regional & Academic Context */}
      <MotionReveal>
        <div className="surface-card rounded-3xl p-7 sm:p-10 space-y-5">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#8B5CF6] uppercase tracking-wider">
            <Building2 className="w-4 h-4" /> Academic &amp; Community Footprint
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-[#F8FAFC]">
            Rahim Yar Khan &amp; Remote Collaboration
          </h2>
          <p className="text-[#94A3B8] text-sm sm:text-base leading-relaxed max-w-4xl">
            Studying at KFUEIT in Rahim Yar Khan, Pakistan, while building full-stack platforms, AI workflows, and technical SEO strategies accessed globally.
          </p>
        </div>
      </MotionReveal>

      {/* FAQ Section */}
      <MotionReveal>
        <div className="surface-card rounded-3xl p-7 sm:p-10 space-y-6">
        <div className="space-y-1.5">
          <span className="text-xs font-mono font-semibold text-[#3B82F6] uppercase tracking-wider flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4" /> Questions &amp; Answers
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-[#F8FAFC]">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {AEO_FAQS.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={faq.question}
                className="border border-white/[0.12] rounded-2xl overflow-hidden bg-white/[0.03]"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between font-display font-bold text-sm sm:text-base text-[#F8FAFC] hover:text-[#3B82F6] transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-3">
                    <span className="text-xs font-mono text-[#3B82F6]">0{idx + 1}</span>
                    <span>{faq.question}</span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#94A3B8] transition-transform ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-5 pb-5 pt-2 text-xs sm:text-sm text-[#94A3B8] leading-relaxed border-t border-white/[0.1] bg-[#0D1425]/60"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
        </div>
      </MotionReveal>

      {/* Bottom CTA */}
      <MotionReveal>
        <div className="surface-card rounded-3xl p-8 sm:p-12 border-[#3B82F6]/30 text-center space-y-5 bg-gradient-to-br from-[#3B82F6]/10 via-white/[0.04] to-[#8B5CF6]/10">
          <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-[#F8FAFC]">
            Have a Project or Opportunity in Mind?
          </h2>
          <p className="text-xs sm:text-sm text-[#94A3B8] max-w-xl mx-auto leading-relaxed">
            Reach out for AI development, web application engineering, or SEO/AEO/GEO consulting.
          </p>
          <button
            type="button"
            onClick={() => onNavigate('contact')}
            className="px-7 py-3.5 rounded-xl bg-[#3B82F6] hover:bg-[#2563EB] text-[#F8FAFC] font-semibold text-sm inline-flex items-center gap-2 transition-colors cursor-pointer"
          >
            <span>Get in Touch</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </MotionReveal>
    </div>
  );
};
