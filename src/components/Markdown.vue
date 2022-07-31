<template>
  <article class="markdown-body" v-html="content">
  </article>
</template>
<script lang="ts">
import { ref } from "vue"
export default {
  props: {
    path: {
      type: String,
      required: true
    }
  },
  setup(props) {
    // content 初始值为 null
    const content = ref<string>(null)
    // 异步 import 文件内容，并将结果赋值给 content
    import(props.path).then(result => {
      content.value = result.default
    })
    return {
      content
    }
  }
}
</script>