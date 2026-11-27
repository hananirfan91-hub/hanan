import {
  DEFAULT_SUBSCRIBER_CATEGORIES,
  NotificationPreferences,
  NotificationType,
} from '../types/notifications';
import { isAndroidWebView } from './safeStorage';

const PREFS_STORAGE_KEY = 'hi_push_prefs_v1';
const SUB_ID_STORAGE_KEY = 'hi_push_sub_id_v1';
const PROMPT_DISMISSED_KEY = 'hi_push_prompt_dismissed_v1';

export type PushSupportState =
  | 'supported'
  | 'unsupported-browser'
  | 'webview-limited'
  | 'ios-needs-install';

export type PushPermissionState = NotificationPermission | 'unsupported';

export interface StoredPushState {
  subscribed: boolean;
  subscriptionId: string | null;
  preferences: NotificationPreferences;
}

export function getBrowserTimezone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Karachi';
  } catch {
    return 'Asia/Karachi';
  }
}

export function detectPushPlatform(): string {
  if (typeof navigator === 'undefined') return 'unknown';
  const ua = navigator.userAgent || '';
  const isStandalone =
    window.matchMedia?.('(display-mode: standalone)').matches ||
    (window.navigator as unknown as { standalone?: boolean }).standalone === true;
  const referrer = typeof document !== 'undefined' ? document.referrer || '' : '';
  const isTWA = referrer.startsWith('android-app://com.hananirfan.app') || (isStandalone && /Android/i.test(ua));

  if (isTWA) return 'android-twa';
  if (isAndroidWebView()) return 'android-webview';
  if (/Android/i.test(ua)) return 'android-chrome';
  if (/iPhone|iPad|iPod/i.test(ua)) return isStandalone ? 'ios-pwa' : 'ios-safari';
  if (/Edg\//i.test(ua)) return 'desktop-edge';
  if (/Chrome\//i.test(ua)) return 'desktop-chrome';
  if (/Firefox\//i.test(ua)) return 'desktop-firefox';
  return 'web-other';
}

export function checkPushSupport(): PushSupportState {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return 'unsupported-browser';
  }
  if (isAndroidWebView()) {
    return 'webview-limited';
  }
  const ua = navigator.userAgent || '';
  const isIOS = /iPhone|iPad|iPod/i.test(ua);
  const isStandalone =
    window.matchMedia?.('(display-mode: standalone)').matches ||
    (window.navigator as unknown as { standalone?: boolean }).standalone === true;

  if (isIOS && !isStandalone) {
    return 'ios-needs-install';
  }
  if (!('Notification' in window) || !('serviceWorker' in navigator) || !('PushManager' in window)) {
    return 'unsupported-browser';
  }
  return 'supported';
}

export function getNotificationPermissionState(): PushPermissionState {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return 'unsupported';
  }
  return Notification.permission;
}

export function getSavedPreferences(): NotificationPreferences {
  const defaultPrefs: NotificationPreferences = {
    categories: [...DEFAULT_SUBSCRIBER_CATEGORIES],
    dailyReminder: true,
    timezone: getBrowserTimezone(),
  };

  try {
    const raw = window.localStorage.getItem(PREFS_STORAGE_KEY);
    if (!raw) return defaultPrefs;
    const parsed = JSON.parse(raw) as Partial<NotificationPreferences>;
    return {
      categories: Array.isArray(parsed.categories)
        ? (parsed.categories as NotificationType[])
        : defaultPrefs.categories,
      dailyReminder:
        typeof parsed.dailyReminder === 'boolean' ? parsed.dailyReminder : defaultPrefs.dailyReminder,
      timezone:
        typeof parsed.timezone === 'string' && parsed.timezone ? parsed.timezone : defaultPrefs.timezone,
    };
  } catch {
    return defaultPrefs;
  }
}

export function savePreferencesLocally(prefs: NotificationPreferences): void {
  try {
    window.localStorage.setItem(PREFS_STORAGE_KEY, JSON.stringify(prefs));
  } catch {
    // Ignore storage quota errors
  }
}

export function getSavedSubscriptionId(): string | null {
  try {
    return window.localStorage.getItem(SUB_ID_STORAGE_KEY);
  } catch {
    return null;
  }
}

function saveSubscriptionId(id: string | null): void {
  try {
    if (id) {
      window.localStorage.setItem(SUB_ID_STORAGE_KEY, id);
    } else {
      window.localStorage.removeItem(SUB_ID_STORAGE_KEY);
    }
  } catch {
    // Ignore storage errors
  }
}

export function isPromptSuppressed(): boolean {
  try {
    return window.localStorage.getItem(PROMPT_DISMISSED_KEY) === 'true';
  } catch {
    return false;
  }
}

export function markPromptSuppressed(suppressed: boolean): void {
  try {
    if (suppressed) {
      window.localStorage.setItem(PROMPT_DISMISSED_KEY, 'true');
    } else {
      window.localStorage.removeItem(PROMPT_DISMISSED_KEY);
    }
  } catch {
    // Ignore
  }
}

function urlBase64ToUint8Array(base64String: string): Uint8Array<ArrayBuffer> {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const buffer = new ArrayBuffer(rawData.length);
  const outputArray = new Uint8Array(buffer);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

async function getActiveServiceWorkerRegistration(): Promise<ServiceWorkerRegistration> {
  const existing = await navigator.serviceWorker.getRegistration('/');
  if (existing) {
    return existing;
  }
  const registered = await navigator.serviceWorker.register('/sw.js', { scope: '/' });
  await navigator.serviceWorker.ready;
  return registered;
}

export async function fetchPublicPushConfig(): Promise<{
  vapidPublicKey: string | null;
  firebaseVapidKey?: string | null;
  configured: boolean;
}> {
  const res = await fetch('/api/notifications/config', { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to load push notification configuration.');
  }
  return res.json();
}

export async function getCurrentPushSubscriptionStatus(): Promise<{
  isSubscribed: boolean;
  endpoint: string | null;
  subscriptionId: string | null;
}> {
  if (checkPushSupport() !== 'supported') {
    return { isSubscribed: false, endpoint: null, subscriptionId: getSavedSubscriptionId() };
  }

  try {
    const registration = await navigator.serviceWorker.getRegistration('/');
    if (!registration) {
      return { isSubscribed: false, endpoint: null, subscriptionId: getSavedSubscriptionId() };
    }
    const sub = await registration.pushManager.getSubscription();
    if (!sub || Notification.permission !== 'granted') {
      return { isSubscribed: false, endpoint: null, subscriptionId: getSavedSubscriptionId() };
    }
    return {
      isSubscribed: true,
      endpoint: sub.endpoint,
      subscriptionId: getSavedSubscriptionId(),
    };
  } catch {
    return { isSubscribed: false, endpoint: null, subscriptionId: getSavedSubscriptionId() };
  }
}

/**
 * Subscribe user ONLY inside an explicit user click/tap handler.
 */
export async function subscribeToPortfolioNotifications(
  preferences: NotificationPreferences
): Promise<{
  success: boolean;
  subscriptionId?: string;
  permission: PushPermissionState;
  error?: string;
}> {
  const support = checkPushSupport();
  if (support !== 'supported') {
    return {
      success: false,
      permission: getNotificationPermissionState(),
      error:
        support === 'ios-needs-install'
          ? 'Add this portfolio to your iPhone/iPad Home Screen first, then open it to enable push notifications.'
          : support === 'webview-limited'
            ? 'Embedded WebView does not support background Web Push. Open in Chrome or the installed TWA app.'
            : 'Push notifications are not supported on this browser.',
    };
  }

  const permission = await Notification.requestPermission();
  if (permission !== 'granted') {
    if (permission === 'denied') {
      markPromptSuppressed(true);
    }
    return {
      success: false,
      permission,
      error:
        permission === 'denied'
          ? 'Notification permission was blocked. You can re-enable it anytime in your browser or Android app settings.'
          : 'Notification prompt was dismissed.',
    };
  }

  const config = await fetchPublicPushConfig();
  if (!config.vapidPublicKey) {
    return {
      success: false,
      permission,
      error: 'Push server VAPID public key is not configured yet.',
    };
  }

  const registration = await getActiveServiceWorkerRegistration();
  let pushSub = await registration.pushManager.getSubscription();

  if (!pushSub) {
    pushSub = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(config.vapidPublicKey),
    });
  }

  let fcmToken: string | null = null;
  if (config.firebaseVapidKey || import.meta.env.VITE_FIREBASE_VAPID_KEY) {
    const { getOptionalFcmToken } = await import('./firebase');
    fcmToken = await getOptionalFcmToken(
      registration,
      config.firebaseVapidKey || undefined
    ).catch(() => null);
  }

  const subscriptionJson = pushSub.toJSON();
  const res = await fetch('/api/notifications/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      pushSubscription: subscriptionJson,
      fcmToken,
      categories: preferences.categories,
      dailyReminder: preferences.dailyReminder,
      timezone: preferences.timezone || getBrowserTimezone(),
      platform: detectPushPlatform(),
    }),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    return {
      success: false,
      permission,
      error: data.error || 'Could not save subscription on the server.',
    };
  }

  savePreferencesLocally(preferences);
  if (data.subscriptionId) {
    saveSubscriptionId(data.subscriptionId);
  }
  markPromptSuppressed(false);

  return {
    success: true,
    subscriptionId: data.subscriptionId,
    permission,
  };
}

