<template>
  <el-drawer v-model="drawerVisibleLocal" direction="rtl" :size="isMobile ? '100%' : '30%'">
    <template #header>
      <el-text class="drawer-title">User Form</el-text>
    </template>
    <div class="demo-drawer__content">
      <el-form :model="form" label-width="auto">
        <el-form-item label="First Name">
          <el-input v-model="form.firstName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Last Name">
          <el-input v-model="form.lastName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Email">
          <el-input v-model="form.email" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Contact Number">
          <el-input v-model="form.contactNumber" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Password">
          <el-input v-model="form.password" type="password" autocomplete="off" show-password />
        </el-form-item>
        <el-form-item label="Confirm Password">
          <el-input
            v-model="form.confirmPassword"
            type="password"
            autocomplete="off"
            show-password
          />
        </el-form-item>
      </el-form>
      <div class="demo-drawer__footer">
        <el-button @click="handleCancel()">Cancel</el-button>
        <el-button type="primary" :loading="registrationStore.isLoading" @click="handleSubmit()">
          {{ registrationStore.isLoading ? 'Submitting ...' : 'Submit' }}
        </el-button>
      </div>
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, reactive, watch } from 'vue';

import { useRegistrationStore } from '@/stores/useStore';

import { v4 as uuidv4 } from 'uuid';

const props = defineProps<{
  drawerVisible: boolean;
}>();

const emit = defineEmits(['update:drawerVisible']);

const drawerVisibleLocal = ref(props.drawerVisible);

watch(
  () => props.drawerVisible,
  (val) => {
    drawerVisibleLocal.value = val;
  },
);

watch(drawerVisibleLocal, (val) => {
  emit('update:drawerVisible', val);
});

const isMobile = ref(window.innerWidth < 768);

const handleResize = () => {
  isMobile.value = window.innerWidth < 1200;
};

const registrationStore = useRegistrationStore();

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  contactNumber: '',
  password: '',
  confirmPassword: '',
});

const resetForm = () => {
  form.firstName = '';
  form.lastName = '';
  form.email = '';
  form.contactNumber = '';
  form.password = '';
  form.confirmPassword = '';
};

const handleCancel = () => {
  resetForm();
  drawerVisibleLocal.value = false;
};

const handleSubmit = async () => {
  const userData = {
    id: uuidv4(),
    ...form,
    role: 'isCustomer' as const,
  };
  const success = await registrationStore.registerUser(userData);
  if (success) {
    resetForm();
    drawerVisibleLocal.value = false;
  }
};

onMounted(() => {
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<style scoped>
.drawer-title {
  color: rgb(160, 39, 39);
  font-weight: bold;
  font-size: 1.2em;
}
</style>
