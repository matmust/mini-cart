import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { useNavigation } from '@react-navigation/native';
import CartHeaderButton from './CartHeaderButton';
import { useCart } from '../../../hooks';

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

jest.mock('../../../hooks', () => ({
  useCart: jest.fn(),
}));

describe('CartHeaderButton', () => {
  const mockNavigate = jest.fn();
  const mockUseNavigation = useNavigation as jest.MockedFunction<
    typeof useNavigation
  >;
  const mockUseCart = useCart as jest.MockedFunction<typeof useCart>;

  const useCartFunctions = {
    addItem: jest.fn(),
    removeItem: jest.fn(),
    increaseQuantity: jest.fn(),
    decreaseQuantity: jest.fn(),
    clearCart: jest.fn(),
    getItemQuantity: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseNavigation.mockReturnValue({
      navigate: mockNavigate,
    } as any);
  });

  it('renders cart button with badge showing total items', () => {
    mockUseCart.mockReturnValue({
      state: {
        items: [],
        totalItems: 3,
        totalPrice: 59.97,
      },
      ...useCartFunctions,
    });

    const { getByTestId, getByText } = render(<CartHeaderButton />);

    expect(getByTestId('cart-header-button')).toBeTruthy();
    expect(getByTestId('cart-badge')).toBeTruthy();
    expect(getByText('3')).toBeTruthy();
  });

  it('navigates to Cart screen when pressed', () => {
    mockUseCart.mockReturnValue({
      state: {
        items: [],
        totalItems: 0,
        totalPrice: 0,
      },
      ...useCartFunctions,
    });

    const { getByTestId } = render(<CartHeaderButton />);

    const button = getByTestId('cart-header-button');
    fireEvent.press(button);

    expect(mockNavigate).toHaveBeenCalledWith('Cart');
  });

  it('hides badge when cart is empty', () => {
    mockUseCart.mockReturnValue({
      state: {
        items: [],
        totalItems: 0,
        totalPrice: 0,
      },
      ...useCartFunctions,
    });

    const { getByTestId, queryByTestId } = render(<CartHeaderButton />);

    expect(getByTestId('cart-header-button')).toBeTruthy();
    expect(queryByTestId('cart-badge')).toBeNull();
  });

  it('displays correct badge count for multiple items', () => {
    mockUseCart.mockReturnValue({
      state: {
        items: [],
        totalItems: 15,
        totalPrice: 299.85,
      },
      ...useCartFunctions,
    });

    const { getByText } = render(<CartHeaderButton />);

    expect(getByText('15')).toBeTruthy();
  });

  it('handles large item counts', () => {
    mockUseCart.mockReturnValue({
      state: {
        items: [],
        totalItems: 150,
        totalPrice: 2999.5,
      },
      ...useCartFunctions,
    });

    const { getByText } = render(<CartHeaderButton />);

    expect(getByText('99+')).toBeTruthy();
  });
});
