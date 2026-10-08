// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://elevated-solutions-interactive-rho.vercel.app",
  output: "static",
  integrations: [react()],
});
