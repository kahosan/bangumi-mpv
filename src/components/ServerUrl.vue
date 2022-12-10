<script setup lang="ts">
import { ref } from 'vue'
import { useStorage } from '@vueuse/core'

import { NButton, NInput, NInputGroup, NTag } from 'naive-ui'

const serverUrl = ref('')
const serverUrlStorage = useStorage<string[]>('server-url', [])

const handleAddServerUrl = (url: string) => {
  if (url === '')
    return
  serverUrlStorage.value.push(`https://${url}`)
}
const handleRemoveServerUrl = (index: number) => {
  serverUrlStorage.value.splice(index, 1)
}
</script>

<template>
  <NInputGroup>
    <NInput
      v-model:value="serverUrl"
      size="small"
      placeholder="服务器地址..."
      @keyup.enter="handleAddServerUrl(serverUrl)"
    >
      <template #prefix>
        <span>https://</span>
      </template>
    </NInput>
    <NButton
      type="tertiary"
      size="small"
      @click="handleAddServerUrl(serverUrl)"
    >
      添加
    </NButton>
  </NInputGroup>
  <div v-for="url, index in serverUrlStorage" :key="url">
    <NTag closable @close="handleRemoveServerUrl(index)">
      {{ url }}
    </NTag>
  </div>
</template>
