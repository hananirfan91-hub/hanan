import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  doc,
  getDocFromServer,
} from 'firebase/firestore';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  signInAnonymously,
} from 'firebase/auth';
import type { Messaging } from 'firebase/messaging';
import firebaseConfig from '../../firebase-applet-config.json';

export const ADMIN_EMAIL = 'hananirfan91@gmail.com';

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null
): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo:
        auth.currentUser?.providerData?.map((provider) => ({
          providerId: provider.providerId,
          email: provider.email,
        })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error:', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

let connectionTested = false;
export async function testConnection(): Promise<void> {
  if (connectionTested || typeof window === 'undefined') return;
  connectionTested = true;
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error('Please check your Firebase configuration: client is offline.');
    }
  }
}

export async function signInAdminWithGoogle() {
  const result = await signInWithPopup(auth, googleProvider);
  return result.user;
}

export async function signOutAdmin() {
  await signOut(auth);
}

let messagingInstancePromise: Promise<Messaging | null> | null = null;

export async function getFirebaseMessagingSafe(): Promise<Messaging | null> {
  if (typeof window === 'undefined') return null;
  if (!messagingInstancePromise) {
    messagingInstancePromise = import('firebase/messaging')
      .then(async ({ isSupported, getMessaging }) => {
        const supported = await isSupported();
        return supported ? getMessaging(app) : null;
      })
      .catch(() => null);
  }
  return messagingInstancePromise;
}

export async function getOptionalFcmToken(
  serviceWorkerRegistration: ServiceWorkerRegistration,
  firebaseVapidKey?: string
): Promise<string | null> {
  const keyToUse = firebaseVapidKey || import.meta.env.VITE_FIREBASE_VAPID_KEY;
  if (!keyToUse) return null;
  try {
    const messaging = await getFirebaseMessagingSafe();
    if (!messaging) return null;
    const { getToken } = await import('firebase/messaging');
    const token = await getToken(messaging, {
      vapidKey: keyToUse,
      serviceWorkerRegistration,
    });
    return token || null;
  } catch {
    return null;
  }
}

export async function listenToForegroundFcmMessages(
  callback: (payload: { title?: string; body?: string; url?: string; type?: string }) => void
): Promise<() => void> {
  const messaging = await getFirebaseMessagingSafe();
  if (!messaging) return () => {};
  const { onMessage } = await import('firebase/messaging');
  const unsubscribe = onMessage(messaging, (payload) => {
    callback({
      title: payload.notification?.title || (payload.data?.title as string | undefined),
      body: payload.notification?.body || (payload.data?.body as string | undefined),
      url: payload.data?.url as string | undefined,
      type: payload.data?.notificationType as string | undefined,
    });
  });
  return unsubscribe;
}

export interface ContactMessage {
  name: string;
  email: string;
  projectType: string;
  message: string;
  createdAt?: unknown;
}

export interface SubmitContactResult {
  success: boolean;
  cloudSaved: boolean;
  localSaved: boolean;
  id?: string;
  errorMessage?: string;
}

export async function submitContactMessage(data: ContactMessage): Promise<SubmitContactResult> {
  let localSaved = false;

  try {
    const existing = JSON.parse(localStorage.getItem('saved_contact_messages') || '[]');
    existing.push({ ...data, date: new Date().toISOString() });
    localStorage.setItem('saved_contact_messages', JSON.stringify(existing.slice(-20)));
    localSaved = true;
  } catch {
    localSaved = false;
  }

  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    return {
      success: false,
      cloudSaved: false,
      localSaved,
      errorMessage: 'You appear to be offline. Please reconnect or email hananirfan91@gmail.com directly.',
    };
  }

  try {
    if (!auth.currentUser) {
      await signInAnonymously(auth).catch(() => {});
    }

    const docRef = await addDoc(collection(db, 'contacts'), {
      name: data.name,
      email: data.email,
      projectType: data.projectType,
      message: data.message,
      createdAt: serverTimestamp(),
    });

    return {
      success: true,
      cloudSaved: true,
      localSaved,
      id: docRef.id,
    };
  } catch (error) {
    const message =
      error instanceof Error && error.message
        ? error.message
        : 'Unable to deliver inquiry to server right now.';
    return {
      success: false,
      cloudSaved: false,
      localSaved,
      errorMessage: message,
    };
  }
}
