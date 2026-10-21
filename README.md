# Windows Clean website

Static pages and Vercel serverless functions for Windows Clean. Dodo configuration in this repository is intentionally pinned to the supplied **test** product and test API host. Do not add live credentials or change an endpoint to live without the owner's approval.

## Vercel setup

Connect this repository to Vercel with the repository root as the project root. Vercel serves the root HTML files and deploys the `api/` directory as Node.js functions. Set these Vercel environment variables for the **Preview and Production deployments that you intend to use for test checkout only**:

| Variable | Value |
| --- | --- |
| `DODO_ENVIRONMENT` | `test` |
| `DODO_PRODUCT_ID` | `pdt_0NqEVSM3FguQk894qafle` |
| `DODO_PAYMENTS_API_KEY` | Test-mode API key from Dodo (secret) |
| `DODO_PAYMENTS_WEBHOOK_KEY` | Signing secret for the Dodo test webhook (secret) |
| `DODO_LICENSE_ENTITLEMENT_ID` | ID of the attached manual License Key entitlement |

Never place either secret in Git, the website JavaScript, or the desktop app.

In Dodo test mode, configure the product as a one-time **$12.99 USD** payment and attach a **License Key** entitlement with manual fulfillment, no expiration, and activation limit **1**. Record its entitlement ID in Vercel. Create a test-mode webhook for `https://windowsclean.space/api/webhook` subscribed to `entitlement_grant.created`, then copy its signing secret to Vercel. Manual fulfillment is intentional: the signed pending-grant event triggers a server-side payment lookup, and the key is fulfilled only if Dodo reports a succeeded one-time payment for this exact product and amount. Dodo emails the key after the grant fulfillment.

Redeploy after adding environment variables. Until all test settings exist, checkout and webhook routes fail closed. The backend always calls `https://test.dodopayments.com`; checkout responses are accepted only from `https://test.checkout.dodopayments.com`.

## Test

Run `npm test` to check the server's product, amount, currency, billing type, and replay-key rules. A real test purchase still requires the Dodo dashboard configuration and test secrets above. After deployment, complete a test purchase, confirm the Dodo email key activates in the Pro app, replay the same webhook and verify it does not mint another grant/key, and try the same key on a second device to confirm Dodo rejects activation at the one-device limit.

The success page only says that payment is being confirmed; the browser redirect is never treated as proof of payment. The test checkout button is labeled as test mode. Live checkout and live credentials are not implemented here.
