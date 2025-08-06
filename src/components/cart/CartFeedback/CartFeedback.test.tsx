import React from 'react';
import { render, act } from '@testing-library/react-native';
import CartFeedback from './CartFeedback';

describe('CartFeedback', () => {
  const mockOnHide = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders feedback message when visible', () => {
    const { getByText } = render(
      <CartFeedback
        visible={true}
        message='Item added to cart'
        action='added'
        onHide={mockOnHide}
      />,
    );

    expect(getByText('Item added to cart')).toBeTruthy();
  });

  it('does not render when not visible', () => {
    const { queryByText } = render(
      <CartFeedback
        visible={false}
        message='Item added to cart'
        action='added'
        onHide={mockOnHide}
      />,
    );

    expect(queryByText('Item added to cart')).toBeNull();
  });

  it('renders correct icon for added action', () => {
    const { getByTestId } = render(
      <CartFeedback
        visible={true}
        message='Item added to cart'
        action='added'
        onHide={mockOnHide}
      />,
    );

    expect(getByTestId('icon-added')).toBeTruthy();
  });

  it('renders correct icon for removed action', () => {
    const { getByTestId } = render(
      <CartFeedback
        visible={true}
        message='Item removed from cart'
        action='removed'
        onHide={mockOnHide}
      />,
    );

    expect(getByTestId('icon-removed')).toBeTruthy();
  });

  it('renders correct icon for updated action', () => {
    const { getByTestId } = render(
      <CartFeedback
        visible={true}
        message='Cart updated'
        action='updated'
        onHide={mockOnHide}
      />,
    );

    expect(getByTestId('icon-updated')).toBeTruthy();
  });

  it('renders correct icon for default/other action', () => {
    const { getByTestId } = render(
      <CartFeedback
        visible={true}
        message='Something happened'
        action='error'
        onHide={mockOnHide}
      />,
    );

    expect(getByTestId('icon-default')).toBeTruthy();
  });

  it('auto-hides after timeout when visible', () => {
    render(
      <CartFeedback
        visible={true}
        message='Item added to cart'
        action='added'
        onHide={mockOnHide}
      />,
    );

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(mockOnHide).toHaveBeenCalled();
  });

  it('does not auto-hide when not visible', () => {
    render(
      <CartFeedback
        visible={false}
        message='Item added to cart'
        action='added'
        onHide={mockOnHide}
      />,
    );

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(mockOnHide).not.toHaveBeenCalled();
  });
});
