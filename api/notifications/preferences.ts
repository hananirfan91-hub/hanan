import type { VercelRequest, VercelResponse } from '@vercel/node';
import {
  checkRateLimit,
  handlePublicPreferencesUpdate,
} from '../../server/pushCore.js';
import { findSubscriberByIdOrEndpoint } from '../../server/storage.js';

function getClientIp(req: VercelRequest): string {
  const fwd = req.headers['x-forwarded-for'];
  if (typeof fwd === 'string') return fwd.split(',')[0].trim();
  if (Array.isArray(fwd) && fwd[0]) return fwd[0].trim();
  return req.socket?.remoteAddress || 'unknown';
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST' && req.method !== 'PATCH') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const ip = getClientIp(req);
  if (!checkRateLimit(`prefs:${ip}`, 30, 10 * 60 * 1000)) {
    return res.status(429).json({ error: 'Too many preference updates.' });
  }

  try {
    const body = (req.body && typeof req.body === 'object' ? req.body : {}) as Record<
      string,
      unknown
    >;
    const result = await handlePublicPreferencesUpdate(body, findSubscriberByIdOrEndpoint);
    return res.status(200).json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unable to update preferences.';
    return res.status(400).json({ error: message });
  }
}
