import React from 'react';

const MARQUEE_ITEMS = [
  'Full-Stack Web Engineering',
  'AI Development',
  'Technical SEO',
  'Answer Engine Optimization (AEO)',
  'Generative Engine Optimization (GEO)',
  'React & Next.js',
  'Keyword Clustering',
  'The Sports Room',
  'NEXA POS System',
  'ACM KFUEIT',
];

export const EditorialMarquee: React.FC = () => {
  const renderItems = (prefix: string) =>
    MARQUEE_ITEMS.map((item, idx) => (
      <span key={`${prefix}-${idx}`} className="inline-flex items-center gap-5 shrink-0 pr-5">
        <span className="text-xs sm:text-sm font-mono tracking-wide text-[#94A3B8] hover:text-[#F8FAFC] transition-colors">
          {item}
        </span>
        <span aria-hidden="true" className="text-[#3B82F6]/70 text-sm">
          &middot;
        </span>
      </span>
    ));

  return (
    <div
      aria-label="Core engineering and SEO capabilities"
      className="marquee-wrapper relative overflow-hidden border-y border-white/[0.08] bg-[#0D1425]/45 py-3.5 select-none"
      style={{
        maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
      }}
    >
      <div className="animate-marquee">
        <div className="flex items-center shrink-0">{renderItems('track-a')}</div>
        <div className="flex items-center shrink-0" aria-hidden="true">
          {renderItems('track-b')}
        </div>
      </div>
    </div>
  );
};
