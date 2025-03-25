import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    viteStaticCopy({
      targets: [
        {
          src: "node_modules/monaco-editor",
          dest: "node_modules",
        },
      ],
    }),
  ],
  build: {
    rollupOptions: {
      input: {
        sidepanel: resolve(__dirname, "index.html"),
        service_worker: resolve(__dirname, "src/service_worker.ts"),
        content_script: resolve(__dirname, "src/content_script.ts"),
      },
      output: {
        entryFileNames: "[name].js",
      },
    },
    outDir: "dist",
    emptyOutDir: true,
  },
});
