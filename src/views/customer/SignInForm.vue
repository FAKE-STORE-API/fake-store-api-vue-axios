<template>
  <el-form
    :model="loginForm"
    ref="loginFormRef"
    :rules="loginRules"
    label-width="auto"
    status-icon
    class="animated-form"
  >
    <el-row>
      <el-text :style="{ fontFamily: 'bold', color: 'black' }">Email</el-text>
      <el-col :span="24">
        <el-form-item prop="email">
          <el-input
            v-model="loginForm.email"
            :prefix-icon="Message"
            placeholder="Enter your email"
            input-style="font-family:regular"
            @input="loginRemoveWhitespace('email')"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-text :style="{ fontFamily: 'bold', color: 'black' }">Password</el-text>
      <el-col :span="24">
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            :prefix-icon="Unlock"
            type="password"
            placeholder="Enter your password"
            input-style="font-family:regular"
            @input="loginRemoveWhitespace('password')"
            show-password
            maxlength="13"
            minlength="8"
          />
        </el-form-item>
      </el-col>
    </el-row>

    <el-row style="margin-top: 20px; text-align: center">
      <el-col :span="24">
        <el-text>Don't have an account? </el-text>
        <a @click.prevent="emit('switch-form', 'signup')" style="color: #409eff; cursor: pointer"
          >Sign Up</a
        >
      </el-col>
    </el-row>

    <el-button
      @click="loginSubmit(loginFormRef)"
      size="large"
      :style="{
        fontFamily: 'semiBold',
        color: 'white',
        borderRadius: '5px',
      }"
      type="primary"
      style="width: 100%; margin-top: 20px"
    >
      Login
    </el-button>
  </el-form>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { type FormInstance, type FormRules, type TabsPaneContext, ElMessage } from 'element-plus';
import type { RuleForm } from '@/models/types';
import { User, Message, Phone, Unlock, Lock } from '@element-plus/icons-vue';
import { useRegistrationStore } from '@/stores/useStore';
import { useRouter } from 'vue-router';

const emit = defineEmits<{
  (e: 'switch-form', form: 'signin' | 'signup'): void;
}>();
const loginFormRef = ref<FormInstance | null>(null);

const loginForm = reactive({
  email: '',
  password: '',
});

const validateLoginEmail = (rule: any, value: any, callback: any) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (value === '') {
    callback(new Error('Please enter your email'));
  } else if (!emailRegex.test(value)) {
    callback(new Error('Please enter a valid email address'));
  } else {
    callback();
  }
};

const validateLoginPassword = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please enter your password'));
  } else if (value.length < 8) {
    callback(new Error('Password must be at least 8 characters'));
  } else {
    callback();
  }
};

const loginRules = reactive<FormRules<typeof loginForm>>({
  email: [{ required: true, validator: validateLoginEmail, trigger: 'blur' }],
  password: [{ required: true, validator: validateLoginPassword, trigger: 'blur' }],
});

const router = useRouter();

const loginSubmit = (formEl: FormInstance | null) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      const registrationStore = useRegistrationStore();
      const users = registrationStore.getUsers;
      const found = users.find(
        (user) => user.email === loginForm.email && user.password === loginForm.password,
      );
      if (found) {
        ElMessage({
          message: 'Login successful',
          type: 'success',
        });
        router.push('/customer/products');
      } else {
        ElMessage({
          message: 'Invalid email or password.',
          type: 'error',
        });
      }
    } else {
      ElMessage({
        message: 'Login failed. Please check your input.',
        type: 'error',
      });
    }
  });
};
const loginRemoveWhitespace = (field: keyof typeof loginForm) => {
  loginForm[field] = loginForm[field].replace(/\s+/g, '');
};
</script>
