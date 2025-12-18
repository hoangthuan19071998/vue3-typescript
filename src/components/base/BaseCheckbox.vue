<template>
    <div class="flex items-center mb-4">
        <input :id="props.id" v-model="model" type="checkbox" @change="emit('on-change')"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2">
        <label v-if="props.label" for="default-checkbox" :class="labelClasses">
            {{ label }}
        </label>
    </div>
</template>
<script setup lang="ts">
import type { PropType } from 'vue'
const model = defineModel()
const props = defineProps({
    id: {
        type: String
    },
    label: {
        type: String
    },
    labelClasses: {
        type: Array as PropType<string[]>
    }
})
const emit = defineEmits(['on-change'])
</script>