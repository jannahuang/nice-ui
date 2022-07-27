# vue3-ui
## 框架搭建
### 创建目录并启动：
> yarn create vite-app vue3-ui
> cd vue3-ui
> yarn
> yarn dev

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

## 实现 Switch 组件
### API 设计
Switch 组件有以下 4 种使用情况：
```html
<Switch value="true" /> <!-- 字符串 true-->
<Switch value="false" /> <!-- 字符串 false-->
<Switch :value="true" /> <!-- 布尔值 true-->
<Switch :value="false" /> <!-- 布尔值 false-->
```
即当 value 为字符串 "true" 或布尔值 true 时，显示为开，其他情况显示为关。

![Vue3 父子组件通信原理](https://raw.githubusercontent.com/jannahuang/blog/main/pictures/vue3%E7%88%B6%E5%AD%90%E7%BB%84%E4%BB%B6%E9%80%9A%E4%BF%A1%E5%8E%9F%E7%90%86.png)
$event 的值是 emit() 的第二个参数。

### Vue3 新版 v-model 用法
要求：
假设属性名为 value，emit() 事件名必须是 "update:value"
效果：
<Switch :value="checked" @update:value="checked = $event" />
可以简写为
<Switch v-model:value="checked" />

## 实现 Button 组件
### API 设计
```html
<Button
  @click=?
  @focus=?
  @mouseover=?
  theme="button or link or text"
  level="main or normal or minor"
  size="big normal small"
  disabled
  loading
></Button>
```

### Vue3 属性绑定
* 默认所有属性都绑定到根元素
* 使用 inheritAttrs: false 可以取消默认绑定
* 使用 $attrs 或者 context.attrs 获取所有属性
* 使用 v-bind="$attrs" 批量绑定属性
* 使用 const {size, ...rest} = context.attrs 将属性结构

### UI 库的 CSS 注意事项
1. **不能使用scoped**
2. **样式名称必须加前缀**，以区分一般的样式命名，防止被覆盖

## 实现 Dialog 组件
### 需求
1. 点击后弹出
2. 有遮罩层 overlay
3. 有 close 按钮
4. 有标题
5. 有内容
6. 有 取消/确定 按钮

### API 设计
```html
<Dialog
  visible
  title="标题"
  @confirm="fn1"
  @cancle="fn2"
></Dialog>
```

### 新组件 Teleport
为防止 Dialog 被遮挡，可以使用 Teleport 组件，把 Dialog 移到 body 下。

### 用 ts 文件创建 Dialog 组件
```typescript
import Dialog from './Dialog.vue'
import { createApp, h } from 'vue'
export const openDialog = (options) => {
  const { title, content, confirm, cancel } = options
  // 创建 div 标签，用于放置 Dialog
  const div = document.createElement('div')
  document.body.appendChild(div)
  // 改变 visible 时，将 Dialog 组件和 div 容器销毁
  const close = () => {
    app.unmount(div)
    div.remove()
  }
  // 创建 Dialog 组件
  const app = createApp({
    render() {
      return h(Dialog, {
        visible: true,
        'onUpdate:visible': (newVisible) => {
          if (newVisible === false) {
            close()
          }
        },
        confirm,
        cancel
      }, {
        title, content
      })
    }
  })
  // 将 Dialog 组件添加到 div
  app.mount(div)
}
```

## 实现 Tabs 组件
### 需求
1. 点击 Tab 切换内容
2. Tab 底部横线切换动画

### API 设计
```html
<Tabs>
  <Tab title="导航1">内容1</Tab>
  <Tab title="导航2"><Component1 /></Tab>
  <Tab title="导航3"><Component1 x="hi" /></Tab>
</Tabs>
或者
<Tabs :data="[
  {title: '导航1', content: '内容1'},
  {title: '导航2', content: Component1},
  {title: '导航3', content: h(Component1, {x:'hi'})}
]" />
```

### 检查 Tabs 组件的子元素是否为 Tab 组件
```typescript
import Tab from './Tab.vue'
export default {
  setup(props, context) {
    // 可以把 context log 出来看，
    // context.slots.default() 的内容就是外部传进来的子内容
    const defaults = context.slots.default()
    // 对子内容进行类型检查，如果不是 Tab 就报错
    defaults.forEach((tab) => {
      if (tab.type !== Tab) {
        throw new Error('Tabs 子元素必须是 Tab')
      }
    })
    return {
      defaults
    }
  }
}
```

### 用 JS 获取插槽内容
```javascript
const defaults = context.slots.default()
```

### Typescript 泛型
```javascript
const indicator = ref<HTMLDivElement>(null)
```

### 获取宽高和位置
```javascript
const { width, left } = el.getBoundingClientRect()
```

## 小知识：
### Vue2 和 Vue3 的区别
90% 的写法完全一致，除了以下几点：
* Vue3 的 Template 支持**多个根标签**，Vue2 不支持
* Vue3 有 **createApp()**，而 Vue2 的是 new Vue()
* createApp(**组件**)，new Vue({template, render})
* 新 v-model 代替以前的 v-model 和 .sync
* 新增 context.emit，与 this.$emit 作用相同
### 打包之后预览
yarn build 打包之后，可以通过 http-server 启动服务预览 dist 文件。
安装 http-server
> yarn global add http-server
安装之后输入命令：
> hs dist/ -c-1
