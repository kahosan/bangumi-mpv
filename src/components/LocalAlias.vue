<script setup lang="ts">
import { NButton, NCheckbox, NCheckboxGroup, NInput, NInputGroup, NTag } from 'naive-ui'
import { ref } from 'vue'

import { useLocalAlias } from '../composables/use-local-alias'
import { useServerUrl } from '../composables/use-server-url'

const aliasStorage = useLocalAlias()
const inputText = ref('')

const serverUrlStorage = useServerUrl()
const selectServerUrl = ref(null)

const tipIsShow = ref(false)
if (selectServerUrl.value)
  tipIsShow.value = false

const addServerUrl = () => {
  if (!selectServerUrl.value || !inputText.value) {
    tipIsShow.value = true
    return
  }
  if (inputText.value) {
    const alias = selectServerUrl.value + inputText.value
    const suffix = alias.endsWith('/') ? '' : '/'

    aliasStorage.value = alias + suffix
    tipIsShow.value = false
  }
}
</script>

<template>
  <NInputGroup size="small">
    <NInput
      v-model:value="inputText"
      size="small"
      placeholder="本地目录别名..."
      @keyup.enter="addServerUrl"
    />
    <NButton type="tertiary" size="small" @click="addServerUrl">
      添加
    </NButton>
  </NInputGroup>
  <NTag v-if="aliasStorage" closable @close="aliasStorage = null">
    {{ aliasStorage }}
  </NTag>
  <NCheckboxGroup v-model:value="selectServerUrl">
    <NCheckbox v-for="serverUrl in serverUrlStorage" :key="serverUrl" :value="serverUrl">
      {{ serverUrl }}
    </NCheckbox>
  </NCheckboxGroup>
  <div class="tip">
    比如这个页面上动漫的中文名是「孤独摇滚!」, 而你的目录里的名称是 「孤独摇滚」没有！，就可以把 孤独摇滚 填进去。
    需要指定一下是哪个目录。
  </div>
  <div v-show="tipIsShow" class="tip-2">
    {{ inputText ? '请选择一个服务器' : '请输入一个本地目录别名' }}
  </div>
</template>

<style scoped>
.tip {
  margin-top: 0.25rem;
  line-height: 1.4;
  font-size: 12px;
}

.tip-2 {
  margin-top: 0.25rem;
  line-height: 1.4;
  font-size: 12px;
  color: red
}
</style>
