import {
  calculateItemTotal,
  calculateCartTotal,
  formatPrice,
  calculateDiscountedPrice,
} from './cartUtils';
import { CartItem, Product } from '../types';

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
    });1
  });
});
