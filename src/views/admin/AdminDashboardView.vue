<template>
  <base-layout>
    <template #header>
      <el-header class="header">
        <h1>Dashboard</h1>
      </el-header>
    </template>

    <template #content>
      <el-main class="main">
        <div class="dashboard-content">
          <p>Welcome to the admin dashboard!</p>
          <!-- Add more dashboard content here -->
        </div>
      </el-main>
    </template>
  </base-layout>
</template>

<script setup lang="ts"></script>

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
