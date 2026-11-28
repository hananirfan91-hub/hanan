import 'dotenv/config';
import express from 'express';
import http from 'node:http';
import path from 'node:path';

const PORT = Number(process.env.PORT || 3000);
const isProduction = process.env.NODE_ENV === 'production';

async function startServer() {
  const app = express();
  const httpServer = http.createServer(app);
  app.disable('x-powered-by');

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

  httpServer.listen(PORT, '0.0.0.0', () => {
    console.log(`Hanan Irfan Portfolio server listening on http://0.0.0.0:${PORT}`);
  });
}

void startServer();
