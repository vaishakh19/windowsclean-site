// Pre-renders every language to static HTML and writes sitemap.xml, robots.txt, 404.html.
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { SITE_URL, SITE_NAME, LANGS } from "./site.config.mjs";

const dist = path.resolve("dist");
const template = fs.readFileSync(path.join(dist, "index.html"), "utf8");
const { render, SEO: seo } = await import(pathToFileURL(path.resolve("dist-server/entry-server.js")).href);

const urlFor = (l) => `${SITE_URL}/${l === "en" ? "" : l + "/"}`;
const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const ogImage = `${SITE_URL}/og-image.jpg`;

function head(lang) {
  const { title, description, locale } = seo[lang];
  const alternates = LANGS.map((l) => `<link rel="alternate" hreflang="${l}" href="${urlFor(l)}">`).join("\n    ");
  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebSite", "@id": `${SITE_URL}/#website`, url: `${SITE_URL}/`, name: SITE_NAME, inLanguage: LANGS },
      {
        "@type": "SoftwareApplication",
        name: SITE_NAME,
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Windows 10, Windows 11",
        description: seo.en.description,
        url: `${SITE_URL}/`,
        image: ogImage,
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      },
    ],
  };
  return `
    <title>${esc(title)}</title>
    <meta name="description" content="${esc(description)}">
    <meta name="robots" content="index,follow,max-image-preview:large">
    <meta name="theme-color" content="#FAF7F3">
    <link rel="canonical" href="${urlFor(lang)}">
    ${alternates}
    <link rel="alternate" hreflang="x-default" href="${urlFor("en")}">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="${SITE_NAME}">
    <meta property="og:title" content="${esc(title)}">
    <meta property="og:description" content="${esc(description)}">
    <meta property="og:url" content="${urlFor(lang)}">
    <meta property="og:image" content="${ogImage}">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:locale" content="${locale}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${esc(title)}">
    <meta name="twitter:description" content="${esc(description)}">
    <meta name="twitter:image" content="${ogImage}">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <script type="application/ld+json">${JSON.stringify(ld)}</script>`;
}

for (const lang of LANGS) {
  let html = template
    .replace(/<html lang="[^"]*"/, `<html lang="${lang}"`)
    .replace(/<title>.*?<\/title>/s, "")
    .replace("</head>", `${head(lang)}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${render(lang)}</div>`);
  const out = lang === "en" ? dist : path.join(dist, lang);
  fs.mkdirSync(out, { recursive: true });
  fs.writeFileSync(path.join(out, "index.html"), html);
}

const today = new Date().toISOString().slice(0, 10);
const sm = LANGS.map(
  (l) =>
    `  <url>\n    <loc>${urlFor(l)}</loc>\n    <lastmod>${today}</lastmod>\n` +
    [...LANGS, "x-default"]
      .map((a) => `    <xhtml:link rel="alternate" hreflang="${a}" href="${urlFor(a === "x-default" ? "en" : a)}"/>`)
      .join("\n") +
    `\n  </url>`,
).join("\n");
fs.writeFileSync(
  path.join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${sm}\n</urlset>\n`,
);
fs.writeFileSync(path.join(dist, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);
fs.copyFileSync(path.join(dist, "index.html"), path.join(dist, "404.html"));
fs.writeFileSync(path.join(dist, ".nojekyll"), "");
console.log("Prerendered:", LANGS.join(", "));
