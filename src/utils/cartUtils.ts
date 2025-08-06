import { CartItem, CartState } from '../types';

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

export const formatPrice = (price: number): string => `$${price.toFixed(2)}`;

export const calculateDiscountedPrice = (
  price: number,
  discount: number,
): string => {
  return formatPrice(price * (1 - discount / 100));
};

export const calculateTotalSavings = (items: CartItem[]): number => {
  const savings = items.reduce((sum, item) => {
    if (item.product.discountPercentage > 0) {
      const originalTotal = item.product.price * item.quantity;
      const discountAmount =
        originalTotal * (item.product.discountPercentage / 100);
      return sum + discountAmount;
    }
    return sum;
  }, 0);

  return Math.round(savings * 100) / 100;
};

export const getCartSummary = (state: CartState) => {
  const totalSavings = calculateTotalSavings(state.items);
  const originalTotal = state.totalPrice + totalSavings;

  return {
    itemCount: state.items.length,
    totalItems: state.totalItems,
    subtotal: state.totalPrice,
    totalSavings,
    originalTotal,
    finalTotal: state.totalPrice,
  };
};
