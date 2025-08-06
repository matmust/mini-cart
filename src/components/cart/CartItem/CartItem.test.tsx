import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CartItemComponent from './CartItem';

describe('CartItemComponent', () => {
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

  const mockCartItem = {
    product: mockProduct,
    quantity: 2,
  };

  const mockOnIncreaseQuantity = jest.fn();
  const mockOnDecreaseQuantity = jest.fn();
  const mockOnRemove = jest.fn();

  const renderCartItem = (customItem = mockCartItem) => {
    return render(
      <CartItemComponent
        item={customItem}
        onIncreaseQuantity={mockOnIncreaseQuantity}
        onDecreaseQuantity={mockOnDecreaseQuantity}
        onRemove={mockOnRemove}
      />,
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders cart item correctly', () => {
    const { getByText } = renderCartItem();

    expect(getByText('Test Product')).toBeTruthy();
  });

  it('displays discounted price when discount is available', () => {
    const { getByText } = renderCartItem();

    expect(getByText('$29.99')).toBeTruthy();
    expect(getByText('$26.99')).toBeTruthy();
  });

  it('calls onIncreaseQuantity when quantity increases', () => {
    const { getByTestId } = renderCartItem();

    const incrementButton = getByTestId('quantity-increase');
    fireEvent.press(incrementButton);

    expect(mockOnIncreaseQuantity).toHaveBeenCalledWith(mockProduct);
  });

  it('calls onDecreaseQuantity when quantity decreases', () => {
    const { getByTestId } = renderCartItem();

    const decrementButton = getByTestId('quantity-decrease');
    fireEvent.press(decrementButton);

    expect(mockOnDecreaseQuantity).toHaveBeenCalledWith(mockProduct);
  });

  it('renders without discount when discountPercentage is 0', () => {
    const productWithoutDiscount = { ...mockProduct, discountPercentage: 0 };
    const itemWithoutDiscount = {
      ...mockCartItem,
      product: productWithoutDiscount,
    };

    const { getByText } = renderCartItem(itemWithoutDiscount);

    expect(getByText('$29.99')).toBeTruthy();
  });

  it('handles remove item correctly', () => {
    const { getByTestId } = renderCartItem();

    const decrementButton = getByTestId('quantity-decrease');
    fireEvent.press(decrementButton);

    expect(mockOnDecreaseQuantity).toHaveBeenCalledWith(mockProduct);
  });
});
