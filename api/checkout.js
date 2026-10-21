const PRODUCT_ID = 'pdt_0NqEVSM3FguQk894qafle';
const API_BASE = 'https://test.dodopayments.com';
const SITE = 'https://windowsclean.space';

function ready() {
  return process.env.DODO_ENVIRONMENT === 'test'
    && process.env.DODO_PRODUCT_ID === PRODUCT_ID
    && Boolean(process.env.DODO_PAYMENTS_API_KEY);
}

module.exports = async function checkout(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }
  if (!ready()) return res.status(503).json({ error: 'Test checkout is not configured.' });

  try {
    const response = await fetch(API_BASE + '/checkouts', {
      method: 'POST',
      redirect: 'error',
      headers: {
        Authorization: 'Bearer ' + process.env.DODO_PAYMENTS_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        product_cart: [{ product_id: PRODUCT_ID, quantity: 1 }],
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
    if (!url || url.protocol !== 'https:' || url.hostname !== 'test.checkout.dodopayments.com') {
      console.error('Dodo returned a checkout URL outside the test host.');
      return res.status(502).json({ error: 'Checkout is temporarily unavailable.' });
    }
    return res.status(200).json({ checkoutUrl: url.href });
  } catch (error) {
    console.error('Dodo checkout request failed:', error && error.name);
    return res.status(502).json({ error: 'Could not start checkout. Please try again.' });
  }
};
