<!-- src/components/forum/RichEditor.vue -->
<template>
  <div class="rich-editor-container">
    <textarea
        :value="modelValue"
        @input="handleInput($event)"
        :style="{ height: height }"
        class="editor-textarea"
        placeholder="请输入正文内容..."
    ></textarea>
  </div>
</template>

<script setup lang="ts">import { defineProps, defineEmits } from 'vue'

const props = defineProps<{
  modelValue: string
  height?: string | number
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

// 修改后正确版本
const handleInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement | null
  if (!target) return
  emit('update:modelValue', target.value)
}
</script>


<style scoped lang="less">
.rich-editor-container {
  border: 1px solid #e4e4e4;
  border-radius: 4px;
  padding: 10px;
  background: #f9f9f9;
}

.editor-textarea {
  width: 100%;
  resize: none;
  border: none;
  outline: none;
  font-family: inherit;
  font-size: 14px;
  line-height: 1.6;
  background: transparent;
}
</style>