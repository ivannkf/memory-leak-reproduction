import vue from "@vitejs/plugin-vue";
import ssr from "vite-plugin-ssr/plugin";
import path from 'path'
import { defineConfig } from "vite";

export default defineConfig(() => {
  return {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './')
      }
    },
    plugins: [
      vue(),
      ssr()
    ],
    ssr: {
      noExternal: [
        'vue-i18n',
      ]
    }
  };
});
