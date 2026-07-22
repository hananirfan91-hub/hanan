import React from 'react';

export const TermsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 text-slate-300">
      <div className="space-y-2 border-b border-white/10 pb-6">
        <span className="text-xs font-mono text-purple-400 uppercase tracking-widest">// LEGAL DOCUMENTATION</span>
        <h1 className="text-3xl sm:text-5xl font-black font-display text-white">TERMS & CONDITIONS</h1>
        <p className="text-xs font-mono text-slate-500">Last updated: July 2026 | Hanan Irfan Portfolio</p>
      </div>

      <div className="space-y-6 text-sm leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold font-display text-white">1. Agreement to Terms</h2>
          <p>
            By accessing or using the portfolio website of Hanan Irfan, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you may not access the website.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold font-display text-white">2. Intellectual Property</h2>
          <p>
            All custom code, visual designs, brand assets, logos, copy, and project demonstrations featured on this portfolio are the exclusive intellectual property of Hanan Irfan unless otherwise attributed.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold font-display text-white">3. External Links & Demonstrations</h2>
          <p>
            Our portfolio links to live project demonstrations hosted on external domains (e.g., Vercel). Hanan Irfan is not responsible for third-party domain content or external service privacy practices.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold font-display text-white">4. Software Consulting Services</h2>
          <p>
            Software development, technical SEO, and graphic design engagements provided by Hanan Irfan are subject to individual written project agreements, scope definitions, and client proposals.
          </p>
        </section>
      </div>
    </div>
  );
};
