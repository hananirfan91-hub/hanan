import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Bell,
  BellRing,
  CheckCheck,
  Sparkles,
  ArrowUpRight,
  X,
  CheckCircle2,
  Loader2,
} from 'lucide-react';
import { LiveNotificationItem } from '../lib/liveNotifications';
import {
  checkPushSupport,
  getCurrentPushSubscriptionStatus,
  getNotificationPermissionState,
  getSavedPreferences,
  subscribeToPortfolioNotifications,
} from '../lib/pushNotifications';

interface LiveNotificationBellProps {
  items: LiveNotificationItem[];
  readIds: Set<string>;
  onMarkRead: (id: string) => void;
  onMarkAllRead: () => void;
  onSelectNotification: (item: LiveNotificationItem) => void;
  compact?: boolean;
}

function formatRelativeTime(iso: string): string {
  const ts = Date.parse(iso);
  if (Number.isNaN(ts)) return 'Today';
  const diffMins = Math.max(0, Math.floor((Date.now() - ts) / 60_000));
  if (diffMins < 2) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHrs = Math.floor(diffMins / 60);
  if (diffHrs < 24) return `${diffHrs}h ago`;
  const diffDays = Math.floor(diffHrs / 24);
  if (diffDays === 1) return 'Yesterday';
  return `${diffDays}d ago`;
}

