/// <reference types="vite/client" />

// 声明 VITE_API_BASE_URL 变量，使其在 TypeScript 中可用
interface ImportMetaEnv {
    readonly VITE_API_BASE_URL: string;
}

// 扩展全局的 ImportMeta 接口
interface ImportMeta {
    readonly env: ImportMetaEnv;
}
