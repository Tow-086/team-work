<!-- src/components/post/PostComment.vue -->
<template>
  <div class="post-comment">
    <div class="comment-header">
      <strong>{{ comment.nickname }}</strong>
      <span class="time">{{ formatDate(comment.createdAt) }}</span>
    </div>
    <div class="comment-content">{{ comment.content }}</div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import type { Comment } from '@/types/forum'

const props = defineProps<{
  comment: Comment
}>()

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString()
}
</script>

<style scoped lang="less">
.post-comment {
  border-bottom: 1px solid #eee;
  padding: 10px 0;
  margin-bottom: 10px;

  .comment-header {
    font-size: 14px;
    color: #666;
  }

  .comment-content {
    margin-top: 5px;
    color: #333;
  }
}
</style>
