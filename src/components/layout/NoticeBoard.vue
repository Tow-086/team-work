<!-- src/components/layout/NoticeBoard.vue -->
<template>
  <div class="notice-board">
    <h3 class="board-title">📢 最新公告</h3>
    <el-scrollbar height="500px">
      <div class="notice-item" v-for="item in notices" :key="item.id">
        <div class="notice-header">
          <span class="notice-type" :style="{background: item.typeColor}">{{ item.type }}</span>
          <span class="notice-date">{{ item.date }}</span>
        </div>
        <div class="notice-content">{{ item.content }}</div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const notices = ref([
  {
    id: 1,
    type: '重要',
    typeColor: '#ff4d4f',
    date: '2024-03-15',
    content: '关于新学期课程安排调整的通知'
  },
  {
    id: 2,
    type: '活动',
    typeColor: '#52c41a',
    date: '2024-03-14',
    content: '校园动漫文化节即将开幕！'
  },
  // 更多公告...
])
</script>

<style scoped>
.notice-board {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.board-title {
  font-size: 20px;
  color: #2c3e50;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 2px solid #eee;
}

.notice-item {
  margin-bottom: 15px;
  padding: 12px;
  background: #f8f9fa;
  border-radius: 8px;
}

.notice-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.notice-type {
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 4px;
  color: white;
}

.notice-date {
  font-size: 12px;
  color: #666;
}

.notice-content {
  font-size: 14px;
  line-height: 1.5;
}
</style>