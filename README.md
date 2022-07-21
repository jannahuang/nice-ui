# vue3-ui
## 创建目录并启动：
> yarn create vite-app vue3-ui
> cd vue3-ui
> yarn
> yarn dev
## 小知识：
### Vue2 和 Vue3 的区别
90% 的写法完全一致，除了以下几点：
* Vue3 的 Template 支持**多个根标签**，Vue2 不支持
* Vue3 有 **createApp()**，而 Vue2 的是 new Vue()
* createApp(**组件**)，new Vue({template, render})

## 查看 vue-router 版本号
> yarn info vue-router versions
## 安装 vue-router
> yarn add vue-router@4.1.2

## 找不到模块 xxx.vue
**出现原因**
TypeScript 只能理解 .ts 文件，无法理解 .vue 文件
**解决办法**
搜索 Vue3 can not find module
创建 xxx.d.ts，告诉 TS 如何理解 .vue 文件

## 初始化 vue-router
* 新建 history 对象
* 新建 router 对象
* 引入 TypeScript
* app.use(router)
* 添加 < router-view >
* 添加 < router-line >

## 创建官网
**Home.vue**
Topnav：左边是 logo，右边是 menu
Banner：文字介绍+开始按钮
**Doc.**
Topnav：左边是 logo，右边是 menu
Content：左边是 aside，右边是 main

## VSCode 插件推荐
Vue 3 Snippets，Auto Import