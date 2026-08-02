<script>
import {ref, onMounted} from 'vue'

const words = ref([]) 

onMounted(async () => {
    words.value = await fetchAll()
})

</script>

<template>
    <div>
        <h3>Word List</h3>
        <ul>
            <li v-for="word in words" :key="word.id">
                {{ word.text }}
            </li>
        </ul>
    </div>
</template>