export async function updateNotificationPreferences(
  preferences: NotificationPreferences
): Promise<{ success: boolean; error?: string }> {
  savePreferencesLocally(preferences);

  let endpoint: string | undefined;
  try {
    const registration = await navigator.serviceWorker.getRegistration('/');
    const sub = await registration?.pushManager.getSubscription();
    endpoint = sub?.endpoint;
  } catch {
    endpoint = undefined;
  }

  const subscriptionId = getSavedSubscriptionId();
  if (!endpoint && !subscriptionId) {
    return { success: true };
  }

  const res = await fetch('/api/notifications/preferences', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      subscriptionId,
      endpoint,
      categories: preferences.categories,
      dailyReminder: preferences.dailyReminder,
      timezone: preferences.timezone || getBrowserTimezone(),
    }),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    return { success: false, error: data.error || 'Failed to update server preferences.' };
  }
  return { success: true };
}

export async function unsubscribeFromPortfolioNotifications(): Promise<{
  success: boolean;
  error?: string;
}> {
  let endpoint: string | undefined;
  try {
    const registration = await navigator.serviceWorker.getRegistration('/');
    const sub = await registration?.pushManager.getSubscription();
    if (sub) {
      endpoint = sub.endpoint;
      await sub.unsubscribe();
    }
  } catch {
    // Continue server cleanup even if browser subscription already cleared
  }

  const subscriptionId = getSavedSubscriptionId();
  if (endpoint || subscriptionId) {
    await fetch('/api/notifications/unsubscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subscriptionId, endpoint }),
    }).catch(() => {});
  }

  saveSubscriptionId(null);
  return { success: true };
}

