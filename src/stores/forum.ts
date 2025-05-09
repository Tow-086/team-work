import { defineStore } from 'pinia'
import { ElMessage } from 'element-plus'
import { fetchPosts as apiFetchPosts, createPost, fetchPostById } from '@/api/forum' // 新增引入
import type { Post, PostListData } from '@/types/forum'

export const useForumStore = defineStore('forum', {
    state: () => ({
        posts: [] as Post[],
        post: null as Post | null,
        loading: false,
        error: null as string | null
    }),

    actions: {
        async fetchPosts(section?: string) {
            this.loading = true
            try {
                const response = await apiFetchPosts({section:section, page: 1, size: 100 })
                this.posts = response.list.map(post => ({
                    id: post.id,
                    title: post.title,
                    content: post.content,
                    section: post.section,
                    tags: post.tags || [],
                    images: post.images || [],
                    likes: post.likeCount || 0,
                    comments: post.comments || 0,
                    views: post.views || 0,
                    nickname: post.nickname || '匿名用户', // [!code focus]
                    avatarUrl: post.avatarUrl || '/default_avatar.png', // [!code focus]
                    userId: post.userId,
                    createdAt: post.createdAt,
                    updatedAt: post.updatedAt
                }))
            } catch (error) {
                this.error = '加载失败'
                ElMessage.error(this.error)
            } finally {
                this.loading = false
            }
        },

        async createNewPost(formData: FormData) {
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
        },

        async fetchPostById(id: number) {
            this.loading = true;
            try {
                const postData = await fetchPostById(id); // 直接获取Post对象
                this.post = postData;
            } catch (error) {
                console.error('加载帖子失败:', error);
                ElMessage.error('加载帖子详情失败');
            } finally {
                this.loading = false;
            }
        }
    }
})
