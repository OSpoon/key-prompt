<script lang="ts" setup>
import { onKeyPressed, useTimeout } from '@vueuse/core'
import { onMounted, reactive, ref, watch } from 'vue';

const maxQueue = 4;

const isEnabled = ref<boolean>(false)
const historyQueue = reactive<{ key: string[] }>({ key: [] })
const currentQueue = reactive<{ key: string[] }>({ key: [] })

const { ready: inputCompleteReady, start: startInputComplete } = useTimeout(800, { controls: true })
const { ready: inputTimeoutReady, start: startInputTimeout } = useTimeout(2400, { controls: true })


onKeyPressed(true, (e) => {
  startInputComplete()
  startInputTimeout()
  currentQueue.key.push(e.key)
}, { dedupe: true })

// 输入完成后将内容转移到历史队列并清空当前队列
watch(inputCompleteReady, (bool) => {
  if (bool) {
    if (historyQueue.key.length === maxQueue) {
      historyQueue.key.shift()
    }
    historyQueue.key?.push(currentQueue.key.join(''))
    currentQueue.key = []
  }
})

// 输入超时后清空历史队列和当前队列
watch(inputTimeoutReady, (bool) => {
  if (bool) {
    currentQueue.key = []
    historyQueue.key = []
  }
})

onMounted(() => {
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'toggle-key-display') {
      isEnabled.value = request.status
    }
  });
})
</script>
<template>
  <div data-theme="dark" class="flex flex-col gap-3 bg-transparent tracking-wide text-[#f5deb3]">
    <div class="flex flex-col gap-2 items-start">
      <TransitionGroup>
        <template v-for="queue in historyQueue.key">
          <kbd class="kbd kbd-sm" v-if="queue.length > 0">
            {{ queue }}
          </kbd>
        </template>
      </TransitionGroup>
    </div>
    <div class="flex items-center">
      <kbd class="kbd" v-for="key in currentQueue.key">
        {{ key }}
      </kbd>
    </div>
  </div>
</template>