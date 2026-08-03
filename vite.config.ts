import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  const cmsRemote =
    env.VITE_CMS_REMOTE_URL ?? 'http://localhost:3001/assets/remoteEntry.js';
  const analyticsRemote =
    env.VITE_ANALYTICS_REMOTE_URL ?? 'http://localhost:3002/assets/remoteEntry.js';

  return {
    plugins: [
      react(),
      federation({
        name: 'shellApp',
        remotes: {
          cmsApp: cmsRemote,
          analyticsApp: analyticsRemote,
        },
        shared: ['react', 'react-dom', 'react-router-dom'],
      }),
    ],
    build: {
      target: 'esnext',
      minify: false,
    },
  };
});
