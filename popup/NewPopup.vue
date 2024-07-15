<script setup lang="ts">
import { ref, watch } from 'vue';

const isEnabled = ref<boolean>(false);

watch(isEnabled, (bool) => {
    chrome.runtime.sendMessage({
        type: 'enable-key-display',
        status: bool
    })
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