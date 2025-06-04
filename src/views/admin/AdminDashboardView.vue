<template>
  <base-layout>
    <template #header>
      <el-header class="header">
        <h1>Welcome, Admin!</h1>
        <el-button type="danger" @click="handleLogout">Logout</el-button>
      </el-header>
    </template>

    <template #content>
      <el-main class="main">
        <div style="margin-bottom: 1rem; display: flex; gap: 1rem">
          <el-card style="max-width: 280px; background-color: #e6a23c; color: white" shadow="hover">
            <p>Total Products: 100</p>
          </el-card>
          <el-card style="max-width: 280px; background-color: #67c23a; color: white" shadow="hover">
            <p>Total Customers: 84</p>
          </el-card>
        </div>
        <div class="dashboard-content">
          <el-tabs type="border-card">
            <el-tab-pane label="My Products">
              <product-table-list />
            </el-tab-pane>
            <el-tab-pane label="My Customers">
              <customer-table-list @add-customer="showUserFormDrawer = true" />
              <add-user-form v-model:drawerVisible="showUserFormDrawer" />
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-main>
    </template>
  </base-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import CustomerTableList from '@/components/CustomerTableList.vue';
import ProductTableList from '@/components/ProductTableList.vue';
import AddUserForm from '@/components/AddUserForm.vue';

import { useAdminStore } from '@/stores/adminStore';

import { useRouter } from 'vue-router';

const adminStore = useAdminStore();

const router = useRouter();

const showUserFormDrawer = ref(false);

const handleLogout = () => {
  adminStore.logout();
  router.push('/');
};
</script>

<style scoped>
:deep(.el-container) {
  width: 100%;
  max-width: 1800px;
  height: 100vh;
  margin: 0 auto;
}

:deep(.el-header) {
  width: 100%;
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
