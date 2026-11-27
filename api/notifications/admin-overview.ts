import type { VercelRequest, VercelResponse } from '@vercel/node';
import { verifyAdminAuthorizationHeader } from '../../server/auth.js';
import {
  buildAdminOverview,
  normalizeSchedulerUpdate,
} from '../../server/pushCore.js';
import { getSchedulerSettings, saveSchedulerSettings } from '../../server/storage.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const admin = await verifyAdminAuthorizationHeader(req.headers.authorization);
  if (!admin) {
    return res.status(401).json({ error: 'Unauthorized: verified admin sign-in required.' });
  }

  if (req.method === 'GET') {
    try {
      res.setHeader('Cache-Control', 'no-store');
      const overview = await buildAdminOverview();
      return res.status(200).json(overview);
    } catch (err) {
      console.error('Admin overview error:', err);
      return res.status(500).json({ error: 'Failed to load admin overview.' });
    }
  }

  if (req.method === 'POST' || req.method === 'PATCH') {
    try {
      const body = (req.body && typeof req.body === 'object' ? req.body : {}) as Record<
        string,
        unknown
      >;
      const current = await getSchedulerSettings();
      const patch = normalizeSchedulerUpdate(body, current);
      const updated = await saveSchedulerSettings(patch);
      return res.status(200).json({ ok: true, scheduler: updated });
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to save scheduler settings.';
      return res.status(400).json({ error: msg });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
