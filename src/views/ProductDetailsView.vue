<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <HeaderComponent />
      </el-header>
      <el-main>
        <el-card class="product-card">
          <el-image
            :src="productStore.selectedProduct?.image"
            fit="contain"
            :alt="productStore.selectedProduct?.title"
            draggable="false"
            hover
          />
          <template #footer>
            <el-text size="large" tag="b">{{ productStore.selectedProduct?.title }}</el-text>
            <el-text>{{ productStore.selectedProduct?.description }}</el-text>
            <el-tag type="primary">{{ productStore.selectedProduct?.category }}</el-tag>
            <el-rate
              :model-value="productStore.selectedProduct?.rating?.rate"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value} points"
            />
            <el-text type="success" size="large" tag="b"
              >$ {{ productStore.selectedProduct?.price?.toLocaleString() }}</el-text
            >
            <el-button
              class="add-to-cart-btn"
              :type="cartStore.isInCart(props.id) ? 'danger' : 'primary'"
              @click.stop="
                cartStore.isInCart(props.id)
                  ? handleRemoveFromCart(props.id)
                  : handleAddToCart(props.id)
              "
              >{{ cartStore.isInCart(props.id) ? 'Remove from Cart' : 'Add to Cart' }}</el-button
            >
          </template>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

import { useProductStore } from '@/stores/productStore';
import { useCartStore } from '@/stores/cartStore';

import HeaderComponent from '@/components/HeaderComponent.vue';

const props = defineProps<{ id: number }>();

const productStore = useProductStore();
const cartStore = useCartStore();

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

onMounted(async () => {
  await productStore.loadProductById(props.id);
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

.product-card {
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

:deep(.el-card__body),
:deep(.el-card__footer) {
  width: 100%;
}

:deep(.el-image) {
  width: 100%;
  display: flex;
  justify-content: center;
}

:deep(.el-image__inner) {
  width: 100%;
  height: auto;
  aspect-ratio: 3/2;
}

:deep(.el-card__footer) {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  width: 100%;
}

:deep(.el-text) {
  align-self: self-start;
  text-wrap: wrap;
}

.add-to-cart-btn {
  width: 100%;
  border-radius: 4px;
  text-align: center;
}

@media (min-width: 480px) {
  .product-card {
    max-width: 1200px;
    flex-direction: row;
  }
}
</style>
