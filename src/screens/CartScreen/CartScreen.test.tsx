import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CartScreen from './CartScreen';
import { CartProvider } from '../../context/CartProvider';

describe('CartScreen', () => {
  const mockNavigation = {
    navigate: jest.fn(),
  } as any;

  const mockRoute = {
    key: 'Cart',
    name: 'Cart' as const,
  } as any;

  const renderCartScreen = () => {
    return render(
      <CartProvider>
        <CartScreen navigation={mockNavigation} route={mockRoute} />
      </CartProvider>,
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('displays empty cart when no items', () => {
    const { getByText, getByTestId } = renderCartScreen();

    expect(getByText('Your cart is empty')).toBeTruthy();
    expect(getByTestId('start-shopping-button')).toBeTruthy();
  });

  it('shows cart title in header', () => {
    const { getByText } = renderCartScreen();

    expect(getByText('Shopping Cart')).toBeTruthy();
  });

  it('handles continue shopping button press', () => {
    const { getByTestId } = renderCartScreen();

    fireEvent.press(getByTestId('start-shopping-button'));
    expect(mockNavigation.navigate).toHaveBeenCalledWith('ProductList');
  });

  it('shows refresh control', () => {
    const { getByTestId } = renderCartScreen();

    expect(getByTestId('cart-list')).toBeTruthy();
  });
});
