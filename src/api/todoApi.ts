import http from "../utils/http";
import type { TodoType } from '../types/todo';
async function getAllTodos() {
    try {
        const res = await http.get<any, TodoType[]>('/todos');
        return res;
    } catch (err) {
        throw err;
    }
}

async function addNewTodo(newTodo: Omit<TodoType, 'id'>) {
    try {
        const res: TodoType = await http.post<any, TodoType>('/todos', newTodo);
        return res;
    } catch (err) {
        throw err;
    }
}
async function deleteTodo(id: string) {
    try {
        const res = await http.delete<any, TodoType>(`/todos/${id}`);
        return res;
    } catch (err) {
        throw err;
    }
}
async function editTodo(id: string, todo: Partial<TodoType>) {
    try {
        const res = await http.put<any, TodoType>(`/todos/${id}`, todo);
        return res;
    } catch (err) {
        console.log(2222)
        throw err;
    }
}
export default { getAllTodos, addNewTodo, deleteTodo, editTodo }