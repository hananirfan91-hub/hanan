import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getOrCreateDevVapidKeys } from '../../server/storage.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const vapidKeys = await getOrCreateDevVapidKeys();
    const firebaseVapidKey = process.env.VITE_FIREBASE_VAPID_KEY?.trim() || null;

    res.setHeader('Cache-Control', 'no-store');
    return res.status(200).json({
      configured: Boolean(vapidKeys?.publicKey),
      vapidPublicKey: vapidKeys?.publicKey || null,
      firebaseVapidKey,
    });
  } catch (err) {
    console.error('Config endpoint error:', err);
    return res.status(500).json({ error: 'Failed to load notification configuration.' });
  }
}
