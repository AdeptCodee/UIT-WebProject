import { defineConfig } from "vite";

export default defineConfig({
  root: "./",
  build: {
    outDir: "dist",
    sourcemap: true,
  },
  server: {
    port: 3000,
  },
  esbuild: {
    jsxFactory: "createElement",
    jsxFragment: "Fragment",
  },
});
