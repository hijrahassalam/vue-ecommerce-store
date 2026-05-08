<template>
  <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <h1 class="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
    <LoadingSpinner v-if="cartStore.loading" />
    <div v-else-if="cartStore.isEmpty" class="text-center py-12">
      <p class="text-gray-500 mb-4">Your cart is empty.</p>
      <RouterLink to="/products" class="btn-primary inline-block">Shop Now</RouterLink>
    </div>
    <div v-else>
      <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
        <h2 class="font-semibold text-gray-900 mb-4">Order Summary</h2>
        <div class="space-y-2 mb-4">
          <div v-for="item in cartStore.items" :key="item.id" class="flex justify-between text-sm">
            <span class="text-gray-600">{{ item.product_name }} &times; {{ item.quantity }}</span>
            <span class="text-gray-900">{{ formatPrice(item.subtotal) }}</span>
          </div>
        </div>
        <div class="border-t pt-4 flex justify-between">
          <span class="font-semibold text-gray-900">Total</span>
          <span class="font-bold text-xl text-indigo-600">{{ cartStore.formattedSubtotal }}</span>
        </div>
      </div>
      <button @click="handleCheckout" :disabled="processing" class="btn-primary w-full text-center disabled:opacity-50 disabled:cursor-not-allowed">
        {{ processing ? 'Processing...' : `Pay ${cartStore.formattedSubtotal}` }}
      </button>
      <p v-if="error" class="text-red-500 text-sm mt-3 text-center">{{ error }}</p>
      <p class="text-center text-gray-400 text-xs mt-4">Demo mode &middot; No real payment will be charged</p>
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
