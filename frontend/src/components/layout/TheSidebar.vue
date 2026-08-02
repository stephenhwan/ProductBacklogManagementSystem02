
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
      
    </div>
  </aside>
</template>