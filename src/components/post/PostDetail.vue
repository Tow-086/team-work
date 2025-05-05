<!-- components/post/PostDetail.vue -->
<template>
  <div class="post-detail">
    <el-button type="info" icon="Back" @click="router.back()" class="mb-4">
      返回列表
    </el-button>

    <!-- 作者信息 -->
    <div class="author-info flex items-center gap-3 mb-6">
      <el-avatar :src="post.avatarUrl" :size="48" />
      <div>
        <h3 class="text-lg font-medium">{{ post.nickname ||'暂无昵称' }}</h3>
        <span class="text-gray-500 text-sm">{{ formatDate(post.createdAt) }}</span>
      </div>
    </div>

    <!-- 标题 -->
    <h1 class="text-3xl font-bold mb-4">{{ post.title }}</h1>

    <!-- 图片展示 -->
    <div v-if="post.images?.length" class="image-gallery grid grid-cols-3 gap-4 mb-6">
      <el-image
          v-for="(img, index) in post.images"
          :key="index"
          :src="img"
          :preview-src-list="post.images"
          fit="cover"
          class="h-48 rounded-lg"
      />
    </div>

    <!-- 内容 -->
    <div class="content-box bg-gray-50 p-6 rounded-lg mb-6" v-html="post.content"></div>

    <!-- 操作区 -->
    <div class="action-bar flex gap-4 mb-6">
      <el-button type="info" :icon="View">{{ post.views }} 阅读</el-button>
      <el-button type="primary" :icon="ChatDotRound">{{ post.comments }} 评论</el-button>
      <el-button type="warning" :icon="Star">{{ post.likeCount }} 点赞</el-button>
    </div>

    <!-- 评论区 -->
    <!-- PostDetail.vue -->
    <div class="comment-section">
      <h3 class="text-xl font-semibold mb-4">评论（{{ post.comments }}）</h3>
      <div v-if="!post.commentsList || post.commentsList.length === 0" class="text-gray-500">
        暂无评论，快来发表第一条吧！
      </div>
      <PostComment
          v-for="comment in post.commentsList"
          :key="comment.id"
          :comment="comment"
      />
    </div>

  </div>
</template>

<script setup lang="ts">
import { View, ChatDotRound, Star } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import PostComment from './PostComment.vue'
import type {Post} from "@/types/forum.ts";

const router = useRouter()
const props = defineProps<{
  post: Post
}>()

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
}
</script>

<style scoped lang="less">
.post-detail {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;

  .author-info {
    padding: 1rem;
    background: #f8f9fa;
    border-radius: 8px;
  }

  .image-gallery {
    img {
      cursor: pointer;
      transition: transform 0.3s;
      &:hover {
        transform: scale(1.02);
      }
    }
  }

  .content-box {
    line-height: 1.8;
    font-size: 16px;
    :deep(img) {
      max-width: 100%;
      height: auto;
      margin: 1rem 0;
      border-radius: 8px;
    }
  }
}
</style>