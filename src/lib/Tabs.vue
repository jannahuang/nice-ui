<template>
  <div class="nice-tabs">
    <div class="nice-tabs-nav">
      <div class="nice-tabs-nav-item"
        :class="{selected: t === selected}"
        @click="select(t)"
        v-for="(t, index) in titles" :key="index">{{t}}</div>
        <div class="nice-tabs-nav-indicator"></div>
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
export default {
  props: {
    selected: {
      type: String
    }
  },
  setup(props, context) {
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
      select
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