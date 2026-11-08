# Windows Clean — marketing site

SEO-first React + Vite + Tailwind site. Every page is **pre-rendered to static HTML** at build time
(crawlers see full content), including 5 languages, articles, sitemap, RSS and structured data.

```bash
npm install
npm run dev      # local dev
npm run build    # -> dist/
```

## Add an article (this is all you do)
1. Create `content/articles/your-title-here.md` (the file name becomes the URL: `/articles/your-title-here/`).
2. Start it with this header, then write in Markdown:

```md
---
title: "Your SEO title (aim for under 60 characters)"
description: "One or two sentences for Google (aim for 120-155 characters)."
date: 2026-11-10
category: Guides
image: /articles/my-cover.jpg      # optional, put the file in public/articles/
---

Your text here. Use ## for headings, **bold**, lists, `code` and ``` code blocks ```.
```

3. Commit and push to `main`. The site rebuilds and the article is live, listed on the homepage and
   `/articles/`, added to `sitemap.xml` and `feed.xml`.

Add `draft: true` to the header to keep an article unpublished. You can also create files directly on
github.com (Add file → Create new file) without touching your computer.

## SEO extras
- **FAQ page:** edit `content/faq.json` (a list of `q` / `a` pairs). It becomes `/faq/` with FAQ schema.
- **IndexNow:** `.github/workflows/indexnow.yml` tells Bing and others about new pages after each push. The key file in `public/` must stay.
- **llms.txt:** generated automatically on every build.
- Full checklist: `docs/LAUNCH-PLAYBOOK.md`.

## Download button and Pro button
The Download button saves `https://www.windowsclean.space/download/Windows-Clean-setup.exe` directly. The file is
served from this site (`public/download/`), so visitors never see GitHub. Two ways to put the file there:
- **Automatic:** paste `docs/publish-installer-to-site-step.yml` into the private app repo's `release.yml`
  (setup steps are inside). Every release tag then updates the site's installer and redeploys.
- **Manual (first release):** copy `Windows-Clean-setup.exe` and `SHA256SUMS.txt` into `public/download/`, commit, push.
GitHub limits a file to 100 MB; if the installer ever outgrows that, host it on Cloudflare R2 instead.

`CHECKOUT_URL` in `site.config.mjs` is your Dodo hosted checkout link. Leave it empty until Pro is live
(the button then shows "coming soon").

## Deploy (Vercel)
1. Push this repo to GitHub, then Vercel -> Add New -> Project -> import it (Framework: Vite is auto-detected; `vercel.json` sets the rest).
2. Project -> Settings -> Domains -> add `www.windowsclean.space` (and `windowsclean.space`, set to redirect to www). Add the DNS records Vercel shows you.
3. Every push to `main` redeploys. Adding an article or a new installer = commit + push.
