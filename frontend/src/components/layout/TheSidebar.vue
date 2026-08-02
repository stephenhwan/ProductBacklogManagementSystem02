<script setup>
import { useAuthStore } from '../../stores/authStore'
</script>

const authStore = useAuthStore()
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
      <RouterLink
        :to="({name: 'words-list'})"
        class="list-group-item list-group-item-action bg-dark text-light border-secondary"
        active-class="active"
        >
         English - Japanese
      </RouterLink> 
      <RouterLink
        v-if ="authStore.isAdmin"
        :to = "({name: 'word-test'})"
                class="list-group-item list-group-item-action bg-dark text-light border-secondary"
        active-class="active"
        >
         Test Page (Admin)
      </RouterLink>


      
    </div>
  </aside>
</template>