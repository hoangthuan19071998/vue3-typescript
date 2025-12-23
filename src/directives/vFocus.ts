import type { Directive, DirectiveBinding } from 'vue';

export const vFocus: Directive = {
    // Hook 'mounted' chạy khi element được thêm vào DOM
    mounted(el: HTMLElement, binding: DirectiveBinding) {
        // binding.value chính là giá trị bạn truyền vào (true/false)
        // Logic: Chỉ focus nếu giá trị nhận được là true
        if (binding.value === true) {
            el.focus();
        }
    },

    // (Optional) Hook 'updated': Chạy khi component update
    // Hữu ích nếu giá trị focus thay đổi động từ false -> true sau khi mount
    updated(el: HTMLElement, binding: DirectiveBinding) {
        if (binding.value === true && binding.value !== binding.oldValue) {
            el.focus();
        }
    }
};