import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { getFirestore, type Firestore } from 'firebase-admin/firestore';
import { getFirebaseAdminApp, getFirebaseAppletConfig } from './auth.js';
import type {
  LocalPushStoreSchema,
  ServerNotificationLog,
  ServerSchedulerSettings,
  StoredSubscriber,
} from './types.js';

const DEFAULT_ROTATING_MESSAGES = [
  "Explore Hanan Irfan's portfolio today — new full-stack & AI projects await.",
  'Discover my latest projects, technical SEO work, and AI engineering builds.',
  "See what's new in Hanan Irfan's portfolio — live demos and verified credentials.",
  'Stay connected with my latest projects, skills, and achievements at KFUEIT.',
];

const DEFAULT_SCHEDULER: ServerSchedulerSettings = {
  enabled: true,
  sendHour: 9,
  sendMinute: 0,
  timezone: 'Asia/Karachi',
  rotatingMessages: DEFAULT_ROTATING_MESSAGES,
  lastRunDateKey: '',
  dailyRotationIndex: 0,
  updatedAt: new Date().toISOString(),
};

const DATA_DIR = path.resolve(process.cwd(), '.data');
const STORE_PATH = path.join(DATA_DIR, 'push-store.json');

let writeLock: Promise<void> = Promise.resolve();

function withStoreLock<T>(fn: () => Promise<T>): Promise<T> {
  const next = writeLock.then(fn, fn);
  writeLock = next.then(
    () => undefined,
    () => undefined
  );
  return next;
}

function readLocalStore(): LocalPushStoreSchema {
  try {
    if (!fs.existsSync(STORE_PATH)) {
      return {
        subscribers: {},
        scheduler: { ...DEFAULT_SCHEDULER },
        logs: [],
        idempotencyKeys: {},
      };
    }
    const raw = fs.readFileSync(STORE_PATH, 'utf8');
    const parsed = JSON.parse(raw) as Partial<LocalPushStoreSchema>;
    return {
      vapidKeys: parsed.vapidKeys,
      subscribers: parsed.subscribers || {},
      scheduler: { ...DEFAULT_SCHEDULER, ...(parsed.scheduler || {}) },
      logs: Array.isArray(parsed.logs) ? parsed.logs : [],
      idempotencyKeys: parsed.idempotencyKeys || {},
    };
  } catch {
    return {
      subscribers: {},
      scheduler: { ...DEFAULT_SCHEDULER },
      logs: [],
      idempotencyKeys: {},
    };
  }
}

function writeLocalStore(store: LocalPushStoreSchema): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true, mode: 0o700 });
  }
  const tmpPath = `${STORE_PATH}.tmp`;
  fs.writeFileSync(tmpPath, JSON.stringify(store, null, 2), { mode: 0o600 });
  fs.renameSync(tmpPath, STORE_PATH);
}

function getAdminFirestore(): Firestore | null {
  const { app, hasServiceAccount } = getFirebaseAdminApp();
  if (!hasServiceAccount) return null;
  const config = getFirebaseAppletConfig();
  if (config.firestoreDatabaseId && config.firestoreDatabaseId !== '(default)') {
    return getFirestore(app, config.firestoreDatabaseId);
  }
  return getFirestore(app);
}

export function getStorageMode(): 'firestore-admin' | 'local-file' {
  return getAdminFirestore() ? 'firestore-admin' : 'local-file';
}

export function makeSubscriptionId(endpointOrToken: string): string {
  return crypto.createHash('sha256').update(endpointOrToken).digest('hex').slice(0, 40);
}

