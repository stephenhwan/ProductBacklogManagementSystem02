<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useVocabStore } from '../../stores/vocabStore'

const router = useRouter()
const vocabStore = useVocabStore()

const firstLanguage = ref('')
const secondLanguage = ref('')
const definition = ref('')
const isSaving = ref(false)
const error = ref(null)

async function onSubmit() {
  isSaving.value = true
  error.value = null
  try {
    const created = await vocabStore.createVocab({
      firstLanguage: firstLanguage.value,
      secondLanguage: secondLanguage.value,
      definition: definition.value,
    })
    router.push({ name: 'words-list' })
  } catch (err) {
    error.value = err.message || 'Tạo từ mới thất bại.'
  } finally {
    isSaving.value = false
  }
}
</script>

<template>
  <div>
    <h1 class="h3 mb-4">Add New Word</h1>

    <form @submit.prevent="onSubmit">
      <div class="mb-3">
        <label class="form-label">Word</label>
        <input v-model="firstLanguage" type="text" class="form-control" required />
      </div>
      <div class="mb-3">
        <label class="form-label">Meaning</label>
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