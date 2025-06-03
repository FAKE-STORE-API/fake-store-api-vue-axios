<template>
  <base-layout>
    <template #header>
      <HeaderComponent />
    </template>
    <template #content>
      <el-input
        v-model="searchQuery"
        style="width: 240px; margin-bottom: 20px"
        placeholder="Search products"
        :prefix-icon="Search"
      />
      <el-row :gutter="20">
        <template v-if="productStore.isLoading">
          <el-col v-for="n in 10" :key="n" :xs="24" :sm="24" :md="12" :lg="8" :xl="4">
            <ProductCardSkeleton />
          </el-col>
        </template>
        <template v-else>
          <template v-if="filteredProducts.length">
            <el-col
              v-for="product in filteredProducts"
              :key="product.id"
              :xs="24"
              :sm="24"
              :md="12"
              :lg="8"
              :xl="4"
            >
              <ProductCard
                :product="product"
                @go-to-product="handleGoToProduct"
                @add-to-cart="handleAddToCart"
                @remove-from-cart="handleRemoveFromCart"
              />
            </el-col>
          </template>
          <template v-else>
            <el-empty description="No products found." />
          </template>
        </template>
      </el-row>
    </template>
  </base-layout>
</template>

<script setup lang="ts">
import { onMounted, ref, computed, watch } from 'vue';

import { Search } from '@element-plus/icons-vue';

import { useProductStore } from '@/stores/productStore';
import { useCartStore } from '@/stores/cartStore';

import HeaderComponent from '@/components/HeaderComponent.vue';
import ProductCard from '@/components/ProductCard.vue';
import ProductCardSkeleton from '@/components/ProductCardSkeleton.vue';

import { useDebouncedRef } from '@/composables/useDebounceRef';

import type { Product } from '@/models/product';

import { useRouter } from 'vue-router';

const router = useRouter();

const productStore = useProductStore();
const cartStore = useCartStore();

const searchQuery = ref('');
const debouncedSearch = useDebouncedRef(searchQuery);

const filteredProducts = computed<Product[]>(() => {
  const search = (debouncedSearch.value || '').toLowerCase();
  if (!debouncedSearch.value) return productStore.products;
  return productStore.products.filter((product) => product.title.toLowerCase().includes(search));
});

const handleGoToProduct = (id: number) => {
  console.log(`Navigating to product with id ${id}.`);
  router.push({ name: 'product-details', params: { id } });
};

const handleAddToCart = (id: number) => {
  console.log(`Adding product with id ${id} to cart.`);
  const product = productStore.products.find((p) => p.id === id);

  if (!product) {
    console.error(`Product with id ${id} not found.`);
    return;
  }

  const item = {
    id: product.id,
    title: product.title,
    price: product.price,
    image: product.image,
    quantity: 1,
  };

  cartStore.addToCart(item);
};

const handleRemoveFromCart = (id: number) => {
  cartStore.removeFromCart(id);
};

onMounted(() => {
  productStore.loadProducts();
});
</script>

<style scoped>
:deep(.el-container) {
  width: 100%;
  max-width: 1800px;
  height: 100vh;
  margin: 0 auto;
}

:deep(.el-header) {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

:deep(.el-divider) {
  margin: 0;
}

:deep(.el-main) {
  scrollbar-width: none;
}

.el-col {
  margin-bottom: 20px;
}
</style>
