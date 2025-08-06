import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ProductCard from './ProductCard';

const mockAddItemWithFeedback = jest.fn();
const mockIncreaseQuantityWithFeedback = jest.fn();
const mockDecreaseQuantityWithFeedback = jest.fn();
const mockGetItemQuantity = jest.fn();

jest.mock('../../../hooks', () => ({
  useCart: () => ({
    addItem: jest.fn(),
    removeItem: jest.fn(),
    updateItemQuantity: jest.fn(),
    getItemQuantity: mockGetItemQuantity,
    items: [],
    itemCount: 0,
    total: 0,
  }),
  useCartFeedback: () => ({
    message: null,
    showFeedback: false,
    feedbackType: 'added',
    addItemWithFeedback: mockAddItemWithFeedback,
    hideFeedback: jest.fn(),
    increaseQuantityWithFeedback: mockIncreaseQuantityWithFeedback,
    decreaseQuantityWithFeedback: mockDecreaseQuantityWithFeedback,
  }),
}));

describe('ProductCard', () => {
  const mockProduct = {
    id: 1,
    title: 'Test Product',
    price: 29.99,
    thumbnail: 'https://example.com/image.jpg',
    discountPercentage: 10,
    description: 'Test description',
    category: 'test',
    rating: 4.5,
    stock: 10,
    brand: 'Test Brand',
    images: ['https://example.com/image.jpg'],
  };

  const mockOnPress = jest.fn();

  const renderProductCard = (customProps = {}) => {
    const defaultProps = {
      product: mockProduct,
      onPress: mockOnPress,
    };

    return render(<ProductCard {...defaultProps} {...customProps} />);
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockGetItemQuantity.mockReturnValue(0);
  });

  describe('Basic Rendering', () => {
    it('renders product information correctly', () => {
      const { getByText } = renderProductCard();

      expect(getByText('Test Product')).toBeTruthy();
      expect(getByText('$29.99')).toBeTruthy();
      expect(getByText('4.5')).toBeTruthy();
      expect(getByText('10 left')).toBeTruthy();
    });

    it('renders without crashing', () => {
      renderProductCard();
    });

    it('calls onPress when card is tapped', () => {
      const { getByTestId } = renderProductCard();

      fireEvent.press(getByTestId('product-card-1'));
      expect(mockOnPress).toHaveBeenCalledWith(mockProduct);
    });
  });

  describe('Discount Functionality', () => {
    it('displays discount badge when product has discount', () => {
      const { getByTestId, getByText } = renderProductCard();

      expect(getByTestId('discount-badge-1')).toBeTruthy();
      expect(getByText('-10%')).toBeTruthy();
    });

    it('shows discounted price when product has discount', () => {
      const { getByText } = renderProductCard();

      expect(getByText('$29.99')).toBeTruthy();
      expect(getByText('$26.99')).toBeTruthy();
    });

    it('does not show discount badge when no discount', () => {
      const productWithoutDiscount = { ...mockProduct, discountPercentage: 0 };
      const { queryByTestId } = renderProductCard({
        product: productWithoutDiscount,
      });

      expect(queryByTestId('discount-badge-1')).toBeNull();
    });
  });

  describe('Stock Management', () => {
    it('shows correct stock count when in stock', () => {
      const { getByText } = renderProductCard();

      expect(getByText('10 left')).toBeTruthy();
    });

    it('shows out of stock message when stock is 0', () => {
      const outOfStockProduct = { ...mockProduct, stock: 0 };
      const { getByText } = renderProductCard({ product: outOfStockProduct });

      expect(getByText('Out of stock')).toBeTruthy();
    });

    it('disables add to cart button when out of stock', () => {
      const outOfStockProduct = { ...mockProduct, stock: 0 };
      const { getByTestId, getByText } = renderProductCard({
        product: outOfStockProduct,
      });

      const addButton = getByTestId('add-to-cart-1');

      expect(addButton).toBeTruthy();
      expect(addButton).toBeDisabled();

      expect(getByText('Out of Stock')).toBeTruthy();

      fireEvent.press(addButton);
      expect(mockAddItemWithFeedback).not.toHaveBeenCalled();
    });
  });
  describe('Cart Functionality', () => {
    it('shows add to cart button when item not in cart', () => {
      const { getByTestId, getByText } = renderProductCard();

      expect(getByTestId('add-to-cart-1')).toBeTruthy();
      expect(getByText('Add to Cart')).toBeTruthy();
    });

    it('calls addItemWithFeedback when add to cart is pressed', () => {
      const { getByTestId } = renderProductCard();

      fireEvent.press(getByTestId('add-to-cart-1'));
      expect(mockAddItemWithFeedback).toHaveBeenCalledWith(mockProduct);
    });

    it('shows quantity selector when item is in cart', () => {
      mockGetItemQuantity.mockReturnValue(2);

      const { getByTestId, queryByTestId } = renderProductCard();

      expect(getByTestId('quantity-selector')).toBeTruthy();
      expect(getByTestId('quantity-value')).toBeTruthy();
      expect(queryByTestId('add-to-cart-1')).toBeNull();
    });

    it('calls increaseQuantityWithFeedback when quantity increased', () => {
      mockGetItemQuantity.mockReturnValue(2);

      const { getByTestId } = renderProductCard();

      fireEvent.press(getByTestId('quantity-increase'));
      expect(mockIncreaseQuantityWithFeedback).toHaveBeenCalledWith(
        mockProduct,
      );
    });

    it('calls decreaseQuantityWithFeedback when quantity decreased', () => {
      mockGetItemQuantity.mockReturnValue(2);

      const { getByTestId } = renderProductCard();

      fireEvent.press(getByTestId('quantity-decrease'));
      expect(mockDecreaseQuantityWithFeedback).toHaveBeenCalledWith(
        mockProduct,
      );
    });
  });
});
