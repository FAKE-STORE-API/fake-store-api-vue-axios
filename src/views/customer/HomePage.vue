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
      <div
        v-if="activeName === 'signup' || activeName === 'signin'"
        :key="activeName"
        class="form-card"
      >
        <el-row>
          <el-col :span="24" class="form-title"></el-col>
        </el-row>
        <el-tabs v-model="activeName" class="demo-tabs custom-tabs" @tab-click="handleClick">
          <el-tab-pane label="Login" name="signin"></el-tab-pane>
          <el-tab-pane label="Sign Up" name="signup"></el-tab-pane>
        </el-tabs>
        <div v-if="activeName === 'signup'">
          <h4
            style="
              text-align: center;
              font-family: 'semiBold', sans-serif;
              color: #222;
              margin-bottom: 4px;
              font-size: 23px;
            "
          >
            Welcome to DigiMart!
          </h4>
          <p style="text-align: center; color: #666; margin-bottom: 24px; font-size: 14px">
            Please fill out the form below to create an account.
          </p>
        </div>
        <el-form
          :model="ruleForm"
          v-if="activeName === 'signup'"
          ref="ruleFormRef"
          :rules="signUpRules"
          label-width="auto"
          status-icon
          class="animated-form"
        >
          <el-row>
            <el-text :style="{ fontFamily: 'bold', color: 'black' }">Firstname</el-text>
            <el-col :span="24">
              <el-form-item prop="firstname">
                <el-input
                  v-model="ruleForm.firstname"
                  :prefix-icon="User"
                  placeholder="Enter your firstname"
                  input-style="font-family:regular"
                  @blur="cleanInputOnBlur('firstname')"
                  @input="removeWhitespace('firstname')"
                  minlength="2"
                  maxlength="20"
                />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-text :style="{ fontFamily: 'bold', color: 'black' }">Lastname</el-text>
            <el-col :span="24">
              <el-form-item prop="lastname">
                <el-input
                  v-model="ruleForm.lastname"
                  :prefix-icon="User"
                  placeholder="Enter your lastname"
                  input-style="font-family:regular"
                  @blur="cleanInputOnBlur('lastname')"
                  @input="removeWhitespace('lastname')"
                  minlength="2"
                  maxlength="20"
                />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-text :style="{ fontFamily: 'bold', color: 'black' }">Email</el-text>
            <el-col :span="24">
              <el-form-item prop="email">
                <el-input
                  v-model="ruleForm.email"
                  :prefix-icon="Message"
                  placeholder="Enter your email"
                  input-style="font-family:regular"
                  @input="removeWhitespace('email')"
                />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-text :style="{ fontFamily: 'bold', color: 'black' }">Mobile Number</el-text>
            <el-col :span="24">
              <el-form-item prop="contactNumber">
                <el-input
                  v-model="ruleForm.contactNumber"
                  :prefix-icon="Phone"
                  placeholder="Enter your mobile number"
                  :maxlength="13"
                  input-style="font-family:regular"
                  @input="removeWhitespace('contactNumber')"
                />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-text :style="{ fontFamily: 'bold', color: 'black' }">Password</el-text>
            <el-col :span="24">
              <el-form-item prop="password">
                <el-input
                  v-model="ruleForm.password"
                  :prefix-icon="Unlock"
                  type="password"
                  placeholder="Enter your password"
                  input-style="font-family:regular"
                  @input="removeWhitespace('password')"
                  @blur="cleanInputOnBlur('password')"
                  show-password
                  maxlength="13"
                  minlenegth="8"
                />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-text :style="{ fontFamily: 'bold', color: 'black' }">Confirm Password</el-text>
            <el-col :span="24">
              <el-form-item prop="confirmPassword">
                <el-input
                  v-model="ruleForm.confirmPassword"
                  :prefix-icon="Lock"
                  type="password"
                  placeholder="Confirm your password"
                  input-style="font-family:regular"
                  @input="removeWhitespace('confirmPassword')"
                  @blur="cleanInputOnBlur('confirmPassword')"
                  show-password
                  maxlength="13"
                  minlenegth="8"
                />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row style="margin-top: 20px; text-align: center">
            <el-col :span="24">
              <el-text>Already have an account? </el-text>
              <router-link to="/test" style="color: #409eff">Sign In</router-link>
            </el-col>
          </el-row>

          <el-button
            @click="submitForm(ruleFormRef)"
            size="large"
            :style="{
              fontFamily: 'semiBold',
              color: 'white',
              borderRadius: '5px',
            }"
            type="primary"
            style="width: 100%; margin-top: 20px"
          >
            Register
          </el-button>
        </el-form>
        <el-form
          :model="loginForm"
          v-if="activeName === 'signin'"
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
              <router-link to="test" style="color: #409eff">Create Account</router-link>
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
const loginForm = reactive({
  email: '',
  password: '',
});

const validateFirstname = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please enter your first name'));
  } else if (value.length < 2) {
    callback(new Error('First name must be at least 2 characters'));
  } else {
    callback();
  }
};

const validateLastname = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please enter your last name'));
  } else if (value.length < 2) {
    callback(new Error('Last name must be at least 2 characters'));
  } else {
    callback();
  }
};

const validateEmail = (rule: any, value: any, callback: any) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (value === '') {
    callback(new Error('Please enter your email'));
  } else if (!emailRegex.test(value)) {
    callback(new Error('Please enter a valid email address'));
  } else {
    callback();
  }
};

const validateContactNumber = (rule: any, value: any, callback: any) => {
  const contactRegex = /^(09|\+639)\d{9}$/;
  if (value === '') {
    callback(new Error('Please enter your mobile number'));
  } else if (!contactRegex.test(value)) {
    callback(new Error('Mobile number must be between 10 and 13 digits'));
  } else {
    callback();
  }
};

const validatePassword = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please enter your password'));
  } else if (value.length < 8) {
    callback(new Error('Password must be at least 8 characters'));
  } else {
    callback();
  }
};

const validateConfirmPassword = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please confirm your password'));
  } else if (value !== ruleForm.password) {
    callback(new Error('Passwords do not match'));
  } else {
    callback();
  }
};

const signUpRules = reactive<FormRules<typeof ruleForm>>({
  firstname: [{ required: true, validator: validateFirstname, trigger: 'blur' }],
  lastname: [{ required: true, validator: validateLastname, trigger: 'blur' }],
  email: [{ required: true, validator: validateEmail, trigger: 'blur' }],
  contactNumber: [{ required: true, validator: validateContactNumber, trigger: 'blur' }],
  password: [{ required: true, validator: validatePassword, trigger: 'blur' }],
  confirmPassword: [{ required: true, validator: validateConfirmPassword, trigger: 'blur' }],
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

const submitForm = (formEl: FormInstance | null) => {
  if (!formEl) return;
  formEl.validate((valid) => {
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
      const success = registrationStore.registerUser(userData);
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
      ElMessage({
        message: 'Login successful (demo only)',
        type: 'success',
      });
    } else {
      ElMessage({
        message: 'Login failed. Please check your input.',
        type: 'error',
      });
    }
  });
};

const removeWhitespace = (field: keyof RuleForm) => {
  ruleForm[field] = ruleForm[field].replace(/\s+/g, '');
};

const cleanInputOnBlur = (field: keyof RuleForm) => {
  ruleForm[field] = ruleForm[field].trim();
};

const loginRemoveWhitespace = (field: keyof typeof loginForm) => {
  loginForm[field] = loginForm[field].replace(/\s+/g, '');
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
