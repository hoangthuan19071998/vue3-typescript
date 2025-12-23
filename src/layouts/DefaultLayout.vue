<script setup lang="ts">
// Không cần logic gì phức tạp
</script>

<template>
    <div class="min-h-screen bg-gray-50 flex flex-col">
        <header class="bg-white shadow-sm sticky top-0 z-10">
            <nav class="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
                <h1 class="text-xl font-bold text-blue-600">VueTodo Pro</h1>

                <div class="space-x-4">
                    <RouterLink to="/" active-class="text-blue-600 font-bold" class="text-gray-600 hover:text-blue-500">
                        Home
                    </RouterLink>
                    <RouterLink to="/todos" active-class="text-blue-600 font-bold"
                        class="text-gray-600 hover:text-blue-500">
                        My Todos
                    </RouterLink>
                </div>

            </nav>
        </header>

        <main class="flex-grow max-w-4xl mx-auto w-full p-4">
            <slot />
        </main>

        <footer class="bg-gray-200 text-center py-4 text-sm text-gray-500">
            &copy; 2025 Dual-Stack Developer
        </footer>
    </div>
</template>