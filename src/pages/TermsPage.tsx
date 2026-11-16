import React from 'react';
import { PageId } from '../types';
import { PERSONAL_INFO } from '../data/portfolioData';
import { FileText, ArrowRight } from 'lucide-react';

interface TermsPageProps {
  onNavigate?: (page: PageId) => void;
}

export const TermsPage: React.FC<TermsPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 text-[#94A3B8]">
      <header className="space-y-3 border-b border-white/[0.12] pb-6">
        <div className="flex items-center gap-2 text-[#3B82F6] text-xs font-mono font-semibold uppercase tracking-wider">
          <FileText className="w-4 h-4" />
          <span>Terms of Use</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black font-display text-[#F8FAFC] tracking-tight">
          Terms &amp; Conditions
        </h1>
        <p className="text-xs font-mono text-[#94A3B8]">
          Effective Date: November 16, 2026 &bull; {PERSONAL_INFO.name} Portfolio ({PERSONAL_INFO.portfolioUrl})
        </p>
      </header>

      <div className="space-y-8 text-sm leading-relaxed">
        <section className="space-y-2.5">
          <h2 className="text-lg font-bold font-display text-[#F8FAFC]">1. Acceptance of Terms</h2>
          <p>
            By accessing or using this portfolio website (
            <a href={PERSONAL_INFO.portfolioUrl} className="text-[#3B82F6] underline" target="_blank" rel="noopener noreferrer">
              {PERSONAL_INFO.portfolioUrl}
            </a>
            ), its Progressive Web App (PWA) shortcut, or an Android app container, you agree to comply with these Terms &amp; Conditions. If you do not agree with any provision below, please discontinue use of the application.
          </p>
        </section>

        <section className="space-y-2.5">
          <h2 className="text-lg font-bold font-display text-[#F8FAFC]">2. Purpose of Platform &amp; Permitted Use</h2>
          <p>
            This application serves as an informational showcase of {PERSONAL_INFO.name}&apos;s software development projects, academic qualifications, technical competencies, certifications, and direct contact links. You are permitted to browse content, inspect credentials via linked verifiers, test client-side preview utilities, and reach out via direct email or social channels.
          </p>
        </section>

        <section className="space-y-2.5">
          <h2 className="text-lg font-bold font-display text-[#F8FAFC]">3. Prohibited Conduct</h2>
          <p>While accessing this website, you agree not to:</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Attempt to disrupt, scrape excessively, inject malicious payloads, or interfere with hosting infrastructure.</li>
            <li>Misrepresent {PERSONAL_INFO.name}&apos;s identity, academic certificates, or project authorship as your own.</li>
          </ul>
        </section>

        <section className="space-y-2.5">
          <h2 className="text-lg font-bold font-display text-[#F8FAFC]">4. Intellectual Property &amp; Third-Party Attribution</h2>
          <p>
            Original source code, design architecture, and written copy created for this portfolio belong to {PERSONAL_INFO.name}, unless otherwise credited. Partner organizations and credential issuers retain their respective names, trademarks, and shared or independent rights:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>
              <strong className="text-[#F8FAFC]">The Sports Room:</strong> Co-founded by {PERSONAL_INFO.name} and Urwah Farooq under HI Digital Group.
            </li>
            <li>
              <strong className="text-[#F8FAFC]">Academic &amp; Organization Marks:</strong> Khwaja Fareed University of Engineering and Information Technology (KFUEIT), ACM KFUEIT, Google &amp; Coursera, Credly, Nayi Manzil, and D&apos;Educationist retain ownership of their respective institutional names, seals, and certification programs.
            </li>
          </ul>
        </section>

        <section className="space-y-2.5">
          <h2 className="text-lg font-bold font-display text-[#F8FAFC]">5. External Project Demos &amp; Third-Party Sites</h2>
          <p>
            Portfolio cards link to external web deployments (such as Vercel-hosted demos,{' '}
            <code className="text-xs bg-white/[0.08] text-[#F8FAFC] px-1.5 py-0.5 rounded">thesportsroom.online</code>, Coursera verification pages, and social networks). External domains are governed by their own uptime, privacy policies, and terms of service.
          </p>
        </section>

        <section className="space-y-2.5">
          <h2 className="text-lg font-bold font-display text-[#F8FAFC]">6. Services Overview &amp; Liability</h2>
          <p>
            Descriptions of web development, AI development, or SEO/AEO/GEO consulting services on this website are provided for general overview only and do not form a binding contract until confirmed in a separate written agreement. This website and interactive utility previews are provided on an &quot;as is&quot; and &quot;as available&quot; basis without warranties of any kind.
          </p>
        </section>

        <section className="space-y-2.5">
          <h2 className="text-lg font-bold font-display text-[#F8FAFC]">7. Contact &amp; Updates</h2>
          <p>
            Questions regarding these terms may be sent to{' '}
            <a href={`mailto:${PERSONAL_INFO.email}`} className="text-[#3B82F6] underline font-medium">
              {PERSONAL_INFO.email}
            </a>
            .
          </p>
          {onNavigate && (
            <div className="pt-2 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => onNavigate('privacy-policy')}
                className="px-4 py-2 rounded-xl bg-white/[0.05] border border-white/[0.12] hover:bg-white/[0.1] text-[#F8FAFC] text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer"
              >
                <span>Read Privacy Policy</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate('disclaimer')}
                className="px-4 py-2 rounded-xl bg-white/[0.05] border border-white/[0.12] hover:bg-white/[0.1] text-[#F8FAFC] text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer"
              >
                <span>Read Disclaimer</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};
