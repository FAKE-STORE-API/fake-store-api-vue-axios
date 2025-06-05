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

    if (!newProduct.rating) {
      newProduct.rating = {
        rate: +(Math.random() * 5).toFixed(1),
        count: Math.floor(Math.random() * 100) + 1,
      };
    }

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

  const updateProduct = (updatedProduct: Product) => {
    const customProducts = loadCustomProducts();
    const index = customProducts.findIndex((p: Product) => p.id === updatedProduct.id);

    if (index !== -1) {
      customProducts[index] = { ...updatedProduct };
      saveCustomProducts(customProducts);

      const storeIndex = products.value.findIndex((p) => p.id === updatedProduct.id);
      if (storeIndex !== -1) {
        products.value[storeIndex] = { ...updatedProduct };
      }
      return true;
    }
    return false;
  };

  const deleteProduct = (id: number) => {
    const customProducts = loadCustomProducts().filter((p: Product) => p.id !== id);
    saveCustomProducts(customProducts);

    const index = products.value.findIndex((p) => p.id === id);
    if (index !== -1) {
      products.value.splice(index, 1);
      return true;
    }
    return false;
  };

  return {
    products,
    selectedProduct,
    isLoading,
    loadProducts,
    loadProductById,
    addProduct,
    updateProduct,
    deleteProduct,
  };
});
