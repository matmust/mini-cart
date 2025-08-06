import {
  calculateItemTotal,
  calculateCartTotal,
  formatPrice,
  calculateDiscountedPrice,
  calculateTotalSavings,
  getCartSummary,
} from './cartUtils';
import { CartItem, CartState, Product } from '../types';

const createMockProduct = (overrides: Partial<Product> = {}): Product => ({
  id: 1,
  title: 'Test Product',
  description: 'Test description',
  price: 100,
  discountPercentage: 0,
  rating: 4.5,
  stock: 10,
  brand: 'Test Brand',
  category: 'Test Category',
  thumbnail: 'test-thumb.jpg',
  images: ['test1.jpg', 'test2.jpg'],
  ...overrides,
});

const createMockCartItem = (
  productOverrides: Partial<Product> = {},
  quantity = 1,
): CartItem => ({
  product: createMockProduct(productOverrides),
  quantity,
});

describe('cartUtils', () => {
  describe('calculateItemTotal', () => {
    it('should calculate total for item without discount', () => {
      const item = createMockCartItem({ price: 100, discountPercentage: 0 }, 2);
      expect(calculateItemTotal(item)).toBe(200);
    });

    it('should calculate total for item with discount', () => {
      const item = createMockCartItem(
        { price: 100, discountPercentage: 20 },
        2,
      );
      expect(calculateItemTotal(item)).toBe(160);
    });

    it('should handle single quantity items', () => {
      const item = createMockCartItem(
        { price: 99.99, discountPercentage: 0 },
        1,
      );
      expect(calculateItemTotal(item)).toBe(99.99);
    });

    it('should handle items with high discount', () => {
      const item = createMockCartItem(
        { price: 100, discountPercentage: 90 },
        1,
      );
      expect(calculateItemTotal(item)).toBe(10);
    });

    it('should round to 2 decimal places', () => {
      const item = createMockCartItem(
        { price: 33.33, discountPercentage: 10 },
        3,
      );
      expect(calculateItemTotal(item)).toBe(89.99);
    });

    it('should handle zero discount percentage correctly', () => {
      const item = createMockCartItem({ price: 50, discountPercentage: 0 }, 3);
      expect(calculateItemTotal(item)).toBe(150);
    });
  });

  describe('calculateCartTotal', () => {
    it('should calculate total for empty cart', () => {
      expect(calculateCartTotal([])).toBe(0);
    });

    it('should calculate total for single item', () => {
      const items = [
        createMockCartItem({ price: 100, discountPercentage: 0 }, 1),
      ];
      expect(calculateCartTotal(items)).toBe(100);
    });

    it('should calculate total for multiple items without discounts', () => {
      const items = [
        createMockCartItem({ price: 100, discountPercentage: 0 }, 2),
        createMockCartItem({ id: 2, price: 50, discountPercentage: 0 }, 1),
      ];
      expect(calculateCartTotal(items)).toBe(250);
    });

    it('should calculate total for multiple items with discounts', () => {
      const items = [
        createMockCartItem({ price: 100, discountPercentage: 20 }, 2),
        createMockCartItem({ id: 2, price: 50, discountPercentage: 10 }, 1),
      ];
      expect(calculateCartTotal(items)).toBe(205);
    });

    it('should handle mixed items (some with discounts, some without)', () => {
      const items = [
        createMockCartItem({ price: 100, discountPercentage: 0 }, 1),
        createMockCartItem({ id: 2, price: 80, discountPercentage: 25 }, 2),
      ];
      expect(calculateCartTotal(items)).toBe(220);
    });
  });

  describe('formatPrice', () => {
    it('should format prices with two decimal places', () => {
      expect(formatPrice(100)).toBe('$100.00');
      expect(formatPrice(99.99)).toBe('$99.99');
      expect(formatPrice(0)).toBe('$0.00');
    });

    it('should handle whole numbers correctly', () => {
      expect(formatPrice(50)).toBe('$50.00');
      expect(formatPrice(1)).toBe('$1.00');
    });
  });

  describe('calculateDiscountedPrice', () => {
    it('should calculate discounted prices correctly', () => {
      expect(calculateDiscountedPrice(100, 10)).toBe('$90.00');
      expect(calculateDiscountedPrice(100, 25)).toBe('$75.00');
      expect(calculateDiscountedPrice(100, 50)).toBe('$50.00');
    });

    it('should handle decimal prices and discounts', () => {
      expect(calculateDiscountedPrice(99.99, 15)).toBe('$84.99');
      expect(calculateDiscountedPrice(19.95, 20)).toBe('$15.96');
    });
    1;
  });

  describe('calculateTotalSavings', () => {
    it('should return 0 for empty cart', () => {
      expect(calculateTotalSavings([])).toBe(0);
    });

    it('should return 0 for items without discounts', () => {
      const items = [
        createMockCartItem({ price: 100, discountPercentage: 0 }, 2),
        createMockCartItem({ id: 2, price: 50, discountPercentage: 0 }, 1),
      ];
      expect(calculateTotalSavings(items)).toBe(0);
    });

    it('should calculate savings for single item with discount', () => {
      const items = [
        createMockCartItem({ price: 100, discountPercentage: 20 }, 1),
      ];
      expect(calculateTotalSavings(items)).toBe(20);
    });

    it('should calculate savings for multiple items with discounts', () => {
      const items = [
        createMockCartItem({ price: 100, discountPercentage: 20 }, 2),
        createMockCartItem({ id: 2, price: 50, discountPercentage: 10 }, 1),
      ];
      expect(calculateTotalSavings(items)).toBe(45);
    });

    it('should calculate savings for mixed items', () => {
      const items = [
        createMockCartItem({ price: 100, discountPercentage: 0 }, 1),
        createMockCartItem({ id: 2, price: 80, discountPercentage: 25 }, 2),
      ];
      expect(calculateTotalSavings(items)).toBe(40);
    });

    it('should round savings to 2 decimal places', () => {
      const items = [
        createMockCartItem({ price: 33.33, discountPercentage: 15 }, 1),
      ];
      expect(calculateTotalSavings(items)).toBe(5);
    });
  });

  describe('getCartSummary', () => {
    it('should return correct summary for empty cart', () => {
      const state: CartState = {
        items: [],
        totalItems: 0,
        totalPrice: 0,
      };

      const summary = getCartSummary(state);
      expect(summary).toEqual({
        itemCount: 0,
        totalItems: 0,
        subtotal: 0,
        totalSavings: 0,
        originalTotal: 0,
        finalTotal: 0,
      });
    });

    it('should handle single item cart', () => {
      const items = [
        createMockCartItem({ price: 99.99, discountPercentage: 15 }, 1),
      ];

      const state: CartState = {
        items,
        totalItems: 1,
        totalPrice: 84.99,
      };

      const summary = getCartSummary(state);
      expect(summary.itemCount).toBe(1);
      expect(summary.totalItems).toBe(1);
      expect(summary.subtotal).toBe(84.99);
      expect(summary.totalSavings).toBe(15);
      expect(summary.originalTotal).toBe(99.99);
      expect(summary.finalTotal).toBe(84.99);
    });

    it('should return correct summary for cart with items without discounts', () => {
      const items = [
        createMockCartItem({ price: 100, discountPercentage: 0 }, 2),
        createMockCartItem({ id: 2, price: 50, discountPercentage: 0 }, 1),
      ];

      const state: CartState = {
        items,
        totalItems: 3,
        totalPrice: 250,
      };

      const summary = getCartSummary(state);
      expect(summary).toEqual({
        itemCount: 2,
        totalItems: 3,
        subtotal: 250,
        totalSavings: 0,
        originalTotal: 250,
        finalTotal: 250,
      });
    });

    it('should return correct summary for cart with discounted items', () => {
      const items = [
        createMockCartItem({ price: 100, discountPercentage: 20 }, 2),
        createMockCartItem({ id: 2, price: 50, discountPercentage: 10 }, 1),
      ];

      const state: CartState = {
        items,
        totalItems: 3,
        totalPrice: 205,
      };

      const summary = getCartSummary(state);
      expect(summary).toEqual({
        itemCount: 2,
        totalItems: 3,
        subtotal: 205,
        totalSavings: 45,
        originalTotal: 250,
        finalTotal: 205,
      });
    });

    it('should handle mixed cart (items with and without discounts)', () => {
      const items = [
        createMockCartItem({ price: 100, discountPercentage: 0 }, 1),
        createMockCartItem({ id: 2, price: 80, discountPercentage: 25 }, 2),
      ];

      const state: CartState = {
        items,
        totalItems: 3,
        totalPrice: 220,
      };

      const summary = getCartSummary(state);
      expect(summary).toEqual({
        itemCount: 2,
        totalItems: 3,
        subtotal: 220,
        totalSavings: 40,
        originalTotal: 260,
        finalTotal: 220,
      });
    });
  });
});
