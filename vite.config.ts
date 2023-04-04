import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { visualizer } from "rollup-plugin-visualizer";
import { viteMockServe } from "vite-plugin-mock";
export default defineConfig({
  plugins: [
    vue(),
    visualizer(),
    viteMockServe({
      mockPath: "./src/mock",
      localEnabled: true,
      supportTs: true,
    }),
  ],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  server: {
    proxy: {
      "^/generatePNG": {
        target: "http://172.10.21.103:81/",
      },
    },
  },
});
// rewrite: path => path.replace(/^\/api/, ""),
