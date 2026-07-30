<script setup>
import { ref } from 'vue'

const isDropdownOpen = ref(false)

// TODO: sau này thay bằng mở modal / gọi store tạo project
function onCreateClick() {
  console.log('Create project clicked')
}
</script>

<template>
  <aside class="bg-dark min-vh-100" style="width: 220px">
    <div class="list-group list-group-flush">
      <RouterLink
        :to="{ name: 'for-me' }"
        class="list-group-item list-group-item-action bg-dark text-light border-secondary"
        active-class="active"
      >
        For me
      </RouterLink>

      <button
        type="button"
        class="list-group-item list-group-item-action bg-dark text-light border-secondary d-flex justify-content-between align-items-center"
        @click="isDropdownOpen = !isDropdownOpen"
      >
        Space
        <span>{{ isDropdownOpen ? '▲' : '▼' }}</span>
      </button>

      <div v-show="isDropdownOpen" class="ps-2">
        <p class="text-secondary small px-3 py-1 mb-0">
          (Danh sách project sẽ hiện ở đây)
        </p>

        <button
          type="button"
          class="list-group-item list-group-item-action bg-dark text-info border-0"
          @click="onCreateClick"
        >
          + Create project
        </button>
      </div>
    </div>
  </aside>
</template>