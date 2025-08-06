import { renderHook, act } from '@testing-library/react-native';
import { Alert } from 'react-native';
import { useCartFeedback } from './useCartFeedback';
import { useCart } from './useCart';
import { CartItem, Product } from '../types';

jest.mock('./useCart');
const mockUseCart = useCart as jest.MockedFunction<typeof useCart>;

jest.mock('react-native', () => ({
  Alert: {
    alert: jest.fn(),
  },
}));

const mockProduct: Product = {
  id: 1,
  title: 'Test Product',
  description: 'Test description',
  price: 100,
  discountPercentage: 10,
  rating: 4.5,
  stock: 5,
  brand: 'Test Brand',
  category: 'Test Category',
  thumbnail: 'test-thumbnail.jpg',
  images: ['test-image.jpg'],
};

const mockOutOfStockProduct: Product = {
  ...mockProduct,
  id: 2,
  title: 'Out of Stock Product',
  stock: 0,
};

const mockCartFunctions = {
  state: {
    items: [] as CartItem[],
    totalItems: 0,
    totalPrice: 0,
  },
  addItem: jest.fn(),
  removeItem: jest.fn(),
  increaseQuantity: jest.fn(),
  decreaseQuantity: jest.fn(),
  clearCart: jest.fn(),
  getItemQuantity: jest.fn(),
};

