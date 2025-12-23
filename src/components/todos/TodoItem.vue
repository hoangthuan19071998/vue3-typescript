<script setup lang="ts">
import BaseButton from '../base/BaseButton.vue';
import BaseCheckbox from '../base/BaseCheckbox.vue';
import { useTodoStore } from '../../stores/todoStore';
const store = useTodoStore();

const { toggleTodo } = store;
const model = defineModel()
const props = defineProps({
    todoId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    }
})

const emit = defineEmits(['confirm-delete'])
</script>
<template>
    <div class="group flex items-center justify-between p-5 hover:bg-slate-50 transition-colors duration-200">
        <BaseCheckbox v-model="model" :id="props.todoId" :label="props.title" @on-change="toggleTodo(props.todoId)"
            :label-classes="['flex items-center gap-4', model ? 'text-slate-400 line-through' : 'text-slate-700']" />
        <BaseButton variant="danger" @on-click="emit('confirm-delete', props.todoId)">Delete</BaseButton>
    </div>
</template>