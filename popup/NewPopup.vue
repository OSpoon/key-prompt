<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { getLocalStorage, Keys, setLocalStorage } from '../shared/shared';

const isEnabled = ref<boolean>(false);

watch(isEnabled, async (bool) => {
    setLocalStorage(Keys.BROWSER_KEY_TRACKING_ACTIVATE, bool)
})

onMounted(() => {
    getLocalStorage(async (value) => {
        isEnabled.value = value
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