import { NotificationType } from '../types/notifications';

export interface LiveNotificationItem {
  id: string;
  title: string;
  body: string;
  notificationType: NotificationType;
  targetUrl: string;
  createdAt: string;
  isDailyHighlight?: boolean;
}

const READ_IDS_KEY = 'hi_live_notif_read_v1';
const DISMISSED_TOAST_KEY = 'hi_live_toast_dismissed_v1';

function readIdSet(key: string): Set<string> {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return new Set();
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? new Set(arr.filter((v) => typeof v === 'string')) : new Set();
  } catch {
    return new Set();
  }
}

function writeIdSet(key: string, set: Set<string>): void {
  try {
    const capped = Array.from(set).slice(-60);
    window.localStorage.setItem(key, JSON.stringify(capped));
  } catch {
    // Ignore storage errors
  }
}

export function getReadNotificationIds(): Set<string> {
  if (typeof window === 'undefined') return new Set();
  return readIdSet(READ_IDS_KEY);
}

export function markNotificationRead(id: string): Set<string> {
  const set = readIdSet(READ_IDS_KEY);
  set.add(id);
  writeIdSet(READ_IDS_KEY, set);
  return set;
}

export function markAllNotificationsRead(ids: string[]): Set<string> {
  const set = readIdSet(READ_IDS_KEY);
  for (const id of ids) set.add(id);
  writeIdSet(READ_IDS_KEY, set);
  return set;
}

export function isToastDismissed(id: string): boolean {
  if (typeof window === 'undefined') return false;
  return readIdSet(DISMISSED_TOAST_KEY).has(id);
}

export function dismissToastId(id: string): void {
  if (typeof window === 'undefined') return;
  const set = readIdSet(DISMISSED_TOAST_KEY);
  set.add(id);
  writeIdSet(DISMISSED_TOAST_KEY, set);
}

export async function fetchLiveNotificationFeed(): Promise<LiveNotificationItem[]> {
  try {
    const res = await fetch('/api/notifications/feed', {
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) return [];
    const data = (await res.json()) as { items?: LiveNotificationItem[] };
    return Array.isArray(data.items) ? data.items : [];
  } catch {
    return [];
  }
}
