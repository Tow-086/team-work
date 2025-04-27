<!-- src/components/forum/ActiveUsers.vue -->
<template>
  <div class="active-users">
    <div class="header">
      <el-icon class="icon"><User /></el-icon>
      <h3>活跃用户榜</h3>
    </div>

    <div class="user-list">
      <div v-for="user in users" :key="user.id" class="user-item">
        <el-avatar :size="32" :src="user.avatar" />
        <div class="info">
          <div class="name">{{ user.name }}</div>
          <div class="activity">活跃度 {{ user.activity }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { User } from '@element-plus/icons-vue'

const users = [
  { id: 1, name: '用户X', avatar: '', activity: '98.7' },
  { id: 2, name: '用户Y', avatar: '', activity: '95.2' },
  { id: 3, name: '用户Z', avatar: '', activity: '91.5' }
]
</script>

<style scoped>
.active-users {
  background: #fff;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.user-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid #eee;

  .info {
    .name {
      font-size: 14px;
    }

    .activity {
      font-size: 12px;
      color: #666;
    }
  }
}
</style>