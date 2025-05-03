export interface Post {
    id: number
    title: string
    content: string
    section: string
    tags: string[]
    images: string[]
    views: number
    likes: number
    comments: number
    author: string
    authorAvatar: string
    createdAt: string
    updatedAt: string
    userId: number |  null
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
}

export interface Pagination {
    currentPage: number
    pageSize: number
    total: number
}