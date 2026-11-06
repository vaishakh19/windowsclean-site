# Windows Clean — marketing site

SEO-first React + Vite + Tailwind site. Every language (`/`, `/de/`, `/fr/`, `/es/`, `/ja/`)
is **pre-rendered to static HTML** at build time, so crawlers see the full content, then React hydrates it.

Build output also includes `sitemap.xml` (with hreflang), `robots.txt`, canonical + Open Graph/Twitter tags and JSON-LD.

```bash
npm install
npm run dev      # local dev
npm run build    # -> dist/ (pre-rendered)
npm run preview
```

## Domain
The site URL is `https://www.windowsclean.space` (see `SITE_URL` in `site.config.mjs`; `public/CNAME` is for GitHub Pages).
Canonicals, sitemap, OG tags and the Vite base path all follow it.

## Deploy
Repo → Settings → Pages → Source: **GitHub Actions**. Every push to `main` redeploys.

### DNS (at your domain registrar)
- `www` → CNAME → `vaishakh19.github.io`
- apex `windowsclean.space` → A records `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
- Pages settings → Custom domain `www.windowsclean.space` → Enforce HTTPS
