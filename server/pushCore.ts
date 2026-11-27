import crypto from 'node:crypto';
import * as webpushNs from 'web-push';
import { getMessaging } from 'firebase-admin/messaging';

const webpush = ((webpushNs as unknown as { default?: typeof webpushNs }).default?.setVapidDetails
  ? (webpushNs as unknown as { default: typeof webpushNs }).default
  : webpushNs);
import { getFirebaseAdminApp } from './auth.js';
import {
  appendNotificationLog,
  checkAndRecordIdempotencyKey,
  deleteSubscribersBulk,
  getOrCreateDevVapidKeys,
  getSchedulerSettings,
  getStorageMode,
  listAllSubscribers,
  listNotificationLogs,
  makeSubscriptionId,
  markSubscribersDailySent,
  saveSchedulerSettings,
  upsertSubscriber,
} from './storage.js';
import {
  ALLOWED_NOTIFICATION_TYPES,
  type NotificationType,
  type ServerNotificationLog,
  type ServerSchedulerSettings,
  type StoredPushSubscriptionPayload,
  type StoredSubscriber,
} from './types.js';

const TYPE_DEFAULT_URLS: Record<NotificationType, string> = {
  'daily-reminder': '/',
  'new-project': '/projects',
  'project-update': '/projects',
  'new-achievement': '/about#achievements',
  'new-skill': '/skills',
  'new-certificate': '/about#achievements',
  'experience-update': '/experience',
  'general-announcement': '/',
};

// Sliding-window in-memory rate limit buckets
const rateBuckets = new Map<string, number[]>();

export function checkRateLimit(
  bucketKey: string,
  maxRequests: number,
  windowMs: number
): boolean {
  const now = Date.now();
  const cutoff = now - windowMs;
  const timestamps = (rateBuckets.get(bucketKey) || []).filter((t) => t > cutoff);
  if (timestamps.length >= maxRequests) {
    rateBuckets.set(bucketKey, timestamps);
    return false;
  }
  timestamps.push(now);
  rateBuckets.set(bucketKey, timestamps);
  return true;
}

export function sanitizeTargetUrl(
  rawUrl: unknown,
  notificationType: NotificationType
): string {
  const fallback = TYPE_DEFAULT_URLS[notificationType] || '/';
  if (typeof rawUrl !== 'string' || !rawUrl.trim()) return fallback;
  const trimmed = rawUrl.trim().slice(0, 256);

  if (trimmed.startsWith('/')) {
    // Disallow protocol-relative //evil.com
    if (trimmed.startsWith('//')) return fallback;
    return trimmed;
  }

  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol === 'https:' || parsed.protocol === 'http:') {
      return parsed.href;
    }
  } catch {
    return fallback;
  }
  return fallback;
}

export function sanitizeCategories(raw: unknown): NotificationType[] {
  if (!Array.isArray(raw)) return ['new-project', 'general-announcement'];
  const filtered = raw.filter(
    (c): c is NotificationType =>
      typeof c === 'string' && ALLOWED_NOTIFICATION_TYPES.includes(c as NotificationType)
  );
  return Array.from(new Set(filtered)).slice(0, 10);
}

export function validatePushSubscriptionPayload(
  raw: unknown
): StoredPushSubscriptionPayload | null {
  if (!raw || typeof raw !== 'object') return null;
  const obj = raw as Record<string, unknown>;
  if (typeof obj.endpoint !== 'string' || obj.endpoint.length < 16 || obj.endpoint.length > 1024) {
    return null;
  }
  try {
    const parsed = new URL(obj.endpoint);
    if (parsed.protocol !== 'https:') return null;
  } catch {
    return null;
  }
  const keys = obj.keys as Record<string, unknown> | undefined;
  if (
    !keys ||
    typeof keys.p256dh !== 'string' ||
    typeof keys.auth !== 'string' ||
    keys.p256dh.length < 16 ||
    keys.auth.length < 8
  ) {
    return null;
  }
  const expirationTime =
    typeof obj.expirationTime === 'number' ? obj.expirationTime : null;
  return {
    endpoint: obj.endpoint,
    expirationTime,
    keys: {
      p256dh: keys.p256dh,
      auth: keys.auth,
    },
  };
}

