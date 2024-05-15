<script setup lang="ts">

</script>

<template>
  <el-button size="default" icon="Refresh" circle />
  <el-button size="default" icon="FullScreen" circle />
  <el-button size="default" icon="Setting" circle />
  <img src="../../../../../public/logo.jpg" alt="logo" style="width: 30px;height: 30px;margin:0 10px">
  <el-dropdown>
    <span class="el-dropdown-link">
      admin
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style coped>

</style>
