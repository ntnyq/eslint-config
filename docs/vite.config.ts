import { fileURLToPath } from 'node:url'
import UnoCSS from 'unocss/vite'
import VueComponents from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import { groupIconVitePlugin } from 'vitepress-plugin-group-icons'

export default defineConfig({
  optimizeDeps: {
    exclude: ['vitepress'],
  },
  plugins: [
    UnoCSS(),
    VueComponents({
      dts: fileURLToPath(new URL('./components.d.ts', import.meta.url)),
      extensions: ['vue', 'md'],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dirs: [
        fileURLToPath(new URL('./.vitepress/components', import.meta.url)),
      ],
    }),
    groupIconVitePlugin(),
  ],
})
