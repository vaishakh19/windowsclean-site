# Five focused storage guides

Published batch prepared on 2026-11-23, following the user's request for five articles aimed at organic discovery.

## Topic selection

Used the claude-seo content checklist, the existing article inventory, current web search results and primary Microsoft, Google and Docker documentation. No keyword-volume, difficulty, ranking or traffic estimates were available or invented. These are focused gaps in the existing library, not a claim that they are objectively the five highest-volume queries.

| Article slug | Primary reader question | Distinct value and boundary |
|---|---|---|
| onedrive-files-on-demand-free-up-space | How can I free local OneDrive space without deleting cloud files? | Status/action table, sync checks, offline selection and a before/after measurement. Existing articles only mention the feature briefly. |
| windows-installer-folder-too-big | Can I safely shrink C:\Windows\Installer? | Identifies installer cache versus downloads/WinSxS; explains supported maintenance and $PatchCache$ limits without mass-delete instructions. |
| docker-wsl-disk-space-windows | Why does Docker/WSL still occupy Windows space after deleting data? | Separates internal Linux usage from host allocation; read-only diagnosis precedes scoped cleanup and persistent-volume decisions. |
| clear-chrome-edge-cache-windows | How do I clear cache without losing passwords or downloads? | Checkbox consequences, both browsers, profile-specific cautions and measurement rather than automatic daily cleanup. |
| size-vs-size-on-disk-windows | Why do Explorer and storage tools report different sizes? | Diagnostic table separating allocation, cloud placeholders, sparse data, hard links and access limitations. Existing WinSxS/restore guides remain focused on their particular folders. |

Each article has English, German, French, Spanish and Japanese versions. English body counts are 862–971 words; German/French/Spanish versions are 743–944 words. Japanese versions preserve the article scope with approximately 3,100–3,400 characters including Markdown and links; whitespace word counts are not meaningful for Japanese.

## Implementation

- Added 25 Markdown files, dated 2026-11-23, with titles under 60 characters and descriptions of 120–155 characters.
- Each version has at least three links to pre-existing articles, linked primary sources and three closing FAQ questions.
- Added five discovery questions to each existing language FAQ, linking to the new guides. Prior questions and answers are unchanged.
- Extended FAQ extraction to recognize the four translated section headings, so the markup represents the visible questions in each language. This markup is not presented as a guarantee of a Google rich result.
- Reused the existing TOC, related cards, BlogPosting, social metadata, canonical/hreflang, sitemap, RSS and llms.txt generation. No new parallel SEO system.
- Existing article Markdown and translations are unchanged. No consolidation redirects, installer changes, checkout changes or site configuration changes.
- Product mentions are limited to the documented free offline scan and its views. No invented credentials, first-hand testing claims, product features, ratings or traffic results.

## Validation before release

`npm run build`, `node scripts/verify-seo.mjs` and `node scripts/verify-new-articles.mjs` passed.

- 30 English articles, 64 translations, 94 article pages.
- 113 HTML pages including 404; 112 sitemap URLs; all 113 JSON-LD blocks parse.
- All internal links and referenced local assets resolve in the build.
- New pages have one H1, complete language alternates, localized internal links with English fallback, three related cards and three FAQ entities.
- Commands in fenced blocks are identical across all translations. They are article content and were not executed.
- The separate content review identified and resolved a missing third link to the existing library and Chrome citations requiring an explicit desktop-platform selector.

Visual limitation: a new native-browser review was attempted but stopped because the computer-use tool could not determine Chrome's current URL confidently. No new visual pass is claimed. The page templates and CSS are unchanged from the earlier mobile review.

## Release verification

Content commit `75df3096c428e71e18f35cfdceb35e6dc6a705fb` deployed to production in Vercel deployment `dpl_4AyynZCDeg8nuvf71J4Ntu6R3Lxx`, which reached READY.

The post-publication crawl checked the public custom domain, respecting its robots policy, with five simultaneous requests and a one-second delay between batches. All 112 sitemap URLs returned HTTP 200 with one title, description and correct canonical. Their JSON-LD parsed successfully. All 25 new article pages had one H1, complete hreflang, three FAQ entities, TOC and related cards. The sitemap continues to return `application/xml; charset=utf-8` and preserves all 87 URLs from the prior audit.

A source comparison also confirmed that all 69 pre-existing article files are unchanged and each language FAQ retains its original answers, with exactly five additions.

## Measurement after publication

Review these page paths in Search Console after Google has had time to crawl them. Compare impressions, relevant queries, clicks and indexed-page status over comparable periods. Avoid treating publication or successful crawling as proof of rankings. Use observed queries to choose future updates; do not create more articles with the same intent merely to increase page count.