export const LiveNotificationBell: React.FC<LiveNotificationBellProps> = ({
  items,
  readIds,
  onMarkRead,
  onMarkAllRead,
  onSelectNotification,
  compact = false,
}) => {
  const [open, setOpen] = useState(false);
  const [osSubscribed, setOsSubscribed] = useState(false);
  const [osBusy, setOsBusy] = useState(false);
  const [osFeedback, setOsFeedback] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const unreadCount = items.filter((it) => !readIds.has(it.id)).length;

  useEffect(() => {
    if (!open) return;
    let active = true;
    void getCurrentPushSubscriptionStatus().then((status) => {
      if (active) setOsSubscribed(status.isSubscribed);
    });

    const handleOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };

    document.addEventListener('mousedown', handleOutside);
    window.addEventListener('keydown', handleEsc);
    return () => {
      active = false;
      document.removeEventListener('mousedown', handleOutside);
      window.removeEventListener('keydown', handleEsc);
    };
  }, [open]);

  const handleEnableOsPush = async () => {
    setOsBusy(true);
    setOsFeedback(null);
    try {
      const res = await subscribeToPortfolioNotifications(getSavedPreferences());
      if (res.success) {
        setOsSubscribed(true);
        setOsFeedback('Device alerts enabled even when closed.');
      } else {
        setOsFeedback(res.error || 'Could not enable background alerts.');
      }
    } finally {
      setOsBusy(false);
    }
  };

  const canOfferOsPush =
    typeof window !== 'undefined' &&
    checkPushSupport() === 'supported' &&
    getNotificationPermissionState() !== 'denied';

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={
          unreadCount > 0
            ? `Open notifications (${unreadCount} unread)`
            : 'Open notifications'
        }
        aria-expanded={open}
        title="Portfolio notifications & daily highlights"
        id={compact ? 'btn-live-notifications-mobile' : 'btn-live-notifications-desktop'}
        className={`relative rounded-xl bg-white/[0.05] border border-white/[0.12] text-[#94A3B8] hover:text-[#F8FAFC] hover:border-[#3B82F6]/50 transition-colors cursor-pointer ${
          compact ? 'p-2' : 'p-2.5'
        }`}
      >
        {unreadCount > 0 ? (
          <BellRing className="w-4 h-4 text-[#3B82F6]" />
        ) : (
          <Bell className="w-4 h-4" />
        )}
        {unreadCount > 0 && (
          <span
            aria-hidden="true"
            className="absolute -top-1 -right-1 min-w-[17px] h-[17px] px-1 rounded-full bg-[#3B82F6] text-[#F8FAFC] text-[10px] font-mono font-bold flex items-center justify-center shadow-[0_0_12px_rgba(59,130,246,0.6)]"
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="Live portfolio notifications"
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.16 }}
            className="fixed sm:absolute right-3 left-3 sm:left-auto sm:right-0 top-16 sm:top-full sm:mt-2.5 sm:w-96 z-[9990] bg-[#0D1425]/96 backdrop-blur-2xl border border-white/[0.14] rounded-2xl shadow-[0_24px_64px_rgba(4,8,20,0.88)] overflow-hidden text-[#F8FAFC]"
          >
            <div className="px-4 py-3 border-b border-white/[0.1] flex items-center justify-between gap-2 bg-white/[0.02]">
              <div className="flex items-center gap-2">
                <BellRing className="w-4 h-4 text-[#3B82F6]" />
                <span className="text-xs font-display font-bold text-[#F8FAFC]">
                  Live Updates &amp; Highlights
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                {unreadCount > 0 && (
                  <button
                    type="button"
                    onClick={onMarkAllRead}
                    className="px-2 py-1 rounded-lg text-[11px] font-mono text-[#3B82F6] hover:bg-[#3B82F6]/15 transition-colors inline-flex items-center gap-1 cursor-pointer"
                  >
                    <CheckCheck className="w-3.5 h-3.5" />
                    <span>Mark read</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close notifications"
                  className="p-1 rounded-lg text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/[0.08] cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="max-h-[58vh] overflow-y-auto divide-y divide-white/[0.07]">
              {items.length === 0 ? (
                <div className="px-4 py-8 text-center space-y-1.5">
                  <Sparkles className="w-5 h-5 text-[#3B82F6] mx-auto" />
                  <p className="text-xs font-semibold text-[#F8FAFC]">You&apos;re all caught up</p>
                  <p className="text-[11px] text-[#94A3B8]">
                    New projects, certificates, and daily portfolio highlights appear here automatically.
                  </p>
                </div>
              ) : (
                items.map((item) => {
                  const isUnread = !readIds.has(item.id);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        onMarkRead(item.id);
                        setOpen(false);
                        onSelectNotification(item);
                      }}
                      className={`w-full text-left px-4 py-3.5 transition-colors flex items-start gap-3 cursor-pointer ${
                        isUnread
                          ? 'bg-[#3B82F6]/[0.07] hover:bg-[#3B82F6]/[0.12]'
                          : 'hover:bg-white/[0.04]'
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                          isUnread ? 'bg-[#3B82F6]' : 'bg-white/20'
                        }`}
                      />
                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-bold text-[#F8FAFC] truncate">
                            {item.title}
                          </span>
                          <span className="text-[10px] font-mono text-[#94A3B8] shrink-0">
                            {formatRelativeTime(item.createdAt)}
                          </span>
                        </div>
                        <p className="text-xs text-[#94A3B8] leading-snug line-clamp-2">
                          {item.body}
                        </p>
                        <span className="inline-flex items-center gap-1 text-[11px] font-mono text-[#3B82F6]">
                          <span>Open</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </span>
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            {canOfferOsPush && (
              <div className="px-4 py-2.5 border-t border-white/[0.1] bg-[#080D1B]/70 flex items-center justify-between gap-2 text-[11px]">
                {osSubscribed ? (
                  <span className="inline-flex items-center gap-1.5 text-emerald-300 font-mono">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    Background device alerts active
                  </span>
                ) : (
                  <>
                    <span className="text-[#94A3B8]">
                      {osFeedback || 'Want alerts when app is closed?'}
                    </span>
                    <button
                      type="button"
                      onClick={handleEnableOsPush}
                      disabled={osBusy}
                      className="px-2.5 py-1 rounded-lg bg-[#3B82F6] hover:bg-[#2563EB] text-[#F8FAFC] font-semibold shrink-0 inline-flex items-center gap-1 cursor-pointer"
                    >
                      {osBusy && <Loader2 className="w-3 h-3 animate-spin" />}
                      <span>Allow OS</span>
                    </button>
                  </>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