export async function getOrCreateDevVapidKeys(): Promise<{
  publicKey: string;
  privateKey: string;
} | null> {
  const envPublic = process.env.VAPID_PUBLIC_KEY?.trim();
  const envPrivate = process.env.VAPID_PRIVATE_KEY?.trim();
  if (envPublic && envPrivate) {
    return { publicKey: envPublic, privateKey: envPrivate };
  }

  // On read-only serverless environments without env vars, cannot persist generated keys safely
  if (process.env.VERCEL === '1') {
    return null;
  }

  return withStoreLock(async () => {
    const store = readLocalStore();
    if (store.vapidKeys?.publicKey && store.vapidKeys?.privateKey) {
      return store.vapidKeys;
    }
    const webpushMod = (await import('web-push')) as unknown as {
      default?: { generateVAPIDKeys: () => { publicKey: string; privateKey: string } };
      generateVAPIDKeys?: () => { publicKey: string; privateKey: string };
    };
    const webpushApi = webpushMod.default?.generateVAPIDKeys ? webpushMod.default : webpushMod;
    if (typeof webpushApi.generateVAPIDKeys !== 'function') {
      throw new Error('web-push generateVAPIDKeys is unavailable.');
    }
    const generated = webpushApi.generateVAPIDKeys();
    store.vapidKeys = generated;
    writeLocalStore(store);
    return generated;
  });
}

export async function upsertSubscriber(subscriber: StoredSubscriber): Promise<void> {
  const firestore = getAdminFirestore();
  if (firestore) {
    await firestore
      .collection('subscribers')
      .doc(subscriber.subscriptionId)
      .set(subscriber, { merge: true });
    return;
  }

  await withStoreLock(async () => {
    const store = readLocalStore();
    const existing = store.subscribers[subscriber.subscriptionId];
    store.subscribers[subscriber.subscriptionId] = {
      ...existing,
      ...subscriber,
      createdAt: existing?.createdAt || subscriber.createdAt,
      lastDailySentDateKey:
        subscriber.lastDailySentDateKey || existing?.lastDailySentDateKey || '',
    };
    writeLocalStore(store);
  });
}

export async function findSubscriberByIdOrEndpoint(
  subscriptionId?: string,
  endpoint?: string
): Promise<StoredSubscriber | null> {
  const targetId =
    subscriptionId || (endpoint ? makeSubscriptionId(endpoint) : undefined);
  if (!targetId) return null;

  const firestore = getAdminFirestore();
  if (firestore) {
    const snap = await firestore.collection('subscribers').doc(targetId).get();
    return snap.exists ? (snap.data() as StoredSubscriber) : null;
  }

  const store = readLocalStore();
  return store.subscribers[targetId] || null;
}

export async function removeSubscriber(
  subscriptionId?: string,
  endpoint?: string
): Promise<boolean> {
  const targetId =
    subscriptionId || (endpoint ? makeSubscriptionId(endpoint) : undefined);
  if (!targetId) return false;

  const firestore = getAdminFirestore();
  if (firestore) {
    await firestore.collection('subscribers').doc(targetId).delete();
    return true;
  }

  return withStoreLock(async () => {
    const store = readLocalStore();
    if (!store.subscribers[targetId]) return false;
    delete store.subscribers[targetId];
    writeLocalStore(store);
    return true;
  });
}

export async function listAllSubscribers(): Promise<StoredSubscriber[]> {
  const firestore = getAdminFirestore();
  if (firestore) {
    const snap = await firestore.collection('subscribers').get();
    return snap.docs.map((d) => d.data() as StoredSubscriber);
  }
  const store = readLocalStore();
  return Object.values(store.subscribers);
}

export async function deleteSubscribersBulk(subscriptionIds: string[]): Promise<void> {
  if (subscriptionIds.length === 0) return;

  const firestore = getAdminFirestore();
  if (firestore) {
    const batch = firestore.batch();
    for (const id of subscriptionIds) {
      batch.delete(firestore.collection('subscribers').doc(id));
    }
    await batch.commit();
    return;
  }

  await withStoreLock(async () => {
    const store = readLocalStore();
    for (const id of subscriptionIds) {
      delete store.subscribers[id];
    }
    writeLocalStore(store);
  });
}

