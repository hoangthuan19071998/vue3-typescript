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
  if (theme.value === 'dark') {
    document.body.classList.add('bg-gray-900', 'text-white'); // Class ví dụ của Tailwind
    document.body.classList.remove('bg-gray-50');
  } else {
    document.body.classList.remove('bg-gray-900', 'text-white');
    document.body.classList.add('bg-gray-50');
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