export function getZonedDateParts(date: Date, timeZone: string): {
  dateKey: string;
  hour: number;
  minute: number;
} {
  let validTz = 'Asia/Karachi';
  try {
    new Intl.DateTimeFormat('en-US', { timeZone }).format(date);
    validTz = timeZone;
  } catch {
    validTz = 'Asia/Karachi';
  }

  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: validTz,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  const parts = formatter.formatToParts(date);
  const lookup: Record<string, string> = {};
  for (const part of parts) {
    lookup[part.type] = part.value;
  }
  const hourNum = Number(lookup.hour || '0') % 24;
  return {
    dateKey: `${lookup.year}-${lookup.month}-${lookup.day}`,
    hour: hourNum,
    minute: Number(lookup.minute || '0'),
  };
}

export interface SendPushInput {
  title: string;
  body: string;
  notificationType: NotificationType;
  targetUrl?: string;
  targetCategories?: NotificationType[];
  isTest?: boolean;
  testTargetEndpoint?: string;
  testTargetFcmToken?: string;
  idempotencyKey?: string;
}

export async function dispatchPushNotification(
  input: SendPushInput
): Promise<ServerNotificationLog> {
  const title = input.title.trim().slice(0, 120);
  const body = input.body.trim().slice(0, 500);
  if (!title || !body) {
    throw new Error('Notification title and message body are required.');
  }

  const notificationType: NotificationType = ALLOWED_NOTIFICATION_TYPES.includes(
    input.notificationType
  )
    ? input.notificationType
    : 'general-announcement';

  const targetUrl = sanitizeTargetUrl(input.targetUrl, notificationType);
  const targetCategories =
    input.targetCategories && input.targetCategories.length > 0
      ? sanitizeCategories(input.targetCategories)
      : [notificationType];

  const isTest = Boolean(input.isTest);
  const rawHash = crypto
    .createHash('sha256')
    .update(`${notificationType}:${title}:${body}:${targetUrl}`)
    .digest('hex')
    .slice(0, 20);

  const idempotencyKey =
    (input.idempotencyKey && input.idempotencyKey.replace(/[^a-zA-Z0-9_:-]/g, '_').slice(0, 128)) ||
    (isTest ? `test:${Date.now()}:${rawHash}` : `send:${rawHash}`);

  if (!isTest) {
    const allowed = await checkAndRecordIdempotencyKey(idempotencyKey, 90_000);
    if (!allowed) {
      throw new Error(
        'Duplicate send prevented: this exact notification was already dispatched recently.'
      );
    }
  }

  const vapidKeys = await getOrCreateDevVapidKeys();
  const vapidSubject =
    process.env.VAPID_SUBJECT?.trim() || 'mailto:hananirfan91@gmail.com';
  if (vapidKeys) {
    webpush.setVapidDetails(vapidSubject, vapidKeys.publicKey, vapidKeys.privateKey);
  }

  const { app, hasServiceAccount } = getFirebaseAdminApp();
  const allSubscribers = await listAllSubscribers();

  let targets: StoredSubscriber[] = [];
  if (isTest && (input.testTargetEndpoint || input.testTargetFcmToken)) {
    const testId = makeSubscriptionId(
      input.testTargetEndpoint || input.testTargetFcmToken || 'test'
    );
    const matched = allSubscribers.find((s) => s.subscriptionId === testId);
    if (matched) {
      targets = [matched];
    } else if (input.testTargetEndpoint) {
      // Ephemeral test target if browser subscription wasn't persisted yet
      const maybeSub = allSubscribers.find(
        (s) => s.pushSubscription?.endpoint === input.testTargetEndpoint
      );
      if (maybeSub) targets = [maybeSub];
    }
  } else {
    targets = allSubscribers.filter((sub) => {
      if (!sub.active) return false;
      if (notificationType === 'daily-reminder') {
        return sub.dailyReminder === true;
      }
      if (targetCategories.includes('general-announcement') && targetCategories.length === 1) {
        return (
          sub.categories.includes('general-announcement') || sub.categories.length === 0
        );
      }
      return targetCategories.some((cat) => sub.categories.includes(cat));
    });
    if (isTest && targets.length > 1) {
      targets = targets.slice(0, 1);
    }
  }

  const payloadObj = {
    title,
    body,
    notificationType,
    url: targetUrl,
    tag: isTest ? `hi-test-${Date.now()}` : `hi-${notificationType}-${rawHash.slice(0, 8)}`,
    icon: '/pwa-192x192.png',
    badge: '/favicon-32x32.png',
    data: {
      url: targetUrl,
      notificationType,
      idempotencyKey,
    },
  };
  const payloadJson = JSON.stringify(payloadObj);

  let successCount = 0;
  let failureCount = 0;
  const expiredIds: string[] = [];
  const errors: string[] = [];
  const deliveredIds: string[] = [];

  for (const sub of targets) {
    let sent = false;

    // 1. Prefer Web Push VAPID (works seamlessly on Chrome, Edge, Firefox, Safari, & Bubblewrap TWA via fcm.googleapis.com)
    if (sub.pushSubscription && vapidKeys) {
      try {
        await webpush.sendNotification(sub.pushSubscription, payloadJson, {
          TTL: 60 * 60 * 12,
          urgency: notificationType === 'daily-reminder' ? 'normal' : 'high',
        });
        sent = true;
        successCount += 1;
        deliveredIds.push(sub.subscriptionId);
      } catch (err: unknown) {
        const statusCode =
          typeof err === 'object' && err !== null && 'statusCode' in err
            ? Number((err as { statusCode?: number }).statusCode)
            : 0;
        const message =
          err instanceof Error ? err.message : 'Web Push delivery error';

        if (statusCode === 404 || statusCode === 410) {
          expiredIds.push(sub.subscriptionId);
        } else {
          errors.push(`${sub.platform}: ${message}`);
        }
      }
    }

    // 2. Fallback to FCM HTTP v1 when service account + fcmToken exist and Web Push wasn't used
    if (!sent && sub.fcmToken && hasServiceAccount) {
      try {
        await getMessaging(app).send({
          token: sub.fcmToken,
          notification: {
            title,
            body,
          },
          webpush: {
            fcmOptions: {
              link: targetUrl.startsWith('/')
                ? `https://hanan56.vercel.app${targetUrl}`
                : targetUrl,
            },
          },
          data: {
            url: targetUrl,
            notificationType,
            idempotencyKey,
          },
        });
        sent = true;
        successCount += 1;
        deliveredIds.push(sub.subscriptionId);
      } catch (err: unknown) {
        const code =
          typeof err === 'object' && err !== null && 'code' in err
            ? String((err as { code?: string }).code)
            : '';
        const message = err instanceof Error ? err.message : 'FCM delivery error';
        if (
          code === 'messaging/registration-token-not-registered' ||
          code === 'messaging/invalid-registration-token'
        ) {
          expiredIds.push(sub.subscriptionId);
        } else {
          errors.push(`FCM(${sub.platform}): ${message}`);
        }
      }
    }

    if (!sent && !expiredIds.includes(sub.subscriptionId)) {
      failureCount += 1;
      if (errors.length === 0) {
        errors.push(`No active delivery transport configured for ${sub.platform}`);
      }
    }
  }

  if (expiredIds.length > 0) {
    await deleteSubscribersBulk(Array.from(new Set(expiredIds)));
  }

  const logEntry: ServerNotificationLog = {
    id: `log_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`,
    title,
    body,
    notificationType,
    targetUrl,
    targetCategories,
    isTest,
    idempotencyKey,
    totalAttempted: targets.length,
    successCount,
    failureCount: failureCount + expiredIds.length,
    cleanedCount: expiredIds.length,
    errorSummary: errors.slice(0, 5).join(' | ').slice(0, 1000),
    createdAt: new Date().toISOString(),
  };

  await appendNotificationLog(logEntry);
  return logEntry;
}

