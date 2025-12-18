import axios, { AxiosError } from 'axios';
import type { InternalAxiosRequestConfig } from 'axios';
import type { AxiosResponse } from 'axios';
import type { AxiosInstance } from 'axios';

// 1. Tạo instance với cấu hình cơ bản
const http: AxiosInstance = axios.create({
    baseURL: 'https://669dd8fa9a1bda36800482b0.mockapi.io',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// 2. Cấu hình Request Interceptor
http.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        config.headers.Authorization = `Bearer my-fake-token`;
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

// 3. Cấu hình Response Interceptor
http.interceptors.response.use(
    (response: AxiosResponse) => {
        return response.data;
    },
    (error: AxiosError) => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    console.error('Phiên làm việc hết hạn');
                    break;
                case 403:
                    console.error('Bạn không có quyền truy cập');
                    break;
                case 500:
                    console.error('Lỗi hệ thống từ server');
                    break;
            }
        }
        return Promise.reject(error);
    }
);

export default http;