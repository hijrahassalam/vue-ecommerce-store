<template>
  <div>
    <!-- Hero -->
    <section class="relative overflow-hidden">
      <!-- Background gradient orbs -->
      <div class="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-[128px] animate-float" />
      <div class="absolute top-20 right-1/4 w-72 h-72 bg-pink-500/20 rounded-full blur-[128px] animate-float" style="animation-delay: 2s;" />

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        <div class="text-center max-w-3xl mx-auto">
          <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-6 animate-fade-up">
            <span class="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span class="text-xs font-medium text-indigo-300">API Live &middot; All systems operational</span>
          </div>

          <h1 class="text-5xl md:text-7xl font-bold tracking-tight mb-6 animate-fade-up stagger-1">
            <span class="text-white">Premium</span>
            <br />
            <span class="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Fashion Store
            </span>
          </h1>

          <p class="text-lg text-zinc-400 mb-10 max-w-xl mx-auto animate-fade-up stagger-2">
            Curated collections of clothing and accessories. Built with Laravel, Vue 3, and Stripe.
          </p>

          <div class="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up stagger-3">
            <RouterLink
              to="/products"
              class="group relative px-8 py-3.5 rounded-xl font-semibold text-white overflow-hidden transition-all hover:scale-[1.02]"
            >
              <div class="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500" />
              <div class="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span class="relative flex items-center gap-2">
                Browse Products
                <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
              </span>
            </RouterLink>
            <a
              href="https://github.com/hijrahassalam"
              target="_blank"
              class="flex items-center gap-2 px-6 py-3.5 rounded-xl font-medium text-zinc-400 hover:text-white border border-white/10 hover:border-white/20 transition-all"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              View on GitHub
            </a>
          </div>
        </div>

        <!-- Stats bar -->
        <div class="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-up stagger-4">
          <div v-for="stat in stats" :key="stat.label" class="bg-white/5 border border-white/5 rounded-2xl p-5 text-center">
            <p class="text-2xl font-bold text-white">{{ stat.value }}</p>
            <p class="text-xs text-zinc-500 mt-1">{{ stat.label }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="flex items-center justify-between mb-10">
        <div>
          <h2 class="text-2xl font-bold text-white">Featured Products</h2>
          <p class="text-zinc-500 text-sm mt-1">Handpicked items from our collection</p>
        </div>
        <RouterLink to="/products" class="flex items-center gap-2 text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors">
          View all
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
        </RouterLink>
      </div>

      <LoadingSpinner v-if="productStore.loading" />
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <ProductCard
          v-for="(product, i) in productStore.products.slice(0, 4)"
          :key="product.id"
          :product="product"
          class="animate-fade-up"
          :style="{ animationDelay: `${i * 0.1}s` }"
        />
      </div>
    </section>

    <!-- Tech Stack -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="bg-gradient-to-br from-indigo-500/10 to-pink-500/10 rounded-3xl border border-white/5 p-10 text-center">
        <h2 class="text-2xl font-bold text-white mb-3">Built With Modern Stack</h2>
        <p class="text-zinc-400 mb-8">Production-ready full-stack application</p>
        <div class="flex flex-wrap items-center justify-center gap-3">
          <span v-for="tech in techStack" :key="tech.name" class="px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-sm font-medium text-zinc-300">
            {{ tech.name }}
          </span>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useProductStore } from '../stores/products'
import ProductCard from '../components/ProductCard.vue'
import LoadingSpinner from '../components/LoadingSpinner.vue'

const productStore = useProductStore()

const stats = [
  { value: '6', label: 'Products' },
  { value: '31', label: 'API Tests' },
  { value: '100%', label: 'Uptime' },
  { value: '<50ms', label: 'Response' },
]

const techStack = [
  { name: 'Laravel 13' },
  { name: 'Vue 3' },
  { name: 'Tailwind CSS' },
  { name: 'Pinia' },
  { name: 'PostgreSQL' },
  { name: 'Stripe' },
  { name: 'Docker' },
  { name: 'Railway' },
]

onMounted(() => { productStore.fetchProducts() })
</script>
