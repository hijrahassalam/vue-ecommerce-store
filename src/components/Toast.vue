<template>
  <Transition name="toast">
    <div
      v-if="show"
      class="fixed bottom-4 right-4 z-50 flex items-center space-x-3 bg-gray-900 text-white px-5 py-3 rounded-xl shadow-lg"
    >
      <CheckCircleIcon v-if="type === 'success'" class="w-5 h-5 text-green-400" />
      <XCircleIcon v-else-if="type === 'error'" class="w-5 h-5 text-red-400" />
      <span class="font-medium">{{ message }}</span>
    </div>
  </Transition>
</template>

<script setup>
import { CheckCircleIcon, XCircleIcon } from '@heroicons/vue/24/solid'

defineProps({
  show: Boolean,
  message: String,
  type: {
    type: String,
    default: 'success',
  },
})
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
