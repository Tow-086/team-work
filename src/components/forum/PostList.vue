<!-- src/components/forum/PostList.vue -->
<template>
  <div class="post-list">
    <el-card
        v-for="post in forumStore.posts"
        :key="post.id"
        class="post-item"
        shadow="hover"
    >
      <div class="post-header">
        <h3 class="post-title">{{ post.title }}</h3>
        <div class="post-meta">
          <span class="author">{{ post.nickname }}</span>  <!-- [!code focus] -->
          <span class="time">{{ formatDate(post.createdAt) }}</span>
        </div>
      </div>

      <!-- 内容预览 -->
      <div class="post-content-preview">
        {{ truncateContent(post.content) }}
      </div>

      <!-- 底部统计信息 -->
      <div class="post-footer">
        <div class="stats">
          <el-icon><View /></el-icon>
          <span>{{ post.views || 0 }}</span>
          <el-icon><ChatDotRound /></el-icon>
          <span>{{ post.comments || 0 }}</span>
          <el-icon><Star /></el-icon>
          <span>{{ post.likeCount || 0 }}</span>
        </div>
        <el-button type="primary" size="small" @click="navigateToDetail(post.id!)">
          查看详情
        </el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { useForumStore } from '@/stores/forum'
import { View, ChatDotRound, Star } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

const forumStore = useForumStore()
const router = useRouter()

// 格式化日期
const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString()
}

// 内容截断
const truncateContent = (content: string) => {
  return content.length > 200 ? content.slice(0, 200) + '...' : content
}

// 跳转详情页
const navigateToDetail = (postId: number) => {
  router.push(`/posts/${postId}`)
}
</script>

<style scoped lang="less">
.post-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px 0;

  .post-item {
    border-radius: 12px;
    transition: transform 0.2s, box-shadow 0.2s;
    border: none;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    }

    .post-header {
      margin-bottom: 16px;
      border-bottom: 1px solid #f0f0f0;
      padding-bottom: 12px;

      .post-title {
        margin: 0;
        font-size: 20px;
        color: #333;
        line-height: 1.4;
      }

      .post-meta {
        margin-top: 8px;
        font-size: 13px;
        color: #666;

        .author {
          color: #4e73df;
          margin-right: 12px;
        }

        .time {
          color: #999;
        }
      }
    }

    .post-content-preview {
      color: #555;
      line-height: 1.6;
      font-size: 14px;
      margin-bottom: 16px;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .post-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 16px;

      .stats {
        display: flex;
        align-items: center;
        gap: 20px;
        color: #888;

        .el-icon {
          margin-right: 4px;
          font-size: 16px;
        }
      }
    }
  }
}
</style>