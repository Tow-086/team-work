// 在 @/api/forum.ts 新增：
export interface Post {
    id: number
    title: string
    content: string
    author: string
    authorAvatar: string
    tags: string[]
    likes: number
    comments: number
    createdAt: string
}

// PostItem.vue保持原import不变：
import type { Post } from '@/api/forum'

export async function fetchPosts() {
    return [
        {
            id: 1,
            title: "欢迎来到校园论坛",
            content: "这是第一个测试帖子，欢迎大家积极发言！",
            author: "管理员",
            tags: ["公告"],
            likes: 10,
            comments: 2,
            createdAt: "2024-03-20T08:00:00"
        },
        {
            id: 2,
            title: "新生答疑专区",
            content: "有任何入学问题请在此提问",
            author: "学生会",
            tags: ["问答"],
            likes: 5,
            comments: 3,
            createdAt: "2024-03-20T09:00:00"
        }
    ]
}