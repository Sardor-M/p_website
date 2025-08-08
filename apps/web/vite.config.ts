import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    root: './',
    resolve: {
      alias: [{ find: '@', replacement: path.resolve(__dirname, './src') }],
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: true,
    },
    server: {
      proxy: {
        '/v1/databases': {
          target: 'https://api.notion.com',
          changeOrigin: true,
          secure: true,
          headers: {
            Authorization: `Bearer ${env.VITE_NOTION_API_SECRET}`,
            'Notion-Version': '2022-06-28',
            'Content-Type': 'application/json',
          },
        },
        '/v1/pages': {
          target: 'https://api.notion.com',
          changeOrigin: true,
          secure: true,
          headers: {
            Authorization: `Bearer ${env.VITE_NOTION_API_SECRET}`,
            'Notion-Version': '2022-06-28',
            'Content-Type': 'application/json',
          },
        },
        '/v1/blocks': {
          target: 'https://api.notion.com',
          changeOrigin: true,
          secure: true,
          headers: {
            Authorization: `Bearer ${env.VITE_NOTION_API_SECRET}`,
            'Notion-Version': '2022-06-28',
            'Content-Type': 'application/json',
          },
        },
      },
    },
  };
});
