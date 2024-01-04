import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
      vue(),
      AutoImport({
          imports: ['vue'],
          resolvers: [
              ElementPlusResolver(),
          ],
      }),

      Components({
          resolvers: [

              // Auto register Element Plus components
              // 自动导入 Element Plus 组件
              ElementPlusResolver(),
                ],
      }),

  ],
  resolve:{
    alias:{
      '@':path.resolve(__dirname, 'src')
    }
  }
})