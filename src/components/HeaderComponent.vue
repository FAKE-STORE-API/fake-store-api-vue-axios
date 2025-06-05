<template>
  <div><h3>Pekeng Tindahan</h3></div>
  <div style="display: flex; gap: 1rem; align-items: center">
    <el-badge :value="cartStore.totalItems" class="item" type="danger">
      <el-button :icon="ShoppingCart" @click="openCartDrawer()"
        >Cart <el-icon class="el-icon--right"><ArrowRight /></el-icon
      ></el-button>
    </el-badge>
    <el-dropdown>
      <el-avatar :src="UserProfile" size="large" style="margin-left: 16px; cursor: pointer" />
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="logoutConfirmDialog = true">
            <el-icon><i class="el-icon-switch-button" /></el-icon>
            Logout
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <el-dialog
      v-model="logoutConfirmDialog"
      title="Confirm Logout"
      width="30%"
      :before-close="
        () => {
          logoutConfirmDialog = false;
        }
      "
    >
      <span>Are you sure you want to logout?</span>
      <template #footer>
        <el-button @click="logoutConfirmDialog = false">Cancel</el-button>
        <el-button type="primary" @click="confirmLogout">Confirm</el-button>
      </template>
    </el-dialog>
  </div>

  <CartDrawer v-model="isCartDrawerOpen" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import UserProfile from '@/assets/catto.jpg';

import CartDrawer from '@/components/CartDrawer.vue';

import { useCartStore } from '@/stores/cartStore';
import { useAuthenticationStore } from '@/stores/useStore';

import { ShoppingCart, ArrowRight } from '@element-plus/icons-vue';

const cartStore = useCartStore();
const authenticationStore = useAuthenticationStore();

const isCartDrawerOpen = ref(false);
const logoutConfirmDialog = ref(false);

const confirmLogout = () => {
  authenticationStore.logout();
  logoutConfirmDialog.value = false;
};

const openCartDrawer = () => {
  isCartDrawerOpen.value = true;
};
</script>

<style scoped></style>
