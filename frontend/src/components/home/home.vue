<script setup>
import { ref, computed, onMounted } from 'vue' // 1. Thêm ref
import { useRouter } from 'vue-router'         // 2. Thêm useRouter
import { useVocabStore } from '../../stores/vocabStore'
import { useAuthStore } from '../../stores/authStore'   

const authStore = useAuthStore()
const vocabStore = useVocabStore() // Sửa thành chữ 'v' thường cho đồng bộ
const router = useRouter()         // Khởi tạo router

// 3. Khai báo biến chờ xóa
const pendingDeleteSlug = ref(null)

onMounted(async () => {
    vocabStore.fetchAll()
})

const userVocabs = computed(() => 
    vocabStore.vocabs.filter(v => v.userId === authStore.currentUserId)
)

function goToCreate() {
    router.push({ name: 'word-create' })
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
</script>

<template>
    <div class="container my-4">
        <h3 class="mb-3">My dictionary</h3>
 
        <div v-if="vocabStore.isLoading" class="text-center my-4">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
 
        <div v-else-if="vocabStore.error" class="alert alert-danger">
            {{ vocabStore.error }}
        </div>
 
        <div v-else-if="userVocabs.length === 0" class="alert alert-info text-center my-4 p-5 bg-light rounded-3 shadow-sm border-0">
            <h5 class="text-muted mb-3">You haven't created any vocabulary words yet.</h5>
            <button class="btn btn-outline-primary" @click="goToCreate">Create your first word</button>
        </div>
 
        <!-- Bảng danh sách từ vựng -->
        <div v-else class="card shadow-sm border-0">
            <div class="card-body p-0">
                <div class="table-responsive">
                    <table class="table table-hover align-middle mb-0">
                        <thead class="table-light">
                            <tr>
                                <th class="ps-4 py-3">First Language</th>
                                <th class="py-3">Second Language</th>
                                <th class="text-end pe-4 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="word in userVocabs" :key="word.id">
                                <td class="ps-4 fw-semibold text-dark">{{ word.firstLanguage }}</td>
                                <td class="text-muted">{{ word.secondLanguage }}</td>
                                <td class="text-end pe-4">
                                    <button 
                                        class="btn btn-sm btn-outline-info" 
                                        @click="goToDetail(word.slug)"
                                    >
                                        Show
                                    </button>
                                    
                                    <!-- 4. Đổi toàn bộ vocab.slug thành word.slug -->
                                    <button class="btn btn-sm btn-outline-primary me-2" @click="goToEdit(word.slug)">
                                        Edit
                                    </button>

                                    <button
                                        v-if="pendingDeleteSlug !== word.slug"
                                        class="btn btn-sm btn-outline-danger"
                                        @click="askDelete(word.slug)"
                                    >
                                        Delete
                                    </button>

                                    <template v-else>
                                        <button class="btn btn-sm btn-danger me-1" @click="confirmDelete(word.slug)">
                                            Confirm Delete
                                        </button>
                                        <button class="btn btn-sm btn-outline-secondary" @click="cancelDelete">
                                            Cancel
                                        </button>
                                    </template>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>