<script setup lang="ts">
import { NButton, NInput, NInputGroup, NTag } from 'naive-ui'
import { ref } from 'vue'

import { useLocalAlias } from '../composables/use-local-alias'

const alias = useLocalAlias(document.URL)
const inputText = ref('')
</script>

<template>
  <NInputGroup size="small">
    <NInput
      v-model:value="inputText"
      size="small"
      placeholder="目录别名..."
      @keyup="alias = inputText"
    >
      <template #prefix>
        <span>本地目录别名</span>
      </template>
    </NInput>
    <NButton
      type="tertiary"
      size="small"
      @click="alias = inputText"
    >
      添加
    </NButton>
  </NInputGroup>
  <NTag v-if="alias" closable @close="alias = null">
    {{ alias }}
  </NTag>
  <div class="tip">
    比如这个页面上动漫的中文名是「孤独摇滚!」, 而你的目录里的名称是 「孤独摇滚」没有！，就可以把 孤独摇滚 填进去
  </div>
</template>

<style scoped>
.tip {
  margin-top: 0.25rem;
  line-height: 1.4;
}
</style>
