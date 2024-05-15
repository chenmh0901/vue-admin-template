<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useLayoutSettingStore } from '@/store/modules/setting'

const LayoutSettingStore = useLayoutSettingStore()
function onChange() {
  LayoutSettingStore.fold = !LayoutSettingStore.fold
}

const route = useRoute()
</script>

<template>
  <el-icon @click="onChange">
    <component :is="LayoutSettingStore.fold ? 'Fold' : 'Expand'" />
  </el-icon>
  <el-breadcrumb separator-icon="ArrowRight" class="breadcrumb">
    <el-breadcrumb-item v-for="(item, index) in route.matched" v-show="item.meta.title" :key="index" :to="item.path">
      <el-icon class="box" style="margin: 0 5px">
        <component :is="item.meta.icon" />
      </el-icon>
      <span class="box">{{ item.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<style coped>
.breadcrumb{
  margin: 0 10px;

  .box{
    display: inline-block;
    vertical-align: middle;
  }
}
</style>
