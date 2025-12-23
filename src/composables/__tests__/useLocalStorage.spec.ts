import { describe, it, expect, beforeEach } from 'vitest';
import { useLocalStorage } from '../useLocalStorage';
import { nextTick } from 'vue'; // <--- 1. Import nextTick
describe('useLocalStorage', () => {
    // Xóa sạch localStorage trước mỗi bài test để đảm bảo sạch sẽ
    beforeEach(() => {
        localStorage.clear();
    });

    it('nên khởi tạo với giá trị mặc định nếu localStorage trống', () => {
        const data = useLocalStorage('test-key', 'default');
        expect(data.value).toBe('default');
    });

    it('nên đọc giá trị từ localStorage nếu đã tồn tại', () => {
        localStorage.setItem('test-key', 'existing-value');
        const data = useLocalStorage('test-key', 'default');
        expect(data.value).toBe('existing-value');
    });

    it('nên cập nhật localStorage khi giá trị thay đổi', async () => {
        const data = useLocalStorage('test-key', 'initial');

        // Thay đổi value của ref
        data.value = 'updated';
        await nextTick();
        // Chờ 1 chút để watcher chạy (vì watch là async tick)
        // Trong Vitest/Vue test utils thường dùng nextTick, 
        // nhưng với localStorage đồng bộ thì thường cập nhật ngay.
        // Tuy nhiên để chắc chắn, ta kiểm tra lại:
        expect(localStorage.getItem('test-key')).toBe('updated');
    });
});