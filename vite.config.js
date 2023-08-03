

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        clientsClaim: false,
        skipWaiting: true
      },
      devOptions: {
        enabled: true
      },
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg"],
      manifest: {
        name: "BinBuddy",
        short_name: "BinBuddy-driver",
        description: "a waste management app ",
        theme_color: "#ffffff",
        start_url: "/",
        icons: [
          {
            src: "splash2.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "splash2.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "splash2.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ]
});
