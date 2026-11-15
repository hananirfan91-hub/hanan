import React, { useEffect, useRef } from 'react';

interface CredlyBadgeEmbedProps {
  badgeId?: string;
  width?: number;
  height?: number;
  host?: string;
}

export const CredlyBadgeEmbed: React.FC<CredlyBadgeEmbedProps> = ({
  badgeId = 'af813824-c409-4d88-b95a-5524a680465c',
  width = 150,
  height = 270,
  host = 'https://www.credly.com',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Reset container with the exact Credly embed div so re-navigation re-hydrates cleanly
    container.innerHTML = '';
    const badgeDiv = document.createElement('div');
    badgeDiv.setAttribute('data-iframe-width', String(width));
    badgeDiv.setAttribute('data-iframe-height', String(height));
    badgeDiv.setAttribute('data-share-badge-id', badgeId);
    badgeDiv.setAttribute('data-share-badge-host', host);
    container.appendChild(badgeDiv);

    // Re-trigger Credly embed script cleanly on mount
    const existingScript = document.querySelector('script[data-credly-embed="true"]');
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = '//cdn.credly.com/assets/utilities/embed.js';
    script.setAttribute('data-credly-embed', 'true');
    container.appendChild(script);

    return () => {
      if (container) {
        container.innerHTML = '';
      }
    };
  }, [badgeId, width, height, host]);

  return (
    <div
      ref={containerRef}
      className="flex items-center justify-center rounded-2xl bg-white p-2 shadow-inner border border-white/20"
      style={{ minWidth: `${width + 16}px`, minHeight: `${height + 16}px` }}
      aria-label="Verified Credly Digital Badge"
    />
  );
};
