/**
 * 该文件主要用于使用 Pinia 定义用户相关的状态管理 store。
 * Pinia 是 Vue 的状态管理库，这里通过 defineStore 来创建一个名为 user 的 store。
 */
// 从 'pinia' 库中导入 defineStore 函数，用于定义 Pinia store
import { defineStore } from 'pinia';

// 定义 UserInfo 接口，描述用户信息的数据结构
interface UserInfo {
    // 用户昵称，与后端返回的 VO（Value Object）字段一致
    nickname: string;
    // 用户的令牌，用于身份验证等
    token: string;
}

// 使用 defineStore 定义名为 'user' 的 store，并导出 useUserStore 函数以便在其他组件中使用
export const useUserStore = defineStore('user', {
    // state 函数用于定义 store 的状态，返回一个包含初始状态的对象
    state: () => ({
        // 判断用户是否已登录，通过检查 localStorage 中是否存在 token 来确定
        isLoggedIn: !!localStorage.getItem('token'),
        // 从 localStorage 中获取用户信息并解析为 UserInfo 类型或 null
        userInfo: JSON.parse(localStorage.getItem('userInfo') || 'null') as UserInfo | null
    }),
    // actions 对象用于定义 store 中的方法，这些方法可以修改状态或执行其他操作
    actions: {
        // 登录方法，接受一个 UserInfo 类型的参数 userInfo
        login(userInfo: UserInfo) {
            // 将用户的 token 存储到 localStorage 中
            localStorage.setItem('token', userInfo.token);
            // 将用户信息以 JSON 字符串的形式存储到 localStorage 中
            localStorage.setItem('userInfo', JSON.stringify(userInfo));
            // 设置用户已登录状态为 true
            this.isLoggedIn = true;
            // 更新 store 中的用户信息
            this.userInfo = userInfo;
        },
        // 注销方法
        logout() {
            // 从 localStorage 中移除用户的 token
            localStorage.removeItem('token');
            // 从 localStorage 中移除用户信息
            localStorage.removeItem('userInfo');
            // 设置用户已登录状态为 false
            this.isLoggedIn = false;
            // 将 store 中的用户信息设置为 null
            this.userInfo = null;
        }
    }
});