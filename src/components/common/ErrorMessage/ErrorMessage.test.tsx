import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ErrorMessage from './ErrorMessage';

describe('ErrorMessage', () => {
  it('renders error message correctly', () => {
    const { getByText } = render(
      <ErrorMessage message='Something went wrong' />,
    );
    expect(getByText('Something went wrong')).toBeTruthy();
  });

  it('shows retry button when onRetry is provided', () => {
    const onRetryMock = jest.fn();
    const { getByRole } = render(
      <ErrorMessage message='Error' onRetry={onRetryMock} />,
    );

    const retryButton = getByRole('button');
    expect(retryButton).toBeTruthy();
  });

  it('calls onRetry when retry button is pressed', () => {
    const onRetryMock = jest.fn();
    const { getByRole } = render(
      <ErrorMessage message='Error' onRetry={onRetryMock} />,
    );

    const retryButton = getByRole('button');
    fireEvent.press(retryButton);
    expect(onRetryMock).toHaveBeenCalledTimes(1);
  });

  it('hides retry button when showRetry is false', () => {
    const onRetryMock = jest.fn();
    const { queryByRole } = render(
      <ErrorMessage message='Error' onRetry={onRetryMock} showRetry={false} />,
    );

    const retryButton = queryByRole('button');
    expect(retryButton).toBeNull();
  });

  it('applies correct testID', () => {
    const { getByTestId } = render(
      <ErrorMessage message='Error' testID='error-component' />,
    );

    expect(getByTestId('error-component')).toBeTruthy();
  });
});
