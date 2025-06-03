<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <slot name="header" />
      </el-header>
      <el-divider />
      <el-main>
        <slot name="content" />
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
