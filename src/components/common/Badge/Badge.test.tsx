import React from 'react';
import { render } from '@testing-library/react-native';
import Badge from './Badge';

describe('Badge', () => {
  it('renders correctly with count', () => {
    const { getByText } = render(<Badge count={5} />);
    expect(getByText('5')).toBeTruthy();
  });

  it('does not render when count is 0', () => {
    const { queryByText } = render(<Badge count={0} />);
    expect(queryByText('0')).toBeNull();
  });

  it('does not render when count is negative', () => {
    const { queryByText } = render(<Badge count={-1} />);
    expect(queryByText('-1')).toBeNull();
  });

  it('shows maxCount+ when count exceeds maxCount', () => {
    const { getByText } = render(<Badge count={150} maxCount={99} />);
    expect(getByText('99+')).toBeTruthy();
  });

  it('applies correct testID', () => {
    const { getByTestId } = render(<Badge count={5} testID='badge-test' />);
    expect(getByTestId('badge-test')).toBeTruthy();
  });

  it('uses custom formatText when provided', () => {
    const formatText = (count: number) => `-${count}%`;
    const { getByText } = render(<Badge count={25} formatText={formatText} />);
    expect(getByText('-25%')).toBeTruthy();
  });

  it('uses custom formatText with cart message', () => {
    const formatText = (count: number) => `${count} in cart`;
    const { getByText } = render(<Badge count={3} formatText={formatText} />);
    expect(getByText('3 in cart')).toBeTruthy();
  });
});
