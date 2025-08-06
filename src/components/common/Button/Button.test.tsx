import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Button from './Button';

describe('Button', () => {
  it('renders correctly with title', () => {
    const { getByText } = render(
      <Button title='Test Button' onPress={() => {}} />,
    );

    expect(getByText('Test Button')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPressMock = jest.fn();
    const { getByRole } = render(
      <Button title='Test Button' onPress={onPressMock} />,
    );

    fireEvent.press(getByRole('button'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress when disabled', () => {
    const onPressMock = jest.fn();
    const { getByRole } = render(
      <Button title='Test Button' onPress={onPressMock} disabled />,
    );

    const button = getByRole('button');
    expect(button).toBeDisabled();

    fireEvent.press(button);
    expect(onPressMock).not.toHaveBeenCalled();
  });

  it('applies correct testID', () => {
    const { getByTestId } = render(
      <Button title='Test Button' onPress={() => {}} testID='test-button' />,
    );

    expect(getByTestId('test-button')).toBeTruthy();
  });

  it('has correct accessibility properties', () => {
    const { getByRole } = render(
      <Button title='Test Button' onPress={() => {}} />,
    );

    const button = getByRole('button');
    expect(button.props.accessibilityRole).toBe('button');
    expect(button.props.accessibilityLabel).toBe('Test Button');
  });

  it('shows loading state correctly', () => {
    const { getByRole, getByTestId } = render(
      <Button
        title='Test Button'
        onPress={() => {}}
        loading
        testID='test-button'
      />,
    );

    const button = getByRole('button');
    expect(button).toBeDisabled();

    expect(getByTestId('test-button-loading')).toBeTruthy();
  });

  it('hides loading indicator when not loading', () => {
    const { queryByTestId } = render(
      <Button title='Test Button' onPress={() => {}} testID='test-button' />,
    );

    expect(queryByTestId('test-button-loading')).toBeNull();
  });

  it('applies different variants correctly', () => {
    const { getByTestId: getPrimaryButton } = render(
      <Button
        title='Primary'
        onPress={() => {}}
        variant='primary'
        testID='primary-btn'
      />,
    );

    const { getByTestId: getSecondaryButton } = render(
      <Button
        title='Secondary'
        onPress={() => {}}
        variant='secondary'
        testID='secondary-btn'
      />,
    );

    const { getByTestId: getOutlineButton } = render(
      <Button
        title='Outline'
        onPress={() => {}}
        variant='outline'
        testID='outline-btn'
      />,
    );

    const { getByTestId: getTextButton } = render(
      <Button
        title='Text'
        onPress={() => {}}
        variant='text'
        testID='text-btn'
      />,
    );

    const primaryButton = getPrimaryButton('primary-btn');
    const secondaryButton = getSecondaryButton('secondary-btn');
    const outlineButton = getOutlineButton('outline-btn');
    const textButton = getTextButton('text-btn');

    expect(primaryButton).toBeTruthy();
    expect(secondaryButton).toBeTruthy();
    expect(outlineButton).toBeTruthy();
    expect(textButton).toBeTruthy();

    expect(primaryButton.props.style).toEqual(
      expect.objectContaining({
        backgroundColor: '#007AFF',
        borderColor: '#007AFF',
      }),
    );

    expect(secondaryButton.props.style).toEqual(
      expect.objectContaining({
        backgroundColor: '#FF3B30',
        borderColor: '#FF3B30',
      }),
    );

    expect(outlineButton.props.style).toEqual(
      expect.objectContaining({
        backgroundColor: 'transparent',
        borderColor: '#007AFF',
      }),
    );

    expect(textButton.props.style).toEqual(
      expect.objectContaining({
        backgroundColor: 'transparent',
        borderColor: 'transparent',
      }),
    );
  });
});
