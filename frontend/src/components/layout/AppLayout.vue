<script setup>
import TheNavbar from './TheNavbar.vue'
import TheSidebar from './TheSidebar.vue'
</script>

<template>
  <div class="app-layout">
    <!-- Hàng 1: Navbar full width -->
    <TheNavbar />

    <!-- Hàng 2: Sidebar (tĩnh) + nội dung (động) -->
    <div class="d-flex">
      <TheSidebar />

      <main class="flex-grow-1 p-4">
        <!-- View con (Dashboard, ProjectDetail...) sẽ render vào đây -->
        <RouterView />
      </main>
    </div>
  </div>
</template>