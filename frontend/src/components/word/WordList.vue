<script>
import { onMounted} from 'vue'
import { useVocabStore } from '../../stores/vocabStore'

const vocabStore = useVocabStore()

onMounted( () => {
    vocabStore.fetchAll()
})

</script>

<template>
    <div>
        <h1 class="h3 mb-4">Word List</h1>
            <p v-if="vocabStore.isLoading" class="text-muted">Loading ...</p>
            <p v-else-if="vocabStore.error" class="text-danger">{{ vocabStore.error }}</p>
            <p v-else-if="vocabStore.vocabs.length === 0" class="text-muted">
            No words available.
            </p>
        <div v-else class="list-group">
            <RouterLink
                v-for="vocab in vocabStore.vocabs"
                :key="vocab.id"
                :to="{ name: 'word-detail', params: { slug: vocab.slug } }"
                class="list-group-item list-group-item-action"
            >
                <strong>{{ vocab.firstLanguage }}</strong> — {{ vocab.secondLanguage }}
            </RouterLink>
        </div>
    </div>
</template>