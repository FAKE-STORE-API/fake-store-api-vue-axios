<template>
  <el-card class="product-card" shadow="hover" @click="emit('go-to-product', product.id)">
    <el-image :src="product.image" fit="contain" alt="{{ product.name }}" draggable="false" hover />
    <template #footer>
      <el-text class="truncate-text">{{ product.title }}</el-text>
      <el-rate
        :model-value="product.rating.rate"
        disabled
        text-color="#ff9900"
        style="display: block"
      />
      <el-text type="success" size="large">$ {{ product.price.toLocaleString() }}</el-text>
      <div>
        <el-button
          class="add-to-cart-btn"
          :type="cartStore.isInCart(product.id) ? 'danger' : 'primary'"
          @click.stop="
            cartStore.isInCart(product.id)
              ? emit('remove-from-cart', product.id)
              : emit('add-to-cart', product.id)
          "
          >{{ cartStore.isInCart(product.id) ? 'Remove from Cart' : 'Add to Cart' }}</el-button
        >
      </div>
    </template>
  </el-card>
</template>

<script setup lang="ts">
import { useCartStore } from '@/stores/cartStore';

import type { Product } from '@/models/product';

const props = defineProps<{
  product: Product;
}>();

const emit = defineEmits<{
  (e: 'add-to-cart', id: number): void;
  (e: 'remove-from-cart', id: number): void;
  (e: 'go-to-product', id: number): void;
}>();

const cartStore = useCartStore();
</script>

<style scoped>
:deep(.el-image__inner) {
  max-width: 100%;
  aspect-ratio: 3/2;
}

.truncate-text {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-clamp: 1;
  box-orient: vertical;
  margin-bottom: 1.5rem;
}

.add-to-cart-btn {
  width: 100%;
  border-radius: 4px;
  text-align: center;
  margin-top: 1.5rem;
}
</style>
