<script setup>
import { useAuthStore } from '../../stores/authStore'

const authStore = useAuthStore()
</script>


<template>
  <aside class="bg-dark min-vh-100" style="width: 220px">
    <div class="list-group list-group-flush">
      <RouterLink
        :to="{ name: 'for-me' }"
        class="list-group-item list-group-item-action bg-dark text-light border-secondary d-flex align-items-center gap-2"
        active-class="active"
      >
        <i class="bi bi-house-door"></i>
        For me
      </RouterLink>
      <RouterLink
        :to="({name: 'words-list'})"
        class="list-group-item list-group-item-action bg-dark text-light border-secondary d-flex align-items-center gap-2"
        active-class="active"
        >
        <i class="bi bi-translate"></i>
         English - Japanese
      </RouterLink> 
      <RouterLink
      :to="({name: 'word-quiz'})"
      class="list-group-item list-group-item-action bg-dark text-light border-secondary d-flex align-items-center gap-2"
      active-class="active"
      >
        <i class="bi bi-patch-question"></i>
        Vocabulary Quiz
      </RouterLink>
      <RouterLink
        v-if ="authStore.isAdmin"
        :to = "({name: 'word-test'})"
                class="list-group-item list-group-item-action bg-dark text-warning border-secondary d-flex align-items-center gap-2"
        active-class="active"
        >
        <i class="bi bi-tools"></i>
         Test Page (Admin)
      </RouterLink>


      
    </div>
  </aside>
</template>