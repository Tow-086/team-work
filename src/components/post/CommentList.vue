<!-- CommentList.vue -->
<template>
  <div class="comment-list">
    <div v-if="comments.length === 0" class="empty-comment">
      <el-empty description="暂无评论" />
    </div>
    <div v-else class="comments-container">
      <div
          v-for="comment in comments"
          :key="comment.id"
          class="comment-item"
      >
        <!-- 确保头像和昵称有默认值 -->
        <el-avatar
            :src="comment.avatarUrl || '/default_avatar.png'"
            :size="32"
        />
        <div class="comment-content">
          <div class="comment-header">
            <span class="nickname">{{ comment.nickname || '匿名用户' }}</span>
            <span class="time">{{ formatDate(comment.createdAt) }}</span>
          </div>
          <div class="comment-text">{{ comment.content }}</div>
          <!-- 递归渲染子评论 -->
          <CommentList
              v-if="comment.children && comment.children.length"
              :comments="comment.children"
              class="child-comments"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import type { IComment } from '@/types/forum'

defineProps<{
  comments: IComment[]
}>()

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString()
}
</script>

<style scoped lang="less">
.comment-list {
  .comment-item {
    display: flex;
    gap: 12px;
    margin-bottom: 20px;
    padding: 16px;
    background: var(--el-bg-color);
    border-radius: 8px;

    .comment-content {
      flex: 1;

      .comment-header {
        display: flex;
        gap: 8px;
        align-items: center;
        margin-bottom: 8px;

        .nickname {
          font-weight: 500;
          font-size: 14px;
        }

        .time {
          font-size: 12px;
          color: var(--el-text-color-secondary);
        }
      }

      .comment-text {
        font-size: 14px;
        line-height: 1.6;
      }
    }

    .child-comments {
      margin-top: 16px;
      margin-left: 32px;
      border-left: 2px solid var(--el-border-color-light);
      padding-left: 16px;
    }
  }
}
/* CommentList.vue */
.comments-container {
  max-height: none !important; // 移除可能的高度限制
  overflow: visible !important;
}
</style>