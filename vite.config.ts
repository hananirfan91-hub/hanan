import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, type Plugin } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

function disableBrokenHmrWebSocketPlugin(hmrDisabled: boolean): Plugin {
  return {
    name: 'disable-broken-hmr-websocket',
    apply: 'serve',
    enforce: 'post',
    transform(code, id) {
      if (!hmrDisabled) return null;
      const normalized = id.replace(/\\/g, '/');
      if (
        normalized.endsWith('/vite/dist/client/client.mjs') ||
        normalized.includes('@vite/client')
      ) {
        if (code.includes('transport.connect(createHMRHandler(handleMessage))')) {
          return {
            code: code.replace(
              'transport.connect(createHMRHandler(handleMessage));',
              '/* HMR WebSocket intentionally disabled in preview runtime */'
            ),
            map: null,
          };
        }
      }
      return null;
    },
  };
}

export default defineConfig(() => {
  const hmrDisabled =
    process.env.DISABLE_HMR === 'true' ||
    Boolean(process.env.K_SERVICE) ||
    process.env.ENABLE_HMR !== 'true';

  return {
    plugins: [
      react(),
      tailwindcss(),
      disableBrokenHmrWebSocketPlugin(hmrDisabled),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: [
          'favicon.ico',
          'favicon-32x32.png',
          'apple-touch-icon.png',
          'pwa-192x192.png',
          'pwa-512x512.png',
          'pwa-maskable-512x512.png',
        ],
        manifest: {
          id: '/',
          lang: 'en',
          dir: 'ltr',
          name: 'Hanan Irfan Portfolio — Developer, AI & SEO Specialist',
          short_name: 'Hanan Irfan',
          description:
            'Official portfolio & Android app of Hanan Irfan — Multidisciplinary Developer, AI Developer, Full-Stack Engineer & SEO/AEO/GEO Specialist from Rahim Yar Khan, Pakistan.',
          theme_color: '#080D1B',
          background_color: '#080D1B',
          display: 'standalone',
          start_url: '/',
          scope: '/',
          orientation: 'portrait-primary',
          categories: ['portfolio', 'developer tools', 'business', 'education'],
          prefer_related_applications: false,
          related_applications: [
            {
              platform: 'play',
              url: 'https://play.google.com/store/apps/details?id=com.hananirfan.app',
              id: 'com.hananirfan.app',
            },
          ],
          shortcuts: [
            {
              name: 'Projects Portfolio',
              short_name: 'Projects',
              url: '/projects',
              description: 'Explore deployed web apps, AI platforms, and SaaS builds',
            },
            {
              name: 'Skills & Expertise',
              short_name: 'Skills',
              url: '/skills',
              description: 'AI Development, Full-Stack, Technical SEO, AEO & GEO stack',
            },
            {
              name: 'SEO, AEO & GEO Services',
              short_name: 'SEO / AEO',
              url: '/seo-expert',
              description: 'Technical SEO, Answer Engine Optimization & GEO consulting',
            },
            {
              name: 'Contact Hanan Irfan',
              short_name: 'Contact',
              url: '/contact',
              description: 'Direct email and verified social profiles',
            },
          ],
          icons: [
            {
              src: '/pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: '/pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: '/pwa-maskable-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable',
            },
          ],
        },
        workbox: {
          globPatterns: [
            '**/*.{js,css,html,ico,svg,woff2}',
            'pwa-*.png',
            'apple-touch-icon.png',
            'favicon-32x32.png',
            'avatar.webp',
          ],
          globIgnores: [
            '**/assets/aistudio/**',
            '**/.well-known/**',
            'favicon.png',
            'deans-honor-certificate-2026.png',
            'images/certificates/deans-honor-certificate-2026.png',
            'certificate.jpg',
            'deducationist-ambassador.jpg',
            'ambassador.jpg',
          ],
          navigateFallback: '/index.html',
          navigateFallbackDenylist: [
            /^\/api\//,
            /^\/\.well-known\//,
            /^\/sitemap\.xml$/,
            /^\/robots\.txt$/,
            /^\/llms(-full)?\.txt$/,
          ],
          maximumFileSizeToCacheInBytes: 3 * 1024 * 1024,
          runtimeCaching: [
            {
              urlPattern: /\.(?:webp|png|jpg|jpeg|svg|gif)$/i,
              handler: 'StaleWhileRevalidate',
              options: {
                cacheName: 'portfolio-images-cache',
                expiration: {
                  maxEntries: 60,
                  maxAgeSeconds: 60 * 60 * 24 * 30,
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
            {
              urlPattern: /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'google-fonts-cache',
                expiration: {
                  maxEntries: 15,
                  maxAgeSeconds: 60 * 60 * 24 * 365,
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
          ],
        },
        devOptions: {
          enabled: true,
          type: 'classic',
        },
      }),
    ],
    build: {
      target: ['es2020', 'chrome88'],
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor-react': ['react', 'react-dom'],
            'vendor-motion': ['motion'],
            'vendor-icons': ['lucide-react'],
            'vendor-charts': ['recharts'],
            'vendor-scroll': ['lenis', 'gsap'],
          },
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: hmrDisabled ? false : undefined,
      ws: hmrDisabled ? (false as const) : undefined,
      watch: hmrDisabled ? null : {},
    },
  };
});
