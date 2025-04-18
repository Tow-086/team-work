// 导入 Pinia 和 defineStore
import { defineStore } from 'pinia';

// 定义 userInfo 的类型
interface UserInfo {
    nickname: string;  // 与后端VO字段一致
    token: string;
}

// 定义 userStore
export const useUserStore = defineStore('user', {
    state: () => ({
        isLoggedIn: !!localStorage.getItem('token'),
        userInfo: JSON.parse(localStorage.getItem('userInfo') || 'null') as UserInfo | null
    }),
    actions: {
        login(userInfo: UserInfo) {
            localStorage.setItem('token', userInfo.token);
            localStorage.setItem('userInfo', JSON.stringify(userInfo));
            this.isLoggedIn = true;
            this.userInfo = userInfo;
        },
        logout() {
            localStorage.removeItem('token');
            localStorage.removeItem('userInfo');
            this.isLoggedIn = false;
            this.userInfo = null;
        }
    }
});
