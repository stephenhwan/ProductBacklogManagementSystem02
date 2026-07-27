<script setup>
import { computed, reactive, ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

const router = useRouter()
const authStore = useAuthStore()

const form = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const submitting = ref(false)
const clientError = ref('')

const passwordsMismatch = computed(
  () => form.confirmPassword.length > 0 && form.password !== form.confirmPassword,
)

async function onSubmit() {
  clientError.value = ''
  authStore.clearError()

  if (form.password !== form.confirmPassword) {
    clientError.value = 'Mật khẩu xác nhận không khớp.'
    return
  }

  submitting.value = true
  const ok = await authStore.register({
    fullName: form.name,
    email: form.email,
    password: form.password,
  })
  submitting.value = false

  if (ok) {
    router.push('/')
  }
}
</script>

<template>
  <div class="auth-page d-flex align-items-center justify-content-center min-vh-100 bg-light">
    <div class="card shadow-sm" style="width: 100%; max-width: 440px">
      <div class="card-body p-4 p-md-5">
        <h1 class="h3 mb-1 text-center">Tạo tài khoản</h1>
        <p class="text-muted text-center mb-4">Product Backlog Management System</p>

        <div v-if="clientError || authStore.error" class="alert alert-danger py-2" role="alert">
          {{ clientError || authStore.error }}
        </div>

        <form novalidate @submit.prevent="onSubmit">
          <div class="mb-3">
            <label for="name" class="form-label">Họ và tên</label>
            <input
              id="name"
              v-model.trim="form.name"
              type="text"
              class="form-control"
              placeholder="Nguyễn Văn A"
              autocomplete="name"
              required
            />
          </div>

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
              placeholder="Tối thiểu 6 ký tự"
              autocomplete="new-password"
              required
            />
          </div>

          <div class="mb-3">
            <label for="confirmPassword" class="form-label">Xác nhận mật khẩu</label>
            <input
              id="confirmPassword"
              v-model="form.confirmPassword"
              type="password"
              class="form-control"
              :class="{ 'is-invalid': passwordsMismatch }"
              autocomplete="new-password"
              required
            />
            <div v-if="passwordsMismatch" class="invalid-feedback">
              Mật khẩu xác nhận không khớp.
            </div>
          </div>

          <button type="submit" class="btn btn-primary w-100" :disabled="submitting">
            <span v-if="submitting" class="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
            {{ submitting ? 'Đang tạo tài khoản...' : 'Đăng ký' }}
          </button>
        </form>

        <p class="text-center mt-4 mb-0">
          Đã có tài khoản?
          <RouterLink to="/login">Đăng nhập</RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>
