// Canonical site URL (domain). Override at build time: SITE_URL=https://example.com npm run build
export const SITE_URL = (process.env.SITE_URL || "https://www.windowsclean.space").replace(/\/$/, "");
export const SITE_NAME = "Windows Clean";
export const LANGS = ["en", "de", "fr", "es", "ja"];

// >>> DOWNLOAD LINK <<<  The installer is served from YOUR domain: public/download/Windows-Clean-setup.exe
// (the app repo's release workflow drops it there - see docs/publish-installer-to-site-step.yml).
export const DOWNLOAD_FILE = "Windows-Clean-setup.exe";
export const SUPPORT_EMAIL = "vaishakhdesktop@gmail.com";
export const SHA_URL = `${SITE_URL}/download/SHA256SUMS.txt`;
export const DOWNLOAD_URL = `${SITE_URL}/download/${DOWNLOAD_FILE}`;

// >>> PRO CHECKOUT <<<  Paste your Dodo hosted checkout URL (https://checkout.dodopayments.com/...) once Pro is
// live. While empty, the "Get Pro" button just shows "coming soon" and nobody can buy a product that doesn't exist yet.
export const CHECKOUT_URL = "https://checkout.dodopayments.com/buy/pdt_0NqUxj3xKQdTRco31F7Lo?quantity=1";
