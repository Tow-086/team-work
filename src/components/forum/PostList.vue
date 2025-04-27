<template>
  <div class="post-list">
    <!-- 加载状态 -->
    <el-skeleton v-if="loading" :rows="5" animated />

    <!-- 帖子项 -->
    <div v-for="post in filteredPosts" :key="post.id">
      <div class="post-author">{{ post.author }}</div>
      <h3>{{ post.title }}</h3>
      <div class="post-content">{{ post.content }}</div>
      <div class="post-meta">
        <span>{{ formatDate(post.createdAt) }}</span>
        <el-button icon="el-icon-chat-dot-round">{{ post.comments }}</el-button>
        <el-button icon="el-icon-thumb">{{ post.likes }}</el-button>
      </div>
    </div>

    <!-- 分页 -->
    <el-pagination
        layout="prev, pager, next"
        :total="totalPosts"
        @current-change="handlePageChange"
    />
  </div>
</template>