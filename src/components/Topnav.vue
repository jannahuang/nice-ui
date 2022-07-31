<template>
  <div class="topnav">
      <router-link to="/" class="logo">
        <!-- <svg class="icon">
          <use xlink:href="#icon-nice"></use>
        </svg> -->
        <img class="icon" src="../assets/nice.png" />
      </router-link>
      <ul class="menu">
        <li>
          <router-link to="/doc">文档</router-link>
        </li>
      </ul>
      <svg v-if="menuButtonVisible" class="toggleAside" @click="toggleAside">
        <use xlink:href="#icon-menu"></use>
      </svg>
  </div>
</template>
<script lang="ts">
import { inject, Ref } from 'vue'
export default {
  props: {
    menuButtonVisible: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const asideVisible = inject<Ref<boolean>>('asideVisible') // get
    const toggleAside = () => {
      asideVisible.value = !asideVisible.value
    }
    return {
      toggleAside,
      asideVisible
    }
  }
}
</script>
<style lang="scss" scoped>
$color: #5755ae;
.topnav{
  color: $color;
  display: flex;
  padding: 16px;
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    z-index: 20;
    justify-content: center;
    align-items: center;
    > .logo {
    max-width: 6em;
    margin-right: auto;
    >svg {
      width: 32px;
      height: 32px;
    }
  }
  > .menu {
    display: flex;
    white-space: nowrap;
    flex-wrap: nowrap;
    > li {
      margin: 0 1em;
    }
  }
  > .toggleAside {
    width: 32px;
    height: 32px;
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    display: none;
    background: fade-out(black, 0.9);
  }
  @media (max-width: 500px) {
    > .menu { display: none; }
    > .logo { margin: 0 auto; }
    > .toggleAside { display: inline-block; }
  }
}
</style>
