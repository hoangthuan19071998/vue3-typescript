import http from "../utils/http";
import type { TodoType } from '../types/todo';
export async function getAllTodos() {
    try {
        const res = await http.get('/todos');
        return res;
    } catch (err) {
        return err;
    }
}

export async function addNewTodo(title: string) {
    const newTodo = {
        id: new Date(),
        title: title,
        createdAt: new Date(),
        status: false
    }
    try {
        const res: TodoType = await http.post('/todos', newTodo);
        return res;
    } catch (err) {
        return err;
    }
}
export async function deleteTodo(id: number) {
    try {
        const res = await http.delete(`/todos/${id}`);
        return res;
    } catch (err) {
        return err;
    }
}