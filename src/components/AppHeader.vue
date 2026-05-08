<template>
  <header class="sticky top-0 z-50 glass border-b border-white/5">
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <RouterLink to="/" class="flex items-center gap-3 group">
          <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-all">
            <span class="text-white font-bold text-sm">S</span>
          </div>
          <span class="text-lg font-bold tracking-tight">STORE</span>
        </RouterLink>

        <div class="hidden md:flex items-center gap-8">
          <RouterLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="text-sm font-medium text-zinc-400 hover:text-white transition-colors relative"
            :class="{ 'text-white': $route.path === link.to }"
          >
            {{ link.label }}
            <span v-if="$route.path === link.to" class="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-indigo-500 to-pink-500" />
          </RouterLink>
        </div>

        <RouterLink
          to="/cart"
          class="relative flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full px-4 py-2 transition-all hover:border-indigo-500/30"
        >
          <svg class="w-4 h-4 text-zinc-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
          </svg>
          <span class="text-sm font-medium text-zinc-300">Cart</span>
          <span
            v-if="cartStore.itemCount > 0"
            class="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] bg-gradient-to-r from-indigo-500 to-pink-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 shadow-lg"
          >
            {{ cartStore.itemCount > 99 ? '99+' : cartStore.itemCount }}
          </span>
        </RouterLink>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { useCartStore } from '../stores/cart'

const cartStore = useCartStore()
const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'Products' },
]
</script>
