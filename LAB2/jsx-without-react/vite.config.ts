// vite.config.ts
import { defineConfig } from "vite";

export default defineConfig({
  esbuild: {
      jsxInject: `import { createElement, createFragment } from './jsx-runtime';\n`,
  },
});
