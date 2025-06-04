<template>
  <div class="main-container">
    <el-drawer
      model-value="true"
      :with-header="false"
      :close-on-click-modal="false"
      :modal="false"
      style="
        background: rgba(255, 255, 255, 0.3);
        box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
        backdrop-filter: blur(10.5px);
        -webkit-backdrop-filter: blur(10.5px);
        border-radius: 10px;
        border: 1px solid rgba(255, 255, 255, 0.18);
      "
    >
      <div>
        <el-image :src="logo" style="width: 200px; height: 200px" />
      </div>
      <div
        style="
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 20px;
          margin-top: 10px;
        "
      >
        <h2 style="text-align: center">Hi, DigiMartians!</h2>
        <p>Please click or tap your destination</p>
        <el-button type="primary" size="large" @click="navigateTo({ name: 'HomePage' })"
          >Customer</el-button
        >
        <el-button type="danger" size="large" @click="navigateTo({ name: 'admin-login' })"
          >Admin</el-button
        >
        <p>
          By using this service, you understood and agree to the DigiMart Online Services Terms of
          Use and Privacy Statement
        </p>
      </div>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import logo from '@/assets/digimart_logo_transparent.png';

import { useRouter } from 'vue-router';

const router = useRouter();

const navigateTo = (path: object) => {
  router.push(path);
};
</script>

<style scoped>
.main-container {
  width: 100%;
  height: 100vh;
  background: url('../assets/background-image.jpg') no-repeat center center;
  background-size: cover;
}

:deep(.el-drawer__body) {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  margin-top: 150px;
}

:deep(.el-button) {
  width: 100%;
  margin: 0;
}
</style>
