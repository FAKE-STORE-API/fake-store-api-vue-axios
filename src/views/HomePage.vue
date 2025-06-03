<template>
  <el-form
    :model="ruleForm"
    ref="ruleFormRef"
    :rules="signUpRules"
    style="max-width: 600px"
    label-width="auto"
    status-icon
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
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import type { RuleForm } from '@/models/types';
import { User, Message, Phone, Unlock, Lock } from '@element-plus/icons-vue';
import { useRegistrationStore } from '@/stores/useStore';

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

const submitForm = (formEl: FormInstance | null) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      // Map ruleForm to userRegistrationStore fields
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
        console.log('Registration successful');
        console.log('Registered Users:', registrationStore.getUsers);
      } else {
        console.error('Registration failed');
      }
    }
  });
};

const removeWhitespace = (field: keyof RuleForm) => {
  ruleForm[field] = ruleForm[field].replace(/\s+/g, '');
};

const cleanInputOnBlur = (field: keyof RuleForm) => {
  ruleForm[field] = ruleForm[field].trim();
};
</script>

<style scoped></style>
