// Pre-renders every language to static HTML and writes sitemap.xml, robots.txt, 404.html.
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { SITE_URL, SITE_NAME, LANGS, DOWNLOAD_URL, SUPPORT_EMAIL } from "./site.config.mjs";
import { loadArticles } from "./lib/articles.mjs";
import { marked } from "marked";

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
      { "@type": "Organization", name: SITE_NAME, url: `${SITE_URL}/`, logo: `${SITE_URL}/favicon.svg`, email: SUPPORT_EMAIL, contactPoint: { "@type": "ContactPoint", contactType: "customer support", email: SUPPORT_EMAIL } },
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
  // React hoists its own <link rel=preload> for every image; keep only our single hero preload.
  const app = render(lang).replace(/<link rel="preload" as="image"[^>]*\/>/g, "");
  const hero = app.match(/<img src="([^"]+)"[^>]*fetchPriority="high"|<img[^>]*fetchpriority="high"[^>]*src="([^"]+)"|<img src="([^"]+)"/i);
  const heroSrc = hero && (hero[1] || hero[2] || hero[3]);
  let html = template
    .replace(/<html lang="[^"]*"/, `<html lang="${lang}"`)
    .replace(/<title>.*?<\/title>/s, "")
    .replace("</head>", `${head(lang)}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${app}</div>`)
    .replace("</head>", heroSrc ? `<link rel="preload" as="image" href="${heroSrc}" fetchpriority="high">\n  </head>` : "</head>");
  const out = lang === "en" ? dist : path.join(dist, lang);
  fs.mkdirSync(out, { recursive: true });
  fs.writeFileSync(path.join(out, "index.html"), html);
}


// ---------- Articles (content/articles/*.md) ----------
const BASE = new URL(SITE_URL).pathname.replace(/\/?$/, "/");
const articles = loadArticles("content/articles");
const fmtDate = (d) => new Date(d + "T00:00:00Z").toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
const abs = (p) => (/^https?:/.test(p) ? p : `${SITE_URL}/${p.replace(/^\//, "")}`);

function page({ title, description, canonical, body, jsonld, ogType = "website", ogImage: img = ogImage }) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <meta name="robots" content="index,follow,max-image-preview:large">
  <link rel="canonical" href="${canonical}">
  <link rel="icon" type="image/svg+xml" href="${BASE}favicon.svg">
  <link rel="alternate" type="application/rss+xml" title="${SITE_NAME} articles" href="${SITE_URL}/feed.xml">
  <meta property="og:type" content="${ogType}">
  <meta property="og:site_name" content="${SITE_NAME}">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${img}">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Instrument+Serif&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="${BASE}blog.css">
  <script type="application/ld+json">${JSON.stringify(jsonld)}</script>
</head>
<body>
  <header class="top"><div class="in">
    <a class="brand" href="${BASE}"><b>W</b> ${SITE_NAME}</a>
    <nav class="links"><a href="${BASE}">Home</a><a href="${BASE}articles/">Articles</a><a href="${BASE}faq/">FAQ</a><a class="btn" href="${DOWNLOAD_URL}">Download Free</a></nav>
  </div></header>
${body}
  <footer>© ${new Date().getFullYear()} ${SITE_NAME} · <a href="${BASE}">Home</a> · <a href="${BASE}articles/">Articles</a> · <a href="${BASE}faq/">FAQ</a> · <a href="${BASE}feed.xml">RSS</a> · <a href="mailto:${SUPPORT_EMAIL}">${SUPPORT_EMAIL}</a></footer>
</body>
</html>`;
}

const cta = `<div class="cta"><strong>See what's taking up your disk space</strong><p>Windows Clean is a free, offline disk space analyzer for Windows. No cloud, no telemetry.</p><a class="btn" href="${DOWNLOAD_URL}">Download for Windows — Free</a></div>`;

for (const a of articles) {
  const url = `${SITE_URL}/articles/${a.slug}/`;
  const body = `  <main><article>
    <div class="crumbs"><a href="${BASE}">Home</a> › <a href="${BASE}articles/">Articles</a></div>
    <h1>${esc(a.title)}</h1>
    <p class="meta"><span class="tag">${esc(a.category)}</span>${fmtDate(a.date)} · ${a.minutes} min read</p>
    ${a.html}
    ${cta}
  </article></main>`;
  const jsonld = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        headline: a.title,
        description: a.description,
        datePublished: a.date,
        dateModified: a.date,
        mainEntityOfPage: url,
        image: a.image ? abs(a.image) : ogImage,
        author: { "@type": "Organization", name: SITE_NAME },
        publisher: { "@type": "Organization", name: SITE_NAME, logo: { "@type": "ImageObject", url: `${SITE_URL}/favicon.svg` } },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Articles", item: `${SITE_URL}/articles/` },
          { "@type": "ListItem", position: 3, name: a.title, item: url },
        ],
      },
    ],
  };
  const dir = path.join(dist, "articles", a.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), page({ title: `${a.title} | ${SITE_NAME}`, description: a.description, canonical: url, body, jsonld, ogType: "article", ogImage: a.image ? abs(a.image) : ogImage }));
}

