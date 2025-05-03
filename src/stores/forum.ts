import { defineStore } from 'pinia'
import { ElMessage } from 'element-plus'
import { fetchPosts as apiFetchPosts, createPost } from '@/api/forum'
import type { Post, PostListData } from '@/types/forum'

export const useForumStore = defineStore('forum', {
    state: () => ({
        posts: [] as Post[],
        loading: false,
        error: null as string | null
    }),

    actions: {
        async fetchPosts() {
            this.loading = true
            try {

                const postListData = await apiFetchPosts({ page: 1, size: 10 })
                console.log('处理后的帖子数据:', this.posts)
                // 显式字段映射
                this.posts = postListData.list.map(post => ({
                    id: post.id,
                    title: post.title,
                    content: post.content,
                    section: post.section,
                    tags: post.tags || [],
                    images: post.images || [],
                    likes: post.likeCount || 0, // 映射后端字段 likeCount -> likes
                    comments: post.comments || 0,
                    views: post.views || 0,
                    author: post.author || '匿名用户', // 添加默认值
                    createdAt: post.createdAt
                }))
            } catch (error) {
                this.error = '加载失败'
                ElMessage.error(this.error)
            } finally {
                this.loading = false
            }
        },

        async createNewPost(formData: FormData) {
            console.log('createPost:', createPost)

            this.loading = true
            try {
                const response = await createPost(formData)
                if (response.code === 201) {
                    this.posts.unshift(response.data)
                    return response.data
                }
            } catch (error) {
                throw error
            } finally {
                this.loading = false
            }
        }
    }
})