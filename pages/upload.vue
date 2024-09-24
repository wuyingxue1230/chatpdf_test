<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">上传PDF文件</h1>
    <input type="file" @change="handleFileUpload" accept="application/pdf" class="mb-4" />
    <button @click="submitFile" class="bg-blue-500 text-white px-4 py-2 rounded">提交</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const file = ref(null)

const handleFileUpload = (event) => {
  file.value = event.target.files[0]
}

const submitFile = async () => {
  if (!file.value) return

  const formData = new FormData()
  formData.append('file', file.value)

  try {
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    })
    const result = await response.json()
    console.log(result)
  } catch (error) {
    console.error('Error uploading file:', error)
  }
}
</script>