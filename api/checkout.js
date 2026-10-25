const SITE = 'https://windowsclean.space';

function config() {
  const environment = process.env.DODO_ENVIRONMENT;
  const live = environment === 'live' || environment === 'live_mode';
  if (!(environment === 'test' || live)
      || !/^pdt_[A-Za-z0-9]+$/.test(process.env.DODO_PRODUCT_ID || '')
      || !process.env.DODO_PAYMENTS_API_KEY) return null;
  return {
    productId: process.env.DODO_PRODUCT_ID,
    apiBase: live ? 'https://live.dodopayments.com' : 'https://test.dodopayments.com',
    checkoutHost: live ? 'checkout.dodopayments.com' : 'test.checkout.dodopayments.com',
  };
}

module.exports = async function checkout(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }
  const dodo = config();
  if (!dodo) return res.status(503).json({ error: 'Checkout is not configured.' });

  try {
    const response = await fetch(dodo.apiBase + '/checkouts', {
      method: 'POST',
      redirect: 'error',
      headers: {
        Authorization: 'Bearer ' + process.env.DODO_PAYMENTS_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        product_cart: [{ product_id: dodo.productId, quantity: 1 }],
        return_url: SITE + '/success.html',
        cancel_url: SITE + '/cancel.html',
      }),
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) {
      console.error('Dodo checkout creation failed with status', response.status);
      return res.status(502).json({ error: 'Could not start checkout. Please try again.' });
    }
    const session = await response.json();
    let url;
    try { url = new URL(session.checkout_url); } catch { url = null; }
    if (!url || url.protocol !== 'https:' || url.hostname !== dodo.checkoutHost) {
      console.error('Dodo returned a checkout URL outside the configured host.');
      return res.status(502).json({ error: 'Checkout is temporarily unavailable.' });
    }
    return res.status(200).json({ checkoutUrl: url.href });
  } catch (error) {
    console.error('Dodo checkout request failed:', error && error.name);
    return res.status(502).json({ error: 'Could not start checkout. Please try again.' });
  }
};

module.exports._test = { config };
