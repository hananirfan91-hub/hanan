import React from 'react';
import { PageId } from '../types';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Info, ArrowRight } from 'lucide-react';

interface DisclaimerPageProps {
  onNavigate?: (page: PageId) => void;
}

export const DisclaimerPage: React.FC<DisclaimerPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 text-[#94A3B8]">
      <header className="space-y-3 border-b border-white/[0.12] pb-6">
        <div className="flex items-center gap-2 text-[#8B5CF6] text-xs font-mono font-semibold uppercase tracking-wider">
          <Info className="w-4 h-4" />
          <span>Public Disclosure</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black font-display text-[#F8FAFC] tracking-tight">
          Disclaimer
        </h1>
        <p className="text-xs font-mono text-[#94A3B8]">
          Effective Date: November 16, 2026 &bull; {PERSONAL_INFO.name} Portfolio
        </p>
      </header>

      <div className="space-y-8 text-sm leading-relaxed">
        <section className="space-y-2.5">
          <h2 className="text-lg font-bold font-display text-[#F8FAFC]">1. General Informational Basis</h2>
          <p>
            All material presented on {PERSONAL_INFO.name}&apos;s portfolio website and mobile app container is provided in good faith for informational, academic, and professional showcase purposes only. While care is taken to ensure project details, education status (BS Computer Science, 5th Semester, CGPA 3.65 at KFUEIT), and roles remain accurate, no warranty is made regarding uninterrupted availability at every moment.
          </p>
        </section>

        <section className="space-y-2.5">
          <h2 className="text-lg font-bold font-display text-[#F8FAFC]">2. Search Engine &amp; Technical Consulting Results</h2>
          <p>
            Search Engine Optimization (SEO), Answer Engine Optimization (AEO), Generative Engine Optimization (GEO), keyword research, and content strategies depend on search algorithm updates, domain history, market competition, and implementation consistency. Accordingly, specific ranking positions or traffic gains cannot be guaranteed.
          </p>
        </section>

        <section className="space-y-2.5">
          <h2 className="text-lg font-bold font-display text-[#F8FAFC]">3. Illustrative Visualizations &amp; Utility Previews</h2>
          <p>
            Embedded data visualizations (such as engagement progression charts inside project previews) summarize conceptual trajectory rather than audited third-party financial filings. Browser-based tools embedded in the Free Tools Hub preview execute strictly client-side and should not be used to process regulated sensitive credentials without independent verification.
          </p>
        </section>

        <section className="space-y-2.5">
          <h2 className="text-lg font-bold font-display text-[#F8FAFC]">4. External Links &amp; Credentials</h2>
          <p>
            References and links to platforms such as <em>The Sports Room</em> (co-founded with Urwah Farooq), <em>ACM KFUEIT</em>, external Vercel applications, social profiles, and verification portals (Coursera, Credly) are provided for convenience and verification. Academic honors and certificates reflect documents issued to Abdul Hanan Irfan by KFUEIT, Google Career Certificates / Coursera, Nayi Manzil, ACM KFUEIT, and D&apos;Educationist.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold font-display text-[#F8FAFC]">5. Contact</h2>
          <p>
            If you notice any outdated information, broken external link, or attribution concern, please contact{' '}
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
                <span>Privacy Policy</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate('terms-and-conditions')}
                className="px-4 py-2 rounded-xl bg-white/[0.05] border border-white/[0.12] hover:bg-white/[0.1] text-[#F8FAFC] text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer"
              >
                <span>Terms &amp; Conditions</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};
