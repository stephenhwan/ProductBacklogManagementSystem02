<script setup>
    import { computed, onMounted} from 'vue'
    import { useVocabStore } from '../../stores/vocabStore'
    import { useAuthStore } from '../../stores/authStore'
    import QuizPlay from './QuizPlay.vue'

    const vocabStore = useVocabStore()
    const authStore = useAuthStore()

    onMounted(() => {
        vocabStore.fetchAll()
    })

    const userVocabs = computed(() => 
        vocabStore.vocabs.filter(v => v.userId === authStore.currentUserId )

    )
</script>

    <template>
        <div class="container my-4" style="max-width: 600px;">
            <h1 class="h3 mb-4 text-primary fw-bold">Test Your Vocabulary</h1>
             <div v-if="vocabStore.isLoading" class="text-center my-5">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            </div>
        
            <div v-else-if="vocabStore.error" class="alert alert-danger">
            {{ vocabStore.error }}
            </div>
        
            <div v-else-if="userVocabs.length < 3" class="alert alert-info">
            You need at least 3 words in your vocabulary to start testing.
            You currently have {{ userVocabs.length }} words.
            </div>
        
            <quiz-play v-else :words="userVocabs" :key="userVocabs.length" />
        </div>
    </template>