export async function runDailyReminderJob(options?: {
  force?: boolean;
}): Promise<{
  skipped: boolean;
  reason?: string;
  dateKey: string;
  log?: ServerNotificationLog;
}> {
  const settings = await getSchedulerSettings();
  const { dateKey, hour, minute } = getZonedDateParts(new Date(), settings.timezone);

  if (!settings.enabled && !options?.force) {
    return { skipped: true, reason: 'Daily reminder scheduler is disabled.', dateKey };
  }

  if (!options?.force) {
    if (settings.lastRunDateKey === dateKey) {
      return {
        skipped: true,
        reason: `Daily reminder already ran for ${dateKey}.`,
        dateKey,
      };
    }

    const currentMinutes = hour * 60 + minute;
    const targetMinutes = settings.sendHour * 60 + settings.sendMinute;
    if (currentMinutes < targetMinutes) {
      return {
        skipped: true,
        reason: `Scheduled window (${String(settings.sendHour).padStart(2, '0')}:${String(settings.sendMinute).padStart(2, '0')} ${settings.timezone}) has not arrived yet.`,
        dateKey,
      };
    }
  }

  const messages =
    settings.rotatingMessages.length > 0
      ? settings.rotatingMessages
      : ["Explore Hanan Irfan's portfolio today."];
  const nextIndex = settings.dailyRotationIndex % messages.length;
  const selectedMessage = messages[nextIndex];

  const allSubscribers = await listAllSubscribers();
  const eligible = allSubscribers.filter(
    (sub) =>
      sub.active &&
      sub.dailyReminder === true &&
      (options?.force || sub.lastDailySentDateKey !== dateKey)
  );

  if (eligible.length === 0) {
    if (!options?.force) {
      await saveSchedulerSettings({
        lastRunDateKey: dateKey,
        dailyRotationIndex: (nextIndex + 1) % messages.length,
      });
    }
    return {
      skipped: true,
      reason: 'No eligible daily reminder subscribers for today.',
      dateKey,
    };
  }

  // Filter strictly via idempotency per day when not forced
  const idempotencyKey = options?.force
    ? `daily_manual_${Date.now()}`
    : `daily_${dateKey}`;

  const log = await dispatchPushNotification({
    title: 'Hanan Irfan — Daily Portfolio Check-In',
    body: selectedMessage,
    notificationType: 'daily-reminder',
    targetUrl: '/',
    targetCategories: ['daily-reminder'],
    isTest: Boolean(options?.force),
    idempotencyKey,
  });

  if (!options?.force) {
    await markSubscribersDailySent(
      eligible.map((s) => s.subscriptionId),
      dateKey
    );
    await saveSchedulerSettings({
      lastRunDateKey: dateKey,
      dailyRotationIndex: (nextIndex + 1) % messages.length,
    });
  }

  return { skipped: false, dateKey, log };
}

