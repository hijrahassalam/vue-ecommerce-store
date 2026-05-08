<template>
  <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
    <div class="relative mb-8 inline-flex">
      <div class="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 border border-emerald-500/20 flex items-center justify-center animate-pulse-glow">
        <svg class="w-12 h-12 text-emerald-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>
      </div>
    </div>
    <h1 class="text-3xl font-bold text-white mb-3">Order Placed!</h1>
    <p class="text-zinc-400 mb-10 max-w-md mx-auto">Thank you for your order. Your items will be shipped soon. A confirmation email will be sent to your inbox.</p>
    <div class="flex flex-col sm:flex-row gap-3 justify-center">
      <RouterLink to="/products" class="px-6 py-3 rounded-xl font-medium text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all">
        Continue Shopping
      </RouterLink>
      <RouterLink to="/" class="px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 transition-all">
        Back to Home
      </RouterLink>
    </div>
  </div>
</template>
