// Pre-renders every language to static HTML and writes sitemap.xml, robots.txt, 404.html.
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { SITE_URL, SITE_NAME, LANGS, DOWNLOAD_URL, SUPPORT_EMAIL } from "./site.config.mjs";
import { loadArticles } from "./lib/articles.mjs";
import { LANG_META, UI } from "./lib/i18n.mjs";
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
        isAccessibleForFree: true,
        downloadUrl: DOWNLOAD_URL,
        screenshot: ogImage,
        softwareRequirements: "Windows 10 or Windows 11 (64-bit), Microsoft WebView2 runtime",
        featureList: ["Sunburst, treemap and file list views", "Large file finder", "Duplicate file detection by SHA-256", "Power search", "Offline: no account, no telemetry, no administrator rights"],
        offers: [
          { "@type": "Offer", name: "Windows Clean (free)", price: "0", priceCurrency: "USD", availability: "https://schema.org/InStock" },
          { "@type": "Offer", name: "Windows Clean Pro (one-time payment)", price: "12.99", priceCurrency: "USD", availability: "https://schema.org/InStock" },
        ],
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


// ---------- Articles + FAQ, in every language ----------
const BASE = new URL(SITE_URL).pathname.replace(/\/?$/, "/");
const articles = loadArticles("content/articles");
const abs = (p) => (/^https?:/.test(p) ? p : `${SITE_URL}/${p.replace(/^\//, "")}`);
const fmtDate = (d, l) => new Date(d + "T00:00:00Z").toLocaleDateString(LANG_META[l].locale, { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });

// path (for links) and absolute URL (for canonicals/sitemap) of a page in a language
const P = (l, rest = "") => `${BASE}${l === "en" ? "" : l + "/"}${rest}`;
const U = (l, rest = "") => `${SITE_URL}/${l === "en" ? "" : l + "/"}${rest}`;

const faqs = {};
for (const l of LANGS) {
  const f = l === "en" ? "content/faq.json" : `content/faq.${l}.json`;
  if (fs.existsSync(f)) faqs[l] = JSON.parse(fs.readFileSync(f, "utf8"));
}
const inLang = (a, l) => (l === "en" ? a : a.translations[l] && { ...a, ...a.translations[l] });
const articlesIn = (l) => articles.map((a) => inLang(a, l)).filter(Boolean);
const hasArticles = (l) => articlesIn(l).length > 0;
const navLang = (l, ok) => (ok ? l : "en"); // fall back to English pages that exist

// alts = { en: "articles/x/", de: "de/..." } -> which languages this page exists in
function switcher(lang, alts) {
  const items = LANGS.map((l) => {
    const m = LANG_META[l];
    if (l === lang) return `<li><a class="on" href="${P(l, alts[l])}" hreflang="${l}" lang="${l}"><span class="code">${m.code}</span><span class="nm">${m.name}</span><span class="ck">✓</span></a></li>`;
    if (alts[l] !== undefined) return `<li><a href="${P(l, alts[l])}" hreflang="${l}" lang="${l}"><span class="code">${m.code}</span><span class="nm">${m.name}</span></a></li>`;
    return `<li class="off" title="${esc(UI[lang].notTranslated)}"><span class="code">${m.code}</span><span class="nm">${m.name}</span><em>${esc(UI[lang].notTranslated)}</em></li>`;
  }).join("");
  return `<details class="lang"><summary aria-label="${esc(UI[lang].language)}"><span class="code">${LANG_META[lang].code}</span><span class="nm">${LANG_META[lang].name}</span><span class="car">▾</span></summary><ul>${items}</ul></details>`;
}