describe('useCartFeedback', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseCart.mockReturnValue(mockCartFunctions);
  });

  it('should initialize with correct default values', () => {
    const { result } = renderHook(() => useCartFeedback());

    expect(result.current.message).toBeNull();
    expect(result.current.showFeedback).toBe(false);
    expect(result.current.feedbackType).toBe('added');
  });

  describe('hideFeedback', () => {
    it('should hide feedback and clear message', () => {
      const { result } = renderHook(() => useCartFeedback());

      act(() => {
        result.current.showSuccessFeedback('added', 'Test message');
      });

      expect(result.current.showFeedback).toBe(true);
      expect(result.current.message).toBe('Test message');

      act(() => {
        result.current.hideFeedback();
      });

      expect(result.current.showFeedback).toBe(false);
      expect(result.current.message).toBeNull();
    });
  });

  describe('showSuccessFeedback', () => {
    it('should set feedback type, message and show feedback', () => {
      const { result } = renderHook(() => useCartFeedback());

      act(() => {
        result.current.showSuccessFeedback('removed', 'Item removed');
      });

      expect(result.current.feedbackType).toBe('removed');
      expect(result.current.message).toBe('Item removed');
      expect(result.current.showFeedback).toBe(true);
    });

    it('should handle different feedback types', () => {
      const { result } = renderHook(() => useCartFeedback());

      act(() => {
        result.current.showSuccessFeedback('updated', 'Quantity updated');
      });

      expect(result.current.feedbackType).toBe('updated');
      expect(result.current.message).toBe('Quantity updated');

      act(() => {
        result.current.showSuccessFeedback('error', 'Error occurred');
      });

      expect(result.current.feedbackType).toBe('error');
      expect(result.current.message).toBe('Error occurred');
    });
  });

  describe('addItemWithFeedback', () => {
    it('should return early when product is null', () => {
      const { result } = renderHook(() => useCartFeedback());

      act(() => {
        result.current.addItemWithFeedback(null);
      });

      expect(mockCartFunctions.addItem).not.toHaveBeenCalled();
      expect(result.current.showFeedback).toBe(false);
    });

    it('should show error for out of stock product', () => {
      const { result } = renderHook(() => useCartFeedback());

      act(() => {
        result.current.addItemWithFeedback(mockOutOfStockProduct);
      });

      expect(mockCartFunctions.addItem).not.toHaveBeenCalled();
      expect(result.current.feedbackType).toBe('error');
      expect(result.current.message).toBe('Product is out of stock');
      expect(result.current.showFeedback).toBe(true);
    });

    it('should show error when stock limit reached', () => {
      mockCartFunctions.getItemQuantity.mockReturnValue(5);
      const { result } = renderHook(() => useCartFeedback());

      act(() => {
        result.current.addItemWithFeedback(mockProduct);
      });

      expect(mockCartFunctions.addItem).not.toHaveBeenCalled();
      expect(result.current.feedbackType).toBe('error');
      expect(result.current.message).toBe(
        'Cannot add more items. Stock limit reached.',
      );
      expect(result.current.showFeedback).toBe(true);
    });

    it('should add item and show success feedback when valid', () => {
      mockCartFunctions.getItemQuantity.mockReturnValue(2);
      const { result } = renderHook(() => useCartFeedback());

      act(() => {
        result.current.addItemWithFeedback(mockProduct);
      });

      expect(mockCartFunctions.addItem).toHaveBeenCalledWith(mockProduct);
      expect(result.current.feedbackType).toBe('added');
      expect(result.current.message).toBe(`Added ${mockProduct.title} to cart`);
      expect(result.current.showFeedback).toBe(true);
    });
  });

  describe('increaseQuantityWithFeedback', () => {
    it('should return early when product is null', () => {
      const { result } = renderHook(() => useCartFeedback());

      act(() => {
        result.current.increaseQuantityWithFeedback(null);
      });

      expect(mockCartFunctions.increaseQuantity).not.toHaveBeenCalled();
      expect(result.current.showFeedback).toBe(false);
    });

    it('should show error when stock limit reached', () => {
      mockCartFunctions.getItemQuantity.mockReturnValue(5);
      const { result } = renderHook(() => useCartFeedback());

      act(() => {
        result.current.increaseQuantityWithFeedback(mockProduct);
      });

      expect(mockCartFunctions.increaseQuantity).not.toHaveBeenCalled();
      expect(result.current.feedbackType).toBe('error');
      expect(result.current.message).toBe(
        'Cannot add more items. Stock limit reached.',
      );
      expect(result.current.showFeedback).toBe(true);
    });

    it('should increase quantity and show success feedback when valid', () => {
      mockCartFunctions.getItemQuantity.mockReturnValue(2);
      const { result } = renderHook(() => useCartFeedback());

      act(() => {
        result.current.increaseQuantityWithFeedback(mockProduct);
      });

      expect(mockCartFunctions.increaseQuantity).toHaveBeenCalledWith(
        mockProduct,
      );
      expect(result.current.feedbackType).toBe('updated');
      expect(result.current.message).toBe(
        `Increased quantity of ${mockProduct.title}`,
      );
      expect(result.current.showFeedback).toBe(true);
    });
  });

  describe('decreaseQuantityWithFeedback', () => {
    it('should return early when product is null', () => {
      const { result } = renderHook(() => useCartFeedback());

      act(() => {
        result.current.decreaseQuantityWithFeedback(null);
      });

      expect(mockCartFunctions.decreaseQuantity).not.toHaveBeenCalled();
      expect(result.current.showFeedback).toBe(false);
    });

    it('should show error when quantity is already 0', () => {
      mockCartFunctions.getItemQuantity.mockReturnValue(0);
      const { result } = renderHook(() => useCartFeedback());

      act(() => {
        result.current.decreaseQuantityWithFeedback(mockProduct);
      });

      expect(mockCartFunctions.decreaseQuantity).not.toHaveBeenCalled();
      expect(result.current.feedbackType).toBe('error');
      expect(result.current.message).toBe(
        'Cannot decrease quantity. Minimum reached.',
      );
      expect(result.current.showFeedback).toBe(true);
    });

    it('should decrease quantity and show success feedback when valid', () => {
      mockCartFunctions.getItemQuantity.mockReturnValue(2);
      const { result } = renderHook(() => useCartFeedback());

      act(() => {
        result.current.decreaseQuantityWithFeedback(mockProduct);
      });

      expect(mockCartFunctions.decreaseQuantity).toHaveBeenCalledWith(
        mockProduct,
      );
      expect(result.current.feedbackType).toBe('updated');
      expect(result.current.message).toBe(
        `Decreased quantity of ${mockProduct.title}`,
      );
      expect(result.current.showFeedback).toBe(true);
    });
  });

  describe('removeItemWithFeedback', () => {
    beforeEach(() => {
      (Alert.alert as jest.Mock).mockClear();
    });

    it('should remove item directly when item not found in state', async () => {
      mockCartFunctions.state.items = [];
      const { result } = renderHook(() => useCartFeedback());

      const removeResult = await act(async () => {
        return result.current.removeItemWithFeedback(999);
      });

      expect(removeResult).toBe(true);
      expect(mockCartFunctions.removeItem).toHaveBeenCalledWith(999);
      expect(Alert.alert).not.toHaveBeenCalled();
    });

    it('should show alert when item exists and handle cancel', async () => {
      const mockItem: CartItem = { product: mockProduct, quantity: 1 };
      mockCartFunctions.state.items = [mockItem];

      (Alert.alert as jest.Mock).mockImplementation(
        (_title, _message, buttons) => {
          buttons[0].onPress();
        },
      );

      const { result } = renderHook(() => useCartFeedback());

      const removeResult = await act(async () => {
        return result.current.removeItemWithFeedback(mockProduct.id);
      });

      expect(removeResult).toBe(false);
      expect(Alert.alert).toHaveBeenCalledWith(
        'Remove Item',
        `Remove "${mockProduct.title}" from your cart?`,
        expect.any(Array),
      );
      expect(mockCartFunctions.removeItem).not.toHaveBeenCalled();
    });

    it('should show alert when item exists and handle confirm', async () => {
      const mockItem: CartItem = { product: mockProduct, quantity: 1 };
      mockCartFunctions.state.items = [mockItem];

      (Alert.alert as jest.Mock).mockImplementation(
        (_title, _message, buttons) => {
          buttons[1].onPress();
        },
      );

      const { result } = renderHook(() => useCartFeedback());

      const removeResult = await act(async () => {
        return result.current.removeItemWithFeedback(mockProduct.id);
      });

      expect(removeResult).toBe(true);
      expect(mockCartFunctions.removeItem).toHaveBeenCalledWith(mockProduct.id);
      expect(result.current.feedbackType).toBe('removed');
      expect(result.current.message).toBe(
        `Removed ${mockProduct.title} from cart`,
      );
    });
  });

  describe('clearCartWithFeedback', () => {
    beforeEach(() => {
      (Alert.alert as jest.Mock).mockClear();
    });

    it('should return true immediately when cart is empty', async () => {
      mockCartFunctions.state.items = [];
      const { result } = renderHook(() => useCartFeedback());

      const clearResult = await act(async () => {
        return result.current.clearCartWithFeedback();
      });

      expect(clearResult).toBe(true);
      expect(Alert.alert).not.toHaveBeenCalled();
      expect(mockCartFunctions.clearCart).not.toHaveBeenCalled();
    });

    it('should show alert when cart has items and handle cancel', async () => {
      const mockItem: CartItem = { product: mockProduct, quantity: 1 };
      mockCartFunctions.state.items = [mockItem];

      (Alert.alert as jest.Mock).mockImplementation(
        (_title, _message, buttons) => {
          buttons[0].onPress();
        },
      );

      const { result } = renderHook(() => useCartFeedback());

      const clearResult = await act(async () => {
        return result.current.clearCartWithFeedback();
      });

      expect(clearResult).toBe(false);
      expect(Alert.alert).toHaveBeenCalledWith(
        'Clear Cart',
        'Are you sure you want to remove all items from your cart?',
        expect.any(Array),
      );
      expect(mockCartFunctions.clearCart).not.toHaveBeenCalled();
    });

    it('should show alert when cart has items and handle confirm', async () => {
      const mockItem: CartItem = { product: mockProduct, quantity: 1 };
      mockCartFunctions.state.items = [mockItem];

      (Alert.alert as jest.Mock).mockImplementation(
        (_title, _message, buttons) => {
          buttons[1].onPress();
        },
      );

      const { result } = renderHook(() => useCartFeedback());

      const clearResult = await act(async () => {
        return result.current.clearCartWithFeedback();
      });

      expect(clearResult).toBe(true);
      expect(mockCartFunctions.clearCart).toHaveBeenCalled();
      expect(result.current.feedbackType).toBe('removed');
      expect(result.current.message).toBe('All items removed from cart');
    });
  });
});
