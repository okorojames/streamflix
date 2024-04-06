import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "prompt",
      manifest: {
        theme_color: "#ffff",
        background_color: "#ffff",
        display: "standalone",
        scope: "/",
        start_url: "/",
        name: "Streamflix site",
        short_name: "Streamflix",
        description: "Streamflix movie show off website",
        icons: [
          {
            src: "/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icon-256x256.png",
            sizes: "256x256",
            type: "image/png",
          },
          {
            src: "/icon-384x384.png",
            sizes: "384x384",
            type: "image/png",
          },
          {
            src: "/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
        shortcuts: [
          {
            name: "Movies",
            short_name: "Movies",
            url: "/movies",
            icons: [
              {
                src: "/icon-192x192.png",
                sizes: "192x192",
                type: "image/png",
              },
            ],
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
