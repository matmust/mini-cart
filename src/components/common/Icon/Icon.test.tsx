import React from 'react';
import { render } from '@testing-library/react-native';
import Icon from './Icon';
import { colors } from '../../../constants';

jest.mock('react-native-vector-icons/FontAwesome6', () => {
  const MockFontAwesome6 = ({ testID, ...props }: any) => {
    const ReactLib = require('react');
    const { Text } = require('react-native');
    return ReactLib.createElement(Text, { testID, ...props });
  };
  return MockFontAwesome6;
});

describe('Icon', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with required props', () => {
    const { getByTestId } = render(<Icon name='heart' testID='test-icon' />);

    const icon = getByTestId('test-icon');
    expect(icon).toBeTruthy();
    expect(icon.props.name).toBe('heart');
  });

  it('applies default size when not provided', () => {
    const { getByTestId } = render(<Icon name='star' testID='test-icon' />);

    const icon = getByTestId('test-icon');
    expect(icon.props.size).toBe(24);
  });

  it('applies custom size when provided', () => {
    const customSize = 32;
    const { getByTestId } = render(
      <Icon name='star' size={customSize} testID='test-icon' />,
    );

    const icon = getByTestId('test-icon');
    expect(icon.props.size).toBe(customSize);
  });

  it('applies default color when not provided', () => {
    const { getByTestId } = render(<Icon name='home' testID='test-icon' />);

    const icon = getByTestId('test-icon');
    expect(icon.props.color).toBe(colors.text);
  });

  it('applies custom color when provided', () => {
    const customColor = '#FF0000';
    const { getByTestId } = render(
      <Icon name='home' color={customColor} testID='test-icon' />,
    );

    const icon = getByTestId('test-icon');
    expect(icon.props.color).toBe(customColor);
  });

  it('applies custom style when provided', () => {
    const customStyle = { marginTop: 10 };
    const { getByTestId } = render(
      <Icon name='user' style={customStyle} testID='test-icon' />,
    );

    const icon = getByTestId('test-icon');
    expect(icon.props.style).toEqual(customStyle);
  });

  it('renders with all props provided', () => {
    const props = {
      name: 'cart-shopping',
      size: 20,
      color: colors.primary,
      style: { margin: 5 },
      testID: 'cart-shopping-icon',
    };

    const { getByTestId } = render(<Icon {...props} />);

    const icon = getByTestId('cart-shopping-icon');
    expect(icon.props.name).toBe(props.name);
    expect(icon.props.size).toBe(props.size);
    expect(icon.props.color).toBe(props.color);
    expect(icon.props.style).toEqual(props.style);
  });
});
