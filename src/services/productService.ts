import api from './api';

import type { Product } from '@/models/product';

export const productService = {
  async fetchAllProducts(): Promise<Product[]> {
    const response = await api.get<Product[]>('https://fakestoreapi.com/products');
    return response.data;
  },
};
