<script setup lang="ts">
import { Star } from '@element-plus/icons-vue'
import service from '@/api'
import { useUserStore } from '@/stores/user'

const props = defineProps<{
  postId: number
  likeCount: number
  isLiked: boolean
}>()

const emit = defineEmits(['update:likeCount', 'update:isLiked'])

const toggleLike = async () => {
  try {
    await service.post(`/posts/${props.postId}/like`)
    emit('update:likeCount', props.isLiked ? props.likeCount - 1 : props.likeCount + 1)
    emit('update:isLiked', !props.isLiked)
  } catch (error) {
    console.error('操作失败:', error)
  }
}
</script>

<template>
  <el-button
      :type="isLiked ? 'warning' : 'info'"
      :icon="Star"
      @click="toggleLike"
  >
    {{ likeCount }} 点赞
  </el-button>
</template>