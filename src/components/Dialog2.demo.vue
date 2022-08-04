<demo>
一键打开 Dialog
</demo>
<template>
  <div>
    <Button @click="showDialog">show</Button>
  </div>
</template>
<script lang="ts">
import { Button, openDialog } from '../lib/index'
import { ref } from 'vue'
export default {
  components: {
    Button
  },
  setup() {
    const showDialog = () => {
      openDialog({
        title: '标题',
        content: 'hello',
        confirm() {
          console.log('confirm')
        },
        cancel() {
          console.log('cancel')
        }
      })
    }
    return {
      showDialog
    }
  }
}
</script>