/**
 * Automatically syncs Web Push / FCM subscription in the background on devices
 * where notification permission is already granted (e.g., Play Store TWA or returning visitors)
 * without requiring the visitor to click "Enable Now" again.
 */
export async function autoSyncExistingPushSubscription(): Promise<boolean> {
  if (checkPushSupport() !== 'supported') return false;
  if (getNotificationPermissionState() !== 'granted') return false;

  try {
    const registration = await getActiveServiceWorkerRegistration();
    let pushSub = await registration.pushManager.getSubscription();
    const savedId = getSavedSubscriptionId();

    if (pushSub && savedId) {
      return true;
    }

    const config = await fetchPublicPushConfig();
    if (!config.vapidPublicKey) return false;

    if (!pushSub) {
      pushSub = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(config.vapidPublicKey),
      });
    }

    let fcmToken: string | null = null;
    if (config.firebaseVapidKey || import.meta.env.VITE_FIREBASE_VAPID_KEY) {
      const { getOptionalFcmToken } = await import('./firebase');
      fcmToken = await getOptionalFcmToken(
        registration,
        config.firebaseVapidKey || undefined
      ).catch(() => null);
    }

    const prefs = getSavedPreferences();
    const res = await fetch('/api/notifications/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        pushSubscription: pushSub.toJSON(),
        fcmToken,
        categories: prefs.categories,
        dailyReminder: prefs.dailyReminder,
        timezone: prefs.timezone || getBrowserTimezone(),
        platform: detectPushPlatform(),
      }),
    });

    if (!res.ok) return false;
    const data = await res.json().catch(() => ({}));
    if (data.subscriptionId) {
      saveSubscriptionId(data.subscriptionId);
    }
    return true;
  } catch {
    return false;
  }
}
