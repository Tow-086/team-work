import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import path from 'path';

export default defineConfig({
  plugins: [vue(), vueJsx()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // 后端地址
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
});
     