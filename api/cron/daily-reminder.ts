import type { VercelRequest, VercelResponse } from '@vercel/node';
import {
  verifyAdminAuthorizationHeader,
  verifyCronSecretHeader,
} from '../../server/auth.js';
import { runDailyReminderJob } from '../../server/pushCore.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const isCronAuthorized = verifyCronSecretHeader(req.headers.authorization);
  const admin = isCronAuthorized
    ? null
    : await verifyAdminAuthorizationHeader(req.headers.authorization);

  if (!isCronAuthorized && !admin) {
    return res.status(401).json({
      error: 'Unauthorized: requires valid CRON_SECRET or verified admin Firebase ID token.',
    });
  }

  try {
    const body = (req.body && typeof req.body === 'object' ? req.body : {}) as Record<
      string,
      unknown
    >;
    // Only allow forced immediate test run when explicitly triggered by logged-in Admin
    const force = Boolean(admin && body.force === true);
    const result = await runDailyReminderJob({ force });
    return res.status(200).json(result);
  } catch (err) {
    console.error('Daily reminder cron error:', err);
    const message = err instanceof Error ? err.message : 'Daily reminder job failed.';
    return res.status(500).json({ error: message });
  }
}
