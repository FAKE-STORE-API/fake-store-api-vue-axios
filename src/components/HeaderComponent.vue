<template>
  <div><h3>Pekeng Tindahan</h3></div>
  <div style="display: flex; gap: 1rem">
    <el-badge :value="cartStore.totalItems" class="item" type="danger">
      <el-button :icon="ShoppingCart" @click="openCartDrawer()"
        >Cart <el-icon class="el-icon--right"><ArrowRight /></el-icon
      ></el-button>
    </el-badge>
  </div>

  <CartDrawer v-model="isCartDrawerOpen" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

import CartDrawer from '@/components/CartDrawer.vue';

import { useCartStore } from '@/stores/cartStore';

import { ShoppingCart, ArrowRight } from '@element-plus/icons-vue';

const cartStore = useCartStore();

const isCartDrawerOpen = ref(false);

const openCartDrawer = () => {
  isCartDrawerOpen.value = true;
};
</script>

<style scoped></style>
