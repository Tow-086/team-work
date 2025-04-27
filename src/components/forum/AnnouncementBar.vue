<template>
  <div class="announcement-bar">
    <div class="header">
      <el-icon class="icon"><Warning /></el-icon>
      <h3>置顶公告</h3>
    </div>

    <el-scrollbar height="200px">
      <div class="announcement-list">
        <div v-for="item in announcements" :key="item.id" class="announcement-item">
          <div class="title">
            <el-tag :type="item.type" size="small">{{ item.tag }}</el-tag>
            {{ item.title }}
          </div>
          <div class="content">{{ item.content }}</div>
          <div class="time">{{ item.time }}</div>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { Warning } from '@element-plus/icons-vue'

const announcements = [
  {
    id: 1,
    type: 'danger',
    tag: '重要',
    title: '论坛维护通知',
    content: '将于3月25日凌晨2:00-4:00进行系统维护',
    time: '2024-03-20'
  },
  {
    id: 2,
    type: 'success',
    tag: '活动',
    title: '校园摄影大赛',
    content: '上传你的校园摄影作品，赢取丰厚奖品',
    time: '2024-03-19'
  }
]
</script>

<style scoped>
.announcement-bar {
  background: #fff;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.header {
  display: flex;
  align-items: center;
  margin-bottom: 12px;

  .icon {
    color: #e6a23c;
    font-size: 20px;
    margin-right: 8px;
  }

  h3 {
    margin: 0;
    font-size: 16px;
    color: #2c3e50;
  }
}

.announcement-item {
  padding: 12px;
  margin-bottom: 10px;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }

  .title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 500;
    margin-bottom: 6px;
  }

  .content {
    font-size: 14px;
    color: #666;
    line-height: 1.5;
    margin-bottom: 4px;
  }

  .time {
    font-size: 12px;
    color: #999;
  }
}
</style>