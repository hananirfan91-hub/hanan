import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { initializeApp, getApps, getApp, cert, type App } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

const DEFAULT_ADMIN_EMAILS = ['hananirfan91@gmail.com'];

interface FirebaseAppletConfig {
  projectId: string;
  firestoreDatabaseId?: string;
}

let cachedConfig: FirebaseAppletConfig | null = null;

export function getFirebaseAppletConfig(): FirebaseAppletConfig {
  if (cachedConfig) return cachedConfig;
  const configPath = path.resolve(process.cwd(), 'firebase-applet-config.json');
  if (fs.existsSync(configPath)) {
    const raw = JSON.parse(fs.readFileSync(configPath, 'utf8')) as FirebaseAppletConfig;
    cachedConfig = raw;
    return raw;
  }
  cachedConfig = {
    projectId: process.env.FIREBASE_PROJECT_ID || 'galvanic-helper-q01dl',
    firestoreDatabaseId: process.env.FIREBASE_DATABASE_ID,
  };
  return cachedConfig;
}

export function getServiceAccountCredential(): Record<string, string> | null {
  const rawJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (rawJson && rawJson.trim()) {
    try {
      return JSON.parse(rawJson) as Record<string, string>;
    } catch {
      console.error('Invalid FIREBASE_SERVICE_ACCOUNT_JSON format.');
    }
  }

  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;
  const projectId = process.env.FIREBASE_PROJECT_ID || getFirebaseAppletConfig().projectId;
  if (clientEmail && privateKey && projectId) {
    return {
      project_id: projectId,
      client_email: clientEmail,
      private_key: privateKey.replace(/\\n/g, '\n'),
    };
  }
  return null;
}

export function getFirebaseAdminApp(): { app: App; hasServiceAccount: boolean } {
  const config = getFirebaseAppletConfig();
  const serviceAccount = getServiceAccountCredential();

  if (getApps().length > 0) {
    return { app: getApp(), hasServiceAccount: Boolean(serviceAccount) };
  }

  if (serviceAccount) {
    const app = initializeApp({
      credential: cert(serviceAccount),
      projectId: serviceAccount.project_id || config.projectId,
    });
    return { app, hasServiceAccount: true };
  }

  // Project-ID-only init works for verifyIdToken() without IAM on any Firebase project
  const app = initializeApp({
    projectId: config.projectId,
  });
  return { app, hasServiceAccount: false };
}

function getAllowedAdminEmails(): Set<string> {
  const envList = (process.env.ADMIN_EMAILS || '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  return new Set([...DEFAULT_ADMIN_EMAILS, ...envList]);
}

export interface VerifiedAdmin {
  uid: string;
  email: string;
}

export async function verifyAdminAuthorizationHeader(
  authHeader: string | undefined
): Promise<VerifiedAdmin | null> {
  if (!authHeader || typeof authHeader !== 'string') return null;
  const match = authHeader.match(/^Bearer\s+(.+)$/i);
  if (!match) return null;

  const token = match[1].trim();
  if (!token || token.length > 8192) return null;

  try {
    const { app } = getFirebaseAdminApp();
    const decoded = await getAuth(app).verifyIdToken(token);
    const email = (decoded.email || '').toLowerCase();
    if (!email || decoded.email_verified !== true) {
      return null;
    }
    const allowed = getAllowedAdminEmails();
    if (!allowed.has(email)) {
      return null;
    }
    return { uid: decoded.uid, email };
  } catch {
    return null;
  }
}

export function verifyCronSecretHeader(authHeader: string | undefined): boolean {
  const expected = process.env.CRON_SECRET;
  if (!expected || !authHeader) return false;
  const match = authHeader.match(/^Bearer\s+(.+)$/i);
  if (!match) return false;

  const providedBuf = Buffer.from(match[1].trim(), 'utf8');
  const expectedBuf = Buffer.from(expected.trim(), 'utf8');
  if (providedBuf.length !== expectedBuf.length) return false;
  return crypto.timingSafeEqual(providedBuf, expectedBuf);
}
