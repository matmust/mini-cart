import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import ImageComponent from './Image';

describe('Image Component', () => {
  const mockImageSource = { uri: 'https://example.com/image.jpg' };

  it('renders correctly with basic props', () => {
    const { getByTestId } = render(
      <ImageComponent source={mockImageSource} testID='test-image' />,
    );

    expect(getByTestId('test-image')).toBeTruthy();
  });

  it('shows loading indicator initially', () => {
    const { getByTestId } = render(
      <ImageComponent source={mockImageSource} testID='test-image' />,
    );

    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  it('hides loading indicator when image loads', async () => {
    const { getByTestId, queryByTestId } = render(
      <ImageComponent source={mockImageSource} testID='test-image' />,
    );

    const imageInstance = getByTestId('test-image');

    if (imageInstance.props.onLoadEnd) {
      fireEvent(imageInstance, 'loadEnd');
    }

    await waitFor(() => {
      expect(queryByTestId('loading-indicator')).toBeNull();
    });
  });

  it('shows error state when image fails to load', async () => {
    const { getByTestId } = render(
      <ImageComponent source={mockImageSource} testID='test-image' />,
    );

    const imageInstance = getByTestId('test-image');

    if (imageInstance.props.onError) {
      fireEvent(imageInstance, 'error');
    }

    await waitFor(() => {
      expect(getByTestId('error-indicator')).toBeTruthy();
    });
  });

  it('applies custom dimensions', () => {
    const { getByTestId } = render(
      <ImageComponent
        source={mockImageSource}
        width={200}
        height={150}
        testID='test-image'
      />,
    );

    const imageElement = getByTestId('test-image');
    expect(imageElement.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ width: 200 }),
        expect.objectContaining({ height: 150 }),
      ]),
    );
  });

  it('applies correct testID', () => {
    const testID = 'custom-test-id';
    const { getByTestId } = render(
      <ImageComponent source={mockImageSource} testID={testID} />,
    );

    expect(getByTestId(testID)).toBeTruthy();
  });
});
