import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import { createHtmlPlugin } from 'vite-plugin-html'
import Critters from 'critters'

export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimizer({
      png: { quality: 80 },
      jpeg: { quality: 80 },
      webp: { quality: 80 },
      avif: { quality: 50 },
      svg: {
        multipass: true,
        plugins: [
          { name: 'removeViewBox', active: false },
          { name: 'removeEmptyAttrs', active: true }
        ]
      }
    }),
    createHtmlPlugin({
      minify: true,
      entry: 'src/main.jsx',
      template: 'index.html',
      // opcional: si Critters devuelve una Promesa, haz async:
      // postprocess: async (html) => await new Critters({ preload: 'swap', compress: true, pruneSource: true }).process(html)
      postprocess: (html) => {
        const critters = new Critters({
          preload: 'swap',
          compress: true,
          pruneSource: true
        })
        return critters.process(html)
      }
    })
  ],

  
  build: {
    sourcemap: true,        // genera *.map para JS/CSS en producción
  },
  css: {
    devSourcemap: true       // sourcemaps también para CSS
  },


  server: {
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
