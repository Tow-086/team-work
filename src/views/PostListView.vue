<!-- src/views/PostListView.vue -->
<template>
  <div class="post-list-view">
    <h2>帖子列表 (共 {{ forumStore.posts.length }} 条)</h2>
    <el-alert
        v-if="!forumStore.loading && forumStore.posts.length === 0"
        title="暂时没有帖子，快来发布第一条吧！"
        type="info"
        show-icon
    />
    <el-skeleton v-if="forumStore.loading" :rows="5" animated />
    <el-alert v-else-if="forumStore.error" :title="forumStore.error" type="error" />
    <PostList v-else />
  </div>
</template>

<script setup lang="ts">
import { useForumStore } from '@/stores/forum'
import PostList from '@/components/forum/PostList.vue'
import { onMounted } from 'vue'

const forumStore = useForumStore()

onMounted(() => {
  forumStore.fetchPosts()
})
</script>

<style scoped>
.post-list-view {
  max-width: 1440px;
  margin: 0 auto;
  padding: 20px;
}
</style>
