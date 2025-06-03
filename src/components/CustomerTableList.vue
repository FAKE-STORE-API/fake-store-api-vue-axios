<template>
  <div style="margin-bottom: 16px; display: flex; justify-content: flex-end">
    <el-button type="primary">Add Customer</el-button>
  </div>
  <el-table :data="filterTableData" style="width: 100%">
    <el-table-column label="Created At" prop="date" />
    <el-table-column label="First Name" prop="firstName" />
    <el-table-column label="Last Name" prop="lastName" />
    <el-table-column label="Email" prop="email" />
    <el-table-column label="Contact Number" prop="contactNumber" />
    <el-table-column label="Password" prop="password" />
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

interface Customer {
  date: string;
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
  password: string;
}

const search = ref('');
const filterTableData = computed(() =>
  tableData.filter(
    (data) =>
      !search.value ||
      data.lastName.toLowerCase().includes(search.value.toLowerCase()) ||
      data.firstName.toLowerCase().includes(search.value.toLowerCase()),
  ),
);
const handleEdit = (index: number, row: Customer) => {
  console.log(index, row);
};
const handleDelete = (index: number, row: Customer) => {
  console.log(index, row);
};

const tableData = [
  {
    date: '2024-06-01',
    firstName: 'Alice',
    lastName: 'Smith',
    email: 'alice.smith@example.com',
    contactNumber: '123-456-7890',
    password: 'password123',
  },
  {
    date: '2024-06-02',
    firstName: 'Bob',
    lastName: 'Johnson',
    email: 'bob.johnson@example.com',
    contactNumber: '234-567-8901',
    password: 'securepass',
  },
  {
    date: '2024-06-03',
    firstName: 'Carol',
    lastName: 'Williams',
    email: 'carol.williams@example.com',
    contactNumber: '345-678-9012',
    password: 'mysecret',
  },
];
</script>
