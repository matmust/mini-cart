import React from 'react';
import { render } from '@testing-library/react-native';
import LoadingSpinner from './LoadingSpinner';

describe('LoadingSpinner', () => {
  it('renders correctly with default props', () => {
    const { getByTestId } = render(<LoadingSpinner testID='loading-spinner' />);
    expect(getByTestId('loading-spinner')).toBeTruthy();
  });

  it('applies custom color and size', () => {
    const { getByTestId } = render(
      <LoadingSpinner size='small' color='#FF0000' testID='loading-spinner' />,
    );
    expect(getByTestId('loading-spinner')).toBeTruthy();
  });

  it('applies correct testID', () => {
    const { getByTestId } = render(<LoadingSpinner testID='loading-test' />);
    expect(getByTestId('loading-test')).toBeTruthy();
  });
});
