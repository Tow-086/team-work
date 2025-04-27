// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'
import EmptyLayout from '@/layouts/EmptyLayout.vue'
// src/router/index.ts
import { useUserStore } from '@/stores/user'
import LoginView from "../views/auth/LoginView.vue";


const routes = [
    // 登录/注册/重置密码（使用 EmptyLayout）
    {
        path: '/login',
        // component: LoginView
        component: EmptyLayout, // 父布局
        children: [{
            path: '', // 保持空路径，确保 EmptyLayout 的 <router-view> 渲染 LoginView
            name: 'Login',
            component: () => import('@/views/auth/LoginView.vue')
        }]
    },
    {
        path: '/register',
        component: EmptyLayout,
        children: [{
            path: '',
            name: 'Register',
            component: () => import('@/views/auth/RegisterView.vue')
        }]
    },
    {
        path: '/reset-password',
        component: EmptyLayout,
        children: [{
            path: '',
            name: 'ResetPassword',
            component: () => import('@/views/auth/ResetPasswordView.vue')
        }]
    },

    // 根路径 '/'
// 修改后的路由配置（关键改动）
    {
        path: '/', // 定义父路径
        component: MainLayout, // 布局作为父组件
        children: [ // 添加子路由
            {
                path: '', // 访问根路径时渲染 HomeView
                name: 'Home',
                component: () => import('@/views/HomeView.vue') // 需要创建 HomeView 组件
            }
        ],
        meta: { requiresAuth: false }
    },


    // 论坛布局（必须保留 children）
    {
        path: '/talk',
        name: 'Forum',
        component: () => import('@/layouts/ForumLayout.vue'),
        meta: { requiresAuth: false },
        // children: [{
        //     path: '',
        //     component: () => import('@/views/ForumView.vue')
        // }]
    }
    // router/index.js 需添加路由配置


]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    const userStore = useUserStore()
    if (to.meta.requiresAuth && !userStore.isLoggedIn) {
        next('/login') // 未登录时跳转到登录页
    } else {
        next()
    }
})

export default router