// Validate the five November 2026 guides and their complete translations.
// Reads repository/build files only; does not execute article commands.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { loadArticles } from '../lib/articles.mjs';

const slugs = [
  'onedrive-files-on-demand-free-up-space',
  'windows-installer-folder-too-big',
  'docker-wsl-disk-space-windows',
  'clear-chrome-edge-cache-windows',
  'size-vs-size-on-disk-windows',
];
const articles = loadArticles('content/articles');
const oldSlugs = new Set(articles.filter(a => !slugs.includes(a.slug)).map(a => a.slug));
const langs = ['en', 'de', 'fr', 'es', 'ja'];
const results = [];
for (const slug of slugs) {
  const article = articles.find(a => a.slug === slug);
  assert.ok(article, slug);
  assert.equal(Object.keys(article.translations).length, 4, `${slug}: translations`);
  let referenceCommands;
  for (const lang of langs) {
    const a = lang === 'en' ? article : article.translations[lang];
    const file = `content/articles/${slug}${lang === 'en' ? '' : '.' + lang}.md`;
    const raw = fs.readFileSync(file, 'utf8');
    const body = raw.split(/^---\s*$/m).slice(2).join('---');
    assert.ok(a.title.length < 60, `${file}: title length`);
    assert.ok(a.description.length >= 120 && a.description.length <= 155, `${file}: description length`);
    assert.ok(a.date <= '2026-11-23', `${file}: future date`);
    if (lang !== 'ja') assert.ok(a.words >= 700 && a.words <= 1100, `${file}: word count ${a.words}`);
    else assert.ok(body.length > 2500, `${file}: incomplete Japanese translation`);
    assert.equal(a.faq.length, 3, `${file}: FAQ extraction`);
    assert.ok(!/^# /m.test(body), `${file}: duplicate H1`);
    const baselineLinks = new Set([...body.matchAll(/\]\(\/articles\/([^/]+)\/\)/g)].map(m => m[1]).filter(s => oldSlugs.has(s)));
    assert.ok(baselineLinks.size >= 3, `${file}: links to pre-existing articles`);
    const commands = [...body.matchAll(/```[^\n]*\n([\s\S]*?)```/g)].map(m => m[1]);
    if (lang === 'en') referenceCommands = commands;
    else assert.deepEqual(commands, referenceCommands, `${file}: translated commands`);
    const output = `dist/${lang === 'en' ? '' : lang + '/'}articles/${slug}/index.html`;
    const html = fs.readFileSync(output, 'utf8');
    const graph = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1])['@graph'];
    assert.equal(graph.find(s => s['@type'] === 'FAQPage')?.mainEntity.length, 3, `${output}: FAQ schema`);
    assert.equal(graph.find(s => s['@type'] === 'BlogPosting')?.inLanguage, lang, `${output}: schema language`);
    assert.equal((html.match(/class="card"/g) || []).length, 3, `${output}: related articles`);
    for (const target of [...body.matchAll(/\]\(\/articles\/([^/]+)\/\)/g)].map(m => m[1])) {
      const dest = articles.find(x => x.slug === target);
      assert.ok(dest, `${file}: unknown destination ${target}`);
      const prefix = lang !== 'en' && dest.translations[lang] ? '/' + lang : '';
      assert.ok(html.includes(`href="${prefix}/articles/${target}/"`), `${output}: localized link ${target}`);
    }
    const faq = JSON.parse(fs.readFileSync(`content/faq${lang === 'en' ? '' : '.' + lang}.json`, 'utf8'));
    assert.ok(faq.some(f => f.a.includes(`/articles/${slug}/`)), `${file}: inbound FAQ link`);
    results.push({ slug, lang, words: lang === 'ja' ? undefined : a.words, characters: lang === 'ja' ? body.length : undefined });
  }
}
console.log(JSON.stringify({ verifiedPages: results.length, articles: slugs.length, languages: langs, results }, null, 2));
