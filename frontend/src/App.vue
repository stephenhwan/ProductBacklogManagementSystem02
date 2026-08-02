<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from './stores/authStore.js'

const authStore = useAuthStore()

onMounted(() => {
  if (!authStore.isReady) {
    authStore.init()
  }
})
</script>

<template>
  <div v-if="authStore.isReady">
    <router-view />
  </div>
  
  <!-- Hiển thị màn hình loading chờ đợi -->
  <div v-else class="text-center mt-5">
    Loading app...
  </div>
</template>