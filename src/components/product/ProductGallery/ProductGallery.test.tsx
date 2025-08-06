import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ProductGallery from './ProductGallery';

describe('ProductGallery', () => {
  const mockImages = [
    'https://example.com/image1.jpg',
    'https://example.com/image2.jpg',
    'https://example.com/image3.jpg',
  ];

  it('renders gallery with multiple images', () => {
    const { getByTestId, getAllByTestId } = render(
      <ProductGallery images={mockImages} testID='product-gallery' />,
    );

    expect(getByTestId('product-gallery')).toBeTruthy();
    expect(getAllByTestId(/gallery-image-/)).toHaveLength(mockImages.length);
  });

  it('renders indicators when multiple images', () => {
    const { getAllByTestId } = render(<ProductGallery images={mockImages} />);

    expect(getAllByTestId(/indicator-/)).toHaveLength(mockImages.length);
  });

  it('does not render indicators for single image', () => {
    const { queryByTestId } = render(
      <ProductGallery images={[mockImages[0]]} />,
    );

    expect(queryByTestId('indicator-0')).toBeNull();
  });

  it('handles empty images array', () => {
    const { getByTestId } = render(<ProductGallery images={[]} />);

    expect(getByTestId('empty-gallery')).toBeTruthy();
  });

  it('shows indicators for multiple images', () => {
    const { getAllByTestId } = render(<ProductGallery images={mockImages} />);

    expect(getAllByTestId(/indicator-/)).toHaveLength(mockImages.length);
  });

  it('changes current image on indicator press', () => {
    const { getByTestId, getAllByTestId } = render(
      <ProductGallery images={mockImages} />,
    );

    const indicators = getAllByTestId(/indicator-/);

    expect(indicators[0]).toHaveStyle({
      backgroundColor: '#007AFF',
      width: 12,
    });

    expect(indicators[1]).toHaveStyle({
      backgroundColor: '#C6C6C8',
      width: 8,
    });

    fireEvent.press(getByTestId('indicator-1'));

    expect(indicators[1]).toHaveStyle({
      backgroundColor: '#007AFF',
    });
  });

  it('updates active indicator when different indicators are pressed', () => {
    const { getByTestId, getAllByTestId } = render(
      <ProductGallery images={mockImages} />,
    );

    const indicators = getAllByTestId(/indicator-/);

    fireEvent.press(getByTestId('indicator-2'));

    expect(indicators[2]).toHaveStyle({
      backgroundColor: '#007AFF',
      width: 12,
    });

    fireEvent.press(getByTestId('indicator-0'));

    expect(indicators[0]).toHaveStyle({
      backgroundColor: '#007AFF',
      width: 12,
    });
  });

  it('handles rapid indicator presses correctly', () => {
    const { getByTestId, getAllByTestId } = render(
      <ProductGallery images={mockImages} />,
    );

    const indicators = getAllByTestId(/indicator-/);

    fireEvent.press(getByTestId('indicator-1'));
    fireEvent.press(getByTestId('indicator-2'));
    fireEvent.press(getByTestId('indicator-0'));

    expect(indicators[0]).toHaveStyle({
      backgroundColor: '#007AFF',
    });
  });
});
