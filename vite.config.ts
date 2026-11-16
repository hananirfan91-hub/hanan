import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
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
          name: 'Hanan Irfan Portfolio',
          short_name: 'Hanan Irfan',
          description:
            'Portfolio of Hanan Irfan — Multidisciplinary Developer, SEO Specialist & Entrepreneur from Rahim Yar Khan, Pakistan.',
          theme_color: '#080D1B',
          background_color: '#080D1B',
          display: 'standalone',
          start_url: '/',
          scope: '/',
          orientation: 'portrait-primary',
          categories: ['portfolio', 'technology', 'business'],
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
          navigateFallbackDenylist: [/^\/\.well-known\//, /^\/sitemap\.xml$/, /^\/robots\.txt$/],
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
          type: 'module',
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
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
