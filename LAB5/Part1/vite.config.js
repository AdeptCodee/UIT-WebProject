import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom", // Quan trọng: Giả lập trình duyệt
    globals: true, // Để dùng được describe, test, expect mà không cần import
    setupFiles: "./setupTests.js", // File cấu hình chạy trước khi test
  },
});
