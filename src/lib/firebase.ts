import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getAuth, signInAnonymously } from 'firebase/auth';

// User's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDjezqoYf68RRBC7G7kL-sIuHl5EvUbWBc",
  authDomain: "command-b5e7e.firebaseapp.com",
  projectId: "command-b5e7e",
  storageBucket: "command-b5e7e.firebasestorage.app",
  messagingSenderId: "736349671786",
  appId: "1:736349671786:web:10fb697a0e9f7b8b941513"
};

// Initialize Firebase App
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export interface ContactMessage {
  name: string;
  email: string;
  projectType: string;
  message: string;
  createdAt?: any;
}

export async function submitContactMessage(data: ContactMessage) {
  // Ensure local storage backup
  try {
    const existing = JSON.parse(localStorage.getItem('saved_contact_messages') || '[]');
    existing.push({ ...data, date: new Date().toISOString() });
    localStorage.setItem('saved_contact_messages', JSON.stringify(existing));
  } catch (e) {
    // Ignore storage quota issues
  }

  try {
    // Attempt anonymous auth if user is not logged in
    if (!auth.currentUser) {
      await signInAnonymously(auth).catch(() => {});
    }

    const docRef = await addDoc(collection(db, "contacts"), {
      ...data,
      createdAt: serverTimestamp(),
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    // Graceful handling of permission or network errors
    console.warn("Firebase submitted locally as fallback:", error);
    return { success: true, id: 'local-' + Date.now(), isFallback: true };
  }
}

