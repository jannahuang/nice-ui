# vue3-ui
## 框架搭建
### 创建目录并启动：
> yarn create vite-app vue3-ui
> cd vue3-ui
> yarn
> yarn dev
### 小知识：
#### Vue2 和 Vue3 的区别
90% 的写法完全一致，除了以下几点：
* Vue3 的 Template 支持**多个根标签**，Vue2 不支持
* Vue3 有 **createApp()**，而 Vue2 的是 new Vue()
* createApp(**组件**)，new Vue({template, render})
* 新 v-model 代替以前的 v-model 和 .sync
* 新增 context.emit，与 this.$emit 作用相同

### 查看 vue-router 版本号
> yarn info vue-router versions
### 安装 vue-router
> yarn add vue-router@4.1.2

### 找不到模块 xxx.vue
**出现原因**
TypeScript 只能理解 .ts 文件，无法理解 .vue 文件
**解决办法**
搜索 Vue3 can not find module
创建 xxx.d.ts，告诉 TS 如何理解 .vue 文件

### 初始化 vue-router
* 新建 history 对象
* 新建 router 对象
* 引入 TypeScript
* app.use(router)
* 添加 < router-view >
* 添加 < router-line >

### 创建官网
**Home.vue**
Topnav：左边是 logo，右边是 menu
Banner：文字介绍+开始按钮
**Doc.**
Topnav：左边是 logo，右边是 menu
Content：左边是 aside，右边是 main

### VSCode 插件推荐
Vue 3 Snippets，Auto Import

## 实现 Swiich 组件
### API 设计
Switch 组件有以下 4 种使用情况：
```html
<Switch value="true" /> <!-- 字符串 true-->
<Switch value="false" /> <!-- 字符串 false-->
<Switch :value="true" /> <!-- 布尔值 true-->
<Switch :value="false" /> <!-- 布尔值 false-->
```
即当 value 为字符串 "true" 或布尔值 true 时，显示为开，其他情况显示为关。

### Vue3 父子组件通信原理
![Vue3 父子组件通信原理](https://raw.githubusercontent.com/jannahuang/blog/main/pictures/vue3%E7%88%B6%E5%AD%90%E7%BB%84%E4%BB%B6%E9%80%9A%E4%BF%A1%E5%8E%9F%E7%90%86.png)
$event 的值是 emit() 的第二个参数。

### Vue3 新版 v-model 用法
要求：
假设属性名为 value，emit() 事件名必须是 "update:value"
效果：
<Switch :value="checked" @update:value="checked = $event" />
可以简写为
<Switch v-model:value="checked" />
