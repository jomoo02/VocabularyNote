import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port:8081,
    proxy: {
      '/search': {
        target: 'https://suggest.dic.daum.net',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/search/, ''),
        secure: false,
        ws: true
      }
    }
  }
})
