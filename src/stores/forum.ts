import { defineStore } from 'pinia'
import { fetchPosts, createPost } from '@/api/forum'

interface Post {
    id: number
    title: string
    content: string
    author: string
    tags: string[]
    likes: number
    comments: number
    createdAt: string
}

interface ForumFilter {
    sortBy: 'latest' | 'hot'
    tags: string[]
}

export const useForumStore = defineStore('forum', {
    state: () => ({
        posts: [] as Post[],
        currentFilter: {
            sortBy: 'latest',
            tags: []
        } as ForumFilter
    }),

    getters: {
        filteredPosts(state): Post[] {
            return [...state.posts].sort((a, b) => {
                if (state.currentFilter.sortBy === 'hot') {
                    return b.likes - a.likes
                }
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            })
        }
    },

    actions: {
        async fetchPosts() {
            try {
                this.posts = await fetchPosts()
            } catch (error) {
                console.error('获取帖子失败:', error)
            }
        },

        async createNewPost(postData: { title: string; content: string }) {
            const newPost = await createPost(postData)
            this.posts.unshift(newPost)
        },

        applyFilter(filter: ForumFilter) {
            this.currentFilter = filter
        }
    },

    // 添加分页状态
    state: () => ({
        currentPage: 1,
        pageSize: 10,
        totalPosts: 0
    }),

// 添加分页action
    async loadPosts(page = 1) {
        this.currentPage = page
        const { data } = await fetchPosts({
            page,
            size: this.pageSize
        })
        this.posts = data.list
        this.totalPosts = data.total
    }
})
