<template>
  <Transition name="toast">
    <div
      v-if="show"
      class="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl"
      :class="type === 'success'
        ? 'bg-emerald-500/90 backdrop-blur-sm text-white'
        : 'bg-red-500/90 backdrop-blur-sm text-white'"
    >
      <svg v-if="type === 'success'" class="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>
      <svg v-else class="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/></svg>
      <span class="font-medium text-sm">{{ message }}</span>
    </div>
  </Transition>
</template>

<script setup>
defineProps({ show: Boolean, message: String, type: { type: String, default: 'success' } })
</script>

<style scoped>
.toast-enter-active, .toast-leave-active { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
.toast-enter-from { opacity: 0; transform: translateY(16px) scale(0.95); }
.toast-leave-to { opacity: 0; transform: translateY(16px) scale(0.95); }
</style>
