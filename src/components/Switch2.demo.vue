<demo>
支持 disabled
</demo>
<template>
  <Switch v-model:value="checked" disabled />
</template>
<script lang="ts">
import { ref } from 'vue'
import Switch from '../lib/Switch.vue'
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