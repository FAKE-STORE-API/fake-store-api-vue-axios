import { defineStore } from 'pinia';

import { ref } from 'vue';

import { productService } from '@/services/productService';

import type { Product } from '@/models/product';

export const useProductStore = defineStore('product', () => {
  const products = ref<Product[]>([]);
  const selectedProduct = ref<Product | null>(null);
  const isLoading = ref(false);

  const loadProducts = async () => {
    try {
      isLoading.value = true;
      products.value = await productService.fetchAllProducts();
    } catch (err) {
      console.error(err);
    } finally {
      isLoading.value = false;
    }
  };

  return { products, selectedProduct, isLoading, loadProducts };
});
