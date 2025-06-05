<template>
  <el-drawer v-model="drawerVisibleLocal" direction="rtl" :size="isMobile ? '100%' : '30%'">
    <template #header>
      <el-text class="drawer-title">Product Form</el-text>
    </template>
    <div class="demo-drawer__content">
      <el-form :model="form" label-width="auto">
        <el-form-item label="Title">
          <el-input v-model="form.title" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Price">
          <el-input-number v-model="form.price" :min="0" />
        </el-form-item>
        <el-form-item label="Description">
          <el-input v-model="form.description" type="textarea" />
        </el-form-item>
        <el-form-item label="Category">
          <el-input v-model="form.category" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Image URL">
          <el-input v-model="form.image" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div class="demo-drawer__footer">
        <el-button @click="handleCancel()">Cancel</el-button>
        <el-button type="primary" :loading="productStore.isLoading" @click="handleSubmit()">
          {{ productStore.isLoading ? 'Submitting ...' : 'Submit' }}
        </el-button>
      </div>
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref, reactive, watch, onMounted, onUnmounted } from 'vue';
import { useProductStore } from '@/stores/productStore';

import type { Product } from '@/models/product';

const props = defineProps<{
  drawerVisible: boolean;
  editProduct?: Product | null;
}>();

const emit = defineEmits(['update:drawerVisible', 'updated']);

const productStore = useProductStore();

const form = reactive<Product>({
  id: 0,
  title: '',
  price: 0,
  description: '',
  category: '',
  image: '',
});

const resetForm = () => {
  form.id = 0;
  form.title = '';
  form.price = 0;
  form.description = '';
  form.category = '';
  form.image = '';
};

const handleCancel = () => {
  resetForm();
  drawerVisibleLocal.value = false;
};

const handleSubmit = async () => {
  if (form.id) {
    // Edit mode
    const success = productStore.updateProduct({ ...form });
    if (success) {
      emit('updated');
      resetForm();
      emit('update:drawerVisible', false);
    }
  } else {
    // Add mode
    const newProduct = {
      ...form,
      id: Date.now(),
      rating: {
        rate: +(Math.random() * 5).toFixed(1),
        count: Math.floor(Math.random() * 100) + 1,
      },
    };
    productStore.addProduct(newProduct);
    emit('updated');
    resetForm();
    emit('update:drawerVisible', false);
  }
};

watch(
  () => props.editProduct,
  (product) => {
    if (product) {
      Object.assign(form, product);
    } else {
      resetForm();
    }
  },
  { immediate: true },
);

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

onMounted(() => {
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<style scoped>
.drawer-title {
  color: rgb(39, 86, 160);
  font-weight: bold;
  font-size: 1.2em;
}
</style>
