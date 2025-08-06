import React from 'react';
import { render } from '@testing-library/react-native';
import CartSummary from './CartSummary';
import { useCart } from '../../../hooks';

jest.mock('../../../hooks', () => ({
  useCart: jest.fn(),
}));

describe('CartSummary', () => {
  const mockUseCart = useCart as jest.MockedFunction<typeof useCart>;

  const setupCartMock = (cartState: any) => {
    mockUseCart.mockReturnValue({
      state: cartState,
      addItem: jest.fn(),
      removeItem: jest.fn(),
      increaseQuantity: jest.fn(),
      decreaseQuantity: jest.fn(),
      clearCart: jest.fn(),
      getItemQuantity: jest.fn(),
    });
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders cart summary with order details', () => {
    const mockCartState = {
      items: [],
      totalItems: 3,
      totalPrice: 59.97,
    };

    setupCartMock(mockCartState);

    const { getByText, queryAllByText } = render(<CartSummary />);

    expect(getByText('Order Summary')).toBeTruthy();
    expect(getByText('Items (3):')).toBeTruthy();
    expect(getByText('Total:')).toBeTruthy();
    const priceElements = queryAllByText('$59.97');
    expect(priceElements).toHaveLength(2);
  });

  it('renders with custom testID', () => {
    const mockCartState = {
      items: [],
      totalItems: 0,
      totalPrice: 0,
    };

    setupCartMock(mockCartState);

    const { getByTestId } = render(<CartSummary testID='cart-summary' />);

    expect(getByTestId('cart-summary')).toBeTruthy();
  });

  it('displays zero values when cart is empty', () => {
    const mockCartState = {
      items: [],
      totalItems: 0,
      totalPrice: 0,
    };

    setupCartMock(mockCartState);

    const { getByText, queryAllByText } = render(<CartSummary />);

    expect(getByText('Items (0):')).toBeTruthy();
    const zeroPriceElements = queryAllByText('$0.00');
    expect(zeroPriceElements).toHaveLength(2);
  });

  it('displays correct values for cart with multiple items', () => {
    const mockCartState = {
      items: [],
      totalItems: 5,
      totalPrice: 149.95,
    };

    setupCartMock(mockCartState);

    const { getByText, queryAllByText } = render(<CartSummary />);

    expect(getByText('Items (5):')).toBeTruthy();
    const priceElements = queryAllByText('$149.95');
    expect(priceElements).toHaveLength(2);
  });
});
