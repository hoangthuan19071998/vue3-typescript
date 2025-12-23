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
    <li
        class="group flex items-center justify-between p-5 hover:bg-surface transition-colors duration-200 border-b border-border last:border-0">
        <BaseCheckbox v-model="model" :id="props.todoId" :label="props.title" @on-change="toggleTodo(props.todoId)"
            :label-classes="['flex items-center gap-4', model ? 'text-foreground/50 line-through' : 'text-foreground']" />
        <BaseButton variant="danger" @on-click="emit('confirm-delete', props.todoId)">Delete</BaseButton>
    </li>
</template>