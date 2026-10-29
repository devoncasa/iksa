import type { CartItem, Fabric } from '../types.ts';

type Catalog = Pick<Fabric, 'id' | 'pricePerRoll' | 'availableColors'>[];
type Markups = Record<string, { markup: number }>;
export const MAX_ROLLS = 9999;
export const cartLineKey = (item: CartItem) => `${item.fabricId}:${item.color ?? 'white'}`;

export function validQuantity(quantity: number): boolean {
  return Number.isSafeInteger(quantity) && quantity > 0 && quantity <= MAX_ROLLS;
}

export function normalizeCart(value: unknown, catalog: Catalog): CartItem[] {
  if (!Array.isArray(value)) return [];
  const normalized: CartItem[] = [];
  for (const candidate of value) {
    if (!candidate || typeof candidate !== 'object') continue;
    const fabric = catalog.find(item => item.id === candidate.fabricId);
    if (!fabric || !validQuantity(candidate.quantity)) continue;
    const color = candidate.color ?? 'white';
    if (typeof color !== 'string' || !(fabric.availableColors ?? ['white']).includes(color)) continue;
    const item = { fabricId: fabric.id, color, quantity: candidate.quantity };
    const existing = normalized.find(line => cartLineKey(line) === cartLineKey(item));
    if (existing) existing.quantity = Math.min(MAX_ROLLS, existing.quantity + item.quantity);
    else normalized.push(item);
  }
  return normalized;
}

export function addCartLine(cart: CartItem[], item: CartItem, catalog: Catalog): CartItem[] {
  return normalizeCart([...cart, item], catalog);
}

export function updateCartLine(cart: CartItem[], key: string, quantity: number): CartItem[] {
  if (quantity === 0) return cart.filter(item => cartLineKey(item) !== key);
  if (!validQuantity(quantity)) return cart;
  return cart.map(item => cartLineKey(item) === key ? { ...item, quantity } : item);
}

export function cartUnitPrice(fabric: Catalog[number], color: string = 'white', markups: Markups): number {
  return Math.round(fabric.pricePerRoll * (1 + (markups[color]?.markup ?? 0)) * 100) / 100;
}

export function cartTotals(cart: CartItem[], catalog: Catalog, markups: Markups) {
  let totalItems = 0;
  let totalCents = 0;
  for (const item of normalizeCart(cart, catalog)) {
    const fabric = catalog.find(fabric => fabric.id === item.fabricId)!;
    totalItems += item.quantity;
    totalCents += Math.round(cartUnitPrice(fabric, item.color, markups) * 100) * item.quantity;
  }
  return { totalItems, totalPrice: totalCents / 100 };
}
