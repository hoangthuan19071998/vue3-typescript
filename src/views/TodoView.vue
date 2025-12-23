<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import BaseInput from '../components/base/BaseInput.vue';
import BaseButton from '../components/base/BaseButton.vue';
const BaseModal = defineAsyncComponent(() =>
    import('../components/base/BaseModal.vue')
);
import TodoItem from '../components/todos/TodoItem.vue';
import { storeToRefs } from 'pinia';
import { useTodoStore } from '../stores/todoStore';

import { ref, onMounted } from 'vue'

const store = useTodoStore();
const { filteredTodos, isLoading, } = storeToRefs(store);
const { fetchTodos, addTodo, deleteTodo } = store;
const newTodoTitle = ref('')
const todoTittleErrMsg = ref('')
const isLoadingButton = ref(false)
const isModalOpen = ref(false)
const deleteItemId = ref('')
onMounted(() => {
    fetchTodos()
    console.log(filteredTodos)
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

const confirmDelete = (id: string) => {
    deleteItemId.value = id
    isModalOpen.value = !isModalOpen.value
}

const executeDelete = () => {
    try {
        deleteTodo(deleteItemId.value)
    }
    catch (e) {
        alert(e)
    } finally {
        isModalOpen.value = !isModalOpen.value
    }

}
</script>

<template>
    <div class="flex max-w-2xl items-end gap-3 mx-auto">
        <BaseInput :focus=false type="text" label="Add todo" v-model="newTodoTitle" :error="todoTittleErrMsg"
            :on-change="todoTittleErrMsg = ''" />
        <BaseButton @on-click="handleAddTitle" :isLoading="isLoadingButton">Add new todo</BaseButton>
    </div>

    <div v-if="isLoading" class="flex items-center justify-center gap-3 p-4">
        <div class="w-6 h-6 border-2 border-slate-200 border-t-blue-600 rounded-full animate-spin"></div>
        <span class="text-slate-600 font-medium text-sm">Loading...</span>
    </div>


    <TransitionGroup v-else name="list" tag="ul" class="space-y-2">

        <TodoItem v-for="todo in filteredTodos" :key="todo.todoId" :todoId="todo.todoId" :v-model="todo.status"
            :title="todo.title" @confirm-delete="confirmDelete" v-memo="[todo.status, todo.title]" />
    </TransitionGroup>

    <BaseModal v-model="isModalOpen">
        <template #header>
            <span class="text-red-600">Xác nhận xóa</span>
        </template>

        <p>Bạn có chắc chắn muốn xóa công việc này không? Hành động này không thể hoàn tác.</p>

        <template #footer>
            <button @click="isModalOpen = false" class="px-4 py-2 bg-gray-200 rounded mr-2">Hủy</button>
            <button @click="executeDelete" class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
                Xóa ngay
            </button>
        </template>
    </BaseModal>
</template>
<style>
/* Hiệu ứng cho List Item */
.list-enter-active,
.list-leave-active {
    transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateX(30px);
}
</style>