// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/auth/LoginView.vue'
import RegisterView from '../views/auth/RegisterView.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomeView
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginView
    },
    {
        path: '/register',
        name: 'Register',
        component: RegisterView
    },
    {
      path:'/reset-password',
      name:'ResetPassword',
      component:()=>import('../views/auth/ResetPasswordView.vue')
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router
