<script setup lang="ts">
import { watchEffect } from 'vue';
import { RouterView } from 'vue-router';
import DefaultLayout from './layouts/DefaultLayout.vue';
import { useLocalStorage } from './composables/useLocalStorage';

const theme = useLocalStorage('theme', 'light')

const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light';
}
watchEffect(() => {
  const root = document.documentElement; // Thẻ <html>
  if (theme.value === 'dark') {
    root.classList.add('dark'); // Thêm class 'dark' để kích hoạt biến CSS
  } else {
    root.classList.remove('dark');
  }
});
</script>

<template>
  <DefaultLayout>
    <button @click="toggleTheme" class="fixed top-1 right-5 bg-indigo-600 text-white p-3 rounded-full shadow-lg z-50">
      {{ theme === 'light' ? '🌙 Dark' : '☀️ Light' }}
    </button>
    <RouterView v-slot="{ Component }">
      <KeepAlive include="HomeView">
        <component :is="Component" />
      </KeepAlive>
    </RouterView>
  </DefaultLayout>
</template>