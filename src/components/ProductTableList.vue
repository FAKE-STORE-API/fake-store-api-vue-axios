<template>
  <div style="margin-bottom: 16px; display: flex; justify-content: flex-end">
    <el-button type="primary" @click="$emit('add-product')">Add Product</el-button>
  </div>
  <el-table :data="filterTableData" style="width: 100%">
    <el-table-column label="Product Name" prop="title" />
    <el-table-column label="Price" prop="price" />
    <el-table-column label="Description" prop="description" />
    <el-table-column label="Image">
      <template #default="scope">
        <el-image
          style="width: 60px; height: 60px"
          :src="scope.row.image"
          :alt="scope.row.title"
          fit="contain"
        />
      </template>
    </el-table-column>
    <el-table-column label="Rating">
      <template #default="scope">
        {{ scope.row.rating?.rate ?? scope.row.rating ?? '-' }}
      </template>
    </el-table-column>
    <el-table-column align="right">
      <template #header>
        <el-input v-model="search" placeholder="Type to search" />
      </template>
      <template #default="scope">
        <el-button @click="handleEdit(scope.$index, scope.row)"> Edit </el-button>
        <el-button type="danger" @click="handleDelete(scope.$index, scope.row)"> Delete </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import { computed, ref, onMounted } from 'vue';
import type { Product } from '@/models/product';

const search = ref('');

// Only load custom products from localStorage
const LOCAL_STORAGE_KEY = 'customProducts';

function loadCustomProducts(): Product[] {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

const customProducts = ref<Product[]>([]);

onMounted(() => {
  customProducts.value = loadCustomProducts();
});

const filterTableData = computed(() => {
  return customProducts.value.filter(
    (data: Product) =>
      !search.value ||
      data.title.toLowerCase().includes(search.value.toLowerCase()) ||
      data.description.toLowerCase().includes(search.value.toLowerCase()),
  );
});

const handleEdit = (index: number, row: Product) => {
  console.log(index, row);
};
const handleDelete = (index: number, row: Product) => {
  console.log(index, row);
};
</script>
