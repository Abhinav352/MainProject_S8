import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [react(), VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      injectRegister:'auto',
      includeAssets: ['Logo_192.png', 'Logo_512.png'],
      manifest: {
        name: 'Abhinav Nair | RAN',
        short_name: 'RAN',
        description: 'Rapid Aid Network',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'Logo_192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'Logo_512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })],
})