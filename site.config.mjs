// Canonical site URL (domain).
// Override at build time with:  SITE_URL=https://yourdomain.com npm run build
export const SITE_URL = (process.env.SITE_URL || "https://www.windowsclean.space").replace(/\/$/, "");
export const SITE_NAME = "Windows Clean";
export const LANGS = ["en", "de", "fr", "es", "ja"];
