const { Webhook } = require('standardwebhooks');
const { createHmac } = require('node:crypto');

module.exports.config = { api: { bodyParser: false } };

function config() {
  const environment = process.env.DODO_ENVIRONMENT;
  const isTest = environment === 'test';
  const live = environment === 'live' || environment === 'live_mode';
  if (!(isTest || live)
    || !/^pdt_[A-Za-z0-9]+$/.test(process.env.DODO_PRODUCT_ID || '')
    || !process.env.DODO_PAYMENTS_API_KEY
    || !process.env.DODO_PAYMENTS_WEBHOOK_KEY
    || !process.env.DODO_LICENSE_ENTITLEMENT_ID) return null;
  return {
    productId: process.env.DODO_PRODUCT_ID,
    apiBase: live ? 'https://live.dodopayments.com' : 'https://test.dodopayments.com',
  };
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

async function dodo(base, path, method, body) {
  const response = await fetch(base + path, {
    method,
    redirect: 'error',
    headers: {
      Authorization: 'Bearer ' + process.env.DODO_PAYMENTS_API_KEY,
      'Content-Type': 'application/json',
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
    signal: AbortSignal.timeout(10000),
  });
  return response;
}

function validPayment(payment, dodoConfig = { productId: 'pdt_0NqEVSM3FguQk894qafle' }) {
  const cart = payment && payment.product_cart;
  const discount = Array.isArray(payment && payment.discounts) ? payment.discounts : [];
  return payment
    && payment.status === 'succeeded'
    && discount.length === 0
    && Array.isArray(payment.subscription_ids)
    && payment.subscription_ids.length === 0
    && payment.subscription_id == null
    && Array.isArray(cart)
    && cart.length === 1
    && cart[0].product_id === dodoConfig.productId
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

async function fulfillPendingGrant(grant, dodoConfig) {
  const activeConfig = dodoConfig || config();
  if (!activeConfig) return { status: 503, body: { error: 'Webhook is not configured.' } };
  const paymentResponse = await dodo(activeConfig.apiBase, '/payments/' + encodeURIComponent(grant.payment_id), 'GET');
  if (!paymentResponse.ok) {
    console.error('Could not verify Dodo payment; retrying webhook.');
    return { status: 502, body: { error: 'Payment verification temporarily failed.' } };
  }
  const payment = await paymentResponse.json();
  if (!validPayment(payment, activeConfig)) {
    console.error('Dodo payment did not match configured Windows Clean Pro terms.');
    return { status: 200, body: { received: true, fulfilled: false } };
  }

  const result = await dodo(activeConfig.apiBase, '/grants/' + encodeURIComponent(grant.id) + '/license-key', 'POST', {
    key: keyForGrant(grant.id),
    activations_limit: 1,
  });
  // A replay after a successful fulfillment receives a conflict from Dodo.
  // The same deterministic key is used for every delivery of this grant.
  if (result.ok || result.status === 409) {
    return { status: 200, body: { received: true, fulfilled: true } };
  }
  console.error('Dodo grant fulfillment failed with status', result.status);
  return { status: 502, body: { error: 'License delivery temporarily failed.' } };
}

module.exports = async function webhook(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }
  const dodoConfig = config();
  if (!dodoConfig) return res.status(503).json({ error: 'Webhook is not configured.' });

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
    const outcome = await fulfillPendingGrant(grant, dodoConfig);
    return res.status(outcome.status).json(outcome.body);
  } catch (error) {
    console.error('Dodo webhook processing failed:', error && error.name);
    return res.status(502).json({ error: 'Webhook processing temporarily failed.' });
  }
};

module.exports._test = { config, validPayment, keyForGrant, fulfillPendingGrant };
