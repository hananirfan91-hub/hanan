/* eslint-disable no-restricted-globals */

const TYPE_DEFAULT_URLS = {
  'daily-reminder': '/',
  'new-project': '/projects',
  'project-update': '/projects',
  'new-achievement': '/about#achievements',
  'new-skill': '/skills',
  'new-certificate': '/about#achievements',
  'experience-update': '/experience',
  'general-announcement': '/',
};

function resolveSafeTargetUrl(rawUrl, notificationType) {
  const fallbackPath = TYPE_DEFAULT_URLS[notificationType] || '/';
  const origin = self.location.origin;

  if (!rawUrl || typeof rawUrl !== 'string') {
    return new URL(fallbackPath, origin).href;
  }

  const trimmed = rawUrl.trim();
  if (trimmed.startsWith('/')) {
    return new URL(trimmed, origin).href;
  }

  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol === 'https:' || parsed.protocol === 'http:') {
      return parsed.href;
    }
  } catch {
    // Fallback to safe relative route
  }

  return new URL(fallbackPath, origin).href;
}

self.addEventListener('push', (event) => {
  if (!event.data) return;

  let payload = {};
  try {
    payload = event.data.json();
  } catch {
    payload = {
      title: 'Hanan Irfan Portfolio',
      body: event.data.text(),
    };
  }

  const fcmNotification = payload.notification || {};
  const data = payload.data || {};
  const notificationType =
    payload.notificationType || data.notificationType || 'general-announcement';
  const title = payload.title || fcmNotification.title || 'Hanan Irfan Portfolio';
  const body =
    payload.body ||
    fcmNotification.body ||
    'New update available on Hanan Irfan Portfolio.';
  const targetUrl = resolveSafeTargetUrl(
    payload.url || data.url || fcmNotification.click_action,
    notificationType
  );
  const tag =
    payload.tag ||
    data.idempotencyKey ||
    `hi-${notificationType}-${new Date().toISOString().slice(0, 10)}`;

  const options = {
    body,
    icon: payload.icon || '/pwa-192x192.png',
    badge: payload.badge || '/favicon-32x32.png',
    image: payload.image || undefined,
    tag,
    renotify: false,
    requireInteraction: false,
    data: {
      url: targetUrl,
      notificationType,
      receivedAt: Date.now(),
    },
  };

  event.waitUntil(
    (async () => {
      const windowClients = await self.clients.matchAll({
        type: 'window',
        includeUncontrolled: true,
      });

      for (const client of windowClients) {
        if (client.visibilityState === 'visible') {
          client.postMessage({
            type: 'PORTFOLIO_PUSH_RECEIVED',
            payload: {
              title,
              body,
              url: targetUrl,
              notificationType,
            },
          });
        }
      }

      await self.registration.showNotification(title, options);
    })()
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const data = event.notification.data || {};
  const targetHref = resolveSafeTargetUrl(data.url, data.notificationType);
  const targetParsed = new URL(targetHref);
  const isSameOrigin = targetParsed.origin === self.location.origin;

  event.waitUntil(
    (async () => {
      if (isSameOrigin) {
        const allClients = await self.clients.matchAll({
          type: 'window',
          includeUncontrolled: true,
        });

        // Prefer already-open portfolio / TWA window to prevent duplicate tabs
        const existingClient =
          allClients.find((c) => c.focused) ||
          allClients.find((c) => c.url.startsWith(self.location.origin));

        if (existingClient) {
          if ('focus' in existingClient) {
            await existingClient.focus();
          }
          existingClient.postMessage({
            type: 'NOTIFICATION_NAVIGATE',
            url: `${targetParsed.pathname}${targetParsed.search}${targetParsed.hash}`,
            notificationType: data.notificationType || 'general-announcement',
          });
          return;
        }
      }

      if (self.clients.openWindow) {
        await self.clients.openWindow(targetHref);
      }
    })()
  );
});

self.addEventListener('pushsubscriptionchange', (event) => {
  event.waitUntil(
    (async () => {
      try {
        const configRes = await fetch('/api/notifications/config');
        if (!configRes.ok) return;
        const { vapidPublicKey } = await configRes.json();
        if (!vapidPublicKey) return;

        const padding = '='.repeat((4 - (vapidPublicKey.length % 4)) % 4);
        const base64 = (vapidPublicKey + padding).replace(/-/g, '+').replace(/_/g, '/');
        const rawData = atob(base64);
        const keyBytes = new Uint8Array(rawData.length);
        for (let i = 0; i < rawData.length; i++) {
          keyBytes[i] = rawData.charCodeAt(i);
        }

        const subscription =
          event.newSubscription ||
          (await self.registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: keyBytes,
          }));

        await fetch('/api/notifications/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            pushSubscription: subscription.toJSON(),
            platform: 'sw-refresh',
          }),
        });
      } catch {
        // Silent recovery failure; client UI will re-sync on next visit
      }
    })()
  );
});
