import 'dotenv/config';
import express, { type Request, type Response } from 'express';
import http from 'node:http';
import path from 'node:path';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import configHandler from './api/notifications/config.js';
import subscribeHandler from './api/notifications/subscribe.js';
import unsubscribeHandler from './api/notifications/unsubscribe.js';
import preferencesHandler from './api/notifications/preferences.js';
import sendHandler from './api/notifications/send.js';
import adminOverviewHandler from './api/notifications/admin-overview.js';
import feedHandler from './api/notifications/feed.js';
import dailyCronHandler from './api/cron/daily-reminder.js';
import { runDailyReminderJob } from './server/pushCore.js';

const PORT = Number(process.env.PORT || 3000);
const isProduction = process.env.NODE_ENV === 'production';

function adaptHandler(
  fn: (req: VercelRequest, res: VercelResponse) => Promise<unknown> | unknown
) {
  return async (req: Request, res: Response) => {
    await fn(req as unknown as VercelRequest, res as unknown as VercelResponse);
  };
}

async function startServer() {
  const app = express();
  const httpServer = http.createServer(app);
  app.disable('x-powered-by');
  app.use(express.json({ limit: '64kb' }));

  // Mount push notification API routes cleanly (identical to Vercel /api/* endpoints)
  app.all('/api/notifications/config', adaptHandler(configHandler));
  app.all('/api/notifications/subscribe', adaptHandler(subscribeHandler));
  app.all('/api/notifications/unsubscribe', adaptHandler(unsubscribeHandler));
  app.all('/api/notifications/preferences', adaptHandler(preferencesHandler));
  app.all('/api/notifications/send', adaptHandler(sendHandler));
  app.all('/api/notifications/admin-overview', adaptHandler(adminOverviewHandler));
  app.all('/api/notifications/feed', adaptHandler(feedHandler));
  app.all('/api/cron/daily-reminder', adaptHandler(dailyCronHandler));

  if (!isProduction) {
    const hmrDisabled =
      process.env.DISABLE_HMR === 'true' ||
      Boolean(process.env.K_SERVICE) ||
      process.env.ENABLE_HMR !== 'true';

    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: hmrDisabled ? false : { server: httpServer },
        ws: hmrDisabled ? (false as const) : undefined,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(process.cwd(), 'dist');
    app.use(
      express.static(distDir, {
        index: false,
        setHeaders: (res, filePath) => {
          if (filePath.endsWith('assetlinks.json')) {
            res.setHeader('Content-Type', 'application/json');
          } else if (filePath.endsWith('llms.txt') || filePath.endsWith('llms-full.txt')) {
            res.setHeader('Content-Type', 'text/plain; charset=utf-8');
          }
        },
      })
    );
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  // Periodic background daily check when running persistently on Node.js (every 15 min)
  if (process.env.ENABLE_LOCAL_CRON !== 'false') {
    setInterval(() => {
      void runDailyReminderJob().catch((err) => {
        console.error('Background daily reminder check error:', err);
      });
    }, 15 * 60 * 1000).unref();
  }

  httpServer.listen(PORT, '0.0.0.0', () => {
    console.log(`Hanan Irfan Portfolio server listening on http://0.0.0.0:${PORT}`);
  });
}

void startServer();
