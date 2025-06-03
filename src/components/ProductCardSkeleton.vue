<template>
  <el-card class="product-card" shadow="hover">
    <el-skeleton animated>
      <template #template>
        <div class="skeleton-image-wrapper">
          <el-skeleton-item variant="image" class="skeleton-image" />
        </div>
      </template>
    </el-skeleton>
    <template #footer>
      <el-skeleton :rows="1" animated />
    </template>
  </el-card>
</template>

<script setup lang="ts"></script>

<style scoped>
.product-card {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.skeleton-image-wrapper {
  width: 100%;
  aspect-ratio: 3/2;
  background: transparent;
  margin-bottom: 1rem;
  position: relative;
  overflow: hidden;
  border-radius: 4px;
}

.skeleton-image {
  width: 100%;
  height: 100%;
  background-color: #f2f2f2;
  border-radius: 4px;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
