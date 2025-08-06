import { useState, useEffect, useCallback } from 'react';
import { Product } from '../types';
import { productService } from '../services';

interface UseProductDetailReturn {
  product: Product | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useProductDetail = (productId: number): UseProductDetailReturn => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProduct = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await productService.getProductById(productId);

      if (response.success && response.data) {
        setProduct(response.data);
      } else {
        setError(response.error || 'Failed to fetch product');
      }
    } catch (err) {
      setError('An unexpected error occurred');
      console.error('Error in useProductDetail:', err);
    } finally {
      setLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  const refetch = useCallback(async () => {
    await fetchProduct();
  }, [fetchProduct]);

  return {
    product,
    loading,
    error,
    refetch,
  };
};

export default useProductDetail;
