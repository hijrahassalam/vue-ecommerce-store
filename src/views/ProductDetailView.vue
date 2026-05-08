<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <LoadingSpinner v-if="productStore.loading" />

    <div v-else-if="productStore.currentProduct" class="grid grid-cols-1 md:grid-cols-2 gap-12">
      <!-- Image -->
      <div class="relative">
        <div class="sticky top-24">
          <div class="aspect-square rounded-3xl overflow-hidden bg-[#18181b] border border-white/5">
            <img :src="product.image_url" :alt="product.name" class="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      <!-- Info -->
      <div class="animate-fade-up">
        <div class="mb-6">
          <div class="flex items-center gap-2 mb-3">
            <span
              class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium"
              :class="product.stock > 10 ? 'bg-green-500/10 text-green-400 border border-green-500/20' : product.stock > 0 ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'"
            >
              <span class="w-1.5 h-1.5 rounded-full" :class="product.stock > 0 ? 'bg-green-400' : 'bg-red-400'" />
              {{ product.stock > 0 ? `${product.stock} in stock` : 'Out of stock' }}
            </span>
            <span class="px-3 py-1 rounded-full text-xs font-medium bg-white/5 text-zinc-400 border border-white/5">
              ID #{{ product.id }}
            </span>
          </div>
          <h1 class="text-3xl font-bold text-white mb-3">{{ product.name }}</h1>
          <p class="text-zinc-400 leading-relaxed">{{ product.description }}</p>
        </div>

        <div class="mb-8">
          <span class="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">
            {{ formatPrice(product.price) }}
          </span>
        </div>

        <!-- Quantity selector -->
        <div class="flex items-center gap-4 mb-6">
          <span class="text-sm text-zinc-500">Quantity</span>
          <div class="flex items-center border border-white/10 rounded-xl overflow-hidden">
            <button @click="decrementQty" class="px-4 py-3 text-zinc-400 hover:text-white hover:bg-white/5 transition-all">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"/></svg>
            </button>
            <span class="px-6 py-3 text-white font-medium border-x border-white/10">{{ quantity }}</span>
            <button @click="incrementQty" class="px-4 py-3 text-zinc-400 hover:text-white hover:bg-white/5 transition-all">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            </button>
          </div>
        </div>

        <!-- Add to cart -->
        <button
          @click="addToCart"
          :disabled="product.stock === 0 || cartStore.loading"
          class="w-full relative group px-8 py-4 rounded-xl font-semibold text-white overflow-hidden transition-all disabled:opacity-50 disabled:cursor-not-allowed mb-3"
        >
          <div class="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500" />
          <div class="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
          <span class="relative flex items-center justify-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"/></svg>
            {{ cartStore.loading ? 'Adding...' : 'Add to Cart' }}
          </span>
        </button>

        <p v-if="error" class="text-red-400 text-sm text-center">{{ error }}</p>

        <!-- Back link -->
        <RouterLink to="/products" class="flex items-center gap-2 text-sm text-zinc-500 hover:text-white mt-6 transition-colors">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
          Back to products
        </RouterLink>
      </div>
    </div>

    <p v-else class="text-center text-zinc-500 py-20">Product not found.</p>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useProductStore } from '../stores/products'
import { useCartStore } from '../stores/cart'
import LoadingSpinner from '../components/LoadingSpinner.vue'

const route = useRoute()
const productStore = useProductStore()
const cartStore = useCartStore()
const quantity = ref(1)
const error = ref('')
const product = computed(() => productStore.currentProduct)

function incrementQty() { if (product.value && quantity.value < product.value.stock) quantity.value++ }
function decrementQty() { if (quantity.value > 1) quantity.value-- }

async function addToCart() {
  error.value = ''
  const result = await cartStore.addItem(product.value.id, quantity.value)
  if (!result.success) error.value = result.message
  else quantity.value = 1
}

function formatPrice(price) { return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price) }
onMounted(() => { productStore.fetchProduct(route.params.id) })
</script>