{
  const cards = articles.map((a) => `<a class="card" href="${BASE}articles/${a.slug}/"><span class="tag">${esc(a.category)}</span><span class="meta">${fmtDate(a.date)} · ${a.minutes} min read</span><h2>${esc(a.title)}</h2><p>${esc(a.description)}</p></a>`).join("\n    ");
  const body = `  <main class="wide">
    <h1>Windows storage articles</h1>
    <p class="meta">Practical guides on disk space, cleanup and what is safe to delete.</p>
    <div class="grid">
    ${cards || "<p>No articles yet.</p>"}
    </div>
  </main>`;
  const jsonld = { "@context": "https://schema.org", "@type": "CollectionPage", name: `${SITE_NAME} articles`, url: `${SITE_URL}/articles/` };
  fs.mkdirSync(path.join(dist, "articles"), { recursive: true });
  fs.writeFileSync(path.join(dist, "articles", "index.html"), page({ title: `Windows Storage Articles & Guides | ${SITE_NAME}`, description: "Practical guides on Windows disk space, what is safe to delete, and how to reclaim storage.", canonical: `${SITE_URL}/articles/`, body, jsonld }));
}


// ---------- FAQ page (content/faq.json) ----------
const faq = JSON.parse(fs.readFileSync("content/faq.json", "utf8"));
{
  const items = faq.map((f) => `<details class="faq"><summary>${esc(f.q)}</summary><div>${marked.parseInline(f.a)}</div></details>`).join("\n    ");
  const body = `  <main>
    <div class="crumbs"><a href="${BASE}">Home</a> › FAQ</div>
    <h1>Windows Clean FAQ</h1>
    <p class="meta">Short, direct answers about the app, safety, pricing and installing.</p>
    <div class="faqlist">
    ${items}
    </div>
    ${cta}
  </main>`;
  const strip = (t) => t.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/[*`]/g, "");
  const jsonld = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "FAQPage", mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: strip(f.a) } })) },
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "FAQ", item: `${SITE_URL}/faq/` } ] },
    ],
  };
  fs.mkdirSync(path.join(dist, "faq"), { recursive: true });
  fs.writeFileSync(path.join(dist, "faq", "index.html"), page({ title: `Windows Clean FAQ: Free, Safe, Offline? | ${SITE_NAME}`, description: "Answers about Windows Clean: is it free, does it upload files, Windows 10/11 support, the SmartScreen warning, and safe deletion.", canonical: `${SITE_URL}/faq/`, body, jsonld }));
}

// ---------- llms.txt (a plain-text summary for AI assistants) ----------
fs.writeFileSync(path.join(dist, "llms.txt"), [
  `# ${SITE_NAME}`,
  "",
  `> ${seo.en.description}`,
  "",
  "## Pages",
  `- [Home](${SITE_URL}/): what the app does, screenshots, free vs Pro`,
  `- [FAQ](${SITE_URL}/faq/): pricing, privacy, Windows support, SmartScreen, safe deletion`,
  `- [Articles](${SITE_URL}/articles/): guides on Windows disk space`,
  "",
  "## Articles",
  ...articles.map((a) => `- [${a.title}](${SITE_URL}/articles/${a.slug}/): ${a.description}`),
  "",
  `## Contact`,
  `- ${SUPPORT_EMAIL}`,
  "",
].join("\n"));

const rssItems = articles.map((a) => `    <item><title>${esc(a.title)}</title><link>${SITE_URL}/articles/${a.slug}/</link><guid>${SITE_URL}/articles/${a.slug}/</guid><pubDate>${new Date(a.date + "T00:00:00Z").toUTCString()}</pubDate><description>${esc(a.description)}</description></item>`).join("\n");
fs.writeFileSync(path.join(dist, "feed.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0"><channel>\n    <title>${SITE_NAME} articles</title><link>${SITE_URL}/articles/</link><description>Windows storage guides</description>\n${rssItems}\n</channel></rss>\n`);

const articleUrls = [{ loc: `${SITE_URL}/faq/` }, { loc: `${SITE_URL}/articles/`, lastmod: articles[0]?.date }, ...articles.map((a) => ({ loc: `${SITE_URL}/articles/${a.slug}/`, lastmod: a.date }))]
  .map((u) => `  <url>\n    <loc>${u.loc}</loc>${u.lastmod ? `\n    <lastmod>${u.lastmod}</lastmod>` : ""}\n  </url>`).join("\n");

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
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${sm}\n${articleUrls}\n</urlset>\n`,
);
fs.writeFileSync(path.join(dist, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);
fs.copyFileSync(path.join(dist, "index.html"), path.join(dist, "404.html"));
console.log("Prerendered:", LANGS.join(", "));
