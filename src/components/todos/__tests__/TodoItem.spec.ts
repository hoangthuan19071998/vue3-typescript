import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import TodoItem from '../TodoItem.vue';
import { createPinia } from 'pinia';
describe('TodoItem.vue', () => {
    // Mock object Todo để test
    const mockTodo = {
        todoId: '123',
        title: 'Học Unit Test',
        status: false
    };

    it('hiển thị đúng nội dung title từ props', () => {
        // 1. Mount component với props giả
        const wrapper = mount(TodoItem, {
            props: {
                todoId: mockTodo.todoId,
                title: mockTodo.title,
                status: mockTodo.status
            },
            global: {
                plugins: [createPinia()] // Giả lập Pinia cho component này
            }
        });
        // 2. Kiểm tra xem text có xuất hiện không
        expect(wrapper.text()).toContain('Học Unit Test');
    });

    it('emit sự kiện confirm-delete khi bấm nút xóa', async () => {
        const wrapper = mount(TodoItem, {
            props: {
                todoId: mockTodo.todoId,
                title: mockTodo.title,
                status: mockTodo.status
            }
        });

        // 1. Tìm nút xóa (giả sử BaseButton render ra button, hoặc class cụ thể)
        // Lưu ý: Nếu BaseButton phức tạp, ta có thể tìm theo text hoặc class
        const button = wrapper.find('button');

        // 2. Kích hoạt sự kiện click
        await button.trigger('click');

        // 3. Kiểm tra xem component có bắn ra event 'confirm-delete' với đúng ID không
        expect(wrapper.emitted('confirm-delete')).toBeTruthy();
        expect(wrapper.emitted('confirm-delete')![0]).toEqual(['123']);
    });
});