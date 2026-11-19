# Windows Clean organic-growth implementation

## Trust and download conversion

- Replaced unverified audience and testimonial-style claims on the English homepage with transparent, review-first guidance.
- Clarified that scans are read-only and that actions happen only after a user chooses them.
- Changed duplicate-finder language to describe potential results and require review.
- Replaced automatic SmartScreen-bypass advice with a verify-first flow using the published SHA-256 hash and support contact.
- Removed the non-functional email capture control. Visitors can contact support instead.

## Organic search

Added three static, canonical search-intent pages and placed them in the sitemap and `llms.txt`:

- `/windows-disk-space-analyzer/`
- `/find-large-files-windows/`
- `/free-up-disk-space-windows/`

The homepage links to each page. Each guide offers useful, safety-focused advice, internal calls to action, and WebPage/Breadcrumb structured data.

## Analytics and privacy

- Analytics remain disabled by default.
- A build-time, opt-in hook accepts a cookie-free analytics script and domain only when both are deliberately configured.
- `docs/ANALYTICS.md` documents permitted aggregate measurements and explicitly excludes all desktop-app/file data.

## Before publishing

1. Code-sign the Windows installer, then revise the SmartScreen text to reflect the signed release.
2. Confirm every product feature statement against the shipping app, especially duplicate matching and deletion protections.
3. Publish a user-facing privacy policy if analytics are enabled.
4. Submit the generated sitemap in Google Search Console and monitor coverage and query performance.
