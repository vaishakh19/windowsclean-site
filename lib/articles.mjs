// Reads content/articles/*.md  ->  one entry per article, with translations attached.
//   how-to.md          English original (required)
//   how-to.de.md       German translation   (.fr .es .ja likewise, all optional)
import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";

const LANG_FILE = /^(.+)\.(de|fr|es|ja)\.md$/;

function parseFrontmatter(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) return { data: {}, body: raw };
  const data = {};
  for (const line of m[1].split(/\r?\n/)) {
    const i = line.indexOf(":");
    if (i < 1) continue;
    let v = line.slice(i + 1).trim();
    if (/^(".*"|'.*')$/.test(v)) v = v.slice(1, -1);
    data[line.slice(0, i).trim()] = v;
  }
  return { data, body: m[2] };
}

const slugify = (t) => t.toLowerCase().replace(/<[^>]+>/g, "").replace(/&[a-z]+;/g, "").replace(/[^\p{L}\p{N}]+/gu, "-").replace(/^-|-$/g, "") || "section";

// Adds id="" to every <h2> (anchor links + table of contents) and returns the heading list.
function addHeadingIds(html) {
  const toc = [], used = new Set();
  const out = html.replace(/<h2>([\s\S]*?)<\/h2>/g, (m, inner) => {
    let id = slugify(inner), n = 2;
    while (used.has(id)) id = `${slugify(inner)}-${n++}`;
    used.add(id);
    toc.push({ id, text: inner.replace(/<[^>]+>/g, "") });
    return `<h2 id="${id}">${inner}</h2>`;
  });
  return { html: out, toc };
}

// "## Frequently asked questions" + "### Question?" + answer paragraphs  ->  [{q, a}] for FAQPage schema.
function extractFaq(body) {
  const m = body.match(/^## (?:FAQ|Frequently asked questions|Quick answers|Häufig gestellte Fragen|Questions fréquentes|Preguntas frecuentes|よくある質問)[^\n]*\n([\s\S]*?)(?=^## |$(?![\s\S]))/im);
  if (!m) return [];
  return m[1].split(/^### /m).slice(1).map((blk) => {
    const [q, ...rest] = blk.split("\n");
    return { q: q.trim(), a: rest.join(" ").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/[*`]/g, "").replace(/\s+/g, " ").trim() };
  }).filter((f) => f.q && f.a);
}

export function loadArticles(dir, { withHtml = true } = {}) {
  if (!fs.existsSync(dir)) return [];
  const bySlug = {};
  for (const file of fs.readdirSync(dir).filter((f) => f.endsWith(".md")).sort()) {
    const m = file.match(LANG_FILE);
    const slug = m ? m[1] : file.replace(/\.md$/, "");
    const lang = m ? m[2] : "en";
    const { data, body } = parseFrontmatter(fs.readFileSync(path.join(dir, file), "utf8"));
    if (String(data.draft).toLowerCase() === "true") continue;
    if (!data.title || !data.description || !data.date)
      throw new Error(`content/articles/${file}: needs title, description and date in the frontmatter`);
    const words = body.replace(/```[\s\S]*?```/g, "").split(/\s+/).filter(Boolean).length;
    // Japanese has no spaces, so count characters instead
    const minutes = Math.max(1, Math.round(lang === "ja" ? body.length / 450 : words / 200));
    (bySlug[slug] ||= {})[lang] = {
      title: data.title, description: data.description, date: data.date,
      category: data.category || "Guides", image: data.image || "", minutes, words, updated: data.updated || data.date,
      // The template owns the page H1. Preserve body headings as section headings.
      ...(withHtml ? { ...(({ html, toc }) => ({ html, toc }))(addHeadingIds(marked.parse(body).replace(/<(\/?)h1>/g, "<$1h2>"))), faq: extractFaq(body) } : {}),
    };
  }
  const out = [];
  for (const [slug, langs] of Object.entries(bySlug)) {
    if (!langs.en) throw new Error(`content/articles/${slug}.<lang>.md has no English original ${slug}.md`);
    const { en, ...translations } = langs;
    for (const t of Object.values(translations)) t.image ||= en.image;
    out.push({ slug, ...en, translations });
  }
  return out.sort((a, b) => (a.date < b.date ? 1 : -1)); // newest first
}
