<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import VocabService from '../../services/vocabService'
import { useVocabStore } from '../../stores/vocabStore'
import { useAuthStore } from '../../stores/authStore'

const props = defineProps({
  slug: { type: String, required: true },
})

const router = useRouter()
const vocabStore = useVocabStore()
const authStore = useAuthStore()

const vocab = ref(null)
const isLoading = ref(false)
const error = ref(null)

onMounted(async () => {
  isLoading.value = true
  error.value = null
  try {
    vocab.value = await VocabService.getBySlug(props.slug)
  } catch (err) {
    error.value = err.message || 'Không tải được từ này.'
  } finally {
    isLoading.value = false
  }
})

</script>

<template>
  <div>
    <p v-if="isLoading" class="text-muted">Loading...</p>
    <p v-else-if="error" class="text-danger">{{ error }}</p>
    <div v-else-if="vocab">
      <h1 class="h3 mb-2">{{ vocab.firstLanguage }}</h1>
      <p class="text-muted">{{ vocab.secondLanguage }}</p>
      <p>{{ vocab.definition }}</p>
    </div>
  </div>
</template>