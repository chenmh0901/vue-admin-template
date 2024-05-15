<script setup lang="ts">
import Breadcrumb from './breadcrumb/index.vue'
import Setting from './setting/index.vue'
</script>

<template>
  <div class="tabbar">
    <div class="tabbar__left">
      <Breadcrumb />
    </div>
    <div class="tabbar__right ">
      <Setting />
    </div>
  </div>
</template>

<style coped>
.tabbar{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .tabbar__left{
    display: flex;
    margin-left: 20px;
    align-items: center;
  }

  .tabbar__right{
    display: flex;
    align-items: center;
    margin-right: 20px;
  }
}
</style>
