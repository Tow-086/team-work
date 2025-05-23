<!-- src/components/post/PostComment.vue -->
<template>
  <div class="post-comment">
    <div class="comment-header">
      <el-avatar :src="comment.avatarUrl" :size="32" />
      <div class="user-info">
        <strong class="nickname">{{ comment.nickname }}</strong>
        <span class="time">{{ formatDate(comment.createdAt) }}</span>
      </div>
    </div>
    <div class="comment-content">{{ comment.content }}</div>

    <!-- 子评论 -->
    <div v-if="comment.children?.length" class="child-comments">
      <PostComment
          v-for="child in comment.children"
          :key="child.id"
          :comment="child"
          class="child-comment"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import type {IComment} from '@/types/forum'

const props = defineProps<{
  comment: IComment
}>()

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString()
}
</script>

<style scoped lang="less">
.post-comment {
  padding: 1rem;
  margin-bottom: 1rem;
  background: var(--el-bg-color);
  border-radius: 8px;

  .comment-header {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    margin-bottom: 0.5rem;

    .user-info {
      display: flex;
      flex-direction: column;

      .nickname {
        font-size: 14px;
        color: var(--el-text-color-primary);
      }

      .time {
        font-size: 12px;
        color: var(--el-text-color-secondary);
      }
    }
  }

  .comment-content {
    margin-left: 2.8rem;
    font-size: 14px;
    color: var(--el-text-color-regular);
    line-height: 1.6;
  }

  .child-comments {
    margin-top: 1rem;
    margin-left: 2rem;
    border-left: 2px solid var(--el-border-color-light);

    .child-comment {
      margin: 0.5rem 0;
      padding-left: 1rem;
    }
  }
}
</style>