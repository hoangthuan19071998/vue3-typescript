<template>
    <label class="block">
        <span :class="[
            required ? 'after:content-[\'*\'] after:ml-0.5 after:text-red-500' : '',
            'block text-sm font-medium text-slate-700'
        ]">
            {{ label }}
        </span>
        <input :type="type" :name="type" :class=inputClasses :placeholder="placeholder" v-model="model"
            :required="required" @change="emit('on-change')" />
        <p v-if="error" class="text-red-500 text-sm mt-1">{{ error }}</p>
    </label>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import type { PropType } from 'vue'
const model = defineModel<string>({ required: true });
const props = defineProps({
    type: {
        type: String as PropType<'text' | 'email' | 'password'>,
        required: true
    },
    required: {
        type: Boolean,
        default: false
    },
    placeholder: {
        type: String
    },
    label: {
        type: String
    },
    error: {
        type: String
    }
})

const inputClasses = computed(() => {
    const baseClasses = 'block w-full rounded-md border mt-1 px-3 py-2 shadow-sm sm:text-sm bg-white placeholder-slate-400 focus:outline-none focus:ring-1';

    const normalClasses = 'border-slate-300 focus:border-sky-500 focus:ring-sky-500';

    const errorClasses = 'border-red-500 bg-red-50 text-red-900 focus:border-red-500 focus:ring-red-500';

    return [baseClasses, props.error ? errorClasses : normalClasses];
});

const emit = defineEmits(['on-change'])
</script>