import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import monkey, { cdn } from 'vite-plugin-monkey'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    monkey({
      entry: 'src/main.ts',
      userscript: {
        author: 'kahosan',
        icon: 'https://bgm.tv/img/favicon.ico',
        namespace: 'http://tampermonkey.net/',
        match: ['https://bgm.tv/subject/*'],
        license: 'MIT',
      },
      build: {
        externalGlobals: {
          vue: cdn.unpkg('Vue', 'dist/vue.global.prod.js'),
        },
      },
    }),
  ],
})
