<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="mb-10">
      <h1 class="text-3xl font-bold text-white mb-2">All Products</h1>
      <p class="text-zinc-500">{{ productStore.pagination?.total || productStore.products.length }} items available</p>
    </div>

    <!-- Search -->
    <div class="relative mb-8 max-w-md">
      <svg class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search products..."
        class="w-full pl-12 pr-4 py-3 bg-[#18181b] border border-white/5 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all"
        @input="debouncedSearch"
      />
    </div>

    <LoadingSpinner v-if="productStore.loading" />
    <div v-else>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <ProductCard
          v-for="(product, i) in productStore.products"
          :key="product.id"
          :product="product"
          class="animate-fade-up"
          :style="{ animationDelay: `${i * 0.05}s` }"
        />
      </div>
      <p v-if="productStore.products.length === 0" class="text-center text-zinc-500 py-20">No products found.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useProductStore } from '../stores/products'
import ProductCard from '../components/ProductCard.vue'
import LoadingSpinner from '../components/LoadingSpinner.vue'

const productStore = useProductStore()
const searchQuery = ref('')
let searchTimeout = null

function debouncedSearch() {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => { productStore.fetchProducts(1, searchQuery.value) }, 300)
}

onMounted(() => { productStore.fetchProducts() })
</script>
