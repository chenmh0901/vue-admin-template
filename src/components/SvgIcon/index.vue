<script setup lang="ts">
defineProps({
  prefix: {
    type: String,
    default: '#icon-',
  },
  name: {
    type: String,
    default: '',
  },
  color: {
    type: String,
    default: '',
  },
  width: {
    type: String,
    default: '16px',
  },
  height: {
    type: String,
    default: '16px',
  },
})
</script>

<template>
  <svg :style="{ width, height }">
    <use :xlink:href="prefix + name" :fill="color" />
  </svg>
</template>

<style scoped>

</style>
