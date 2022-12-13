<script setup lang="ts">
import { NButton } from 'naive-ui'

import { useIinaStore } from '../store/iina'

import LocalAlias from './LocalAlias.vue'
import ServerUrl from './ServerUrl.vue'

const { getIina, toggleIina } = useIinaStore()
</script>

<template>
  <ServerUrl />
  <LocalAlias />
  <NButton size="small" @click="toggleIina">
    {{ getIina() ? '关闭使用 IINA 播放' : '使用 IINA 播放' }}
  </NButton>
</template>

<style scoped>

</style>
