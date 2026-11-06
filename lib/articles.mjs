// Reads content/articles/*.md  ->  [{ slug, title, description, date, category, minutes, image, draft, html }]
import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";

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

export function loadArticles(dir, { includeDrafts = false, withHtml = true } = {}) {
  if (!fs.existsSync(dir)) return [];
  const out = [];
  for (const file of fs.readdirSync(dir).filter((f) => f.endsWith(".md")).sort()) {
    const { data, body } = parseFrontmatter(fs.readFileSync(path.join(dir, file), "utf8"));
    const draft = String(data.draft).toLowerCase() === "true";
    if (draft && !includeDrafts) continue;
    const slug = file.replace(/\.md$/, "");
    const words = body.split(/\s+/).filter(Boolean).length;
    if (!data.title || !data.description || !data.date)
      throw new Error(`content/articles/${file}: needs title, description and date in the frontmatter`);
    out.push({
      slug,
      title: data.title,
      description: data.description,
      date: data.date,
      category: data.category || "Guides",
      image: data.image || "",
      minutes: Math.max(1, Math.round(words / 200)),
      ...(withHtml ? { html: marked.parse(body) } : {}),
    });
  }
  return out.sort((a, b) => (a.date < b.date ? 1 : -1)); // newest first
}
