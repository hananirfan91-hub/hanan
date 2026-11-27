import React, { useState, useEffect, useCallback } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import {
  doc,
  setDoc,
  serverTimestamp,
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
} from 'firebase/firestore';
import {
  Bell,
  Send,
  ShieldCheck,
  LogOut,
  Users,
  Clock,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Plus,
  Trash2,
  Play,
  RefreshCw,
  Eye,
  Lock,
} from 'lucide-react';
import {
  ADMIN_EMAIL,
  auth,
  db,
  handleFirestoreError,
  OperationType,
  signInAdminWithGoogle,
  signOutAdmin,
  testConnection,
} from '../lib/firebase';
import {
  AdminNotificationOverview,
  DEFAULT_ROTATING_DAILY_MESSAGES,
  NOTIFICATION_CATEGORIES,
  NotificationLogEntry,
  NotificationType,
  SchedulerSettings,
} from '../types/notifications';
import { getCurrentPushSubscriptionStatus } from '../lib/pushNotifications';

const URL_PRESETS = [
  { label: 'Homepage', value: '/' },
  { label: 'Projects Showcase', value: '/projects' },
  { label: 'Achievements & Certificates', value: '/about#achievements' },
  { label: 'Skills & Stack', value: '/skills' },
  { label: 'Experience', value: '/experience' },
  { label: 'Services', value: '/services' },
];

const COMMON_TIMEZONES = [
  'Asia/Karachi',
  'UTC',
  'Asia/Dubai',
  'Europe/London',
  'America/New_York',
  'America/Los_Angeles',
];

