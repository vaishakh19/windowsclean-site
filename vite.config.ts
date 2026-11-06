import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { SITE_URL } from "./site.config.mjs";
import { loadArticles } from "./lib/articles.mjs";

// Exposes article metadata (no bodies) to the React app as `virtual:articles`.
function articlesPlugin() {
  const id = "virtual:articles";
  return {
    name: "articles",
    resolveId: (s: string) => (s === id ? "\0" + id : null),
    load(s: string) {
      if (s !== "\0" + id) return null;
      return "export default " + JSON.stringify(loadArticles("content/articles", { withHtml: false }));
    },
  };
}

// Base path comes from SITE_URL: custom domain => "/", GitHub project URL => "/repo/".
export default defineConfig({
  base: new URL(SITE_URL).pathname.replace(/\/?$/, "/"),
  // Make a build-time SITE_URL override visible to browser code too (site.config.mjs reads process.env).
  define: { "process.env.SITE_URL": JSON.stringify(process.env.SITE_URL ?? "") },
  plugins: [react(), articlesPlugin()],
});
