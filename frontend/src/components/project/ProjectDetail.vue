<script setup>
defineProps({
  id: {
    type: String,
    required: true,
  },
})

// TODO: gọi API lấy chi tiết project theo `id`, hiển thị backlog ở đây.
</script>

<template>
  <div>
    <h1 class="h4">Chi tiết Project #{{ id }}</h1>
    <p class="text-muted">Sẽ được triển khai ở phần Project &amp; Backlog.</p>
  </div>
</template>