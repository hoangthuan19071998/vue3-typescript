import type { InjectionKey } from 'vue';

// Định nghĩa kiểu hàm showToast: nhận vào message (string) và trả về void
export type ShowToastFunction = (message: string, type?: 'success' | 'error') => void;

// Tạo Key bảo mật
export const TOAST_KEY: InjectionKey<ShowToastFunction> = Symbol('TOAST_KEY');