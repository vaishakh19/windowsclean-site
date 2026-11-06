import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { SITE_URL } from "./site.config.mjs";

// Base path is derived from SITE_URL, so a custom domain (base "/") or a
// GitHub Pages project URL (base "/windowsclean-site/") both just work.
export default defineConfig({
  base: new URL(SITE_URL).pathname.replace(/\/?$/, "/"),
  plugins: [react()],
});