function page({ lang, title, description, rest, alts, body, jsonld, ogType = "website", ogImage: img = ogImage, article }) {
  const t = UI[lang];
  const canonical = U(lang, rest);
  const hre = LANGS.filter((l) => alts[l] !== undefined).map((l) => `<link rel="alternate" hreflang="${l}" href="${U(l, alts[l])}">`).join("\n  ");
  const xdef = alts.en !== undefined ? `<link rel="alternate" hreflang="x-default" href="${U("en", alts.en)}">` : "";
  const nA = P(navLang(lang, hasArticles(lang)), "articles/");
  const nF = P(navLang(lang, !!faqs[lang]), "faq/");
  return `<!doctype html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <meta name="robots" content="index,follow,max-image-preview:large">
  <link rel="canonical" href="${canonical}">
  ${hre}
  ${xdef}
  <link rel="icon" type="image/svg+xml" href="${BASE}favicon.svg">
  <link rel="alternate" type="application/rss+xml" title="${SITE_NAME} articles" href="${SITE_URL}/feed.xml">
  <meta property="og:type" content="${ogType}">
  <meta property="og:site_name" content="${SITE_NAME}">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${img}">
  <meta property="og:locale" content="${LANG_META[lang].og}">
  <meta property="og:image:alt" content="${esc(title)}">${article ? `
  <meta property="article:published_time" content="${article.date}">
  <meta property="article:modified_time" content="${article.updated}">
  <meta property="article:section" content="${esc(article.category)}">` : ""}
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(title)}">
  <meta name="twitter:description" content="${esc(description)}">
  <meta name="twitter:image" content="${img}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Instrument+Serif&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="${BASE}blog.css">
  <script type="application/ld+json">${JSON.stringify(jsonld)}</script>
</head>
<body>
  <header class="top"><div class="in">
    <a class="brand" href="${P(lang)}"><b>W</b> <span class="bn">${SITE_NAME}</span></a>
    <nav class="links"><a href="${P(lang)}">${t.home}</a><a href="${nA}">${t.articles}</a><a href="${nF}">${t.faq}</a>${switcher(lang, alts)}<a class="btn" href="${DOWNLOAD_URL}">${t.download}</a></nav>
  </div></header>
${body}
  <footer>© ${new Date().getFullYear()} ${SITE_NAME} · <a href="${P(lang)}">${t.home}</a> · <a href="${nA}">${t.articles}</a> · <a href="${nF}">${t.faq}</a> · <a href="${BASE}feed.xml">RSS</a> · <a href="mailto:${SUPPORT_EMAIL}">${SUPPORT_EMAIL}</a></footer>
  <script>document.addEventListener("click",function(e){document.querySelectorAll("details.lang[open]").forEach(function(d){if(!d.contains(e.target))d.open=false})})</script>
</body>
</html>`;
}

const ctaFor = (l) => `<div class="cta"><strong>${esc(UI[l].ctaTitle)}</strong><p>${esc(UI[l].ctaText)}</p><a class="btn" href="${DOWNLOAD_URL}">${esc(UI[l].ctaBtn)}</a></div>`;
// Internal links written as /articles/x/ in Markdown -> current language when that translation exists
const localLinks = (html, lang) => html
  .replace(/href="\/articles\/([^/"#]+)\/"/g, (m, slug) => {
    const a = articles.find((z) => z.slug === slug);
    if (!a) return m;
    const l = lang === "en" || a.translations[lang] ? lang : "en";
    return `href="${P(l, `articles/${slug}/`)}"`;
  })
  .replace(/href="\/faq\/"/g, () => `href="${P(navLang(lang, !!faqs[lang]), "faq/")}"`)
  .replace(/href="\/"/g, () => `href="${P(lang)}"`);

// 3 related articles in the same language: same category first, then newest
const related = (a, lang) => articlesIn(lang).filter((z) => z.slug !== a.slug)
  .sort((x, y) => (y.category === a.category) - (x.category === a.category) || (x.date < y.date ? 1 : -1)).slice(0, 3);
const write = (rel, html) => { const f = path.join(dist, rel, "index.html"); fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, html); };

// where each article / index / FAQ exists
const articleAlts = (a) => Object.fromEntries(LANGS.filter((l) => l === "en" || a.translations[l]).map((l) => [l, `articles/${a.slug}/`]));
const indexAlts = Object.fromEntries(LANGS.filter(hasArticles).map((l) => [l, "articles/"]));
const faqAlts = Object.fromEntries(LANGS.filter((l) => faqs[l]).map((l) => [l, "faq/"]));