export async function buildAdminOverview() {
  const [subscribers, scheduler, logs, vapidKeys] = await Promise.all([
    listAllSubscribers(),
    getSchedulerSettings(),
    listNotificationLogs(40),
    getOrCreateDevVapidKeys(),
  ]);

  const { hasServiceAccount } = getFirebaseAdminApp();
  const categoryCounts: Record<NotificationType, number> = {
    'daily-reminder': 0,
    'new-project': 0,
    'project-update': 0,
    'new-achievement': 0,
    'new-skill': 0,
    'new-certificate': 0,
    'experience-update': 0,
    'general-announcement': 0,
  };
  const platformCounts: Record<string, number> = {};

  let activeSubscribers = 0;
  let dailyOptInCount = 0;

  for (const sub of subscribers) {
    if (sub.active) activeSubscribers += 1;
    if (sub.active && sub.dailyReminder) dailyOptInCount += 1;
    if (sub.active) {
      if (sub.dailyReminder) categoryCounts['daily-reminder'] += 1;
      for (const cat of sub.categories) {
        if (cat in categoryCounts && cat !== 'daily-reminder') {
          categoryCounts[cat] += 1;
        }
      }
      platformCounts[sub.platform || 'unknown'] =
        (platformCounts[sub.platform || 'unknown'] || 0) + 1;
    }
  }

  return {
    totalSubscribers: subscribers.length,
    activeSubscribers,
    dailyOptInCount,
    categoryCounts,
    platformCounts,
    scheduler,
    logs,
    storageMode: getStorageMode(),
    hasFcmServerCredentials: hasServiceAccount,
    hasVapidKeys: Boolean(vapidKeys),
  };
}

export interface PublicNotificationFeedItem {
  id: string;
  title: string;
  body: string;
  notificationType: NotificationType;
  targetUrl: string;
  createdAt: string;
  isDailyHighlight?: boolean;
}

export async function buildPublicNotificationFeed(
  limitCount = 10
): Promise<{
  items: PublicNotificationFeedItem[];
  dailyEnabled: boolean;
}> {
  const [logs, scheduler] = await Promise.all([
    listNotificationLogs(Math.max(limitCount, 20)),
    getSchedulerSettings(),
  ]);

  const items: PublicNotificationFeedItem[] = logs
    .filter((entry) => !entry.isTest)
    .slice(0, limitCount)
    .map((entry) => ({
      id: entry.id,
      title: entry.title,
      body: entry.body,
      notificationType: entry.notificationType,
      targetUrl: sanitizeTargetUrl(entry.targetUrl, entry.notificationType),
      createdAt: entry.createdAt,
    }));

  // Deterministic once-per-day portfolio highlight visible automatically on all devices
  if (scheduler.enabled && scheduler.rotatingMessages.length > 0) {
    const { dateKey } = getZonedDateParts(new Date(), scheduler.timezone);
    const alreadyLoggedToday = items.some(
      (item) =>
        item.notificationType === 'daily-reminder' &&
        item.createdAt.slice(0, 10) === dateKey
    );

    if (!alreadyLoggedToday) {
      const dayNumber = Math.floor(Date.now() / 86_400_000);
      const message =
        scheduler.rotatingMessages[dayNumber % scheduler.rotatingMessages.length] ||
        scheduler.rotatingMessages[0];
      items.unshift({
        id: `daily_spotlight_${dateKey}`,
        title: "Hanan Irfan — Today's Portfolio Highlight",
        body: message,
        notificationType: 'daily-reminder',
        targetUrl: '/',
        createdAt: `${dateKey}T00:00:00.000Z`,
        isDailyHighlight: true,
      });
    }
  }

  return {
    items: items.slice(0, limitCount),
    dailyEnabled: scheduler.enabled,
  };
}

