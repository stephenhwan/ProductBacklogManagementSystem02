<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/authStore'
const router = useRouter()
const authStore = useAuthStore()
async function onLogout() {
  await authStore.logout()
  router.push('/login')
}
</script>
<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary px-3 shadow-sm">
    <div class="container-fluid">
      <RouterLink class="navbar-brand fw-bold d-flex align-items-center" to="/">
        <i class="bi bi-book-half me-2"></i>
        PBMS
      </RouterLink>

      <div class="d-flex align-items-center ms-auto">
        <span v-if="authStore.user" class="text-light small d-flex align-items-center pe-3 me-3 border-end border-light border-opacity-25">
          <i class="bi bi-person-circle fs-5 me-2"></i>
          Hello, <strong class="ms-1">{{ authStore.user.fullName }}</strong>
        </span>
        <button
          type="button"
          class="btn btn-outline-light btn-sm rounded-pill px-3 d-flex align-items-center"
          @click="onLogout"
        >
          <i class="bi bi-box-arrow-right me-2"></i>
          Sign out
        </button>
      </div>
    </div>
  </nav>
</template>