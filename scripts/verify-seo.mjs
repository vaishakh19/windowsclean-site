// Read-only verification of the built site; no network requests or mutations.
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { loadArticles } from '../lib/articles.mjs';
import { SITE_URL } from '../site.config.mjs';

const root = path.resolve('dist');
const config = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
assert.ok(config.headers.some(rule => rule.source === '/sitemap.xml' && rule.headers.some(h => h.key === 'Content-Type' && h.value.startsWith('application/xml'))), 'Sitemap XML header');
const files = fs.readdirSync(root, { recursive: true }).filter(f => f.endsWith('.html'));
const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
assert.equal(new Set(locations).size, locations.length, 'Duplicate sitemap URL');
const errors = [];
let schemas = 0, articlePages = 0;
function check(ok, message) { if (!ok) errors.push(message); }
for (const file of files) {
  const html = fs.readFileSync(path.join(root, file), 'utf8');
  const count = re => [...html.matchAll(re)].length;
  check(count(/<title>/g) === 1, `${file}: title count`);
  check(count(/<meta name="description"/g) === 1, `${file}: description count`);
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(m[1]); schemas++; } catch { errors.push(`${file}: invalid JSON-LD`); }
  }
  if (file === '404.html') {
    check(html.includes('content="noindex,follow"'), '404: robots');
    check(!html.includes('rel="canonical"') && !html.includes('hreflang='), '404: canonical/hreflang');
    continue;
  }
  check(count(/<link rel="canonical"/g) === 1, `${file}: canonical count`);
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  check(locations.includes(canonical), `${file}: absent from sitemap`);
  for (const m of html.matchAll(/(?:href|src)="([^"<>]+)"/g)) {
    const raw = m[1].replaceAll('&amp;', '&');
    if (/^(?:mailto:|tel:|data:|javascript:|#)/.test(raw)) continue;
    const url = new URL(raw, canonical);
    if (url.origin !== new URL(SITE_URL).origin) continue;
    const local = path.join(root, decodeURIComponent(url.pathname));
    check(fs.existsSync(local) && (fs.statSync(local).isFile() || fs.existsSync(path.join(local, 'index.html'))), `${file}: broken ${raw}`);
  }
  if (/(?:^|[\\/])articles[\\/][^\\/]+[\\/]index.html$/.test(file)) {
    articlePages++;
    check(count(/<h1(?:\s[^>]*)?>/g) === 1, `${file}: H1 count`);
    const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map(m => m[1]);
    check(new Set(ids).size === ids.length, `${file}: duplicate heading ID`);
    check(html.includes('class="related"'), `${file}: related cards`);
  }
}
const articles = loadArticles('content/articles');
for (const a of articles) {
  const langs = ['en', ...Object.keys(a.translations)];
  for (const lang of langs) {
    const rest = `${lang === 'en' ? '' : lang + '/'}articles/${a.slug}/`;
    const html = fs.readFileSync(path.join(root, rest, 'index.html'), 'utf8');
    check(locations.includes(`${SITE_URL}/${rest}`), `${rest}: sitemap`);
    for (const alt of [...langs, 'x-default']) check(html.includes(`hreflang="${alt}"`), `${rest}: missing ${alt}`);
    const entry = sitemap.split('<url>').find(e => e.includes(`<loc>${SITE_URL}/${rest}</loc>`));
    check(entry?.includes(`<lastmod>${(lang === 'en' ? a : a.translations[lang]).updated}</lastmod>`), `${rest}: lastmod`);
  }
}
for (const slug of ['windows-disk-space-analyzer','find-large-files-windows','free-up-disk-space-windows']) {
  check(locations.includes(`${SITE_URL}/${slug}/`), `Missing preserved landing page ${slug}`);
}
assert.deepEqual(errors, [], errors.join('\n'));
console.log(JSON.stringify({ htmlPages: files.length, articlePages, sitemapUrls: locations.length, validJsonLdBlocks: schemas, errors: errors.length }));
