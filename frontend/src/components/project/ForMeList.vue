<script setup>
// TODO: gọi API lấy danh sách project của user hiện tại,
// gán kết quả vào biến `projects` bên dưới.
import { ref } from 'vue'

const projects = ref([])
</script>

<template>
  <div>
    <h1 class="h3 mb-4">For me</h1>

    <p v-if="projects.length === 0" class="text-muted">
      Chưa có project nào. Phần gọi API danh sách project sẽ được nối ở bước tiếp theo.
    </p>

    <div v-else class="list-group">
      <RouterLink
        v-for="project in projects"
        :key="project.id"
        :to="{ name: 'project-detail', params: { id: project.id } }"
        class="list-group-item list-group-item-action"
      >
        {{ project.name }}
      </RouterLink>
    </div>
  </div>
</template>