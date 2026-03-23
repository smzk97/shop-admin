import { fileURLToPath, URL } from 'node:url'
import WindiCSS from 'vite-plugin-windicss'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import path from 'path'
// 借助node的path模块进行文件别名设置

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    WindiCSS(),
  ],
  resolve: {
    alias: {
      // '@': fileURLToPath(new URL('./src', import.meta.url))   // 文件别名的设置
      '@': path.resolve(__dirname, 'src')  
      // 借助node的path模块进行文件别名设置
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://ceshi13.dishait.cn',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
