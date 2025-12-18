<script setup lang="ts">
import BaseInput from './components/base/BaseInput.vue';
import BaseButton from './components/base/BaseButton.vue';
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen">
    <div class="flex max-w-2xl items-end gap-3 mx-auto">
      <BaseInput type="text" label="Add todo" model-value="test" />
      <BaseButton>Add new todo</BaseButton>
    </div>

  </div>

</template>
