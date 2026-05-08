<template>
  <div>
    <!-- Hero -->
    <section class="bg-indigo-600 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">Premium Fashion, Delivered</h1>
        <p class="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
          Discover curated collections of clothing and accessories. Quality meets style.
        </p>
        <RouterLink to="/products" class="inline-block bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors">
          Shop Now
        </RouterLink>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="flex items-center justify-between mb-8">
        <h2 class="text-2xl font-bold text-gray-900">Featured Products</h2>
        <RouterLink to="/products" class="text-indigo-600 hover:text-indigo-700 font-medium">
          View all &rarr;
        </RouterLink>
      </div>
      <LoadingSpinner v-if="productStore.loading" />
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <ProductCard
          v-for="product in productStore.products.slice(0, 4)"
          :key="product.id"
          :product="product"
        />
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

onMounted(() => {
  productStore.fetchProducts()
})
</script>
