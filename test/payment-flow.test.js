const test = require('node:test');
const assert = require('node:assert/strict');
const { validPayment, keyForGrant } = require('../api/webhook')._test;

function payment(overrides = {}) {
  return {
    status: 'succeeded',
    currency: 'USD',
    total_amount: 1299,
    tax: 0,
    discounts: [],
    subscription_ids: [],
    subscription_id: null,
    product_cart: [{ product_id: 'pdt_0NqEVSM3FguQk894qafle', quantity: 1 }],
    ...overrides,
  };
}

test('accepts only the exact successful one-time Windows Clean payment', () => {
  assert.equal(validPayment(payment()), true);
  assert.equal(validPayment(payment({ status: 'processing' })), false);
  assert.equal(validPayment(payment({ currency: 'INR', total_amount: 35454, tax: 5408 })), true);
  assert.equal(validPayment(payment({ discounts: [{ amount: 1 }] })), false);
  assert.equal(validPayment(payment({ subscription_ids: ['sub_test'] })), false);
  assert.equal(validPayment(payment({ product_cart: [{ product_id: 'pdt_wrong', quantity: 1 }] })), false);
  assert.equal(validPayment(payment({ product_cart: [{ product_id: 'pdt_0NqEVSM3FguQk894qafle', quantity: 2 }] })), false);
});

test('replayed deliveries derive the same Dodo license key for the same grant', () => {
  process.env.DODO_PAYMENTS_API_KEY = 'test-server-secret';
  const first = keyForGrant('grant_test_123');
  assert.equal(keyForGrant('grant_test_123'), first);
  assert.notEqual(keyForGrant('grant_test_456'), first);
  assert.match(first, /^WC1-(?:[A-F0-9]{5}-){4}[A-F0-9]{5}$/);
});
