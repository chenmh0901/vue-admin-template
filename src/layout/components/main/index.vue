<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'
import { useLayoutSettingStore } from '@/store/modules/setting'

const LayoutSettingStore = useLayoutSettingStore()

const key = ref(true)
watch(() => LayoutSettingStore.refresh, () => {
  key.value = false
  nextTick(() => {
    key.value = true
  })
})
</script>

<template>
  <RouterView v-slot="{ Component }">
    <Transition name="fade">
      <component :is="Component" v-if="key" />
    </Transition>
  </RouterView>
</template>

<style coped>
.fade-enter-from {
  opacity: 0;
  transform: scale(0)
}
.fade-enter-active {
  transition: all 0.3s;
}
.fade-enter-to {
  opacity: 1;
  transform: scale(1)
}
</style>
