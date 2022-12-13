<script setup lang="ts">
import { ref } from 'vue'
import { NButton, NInput, NInputGroup, NTag } from 'naive-ui'

import { useServerUrlStore } from '../store/server-url'
import { suffixCheck } from '../util/suffix'

const serverUrl = ref('')
const { getServerUrl, setServerUrl, removeServerUrl } = useServerUrlStore()

const handleAddServerUrl = (url: string) => {
  if (url === '')
    return

  const prefix = url.startsWith('https://') ? '' : url.startsWith('http://') ? '' : 'http://'

  const serverUrl = (prefix + suffixCheck(url)).replaceAll(' ', '')
  setServerUrl([...getServerUrl(), serverUrl])
}
const handleRemoveServerUrl = (index: number) => {
  removeServerUrl(index)
}
</script>

<template>
  <NInputGroup>
    <NInput
      v-model:value="serverUrl"
      size="small"
      placeholder="服务器地址..."
      @keyup.enter="handleAddServerUrl(serverUrl)"
    />
    <NButton type="tertiary" size="small" @click="handleAddServerUrl(serverUrl)">
      添加
    </NButton>
  </NInputGroup>
  <div v-for="url, index in getServerUrl()" :key="url">
    <NTag closable @close="handleRemoveServerUrl(index)">
      {{ url }}
    </NTag>
  </div>
  <div class="tip">
    nginx 文件服务器的地址，可以添加多个
  </div>
</template>

<style scoped>
.tip {
  margin-top: 0.25rem;
  line-height: 1.4;
}
</style>
