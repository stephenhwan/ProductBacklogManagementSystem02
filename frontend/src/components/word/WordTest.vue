<script setup>
import { ref, onMounted } from 'vue'
import { useVocabStore } from '../../stores/vocabStore'

const vocabStore = useVocabStore()

// ---- Form Create ----
const createFirst = ref('')
const createSecond = ref('')
const createDefinition = ref('')
const createResultLog = ref('')

// ---- Form Update ----
const updateSlug = ref('')
const updateFirst = ref('')
const updateSecond = ref('')
const updateDefinition = ref('')
const updateResultLog = ref('')

// ---- Form Delete ----
const deleteSlug = ref('')
const deleteResultLog = ref('')

onMounted(() => {
  vocabStore.fetchAll()
})

// ---- C: Create ----
async function testCreate() {
  createResultLog.value = 'Đang gửi...'
  try {
    const created = await vocabStore.createVocab({
      firstLanguage: createFirst.value,
      secondLanguage: createSecond.value,
      definition: createDefinition.value,
    })
    createResultLog.value = 'THÀNH CÔNG: ' + JSON.stringify(created)
  } catch (err) {
    // vocabStore.error đã được set bên trong action, log thêm ở đây để chắc chắn thấy ngay
    createResultLog.value = 'LỖI: ' + (err.response?.data?.message || err.message)
  }
}

// ---- U: Update ----
async function testUpdate() {
  updateResultLog.value = 'Đang gửi...'
  try {
    const updated = await vocabStore.updateVocab(updateSlug.value, {
      firstLanguage: updateFirst.value,
      secondLanguage: updateSecond.value,
      definition: updateDefinition.value,
    })
    updateResultLog.value = 'THÀNH CÔNG: ' + JSON.stringify(updated)
    // slug có thể đổi sau update, tự cập nhật lại ô input để test tiếp cho tiện
    updateSlug.value = updated.slug
  } catch (err) {
    updateResultLog.value = 'LỖI: ' + (err.response?.data?.message || err.message)
  }
}

// ---- D: Delete ----
async function testDelete() {
  deleteResultLog.value = 'Đang gửi...'
  try {
    await vocabStore.deleteVocab(deleteSlug.value)
    deleteResultLog.value = `THÀNH CÔNG: đã xoá slug "${deleteSlug.value}"`
  } catch (err) {
    deleteResultLog.value = 'LỖI: ' + (err.response?.data?.message || err.message)
  }
}
</script>

<template>
  <div>
    <h1>VOCAB CRUD TEST PAGE</h1>

    <hr />

    <!-- ============ R: Read ============ -->
    <h2>1. READ</h2>
    <button @click="vocabStore.fetchAll()">Fetch lại danh sách</button> 

    <p v-if="vocabStore.isLoading">Đang tải...</p>
    <p v-else-if="vocabStore.error">Lỗi: {{ vocabStore.error }}</p>
    <p v-else-if="vocabStore.vocabs.length === 0">Không có dữ liệu.</p>

    <p>Số lượng hiện có trong store: {{ vocabStore.vocabs.length }}</p>
    <pre>{{ JSON.stringify(vocabStore.vocabs, null, 2) }}</pre>

    <hr />

    <!-- ============ C: Create ============ -->
    <h2>2. CREATE</h2>
    <div>
      <label>First language (EN): </label>
      <input v-model="createFirst" placeholder="apple" />
    </div>
    <div>
      <label>Second language (VI): </label>
      <input v-model="createSecond" placeholder="quả táo" />
    </div>
    <div>
      <label>Definition: </label>
      <input v-model="createDefinition" placeholder="a round fruit" />
    </div>
    <button @click="testCreate">Save (Create)</button>
    <p>Kết quả: {{ createResultLog }}</p>
    <p>vocabStore.error hiện tại: {{ vocabStore.error }}</p>

    <hr />

    <!-- ============ U: Update ============ -->
    <h2>3. UPDATE</h2>
    <p>Copy 1 slug bất kỳ từ danh sách JSON phía trên dán vào đây:</p>
    <div>
      <label>Slug cần sửa: </label>
      <input v-model="updateSlug" placeholder="apple" />
    </div>
    <div>
      <label>First language mới: </label>
      <input v-model="updateFirst" placeholder="apple" />
    </div>
    <div>
      <label>Second language mới: </label>
      <input v-model="updateSecond" placeholder="quả táo (sửa)" />
    </div>
    <div>
      <label>Definition mới: </label>
      <input v-model="updateDefinition" placeholder="..." />
    </div>
    <button @click="testUpdate">Update</button>
    <p>Kết quả: {{ updateResultLog }}</p>

    <hr />

    <!-- ============ D: Delete ============ -->
    <h2>4. DELETE</h2>
    <div>
      <label>Slug cần xoá: </label>
      <input v-model="deleteSlug" placeholder="apple" />
    </div>
    <button @click="testDelete">Delete</button>
    <p>Kết quả: {{ deleteResultLog }}</p>
  </div>
</template>