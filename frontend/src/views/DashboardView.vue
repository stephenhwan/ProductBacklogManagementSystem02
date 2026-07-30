<script setup>
import TheNavbar from '../components/layout/TheNavbar.vue'
import TheSidebar from '../components/layout/TheSidebar.vue'
</script>

<template>
  <div>
    <TheNavbar />

    <div class="d-flex">

      <TheSidebar />

      <main class="flex-grow-1 p-4">
        <RouterView />
      </main>
      
    </div>

  </div>
</template>