// stores/logStore.js
import { defineStore } from 'pinia'

export const useLogStore = defineStore('log', {
    state: () => ({
        logs: [],
    }),
    actions: {
        add(...args) {
            const message = args
                .map(a => (typeof a === 'object' ? JSON.stringify(a) : String(a)))
                .join(' ')
            this.logs.push({ time: new Date().toLocaleTimeString(), message })
            console.log(...args)   // vẫn log ra devtools như bình thường
        },
        clear() {
            this.logs = []
        },
    },
})