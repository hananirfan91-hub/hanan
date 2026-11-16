import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getAuth, signInAnonymously } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDjezqoYf68RRBC7G7kL-sIuHl5EvUbWBc',
  authDomain: 'command-b5e7e.firebaseapp.com',
  projectId: 'command-b5e7e',
  storageBucket: 'command-b5e7e.firebasestorage.app',
  messagingSenderId: '736349671786',
  appId: '1:736349671786:web:10fb697a0e9f7b8b941513',
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

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
