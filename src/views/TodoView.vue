<script setup lang="ts">
import BaseInput from '../components/base/BaseInput.vue';
import BaseButton from '../components/base/BaseButton.vue';
import { getAllTodos, addNewTodo, deleteTodo } from '../api/todoApi';
import type { TodoType } from '../types/todo';
import { ref, onMounted } from 'vue'

const newTodoTitle = ref('')
const isLoadingButton = ref(false)
const isLoadingTodo = ref(false)
const todos = ref<TodoType[]>([])

const handleGetAllTodos = async () => {
    isLoadingTodo.value = true
    try {
        const res = await getAllTodos()
        todos.value = res as unknown as TodoType[]
    } catch (err) {
        console.error(err)
    } finally { isLoadingTodo.value = false }
}
onMounted(() => {
    handleGetAllTodos()
})

const handleAddTitle = async () => {
    if (!newTodoTitle.value.trim()) {
        return
    }
    isLoadingButton.value = true
    try {
        await addNewTodo(newTodoTitle.value)
    } catch (err) {
        console.error(err)
    } finally {
        isLoadingButton.value = false
        newTodoTitle.value = ''
        handleGetAllTodos()
    }
}

const handleDelete = async (id: number) => {
    try {
        await deleteTodo(id)
    } catch (err) {
        console.error(err)
    } finally {
        handleGetAllTodos()
    }
}
</script>

<template>
    <div class="flex max-w-2xl items-end gap-3 mx-auto">
        <BaseInput type="text" label="Add todo" v-model="newTodoTitle" />
        <BaseButton @on-click="handleAddTitle" :isLoading="isLoadingButton">Add new todo</BaseButton>
    </div>
    <div v-if="isLoadingTodo" class="flex items-center justify-center gap-3 p-4">

        <div class="w-6 h-6 border-2 border-slate-200 border-t-blue-600 rounded-full animate-spin"></div>

        <span class="text-slate-600 font-medium text-sm">Loading...</span>
    </div>
    <ul v-else
        class="w-full max-w-3xl mx-auto m-5 bg-white rounded-xl shadow-lg border border-slate-100 divide-y divide-slate-100 overflow-hidden">
        <li v-for="todo in todos" :key="todo.id"
            class="group flex items-center justify-between p-5 hover:bg-slate-50 transition-colors duration-200">
            <div class="flex items-center gap-4">
                <span class="text-lg font-medium select-none"
                    :class="todo.status ? 'text-slate-400 line-through' : 'text-slate-700'">
                    {{ todo.title }}
                </span>
            </div>
            <BaseButton variant="danger" @on-click="handleDelete(todo.id)">Delete</BaseButton>
        </li>
    </ul>
</template>
