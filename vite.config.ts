import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import Fonts from "unplugin-fonts/vite";

export default defineConfig({
  plugins: [
    react(),
    Fonts({
      google: {
        families: [
          {
            name: "Libre Franklin",
            styles: "wght@300;400;600;800",
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/variables.scss" as *;`,
      },
    },
  },
});
