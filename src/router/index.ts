// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NotFound from '../views/NotFound.vue'

const router = createRouter({
    // Sử dụng HTML5 History API (không có dấu # trên URL)
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/todos',
            name: 'todos',
            // Lazy Loading: Chỉ tải file JS của TodoView khi user vào route này
            component: () => import('../views/TodoView.vue')
        }, {
            // Catch-all route for 404 Not Found
            path: '/:pathMatch(.*)*', // Regex to match all paths
            name: 'NotFound',
            component: NotFound
        }
    ]
})

export default router