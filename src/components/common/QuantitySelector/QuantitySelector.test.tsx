import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import QuantitySelector from './QuantitySelector';

describe('QuantitySelector', () => {
  const mockOnIncrease = jest.fn();
  const mockOnDecrease = jest.fn();

  const renderQuantitySelector = (customProps = {}) => {
    const defaultProps = {
      quantity: 5,
      onIncrease: mockOnIncrease,
      onDecrease: mockOnDecrease,
    };

    return render(<QuantitySelector {...defaultProps} {...customProps} />);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders quantity selector with correct quantity', () => {
    const { getByText, getByTestId } = renderQuantitySelector();

    expect(getByTestId('quantity-selector')).toBeTruthy();
    expect(getByText('5')).toBeTruthy();
    expect(getByTestId('quantity-decrease')).toBeTruthy();
    expect(getByTestId('quantity-increase')).toBeTruthy();
  });

  it('calls onIncrease when increase button is pressed', () => {
    const { getByTestId } = renderQuantitySelector();

    const increaseButton = getByTestId('quantity-increase');
    fireEvent.press(increaseButton);

    expect(mockOnIncrease).toHaveBeenCalledTimes(1);
  });

  it('calls onDecrease when decrease button is pressed', () => {
    const { getByTestId } = renderQuantitySelector();

    const decreaseButton = getByTestId('quantity-decrease');
    fireEvent.press(decreaseButton);

    expect(mockOnDecrease).toHaveBeenCalledTimes(1);
  });

  it('disables decrease button when at minimum quantity', () => {
    const { getByTestId } = renderQuantitySelector({ quantity: 0, min: 0 });

    const decreaseButton = getByTestId('quantity-decrease');
    fireEvent.press(decreaseButton);

    // Should not call onDecrease when disabled
    expect(mockOnDecrease).not.toHaveBeenCalled();
  });

  it('disables increase button when at maximum quantity', () => {
    const { getByTestId } = renderQuantitySelector({ quantity: 10, max: 10 });

    const increaseButton = getByTestId('quantity-increase');
    fireEvent.press(increaseButton);

    // Should not call onIncrease when disabled
    expect(mockOnIncrease).not.toHaveBeenCalled();
  });

  it('allows decrease when above minimum', () => {
    const { getByTestId } = renderQuantitySelector({ quantity: 1, min: 0 });

    const decreaseButton = getByTestId('quantity-decrease');
    fireEvent.press(decreaseButton);

    expect(mockOnDecrease).toHaveBeenCalledTimes(1);
  });

  it('allows increase when below maximum', () => {
    const { getByTestId } = renderQuantitySelector({ quantity: 9, max: 10 });

    const increaseButton = getByTestId('quantity-increase');
    fireEvent.press(increaseButton);

    expect(mockOnIncrease).toHaveBeenCalledTimes(1);
  });

  it('renders with large variant', () => {
    const { getByTestId } = renderQuantitySelector({ variant: 'large' });

    expect(getByTestId('quantity-selector')).toBeTruthy();
  });

  it('renders with small variant by default', () => {
    const { getByTestId } = renderQuantitySelector();

    expect(getByTestId('quantity-selector')).toBeTruthy();
  });

  it('uses default min and max values when not specified', () => {
    const { getByTestId } = renderQuantitySelector({ quantity: 0 });

    // Should allow decrease at 0 since default min is 0
    const decreaseButton = getByTestId('quantity-decrease');
    fireEvent.press(decreaseButton);
    expect(mockOnDecrease).not.toHaveBeenCalled();

    // Should allow increase since we're below max (999)
    const increaseButton = getByTestId('quantity-increase');
    fireEvent.press(increaseButton);
    expect(mockOnIncrease).toHaveBeenCalledTimes(1);
  });
});
