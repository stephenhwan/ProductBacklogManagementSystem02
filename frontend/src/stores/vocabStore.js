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
        async createVocab(payload) {
            this.error = null
            try {
                const created = await WordService.create(payload)
                this.vocabs.push(created)
                return created
            } catch (error) {
                this.error = error.message || 'Failed to create vocab'
                throw error
            }
        },
        async deleteVocab(slug) {
            try {
                await WordService.delete(slug)
                this.vocabs = this.vocabs.filter(v => v.slug !== slug)
            } catch (error) {
                this.error = error.message || 'Failed to delete vocab'
            }
        },
        async updateVocab(currentSlug, payload) {
            this.error = null
            try {
                const updated = await WordService.update(currentSlug, payload)
                const index = this.vocabs.findIndex(v => v.slug === currentSlug)
                if (index !== -1 ) this.vocabs[index] = updated
                return updated
            } catch (error) {
                this.error = error.message || 'Failed to update vocab'
                throw error
            }
        }
        
    },
})

export default useVocabStore