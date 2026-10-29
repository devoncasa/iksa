import test from 'node:test';
import assert from 'node:assert/strict';
import { addCartLine, cartLineKey, cartTotals, cartUnitPrice, normalizeCart, updateCartLine } from '../lib/cart.ts';

const catalog = [{ id: 'heritage', pricePerRoll: 1060, availableColors: ['white', 'black', 'blue'] }];
const markups = { white: { markup: 0 }, black: { markup: 0.25 }, blue: { markup: 0.18 } };

test('legacy carts migrate to white without losing rolls', () => {
  assert.deepEqual(normalizeCart([{ fabricId: 'heritage', quantity: 2 }], catalog), [{ fabricId: 'heritage', color: 'white', quantity: 2 }]);
});
test('different colours remain separate lines and include their surcharges', () => {
  let cart = addCartLine([], { fabricId: 'heritage', color: 'black', quantity: 2 }, catalog);
  cart = addCartLine(cart, { fabricId: 'heritage', color: 'white', quantity: 1 }, catalog);
  assert.equal(cart.length, 2);
  assert.deepEqual(cartTotals(cart, catalog, markups), { totalItems: 3, totalPrice: 3710 });
});
test('adding the same colour merges only that line', () => {
  let cart = normalizeCart([{ fabricId: 'heritage', color: 'blue', quantity: 1 }, { fabricId: 'heritage', color: 'white', quantity: 2 }], catalog);
  cart = addCartLine(cart, { fabricId: 'heritage', color: 'blue', quantity: 3 }, catalog);
  assert.equal(cart[0].quantity, 4);
  assert.equal(cart[1].quantity, 2);
});
test('updating or removing one colour preserves the other', () => {
  const cart = normalizeCart([{ fabricId: 'heritage', color: 'black', quantity: 2 }, { fabricId: 'heritage', color: 'white', quantity: 1 }], catalog);
  const updated = updateCartLine(cart, cartLineKey(cart[0]), 4);
  assert.equal(updated[0].quantity, 4);
  assert.equal(updated[1].quantity, 1);
  assert.deepEqual(updateCartLine(updated, cartLineKey(cart[0]), 0), [cart[1]]);
});
test('malformed storage, unavailable colours and unknown SKUs are rejected', () => {
  for (const value of [null, {}, 'broken', [null], [{ fabricId: 'deleted', quantity: 1 }], [{ fabricId: 'heritage', color: 'red', quantity: 1 }]]) {
    assert.deepEqual(normalizeCart(value, catalog), []);
  }
});
test('invalid quantities cannot corrupt totals', () => {
  for (const quantity of [NaN, Infinity, -1, 0, 1.5, 10000, '2']) {
    assert.deepEqual(normalizeCart([{ fabricId: 'heritage', quantity }], catalog), []);
  }
  const cart = normalizeCart([{ fabricId: 'heritage', quantity: 1 }], catalog);
  assert.deepEqual(updateCartLine(cart, cartLineKey(cart[0]), NaN), cart);
});
test('colour unit prices use currency precision', () => {
  assert.equal(cartUnitPrice(catalog[0], 'black', markups), 1325);
  assert.equal(cartUnitPrice(catalog[0], 'blue', markups), 1250.8);
  assert.equal(cartUnitPrice({ ...catalog[0], pricePerRoll: 0.1 }, 'blue', markups), 0.12);
});
