<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  words: {
    type: Array,
    required: true,
  },
})

// Xáo trộn thứ tự từ, không đụng vào mảng gốc (props.words)
const randWords = ref([...props.words].sort(() => 0.5 - Math.random()))
const incorrectGuesses = ref([])
const answer = ref('')
const score = ref(0)
const testOver = ref(false)
const feedback = ref('')      // '' | 'correct' | 'wrong' -> dùng để tô màu tạm thời
const resultClass = ref('')
const resultText = ref('')

const currWord = computed(() => (randWords.value.length ? randWords.value[0] : null))

function normalize(str) {
  return (str || '').trim().toLowerCase()
}

function onSubmit() {
  if (!currWord.value) return

  const isCorrect = normalize(answer.value) === normalize(currWord.value.secondLanguage)

  if (isCorrect) {
    score.value += 1
    feedback.value = 'correct'
  } else {
    incorrectGuesses.value.push({
      firstLanguage: currWord.value.firstLanguage,
      correctAnswer: currWord.value.secondLanguage,
      yourAnswer: answer.value,
    })
    feedback.value = 'wrong'
  }

  answer.value = ''
  randWords.value.shift()

  if (randWords.value.length === 0) {
    testOver.value = true
    displayResults()
  }

  // tự tắt feedback màu sau 800ms để chuẩn bị câu tiếp theo
  setTimeout(() => {
    feedback.value = ''
  }, 800)
}

function displayResults() {
  if (incorrectGuesses.value.length === 0) {
    resultText.value = 'Bạn đã trả lời đúng hết. Xuất sắc!'
    resultClass.value = 'success'
  } else {
    resultText.value = `Bạn sai ${incorrectGuesses.value.length} từ.`
    resultClass.value = 'error'
  }
}
</script>

<template>
  <div>
    <h2 class="mb-3">Score: {{ score }} / {{ words.length }}</h2>

    <form v-if="!testOver && currWord" @submit.prevent="onSubmit">
      <div class="mb-3">
        <label class="form-label text-muted">English</label>
        <input type="text" class="form-control form-control-lg" readonly :value="currWord.firstLanguage" />
      </div>

      <div class="mb-3">
        <label class="form-label">Japanese</label>
        <input
          type="text"
          class="form-control"
          :class="{ 'is-valid': feedback === 'correct', 'is-invalid': feedback === 'wrong' }"
          v-model="answer"
          placeholder="Enter the translation..."
          autocomplete="off"
          autofocus
        />
      </div>

      <button class="btn btn-primary" type="submit">Submit</button>
    </form>

    <div v-if="testOver" :class="['alert mt-3', resultClass === 'success' ? 'alert-success' : 'alert-warning']">
      <p class="fw-semibold mb-2">{{ resultText }}</p>
      <ul v-if="incorrectGuesses.length" class="mb-0 small">
        <li v-for="(item, idx) in incorrectGuesses" :key="idx">
          <strong>{{ item.firstLanguage }}</strong> — correct answer: {{ item.correctAnswer }}
          (your answer: {{ item.yourAnswer || '(empty)' }})
        </li>
      </ul>
    </div>
    
  </div>
</template>