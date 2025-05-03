<!-- ImageUploader.vue -->
<template>
  <div class="uploader">
    <input
        type="file"
        multiple
        @change="handleFileChange"
        accept="image/*"
    />
    <!-- 预览逻辑保持不变 -->
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['upload'])

const handleFileChange = (e: Event) => {
  const files = (e.target as HTMLInputElement).files
  if (files) {
    emit('upload', Array.from(files))
  }
}
</script>