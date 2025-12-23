<script setup lang="ts">
// Vue 3.4+: Dùng defineModel cho gọn
const isOpen = defineModel<boolean>({ required: true });

// Emit sự kiện close khi click ra ngoài backdrop hoặc bấm nút đóng
const close = () => {
    isOpen.value = false;
};
</script>

<template>
    <Teleport to="body">
        <Transition name="modal">
            <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center">

                <div class="absolute inset-0 bg-black/50" @click="close"></div>

                <div class="relative bg-white rounded-lg shadow-xl w-full max-w-md mx-4 p-6 z-10">

                    <div class="mb-4 text-lg font-bold text-gray-800 border-b pb-2">
                        <slot name="header">Thông báo</slot>
                    </div>

                    <div class="mb-6 text-gray-600">
                        <slot />
                    </div>

                    <div class="flex justify-end gap-3">
                        <slot name="footer">
                            <button @click="close" class="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
                                Đóng
                            </button>
                        </slot>
                    </div>

                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<style scoped>
/* Vue Transition CSS Classes */
/* Trạng thái bắt đầu và kết thúc */
.modal-enter-active,
.modal-leave-active {
    transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}
</style>