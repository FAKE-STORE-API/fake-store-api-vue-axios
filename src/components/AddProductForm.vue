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

const props = defineProps<{
  drawerVisible: boolean;
}>();

const emit = defineEmits(['update:drawerVisible', 'updated']);

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

const productStore = useProductStore();

const form = reactive({
  title: '',
  price: 0,
  description: '',
  category: '',
  image: '',
});

const resetForm = () => {
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
  // Generate a unique id for the new product (could use Date.now() or a uuid)
  const newProduct = {
    id: Date.now(),
    title: form.title,
    price: form.price,
    description: form.description,
    category: form.category,
    image: form.image,
    rating: {
      rate: 0,
      count: 0,
    },
  };
  productStore.addProduct(newProduct);
  emit('updated');
  resetForm();
  drawerVisibleLocal.value = false;
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
