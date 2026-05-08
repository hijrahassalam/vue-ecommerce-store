<template>
  <header class="bg-white shadow-sm sticky top-0 z-50">
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <RouterLink to="/" class="flex items-center space-x-2">
          <div class="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-sm">S</span>
          </div>
          <span class="text-xl font-bold text-gray-900">Shop</span>
        </RouterLink>

        <!-- Nav Links -->
        <div class="hidden md:flex items-center space-x-8">
          <RouterLink
            to="/"
            class="text-gray-600 hover:text-indigo-600 font-medium transition-colors"
            active-class="text-indigo-600"
          >
            Home
          </RouterLink>
          <RouterLink
            to="/products"
            class="text-gray-600 hover:text-indigo-600 font-medium transition-colors"
            active-class="text-indigo-600"
          >
            Products
          </RouterLink>
        </div>

        <!-- Cart Button -->
        <RouterLink
          to="/cart"
          class="relative flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 rounded-full px-4 py-2 transition-colors"
        >
          <ShoppingCartIcon class="w-5 h-5 text-gray-700" />
          <span class="text-sm font-medium text-gray-700">Cart</span>
          <span
            v-if="cartStore.itemCount > 0"
            class="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
          >
            {{ cartStore.itemCount }}
          </span>
        </RouterLink>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ShoppingCartIcon } from '@heroicons/vue/24/outline'
import { useCartStore } from '../stores/cart'

const cartStore = useCartStore()
</script>
