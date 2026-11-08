# Windows Clean — launch & SEO playbook

Adapted from the DissectMac guide for a Windows app. Do it in this order.

## 1. Already built into the site (nothing to do)
| Guide item | Windows Clean |
|---|---|
| One page per search | `content/articles/*.md`, one file = one page |
| Fast site | pre-rendered HTML, WebP screenshots, lazy images (Lighthouse mobile test: Performance 90, Accessibility 100, SEO 100) |
| Schema markup | SoftwareApplication, Organization, BlogPosting, BreadcrumbList, FAQPage |
| Direct answers for AI search | `/faq/` page (edit `content/faq.json`) + `llms.txt` |
| Sitemap + robots | `/sitemap.xml`, `/robots.txt` (auto-updated on every build) |
| IndexNow | key file + `.github/workflows/indexnow.yml` pings search engines after each push |
| International | English page + DE/FR/ES/JA pages with hreflang |

## 2. One-time setup (30 minutes)
1. **Google Search Console** -> add `windowsclean.space` (Domain, DNS TXT) -> Sitemaps -> submit `https://www.windowsclean.space/sitemap.xml` -> URL Inspection -> Request indexing for `/`, `/faq/`, and your first article.
2. **Bing Webmaster Tools** -> "Import from Google Search Console" (ChatGPT search uses Bing).
3. **PageSpeed Insights** (pagespeed.web.dev) -> test `https://www.windowsclean.space/` on Mobile and Desktop. Note the scores.
4. Make sure the GitHub repo has Actions enabled (Settings -> Actions -> allow) so the IndexNow workflow can run.

## 3. Directories and launch sites (one weekend)
Write a **different** description for each. Copy-pasted text gets removed.

Launch platforms: Product Hunt, Hacker News (Show HN), Indie Hackers, BetaList, Uneed, Fazier, Microlaunch, Peerlist Projects.

Windows software directories: AlternativeTo (list it as an alternative to WinDirStat, WizTree and TreeSize), Softpedia, MajorGeeks, Uptodown (Windows), FileHorse, Neowin Software, SaaSHub, Slant. G2 and Capterra later, once you have real users to review.

Notes
- Some download sites scan installers and may flag or reject an unsigned one. If so, mention the SHA-256 and the SmartScreen FAQ in your submission.
- Reddit (r/software, r/windows, r/Windows11, r/DataHoarder): read each sub's rules first. Many ban self-promotion from new accounts. Be a real member for a few weeks, then post honestly.

### Description kit (change the wording for each site)
- One line: "Windows Clean is a free, offline disk space analyzer for Windows 10 and 11 that shows what is using your drive."
- Short: "Scan a drive and explore it as a sunburst, treemap or file list. Find large files and duplicates by SHA-256. No account, no telemetry, no admin rights."
- Honest extras to mention: Pro is a one-time $12.99, no subscription; the installer is not code-signed yet.

## 4. Optional: an AI SEO audit with claude-seo
The DissectMac guide uses the third-party `claude-seo` plugin for Claude Code (https://github.com/AgriciDaniel/claude-seo). It needs the Claude Code command line. Read its code before installing a third-party plugin. If you use it:
```
/plugin marketplace add AgriciDaniel/claude-seo
/plugin install claude-seo@agricidaniel-claude-seo
/seo audit https://www.windowsclean.space
```
Fix only the few most important findings, wait two weeks, then run it again.

## 5. Every week (20 minutes)
- Publish one article (`content/articles/`).
- Search Console -> Performance: note the searches that bring people, and write the next article about them.
- Add one new directory or community post.
