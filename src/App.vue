<script setup lang="ts">
import { ref } from 'vue'

import { NConfigProvider, darkTheme } from 'naive-ui'

import MpvMenu from './components/MpvMenu.vue'

import { useReset } from './composables/use-reset'
import { useOpenMpv } from './composables/use-open-mpv'

const menuVisible = ref(false)
const toggleMenuVisible = () => {
  menuVisible.value = !menuVisible.value
}

// 重新定义每集 a 标签的动作
const openInMpv = useOpenMpv()
useReset(openInMpv)

// set components dark mode
const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark'
</script>

<template>
  <NConfigProvider :theme="isDarkMode ? darkTheme : null">
    <div class="main">
      <button class="main-button" @click="toggleMenuVisible">
        MPV 设置
      </button>
      <div v-if="menuVisible" class="menu-content">
        <MpvMenu :close-menu="() => menuVisible = false" />
      </div>
    </div>
  </NConfigProvider>
</template>

<style scoped>
.main {
  position: relative;
}
.menu-content {
  position: absolute;
  top: 20;
  padding: 10px;
  border-radius: 4px;
  min-width: 18rem;
  background-color: rgb(238, 238, 238);
  z-index: 100;
}

html[data-theme='dark'] .menu-content {
  background-color: #202020;
}

.main-button {
  border: none;
  outline: none;
  border-radius: 2px;
  padding: 2px 4px;
  cursor: pointer;
  font-size: 14px;
  color: #888;
}

.main-button:hover {
  opacity: 0.8;
}

html[data-theme='dark'] .main-button {
  color: #EEE;
  background-color: #202020;
}

html[data-theme='dark'] .main-button:hover {
  opacity: 0.6;
}
</style>

<style>
html[data-theme='dark'] .main-content>* {
  background-color: #202020;
  color: #EEE;
  font-size: 14px;
}
</style>
