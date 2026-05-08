<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-6">All Products</h1>
      <!-- Search -->
      <div class="relative max-w-md">
        <MagnifyingGlassIcon class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search products..."
          class="input pl-10"
          @input="debouncedSearch"
        />
      </div>
    </div>

    <LoadingSpinner v-if="productStore.loading" />
    <div v-else>
      <p class="text-gray-500 mb-6">{{ productStore.pagination?.total }} products</p>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <ProductCard
          v-for="product in productStore.products"
          :key="product.id"
          :product="product"
        />
      </div>
      <p v-if="productStore.products.length === 0" class="text-center text-gray-500 py-12">
        No products found.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useProductStore } from '../stores/products'
import ProductCard from '../components/ProductCard.vue'
import LoadingSpinner from '../components/LoadingSpinner.vue'
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline'

const productStore = useProductStore()
const searchQuery = ref('')
let searchTimeout = null

function debouncedSearch() {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    productStore.fetchProducts(1, searchQuery.value)
  }, 300)
}

onMounted(() => {
  productStore.fetchProducts()
})
</script>
