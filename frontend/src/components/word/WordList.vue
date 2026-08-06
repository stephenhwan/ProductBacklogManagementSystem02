<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useVocabStore } from '../../stores/vocabStore'
import { useAuthStore } from '../../stores/authStore'
const authStore = useAuthStore()
const vocabStore = useVocabStore()
const router = useRouter()

// slug đang chờ xác nhận xóa (thay cho window.confirm bị chặn trong iframe/preview)
const pendingDeleteSlug = ref(null)

onMounted(() => {
    vocabStore.fetchAll()
})

function goToCreate() {
    router.push({ name: 'word-create' })
}

function canManage (vocab) {
    return authStore.isAdmin || vocab.userId === authStore.currentUserId
}

function goToDetail(slug) {
    router.push({ name: 'word-detail', params: { slug } })
}

function goToEdit(slug) {
    router.push({ name: 'word-edit', params: { slug } })
}

function askDelete(slug) {
    pendingDeleteSlug.value = slug
}

function cancelDelete() {
    pendingDeleteSlug.value = null
}

async function confirmDelete(slug) {
    await vocabStore.deleteVocab(slug)
    pendingDeleteSlug.value = null
}
function nextPage() {
    if (vocabStore.page * vocabStore.limit < vocabStore.total) {
        vocabStore.fetchAll(vocabStore.page + 1)
    }
}

function prevPage() {
    if (vocabStore.page > 1) {
        vocabStore.fetchAll(vocabStore.page - 1)
    }
}
</script>

<template>
    <div class="container my-4">
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h1 class="h3 mb-0 text-primary fw-bold">Word List</h1>
            <button class="btn btn-primary shadow-sm" @click="goToCreate">
                + Add Word
            </button>
        </div>

        <div v-if="vocabStore.isLoading" class="text-center my-5">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <p class="text-muted mt-2">Loading vocabularies...</p>
        </div>

        <div v-else-if="vocabStore.error" class="alert alert-danger shadow-sm" role="alert">
            {{ vocabStore.error }}
        </div>

        <div v-else-if="vocabStore.vocabs.length === 0" class="text-center my-5 p-5 bg-light rounded-3 shadow-sm">
            <h5 class="text-muted mb-3">No words available yet.</h5>
            <button class="btn btn-outline-primary" @click="goToCreate">Create your first word</button>
        </div>

        <div v-else class="card shadow-sm border-0">
            <div class="card-body p-0">
                <div class="table-responsive">
                    <table class="table table-hover align-middle mb-0">
                        <thead class="table-light">
                            <tr>
                                <th class="ps-4 py-3">English</th>
                                <th class="py-3">Japanese</th>
                                <th class="py-3">Definition</th>
                                <th class="text-end pe-4 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="vocab in vocabStore.vocabs" :key="vocab.id">
                                <td class="ps-4 fw-semibold text-dark">{{ vocab.firstLanguage }}</td>
                                <td>{{ vocab.secondLanguage }}</td>
                                <td class="text-muted">{{ vocab.definition }}</td>
                                <td class="text-end pe-4">
                                    <button class="btn btn-sm btn-outline-info me-2" @click="goToDetail(vocab.slug)">
                                        Show
                                    </button>
                                    <template v-if="canManage(vocab)">
                                        <button class="btn btn-sm btn-outline-primary me-2" @click="goToEdit(vocab.slug)">
                                            Edit
                                        </button>

                                        <button
                                            v-if="pendingDeleteSlug !== vocab.slug"
                                            class="btn btn-sm btn-outline-danger"
                                            @click="askDelete(vocab.slug)"
                                        >
                                            Delete
                                        </button>

                                        <template v-else>
                                            <button class="btn btn-sm btn-danger me-1" @click="confirmDelete(vocab.slug)">
                                                Confirm Delete
                                            </button>
                                            <button class="btn btn-sm btn-outline-secondary" @click="cancelDelete">
                                                cancel
                                            </button>
                                        </template>
                                    </template>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="d-flex justify-content-between align-items-center px-4 py-3 border-top">
                <span class="text-muted small">
                    Page {{ vocabStore.page }} / {{ Math.max(1, Math.ceil(vocabStore.total / vocabStore.limit)) }}
                    ({{ vocabStore.total }} words)
                </span>
                <div>   
                    <button
                        class="btn btn-sm btn-outline-secondary me-2"
                        :disabled="vocabStore.page <= 1"
                        @click="prevPage"
                    >
                        ← Back
                    </button>
                    <button
                        class="btn btn-sm btn-outline-secondary"
                        :disabled="vocabStore.page * vocabStore.limit >= vocabStore.total"
                        @click="nextPage"
                    >
                        Next →
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>