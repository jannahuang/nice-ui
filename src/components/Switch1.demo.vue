<demo>
常规使用
</demo>
<template>
  <Switch v-model:value="checked" />
</template>
<script lang="ts">
import { ref } from 'vue'
import { Switch } from '../lib/index'
export default {
  components: {
    Switch
  },
  setup() {
    const checked = ref(false)
    return { checked }
  }
}
</script>