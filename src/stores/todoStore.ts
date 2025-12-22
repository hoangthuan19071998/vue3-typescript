import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { TodoType } from '../types/todo';
import todoApi from '../api/todoApi';

export const useTodoStore = defineStore('todo',
    () => {
        const todos = ref<TodoType[]>([])
        const isLoading = ref(false)
        const filter = ref<'all' | 'active' | 'completed'>('all')

        const filteredTodos = computed(() => {
            if (!todos.value) return
            switch (filter.value) {
                case 'active': return todos.value.filter(item => !item.status)
                case 'completed': return todos.value.filter(item => item.status)
                default: return todos.value
            }
        })
        // --- ACTIONS ---
        const fetchTodos = async () => {
            isLoading.value = true;
            try {
                todos.value = await todoApi.getAllTodos();
            } catch (error) {
                console.error(error);
            } finally {
                isLoading.value = false;
            }
        };

        const addTodo = async (text: string) => {
            if (!text.trim()) return;
            try {
                const id = crypto.randomUUID();
                const newTodo = await todoApi.addNewTodo({
                    id,
                    createdAt: Date.now(),
                    title: text,
                    status: false
                });
                todos.value.push(newTodo);
            } catch (error) {
                throw error
            }
        };

        const toggleTodo = async (id: string) => {
            const todo = todos.value.find(t => t.id === id);
            if (todo) {
                try {
                    await todoApi.editTodo(id, { status: todo.status });
                } catch (error) {
                    throw error
                }
            } else {
                throw ('Can\'t find todo,please try later ')
            };

        }

        const deleteTodo = async (id: string) => {
            // Optimistic Update
            const prev = [...todos.value];
            todos.value = todos.value.filter(t => t.id !== id);
            try {
                await todoApi.deleteTodo(id);
            } catch (error) {
                todos.value = prev; // Rollback
                throw error
            }
        };
        return {
            todos,
            isLoading,
            filter,
            filteredTodos,
            fetchTodos,
            addTodo,
            deleteTodo,
            toggleTodo
        };
    },
    {
        persist: {
            paths: ['filter', 'todos'] // Chỉ lưu những state này
        }
    }
)