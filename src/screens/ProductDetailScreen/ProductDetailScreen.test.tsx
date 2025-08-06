import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import ProductDetailScreen from './ProductDetailScreen';
import { CartProvider } from '../../context';
import { productService } from '../../services';
import { Product } from '../../types';

jest.mock('../../services', () => ({
  productService: {
    getProductById: jest.fn(),
  },
}));
const mockedProductService = productService as jest.Mocked<
  typeof productService
>;

describe('ProductDetailScreen', () => {
  const mockNavigation = {
    navigate: jest.fn(),
  } as any;

  const mockRoute = {
    params: { productId: 1 },
  } as any;

  const mockProduct: Product = {
    id: 1,
    title: 'Test Product',
    description: 'Test product description',
    price: 99.99,
    discountPercentage: 10,
    rating: 4.5,
    stock: 20,
    brand: 'Test Brand',
    category: 'test-category',
    thumbnail: 'https://example.com/image.jpg',
    images: ['https://example.com/image1.jpg'],
  };

  const renderProductDetailScreen = () => {
    return render(
      <CartProvider>
        <ProductDetailScreen navigation={mockNavigation} route={mockRoute} />
      </CartProvider>,
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows loading spinner initially', () => {
    mockedProductService.getProductById.mockReturnValue(new Promise(() => {}));

    const { getByTestId } = renderProductDetailScreen();
    expect(getByTestId('product-detail-loading')).toBeTruthy();
  });

  it('displays product details after successful fetch', async () => {
    mockedProductService.getProductById.mockResolvedValue({
      success: true,
      data: mockProduct,
    });

    const { getByText, getByTestId } = renderProductDetailScreen();

    await waitFor(() => {
      expect(getByTestId('product-detail-scroll')).toBeTruthy();
      expect(getByText('Test Product')).toBeTruthy();
      expect(getByText('Test product description')).toBeTruthy();
      expect(getByText('Test Brand')).toBeTruthy();
    });
  });

  it('shows error message on fetch failure', async () => {
    mockedProductService.getProductById.mockResolvedValue({
      success: false,
      error: 'Product not found',
    });

    const { getByTestId } = renderProductDetailScreen();

    await waitFor(() => {
      expect(getByTestId('product-detail-error')).toBeTruthy();
    });
  });

  it('displays discount information correctly', async () => {
    mockedProductService.getProductById.mockResolvedValue({
      success: true,
      data: mockProduct,
    });

    const { getByText } = renderProductDetailScreen();

    await waitFor(() => {
      expect(getByText('-10% OFF')).toBeTruthy();
      expect(getByText('$89.99')).toBeTruthy();
      expect(getByText('You save $10.00')).toBeTruthy();
    });
  });

  it('displays product details correctly', async () => {
    mockedProductService.getProductById.mockResolvedValue({
      success: true,
      data: mockProduct,
    });

    const { getByText, getAllByText } = renderProductDetailScreen();

    await waitFor(() => {
      expect(getByText('Test Product')).toBeTruthy();
      expect(getByText('Test product description')).toBeTruthy();
      expect(getByText('20 left')).toBeTruthy();
      expect(getByText('(4.5)')).toBeTruthy();

      const brandElements = getAllByText('Test Brand');
      expect(brandElements.length).toBe(1);

      const categoryElements = getAllByText('test-category');
      expect(categoryElements.length).toBe(1);
    });
  });

  it('handles out of stock products', async () => {
    const outOfStockProduct = { ...mockProduct, stock: 0 };
    mockedProductService.getProductById.mockResolvedValue({
      success: true,
      data: outOfStockProduct,
    });

    const { getAllByText, getByTestId } = renderProductDetailScreen();

    await waitFor(() => {
      const outOfStockElements = getAllByText('Out of Stock');
      expect(outOfStockElements.length).toBe(2);

      const addToCartButton = getByTestId('add-to-cart-detail');
      expect(addToCartButton).toBeTruthy();
      expect(addToCartButton.props.accessibilityState.disabled).toBe(true);
    });
  });
});
