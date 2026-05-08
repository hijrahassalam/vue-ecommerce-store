<template>
  <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
    <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
      <svg class="w-12 h-12 text-green-600" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>
    </div>
    <h1 class="text-3xl font-bold text-gray-900 mb-2">Order Placed!</h1>
    <p class="text-gray-600 mb-8">Thank you for your order. Your items will be shipped soon.</p>
    <div class="flex space-x-4 justify-center">
      <RouterLink to="/products" class="btn-secondary">Continue Shopping</RouterLink>
      <RouterLink to="/" class="btn-primary">Home</RouterLink>
    </div>
  </div>
</template>
