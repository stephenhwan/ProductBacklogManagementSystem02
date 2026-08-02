import apiClient from './apiClient'

export const VocabService = {
    async getAll() {
        const { data } = await apiClient.get('/vocabs')
        return data
    },

    async getBySlug(slug) {
        const { data } = await apiClient.get(`/vocabs/${slug}`)
        return data
    },

    async create(payload) {
        const { data } = await apiClient.post('/vocabs', payload)
        return data
    },
    async delete(slug) {
        await apiClient.delete(`/vocabs/${slug}`)
    },
    async update(currentSlug, payload) {
        const { data } = await apiClient.put(`/vocabs/${currentSlug}`, payload )
        return data 
    },

}
export default VocabService