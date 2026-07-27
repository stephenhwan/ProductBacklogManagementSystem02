<script setup>
import { reactive, ref } from 'vue'
import { useRouter, useRoute, RouterLink } from 'vue-router'
import { useAuthStore } from '../stores/authStore.js'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const form = reactive({
  email: '',
  password: '',
})

const submitting = ref(false)

async function onSubmit() {
  submitting.value = true
  authStore.clearError()
  const ok = await authStore.login(form)
  submitting.value = false

  if (ok) {
    const redirect = typeof route.query.redirect === 'string' ? route.query.redirect : '/'
    router.push(redirect)
  }
}
</script>

<template>
  <div class="auth-page d-flex align-items-center justify-content-center min-vh-100 bg-light">
    <div class="card shadow-sm" style="width: 100%; max-width: 420px">
      <div class="card-body p-4 p-md-5">
        <h1 class="h3 mb-1 text-center">Đăng nhập</h1>
        <p class="text-muted text-center mb-4">Product Backlog Management System</p>

        <div v-if="authStore.error" class="alert alert-danger py-2" role="alert">
          {{ authStore.error }}
        </div>

        <form novalidate @submit.prevent="onSubmit">
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input
              id="email"
              v-model.trim="form.email"
              type="email"
              class="form-control"
              placeholder="ban@vidu.com"
              autocomplete="email"
              required
            />
          </div>

          <div class="mb-3">
            <label for="password" class="form-label">Mật khẩu</label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              class="form-control"
              placeholder="••••••••"
              autocomplete="current-password"
              required
            />
          </div>

          <button type="submit" class="btn btn-primary w-100" :disabled="submitting">
            <span v-if="submitting" class="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
            {{ submitting ? 'Đang đăng nhập...' : 'Đăng nhập' }}
          </button>
        </form>

        <p class="text-center mt-4 mb-0">
          Chưa có tài khoản?
          <RouterLink to="/register">Đăng ký ngay</RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>
