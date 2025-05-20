/**
 * 引用 Vite 客户端类型定义文件
 * 这行代码让 TypeScript 识别 Vite 提供的类型定义，确保在项目中可以正确使用 Vite 相关的类型
 */
/// <reference types="vite/client" />

/**
 * 声明所有以 .vue 结尾的文件为模块
 * 此声明允许 TypeScript 识别 Vue 单文件组件（.vue 文件），并正确处理其类型
 */
declare module '*.vue' {
    /**
     * 从 'vue' 模块中导入 DefineComponent 类型
     * DefineComponent 用于定义 Vue 组件的类型，包含了组件的属性、方法和状态等信息
     */
    import type { DefineComponent } from 'vue';

    /**
     * 定义一个名为 component 的常量，其类型为 DefineComponent
     * 该组件没有定义明确的 props 和 emits，并且其状态和方法等可以是任意类型
     */
    const component: DefineComponent<{}, {}, any>;

    /**
     * 导出默认的组件
     * 这使得在其他 TypeScript 文件中导入 .vue 文件时，可以直接使用默认导出的组件
     */
    export default component;
}