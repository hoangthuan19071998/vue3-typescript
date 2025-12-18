<template>
    <button :class="buttonClasses">
        <span v-if="isLoading">Loading...</span>
        <slot v-else />
    </button>

</template>
<script setup lang="ts">
import type { PropType } from 'vue'
import { computed } from 'vue'

const props = defineProps({
    variant: {
        type: String as PropType<'primary' | 'danger' | 'outline'>,
        default: 'primary'
    },
    isLoading: {
        type: Boolean
    }
})
const buttonClasses = computed(() => {
    // 1. Class dùng chung cho mọi button (Base)
    // Layout, font, hiệu ứng chuyển màu, bo góc, bóng đổ nhẹ
    const base = 'inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    // 2. Class riêng cho từng trạng thái (Variant)
    const variants = {
        primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 shadow-sm',

        danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-sm',

        outline: 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 focus:ring-slate-500'
    };

    return [base, variants[props.variant]];
});
</script>