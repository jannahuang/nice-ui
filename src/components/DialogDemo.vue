<template>
  <div>Dialog 示例</div>
  <h1>示例1</h1>
  <Button @click="toggle">toggle</Button>
  <Dialog
    v-model:visible="show"
    :closeOnClickOverlay="false"
    @confirm="f1"
    @cancel="f2"
  >
    <template v-slot:title>
      <strong>加粗的标题</strong>
    </template>
    <template v-slot:content>
      <strong>hi</strong>
      <div>你好</div>
    </template>
  </Dialog>
  <h1>示例2</h1>
  <Button @click="showDialog">show</Button>
</template>
<script lang="ts">
import Dialog from '../lib/Dialog.vue'
import Button from '../lib/Button.vue'
import { ref } from 'vue'
import { openDialog } from '../lib/openDialog'
export default {
  components: {
    Dialog,
    Button
  },
  setup() {
    const show = ref(false)
    const toggle = () => {
      show.value = !show.value
    }
    const f1 = () => {
      return false
    }
    const f2 = () => {}
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
      show,
      toggle,
      f1,
      f2,
      showDialog
    }
  }
}
</script>