<script setup lang="ts">
import BaseInput from '../components/base/BaseInput.vue';
import BaseButton from '../components/base/BaseButton.vue';
import BaseCheckbox from '../components/base/BaseCheckbox.vue';
import BaseModal from '../components/base/BaseModal.vue';
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

        <TodoItem v-for="todo in filteredTodos" :key="todo.todoId" :todoId="todo.todoId" :status="todo.status"
            :title="todo.title" @confirm-delete="confirmDelete" />
        <!-- <li class=" group flex items-center justify-between p-5 hover:bg-slate-50 transition-colors duration-200">
            <BaseCheckbox v-model="todo.status" :id="todo.todoId" :label="todo.title"
                @on-change="toggleTodo(todo.todoId)"
                :label-classes="['flex items-center gap-4', todo.status ? 'text-slate-400 line-through' : 'text-slate-700']" />
            <BaseButton variant="danger" @on-click="confirmDelete(todo.todoId)">Delete</BaseButton>
        </li> -->
    </ul>
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
    transition: all 0.4s ease;
}

.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateX(30px);
    /* Trượt sang phải khi xóa */
}

/* Magic class: Giúp các item còn lại trượt lên mượt mà khi có item bị xóa */
.list-move {
    transition: transform 0.4s ease;
}
</style>