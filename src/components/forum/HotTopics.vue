<template>
  <div class="hot-topics">
    <div class="header">
<!--      <el-icon class="icon"><Fire /></el-icon>-->
      <h3>热门话题</h3>
    </div>

    <div class="topic-list">
      <div v-for="(topic, index) in topics" :key="index" class="topic-item">
        <div class="index">#{{ index + 1 }}</div>
        <div class="content">
          <div class="title">{{ topic.title }}</div>
          <div class="stats">
            <span class="heat">🔥 {{ topic.heat }}</span>
            <el-tag effect="plain" size="small">{{ topic.tag }}</el-tag>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { Fire } from '@element-plus/icons-vue'

const topics = [
  { title: '如何选择选修课？', heat: '2.3万', tag: '学习' },
  { title: '食堂美食推荐', heat: '1.8万', tag: '生活' },
  { title: '社团招新指南', heat: '1.5万', tag: '活动' }
]
</script>

<style scoped>
.hot-topics {
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
    color: #f56c6c;
    font-size: 20px;
    margin-right: 8px;
  }

  h3 {
    margin: 0;
    font-size: 16px;
    color: #2c3e50;
  }
}

.topic-item {
  display: flex;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }

  .index {
    width: 40px;
    font-weight: bold;
    color: var(--el-color-primary);
    font-size: 18px;
  }

  .content {
    flex: 1;

    .title {
      font-size: 14px;
      margin-bottom: 6px;
      line-height: 1.4;
    }

    .stats {
      display: flex;
      align-items: center;
      gap: 8px;

      .heat {
        font-size: 12px;
        color: #666;
      }
    }
  }
}
</style>