export async function markSubscribersDailySent(
  subscriptionIds: string[],
  dateKey: string
): Promise<void> {
  if (subscriptionIds.length === 0) return;

  const firestore = getAdminFirestore();
  if (firestore) {
    const batch = firestore.batch();
    const now = new Date().toISOString();
    for (const id of subscriptionIds) {
      batch.update(firestore.collection('subscribers').doc(id), {
        lastDailySentDateKey: dateKey,
        updatedAt: now,
      });
    }
    await batch.commit();
    return;
  }

  await withStoreLock(async () => {
    const store = readLocalStore();
    const now = new Date().toISOString();
    for (const id of subscriptionIds) {
      if (store.subscribers[id]) {
        store.subscribers[id].lastDailySentDateKey = dateKey;
        store.subscribers[id].updatedAt = now;
      }
    }
    writeLocalStore(store);
  });
}

export async function getSchedulerSettings(): Promise<ServerSchedulerSettings> {
  const firestore = getAdminFirestore();
  if (firestore) {
    const snap = await firestore.collection('admin_settings').doc('scheduler').get();
    if (!snap.exists) return { ...DEFAULT_SCHEDULER };
    return { ...DEFAULT_SCHEDULER, ...(snap.data() as Partial<ServerSchedulerSettings>) };
  }
  const store = readLocalStore();
  return { ...DEFAULT_SCHEDULER, ...store.scheduler };
}

export async function saveSchedulerSettings(
  next: Partial<ServerSchedulerSettings>
): Promise<ServerSchedulerSettings> {
  const current = await getSchedulerSettings();
  const merged: ServerSchedulerSettings = {
    ...current,
    ...next,
    updatedAt: new Date().toISOString(),
  };

  const firestore = getAdminFirestore();
  if (firestore) {
    await firestore
      .collection('admin_settings')
      .doc('scheduler')
      .set(merged, { merge: true });
    return merged;
  }

  await withStoreLock(async () => {
    const store = readLocalStore();
    store.scheduler = merged;
    writeLocalStore(store);
  });
  return merged;
}

export async function appendNotificationLog(
  log: ServerNotificationLog
): Promise<void> {
  const firestore = getAdminFirestore();
  if (firestore) {
    await firestore.collection('notification_logs').doc(log.id).set(log);
    return;
  }

  await withStoreLock(async () => {
    const store = readLocalStore();
    store.logs.unshift(log);
    store.logs = store.logs.slice(0, 100);
    writeLocalStore(store);
  });
}

export async function listNotificationLogs(limitCount = 40): Promise<ServerNotificationLog[]> {
  const firestore = getAdminFirestore();
  if (firestore) {
    const snap = await firestore
      .collection('notification_logs')
      .orderBy('createdAt', 'desc')
      .limit(limitCount)
      .get();
    return snap.docs.map((d) => d.data() as ServerNotificationLog);
  }
  const store = readLocalStore();
  return store.logs.slice(0, limitCount);
}

export async function checkAndRecordIdempotencyKey(
  key: string,
  ttlMs = 120_000
): Promise<boolean> {
  if (!key) return true;
  const now = Date.now();
  const safeKey = key.replace(/[^a-zA-Z0-9_:-]/g, '_').slice(0, 128);

  const firestore = getAdminFirestore();
  if (firestore) {
    const ref = firestore.collection('notification_idempotency').doc(safeKey);
    const result = await firestore.runTransaction(async (tx) => {
      const snap = await tx.get(ref);
      if (snap.exists) {
        const expiresAt = (snap.data()?.expiresAt as number) || 0;
        if (expiresAt > now) {
          return false;
        }
      }
      tx.set(ref, { createdAt: now, expiresAt: now + ttlMs });
      return true;
    });
    return result;
  }

  return withStoreLock(async () => {
    const store = readLocalStore();
    for (const [k, exp] of Object.entries(store.idempotencyKeys)) {
      if (exp <= now) delete store.idempotencyKeys[k];
    }
    const existingExp = store.idempotencyKeys[safeKey];
    if (existingExp && existingExp > now) {
      return false;
    }
    store.idempotencyKeys[safeKey] = now + ttlMs;
    writeLocalStore(store);
    return true;
  });
}