export const AdminNotificationsPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(auth.currentUser);
  const [authReady, setAuthReady] = useState(false);
  const [authBusy, setAuthBusy] = useState(false);

  const [overview, setOverview] = useState<AdminNotificationOverview | null>(null);
  const [loadingOverview, setLoadingOverview] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    kind: 'success' | 'error' | 'info';
    text: string;
  } | null>(null);

  // Compose Notification Form
  const [title, setTitle] = useState('New Portfolio Update from Hanan Irfan');
  const [body, setBody] = useState(
    'Explore the latest full-stack project, AI workflow, and verified credentials on my portfolio.'
  );
  const [notificationType, setNotificationType] = useState<NotificationType>('new-project');
  const [targetUrl, setTargetUrl] = useState('/projects');
  const [targetAll, setTargetAll] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState<NotificationType[]>(['new-project']);
  const [sending, setSending] = useState(false);

  // Daily Scheduler Form
  const [scheduler, setScheduler] = useState<SchedulerSettings>({
    enabled: true,
    sendHour: 9,
    sendMinute: 0,
    timezone: 'Asia/Karachi',
    rotatingMessages: [...DEFAULT_ROTATING_DAILY_MESSAGES],
    lastRunDateKey: '',
  });
  const [newMessageDraft, setNewMessageDraft] = useState('');
  const [savingSchedule, setSavingSchedule] = useState(false);
  const [runningCron, setRunningCron] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (current) => {
      setUser(current);
      setAuthReady(true);
    });
    return () => unsub();
  }, []);

  const isAuthorizedAdmin = Boolean(
    user && user.email?.toLowerCase() === ADMIN_EMAIL && user.emailVerified
  );

  const loadOverview = useCallback(async () => {
    if (!user || !isAuthorizedAdmin) return;
    setLoadingOverview(true);
    try {
      const idToken = await user.getIdToken();
      const res = await fetch('/api/notifications/admin-overview', {
        headers: { Authorization: `Bearer ${idToken}` },
        cache: 'no-store',
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to load admin overview.');
      }
      setOverview(data as AdminNotificationOverview);
      if (data.scheduler) {
        setScheduler(data.scheduler);
      }
    } catch (err) {
      setStatusMessage({
        kind: 'error',
        text: err instanceof Error ? err.message : 'Unable to load admin overview.',
      });
    } finally {
      setLoadingOverview(false);
    }
  }, [user, isAuthorizedAdmin]);

  useEffect(() => {
    if (isAuthorizedAdmin) {
      void testConnection();
      void loadOverview();
    }
  }, [isAuthorizedAdmin, loadOverview]);

  const handleSignIn = async () => {
    setAuthBusy(true);
    setStatusMessage(null);
    try {
      await signInAdminWithGoogle();
    } catch (err) {
      setStatusMessage({
        kind: 'error',
        text: err instanceof Error ? err.message : 'Google Sign-In failed.',
      });
    } finally {
      setAuthBusy(false);
    }
  };

  const handleTypeChange = (nextType: NotificationType) => {
    setNotificationType(nextType);
    const meta = NOTIFICATION_CATEGORIES.find((c) => c.id === nextType);
    if (meta) {
      setTargetUrl(meta.defaultUrl);
    }
    if (!targetAll) {
      setSelectedCategories([nextType]);
    }
  };

  const toggleTargetCategory = (cat: NotificationType) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const syncLogToFirestore = async (log: NotificationLogEntry) => {
    if (!user) return;
    const path = `notification_logs/${log.id}`;
    try {
      await setDoc(doc(db, 'notification_logs', log.id), {
        title: log.title.slice(0, 120),
        body: log.body.slice(0, 500),
        notificationType: log.notificationType,
        targetUrl: log.targetUrl.slice(0, 256),
        targetCategories: log.targetCategories.slice(0, 10),
        isTest: Boolean(log.isTest),
        idempotencyKey: log.idempotencyKey.slice(0, 128),
        totalAttempted: log.totalAttempted,
        successCount: log.successCount,
        failureCount: log.failureCount,
        cleanedCount: log.cleanedCount,
        errorSummary: (log.errorSummary || '').slice(0, 1000),
        ownerUid: user.uid,
        createdAt: serverTimestamp(),
      });
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, path);
    }
  };

  const handleSend = async (isTest: boolean) => {
    if (!user || !isAuthorizedAdmin) return;
    if (!title.trim() || !body.trim()) {
      setStatusMessage({ kind: 'error', text: 'Title and message body are required.' });
      return;
    }

    setSending(true);
    setStatusMessage(null);
    try {
      const idToken = await user.getIdToken();
      let testTargetEndpoint: string | undefined;
      if (isTest) {
        const currentSub = await getCurrentPushSubscriptionStatus();
        if (currentSub.endpoint) {
          testTargetEndpoint = currentSub.endpoint;
        }
      }

      const targetCategories: NotificationType[] = targetAll
        ? NOTIFICATION_CATEGORIES.map((c) => c.id)
        : selectedCategories.length > 0
          ? selectedCategories
          : [notificationType];

      const res = await fetch('/api/notifications/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({
          title: title.trim(),
          body: body.trim(),
          notificationType,
          targetUrl: targetUrl.trim() || '/',
          targetCategories,
          isTest,
          testTargetEndpoint,
          idempotencyKey: isTest
            ? `test_${Date.now()}`
            : `broadcast_${notificationType}_${Math.floor(Date.now() / 60000)}`,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to dispatch notification.');
      }

      const log = data.log as NotificationLogEntry;
      // Best-effort sync to client Firestore audit log
      void syncLogToFirestore(log).catch(() => {});

      setStatusMessage({
        kind: log.failureCount > 0 && log.successCount === 0 ? 'error' : 'success',
        text: isTest
          ? `Test sent: ${log.successCount}/${log.totalAttempted} delivered.${log.errorSummary ? ` Errors: ${log.errorSummary}` : ''}`
          : `Notification dispatched: ${log.successCount}/${log.totalAttempted} delivered (${log.cleanedCount} expired tokens cleaned).`,
      });
      await loadOverview();
    } catch (err) {
      setStatusMessage({
        kind: 'error',
        text: err instanceof Error ? err.message : 'Notification dispatch failed.',
      });
    } finally {
      setSending(false);
    }
  };

  const handleSaveSchedule = async () => {
    if (!user || !isAuthorizedAdmin) return;
    setSavingSchedule(true);
    setStatusMessage(null);
    try {
      const idToken = await user.getIdToken();
      const res = await fetch('/api/notifications/admin-overview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify(scheduler),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to save schedule.');
      }

      // Sync scheduler document cleanly to Firestore
      try {
        await setDoc(doc(db, 'admin_settings', 'scheduler'), {
          enabled: Boolean(scheduler.enabled),
          sendHour: Math.min(23, Math.max(0, Math.trunc(Number(scheduler.sendHour) || 0))),
          sendMinute: Math.min(59, Math.max(0, Math.trunc(Number(scheduler.sendMinute) || 0))),
          timezone: scheduler.timezone,
          rotatingMessages: scheduler.rotatingMessages.slice(0, 12),
          lastRunDateKey: scheduler.lastRunDateKey || '',
          updatedByUid: user.uid,
          updatedAt: serverTimestamp(),
        });
      } catch (fsErr) {
        handleFirestoreError(fsErr, OperationType.WRITE, 'admin_settings/scheduler');
      }

      setStatusMessage({
        kind: 'success',
        text: `Daily reminder schedule saved (${String(scheduler.sendHour).padStart(2, '0')}:${String(scheduler.sendMinute).padStart(2, '0')} ${scheduler.timezone}).`,
      });
      await loadOverview();
    } catch (err) {
      setStatusMessage({
        kind: 'error',
        text: err instanceof Error ? err.message : 'Could not save scheduler settings.',
      });
    } finally {
      setSavingSchedule(false);
    }
  };

  const handleTriggerDailyNow = async () => {
    if (!user || !isAuthorizedAdmin) return;
    setRunningCron(true);
    setStatusMessage(null);
    try {
      const idToken = await user.getIdToken();
      const res = await fetch('/api/cron/daily-reminder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({ force: true }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Daily reminder run failed.');
      }
      setStatusMessage({
        kind: data.skipped ? 'info' : 'success',
        text: data.skipped
          ? data.reason || 'Daily reminder skipped.'
          : `Daily reminder delivered to ${data.log?.successCount ?? 0} subscriber(s).`,
      });
      await loadOverview();
    } catch (err) {
      setStatusMessage({
        kind: 'error',
        text: err instanceof Error ? err.message : 'Failed to run daily reminder.',
      });
    } finally {
      setRunningCron(false);
    }
  };

  const handleReadFirestoreLogsCheck = async () => {
    if (!user) return;
    try {
      const q = query(
        collection(db, 'notification_logs'),
        where('ownerUid', '==', user.uid),
        orderBy('createdAt', 'desc'),
        limit(10)
      );
      await getDocs(q);
    } catch (err) {
      handleFirestoreError(err, OperationType.LIST, 'notification_logs');
    }
  };

  const addRotatingMessage = () => {
    const trimmed = newMessageDraft.trim();
    if (trimmed.length < 5) return;
    setScheduler((prev) => ({
      ...prev,
      rotatingMessages: [...prev.rotatingMessages, trimmed.slice(0, 240)].slice(0, 12),
    }));
    setNewMessageDraft('');
  };

  const removeRotatingMessage = (idx: number) => {
    if (scheduler.rotatingMessages.length <= 1) return;
    setScheduler((prev) => ({
      ...prev,
      rotatingMessages: prev.rotatingMessages.filter((_, i) => i !== idx),
    }));
  };

  if (!authReady) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-20 flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-[#3B82F6]" />
      </div>
    );
  }

  if (!user || !isAuthorizedAdmin) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16">
        <div className="surface-card rounded-3xl p-8 text-center space-y-5">
          <div className="w-14 h-14 rounded-2xl bg-[#3B82F6]/15 border border-[#3B82F6]/35 flex items-center justify-center text-[#3B82F6] mx-auto">
            <Lock className="w-7 h-7" />
          </div>
          <div className="space-y-2">
            <span className="text-xs font-mono text-[#8B5CF6] uppercase tracking-wider font-semibold">
              Protected Owner Console
            </span>
            <h1 className="text-2xl sm:text-3xl font-black font-display text-[#F8FAFC]">
              Admin Push Notification Manager
            </h1>
            <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
              Sign in with your verified Google owner account ({ADMIN_EMAIL}) to send notifications, preview messages, manage daily reminders, and view delivery logs.
            </p>
          </div>

          {user && !isAuthorizedAdmin && (
            <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-400/30 text-xs text-amber-200">
              Signed in as <strong>{user.email}</strong>, which is not authorized for admin broadcasts.
            </div>
          )}

          {statusMessage && (
            <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-400/30 text-xs text-amber-200">
              {statusMessage.text}
            </div>
          )}

          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleSignIn}
              disabled={authBusy}
              className="px-6 py-3 rounded-xl bg-[#3B82F6] hover:bg-[#2563EB] text-[#F8FAFC] text-sm font-bold transition-colors inline-flex items-center gap-2 cursor-pointer"
            >
              {authBusy ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
              <span>Sign In with Google</span>
            </button>
            {user && (
              <button
                type="button"
                onClick={() => void signOutAdmin()}
                className="px-4 py-3 rounded-xl bg-white/[0.06] border border-white/[0.12] text-[#F8FAFC] text-sm font-semibold cursor-pointer"
              >
                Sign Out
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.1] pb-6">
        <div className="space-y-1">
          <span className="text-xs font-mono font-semibold text-[#8B5CF6] uppercase tracking-wider">
            Verified Admin: {user.email}
          </span>
          <h1 className="text-3xl sm:text-4xl font-black font-display text-[#F8FAFC]">
            Push Notification Console
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => {
              void loadOverview();
              void handleReadFirestoreLogsCheck().catch(() => {});
            }}
            disabled={loadingOverview}
            className="px-4 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.12] text-[#F8FAFC] text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loadingOverview ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
          <button
            type="button"
            onClick={() => void signOutAdmin()}
            className="px-4 py-2.5 rounded-xl bg-white/[0.05] hover:bg-red-500/15 border border-white/[0.12] text-[#F8FAFC] text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {statusMessage && (
        <div
          role="status"
          className={`p-4 rounded-2xl border text-xs sm:text-sm flex items-start gap-2.5 ${
            statusMessage.kind === 'success'
              ? 'bg-emerald-500/10 border-emerald-400/30 text-emerald-200'
              : statusMessage.kind === 'error'
                ? 'bg-amber-500/10 border-amber-400/30 text-amber-200'
                : 'bg-white/[0.05] border-white/[0.14] text-[#F8FAFC]'
          }`}
        >
          {statusMessage.kind === 'success' ? (
            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-400" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
          )}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* Overview Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="surface-card rounded-2xl p-5 space-y-1">
          <span className="text-xs font-mono text-[#94A3B8] flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-[#3B82F6]" /> Active Subscribers
          </span>
          <div className="text-3xl font-black font-mono tabular-nums text-[#F8FAFC]">
            {overview?.activeSubscribers ?? 0}
          </div>
          <span className="text-[11px] font-mono text-[#94A3B8]">
            Total stored: {overview?.totalSubscribers ?? 0}
          </span>
        </div>

        <div className="surface-card rounded-2xl p-5 space-y-1">
          <span className="text-xs font-mono text-[#94A3B8] flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#8B5CF6]" /> Daily Opt-Ins
          </span>
          <div className="text-3xl font-black font-mono tabular-nums text-[#F8FAFC]">
            {overview?.dailyOptInCount ?? 0}
          </div>
          <span className="text-[11px] font-mono text-[#94A3B8]">
            Schedule: {scheduler.enabled ? 'Enabled' : 'Paused'}
          </span>
        </div>

        <div className="surface-card rounded-2xl p-5 space-y-1">
          <span className="text-xs font-mono text-[#94A3B8] flex items-center gap-1.5">
            <Send className="w-3.5 h-3.5 text-[#3B82F6]" /> Total Broadcasts
          </span>
          <div className="text-3xl font-black font-mono tabular-nums text-[#F8FAFC]">
            {overview?.logs.length ?? 0}
          </div>
          <span className="text-[11px] font-mono text-[#94A3B8]">
            Storage: {overview?.storageMode || 'loading'}
          </span>
        </div>

        <div className="surface-card rounded-2xl p-5 space-y-1">
          <span className="text-xs font-mono text-[#94A3B8] flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Delivery Transports
          </span>
          <div className="text-sm font-bold font-mono text-[#F8FAFC] pt-1">
            VAPID Web Push: {overview?.hasVapidKeys ? 'Ready' : 'Missing'}
          </div>
          <span className="text-[11px] font-mono text-[#94A3B8]">
            FCM Server Admin: {overview?.hasFcmServerCredentials ? 'Connected' : 'VAPID Only'}
          </span>
        </div>
      </div>

      {/* Main Grid: Composer + Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Composer */}
        <div className="lg:col-span-7 surface-card rounded-3xl p-6 sm:p-8 space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold font-display text-[#F8FAFC]">
              Compose &amp; Send Notification
            </h2>
            <span className="text-xs font-mono text-[#94A3B8]">Duplicate-Protected</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="space-y-1.5 block">
              <span className="text-xs font-mono text-[#94A3B8]">Notification Type</span>
              <select
                value={notificationType}
                onChange={(e) => handleTypeChange(e.target.value as NotificationType)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0D1425] border border-white/[0.14] text-sm text-[#F8FAFC]"
              >
                {NOTIFICATION_CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="space-y-1.5 block">
              <span className="text-xs font-mono text-[#94A3B8]">Destination URL</span>
              <input
                type="text"
                value={targetUrl}
                onChange={(e) => setTargetUrl(e.target.value)}
                maxLength={256}
                placeholder="/projects or https://..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0D1425] border border-white/[0.14] text-sm text-[#F8FAFC] font-mono"
              />
            </label>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {URL_PRESETS.map((preset) => (
              <button
                key={preset.value}
                type="button"
                onClick={() => setTargetUrl(preset.value)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-mono border transition-colors cursor-pointer ${
                  targetUrl === preset.value
                    ? 'bg-[#3B82F6]/20 border-[#3B82F6]/50 text-[#F8FAFC]'
                    : 'bg-white/[0.04] border-white/[0.1] text-[#94A3B8] hover:text-[#F8FAFC]'
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>

          <label className="space-y-1.5 block">
            <div className="flex justify-between text-xs font-mono text-[#94A3B8]">
              <span>Title</span>
              <span>{title.length}/120</span>
            </div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={120}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0D1425] border border-white/[0.14] text-sm text-[#F8FAFC]"
            />
          </label>

          <label className="space-y-1.5 block">
            <div className="flex justify-between text-xs font-mono text-[#94A3B8]">
              <span>Message</span>
              <span>{body.length}/500</span>
            </div>
            <textarea
              rows={3}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              maxLength={500}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0D1425] border border-white/[0.14] text-sm text-[#F8FAFC]"
            />
          </label>

          {/* Target Audience */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-[#94A3B8]">Target Audience</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setTargetAll(true)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
                    targetAll
                      ? 'bg-[#3B82F6] text-[#F8FAFC]'
                      : 'bg-white/[0.06] text-[#94A3B8]'
                  }`}
                >
                  All Subscribers
                </button>
                <button
                  type="button"
                  onClick={() => setTargetAll(false)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
                    !targetAll
                      ? 'bg-[#8B5CF6] text-[#F8FAFC]'
                      : 'bg-white/[0.06] text-[#94A3B8]'
                  }`}
                >
                  Selected Categories
                </button>
              </div>
            </div>

            {!targetAll && (
              <div className="flex flex-wrap gap-2">
                {NOTIFICATION_CATEGORIES.map((cat) => {
                  const selected = selectedCategories.includes(cat.id);
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => toggleTargetCategory(cat.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs border transition-colors cursor-pointer ${
                        selected
                          ? 'bg-[#8B5CF6]/20 border-[#8B5CF6]/50 text-[#F8FAFC]'
                          : 'bg-white/[0.04] border-white/[0.1] text-[#94A3B8]'
                      }`}
                    >
                      {cat.label} ({overview?.categoryCounts[cat.id] ?? 0})
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => void handleSend(true)}
              disabled={sending}
              className="px-4 py-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.14] text-[#F8FAFC] text-xs font-bold inline-flex items-center gap-2 cursor-pointer"
            >
              {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Bell className="w-4 h-4 text-[#8B5CF6]" />}
              <span>Send Test Notification</span>
            </button>

            <button
              type="button"
              onClick={() => void handleSend(false)}
              disabled={sending}
              className="px-5 py-3 rounded-xl bg-[#3B82F6] hover:bg-[#2563EB] text-[#F8FAFC] text-xs font-bold inline-flex items-center gap-2 shadow-[0_0_24px_rgba(59,130,246,0.3)] cursor-pointer"
            >
              {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              <span>Broadcast Notification</span>
            </button>
          </div>
        </div>

        {/* Live Preview + Scheduler */}
        <div className="lg:col-span-5 space-y-6">
          {/* Preview Card */}
          <div className="surface-card rounded-3xl p-6 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-[#94A3B8]">
              <Eye className="w-4 h-4 text-[#3B82F6]" />
              <span>Live Android / Desktop Notification Preview</span>
            </div>

            <div className="p-4 rounded-2xl bg-[#080D1B] border border-white/[0.14] flex items-start gap-3.5 shadow-xl">
              <img
                src="/pwa-192x192.png"
                alt="App notification icon"
                className="w-10 h-10 rounded-xl border border-white/[0.12] shrink-0"
              />
              <div className="min-w-0 flex-1 space-y-1">
                <div className="flex items-center justify-between gap-2 text-[11px] font-mono text-[#94A3B8]">
                  <span>Hanan Irfan &bull; now</span>
                  <span className="truncate">{targetUrl || '/'}</span>
                </div>
                <p className="text-sm font-bold text-[#F8FAFC] truncate">
                  {title || 'Notification Title'}
                </p>
                <p className="text-xs text-[#94A3B8] line-clamp-2">
                  {body || 'Notification message preview'}
                </p>
              </div>
            </div>
          </div>

          {/* Daily Reminder Scheduler */}
          <div className="surface-card rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold font-display text-[#F8FAFC]">
                  Daily Reminder Scheduler
                </h2>
                <p className="text-[11px] font-mono text-[#94A3B8]">
                  Last sent date: {scheduler.lastRunDateKey || 'Never'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setScheduler((s) => ({ ...s, enabled: !s.enabled }))}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold cursor-pointer ${
                  scheduler.enabled
                    ? 'bg-emerald-500/20 border border-emerald-400/40 text-emerald-300'
                    : 'bg-white/[0.06] border border-white/[0.12] text-[#94A3B8]'
                }`}
              >
                {scheduler.enabled ? 'ENABLED' : 'PAUSED'}
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              <label className="space-y-1">
                <span className="text-[11px] font-mono text-[#94A3B8]">Hour (0–23)</span>
                <input
                  type="number"
                  min={0}
                  max={23}
                  value={scheduler.sendHour}
                  onChange={(e) =>
                    setScheduler((s) => ({
                      ...s,
                      sendHour: Math.max(0, Math.min(23, Number(e.target.value) || 0)),
                    }))
                  }
                  className="w-full px-3 py-2 rounded-xl bg-[#0D1425] border border-white/[0.14] text-xs font-mono text-[#F8FAFC]"
                />
              </label>

              <label className="space-y-1">
                <span className="text-[11px] font-mono text-[#94A3B8]">Minute</span>
                <input
                  type="number"
                  min={0}
                  max={59}
                  value={scheduler.sendMinute}
                  onChange={(e) =>
                    setScheduler((s) => ({
                      ...s,
                      sendMinute: Math.max(0, Math.min(59, Number(e.target.value) || 0)),
                    }))
                  }
                  className="w-full px-3 py-2 rounded-xl bg-[#0D1425] border border-white/[0.14] text-xs font-mono text-[#F8FAFC]"
                />
              </label>

              <label className="space-y-1">
                <span className="text-[11px] font-mono text-[#94A3B8]">Timezone</span>
                <select
                  value={scheduler.timezone}
                  onChange={(e) => setScheduler((s) => ({ ...s, timezone: e.target.value }))}
                  className="w-full px-2.5 py-2 rounded-xl bg-[#0D1425] border border-white/[0.14] text-xs font-mono text-[#F8FAFC]"
                >
                  {COMMON_TIMEZONES.map((tz) => (
                    <option key={tz} value={tz}>
                      {tz}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono text-[#94A3B8] block">
                Rotating Daily Messages ({scheduler.rotatingMessages.length}/12)
              </span>
              <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
                {scheduler.rotatingMessages.map((msg, idx) => (
                  <div
                    key={`${idx}-${msg.slice(0, 12)}`}
                    className="flex items-start gap-2 p-2.5 rounded-xl bg-[#0D1425]/80 border border-white/[0.1] text-xs text-[#F8FAFC]"
                  >
                    <span className="flex-1 leading-relaxed">{msg}</span>
                    {scheduler.rotatingMessages.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeRotatingMessage(idx)}
                        aria-label="Remove rotating message"
                        className="p-1 text-[#94A3B8] hover:text-red-400 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMessageDraft}
                  onChange={(e) => setNewMessageDraft(e.target.value)}
                  maxLength={240}
                  placeholder="Add a rotating reminder message..."
                  className="flex-1 px-3 py-2 rounded-xl bg-[#0D1425] border border-white/[0.14] text-xs text-[#F8FAFC]"
                />
                <button
                  type="button"
                  onClick={addRotatingMessage}
                  className="px-3 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.12] text-[#F8FAFC] text-xs font-semibold inline-flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              <button
                type="button"
                onClick={() => void handleSaveSchedule()}
                disabled={savingSchedule}
                className="flex-1 py-2.5 px-4 rounded-xl bg-[#3B82F6] hover:bg-[#2563EB] text-[#F8FAFC] text-xs font-bold inline-flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {savingSchedule && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                <span>Save Schedule</span>
              </button>
              <button
                type="button"
                onClick={() => void handleTriggerDailyNow()}
                disabled={runningCron}
                className="py-2.5 px-4 rounded-xl bg-[#8B5CF6]/20 hover:bg-[#8B5CF6]/30 border border-[#8B5CF6]/45 text-[#F8FAFC] text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
              >
                {runningCron ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5" />}
                <span>Test Daily Run</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* History & Delivery Logs */}
      <div className="surface-card rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold font-display text-[#F8FAFC]">
            Notification History &amp; Delivery Logs
          </h2>
          <span className="text-xs font-mono text-[#94A3B8]">
            {overview?.logs.length ?? 0} recent entries
          </span>
        </div>

        {!overview || overview.logs.length === 0 ? (
          <p className="text-xs sm:text-sm text-[#94A3B8] py-4">
            No notifications have been sent yet. Use &ldquo;Send Test Notification&rdquo; above to verify end-to-end delivery.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-white/[0.1] text-[#94A3B8] font-mono">
                  <th className="py-2.5 pr-4">Time</th>
                  <th className="py-2.5 pr-4">Type</th>
                  <th className="py-2.5 pr-4">Notification</th>
                  <th className="py-2.5 pr-4">Target</th>
                  <th className="py-2.5 pr-4 text-right">Delivered</th>
                  <th className="py-2.5 pr-4 text-right">Cleaned</th>
                  <th className="py-2.5">Errors</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06]">
                {overview.logs.map((entry) => (
                  <tr key={entry.id} className="hover:bg-white/[0.03]">
                    <td className="py-3 pr-4 font-mono tabular-nums text-[#94A3B8] whitespace-nowrap">
                      {new Date(entry.createdAt).toLocaleString()}
                    </td>
                    <td className="py-3 pr-4 font-mono text-[#3B82F6] whitespace-nowrap">
                      {entry.notificationType}
                      {entry.isTest ? ' (test)' : ''}
                    </td>
                    <td className="py-3 pr-4 max-w-xs">
                      <div className="font-semibold text-[#F8FAFC] truncate">{entry.title}</div>
                      <div className="text-[#94A3B8] truncate">{entry.body}</div>
                    </td>
                    <td className="py-3 pr-4 font-mono text-[#94A3B8] whitespace-nowrap">
                      {entry.targetUrl}
                    </td>
                    <td className="py-3 pr-4 font-mono tabular-nums text-right text-[#F8FAFC]">
                      {entry.successCount}/{entry.totalAttempted}
                    </td>
                    <td className="py-3 pr-4 font-mono tabular-nums text-right text-[#94A3B8]">
                      {entry.cleanedCount}
                    </td>
                    <td className="py-3 text-amber-300 max-w-xs truncate">
                      {entry.errorSummary || 'None'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
