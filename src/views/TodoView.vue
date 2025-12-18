<script setup lang="ts">
import BaseInput from '../components/base/BaseInput.vue';
import BaseButton from '../components/base/BaseButton.vue';
import BaseCheckbox from '../components/base/BaseCheckbox.vue';
import { storeToRefs } from 'pinia';
import { useTodoStore } from '../stores/todoStore';

import { ref, onMounted } from 'vue'

const store = useTodoStore();
const { filteredTodos, isLoading, } = storeToRefs(store);
const { fetchTodos, addTodo, deleteTodo, toggleTodo } = store;
const newTodoTitle = ref('')
const todoTittleErrMsg = ref('')
const isLoadingButton = ref(false)

onMounted(() => {
    fetchTodos()
})

const handleAddTitle = async () => {
    if (!newTodoTitle.value.trim()) {
        todoTittleErrMsg.value = 'This field is required'
        return
    }
    isLoadingButton.value = true
    try {
        await addTodo(newTodoTitle.value.trim())
        newTodoTitle.value = ''
    } catch (err) {
        console.error(err)
    } finally {
        isLoadingButton.value = false
    }
}

</script>

<template>
    <div class="flex max-w-2xl items-end gap-3 mx-auto">
        <BaseInput type="text" label="Add todo" v-model="newTodoTitle" :error="todoTittleErrMsg"
            :on-change="todoTittleErrMsg = ''" />
        <BaseButton @on-click="handleAddTitle" :isLoading="isLoadingButton">Add new todo</BaseButton>
    </div>

    <div v-if="isLoading" class="flex items-center justify-center gap-3 p-4">
        <div class="w-6 h-6 border-2 border-slate-200 border-t-blue-600 rounded-full animate-spin"></div>
        <span class="text-slate-600 font-medium text-sm">Loading...</span>
    </div>

    <ul v-else
        class="w-full max-w-3xl mx-auto m-5 bg-white rounded-xl shadow-lg border border-slate-100 divide-y divide-slate-100 overflow-hidden">
        <li v-for="todo in filteredTodos" :key="todo.id"
            class="group flex items-center justify-between p-5 hover:bg-slate-50 transition-colors duration-200">
            <BaseCheckbox v-model="todo.status" :label="todo.title" @on-change="toggleTodo(todo.id)"
                :label-classes="['flex items-center gap-4', todo.status ? 'text-slate-400 line-through' : 'text-slate-700']" />
            <BaseButton variant="danger" @on-click="deleteTodo(todo.id)">Delete</BaseButton>
        </li>
    </ul>
</template>
