<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <LoadingSpinner v-if="productStore.loading" />
    <div v-else-if="productStore.currentProduct" class="grid grid-cols-1 md:grid-cols-2 gap-12">
      <!-- Image -->
      <div>
        <img
          :src="product.image_url"
          :alt="product.name"
          class="w-full rounded-2xl shadow-lg"
        />
      </div>
      <!-- Details -->
      <div>
        <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ product.name }}</h1>
        <p class="text-2xl font-bold text-indigo-600 mb-4">{{ formatPrice(product.price) }}</p>
        <p class="text-gray-600 mb-6">{{ product.description }}</p>
        <div class="mb-6">
          <span
            class="inline-block text-sm font-medium px-3 py-1 rounded-full"
            :class="product.stock > 10 ? 'bg-green-100 text-green-700' : product.stock > 0 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'"
          >
            {{ product.stock > 0 ? `${product.stock} in stock` : 'Out of stock' }}
          </span>
        </div>
        <div class="flex items-center space-x-4">
          <div class="flex items-center border border-gray-300 rounded-lg">
            <button
              @click="decrementQty"
              class="px-4 py-3 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <MinusIcon class="w-5 h-5" />
            </button>
            <span class="px-4 py-3 font-medium">{{ quantity }}</span>
            <button
              @click="incrementQty"
              class="px-4 py-3 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <PlusIcon class="w-5 h-5" />
            </button>
          </div>
          <button
            @click="addToCart"
            :disabled="product.stock === 0 || cartStore.loading"
            class="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ cartStore.loading ? 'Adding...' : 'Add to Cart' }}
          </button>
        </div>
        <p v-if="error" class="text-red-500 text-sm mt-3">{{ error }}</p>
      </div>
    </div>
    <p v-else class="text-center text-gray-500 py-12">Product not found.</p>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useProductStore } from '../stores/products'
import { useCartStore } from '../stores/cart'
import LoadingSpinner from '../components/LoadingSpinner.vue'
import { MinusIcon, PlusIcon } from '@heroicons/vue/24/outline'

const route = useRoute()
const productStore = useProductStore()
const cartStore = useCartStore()
const quantity = ref(1)
const error = ref('')

const product = computed(() => productStore.currentProduct)

function incrementQty() {
  if (product.value && quantity.value < product.value.stock) {
    quantity.value++
  }
}

function decrementQty() {
  if (quantity.value > 1) quantity.value--
}

async function addToCart() {
  error.value = ''
  const result = await cartStore.addItem(product.value.id, quantity.value)
  if (!result.success) {
    error.value = result.message
  } else {
    quantity.value = 1
  }
}

function formatPrice(price) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price)
}

onMounted(() => {
  productStore.fetchProduct(route.params.id)
})
</script>
