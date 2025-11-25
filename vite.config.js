import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";
import tailwindcss from "@tailwindcss/vite";

// Replace REPO_NAME with your GitHub repository name
const repoName = "spicyway-restaurant";

export default defineConfig({
  base: `/${repoName}/`, // <-- This is required for GitHub Pages
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
