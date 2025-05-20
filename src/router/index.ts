/**
 * src/router/index.ts 文件，主要负责创建和配置 Vue Router 实例，管理应用的路由。
 * 引入了创建路由实例和设置历史模式的函数，以及各个页面组件，用于定义不同路由路径对应的页面显示。
 */
// 从 'vue-router' 库中导入用于创建路由实例的 createRouter 函数和设置路由历史模式的 createWebHistory 函数
import { createRouter, createWebHistory } from 'vue-router'
// 导入首页组件 HomeView，用于渲染网站的首页内容
import HomeView from '../views/HomeView.vue'
// 导入登录页面组件 LoginView，用于处理用户登录相关的逻辑和显示
import LoginView from '../views/auth/LoginView.vue'
// 导入注册页面组件 RegisterView，用于处理用户注册相关的逻辑和显示
import RegisterView from '../views/auth/RegisterView.vue'

import Intro from "../views/intro/Sintro.vue";
import History from "../views/intro/history.vue";
import Pinyuan from "../views/intro/Pinyuan.vue";
import Shetuan from "../views/shetuan.vue";
import Map from "../views/map.vue";
import Fengcai from "../views/fengcai.vue";
import QuestionPage from '@/views/question.vue';
// 定义路由配置数组，每个对象代表一条路由规则，包含路径、名称和对应的组件等信息
const routes = [
    {
        // 定义根路径 '/' 的路由规则
        path: '/',
        // 路由名称为 'Home'，方便在代码中引用该路由
        name: 'Home',
        // 当访问根路径时，渲染 HomeView 组件
        component: HomeView
    },
    {
        // 定义 '/login' 路径的路由规则
        path: '/login',
        // 路由名称为 'Login'
        name: 'Login',
        // 当访问 '/login' 路径时，渲染 LoginView 组件
        component: LoginView
    },
    {
        // 定义 '/register' 路径的路由规则
        path: '/register',
        // 路由名称为 'Register'
        name: 'Register',
        // 当访问 '/register' 路径时，渲染 RegisterView 组件
        component: RegisterView
    },
    {
        // 定义 '/reset-password' 路径的路由规则
        path: '/reset-password',
        // 路由名称为 'ResetPassword'
        name: 'ResetPassword',
        // 使用动态导入的方式，当访问该路径时才加载 ResetPasswordView 组件，提高应用性能
        component:()=>import('../views/auth/ResetPasswordView.vue')
    },
    {// 路由路径
    path: '/intro',
    // 路由名称
    name: 'Intro',
    // 对应的组件
    component: Intro
},
    {
        path: '/history',
        name: 'History',
        component: History

    },
    {
        path: '/Pinyuan',
        name: 'Pinyuan',
        component: Pinyuan
    },
    {
        path: '/Shetuan',
        name: 'Shetuan',
        component: Shetuan
    },
    {
        path: '/map',
        name: 'map',
        component: Map
    },
    {
        path: '/fengcai',
        name: 'Fengcai',
        component: Fengcai
    },
    {
        path: '/question',
        name: 'Question',
        component: QuestionPage,
    }

]

// 创建 Vue Router 实例，配置路由历史模式和路由规则
const router = createRouter({
    // 使用 createWebHistory 创建基于 HTML5 History API 的路由历史模式，并传入项目的基础 URL
    history: createWebHistory(import.meta.env.BASE_URL),
    // 传入定义好的路由规则数组
    routes
})

// 导出创建好的路由实例，以便在应用的其他部分（如 main.ts 等）中使用
export default router