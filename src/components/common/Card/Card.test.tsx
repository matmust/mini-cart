import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Text } from 'react-native';
import Card from './Card';

describe('Card', () => {
  it('renders correctly with children', () => {
    const { getByText } = render(
      <Card>
        <Text>Test Content</Text>
      </Card>,
    );
    expect(getByText('Test Content')).toBeTruthy();
  });

  it('renders as pressable when onPress is provided', () => {
    const onPressMock = jest.fn();
    const { getByRole } = render(
      <Card onPress={onPressMock}>
        <Text>Pressable Card</Text>
      </Card>,
    );

    const pressableCard = getByRole('button');
    expect(pressableCard).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPressMock = jest.fn();
    const { getByRole } = render(
      <Card onPress={onPressMock}>
        <Text>Pressable Card</Text>
      </Card>,
    );

    const pressableCard = getByRole('button');
    fireEvent.press(pressableCard);
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('renders as non-pressable when onPress is not provided', () => {
    const { queryByRole, getByText } = render(
      <Card>
        <Text>Non-pressable Card</Text>
      </Card>,
    );

    expect(queryByRole('button')).toBeNull();
    expect(getByText('Non-pressable Card')).toBeTruthy();
  });

  it('applies correct testID', () => {
    const { getByTestId } = render(
      <Card testID='card-test'>
        <Text>Test Card</Text>
      </Card>,
    );
    expect(getByTestId('card-test')).toBeTruthy();
  });
});
