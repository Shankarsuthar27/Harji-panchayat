import path from 'path';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

import runtimeErrorOverlay from '@replit/vite-plugin-runtime-error-modal';

const rawPort = process.env.PORT || '3000';
const port = Number(rawPort);
const basePath = process.env.BASE_PATH || '/';

function apiMockPlugin() {
  const sampleWorks = [
    {
      id: 1,
      title: 'Drinking Water Pipeline & Tank Upgradation',
      category: 'Water Supply',
      location: 'Harji Main Bazaar & Ward 3',
      description: 'Installation of underground potable water pipeline and solar-powered pump set for uninterrupted clean drinking water supply.',
      sanctionedAmount: 450000,
      progress: 65,
      status: 'ongoing',
      startDate: '2025-11-15',
      targetDate: '2026-04-30',
      updatedAt: new Date().toISOString(),
    },
    {
      id: 2,
      title: 'Cement Concrete (CC) Road & Covered Drainage',
      category: 'Roads & Infrastructure',
      location: 'Station Road to Bus Stand',
      description: 'Construction of 1.2 km all-weather cement concrete road with covered stormwater and sewage drainage.',
      sanctionedAmount: 820000,
      progress: 100,
      status: 'completed',
      startDate: '2025-05-10',
      targetDate: '2025-10-25',
      updatedAt: new Date().toISOString(),
    },
    {
      id: 3,
      title: 'Solar Street Lighting Scheme',
      category: 'Electrification',
      location: 'Ward 1 to Ward 7',
      description: 'Installation of 50 energy-efficient LED solar street lights along key village pathways and community junctions.',
      sanctionedAmount: 350000,
      progress: 100,
      status: 'completed',
      startDate: '2025-08-01',
      targetDate: '2025-11-20',
      updatedAt: new Date().toISOString(),
    },
    {
      id: 4,
      title: 'Primary Health Sub-Centre Sanitation & Repairs',
      category: 'Health & Sanitation',
      location: 'PHC Compound, Harji',
      description: 'Renovation of public health sub-centre facilities, clean water connection, patient waiting shed, and boundary wall.',
      sanctionedAmount: 280000,
      progress: 80,
      status: 'ongoing',
      startDate: '2025-12-01',
      targetDate: '2026-03-31',
      updatedAt: new Date().toISOString(),
    },
    {
      id: 5,
      title: 'Harji Village Pond Desilting & Rainwater Harvesting',
      category: 'Water Conservation',
      location: 'Harji Village Talab',
      description: 'Deepening and desilting of the village pond with embankment stone pitching to enhance groundwater recharge.',
      sanctionedAmount: 510000,
      progress: 100,
      status: 'completed',
      startDate: '2025-04-01',
      targetDate: '2025-07-15',
      updatedAt: new Date().toISOString(),
    },
    {
      id: 6,
      title: 'Panchayat Citizen Seva Kendra & Community Hall',
      category: 'Public Buildings',
      location: 'Panchayat Bhawan Campus',
      description: 'Construction of digital service hall for Aadhaar, ration, certificates, and community gatherings.',
      sanctionedAmount: 1200000,
      progress: 45,
      status: 'ongoing',
      startDate: '2026-01-10',
      targetDate: '2026-08-30',
      updatedAt: new Date().toISOString(),
    },
    {
      id: 7,
      title: 'Solid & Liquid Waste Segregation Shed',
      category: 'Health & Sanitation',
      location: 'Village Outskirts',
      description: 'Swachh Bharat Mission (Grameen) phase-2 waste sorting shed and compost pit construction.',
      sanctionedAmount: 390000,
      progress: 15,
      status: 'planned',
      startDate: '2026-04-01',
      targetDate: '2026-10-31',
      updatedAt: new Date().toISOString(),
    },
    {
      id: 8,
      title: 'Govt Senior Secondary School Playground Development',
      category: 'Education & Sports',
      location: 'School Ground, Harji',
      description: 'Levelling of playground, sports track marking, and plantation along the school perimeter.',
      sanctionedAmount: 400000,
      progress: 100,
      status: 'completed',
      startDate: '2025-06-01',
      targetDate: '2025-09-30',
      updatedAt: new Date().toISOString(),
    },
  ];

  return {
    name: 'dev-api-mock',
    configureServer(server: any) {
      server.middlewares.use((req: any, res: any, next: any) => {
        const url = req.url ? req.url.split('?')[0] : '';
        if (!url.startsWith('/api')) {
          return next();
        }

        if (url === '/api/healthz') {
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ status: 'ok' }));
          return;
        }

        if (url === '/api/portal-summary') {
          const totalWorks = sampleWorks.length;
          const ongoingWorks = sampleWorks.filter((w) => w.status === 'ongoing').length;
          const completedWorks = sampleWorks.filter((w) => w.status === 'completed').length;
          const plannedWorks = sampleWorks.filter((w) => w.status === 'planned').length;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({
            totalWorks,
            ongoingWorks,
            completedWorks,
            plannedWorks,
            updatedAt: new Date().toISOString(),
          }));
          return;
        }

        if (url === '/api/works') {
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(sampleWorks));
          return;
        }

        if (url === '/api/inquiries' && req.method === 'POST') {
          let body = '';
          req.on('data', (chunk: any) => { body += chunk; });
          req.on('end', () => {
            const randomCode = Math.random().toString(36).substring(2, 10).toUpperCase();
            res.statusCode = 201;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({
              reference: `HGP-INQ-26-${randomCode}`,
              submittedAt: new Date().toISOString(),
              message: 'Your inquiry has been recorded. Keep this reference for your records.',
            }));
          });
          return;
        }

        if (url === '/api/complaints' && req.method === 'POST') {
          let body = '';
          req.on('data', (chunk: any) => { body += chunk; });
          req.on('end', () => {
            const randomCode = Math.random().toString(36).substring(2, 10).toUpperCase();
            res.statusCode = 201;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({
              reference: `HGP-GRV-26-${randomCode}`,
              submittedAt: new Date().toISOString(),
              message: 'Your grievance has been registered. Keep this reference for your records.',
            }));
          });
          return;
        }

        if (url === '/api/patta' && req.method === 'POST') {
          let body = '';
          req.on('data', (chunk: any) => { body += chunk; });
          req.on('end', () => {
            const randomCode = Math.random().toString(36).substring(2, 10).toUpperCase();
            res.statusCode = 201;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({
              reference: `HGP-PAT-26-${randomCode}`,
              submittedAt: new Date().toISOString(),
              message: 'Your preliminary Ghar Ka Patta request has been recorded. Keep this reference for your records.',
            }));
          });
          return;
        }

        next();
      });
    },
  };
}

export default defineConfig({
  base: basePath,
  plugins: [
    apiMockPlugin(),
    react(),
    tailwindcss(),
    runtimeErrorOverlay(),
    ...(process.env.NODE_ENV !== 'production' &&
    process.env.REPL_ID !== undefined
      ? [
          await import('@replit/vite-plugin-cartographer').then((m) =>
            m.cartographer({
              root: path.resolve(import.meta.dirname, '..'),
            }),
          ),
          await import('@replit/vite-plugin-dev-banner').then((m) =>
            m.devBanner(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, 'src'),
      '@assets': path.resolve(
        import.meta.dirname,
        '..',
        '..',
        'attached_assets',
      ),
    },
    dedupe: ['react', 'react-dom'],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, 'dist/public'),
    emptyOutDir: true,
  },
  server: {
    port,
    strictPort: false,
    host: '0.0.0.0',
    allowedHosts: true,
    fs: {
      strict: true,
    },
  },
  preview: {
    port,
    host: '0.0.0.0',
    allowedHosts: true,
  },
});
