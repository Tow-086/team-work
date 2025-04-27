<!-- src/components/forum/CreatePostButton.vue -->
<template>
  <el-button
      type="primary"
      circle
      class="float-button"
      @click="handleCreate">
    <el-icon :size="24"><Plus /></el-icon>
  </el-button>
</template>

<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue'

const handleCreate = () => {
  // 打开发帖弹窗逻辑
}
</script>

<style scoped>
.float-button {
  position: fixed;
  right: calc(25% + 40px);
  bottom: 40px;
  width: 56px;
  height: 56px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}
</style>