import { useState, useEffect, useCallback } from 'react';
import { Product } from '../types';
import { productService } from '../services';

interface UseProductsReturn {
  products: Product[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useProducts = (limit = 30, skip = 0): UseProductsReturn => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await productService.getProducts(limit, skip);

      if (response.success && response.data) {
        setProducts(response.data.products);
      } else {
        setError(response.error || 'Failed to fetch products');
      }
    } catch (err) {
      setError('An unexpected error occurred');
      console.error('Error in useProducts:', err);
    } finally {
      setLoading(false);
    }
  }, [limit, skip]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const refetch = useCallback(async () => {
    await fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    loading,
    error,
    refetch,
  };
};

export default useProducts;
