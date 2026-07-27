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
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-3">
    <div class="container-fluid">
      <RouterLink class="navbar-brand" to="/">PBMS</RouterLink>

      <div class="d-flex align-items-center ms-auto gap-3">
        <span v-if="authStore.user" class="text-light small">
          Xin chào, <strong>{{ authStore.user.fullName }}</strong>
        </span>
        <button type="button" class="btn btn-outline-light btn-sm" @click="onLogout">
          Đăng xuất
        </button>
      </div>
    </div>
  </nav>
</template>
