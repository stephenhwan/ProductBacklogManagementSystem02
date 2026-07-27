<script setup>
import TheNavbar from '../components/layout/TheNavbar.vue'

defineProps({
  id: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div>
    <TheNavbar />
    <div class="container py-5">
      <h1 class="h4">Chi tiết Project #{{ id }}</h1>
      <p class="text-muted">Sẽ được triển khai ở phần Project &amp; Backlog.</p>
    </div>
  </div>
</template>
