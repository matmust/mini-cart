import React from 'react';
import { render, waitFor, act } from '@testing-library/react-native';
import ProductListScreen from './ProductListScreen';
import { CartProvider } from '../../context';
import { productService } from '../../services';

jest.mock('../../services', () => ({
  productService: {
    getProducts: jest.fn(),
  },
}));

const mockedProductService = productService as jest.Mocked<
  typeof productService
>;

describe('ProductListScreen', () => {
  const mockNavigation = {
    navigate: jest.fn(),
  } as any;

  const renderProductListScreen = () => {
    return render(
      <CartProvider>
        <ProductListScreen navigation={mockNavigation} route={{} as any} />
      </CartProvider>,
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('shows loading spinner initially', () => {
    mockedProductService.getProducts.mockReturnValue(new Promise(() => {}));

    const { getByTestId } = renderProductListScreen();
    expect(getByTestId('products-loading')).toBeTruthy();
  });

  it('displays products after successful fetch', async () => {
    const mockProducts = [
      {
        id: 1,
        title: 'Test Product',
        description: 'Test Description',
        price: 99.99,
        thumbnail: 'https://example.com/image.jpg',
        images: ['https://example.com/image.jpg'],
        rating: 4.5,
        stock: 10,
        discountPercentage: 0,
        brand: 'Test Brand',
        category: 'Test Category',
      },
    ];

    mockedProductService.getProducts.mockResolvedValue({
      success: true,
      data: { products: mockProducts, total: 1, skip: 0, limit: 30 },
    });

    const { getByTestId } = renderProductListScreen();

    await waitFor(() => {
      expect(getByTestId('products-list')).toBeTruthy();
      expect(getByTestId('product-card-1')).toBeTruthy();
    });
  });

  it('shows error message on fetch failure', async () => {
    mockedProductService.getProducts.mockResolvedValue({
      success: false,
      error: 'Network error',
    });

    const { getByTestId } = renderProductListScreen();

    await waitFor(() => {
      expect(getByTestId('products-error')).toBeTruthy();
    });
  });

  it('handles pull to refresh', async () => {
    const mockProducts: any[] = [];
    mockedProductService.getProducts.mockResolvedValue({
      success: true,
      data: { products: mockProducts, total: 0, skip: 0, limit: 30 },
    });

    const { getByTestId } = renderProductListScreen();

    await waitFor(() => {
      expect(getByTestId('products-list')).toBeTruthy();
    });

    expect(mockedProductService.getProducts).toHaveBeenCalledTimes(1);

    const flatList = getByTestId('products-list');
    const refreshControl = flatList.props.refreshControl;

    if (refreshControl && refreshControl.props.onRefresh) {
      await act(async () => {
        refreshControl.props.onRefresh();
      });
    }

    await waitFor(() => {
      expect(mockedProductService.getProducts).toHaveBeenCalledTimes(2);
    });
  });
});
