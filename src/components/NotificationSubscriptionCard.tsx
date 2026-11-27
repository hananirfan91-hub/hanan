import React, { useState, useEffect } from 'react';
import {
  Bell,
  BellRing,
  BellOff,
  CheckCircle2,
  SlidersHorizontal,
  AlertCircle,
  Loader2,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import {
  NOTIFICATION_CATEGORIES,
  NotificationPreferences,
  NotificationType,
} from '../types/notifications';
import {
  checkPushSupport,
  detectPushPlatform,
  getCurrentPushSubscriptionStatus,
  getNotificationPermissionState,
  getSavedPreferences,
  PushPermissionState,
  PushSupportState,
  subscribeToPortfolioNotifications,
  unsubscribeFromPortfolioNotifications,
  updateNotificationPreferences,
} from '../lib/pushNotifications';

interface NotificationSubscriptionCardProps {
  compact?: boolean;
  onOpenAdmin?: () => void;
}

export const NotificationSubscriptionCard: React.FC<NotificationSubscriptionCardProps> = ({
  compact = false,
  onOpenAdmin,
}) => {
  const [supportState, setSupportState] = useState<PushSupportState>('supported');
  const [permission, setPermission] = useState<PushPermissionState>('default');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [prefs, setPrefs] = useState<NotificationPreferences>(() => getSavedPreferences());
  const [showCustomize, setShowCustomize] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isMutating, setIsMutating] = useState(false);
  const [feedback, setFeedback] = useState<{
    kind: 'success' | 'error' | 'info';
    text: string;
  } | null>(null);
  const [platform, setPlatform] = useState<string>('web');

  useEffect(() => {
    let mounted = true;
    const init = async () => {
      const sup = checkPushSupport();
      const perm = getNotificationPermissionState();
      const plat = detectPushPlatform();
      const status = await getCurrentPushSubscriptionStatus();
      if (!mounted) return;
      setSupportState(sup);
      setPermission(perm);
      setPlatform(plat);
      setIsSubscribed(status.isSubscribed);
      setIsLoading(false);
    };
    void init();
    return () => {
      mounted = false;
    };
  }, []);

  const toggleCategory = (catId: NotificationType) => {
    if (catId === 'daily-reminder') {
      setPrefs((prev) => ({ ...prev, dailyReminder: !prev.dailyReminder }));
      return;
    }
    setPrefs((prev) => {
      const exists = prev.categories.includes(catId);
      const next = exists
        ? prev.categories.filter((c) => c !== catId)
        : [...prev.categories, catId];
      return { ...prev, categories: next };
    });
  };

  const handleEnable = async () => {
    setIsMutating(true);
    setFeedback(null);
    try {
      const result = await subscribeToPortfolioNotifications(prefs);
      setPermission(result.permission);
      if (result.success) {
        setIsSubscribed(true);
        setFeedback({
          kind: 'success',
          text:
            platform === 'android-twa'
              ? 'Subscribed on this Android app. You will receive selected updates and optional daily reminders.'
              : 'Notifications enabled! You will receive your selected portfolio updates.',
        });
      } else {
        setFeedback({
          kind: 'error',
          text: result.error || 'Could not enable notifications.',
        });
      }
    } catch (err) {
      setFeedback({
        kind: 'error',
        text: err instanceof Error ? err.message : 'Subscription failed.',
      });
    } finally {
      setIsMutating(false);
    }
  };

  const handleSavePrefs = async () => {
    setIsMutating(true);
    setFeedback(null);
    try {
      const res = await updateNotificationPreferences(prefs);
      if (res.success) {
        setFeedback({
          kind: 'success',
          text: 'Notification preferences saved.',
        });
      } else {
        setFeedback({
          kind: 'error',
          text: res.error || 'Failed to save preferences.',
        });
      }
    } finally {
      setIsMutating(false);
    }
  };

  const handleUnsubscribe = async () => {
    setIsMutating(true);
    setFeedback(null);
    try {
      await unsubscribeFromPortfolioNotifications();
      setIsSubscribed(false);
      setFeedback({
        kind: 'info',
        text: 'Unsubscribed. You will no longer receive push notifications on this device.',
      });
    } finally {
      setIsMutating(false);
    }
  };

  const updateCategoriesList = NOTIFICATION_CATEGORIES.filter((c) => c.id !== 'daily-reminder');

  return (
    <section
      aria-labelledby="push-subscribe-heading"
      className={`surface-card rounded-3xl border border-white/[0.12] ${
        compact ? 'p-6 sm:p-8' : 'p-7 sm:p-10'
      } space-y-6`}
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2.5 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#3B82F6]/15 border border-[#3B82F6]/35 flex items-center justify-center text-[#3B82F6] shrink-0">
              {isSubscribed ? (
                <BellRing className="w-5 h-5 text-emerald-400" />
              ) : permission === 'denied' ? (
                <BellOff className="w-5 h-5 text-amber-400" />
              ) : (
                <Bell className="w-5 h-5" />
              )}
            </div>
            <div className="space-y-0.5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#8B5CF6] font-semibold block">
                Optional Portfolio Alerts
              </span>
              <h2
                id="push-subscribe-heading"
                className="text-xl sm:text-2xl font-black font-display text-[#F8FAFC] tracking-tight"
              >
                Stay Updated on New Projects &amp; Daily Insights
              </h2>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
            Get notified when Hanan Irfan ships new web/AI projects, earns verified certificates, or shares major portfolio milestones—plus an optional once-daily portfolio reminder. Zero spam, zero personal details required, and instant unsubscribe anytime.
          </p>

          {/* Explicit text + icon status line (no hue-only indicators) */}
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono pt-1">
            {isLoading ? (
              <span className="inline-flex items-center gap-1.5 text-[#94A3B8]">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-[#3B82F6]" />
                Checking device notification status...
              </span>
            ) : isSubscribed ? (
              <span className="inline-flex items-center gap-1.5 text-emerald-300 font-semibold">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                Subscribed on this device ({prefs.categories.length} update topics
                {prefs.dailyReminder ? ' + daily reminder' : ''})
              </span>
            ) : permission === 'denied' ? (
              <span className="inline-flex items-center gap-1.5 text-amber-300 font-semibold">
                <AlertCircle className="w-4 h-4 shrink-0" />
                Browser/app permission blocked — enable notifications in site or Android app settings
              </span>
            ) : supportState === 'ios-needs-install' ? (
              <span className="inline-flex items-center gap-1.5 text-[#94A3B8]">
                <Sparkles className="w-4 h-4 text-[#3B82F6] shrink-0" />
                On iPhone/iPad: tap Share &rarr; Add to Home Screen, then open the app to subscribe
              </span>
            ) : supportState === 'webview-limited' ? (
              <span className="inline-flex items-center gap-1.5 text-amber-300">
                <AlertCircle className="w-4 h-4 shrink-0" />
                Open in Chrome or the Google Play app to enable push notifications
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-[#94A3B8]">
                <ShieldCheck className="w-4 h-4 text-[#3B82F6] shrink-0" />
                Permission requested only when you click Enable Notifications
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          {!isSubscribed ? (
            <button
              type="button"
              onClick={handleEnable}
              disabled={isLoading || isMutating || supportState !== 'supported' || permission === 'denied'}
              id="btn-enable-notifications"
              className="px-5 py-3 rounded-xl bg-[#3B82F6] hover:bg-[#2563EB] disabled:opacity-50 disabled:cursor-not-allowed text-[#F8FAFC] text-xs sm:text-sm font-bold shadow-[0_0_24px_rgba(59,130,246,0.28)] transition-all inline-flex items-center gap-2 cursor-pointer whitespace-nowrap"
            >
              {isMutating ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Bell className="w-4 h-4" />
              )}
              <span>Enable Notifications</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleUnsubscribe}
              disabled={isMutating}
              id="btn-unsubscribe-notifications"
              className="px-4 py-3 rounded-xl bg-white/[0.06] hover:bg-red-500/15 border border-white/[0.14] hover:border-red-400/40 text-[#F8FAFC] text-xs sm:text-sm font-semibold transition-all inline-flex items-center gap-2 cursor-pointer whitespace-nowrap"
            >
              {isMutating ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <BellOff className="w-4 h-4 text-[#94A3B8]" />
              )}
              <span>Unsubscribe</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setShowCustomize((v) => !v)}
            id="btn-customize-notifications"
            className="px-4 py-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.12] text-[#F8FAFC] text-xs sm:text-sm font-semibold transition-colors inline-flex items-center gap-2 cursor-pointer whitespace-nowrap"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#8B5CF6]" />
            <span>{showCustomize ? 'Hide Preferences' : 'Customize Topics'}</span>
          </button>
        </div>
      </div>

      {feedback && (
        <div
          role="status"
          className={`p-3.5 rounded-2xl border text-xs sm:text-sm flex items-start gap-2.5 ${
            feedback.kind === 'success'
              ? 'bg-emerald-500/10 border-emerald-400/30 text-emerald-200'
              : feedback.kind === 'error'
                ? 'bg-amber-500/10 border-amber-400/30 text-amber-200'
                : 'bg-white/[0.05] border-white/[0.14] text-[#F8FAFC]'
          }`}
        >
          {feedback.kind === 'success' ? (
            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-400" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
          )}
          <span>{feedback.text}</span>
        </div>
      )}

      {showCustomize && (
        <div className="pt-5 border-t border-white/[0.1] space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h3 className="text-sm font-bold font-display text-[#F8FAFC]">
              Customize Notification Preferences
            </h3>
            <span className="text-[11px] font-mono text-[#94A3B8]">
              Timezone: {prefs.timezone}
            </span>
          </div>

          {/* Independent Daily Reminder Toggle */}
          <button
            type="button"
            onClick={() => toggleCategory('daily-reminder')}
            className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 cursor-pointer ${
              prefs.dailyReminder
                ? 'bg-[#8B5CF6]/12 border-[#8B5CF6]/45 text-[#F8FAFC]'
                : 'bg-[#0D1425]/70 border-white/[0.1] text-[#94A3B8] hover:border-white/[0.2]'
            }`}
          >
            <div className="space-y-0.5">
              <span className="text-xs sm:text-sm font-bold text-[#F8FAFC] block">
                Daily Portfolio Reminder (Max 1/day)
              </span>
              <span className="text-xs text-[#94A3B8] block">
                A gentle daily prompt highlighting new builds, skills, and achievements.
              </span>
            </div>
            <span
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold shrink-0 ${
                prefs.dailyReminder
                  ? 'bg-[#8B5CF6] text-[#F8FAFC]'
                  : 'bg-white/[0.08] text-[#94A3B8]'
              }`}
            >
              {prefs.dailyReminder ? 'ON' : 'OFF'}
            </span>
          </button>

          {/* Update Categories */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {updateCategoriesList.map((cat) => {
              const active = prefs.categories.includes(cat.id);
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => toggleCategory(cat.id)}
                  className={`text-left p-3.5 rounded-2xl border transition-all flex items-start justify-between gap-2.5 cursor-pointer ${
                    active
                      ? 'bg-[#3B82F6]/12 border-[#3B82F6]/45 text-[#F8FAFC]'
                      : 'bg-[#0D1425]/60 border-white/[0.1] text-[#94A3B8] hover:border-white/[0.2]'
                  }`}
                >
                  <div className="space-y-0.5 min-w-0">
                    <span className="text-xs font-bold text-[#F8FAFC] block">
                      {cat.label}
                    </span>
                    <span className="text-[11px] text-[#94A3B8] leading-snug block">
                      {cat.description}
                    </span>
                  </div>
                  <span
                    className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 ${
                      active
                        ? 'bg-[#3B82F6] border-[#3B82F6] text-[#F8FAFC]'
                        : 'border-white/[0.2] bg-transparent'
                    }`}
                  >
                    {active && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            {onOpenAdmin ? (
              <button
                type="button"
                onClick={onOpenAdmin}
                className="text-xs font-mono text-[#94A3B8] hover:text-[#3B82F6] transition-colors cursor-pointer"
              >
                Portfolio Owner? Open Admin Notification Console &rarr;
              </button>
            ) : (
              <span />
            )}

            <button
              type="button"
              onClick={isSubscribed ? handleSavePrefs : handleEnable}
              disabled={isMutating}
              className="px-4 py-2.5 rounded-xl bg-[#3B82F6] hover:bg-[#2563EB] text-[#F8FAFC] text-xs font-bold transition-colors cursor-pointer inline-flex items-center gap-2"
            >
              {isMutating && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              <span>{isSubscribed ? 'Save Preferences' : 'Save & Enable Notifications'}</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
