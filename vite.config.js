import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      input: {
        main:      resolve(__dirname, 'src/pages/index.html'),
        disease:   resolve(__dirname, 'src/pages/disease.html'),
        pathway:   resolve(__dirname, 'src/pages/pathway.html'),
        drug:      resolve(__dirname, 'src/pages/drug-enzalutamide.html'),
        evidence:  resolve(__dirname, 'src/pages/evidence.html'),
        faq:       resolve(__dirname, 'src/pages/faq.html'),
        diagnosis: resolve(__dirname, 'src/pages/diagnosis.html'),
        reference: resolve(__dirname, 'src/pages/reference-guide.html'),
      },
    },
  },
})
