# Windows Clean SEO audit

Audit date: 2026-11-23 (Asia/Calcutta). Target: https://www.windowsclean.space.

## Scope and method

Used the `seo` and `seo-audit` SKILL.md checklists read directly from `D:\claude-seo-main.zip`. No bundled third-party script was executed or installed. Checked live HTTP responses and HTML, local source and generated pages. This pass is limited to important SEO fixes, per the user's clarification; no new articles, FAQ entries, rewrites or consolidation redirects.

Business: downloadable Windows utility with free and paid editions, supported by an editorial library. Core Web Vitals, search rankings, traffic, backlinks and Google index coverage are not measured; no numerical SEO score is claimed without those data.

## Baseline before Step 1

- `git pull --ff-only`: already up to date at `d2926a5` on main; working tree clean.
- `npm install --ignore-scripts`: dependencies current, zero reported vulnerabilities. Package build commands and prerender code were inspected before execution.
- `npm run build`: passed on Node 22.18.0. 25 English articles, 44 translations, 69 article pages; FAQ and index in five languages.
- Live robots.txt allows crawling and points at the correct sitemap.
- Live sitemap returns HTTP 200 with `Content-Type: application/xml`.
- Live and local output differ: live still has the three landing pages, while local HEAD no longer generates them. Earlier implementation is preserved in git commit `08ff330`.
- Local code already implements TOC, related articles, localized UI, richer BlogPosting and SoftwareApplication, article social metadata, CollectionPage/ItemList, localized article links, updated lastmod, category grouping in llms.txt, and noindex on 404. Reuse these implementations.

## Prioritized findings and actions

1. **High — preserve live landing URLs before deployment.** `/windows-disk-space-analyzer/`, `/find-large-files-windows/`, and `/free-up-disk-space-windows/` are absent from the local generator. Restore their existing generator from history, including sitemap and llms.txt entries. Failure check: any URL fails to generate, disappears from sitemap or fails live HTTP 200. Monitor these URLs in Search Console after release.
2. **Medium — live output lacks already-built SEO fixes.** Deploy the verified existing changes rather than reimplement them. The existing local 404 rule removes canonical/hreflang and sets noindex,follow. Failure check: live article metadata or 404 HTML still differs after deployment.
3. **Medium — article heading hierarchy.** Some existing Markdown bodies contain an H1 in addition to the template's title. Normalize body H1 headings during rendering without editing original articles. Failure check: generated articles have more than one H1 or duplicate anchor IDs.
4. **Medium — competing article intent (editorial decision deferred).** C-drive, AppData, restore-point and cleanup-tool clusters overlap. Preserve all articles and URLs; propose consolidations below. Search Console query/landing-page data is needed to choose survivors with confidence.
5. **Medium — existing translation quality.** Several translations include multilingual placeholder headings and very short generic text. Record for a separately authorized editorial pass; do not rewrite them here.
6. **Low — title suffix threshold.** Current check omits the three separator characters. Count the complete proposed title before deciding whether to append the brand.

## Proposed consolidation options (not implemented)

- Keep `c-drive-full` and merge unique advice from `c-drive-full-windows` and `c-drive-full-windows-11`, then 301 the retired English URLs. Alternatively retain a clearly distinct Windows-11-only guide after editorial review.
- Keep multilingual `appdata-using-space`; merge unique advice from `appdata-folder-too-big`, then 301 the retired URL.
- Keep `system-restore-points-disk-space`; merge unique shadow-copy coverage from `system-volume-information-restore-points`, then 301 that URL.
- Review `storage-sense-vs-disk-cleanup` against `disk-cleanup-vs-storage-sense-vs-disk-analyzer`; either merge or explicitly differentiate the analyzer comparison.
- Keep dedicated `hiberfil-sys-explained` and `pagefile-sys-explained`; assess unique swapfile material in `hiberfil-sys-pagefile-sys-explained` before selecting a merge destination. Do not blanket-redirect to an unrelated topic.
- The two task-focused top-level landing pages also overlap article intents. Preserve them as explicitly requested; decide their longer-term relationship using search data.

## Before / after

Pending implementation and live verification. Do not interpret local checks as a successful deployment.

## Article inventory before changes

| Slug | Title | Category | Languages |
|---|---|---|---|
| move-files-to-another-drive-windows | How to Move Files to Another Drive on Windows | Windows Storage | en, de, es, fr, ja |
| free-up-disk-space-windows | How to Free Up Disk Space on Windows Safely | Windows Storage | en, de, es, fr, ja |
| find-large-files-windows | How to Find Large Files on Windows 10 and 11 | Windows Storage | en, de, es, fr, ja |
| disk-cleanup-vs-storage-sense-vs-disk-analyzer | Storage Sense vs Disk Cleanup vs a disk space analyzer | Guides | en,  |
| delete-temporary-files-windows | How to Delete Temporary Files on Windows Safely | Windows Storage | en, de, es, fr, ja |
| delete-old-downloads-windows | How to Delete Old Downloads on Windows | Windows Storage | en, de, es, fr, ja |
| clean-windows-update-files | How to Clean Windows Update Files Safely | Windows Storage | en, de, es, fr, ja |
| c-drive-full | C Drive Full on Windows: What to Check First | Windows Storage | en, de, es, fr, ja |
| appdata-using-space | AppData Folder Using Too Much Space? What to Do | Windows Storage | en, de, es, fr, ja |
| system-volume-information-restore-points | System Volume Information too big? Shrink restore points | Storage Tips | en,  |
| system-restore-points-disk-space | System Restore points: how much disk space they use | Storage Tips | en,  |
| storage-sense-vs-disk-cleanup | Storage Sense vs Disk Cleanup: which should you use? | Guides | en,  |
| pagefile-sys-explained | What is pagefile.sys, and should you move or disable it? | Storage Tips | en,  |
| hiberfil-sys-explained | What is hiberfil.sys and can you delete it? | Storage Tips | en,  |
| c-drive-full-windows | C drive full? 10 safe ways to free space on Windows | Storage Tips | en,  |
| best-disk-space-analyzers-windows | Best free disk space analyzers for Windows compared | Guides | en,  |
| appdata-folder-too-big | AppData folder too big? What is safe to clean | Storage Tips | en,  |
| find-duplicate-files-windows | Find and remove duplicate files on Windows (by content) | Guides | en, de, es, fr, ja |
| windows-old-folder-delete | Windows.old folder: can you delete it, and how? | Storage Tips | en,  |
| hiberfil-sys-pagefile-sys-explained | hiberfil.sys, pagefile.sys and swapfile.sys: what they are | Storage Tips | en,  |
| c-drive-full-windows-11 | C drive full on Windows 10/11? Find what is using space | Guides | en,  |
| why-is-winsxs-so-big | Why is the WinSxS folder so big, and is it safe to clean? | Storage Tips | en, de, es, fr, ja |
| gamer-guide-reclaim-game-space | Free up space from huge game installs (Steam, Epic, Xbox) | Guides | en,  |
| sunburst-vs-treemap-vs-file-list | Sunburst vs treemap vs file list: which disk view to use | Guides | en,  |
| recycle-bin-disk-space | Recycle Bin disk space: why deleted files still use storage | Storage Tips | en, de, es, fr, ja |
