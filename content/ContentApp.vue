<script lang="ts" setup>
import './content.css'
import { onKeyDown, useDebounceFn } from '@vueuse/core';
import { onMounted, reactive, ref } from 'vue';
import { Keys, localStorageChanged$ } from '../shared/shared';

const maxHistoryQueue = 2;

const isEnabled = ref<boolean>(false)
const history = reactive<{ key: string[][] }>({ key: [] })
const queue = reactive<{ key: string[] }>({ key: [] })

// 输入完成后将内容转移到历史队列并清空当前队列
const inputCompleteReady = useDebounceFn(() => {
  if (history.key.length === maxHistoryQueue) {
    history.key.shift()
  }
  history.key?.push(queue.key)
  queue.key = []
}, 600)

// 输入超时后清空历史队列和当前队列
const inputTimeoutReady = useDebounceFn(() => {
  queue.key = []
  history.key = []
}, 2400)

// 监听按键事件
onKeyDown(true, (e) => {
  if (isEnabled.value) {
    queue.key.push(e.key)

    inputCompleteReady()
    inputTimeoutReady()
  }
}, { dedupe: true })

onMounted(() => {
  localStorageChanged$.subscribe((changes) => {
    isEnabled.value = Reflect.get(changes, Keys.KEY_PROMPT_ACTIVATE)?.newValue
  })
})
</script>
<template>
  <div class="container">
    <div class="group">
      <TransitionGroup>
        <template v-for="queue in history.key">
          <kbd v-if="queue.length > 0" class="kbd">
            {{ queue.join('') }}
          </kbd>
        </template>
      </TransitionGroup>
    </div>
    <div class="single">
      <kbd class="kbd" v-for="key in queue.key">
        {{ key }}
      </kbd>
    </div>
  </div>
</template>
