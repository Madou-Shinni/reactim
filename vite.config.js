import { defineConfig,loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import {resolve} from "path";

// https://vitejs.dev/config/
export default ({mode}) => {
  const env = loadEnv(mode,"");

  return defineConfig({
    plugins: [react()],
    resolve: {
      alias: {
        '@': resolve(__dirname, "src"),
      }
    },
    server: {
      proxy: {
        // 代理所有`/api`的请求
        '/api': {
          target: env.VITE_BASE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    }
  })
}
