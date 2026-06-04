import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      input: {
        main:      resolve(__dirname, 'index.html'),
        disease:   resolve(__dirname, 'disease.html'),
        pathway:   resolve(__dirname, 'pathway.html'),
        drug:      resolve(__dirname, 'drug-enzalutamide.html'),
        evidence:  resolve(__dirname, 'evidence.html'),
        faq:       resolve(__dirname, 'faq.html'),
        diagnosis: resolve(__dirname, 'diagnosis.html'),
        reference: resolve(__dirname, 'reference-guide.html'),
      },
    },
  },
})
