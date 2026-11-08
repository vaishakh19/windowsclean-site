// Tells Bing/Yandex/others (via IndexNow) that the site's pages are new or changed.
// Usage: node scripts/indexnow.mjs        (reads the LIVE sitemap, so run it after a deploy)
import fs from "node:fs";
import { SITE_URL } from "../site.config.mjs";

const key = fs.readdirSync("public").find((f) => /^[0-9a-f]{32}\.txt$/.test(f))?.replace(".txt", "");
if (!key) throw new Error("No IndexNow key file (32 hex chars .txt) found in public/");

const xml = await (await fetch(`${SITE_URL}/sitemap.xml`)).text();
const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (!urlList.length) throw new Error("Live sitemap has no URLs - is the site deployed?");

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: new URL(SITE_URL).host, key, keyLocation: `${SITE_URL}/${key}.txt`, urlList }),
});
console.log(`IndexNow: submitted ${urlList.length} URLs -> HTTP ${res.status}`);
if (res.status >= 400) process.exit(1);
