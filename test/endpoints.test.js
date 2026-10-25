const test = require('node:test');
const assert = require('node:assert/strict');
const { PassThrough } = require('node:stream');
const { Webhook } = require('standardwebhooks');

const checkout = require('../api/checkout');
const webhook = require('../api/webhook');
const { fulfillPendingGrant } = webhook._test;

const originalEnvironment = { ...process.env };
const originalFetch = global.fetch;

function configureTestEnvironment() {
  process.env.DODO_ENVIRONMENT = 'test';
  process.env.DODO_PRODUCT_ID = 'pdt_0NqEVSM3FguQk894qafle';
  process.env.DODO_PAYMENTS_API_KEY = 'test-server-secret';
  process.env.DODO_PAYMENTS_WEBHOOK_KEY = 'whsec_dGVzdC1zZWNyZXQ=';
  process.env.DODO_LICENSE_ENTITLEMENT_ID = 'ent_test_license';
}

function resetEnvironment() {
  for (const key of Object.keys(process.env)) delete process.env[key];
  Object.assign(process.env, originalEnvironment);
  global.fetch = originalFetch;
}

function response() {
  return {
    headers: {},
    statusCode: null,
    body: null,
    setHeader(name, value) { this.headers[name] = value; },
    status(code) { this.statusCode = code; return this; },
    json(body) { this.body = body; return this; },
  };
}

function request(method, body = '', headers = {}) {
  const req = new PassThrough();
  req.method = method;
  req.headers = headers;
  req.end(body);
  return req;
}

function payment() {
  return {
    status: 'succeeded', currency: 'USD', total_amount: 1299, tax: 0,
    discounts: [], subscription_ids: [], subscription_id: null,
    product_cart: [{ product_id: 'pdt_0NqEVSM3FguQk894qafle', quantity: 1 }],
  };
}

test.afterEach(resetEnvironment);

test('checkout accepts POST only and fails closed without test credentials', async () => {
  let res = response();
  await checkout({ method: 'GET' }, res);
  assert.equal(res.statusCode, 405);
  assert.equal(res.headers.Allow, 'POST');

  res = response();
  await checkout({ method: 'POST' }, res);
  assert.equal(res.statusCode, 503);
});

test('checkout creates a fixed-product Dodo test session and returns desktop contract', async () => {
  configureTestEnvironment();
  let observed;
  global.fetch = async (url, options) => {
    observed = { url, options };
    return new Response(JSON.stringify({ checkout_url: 'https://test.checkout.dodopayments.com/session/cks_test' }), { status: 200 });
  };
  const res = response();
  await checkout({ method: 'POST' }, res);
  assert.equal(res.statusCode, 200);
  assert.deepEqual(res.body, { checkoutUrl: 'https://test.checkout.dodopayments.com/session/cks_test' });
  assert.equal(observed.url, 'https://test.dodopayments.com/checkouts');
  assert.deepEqual(JSON.parse(observed.options.body).product_cart, [{ product_id: 'pdt_0NqEVSM3FguQk894qafle', quantity: 1 }]);
});

test('checkout rejects a non-test Dodo response URL', async () => {
  configureTestEnvironment();
  global.fetch = async () => new Response(JSON.stringify({ checkout_url: 'https://checkout.dodopayments.com/session/live' }), { status: 200 });
  const res = response();
  await checkout({ method: 'POST' }, res);
  assert.equal(res.statusCode, 502);
});

test('checkout accepts live_mode and uses the live Dodo endpoints', async () => {
  configureTestEnvironment();
  process.env.DODO_ENVIRONMENT = 'live_mode';
  process.env.DODO_PRODUCT_ID = 'pdt_0NqUxj3xKQdTRco31F7Lo';
  let observed;
  global.fetch = async (url, options) => {
    observed = { url, options };
    return new Response(JSON.stringify({ checkout_url: 'https://checkout.dodopayments.com/session/cks_live' }), { status: 200 });
  };
  const res = response();
  await checkout({ method: 'POST' }, res);
  assert.equal(res.statusCode, 200);
  assert.equal(observed.url, 'https://live.dodopayments.com/checkouts');
  assert.deepEqual(JSON.parse(observed.options.body).product_cart, [{ product_id: 'pdt_0NqUxj3xKQdTRco31F7Lo', quantity: 1 }]);
});

test('webhook accepts POST only, fails closed when unconfigured, and rejects invalid signatures', async () => {
  let res = response();
  await webhook(request('GET'), res);
  assert.equal(res.statusCode, 405);

  res = response();
  await webhook(request('POST', '{}'), res);
  assert.equal(res.statusCode, 503);

  configureTestEnvironment();
  res = response();
  await webhook(request('POST', '{}'), res);
  assert.equal(res.statusCode, 401);
});

test('a signed pending grant verifies payment and fulfills exactly one license key', async () => {
  configureTestEnvironment();
  const event = {
    type: 'entitlement_grant.created',
    data: {
      id: 'entg_test', payment_id: 'pay_test', integration_type: 'license_key',
      entitlement_id: 'ent_test_license', status: 'Pending', license_key: null,
    },
  };
  const body = JSON.stringify(event);
  const webhookId = 'msg_test';
  const timestamp = new Date();
  const signer = new Webhook(process.env.DODO_PAYMENTS_WEBHOOK_KEY);
  global.fetch = async (url) => url.endsWith('/payments/pay_test')
    ? new Response(JSON.stringify(payment()), { status: 200 })
    : new Response('', { status: 200 });
  const res = response();
  await webhook(request('POST', body, {
    'webhook-id': webhookId,
    'webhook-timestamp': String(Math.floor(timestamp.getTime() / 1000)),
    'webhook-signature': signer.sign(webhookId, timestamp, body),
  }), res);
  assert.equal(res.statusCode, 200);
  assert.deepEqual(res.body, { received: true, fulfilled: true });
});

test('successful grant fulfillment verifies payment and accepts a replay conflict idempotently', async () => {
  configureTestEnvironment();
  const calls = [];
  global.fetch = async (url, options) => {
    calls.push({ url, options });
    return calls.length === 1
      ? new Response(JSON.stringify(payment()), { status: 200 })
      : new Response('', { status: 409 });
  };
  const outcome = await fulfillPendingGrant({ id: 'entg_test', payment_id: 'pay_test' });
  assert.deepEqual(outcome, { status: 200, body: { received: true, fulfilled: true } });
  assert.equal(calls.length, 2);
  assert.match(calls[1].url, /\/grants\/entg_test\/license-key$/);
  assert.equal(JSON.parse(calls[1].options.body).activations_limit, 1);
});

test('failed or mismatched payments do not trigger license fulfillment', async () => {
  configureTestEnvironment();
  let calls = 0;
  global.fetch = async () => {
    calls += 1;
    return new Response(JSON.stringify({ ...payment(), status: 'failed' }), { status: 200 });
  };
  const outcome = await fulfillPendingGrant({ id: 'entg_test', payment_id: 'pay_test' });
  assert.deepEqual(outcome, { status: 200, body: { received: true, fulfilled: false } });
  assert.equal(calls, 1);
});
