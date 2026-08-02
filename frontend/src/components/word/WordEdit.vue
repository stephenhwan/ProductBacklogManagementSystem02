<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useVocabStore } from '../../stores/vocabStore'
import VocabService from '../../services/vocabService'

const props = defineProps({
  slug: { type: String, required: true },
})

const router = useRouter()
const vocabStore = useVocabStore()

const firstLanguage = ref('')
const secondLanguage = ref('')
const definition = ref('')
const isLoading = ref(false)
const isSaving = ref(false)
const error = ref(null)

onMounted(async () => {
  isLoading.value = true
  try {
    const vocab = await VocabService.getBySlug(props.slug)
    firstLanguage.value = vocab.firstLanguage
    secondLanguage.value = vocab.secondLanguage
    definition.value = vocab.definition
  } catch (err) {
    error.value = err.message || 'Không tải được từ này.'
  } finally {
    isLoading.value = false
  }
})

async function onSubmit() {
  isSaving.value = true
  error.value = null
  try {
    const updated = await vocabStore.updateVocab(props.slug, {
      firstLanguage: firstLanguage.value,
      secondLanguage: secondLanguage.value,
      definition: definition.value,
    })
    router.push({ name: 'words-list' })
  } catch (err) {
    error.value = err.message || 'Cập nhật thất bại.'
  } finally {
    isSaving.value = false
  }
}
</script>

<template>
  <div>
    <h1 class="h3 mb-4">Edit Word</h1>

    <p v-if="isLoading" class="text-muted">Loading...</p>

    <form v-else @submit.prevent="onSubmit">
      <div class="mb-3">
        <label class="form-label">First Language</label>
        <input v-model="firstLanguage" type="text" class="form-control" required />
      </div>
      <div class="mb-3">
        <label class="form-label">Second Language</label>
        <input v-model="secondLanguage" type="text" class="form-control" required />
      </div>
      <div class="mb-3">
        <label class="form-label">Definition</label>
        <textarea v-model="definition" class="form-control" rows="3"></textarea>
      </div>

      <p v-if="error" class="text-danger">{{ error }}</p>

      <button type="submit" class="btn btn-primary" :disabled="isSaving">
        {{ isSaving ? 'Saving...' : 'Save' }}
      </button>
      <button type="button" class="btn btn-secondary ms-2" @click="router.back()">Cancel</button>
    </form>
  </div>
</template>