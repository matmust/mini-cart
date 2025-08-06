import { getProducts, getProductById } from './productService';

(globalThis as any).fetch = jest.fn();
const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

describe('ProductService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getProducts', () => {
    it('should fetch products successfully', async () => {
      const mockResponse = {
        products: [{ id: 1, title: 'Test Product', price: 100 }],
        total: 1,
        skip: 0,
        limit: 30,
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      const result = await getProducts();

      expect(result).toEqual({
        success: true,
        data: mockResponse,
      });
      expect(fetch).toHaveBeenCalledWith(
        'https://dummyjson.com/products?limit=30&skip=0',
      );
    });

    it('should handle API errors', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      } as Response);

      const result = await getProducts();
      expect(result).toEqual({
        success: false,
        error: 'API Error: HTTP Error: 404 - Not Found',
      });
    });
  });

  describe('getProductById', () => {
    it('should fetch product by ID successfully', async () => {
      const mockProduct = { id: 1, title: 'Test Product', price: 100 };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockProduct,
      } as Response);

      const result = await getProductById(1);

      expect(result).toEqual({
        success: true,
        data: mockProduct,
      });
      expect(fetch).toHaveBeenCalledWith('https://dummyjson.com/products/1');
    });
  });
});
