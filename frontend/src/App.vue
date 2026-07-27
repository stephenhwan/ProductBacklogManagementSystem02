<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from './stores/AuthStore.js'

const authStore = useAuthStore()

onMounted(() => {
  if (!authStore.isReady) {
    authStore.init()
  }
})
</script>

<template>
  <RouterView />
</template>