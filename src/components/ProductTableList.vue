<template>
  <div style="margin-bottom: 16px; display: flex; justify-content: flex-end">
    <el-button type="success">Add Product</el-button>
  </div>
  <el-table :data="filterTableData" style="width: 100%">
    <el-table-column label="Created At" prop="date" />
    <el-table-column label="Title" prop="title" />
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
    <el-table-column label="Rating" prop="rating" />
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
import { computed, ref } from 'vue';

import type { Product } from '@/models/product';

const search = ref('');
const tableData = [
  {
    date: '2024-06-01',
    title: 'Wireless Mouse',
    price: 25.99,
    description: 'A comfortable wireless mouse with ergonomic design.',
    image:
      'https://www.shutterstock.com/image-vector/set-two-minimalist-white-wireless-260nw-2504723227.jpg',
    rating: 4.5,
  },
  {
    date: '2024-06-02',
    title: 'Mechanical Keyboard',
    price: 79.99,
    description: 'RGB backlit mechanical keyboard with blue switches.',
    image:
      'https://meletrix.com/cdn/shop/products/1_6209d067-e4d5-47cc-bdd1-e02d6ca22b11.jpg?v=1680458276&width=2048',
    rating: 4.8,
  },
  {
    date: '2024-06-03',
    title: 'HD Monitor',
    price: 199.99,
    description: '24-inch Full HD monitor with ultra-thin bezels.',
    image: 'https://www.unison.com.ph/wp-content/uploads/2023/02/22MP410-B.png',
    rating: 4.6,
  },
];

const filterTableData = computed(() =>
  tableData.filter(
    (data) =>
      !search.value ||
      data.title.toLowerCase().includes(search.value.toLowerCase()) ||
      data.description.toLowerCase().includes(search.value.toLowerCase()),
  ),
);

const handleEdit = (index: number, row: Product) => {
  console.log(index, row);
};
const handleDelete = (index: number, row: Product) => {
  console.log(index, row);
};
</script>
