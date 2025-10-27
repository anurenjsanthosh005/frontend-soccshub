import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fixReactVirtualized from "esbuild-plugin-react-virtualized"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),],
  optimizeDeps:{
    esbuildOptions:{
      plugins: [fixReactVirtualized],
    }
  }
})
