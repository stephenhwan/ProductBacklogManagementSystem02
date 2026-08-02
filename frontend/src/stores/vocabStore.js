import { defineStore } from 'pinia'

import WordService from '../services/vocabService'

export const useVocabStore = defineStore('vocab', {
    state: () => ({
        vocabs: [],
        isLoading: false,
        error: null,
    }),
    actions: {
        async fetchAll() {
            this.isLoading = true
            this.error = null
            try {
                this.vocabs = await WordService.getAll()
            } catch (error) {
                this.error = error.message || 'Failed to fetch vocabs'
            } finally {
                this.isLoading = false
            }
        },
    },
})

export default useVocabStore