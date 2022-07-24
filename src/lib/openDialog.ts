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