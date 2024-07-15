<script lang="ts" setup>
import { onKeyPressed, useTimeout } from '@vueuse/core'
import { onMounted, reactive, ref, watch } from 'vue';

const maxKeyLen = 5;
const isEnabled = ref<boolean>(false)
const queue = reactive<{
  key: string[]
}>({
  key: []
})
const { ready, start } = useTimeout(1500, { controls: true })

onKeyPressed(true, (e) => {
  // if (isEnabled.value) {
  start()
  if (queue.key.length === maxKeyLen) {
    queue.key.shift()
  }
  queue.key.push(e.key)
  // }
}, { dedupe: true })

watch(ready, (bool) => {
  if (bool) {
    queue.key = []
  }
})

const newKeyClass = (index: number) => {
  return index === queue.key.length - 1 ? 'kbd-lg font-semibold text-[#f5deb3]' : ''
}

onMounted(() => {
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'toggle-key-display') {
      isEnabled.value = request.status
    }
  });
})
</script>
<template>
  <div class="flex flex-col gap-1 items-center bg-transparent text-gray-300" data-theme="dark">
    <template v-for="(key, index) in queue.key" :key="key + index">
      <kbd class="kbd" :class="newKeyClass(index)">
        {{ key }}
      </kbd>
    </template>
  </div>
</template>