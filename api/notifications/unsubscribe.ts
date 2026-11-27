import type { VercelRequest, VercelResponse } from '@vercel/node';
import { checkRateLimit } from '../../server/pushCore.js';
import { removeSubscriber } from '../../server/storage.js';

function getClientIp(req: VercelRequest): string {
  const fwd = req.headers['x-forwarded-for'];
  if (typeof fwd === 'string') return fwd.split(',')[0].trim();
  if (Array.isArray(fwd) && fwd[0]) return fwd[0].trim();
  return req.socket?.remoteAddress || 'unknown';
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const ip = getClientIp(req);
  if (!checkRateLimit(`unsub:${ip}`, 25, 10 * 60 * 1000)) {
    return res.status(429).json({ error: 'Too many requests.' });
  }

  try {
    const body = (req.body && typeof req.body === 'object' ? req.body : {}) as Record<
      string,
      unknown
    >;
    const subscriptionId =
      typeof body.subscriptionId === 'string' ? body.subscriptionId.slice(0, 128) : undefined;
    const endpoint =
      typeof body.endpoint === 'string' ? body.endpoint.slice(0, 1024) : undefined;

    if (!subscriptionId && !endpoint) {
      return res.status(400).json({ error: 'subscriptionId or endpoint is required.' });
    }

    const removed = await removeSubscriber(subscriptionId, endpoint);
    return res.status(200).json({ removed });
  } catch (err) {
    console.error('Unsubscribe error:', err);
    return res.status(500).json({ error: 'Failed to remove subscription.' });
  }
}
