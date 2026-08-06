import { defineStore } from 'pinia'

import VocabService from '../services/vocabService'

export const useVocabStore = defineStore('vocab', {
    state: () => ({
        vocabs: [],
        page: 1,
        limit: 5,
        isLoading: false,
        error: null,
        total: 0,
    }),
    actions: {
        async fetchAll(page = 1) {
            this.isLoading = true
            this.error = null
            try {
                const { items, total } = await VocabService.getAll({ page, limit: this.limit })
                this.vocabs = items
                this.total = total
                this.page = page
            } finally {
                this.isLoading = false
            }
        },
        async createVocab(payload) {
            this.error = null
            try {
                const created = await VocabService.create(payload)
                this.vocabs.push(created)
                return created
            } catch (error) {
                this.error = error.message || 'Failed to create vocab'
                throw error
            }
        },
        async deleteVocab(slug) {
            try {
                await VocabService.delete(slug)
                this.vocabs = this.vocabs.filter(v => v.slug !== slug)
            } catch (error) {
                this.error = error.message || 'Failed to delete vocab'
            }
        },
        async updateVocab(currentSlug, payload) {
            this.error = null
            try {
                const updated = await VocabService.update(currentSlug, payload)
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