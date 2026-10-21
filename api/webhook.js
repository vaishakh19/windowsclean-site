const { Webhook } = require('standardwebhooks');
const { createHmac } = require('node:crypto');

const PRODUCT_ID = 'pdt_0NqEVSM3FguQk894qafle';
const API_BASE = 'https://test.dodopayments.com';

module.exports.config = { api: { bodyParser: false } };

function ready() {
  return process.env.DODO_ENVIRONMENT === 'test'
    && process.env.DODO_PRODUCT_ID === PRODUCT_ID
    && Boolean(process.env.DODO_PAYMENTS_API_KEY)
    && Boolean(process.env.DODO_PAYMENTS_WEBHOOK_KEY)
    && Boolean(process.env.DODO_LICENSE_ENTITLEMENT_ID);
}

async function rawBody(req) {
  const chunks = [];
  let size = 0;
  for await (const chunk of req) {
    size += chunk.length;
    if (size > 1024 * 1024) throw new Error('Webhook body too large');
    chunks.push(Buffer.from(chunk));
  }
  return Buffer.concat(chunks).toString('utf8');
}

async function dodo(path, method, body) {
  const response = await fetch(API_BASE + path, {
    method,
    headers: {
      Authorization: 'Bearer ' + process.env.DODO_PAYMENTS_API_KEY,
      'Content-Type': 'application/json',
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
    signal: AbortSignal.timeout(10000),
  });
  return response;
}

function validPayment(payment) {
  const cart = payment && payment.product_cart;
  const tax = Number(payment && payment.tax || 0);
  const discount = Array.isArray(payment && payment.discounts) ? payment.discounts : [];
  return payment
    && payment.status === 'succeeded'
    && payment.currency === 'USD'
    && payment.total_amount - tax === 1299
    && discount.length === 0
    && Array.isArray(payment.subscription_ids)
    && payment.subscription_ids.length === 0
    && payment.subscription_id == null
    && Array.isArray(cart)
    && cart.length === 1
    && cart[0].product_id === PRODUCT_ID
    && cart[0].quantity === 1;
}

// Deterministic per-grant key: webhook retries ask Dodo to fulfill the same grant
// with the same value, so concurrent/replayed delivery cannot mint a second key.
function keyForGrant(grantId) {
  const digest = createHmac('sha256', process.env.DODO_PAYMENTS_API_KEY)
    .update('windowsclean-pro:' + grantId)
    .digest('hex')
    .toUpperCase();
  return 'WC1-' + digest.match(/.{1,5}/g).slice(0, 5).join('-');
}

module.exports = async function webhook(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }
  if (!ready()) return res.status(503).json({ error: 'Webhook is not configured.' });

  let event;
  try {
    const body = await rawBody(req);
    const verifier = new Webhook(process.env.DODO_PAYMENTS_WEBHOOK_KEY);
    event = verifier.verify(body, {
      'webhook-id': req.headers['webhook-id'],
      'webhook-signature': req.headers['webhook-signature'],
      'webhook-timestamp': req.headers['webhook-timestamp'],
    });
  } catch {
    return res.status(401).json({ error: 'Invalid webhook signature.' });
  }

  if (event.type !== 'entitlement_grant.created') {
    return res.status(200).json({ received: true });
  }

  const grant = event.data;
  if (!grant || grant.integration_type !== 'license_key'
      || grant.entitlement_id !== process.env.DODO_LICENSE_ENTITLEMENT_ID
      || grant.status !== 'Pending' || grant.license_key
      || !grant.id || !grant.payment_id) {
    return res.status(200).json({ received: true });
  }

  try {
    const paymentResponse = await dodo('/payments/' + encodeURIComponent(grant.payment_id), 'GET');
    if (!paymentResponse.ok) {
      console.error('Could not verify Dodo payment; retrying webhook.');
      return res.status(502).json({ error: 'Payment verification temporarily failed.' });
    }
    const payment = await paymentResponse.json();
    if (!validPayment(payment)) {
      console.error('Dodo payment did not match Windows Clean Pro test terms.');
      return res.status(200).json({ received: true, fulfilled: false });
    }

    const result = await dodo('/grants/' + encodeURIComponent(grant.id) + '/license-key', 'POST', {
      key: keyForGrant(grant.id),
      activations_limit: 1,
    });
    // A replay after a successful fulfillment receives a conflict from Dodo.
    // The same deterministic key is used for every delivery of this grant.
    if (result.ok || result.status === 409) {
      return res.status(200).json({ received: true, fulfilled: true });
    }
    console.error('Dodo grant fulfillment failed with status', result.status);
    return res.status(502).json({ error: 'License delivery temporarily failed.' });
  } catch (error) {
    console.error('Dodo webhook processing failed:', error && error.name);
    return res.status(502).json({ error: 'Webhook processing temporarily failed.' });
  }
};

module.exports._test = { validPayment, keyForGrant };
