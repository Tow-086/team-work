<template>
  <div class="post-detail-view">
    <el-skeleton :loading="isLoading" animated>
      <template #default>
        <PostDetail v-if="currentPost" :post="currentPost" />
        <el-empty v-else description="帖子不存在或加载失败" />
      </template>
    </el-skeleton>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useForumStore } from '@/stores/forum'
import { useRoute } from 'vue-router'
import PostDetail from '@/components/post/PostDetail.vue'
import { ElMessage } from 'element-plus'
import type {Post} from "@/types/forum.ts";


const route = useRoute()
const forumStore = useForumStore()
const currentPost = ref<Post | null>(null)
const isLoading = ref(true)

onMounted(async () => {
  try {
    const postId = Number(route.params.id)
    await forumStore.fetchPostById(postId)
    currentPost.value = forumStore.post
    console.log('当前帖子数据:',forumStore.post)
  } catch (error) {
    ElMessage.error('加载帖子详情失败')
  } finally {
    isLoading.value = false
  }
})
</script>