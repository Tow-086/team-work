export interface Post {
    id: number | null
    title: string
    content: string
    section: string
    tags: string[]
    images: string[]
    views: number
    likeCount: number
    comments: number
    nickname: string
    avatarUrl: string
    createdAt: string
    updatedAt: string
    userId: number |  null
    commentsList?: Comment[]
}

export interface ApiResponse<T> {
    code: number
    message: string
    data: T
}

export interface PostListData {
    list: Post[]
    total: number
    page: number
    pageSize: number
}

export interface Comment {
    id: number
    content: string
    parentId: number | null
    likes: number
    userId: number
    postId: number
    createdAt: string
    nickname?: string    // 新增
    avatarUrl?: string   // 新增
}

export interface Pagination {
    currentPage: number
    pageSize: number
    total: number
}