for (const a of articles) {
  const alts = articleAlts(a);
  for (const lang of Object.keys(alts)) {
    const e = inLang(a, lang), t = UI[lang], rel = related(a, lang);
    const url = U(lang, `articles/${a.slug}/`);
    const body = `  <main><article>
    <div class="crumbs"><a href="${P(lang)}">${t.home}</a> › <a href="${P(lang, "articles/")}">${t.articles}</a></div>
    <h1>${esc(e.title)}</h1>
    <p class="meta"><span class="tag">${esc(e.category)}</span>${fmtDate(e.date, lang)} · ${t.readTime(e.minutes)}${e.updated && e.updated !== e.date ? ` · ${esc(t.updated)} ${fmtDate(e.updated, lang)}` : ""}</p>
    ${e.toc && e.toc.length > 3 ? `<nav class="toc" aria-label="${esc(t.toc)}"><strong>${esc(t.toc)}</strong><ol>${e.toc.map((h) => `<li><a href="#${h.id}">${esc(h.text)}</a></li>`).join("")}</ol></nav>` : ""}
    ${localLinks(e.html, lang)}
    ${ctaFor(lang)}
    ${rel.length ? `<aside class="related"><h2>${esc(t.related)}</h2><div class="grid">${rel.map((r) => `<a class="card" href="${P(lang, `articles/${r.slug}/`)}"><span class="tag">${esc(r.category)}</span><h3>${esc(r.title)}</h3><p>${esc(r.description)}</p></a>`).join("")}</div></aside>` : ""}
  </article></main>`;
    const img = e.image ? abs(e.image) : ogImage;
    const jsonld = {
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "BlogPosting", "@id": `${url}#article`, headline: e.title, description: e.description, inLanguage: lang, datePublished: e.date, dateModified: e.updated || e.date, mainEntityOfPage: { "@type": "WebPage", "@id": url }, url, image: img,
          articleSection: e.category, wordCount: e.words, isPartOf: { "@id": `${SITE_URL}/#website` },
          ...(e.toc?.length ? { about: { "@type": "Thing", name: e.title } } : {}),
          author: { "@type": "Organization", name: SITE_NAME, url: `${SITE_URL}/` },
          publisher: { "@type": "Organization", name: SITE_NAME, logo: { "@type": "ImageObject", url: `${SITE_URL}/favicon.svg` } } },
        { "@type": "BreadcrumbList", itemListElement: [
          { "@type": "ListItem", position: 1, name: t.home, item: U(lang) },
          { "@type": "ListItem", position: 2, name: t.articles, item: U(lang, "articles/") },
          { "@type": "ListItem", position: 3, name: e.title, item: url } ] },
        ...(e.faq?.length ? [{ "@type": "FAQPage", mainEntity: e.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }] : []),
      ],
    };
    write(P(lang, `articles/${a.slug}/`).slice(BASE.length), page({ lang, title: (e.title + SITE_NAME).length > 58 ? e.title : `${e.title} | ${SITE_NAME}`, description: e.description, rest: `articles/${a.slug}/`, alts, body, jsonld, ogType: "article", ogImage: img, article: e }));
  }
}

for (const lang of LANGS.filter(hasArticles)) {
  const t = UI[lang];
  const cards = articlesIn(lang).map((e) => `<a class="card" href="${P(lang, `articles/${e.slug}/`)}"><span class="tag">${esc(e.category)}</span><span class="meta">${fmtDate(e.date, lang)} · ${t.readTime(e.minutes)}</span><h2>${esc(e.title)}</h2><p>${esc(e.description)}</p></a>`).join("\n    ");
  const body = `  <main class="wide">
    <h1>${esc(t.idxTitle)}</h1>
    <p class="meta">${esc(t.idxSub)}</p>
    <div class="grid">
    ${cards}
    </div>
  </main>`;
  const jsonld = { "@context": "https://schema.org", "@type": "CollectionPage", name: `${SITE_NAME} – ${t.articles}`, inLanguage: lang, url: U(lang, "articles/"),
    mainEntity: { "@type": "ItemList", itemListElement: articlesIn(lang).map((e, i) => ({ "@type": "ListItem", position: i + 1, url: U(lang, `articles/${e.slug}/`), name: e.title })) } };
  write(P(lang, "articles/").slice(BASE.length), page({ lang, title: `${t.idxMetaTitle} | ${SITE_NAME}`, description: t.idxMetaDesc, rest: "articles/", alts: indexAlts, body, jsonld }));
}

