<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';

const isEnabled = ref<boolean>(false);

watch(isEnabled, async (bool) => {
    await chrome.storage.local.set({ key: bool })
    await chrome.runtime.sendMessage({
        action: 'enable-key-display',
        status: bool
    })
})

onMounted(() => {
    chrome.storage.local.get(['key'], (items) => {
        isEnabled.value = items.key;
    });
})
</script>
<template>
    <div class="w-[320px] min-h-[80px] p-5 bg-base-200">
        <div class="form-control">
            <label class="label cursor-pointer">
                <span class="label-text">激活 Key Display</span>
                <input type="checkbox" v-model="isEnabled" class="checkbox" />
            </label>
        </div>
    </div>
</template>