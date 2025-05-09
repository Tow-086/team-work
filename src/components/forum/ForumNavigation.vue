<!-- src/components/forum/ForumNavigation.vue -->
<template>
  <div class="forum-nav">
    <h3>≡ 论坛板块</h3>
    <el-menu>
      <el-menu-item
          v-for="(name, key) in sections"
          :key="key"
          :index="key"
          @click="selectSection(key)"
      >
        {{ name }}
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
const sections = {
  fresh: '校园新鲜事',
  study: '学习交流',
  life: '生活互助'
}

const selectSection = (sectionKey: string) => {
  router.push({
    path: '/talk/postList',
    query: { section: sectionKey }
  })
}
</script>