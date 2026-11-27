import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BellRing, X, ArrowUpRight } from 'lucide-react';

export interface ForegroundNotificationItem {
  title: string;
  body: string;
  url?: string;
  notificationType?: string;
}

interface ForegroundPushToastProps {
  notification: ForegroundNotificationItem | null;
  onDismiss: () => void;
  onOpen: (url?: string, notificationType?: string) => void;
}

export const ForegroundPushToast: React.FC<ForegroundPushToastProps> = ({
  notification,
  onDismiss,
  onOpen,
}) => {
  return (
    <AnimatePresence>
      {notification && (
        <motion.div
          role="status"
          aria-live="polite"
          initial={{ opacity: 0, y: -16, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -16, scale: 0.97 }}
          transition={{ duration: 0.2 }}
          className="fixed top-20 right-4 left-4 sm:left-auto sm:w-96 z-[9995] bg-[#0D1425]/95 backdrop-blur-2xl border border-[#3B82F6]/45 rounded-2xl p-4 shadow-[0_18px_48px_rgba(4,8,20,0.85)] text-[#F8FAFC]"
        >
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#3B82F6]/20 border border-[#3B82F6]/40 text-[#3B82F6] flex items-center justify-center shrink-0">
              <BellRing className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0 space-y-1">
              <div className="flex items-start justify-between gap-2">
                <h4 className="text-xs sm:text-sm font-bold font-display text-[#F8FAFC] leading-snug">
                  {notification.title}
                </h4>
                <button
                  type="button"
                  onClick={onDismiss}
                  aria-label="Dismiss notification"
                  className="p-1 rounded-lg text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/[0.08] cursor-pointer shrink-0"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-xs text-[#94A3B8] leading-relaxed">{notification.body}</p>
              <div className="pt-1.5 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onOpen(notification.url, notification.notificationType)}
                  className="px-3 py-1.5 rounded-lg bg-[#3B82F6] hover:bg-[#2563EB] text-[#F8FAFC] text-xs font-semibold inline-flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span>Open</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={onDismiss}
                  className="px-2.5 py-1.5 rounded-lg text-xs text-[#94A3B8] hover:text-[#F8FAFC] cursor-pointer"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
