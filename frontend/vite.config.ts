import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  // proxy設定
  server: {
    proxy: {
      //例 "/api"で始まるすべてのリクエストをURLで指定したサーバーに転送する
        '^/api': {
          target: 'http://localhost:3000', // 実際のバックエンドAPIサーバー
          changeOrigin: true, // cross-origin
          rewrite: (path) => path.replace(/^\/api/, ''), // パスの書き換え '/api'を除去
        },
      },
    },
  });
