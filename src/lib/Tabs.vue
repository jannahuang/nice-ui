<template>
  <div class="nice-tabs">
    <div class="nice-tabs-nav" ref="container">
      <div class="nice-tabs-nav-item"
        :class="{selected: t === selected}"
        @click="select(t)"
        v-for="(t, index) in titles" :key="index"
        :ref="el => { if (el) navItems[index] = el }"
      >{{t}}</div>
        <div class="nice-tabs-nav-indicator" ref="indicator"></div>
    </div>
    <div class="nice-tabs-content">
      <!-- 用 component 的以下写法，可以展示子内容 -->
      <component class="nice-tabs-content-item"
        :class="{selected: c.props.title === selected}"
        v-for="(c, index) in defaults" :is="c" :key="index" />
    </div>
  </div>
</template>
<script lang="ts">
import Tab from './Tab.vue'
import { ref, onMounted, onUpdated } from 'vue'
export default {
  props: {
    selected: {
      type: String
    }
  },
  setup(props, context) {
    // 用 ts 声明 navItems 是 html div 元素的数组
    const navItems = ref<HTMLDivElement[]>([])
    // 选中标签元素的底部横线
    const indicator = ref<HTMLDivElement>(null)
    // 标签元素的外层元素
    const container = ref<HTMLDivElement>(null)
    const changeTab = () => {
      // 获取标签的 div
      const divs = navItems.value
      // 获取选中的标签元素
      const result = divs.filter(div => div.classList.contains('selected'))[0]
      // 获取选中元素的宽度
      const { width } = result.getBoundingClientRect()
      // 然后把宽度赋值给 tab 底部的横线
      indicator.value.style.width = width + 'px'

      const { left: left1 } = container.value.getBoundingClientRect()
      const { left: left2 } = result.getBoundingClientRect()
      const left = left2 - left1
      indicator.value.style.left = left + 'px'
    }
    onMounted(changeTab)
    onUpdated(changeTab)
    // 可以把 context log 出来看，
    // context.slots.default() 的内容就是外部传进来的子内容
    const defaults = context.slots.default()
    // 对子内容进行类型检查
    defaults.forEach(tab => {
      if (tab.type !== Tab) {
        throw new Error('Tabs 子标签必须是 Tab')
      }
    })
    const titles = defaults.map(tab => {
      return tab.props.title
    })
    const select = (val) => {
      context.emit('update:selected', val)
    }
    return {
      defaults,
      titles,
      select,
      navItems,
      indicator,
      container
    }
  }
}
</script>
<style lang="scss">
$blue: #40a9ff;
$color: #333;
$border-color: #d9d9d9;
.nice-tabs {
  &-nav {
    display: flex;
    color: $color;
    border-bottom: 1px solid $border-color;
    position: relative;
    &-item {
      padding: 8px 0;
      margin: 0 16px;
      cursor: pointer;
      &:first-child {
        margin-left: 0;
      }
      &.selected {
        color: $blue;
      }
    }
    &-indicator {
      position: absolute;
      height: 3px;
      background: $blue;
      left: 0;
      bottom: -1px;
      width: 100px;
      transition: all 250ms;
    }
  }
  &-content {
    padding: 8px 0;
    &-item {
      display: none;
      &.selected {
        display: block;
      }
    }
  }
}
</style>