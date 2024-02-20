import { resolve } from 'path';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.jsx"),
      name: "XrasResourceCatalog",
      fileName: "xras-resource-catalog",
    },
  },
  plugins: [react()],
})
