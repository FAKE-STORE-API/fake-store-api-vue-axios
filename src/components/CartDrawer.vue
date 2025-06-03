<template>
  <el-drawer v-model="isCartDrawerOpen" direction="rtl" :size="isMobile ? '100%' : '20%'">
    <template #header>
      <el-text class="cart-title">{{ cartTitle }}</el-text>
    </template>
    <div>
      <el-empty
        v-if="!cartStore.cartItems.length"
        description="Your cart is empty"
        style="margin-top: 20px; text-align: center"
      />
      <div v-else>
        <div class="cart-items-container">
          <div v-for="item in cartStore.cartItems" :key="item.id" class="cart-item">
            <div class="cart-item-content">
              <div style="align-self: flex-end">
                <el-button
                  type="danger"
                  :icon="Close"
                  @click="useCartStore().removeFromCart(item.id)"
                />
              </div>
              <el-image
                :src="item.image"
                fit="cover"
                style="
                  width: 100px;
                  height: auto;
                  margin-right: 10px;
                  position: relative;
                  bottom: 100px;
                  left: 20px;
                "
              />
              <div style="margin-bottom: 10px">
                <el-text>{{ item.title }}</el-text>
              </div>
              <div style="display: flex; justify-content: space-between">
                <el-text type="success" size="large">$ {{ item.price.toLocaleString() }}</el-text>
                <el-button-group class="ml-4">
                  <el-button @click="cartStore.addQuantity(item.id)" type="primary" :icon="Plus" />
                  <el-button type="primary">{{ item.quantity }}</el-button>
                  <el-button
                    @click="cartStore.subtractQuantity(item.id)"
                    type="primary"
                    :icon="Minus"
                  />
                </el-button-group>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <template #footer>
      <el-text tag="b" size="large">$ {{ cartStore.totalPrice }}</el-text>

      <el-button
        type="success"
        :disabled="!cartStore.cartItems.length"
        style="width: 100%; margin-top: 20px"
      >
        Proceed to Checkout
        <el-icon class="el-icon--right"><ArrowRight /></el-icon>
      </el-button>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref, watch, computed, onMounted, onUnmounted } from 'vue';

import { useCartStore } from '@/stores/cartStore';

import { ArrowRight } from '@element-plus/icons-vue';

import { Plus, Minus, Close } from '@element-plus/icons-vue';

const props = defineProps<{
  modelValue?: boolean;
}>();

const emit = defineEmits<{ (e: 'update:modelValue', value: boolean): void }>();

const cartStore = useCartStore();

const isCartDrawerOpen = ref(props.modelValue);

const cartTitle = computed(() => `Shopping (${cartStore.totalItems}) item/s`);

const isMobile = ref(window.innerWidth < 768);

const handleResize = () => {
  isMobile.value = window.innerWidth < 1200;
};

watch(isCartDrawerOpen, (newValue) => {
  emit('update:modelValue', newValue);
});

watch(
  () => props.modelValue,
  (newValue) => {
    isCartDrawerOpen.value = newValue ?? false;
  },
  { immediate: true },
);

onMounted(() => {
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<style scoped>
.cart-title {
  color: rgb(160, 39, 39);
  font-weight: bold;
  font-size: 1.2em;
}

.cart-item-content {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  border: 2px solid rgb(109, 107, 107);
  border-radius: 20px;
}

.cart-items-container {
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  gap: 100px;
}
</style>
