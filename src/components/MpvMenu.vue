<script setup lang="ts">
import { NButton } from 'naive-ui'
import { useIINA } from '../composables/use-iina'
import LocalAlias from './LocalAlias.vue'
import ServerUrl from './ServerUrl.vue'

const iina = useIINA()
</script>

<template>
  <ServerUrl />
  <LocalAlias />
  <NButton size="small" @click="iina = !iina">
    使用 IINA 播放
  </NButton>
</template>

<style scoped>

</style>
