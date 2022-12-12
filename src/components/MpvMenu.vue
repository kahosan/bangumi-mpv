<script setup lang="ts">
import { NButton } from 'naive-ui'
import { useIINA } from '../composables/use-iina'
import LocalAlias from './LocalAlias.vue'
import ServerUrl from './ServerUrl.vue'

const iina = useIINA()
const toggleIINA = () => {
  iina.value = !iina.value
}
</script>

<template>
  <ServerUrl />
  <LocalAlias />
  <NButton size="small" @click="toggleIINA">
    {{ iina ? '关闭使用 IINA 播放' : '使用 IINA 播放' }}
  </NButton>
</template>

<style scoped>

</style>
