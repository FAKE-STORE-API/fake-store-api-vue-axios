<template>
  <div style="margin-bottom: 16px; display: flex; justify-content: flex-end">
    <el-button type="primary" @click="emit('add-customer')">Add Customer</el-button>
  </div>
  <el-table :data="filterTableData" style="width: 100%">
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
import { storeToRefs } from 'pinia';
import { useRegistrationStore } from '@/stores/useStore';

const emit = defineEmits(['add-customer', 'edit-customer']);

const registrationStore = useRegistrationStore();
const { getUsers } = storeToRefs(registrationStore);

const search = ref('');

const filterTableData = computed(() =>
  getUsers.value.filter(
    (data) =>
      !search.value ||
      data.lastName.toLowerCase().includes(search.value.toLowerCase()) ||
      data.firstName.toLowerCase().includes(search.value.toLowerCase()) ||
      data.email.toLowerCase().includes(search.value.toLowerCase()),
  ),
);

const handleEdit = (index: number, row: any) => {
  console.log(index, row);
  emit('edit-customer', row);
};
const handleDelete = (index: number, row: any) => {
  console.log(index, row);
};
</script>
