import React from 'react';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 text-slate-300">
      <div className="space-y-2 border-b border-white/10 pb-6">
        <span className="text-xs font-mono text-purple-400 uppercase tracking-widest">// LEGAL DOCUMENTATION</span>
        <h1 className="text-3xl sm:text-5xl font-black font-display text-white">PRIVACY POLICY</h1>
        <p className="text-xs font-mono text-slate-500">Last updated: July 2026 | Hanan Irfan Portfolio</p>
      </div>

      <div className="space-y-6 text-sm leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold font-display text-white">1. Introduction</h2>
          <p>
            This Privacy Policy explains how Hanan Irfan ("we", "our", or "us") collects, uses, and safeguards information when you visit the official portfolio website at hananirfanportfolio.vercel.app or interact with associated web services.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold font-display text-white">2. Information We Collect</h2>
          <p>
            When you submit a contact inquiry or project request, we collect personal information that you voluntarily provide, such as your name, email address, project requirements, and communication history.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold font-display text-white">3. How Information Is Used</h2>
          <p>
            We use the information collected solely to respond to project inquiries, deliver requested software consulting services, communicate project updates, and improve website performance.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold font-display text-white">4. Cookies & Analytics</h2>
          <p>
            We may utilize standard privacy-friendly analytics tools (e.g., Google Analytics 4) to monitor anonymous visitor usage trends, Core Web Vitals performance, and page traffic patterns to optimize the website experience.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold font-display text-white">5. Contact Information</h2>
          <p>
            If you have questions regarding this Privacy Policy, please email <a href="mailto:hananirfan91@gmail.com" className="text-purple-400 underline">hananirfan91@gmail.com</a>.
          </p>
        </section>
      </div>
    </div>
  );
};
