<!-- src/views/ForumView.vue -->
<template>
  <div class="forum-view">
    <el-row :gutter="20">
      <el-col :span="5">
        <ForumNavigation />
        <SideNavigation />
      </el-col>

      <el-col :span="14">
        <AnnouncementBar class="mb-4"/>
        <PostList />
        <CreatePostButton />
      </el-col>

      <el-col :span="5">
        <HotTopics class="mb-4"/>
        <ActiveUsers />
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import ForumNavigation from '@/components/forum/ForumNavigation.vue'
import SideNavigation from '@/components/forum/SideNavigation.vue'
import AnnouncementBar from '@/components/forum/AnnouncementBar.vue'
import PostList from '@/components/forum/PostList.vue'
import HotTopics from '@/components/forum/HotTopics.vue'
import ActiveUsers from '@/components/forum/ActiveUsers.vue'
import CreatePostButton from '@/components/forum/CreatePostButton.vue'
</script>

<style scoped>
.forum-view {
  max-width: 1440px;
  margin: 0 auto;
  padding: 20px;
}

.el-row {
  display: flex;
  min-height: calc(100vh - 100px);
}

.el-col {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>