export async function handlePublicSubscribe(body: Record<string, unknown>) {
  const pushSubscription = validatePushSubscriptionPayload(body.pushSubscription);
  const fcmToken =
    typeof body.fcmToken === 'string' && body.fcmToken.trim().length >= 20
      ? body.fcmToken.trim().slice(0, 512)
      : null;

  if (!pushSubscription && !fcmToken) {
    throw new Error('Valid Web Push subscription or FCM token is required.');
  }

  const keySource = pushSubscription?.endpoint || fcmToken || '';
  const subscriptionId = makeSubscriptionId(keySource);
  const categories = sanitizeCategories(body.categories);
  const dailyReminder =
    typeof body.dailyReminder === 'boolean' ? body.dailyReminder : true;
  const timezone =
    typeof body.timezone === 'string' && /^[A-Za-z0-9_/+-]{2,64}$/.test(body.timezone)
      ? body.timezone
      : 'Asia/Karachi';
  const platform =
    typeof body.platform === 'string'
      ? body.platform.replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 40) || 'web'
      : 'web';

  const now = new Date().toISOString();
  const record: StoredSubscriber = {
    subscriptionId,
    pushSubscription,
    fcmToken,
    categories,
    dailyReminder,
    timezone,
    platform,
    active: true,
    lastDailySentDateKey: '',
    createdAt: now,
    updatedAt: now,
  };

  await upsertSubscriber(record);
  return { subscriptionId, active: true };
}

export async function handlePublicPreferencesUpdate(
  body: Record<string, unknown>,
  existingLookup: (subId?: string, endpoint?: string) => Promise<StoredSubscriber | null>
) {
  const subscriptionId =
    typeof body.subscriptionId === 'string' ? body.subscriptionId.slice(0, 128) : undefined;
  const endpoint =
    typeof body.endpoint === 'string' ? body.endpoint.slice(0, 1024) : undefined;
  const existing = await existingLookup(subscriptionId, endpoint);
  if (!existing) {
    throw new Error('Subscription record not found.');
  }

  const categories = sanitizeCategories(body.categories);
  const dailyReminder =
    typeof body.dailyReminder === 'boolean' ? body.dailyReminder : existing.dailyReminder;
  const timezone =
    typeof body.timezone === 'string' && /^[A-Za-z0-9_/+-]{2,64}$/.test(body.timezone)
      ? body.timezone
      : existing.timezone;

  await upsertSubscriber({
    ...existing,
    categories,
    dailyReminder,
    timezone,
    updatedAt: new Date().toISOString(),
  });
  return { subscriptionId: existing.subscriptionId, updated: true };
}

export function normalizeSchedulerUpdate(
  body: Record<string, unknown>,
  current: ServerSchedulerSettings
): Partial<ServerSchedulerSettings> {
  const enabled = typeof body.enabled === 'boolean' ? body.enabled : current.enabled;
  const sendHour =
    typeof body.sendHour === 'number' && Number.isInteger(body.sendHour) && body.sendHour >= 0 && body.sendHour <= 23
      ? body.sendHour
      : current.sendHour;
  const sendMinute =
    typeof body.sendMinute === 'number' && Number.isInteger(body.sendMinute) && body.sendMinute >= 0 && body.sendMinute <= 59
      ? body.sendMinute
      : current.sendMinute;
  const timezone =
    typeof body.timezone === 'string' && /^[A-Za-z0-9_/+-]{2,64}$/.test(body.timezone)
      ? body.timezone
      : current.timezone;
  const rotatingMessages = Array.isArray(body.rotatingMessages)
    ? body.rotatingMessages
        .filter((m): m is string => typeof m === 'string' && m.trim().length >= 5)
        .map((m) => m.trim().slice(0, 240))
        .slice(0, 12)
    : current.rotatingMessages;

  return {
    enabled,
    sendHour,
    sendMinute,
    timezone,
    rotatingMessages:
      rotatingMessages.length > 0 ? rotatingMessages : current.rotatingMessages,
  };
}
