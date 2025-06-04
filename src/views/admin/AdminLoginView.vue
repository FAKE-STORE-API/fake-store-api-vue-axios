<template>
  <div class="login-container">
    <el-form
      @keyup.enter="handleLogin(loginFormRef)"
      ref="loginFormRef"
      :model="loginForm"
      status-icon
      :rules="rules"
      label-width="auto"
      class="demo-ruleForm"
    >
      <div class="login-header">
        <el-icon class="login-icon"><User /></el-icon>
        <h1>Admin Login</h1>
      </div>
      <el-form-item prop="username">
        <el-input
          :prefix-icon="User"
          v-model="loginForm.username"
          placeholder="Username"
          size="large"
          clearable
        />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          :prefix-icon="Lock"
          v-model="loginForm.password"
          type="password"
          autocomplete="off"
          placeholder="Password"
          show-password
          size="large"
          clearable
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="large" @click="handleLogin(loginFormRef)" class="login-btn"
          >Login</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { User, Lock } from '@element-plus/icons-vue';
import { type FormInstance, type FormRules } from 'element-plus';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
import { useAdminStore } from '@/stores/adminStore';

const adminStore = useAdminStore();
const router = useRouter();
const loginFormRef = ref<FormInstance | null>(null);

const loginForm = reactive({
  username: '',
  password: '',
});

const validateUsername = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the username'));
  } else {
    callback();
  }
};

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password'));
  } else {
    callback();
  }
};

const rules = reactive<FormRules<typeof loginForm>>({
  username: [{ validator: validateUsername, trigger: 'blur' }],
  password: [{ validator: validatePass, trigger: 'blur' }],
});

const handleLogin = (formEl: FormInstance | null) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      const success = adminStore.login(loginForm.username, loginForm.password);
      if (success) {
        ElMessage({
          message: 'Login successful',
          type: 'success',
        });
        router.push('/admin/dashboard');
      } else {
        ElMessage({
          message: 'Invalid admin username or password.',
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
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #232526 0%, #414345 100%);
}

.demo-ruleForm {
  width: 100%;
  max-width: 400px;
  background: rgba(255, 255, 255, 0.97);
  border-radius: 18px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.18);
  padding: 2.5rem 2rem 2rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.login-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.5rem;
}

.login-icon {
  font-size: 2.5rem;
  color: #409eff;
  margin-bottom: 0.5rem;
}

h1 {
  color: #232526;
  font-weight: 700;
  font-size: 2rem;
  margin: 0;
  letter-spacing: 1px;
}

.login-btn {
  width: 100%;
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  border-radius: 8px;
}

:deep(.el-form-item__error) {
  margin-inline: 5px;
}

:deep(.el-input__wrapper) {
  background-color: #f4f8fb;
  border-radius: 8px;
}

:deep(.el-input__inner) {
  font-size: 1.1rem;
}

:deep(.el-button) {
  width: 100%;
}
</style>
