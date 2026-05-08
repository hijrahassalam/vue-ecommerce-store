<template>
  <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <h1 class="text-3xl font-bold text-white mb-8">Checkout</h1>

    <LoadingSpinner v-if="cartStore.loading" />

    <div v-else-if="cartStore.isEmpty" class="text-center py-16">
      <p class="text-zinc-500 mb-4">Your cart is empty.</p>
      <RouterLink to="/products" class="text-indigo-400 hover:text-indigo-300 font-medium">Browse products</RouterLink>
    </div>

    <div v-else class="space-y-4">
      <!-- Order summary -->
      <div class="bg-[#18181b] rounded-2xl border border-white/5 p-6 mb-6">
        <h2 class="font-semibold text-white mb-4">Order Summary</h2>
        <div class="space-y-3 mb-4">
          <div v-for="item in cartStore.items" :key="item.id" class="flex justify-between text-sm">
            <span class="text-zinc-500">{{ item.product_name }} &times; {{ item.quantity }}</span>
            <span class="text-zinc-300">{{ formatPrice(item.subtotal) }}</span>
          </div>
        </div>
        <div class="border-t border-white/5 pt-4 flex justify-between">
          <span class="font-semibold text-white">Total</span>
          <span class="font-bold text-xl bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">{{ cartStore.formattedSubtotal }}</span>
        </div>
      </div>

      <!-- Pay button -->
      <button
        @click="handleCheckout"
        :disabled="processing"
        class="w-full relative group px-8 py-4 rounded-xl font-semibold text-white overflow-hidden transition-all disabled:opacity-50"
      >
        <div class="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500" />
        <div class="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
        <span class="relative flex items-center justify-center gap-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"/></svg>
          {{ processing ? 'Processing...' : `Pay ${cartStore.formattedSubtotal}` }}
        </span>
      </button>

      <p v-if="error" class="text-red-400 text-sm text-center">{{ error }}</p>
      <p class="text-center text-zinc-600 text-xs mt-3">Demo mode &middot; No real payment will be charged</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cart'
import api from '../services/api'
import LoadingSpinner from '../components/LoadingSpinner.vue'

const router = useRouter()
const cartStore = useCartStore()
const processing = ref(false)
const error = ref('')

async function handleCheckout() {
  processing.value = true
  error.value = ''
  try {
    const res = await api.post('/checkout')
    const { stripe_url, order_id } = res.data.data
    localStorage.setItem('last_order_id', order_id)
    if (stripe_url && !stripe_url.includes('mock')) {
      window.location.href = stripe_url
    } else {
      await cartStore.clearCart()
      router.push('/order/success')
    }
  } catch (err) {
    error.value = err.response?.data?.message || 'Checkout failed. Please try again.'
  } finally {
    processing.value = false
  }
}

function formatPrice(price) { return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price) }
onMounted(() => { cartStore.fetchCart() })
</script>
