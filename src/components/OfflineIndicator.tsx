import React from 'react';
import { WifiOff } from 'lucide-react';
import { useOnlineStatus } from '../lib/useOnlineStatus';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-20 lg:bottom-4 left-4 right-4 sm:left-1/2 sm:-translate-x-1/2 sm:w-auto sm:max-w-md z-[9980] safe-bottom"
    >
      <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#0D1425]/95 backdrop-blur-xl text-[#F8FAFC] shadow-2xl border border-white/[0.14] text-xs sm:text-sm">
        <WifiOff className="w-4 h-4 text-amber-400 shrink-0" />
        <span>
          You are offline. Cached pages remain readable; external links require an internet connection.
        </span>
      </div>
    </div>
  );
};
