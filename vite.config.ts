import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      vue: '@vue/compat'

    }
  },
  plugins: [vue({
    template: {
      compilerOptions: {
        compatConfig: {
          MODE: 2
        }
      }
    }
  })],
  
  server : {
    port: 8080,
    proxy:{
      '/products': 'https://preprod-dvs-api.dtone.com/v1',
      '/services': 'https://preprod-dvs-api.dtone.com/v1',
      '/benefit-types':'https://preprod-dvs-api.dtone.com/v1',
      '/countries':'https://preprod-dvs-api.dtone.com/v1'
    }
  }
})