const strip = (x) => x.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/[*`]/g, "");
for (const lang of Object.keys(faqs)) {
  const t = UI[lang], faq = faqs[lang];
  // article links in FAQ answers point to the translated article when it exists
  const fixLinks = (x) => x.replace(/\]\(\/articles\/([^/)]+)\/\)/g, (m, slug) => {
    const a = articles.find((z) => z.slug === slug);
    const l = lang === "en" || a?.translations[lang] ? lang : "en";
    return `](${P(l, `articles/${slug}/`)})`;
  });
  const items = faq.map((f) => `<details class="faq"><summary>${esc(f.q)}</summary><div>${marked.parseInline(fixLinks(f.a))}</div></details>`).join("\n    ");
  const body = `  <main>
    <div class="crumbs"><a href="${P(lang)}">${t.home}</a> › ${t.faq}</div>
    <h1>${esc(t.faqH1)}</h1>
    <p class="meta">${esc(t.faqSub)}</p>
    <div class="faqlist">
    ${items}
    </div>
    ${ctaFor(lang)}
  </main>`;
  const jsonld = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "FAQPage", inLanguage: lang, mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: strip(f.a) } })) },
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: t.home, item: U(lang) },
        { "@type": "ListItem", position: 2, name: t.faq, item: U(lang, "faq/") } ] },
    ],
  };
  write(P(lang, "faq/").slice(BASE.length), page({ lang, title: `${t.faqMetaTitle} | ${SITE_NAME}`, description: t.faqMetaDesc, rest: "faq/", alts: faqAlts, body, jsonld }));
}

// ---------- llms.txt, RSS (English), sitemap, robots, 404 ----------
fs.writeFileSync(path.join(dist, "llms.txt"), [
  `# ${SITE_NAME}`, "", `> ${seo.en.description}`, "",
  "## Pages",
  `- [Home](${SITE_URL}/): what the app does, screenshots, free vs Pro`,
  `- [FAQ](${SITE_URL}/faq/): pricing, privacy, Windows support, SmartScreen, safe deletion`,
  `- [Articles](${SITE_URL}/articles/): guides on Windows disk space`,
  `- Also available in: ${LANGS.filter((l) => l !== "en").map((l) => `${LANG_META[l].name} (${SITE_URL}/${l}/)`).join(", ")}`,
  "", "## Articles",
  ...Object.entries(articles.reduce((m, a) => ((m[a.category] ||= []).push(a), m), {})).flatMap(([cat, list]) => [`### ${cat}`, ...list.map((a) => `- [${a.title}](${SITE_URL}/articles/${a.slug}/): ${a.description}`)]),
  "", "## Contact", `- ${SUPPORT_EMAIL}`, "",
].join("\n"));

const rssItems = articles.map((a) => `    <item><title>${esc(a.title)}</title><link>${SITE_URL}/articles/${a.slug}/</link><guid>${SITE_URL}/articles/${a.slug}/</guid><pubDate>${new Date(a.date + "T00:00:00Z").toUTCString()}</pubDate><category>${esc(a.category)}</category><description>${esc(a.description)}</description></item>`).join("\n");
fs.writeFileSync(path.join(dist, "feed.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0"><channel>\n    <title>${SITE_NAME} articles</title><link>${SITE_URL}/articles/</link><description>Windows storage guides</description>\n${rssItems}\n</channel></rss>\n`);

const today = new Date().toISOString().slice(0, 10);
const xlinks = (alts) => [...LANGS.filter((l) => alts[l] !== undefined).map((l) => [l, U(l, alts[l])]), ...(alts.en !== undefined ? [["x-default", U("en", alts.en)]] : [])]
  .map(([h, u]) => `    <xhtml:link rel="alternate" hreflang="${h}" href="${u}"/>`).join("\n");
const entry = (loc, alts, lastmod) => `  <url>\n    <loc>${loc}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ""}\n${xlinks(alts)}\n  </url>`;
const homeAlts = Object.fromEntries(LANGS.map((l) => [l, ""]));
const urls = [
  ...LANGS.map((l) => entry(U(l), homeAlts, today)),
  ...Object.keys(faqAlts).map((l) => entry(U(l, "faq/"), faqAlts, today)),
  ...Object.keys(indexAlts).map((l) => entry(U(l, "articles/"), indexAlts, articles[0]?.date)),
  ...articles.flatMap((a) => { const al = articleAlts(a); return Object.keys(al).map((l) => entry(U(l, al[l]), al, inLang(a, l).updated || inLang(a, l).date)); }),
];
fs.writeFileSync(path.join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join("\n")}\n</urlset>\n`);
fs.writeFileSync(path.join(dist, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);
// 404: same look as home, but never indexed and without a canonical pointing at the home page
fs.writeFileSync(path.join(dist, "404.html"), fs.readFileSync(path.join(dist, "index.html"), "utf8")
  .replace(/\s*<link rel="canonical"[^>]*>/, "").replace(/\s*<link rel="alternate" hreflang[^>]*>/g, "")
  .replace(/<meta name="robots" content="[^"]*">/, '<meta name="robots" content="noindex,follow">'));
console.log("Prerendered:", LANGS.join(", "), "| articles:", articles.length, "| FAQ languages:", Object.keys(faqs).join(", "));
