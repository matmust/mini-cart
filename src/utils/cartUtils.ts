import { CartItem } from '../types';

export const calculateItemTotal = (item: CartItem): number => {
  const price =
    item.product.discountPercentage > 0
      ? item.product.price * (1 - item.product.discountPercentage / 100)
      : item.product.price;

  return Math.round(price * item.quantity * 100) / 100;
};

export const calculateCartTotal = (items: CartItem[]): number => {
  const total = items.reduce((sum, item) => sum + calculateItemTotal(item), 0);
  return Math.round(total * 100) / 100;
};