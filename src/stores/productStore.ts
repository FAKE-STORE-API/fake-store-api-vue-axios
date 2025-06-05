import { defineStore } from 'pinia';

import { ref } from 'vue';

import { productService } from '@/services/productService';

import type { Product } from '@/models/product';

export const useProductStore = defineStore('product', () => {
  const products = ref<Product[]>([]);
  const selectedProduct = ref<Product | null>(null);
  const isLoading = ref(false);

  const LOCAL_STORAGE_KEY = 'customProducts';

  function loadCustomProducts(): Product[] {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  function saveCustomProducts(customProducts: Product[]) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(customProducts));
  }

  const addProduct = (newProduct: Product) => {
    const customProducts = loadCustomProducts();
    customProducts.push(newProduct);
    saveCustomProducts(customProducts);

    products.value.push(newProduct);
  };

  const loadProducts = async () => {
    try {
      isLoading.value = true;
      const apiProducts = await productService.fetchAllProducts();
      const customProducts = loadCustomProducts();
      products.value = [...apiProducts, ...customProducts];
    } catch (err) {
      console.error(err);
    } finally {
      isLoading.value = false;
    }
  };

  const loadProductById = async (id: number) => {
    try {
      console.log(`Loading product with ID: ${id}`);
      isLoading.value = true;
      const product = await productService.fetchProductById(id);

      selectedProduct.value = product;
      console.log(`Loaded product from store:`, selectedProduct.value);
    } catch (err) {
      console.error(err);
    } finally {
      isLoading.value = false;
    }
  };

  return { products, selectedProduct, isLoading, loadProducts, loadProductById, addProduct };
});
