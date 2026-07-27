<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light text-center px-3">
    <h1 class="display-4 fw-bold">404</h1>
    <p class="text-muted mb-4">Trang bạn tìm không tồn tại.</p>
    <RouterLink to="/" class="btn btn-primary">Về trang chủ</RouterLink>
  </div>
</template>