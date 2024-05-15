<script setup lang="ts">
import { useRoute } from 'vue-router'
import Logo from './components/logo/index.vue'
import Menu from './components/menu/index.vue'
import Main from './components/main/index.vue'
import Tabbar from './components/tabbar/index.vue'
import { useUserStore } from '@/store/modules/user'
import { useLayoutSettingStore } from '@/store/modules/setting'

const LayoutSettingStore = useLayoutSettingStore()
const userStore = useUserStore()
const route = useRoute()
</script>

<template>
  <div class="layout__container">
    <div class="layout__slider" :class="{ fold: LayoutSettingStore.fold ? true : false }">
      <Logo />
      <el-scrollbar class="scrollbar">
        <el-menu style="--el-menu-bg-color:#001529;--el-menu-text-color:#ffffff;border-right: none;" :default-active="route.path" :collapse="LayoutSettingStore.fold ? true : false">
          <Menu :menu-list="userStore.menuRoutes" />
        </el-menu>
      </el-scrollbar>
    </div>
    <div class="layout__tabbar" :class="{ fold: LayoutSettingStore.fold ? true : false }">
      <Tabbar />
    </div>
    <div class="layout__main" :class="{ fold: LayoutSettingStore.fold ? true : false }">
      <Main />
    </div>
  </div>
</template>

<style coped lang="scss">
.layout__container {
  height: 100vh;
  weight: 100%;

  .layout__slider {
    height: 100vh;
    width: $base-menu-width;
    background-color: $base-menu-bg-color;
    transition:all .3s;

    .scrollbar{
      height: calc(100vh - $base-layout-logo-height);
      width: $base-menu-width;
      padding:5px
    }

    &.fold {
      width: $base-menu-min-width;
    }
  }

  .layout__tabbar {
    position: fixed;
    top:0;
    left: $base-menu-width;
    height: $base-tabbar-height;
    width: calc(100% - $base-menu-width);
    transition:all .3s;

    &.fold {
      left: $base-menu-min-width;
      width: calc(100% - $base-menu-min-width);
    }
  }

  .layout__main{
    position: absolute;
    top: $base-tabbar-height;
    left:$base-menu-width;
    height: calc(100% - $base-tabbar-height);
    width: calc(100% - $base-menu-width);
    background-color: yellow;
    overflow: auto;
    padding: 20px;
    transition:all .3s;

    &.fold {
      left: $base-menu-min-width;
      width: calc(100% - $base-menu-min-width);
    }
  }
}
</style>./component/index.vue
