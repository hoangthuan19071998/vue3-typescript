<script setup lang="ts">
import { RouterView } from 'vue-router';
import DefaultLayout from './layouts/DefaultLayout.vue';
import { useLocalStorage } from './composables/useLocalStorage';

const theme = useLocalStorage('theme', 'light')

const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light';
}

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