import { apiRequest } from './api';
import { Product, ProductsResponse, ServiceResponse } from '../types';

export const getProducts = async (
  limit = 30,
  skip = 0,
): Promise<ServiceResponse<ProductsResponse>> => {
  try {
    const data = await apiRequest<ProductsResponse>(
      `/products?limit=${limit}&skip=${skip}`,
    );
    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'Failed to fetch products',
    };
  }
};

export const getProductById = async (
  id: number,
): Promise<ServiceResponse<Product>> => {
  try {
    const data = await apiRequest<Product>(`/products/${id}`);
    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch product',
    };
  }
};

export const productService = {
  getProducts,
  getProductById,
};
