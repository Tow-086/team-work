<!-- components/post/PostDetail.vue -->
<template>
  <div class="post-detail-container">
    <!-- 返回按钮 -->
    <el-button
        type="primary"
        link
        @click="router.back()"
        class="back-btn"
    >
      <el-icon><ArrowLeft /></el-icon>
      返回帖子列表
    </el-button>

    <!-- 主内容区 -->
    <div class="post-main">
      <!-- 作者信息卡片 -->
      <el-card class="author-card">
        <div class="author-info">
          <el-avatar :src="post.avatarUrl" :size="56" class="avatar" />
          <div class="meta">
            <h3 class="nickname">{{ post.nickname || '匿名用户' }}</h3>
            <div class="post-meta">
              <span class="time">{{ formatDate(post.createdAt) }}</span>
              <el-divider direction="vertical" />
              <span class="views">{{ post.views }} 次阅读</span>
            </div>
          </div>
        </div>
      </el-card>

      <!-- 标题区 -->
      <div class="title-section">
        <h1 class="post-title">{{ post.title }}</h1>
        <div class="decorative-line"></div>
      </div>

      <!-- 图片画廊 -->
      <div v-if="post.images?.length" class="image-gallery">
        <el-image
            v-for="(img, index) in post.images"
            :key="index"
            :src="img"
            :preview-src-list="post.images"
            fit="cover"
            class="gallery-item"
            :initial-index="index"
        >
          <template #placeholder>
            <div class="image-placeholder">
              <el-icon :size="32"><Picture /></el-icon>
            </div>
          </template>
        </el-image>
      </div>

      <!-- 内容区 -->
      <el-card class="content-card">
        <div class="content-box" v-html="post.content"></div>
      </el-card>

      <!-- 互动操作区 -->
      <div class="action-bar">
        <PostActions
            :post-id="post.id!"
            :like-count="post.likeCount"
            :is-liked="post.isLiked || false"
            class="action-item"
            @update:like-count="val => post.likeCount = val"
            @update:is-liked="val => post.isLiked = val"
        />
        <el-button
            type="info"
            :icon="ChatDotRound"
            class="action-item"
        >
          {{ post.comments }} 条评论
        </el-button>
      </div>

      <!-- 评论区 -->
      <el-card class="comment-section">
        <template #header>
          <div class="comment-header">
            <el-icon><ChatLineRound /></el-icon>
            <span>评论区（{{ post.comments }}）</span>
          </div>
        </template>

        <div v-if="!post.commentsList?.length" class="empty-comment">
          <el-empty description="暂无评论" :image-size="80" />
        </div>

        <PostComment
            v-for="comment in post.commentsList"
            :key="comment.id"
            :comment="comment"
            class="comment-item"
        />
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeft, Picture, ChatLineRound, ChatDotRound } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import PostComment from './PostComment.vue'
import PostActions from './PostActions.vue'
import type { Post } from "@/types/forum.ts"

const router = useRouter()
const props = defineProps<{
  post: Post
}>()

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>

<style scoped lang="less">
.post-detail-container {
  max-width: 880px;
  margin: 0 auto;
  padding: 2rem 1rem;

  .back-btn {
    margin-bottom: 2rem;
    padding-left: 0;
    font-size: 14px;
    color: var(--el-color-primary);

    &:hover {
      color: var(--el-color-primary-light-3);
    }
  }

  .post-main {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .author-card {
    border-radius: 12px;

    .author-info {
      display: flex;
      align-items: center;
      gap: 1.5rem;

      .avatar {
        flex-shrink: 0;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      }

      .meta {
        flex: 1;

        .nickname {
          margin: 0;
          font-size: 18px;
          color: var(--el-text-color-primary);
        }

        .post-meta {
          margin-top: 8px;
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--el-text-color-secondary);
          font-size: 13px;

          :deep(.el-divider) {
            margin: 0 4px;
            background-color: var(--el-border-color);
          }
        }
      }
    }
  }

  .title-section {
    margin: 1rem 0;

    .post-title {
      margin: 0;
      font-size: 28px;
      line-height: 1.4;
      color: var(--el-text-color-primary);
      text-align: center;
    }

    .decorative-line {
      width: 80px;
      height: 3px;
      background: linear-gradient(90deg, var(--el-color-primary), #ff9f43);
      margin: 1.5rem auto;
      border-radius: 2px;
    }
  }

  .image-gallery {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));

    .gallery-item {
      height: 240px;
      border-radius: 8px;
      overflow: hidden;
      transition: transform 0.3s;
      background: var(--el-fill-color-light);

      &:hover {
        transform: translateY(-3px);
      }
    }

    .image-placeholder {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--el-text-color-placeholder);
    }
  }

  .content-card {
    border-radius: 12px;

    :deep(.el-card__body) {
      padding: 2rem;
    }

    .content-box {
      line-height: 1.8;
      font-size: 16px;
      color: var(--el-text-color-regular);
      /* 自动换行核心样式 */
      word-wrap: break-word;
      white-space: pre-wrap;
      overflow-wrap: break-word;

      /* 处理长文本 */
      p {
        max-width: 100%;
        margin: 1em 0;
        word-break: break-word;
      }

      /* 代码块换行 */
      :deep(pre) {
        white-space: pre-wrap;
        word-wrap: break-word;
        padding: 1rem;
        background: var(--el-fill-color-light);
        border-radius: 8px;
        overflow-x: auto;
      }

      /* 长链接换行 */
      a {
        word-break: break-all;
      }

      :deep(img) {
        max-width: 100%;
        height: auto;
        margin: 1.5rem 0;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      }
    }
  }

  .action-bar {
    display: flex;
    gap: 1rem;
    justify-content: center;
    padding: 1.5rem;
    background: var(--el-bg-color);
    border-radius: 8px;

    .action-item {
      transition: all 0.3s;
      padding: 12px 24px;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0,0,0,0.08);
      }
    }
  }

  .comment-section {
    border-radius: 12px;

    .comment-header {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 16px;
      color: var(--el-text-color-primary);

      .el-icon {
        font-size: 20px;
        color: var(--el-color-primary);
      }
    }

    .comment-item {
      margin-bottom: 1.5rem;
      transition: all 0.3s;

      &:last-child {
        margin-bottom: 0;
      }

      &:hover {
        transform: translateX(5px);
      }
    }

    .empty-comment {
      padding: 2rem 0;
    }
  }
}

@media (max-width: 768px) {
  .post-detail-container {
    padding: 1rem;

    .post-title {
      font-size: 24px !important;
    }

    .image-gallery {
      grid-template-columns: 1fr;

      .gallery-item {
        height: 200px;
      }
    }

    .content-card {
      :deep(.el-card__body) {
        padding: 1rem !important;
      }

      .content-box {
        font-size: 14px;
        line-height: 1.6;
      }
    }
  }
}
</style>