# Privacy-conscious website analytics

Windows Clean ships with analytics disabled. This preserves the site's current no-telemetry, no-cookie visitor experience.

If aggregate website measurement is needed, configure a cookie-free analytics endpoint only at build time:

```text
ANALYTICS_DOMAIN=www.windowsclean.space
ANALYTICS_SCRIPT_URL=https://analytics.example.com/js/script.js
npm run build
```

Use a provider or self-hosted setup that does not collect advertising identifiers, fingerprint visitors, replay sessions, or create cross-site profiles. Configure the provider to respect browser privacy signals and to retain aggregate data only as long as necessary.

Recommended measurements:

- Page views and referrers for the homepage, FAQ, articles, and search-intent pages.
- Aggregate download-link clicks, only if the selected tool can record this without personal data.
- Search Console impressions, clicks, indexing status, and queries.

Do not measure local scan content, file names, drive sizes, or any activity inside the Windows desktop app. Those remain outside website analytics.
