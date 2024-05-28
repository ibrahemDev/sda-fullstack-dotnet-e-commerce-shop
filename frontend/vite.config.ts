import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
    cors: {
      // Allow all origins in development
      origin: '*',
      // or specify allowed origins
      // origin: ['http://localhost:3000', 'https://example.com'],
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
    },
    host: "0.0.0.0",
    proxy: {
      "/api": {
        target: "http://0.0.0.0:5125",
        changeOrigin: true
      },
      "/swagger": {
        target: "http://0.0.0.0:5125",
        changeOrigin: true,

      }
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  }
})
