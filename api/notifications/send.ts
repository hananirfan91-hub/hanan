import type { VercelRequest, VercelResponse } from '@vercel/node';
import { verifyAdminAuthorizationHeader } from '../../server/auth.js';
import {
  checkRateLimit,
  dispatchPushNotification,
  sanitizeCategories,
} from '../../server/pushCore.js';
import {
  ALLOWED_NOTIFICATION_TYPES,
  type NotificationType,
} from '../../server/types.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const admin = await verifyAdminAuthorizationHeader(req.headers.authorization);
  if (!admin) {
    return res.status(401).json({ error: 'Unauthorized: verified admin sign-in required.' });
  }

  if (!checkRateLimit(`admin-send:${admin.uid}`, 40, 60 * 60 * 1000)) {
    return res.status(429).json({ error: 'Admin send rate limit reached. Try again shortly.' });
  }

  try {
    const body = (req.body && typeof req.body === 'object' ? req.body : {}) as Record<
      string,
      unknown
    >;

    const title = typeof body.title === 'string' ? body.title : '';
    const message = typeof body.body === 'string' ? body.body : '';
    const notificationType = ALLOWED_NOTIFICATION_TYPES.includes(
      body.notificationType as NotificationType
    )
      ? (body.notificationType as NotificationType)
      : 'general-announcement';

    const targetCategories = sanitizeCategories(body.targetCategories);
    const targetUrl = typeof body.targetUrl === 'string' ? body.targetUrl : undefined;
    const isTest = Boolean(body.isTest);
    const testTargetEndpoint =
      typeof body.testTargetEndpoint === 'string' ? body.testTargetEndpoint : undefined;
    const testTargetFcmToken =
      typeof body.testTargetFcmToken === 'string' ? body.testTargetFcmToken : undefined;
    const idempotencyKey =
      typeof body.idempotencyKey === 'string' ? body.idempotencyKey : undefined;

    const log = await dispatchPushNotification({
      title,
      body: message,
      notificationType,
      targetUrl,
      targetCategories,
      isTest,
      testTargetEndpoint,
      testTargetFcmToken,
      idempotencyKey,
    });

    return res.status(200).json({ ok: true, log });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Failed to send notification.';
    const status = msg.includes('Duplicate send prevented') ? 409 : 400;
    return res.status(status).json({ error: msg });
  }
}
