import path from "path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { viteStaticCopy } from "vite-plugin-static-copy";
import Sitemap from "vite-plugin-sitemap";
import { meta } from "vite-plugin-meta-tags";
import { VitePluginRadar } from "vite-plugin-radar";
import appConfig from "./app.config";

const metaTags = {
  title: appConfig.title,
  description: appConfig.description,
  url: appConfig.url,
  img: appConfig.ogCard,
  color: appConfig.color,
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [
      react(),
      meta(metaTags),
      Sitemap({
        hostname: appConfig.url,
      }),
      viteStaticCopy({
        targets: [
          {
            src: "node_modules/@opends/schema/assets/open-design-system-schema.json",
            dest: "./",
          },
        ],
      }),
      VitePluginRadar({
        analytics: {
          id: env.VITE_GA_ID || "G-XXXXXXXXXX",
          consentDefaults: {
            analytics_storage: "denied",
            ad_storage: "denied",
            wait_for_update: 500,
          },
        },
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
