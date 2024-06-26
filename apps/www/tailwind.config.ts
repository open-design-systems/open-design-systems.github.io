import type { Config } from "tailwindcss";
import sharedConfig from "@open-design-system/tailwind-config";

const config: Pick<Config, "content" | "presets"> = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  presets: [sharedConfig],
};

export default config;
