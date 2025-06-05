<template>
  <div
    style="
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background: linear-gradient(to bottom, blue, #fff);
    "
  >
    <transition name="fade-slide" mode="out-in">
      <div class="form-card" :key="activeName">
        <el-row>
          <el-col :span="24" class="form-title"></el-col>
        </el-row>
        <el-tabs v-model="activeName" class="demo-tabs custom-tabs" @tab-click="handleClick">
          <el-tab-pane label="Login" name="signin"></el-tab-pane>
          <el-tab-pane label="Sign Up" name="signup"></el-tab-pane>
        </el-tabs>
        <SignInForm v-if="activeName === 'signin'" @submit="loginSubmit(loginFormRef)" />

        <SignUpForm v-if="activeName === 'signup'" @submit="submitForm(ruleFormRef)" />
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { type FormInstance, type FormRules, type TabsPaneContext, ElMessage } from 'element-plus';
import type { RuleForm } from '@/models/types';
import { User, Message, Phone, Unlock, Lock } from '@element-plus/icons-vue';
import { useRegistrationStore } from '@/stores/useStore';
import { useRouter } from 'vue-router';

import SignInForm from '@/views/customer/SignInForm.vue';
import SignUpForm from '@/views/customer/SignUpForm.vue';

const activeName = ref('signin');
const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
};
const registrationStore = useRegistrationStore();
const ruleFormRef = ref<FormInstance | null>(null);
const ruleForm = reactive<RuleForm>({
  id: '',
  firstname: '',
  lastname: '',
  email: '',
  contactNumber: '',
  password: '',
  confirmPassword: '',
});

const loginFormRef = ref<FormInstance | null>(null);
const router = useRouter();

const loginForm = reactive({
  email: '',
  password: '',
});

const submitForm = (formEl: FormInstance | null) => {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (valid) {
      const userData = {
        id: ruleForm.id,
        firstName: ruleForm.firstname,
        lastName: ruleForm.lastname,
        email: ruleForm.email,
        contactNumber: ruleForm.contactNumber,
        password: ruleForm.password,
        confirmPassword: ruleForm.confirmPassword,
        role: 'isCustomer' as const,
      };
      const success = await registrationStore.registerUser(userData);
      if (success) {
        ElMessage({
          message: 'Registration successful',
          type: 'success',
        });
      }
    } else {
      ElMessage({
        message: 'Registration Failed. Please check your input.',
        type: 'error',
      });
      console.warn('Form validation failed');
    }
  });
};

const loginSubmit = (formEl: FormInstance | null) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
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
</script>

<style scoped>
.form-card {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.12);
  padding: 32px 32px 24px 32px;
  min-width: 400px;
  max-width: 500px;
  width: 100%;
  transition: box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.custom-tabs {
  margin-bottom: 24px;
}
.animated-form {
  transition:
    transform 0.4s cubic-bezier(0.4, 0, 0.2, 1),
    opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(40px) scale(0.98);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-40px) scale(0.98);
}
</style>
