import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    host: '0.0.0.0',
    allowedHosts: ['.ngrok-free.app'], // wildcard agar semua subdomain ngrok diterima
  },
})