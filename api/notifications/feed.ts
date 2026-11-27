import type { VercelRequest, VercelResponse } from '@vercel/node';
import { buildPublicNotificationFeed, checkRateLimit } from '../../server/pushCore.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const clientIp =
    (req.headers['x-forwarded-for'] as string | undefined)?.split(',')[0]?.trim() ||
    req.socket?.remoteAddress ||
    'unknown';

  if (!checkRateLimit(`feed:${clientIp}`, 60, 60_000)) {
    return res.status(429).json({ error: 'Too many requests.' });
  }

  try {
    const feed = await buildPublicNotificationFeed(10);
    res.setHeader('Cache-Control', 'public, max-age=60, stale-while-revalidate=120');
    return res.status(200).json(feed);
  } catch (err) {
    console.error('Public notification feed error:', err);
    return res.status(500).json({ error: 'Unable to load notifications feed.' });
  }
}
