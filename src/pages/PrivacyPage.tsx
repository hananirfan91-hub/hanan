import React from 'react';
import { PageId } from '../types';
import { ShieldCheck, Mail, ArrowRight } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface PrivacyPageProps {
  onNavigate?: (page: PageId) => void;
}

export const PrivacyPage: React.FC<PrivacyPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 text-[#94A3B8]">
      <header className="space-y-3 border-b border-white/[0.12] pb-6">
        <div className="flex items-center gap-2 text-[#3B82F6] text-xs font-mono font-semibold uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" />
          <span>Legal &amp; Privacy Notice</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black font-display text-[#F8FAFC] tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-xs font-mono text-[#94A3B8]">
          Effective Date: November 16, 2026 &bull; Operator: {PERSONAL_INFO.name} &bull; Portfolio Web App &amp; Android TWA (com.hananirfan.portfolio)
        </p>
      </header>

      <div className="space-y-8 text-sm leading-relaxed">
        <section className="space-y-2.5">
          <h2 className="text-lg font-bold font-display text-[#F8FAFC]">1. Overview &amp; Scope</h2>
          <p>
            This Privacy Policy explains how <strong className="text-[#F8FAFC]">{PERSONAL_INFO.name}</strong> (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) handles information when you visit the official portfolio website at{' '}
            <a href={PERSONAL_INFO.portfolioUrl} className="text-[#3B82F6] underline" target="_blank" rel="noopener noreferrer">
              {PERSONAL_INFO.portfolioUrl}
            </a>{' '}
            or open it as a Progressive Web App (PWA) or Android Trusted Web Activity / WebView container.
          </p>
          <p>
            This application is an informational personal portfolio showcasing software engineering work, academic credentials, technical skills, and direct communication links. It does not operate user accounts, on-site contact forms, paid subscriptions, or advertising SDKs.
          </p>
        </section>

        <section className="space-y-2.5">
          <h2 className="text-lg font-bold font-display text-[#F8FAFC]">2. Direct Email &amp; Off-Site Communications</h2>
          <p>
            No personal data is collected via on-site input forms. When you choose to email{' '}
            <a href={`mailto:${PERSONAL_INFO.email}`} className="text-[#3B82F6] underline">
              {PERSONAL_INFO.email}
            </a>{' '}
            using your device&apos;s email application or reach out through external social networks (LinkedIn, X, Instagram, Facebook, TikTok), any details you send (such as your name, email address, or message) are processed solely to respond to your inquiry.
          </p>
        </section>

        <section className="space-y-2.5">
          <h2 className="text-lg font-bold font-display text-[#F8FAFC]">3. Hosting &amp; Font Delivery Infrastructure</h2>
          <p>
            Based strictly on active integrations in this application, network requests are limited to:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong className="text-[#F8FAFC]">Vercel Hosting Infrastructure:</strong> Standard web server access logs (such as IP request metadata, browser user-agent, and timestamps) may be processed temporarily by our hosting infrastructure to serve pages and maintain security.
            </li>
            <li>
              <strong className="text-[#F8FAFC]">Google Fonts CDN:</strong> Typography stylesheets and font files are requested over HTTPS from{' '}
              <code className="text-xs bg-white/[0.08] text-[#F8FAFC] px-1.5 py-0.5 rounded">fonts.googleapis.com</code> and{' '}
              <code className="text-xs bg-white/[0.08] text-[#F8FAFC] px-1.5 py-0.5 rounded">fonts.gstatic.com</code>.
            </li>
          </ul>
          <p className="p-4 rounded-2xl surface-card text-xs text-[#94A3B8]">
            <strong className="text-[#F8FAFC]">Transparency Note:</strong> This portfolio does not load Google Analytics, Meta/Facebook Pixel, advertising networks, behavioral tracking cookies, or third-party crash telemetry SDKs.
          </p>
        </section>

        <section className="space-y-2.5">
          <h2 className="text-lg font-bold font-display text-[#F8FAFC]">4. Browser Storage &amp; Service Worker Cache</h2>
          <p>
            To support fast loading and offline access on supported browsers, limited non-identifying UI entries may be stored locally on your device:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>
              <strong className="text-[#F8FAFC]">sessionStorage:</strong> Remembers whether you dismissed the optional web app shortcut prompt (
              <code className="text-xs bg-white/[0.08] text-[#F8FAFC] px-1.5 py-0.5 rounded">hi_pwa_dismissed</code>) during your active browser session. All storage operations degrade gracefully if browser storage is disabled in WebView.
            </li>
            <li>
              <strong className="text-[#F8FAFC]">Service Worker Cache (Workbox):</strong> Caches static UI bundles, icons, images, and font assets locally on supported browsers so previously viewed pages remain readable offline.
            </li>
          </ul>
          <p>
            Interactive preview utilities inside Free Tools Hub (such as JSON formatting, password generation, text transformation, and Base64 conversion) run strictly inside your browser memory without uploading data to external servers.
          </p>
        </section>

        <section className="space-y-2.5">
          <h2 className="text-lg font-bold font-display text-[#F8FAFC]">5. Android App (TWA / WebView) &amp; Device Permissions</h2>
          <p>
            When accessed via an Android Trusted Web Activity (<code className="text-xs bg-white/[0.08] text-[#F8FAFC] px-1.5 py-0.5 rounded">com.hananirfan.portfolio</code>) or Android WebView, the web application does not request access to device camera, microphone, contacts, SMS, call logs, background location, or external storage. Network access is used solely to load portfolio content.
          </p>
        </section>

        <section className="space-y-2.5">
          <h2 className="text-lg font-bold font-display text-[#F8FAFC]">6. External Links &amp; Third-Party Sites</h2>
          <p>
            This portfolio links to external web deployments (such as <em>The Sports Room</em>, <em>NEXA POS System</em>, <em>Free Tools Hub</em>, <em>AI Tool Guide</em>), credential verifiers (Coursera, Credly), and social profiles (LinkedIn, X, Instagram, Facebook, TikTok). Once you navigate to an external domain, that site&apos;s own privacy policy governs your visit.
          </p>
        </section>

        <section className="space-y-2.5">
          <h2 className="text-lg font-bold font-display text-[#F8FAFC]">7. Children&apos;s Privacy</h2>
          <p>
            This portfolio is intended for general professional, academic, and business audiences and does not knowingly collect personal information from children under 13 years of age.
          </p>
        </section>

        <section className="space-y-2.5">
          <h2 className="text-lg font-bold font-display text-[#F8FAFC]">8. Policy Updates &amp; Contact Information</h2>
          <p>
            If features or integrations change in future updates, this Privacy Policy will be revised with an updated effective date.
          </p>
          <div className="p-5 rounded-2xl surface-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="font-bold text-[#F8FAFC] flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#3B82F6]" />
                <span>{PERSONAL_INFO.name}</span>
              </div>
              <p className="text-xs text-[#94A3B8] font-mono">
                {PERSONAL_INFO.location} &bull;{' '}
                <a href={`mailto:${PERSONAL_INFO.email}`} className="text-[#3B82F6] underline">
                  {PERSONAL_INFO.email}
                </a>
              </p>
            </div>
            {onNavigate && (
              <button
                type="button"
                onClick={() => onNavigate('contact')}
                className="px-4 py-2.5 rounded-xl bg-[#3B82F6] hover:bg-[#2563EB] text-[#F8FAFC] text-xs font-semibold inline-flex items-center gap-1.5 self-start sm:self-center transition-colors cursor-pointer"
              >
                <span>View Contact Channels</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};
